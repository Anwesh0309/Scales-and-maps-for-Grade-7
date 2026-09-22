import React, { useState, useEffect, useRef } from 'react';
import { WORLDS } from '../../content/worlds';
import { getWorldQuestions } from '../../core/questions/questionBank';
import QuestionVisual from '../visuals/QuestionVisual';
import FeedbackOverlay from '../shared/FeedbackOverlay';
import Confetti from '../shared/Confetti';
import { playAudioKey, stopAudio } from '../../utils/audio';

export default function PracticeScreen(props) {
  if (props.playState.currentWorld) {
    return <WorldGameplay key={props.playState.currentWorld} {...props} />;
  }
  return <WorldSelectionView {...props} />;
}

function WorldGameplay({
  playState,
  audioEnabled,
  onStartWorld,
  onExitWorld,
  onAnswerQuestion,
  onCompleteWorld
}) {
  const { currentWorld, xp, streak, hearts } = playState;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [outOfHearts, setOutOfHearts] = useState(false);
  const [worldSummary, setWorldSummary] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const feedbackTimerRef = useRef(null);

  // If in a world, get the 10 questions for that world
  const questions = currentWorld ? getWorldQuestions(currentWorld) : [];
  const activeQuestion = questions[currentQIndex] || questions[0];

  // Clean up timer and audio on unmount, question change, or audio toggle
  useEffect(() => {
    stopAudio();
    if (audioEnabled && activeQuestion && !feedback && !worldSummary && !outOfHearts) {
      const qKey = `w${currentWorld}q${currentQIndex + 1}`;
      playAudioKey(qKey);
    }
    return () => {
      stopAudio();
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, [currentWorld, currentQIndex, activeQuestion, audioEnabled]);

  const advanceQuestion = (updatedHearts, updatedCorrectCount) => {
    // Crucial: stop praise audio so it does not bleed into next question narration!
    stopAudio();
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    setFeedback(null);
    setSelectedOption(null);
    setShowHint(false);

    // 1. Check if user lost all 3 hearts
    if (updatedHearts <= 0) {
      setOutOfHearts(true);
      return;
    }

    // 2. Advance to next question or complete world
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Completed all 10 questions in world!
      // Only unlock next world if user answered at least 4 correct out of 10
      const passed = updatedCorrectCount >= 4;
      const earnedStars =
        updatedHearts >= 3 && updatedCorrectCount === 10
          ? 3
          : updatedCorrectCount >= 7
          ? 2
          : passed
          ? 1
          : 0;

      if (passed) {
        onCompleteWorld(currentWorld, earnedStars, updatedCorrectCount);
      }

      setWorldSummary({
        passed,
        correctCount: updatedCorrectCount,
        totalQuestions: questions.length,
        earnedStars
      });
    }
  };

  const handleSelectOption = (opt) => {
    if (feedback || outOfHearts || worldSummary) return;
    setSelectedOption(opt);

    const isCorrect = opt.correct;
    const xpGain = isCorrect ? 25 + streak * 5 : 0;
    const updatedCorrectCount = isCorrect ? correctCount + 1 : correctCount;
    if (isCorrect) {
      setCorrectCount(updatedCorrectCount);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }

    const updatedHearts = isCorrect ? hearts : Math.max(0, hearts - 1);
    onAnswerQuestion(isCorrect, xpGain);

    // Stop current question narration immediately before playing praise
    stopAudio();
    if (audioEnabled) {
      playAudioKey(isCorrect ? 'correct_praise' : 'try_again_praise');
    }

    const explanationText = isCorrect
      ? activeQuestion.explanation
      : opt.misconception
      ? `${opt.misconception}. ${activeQuestion.explanation}`
      : activeQuestion.explanation;

    setFeedback({
      isCorrect,
      explanation: explanationText,
      updatedHearts,
      updatedCorrectCount
    });

    // Advance to next question after praise finishes (~1800ms)
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    feedbackTimerRef.current = setTimeout(() => {
      advanceQuestion(updatedHearts, updatedCorrectCount);
    }, 1800);
  };

  const handleFeedbackContinue = () => {
    stopAudio();
    if (feedback) {
      advanceQuestion(feedback.updatedHearts, feedback.updatedCorrectCount);
    }
  };

  const handleRetryWorld = () => {
    stopAudio();
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    setOutOfHearts(false);
    setWorldSummary(null);
    setFeedback(null);
    setSelectedOption(null);
    setShowHint(false);
    setCurrentQIndex(0);
    setCorrectCount(0);
    onStartWorld(currentWorld);
  };

  const handleGoWorldList = () => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    setOutOfHearts(false);
    setWorldSummary(null);
    setFeedback(null);
    setSelectedOption(null);
    setShowHint(false);
    setCurrentQIndex(0);
    setCorrectCount(0);
    onExitWorld();
  };

  const handleHint = () => {
    setShowHint((prev) => {
      const nextShow = !prev;
      stopAudio();
      if (nextShow && audioEnabled && activeQuestion?.hint) {
        const hintKey = `w${currentWorld}q${currentQIndex + 1}_hint`;
        playAudioKey(hintKey);
      }
      return nextShow;
    });
  };

  const worldMeta = WORLDS.find((w) => w.id === currentWorld) || WORLDS[0];
  const progressPct = Math.round((currentQIndex / 10) * 100);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 20px 12px 20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 5
      }}
    >
        {showConfetti && <Confetti duration={2500} />}

        {/* Top-left Worlds Return Button */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '28px',
            zIndex: 10
          }}
        >
          <button
            type="button"
            onClick={onExitWorld}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.28)',
              borderRadius: '50px',
              padding: '9px 24px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '17px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 3px 12px rgba(0,0,0,0.4)',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.borderColor = '#facc15';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{ fontSize: '18px' }}>←</span>
            <span>Worlds</span>
          </button>
        </div>

        {/* Center Top HUD: World Title Pill, Stats & Progress */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '920px',
            width: '100%',
            marginBottom: '8px'
          }}
        >
          {/* Glowing World Title Pill */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              borderRadius: '50px',
              padding: '9px 34px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '22px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 0 26px rgba(244, 63, 94, 0.75), 0 4px 14px rgba(0,0,0,0.45)',
              marginBottom: '10px'
            }}
          >
            <span style={{ fontSize: '25px' }}>{worldMeta.icon || '⭐'}</span>
            <span>{worldMeta.title}</span>
          </div>

          {/* Stats Tri-Chip Row: Stars/XP | Hearts | Streak */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '8px',
              padding: '0 4px'
            }}
          >
            {/* Stars/XP Pill */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.55)',
                border: '2px solid rgba(250, 204, 21, 0.7)',
                borderRadius: '24px',
                padding: '6px 22px',
                color: '#facc15',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '17px',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              <span style={{ fontSize: '20px' }}>⭐</span>
              <span>{xp || 0} XP</span>
            </div>

            {/* Glowing Hearts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '28px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    filter: i < hearts ? 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.95))' : 'grayscale(1) opacity(0.35)',
                    transition: 'all 0.3s'
                  }}
                >
                  ❤️
                </span>
              ))}
            </div>

            {/* Streak Pill */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.55)',
                border: '2px solid rgba(251, 146, 60, 0.7)',
                borderRadius: '24px',
                padding: '6px 22px',
                color: '#fb923c',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '17px',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              <span style={{ fontSize: '20px' }}>🔥</span>
              <span>{streak || 0}x Streak</span>
            </div>
          </div>

          {/* Question Counter & Percentage */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '0 4px'
            }}
          >
            <span
              style={{
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '18px',
                fontWeight: 900,
                color: '#ffffff'
              }}
            >
              Question {currentQIndex + 1} of 10
            </span>
            <span
              style={{
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '18px',
                fontWeight: 900,
                color: '#cbd5e1'
              }}
            >
              {progressPct}% Completed
            </span>
          </div>

          {/* Progress Bar Track */}
          <div
            style={{
              width: '100%',
              height: '9px',
              background: 'rgba(255, 255, 255, 0.16)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginTop: '6px'
            }}
          >
            <div
              style={{
                width: `${Math.max(6, Math.min(100, Math.round(((currentQIndex + 1) / 10) * 100)))}%`,
                height: '100%',
                background: '#38bdf8',
                borderRadius: '6px',
                boxShadow: '0 0 16px #38bdf8',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Main Question Card Container */}
        <div
          style={{
            maxWidth: '920px',
            width: '100%',
            background: 'rgba(18, 12, 44, 0.9)',
            border: '2px solid rgba(99, 102, 241, 0.5)',
            borderRadius: '28px',
            padding: '24px 30px 20px 30px',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            boxSizing: 'border-box',
            marginTop: '16px'
          }}
        >
          {/* Top Center Golden Rule/Tag Pill */}
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #facc15 0%, #eab308 100%)',
              color: '#1e1b4b',
              borderRadius: '50px',
              padding: '7px 28px',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '17px',
              fontWeight: 900,
              letterSpacing: '0.6px',
              boxShadow: '0 4px 20px rgba(250, 204, 21, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 10,
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ fontSize: '19px', fontWeight: 900 }}>✦</span>
            <span>{activeQuestion.tag ? activeQuestion.tag.toUpperCase() : 'SCALE RULE'}</span>
            {activeQuestion.hint && (
              <button
                type="button"
                onClick={handleHint}
                title={showHint ? "Hide hint" : "Show hint"}
                style={{
                  marginLeft: '10px',
                  background: showHint ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.18)',
                  border: showHint ? '1.5px solid #1e1b4b' : 'none',
                  borderRadius: '50px',
                  padding: '4px 12px',
                  color: '#1e1b4b',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s'
                }}
              >
                <span>💡</span>
                <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
              </button>
            )}
          </div>

          {/* Inner Question Display Box with Diagram & Centered Stem */}
          <div
            style={{
              width: '100%',
              background: 'rgba(9, 6, 26, 0.85)',
              border: '2.5px solid #2563eb',
              borderRadius: '24px',
              padding: '18px 26px 20px 26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxSizing: 'border-box'
            }}
          >
            {/* Visual Panel if present */}
            {activeQuestion.visual && <QuestionVisual visual={activeQuestion.visual} />}

            {/* Question Stem (Centered, Extra Large & Clear for Grade 3) */}
            <div
              style={{
                fontFamily: 'Fredoka, Nunito, sans-serif',
                fontSize: '30px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.36,
                textAlign: 'center',
                maxWidth: '860px',
                margin: activeQuestion.visual ? '16px 0 0 0' : '8px 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)'
              }}
            >
              {activeQuestion.stem}
            </div>

            {/* Inline Hint Card when toggled */}
            {showHint && activeQuestion.hint && (
              <div
                style={{
                  marginTop: '12px',
                  background: 'rgba(250, 204, 21, 0.18)',
                  border: '1.5px solid #facc15',
                  borderRadius: '16px',
                  padding: '10px 18px',
                  color: '#fef08a',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '16px',
                  fontWeight: 800,
                  textAlign: 'center',
                  maxWidth: '860px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                  lineHeight: 1.4
                }}
              >
                💡 <strong>Hint:</strong> {activeQuestion.hint}
              </div>
            )}
          </div>

          {/* 4 Answer Options (2 × 2 Grid with extra large text for Grade 3) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              width: '100%'
            }}
          >
            {activeQuestion.options.map((opt) => {
              const isChosen = selectedOption && selectedOption.id === opt.id;
              let bg = 'rgba(22, 14, 52, 0.9)';
              let border = '2.5px solid rgba(99, 102, 241, 0.45)';
              let shadow = '0 6px 18px rgba(0, 0, 0, 0.4)';
              if (isChosen) {
                if (opt.correct) {
                  bg = 'rgba(22, 101, 52, 0.95)';
                  border = '2.5px solid #4ade80';
                  shadow = '0 0 24px rgba(74, 222, 128, 0.6)';
                } else {
                  bg = 'rgba(127, 29, 29, 0.95)';
                  border = '2.5px solid #ef4444';
                  shadow = '0 0 24px rgba(239, 68, 68, 0.6)';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  disabled={!!feedback}
                  style={{
                    background: bg,
                    border,
                    borderRadius: '22px',
                    padding: '18px 24px',
                    minHeight: '78px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: feedback ? 'default' : 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: '#ffffff',
                    boxShadow: shadow
                  }}
                  onMouseEnter={(e) => {
                    if (!feedback) {
                      e.currentTarget.style.background = 'rgba(36, 22, 78, 0.98)';
                      e.currentTarget.style.borderColor = '#38bdf8';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.015)';
                      e.currentTarget.style.boxShadow = '0 10px 28px rgba(56, 189, 248, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!feedback) {
                      e.currentTarget.style.background = bg;
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = shadow;
                    }
                  }}
                >
                  <span
                    style={{
                      fontSize: '28px',
                      fontWeight: 900,
                      fontFamily: 'Fredoka, Nunito, sans-serif',
                      letterSpacing: '0.3px'
                    }}
                  >
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback Overlay Modal (auto-advances after praise narration finishes or when clicked) */}
          {feedback && (
            <FeedbackOverlay
              isCorrect={feedback.isCorrect}
              explanation={feedback.explanation}
              onContinue={handleFeedbackContinue}
              duration={1800}
            />
          )}

          {/* Out of Hearts Modal (shown when user loses all 3 hearts) */}
          {outOfHearts && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(8, 4, 22, 0.88)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                animation: 'fadeIn 0.25s ease-out'
              }}
              role="alertdialog"
              aria-modal="true"
            >
              <div
                style={{
                  maxWidth: '520px',
                  width: '100%',
                  background: 'linear-gradient(180deg, #2e1035 0%, #180824 100%)',
                  border: '2.5px solid #ef4444',
                  borderRadius: '28px',
                  padding: '32px 28px',
                  boxShadow: '0 0 50px rgba(239, 68, 68, 0.45), 0 20px 48px rgba(0, 0, 0, 0.8)',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <div
                  style={{
                    fontSize: '64px',
                    marginBottom: '8px',
                    filter: 'drop-shadow(0 0 16px rgba(239, 68, 68, 0.8))'
                  }}
                >
                  💔
                </div>
                <h2
                  style={{
                    fontFamily: 'Fredoka, Nunito, sans-serif',
                    fontSize: '32px',
                    fontWeight: 900,
                    color: '#ffffff',
                    margin: '0 0 10px 0'
                  }}
                >
                  Out of Hearts!
                </h2>
                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#cbd5e1',
                    margin: '0 0 16px 0',
                    lineHeight: 1.45
                  }}
                >
                  You lost all 3 hearts in this world! Don't worry, practice makes perfect.
                </p>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '12px 18px',
                    marginBottom: '24px',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '18px',
                    color: '#facc15',
                    fontWeight: 900
                  }}
                >
                  Score: {correctCount} / 10 Correct
                </div>

                {/* Two Option Buttons: Retry World or Worlds List */}
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={handleRetryWorld}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '14px 20px',
                      color: '#1e1b4b',
                      fontFamily: 'Fredoka, sans-serif',
                      fontSize: '18px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(250, 204, 21, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <span>🔄</span>
                    <span>Retry World</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGoWorldList}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '50px',
                      padding: '14px 20px',
                      color: '#ffffff',
                      fontFamily: 'Fredoka, sans-serif',
                      fontSize: '18px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <span>🌍</span>
                    <span>Worlds List</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* World Summary Modal (unlocks next world ONLY if correctCount >= 4) */}
          {worldSummary && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(8, 4, 22, 0.88)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: 110,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                animation: 'fadeIn 0.25s ease-out'
              }}
              role="alertdialog"
              aria-modal="true"
            >
              <div
                style={{
                  maxWidth: '540px',
                  width: '100%',
                  background: worldSummary.passed
                    ? 'linear-gradient(180deg, #132e1d 0%, #0c1a11 100%)'
                    : 'linear-gradient(180deg, #2e1035 0%, #180824 100%)',
                  border: `2.5px solid ${worldSummary.passed ? '#4ade80' : '#facc15'}`,
                  borderRadius: '28px',
                  padding: '32px 28px',
                  boxShadow: worldSummary.passed
                    ? '0 0 50px rgba(74, 222, 128, 0.45), 0 20px 48px rgba(0,0,0,0.8)'
                    : '0 0 50px rgba(250, 204, 21, 0.35), 0 20px 48px rgba(0,0,0,0.8)',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '8px' }}>
                  {worldSummary.passed ? '🏆' : '🎯'}
                </div>
                <h2
                  style={{
                    fontFamily: 'Fredoka, Nunito, sans-serif',
                    fontSize: '32px',
                    fontWeight: 900,
                    color: '#ffffff',
                    margin: '0 0 10px 0'
                  }}
                >
                  {worldSummary.passed ? 'World Completed!' : 'Keep Practicing!'}
                </h2>
                <p
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#cbd5e1',
                    margin: '0 0 16px 0',
                    lineHeight: 1.45
                  }}
                >
                  {worldSummary.passed
                    ? `Awesome job! You answered ${worldSummary.correctCount} out of 10 questions correctly! Next world unlocked!`
                    : `You answered ${worldSummary.correctCount} out of 10 correctly. You need at least 4 correct answers to unlock the next world!`}
                </p>

                {worldSummary.passed && (
                  <div style={{ fontSize: '36px', marginBottom: '20px' }}>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          filter:
                            i < worldSummary.earnedStars
                              ? 'drop-shadow(0 0 12px #facc15)'
                              : 'grayscale(1) opacity(0.3)',
                          margin: '0 4px'
                        }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                  {worldSummary.passed ? (
                    <>
                      <button
                        type="button"
                        onClick={handleGoWorldList}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '14px 20px',
                          color: '#1e1b4b',
                          fontFamily: 'Fredoka, sans-serif',
                          fontSize: '18px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          boxShadow: '0 4px 16px rgba(250, 204, 21, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        <span>Worlds List</span>
                        <span>→</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRetryWorld}
                        style={{
                          background: 'rgba(255, 255, 255, 0.12)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '50px',
                          padding: '14px 20px',
                          color: '#ffffff',
                          fontFamily: 'Fredoka, sans-serif',
                          fontSize: '18px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        <span>🔄</span>
                        <span>Replay</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleRetryWorld}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '14px 20px',
                          color: '#1e1b4b',
                          fontFamily: 'Fredoka, sans-serif',
                          fontSize: '18px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          boxShadow: '0 4px 16px rgba(250, 204, 21, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        <span>🔄</span>
                        <span>Retry World</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleGoWorldList}
                        style={{
                          flex: 1,
                          background: 'rgba(255, 255, 255, 0.12)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '50px',
                          padding: '14px 20px',
                          color: '#ffffff',
                          fontFamily: 'Fredoka, sans-serif',
                          fontSize: '18px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        <span>🌍</span>
                        <span>Worlds List</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

// 2. World Selection Grid View (Enlarged for Grade 3 visibility, exact match to reference screenshot)
function WorldSelectionView({ playState, onStartWorld }) {
  const { worlds } = playState;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      {/* Centered Heading & Subtitle (Extra Large for Grade 3) */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          style={{
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: '42px',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            textShadow: '0 4px 18px rgba(0,0,0,0.6)'
          }}
        >
          <span style={{ fontSize: '44px' }}>🎮</span>
          <span>Practice — Choose Your World!</span>
        </h1>
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '20px',
            fontWeight: 800,
            color: '#cbd5e1',
            margin: 0
          }}
        >
          Answer questions in each world. Earn stars and XP!
        </p>
      </div>

      {/* 10 Game Worlds Grid (5 columns × 2 rows, Wider and Taller for Grade 3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          maxWidth: '1180px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {WORLDS.map((w) => {
          const worldData = worlds[w.id] || { unlocked: false, stars: 0, bestScore: 0 };
          const isUnlocked = w.id === 1 || worldData.unlocked;
          const qStart = (w.id - 1) * 10 + 1;
          const qEnd = w.id * 10;

          return (
            <div
              key={w.id}
              onClick={() => isUnlocked && onStartWorld(w.id)}
              style={{
                position: 'relative',
                background: isUnlocked
                  ? 'linear-gradient(180deg, rgba(48, 28, 92, 0.88) 0%, rgba(28, 16, 60, 0.88) 100%)'
                  : 'rgba(20, 13, 40, 0.55)',
                border: isUnlocked
                  ? '2.5px solid rgba(255, 255, 255, 0.26)'
                  : '1.5px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '26px',
                padding: '22px 16px 20px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '235px',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                boxShadow: isUnlocked
                  ? '0 10px 28px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.18)'
                  : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                if (isUnlocked) {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.45)';
                  e.currentTarget.style.boxShadow =
                    '0 14px 36px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (isUnlocked) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.26)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 28px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.18)';
                }
              }}
            >
              {/* Lock Icon in Top-Right if locked */}
              {!isUnlocked && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: 'absolute', top: '16px', right: '16px' }}
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}

              {/* World Icon (Enlarged for Grade 3) */}
              <div
                style={{
                  fontSize: isUnlocked ? '64px' : '58px',
                  marginTop: '4px',
                  marginBottom: '6px',
                  opacity: isUnlocked ? 1 : 0.38,
                  filter: isUnlocked
                    ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
                    : 'grayscale(0.4)',
                  transition: 'all 0.2s'
                }}
              >
                {w.icon}
              </div>

              {/* Title & Question Range (Enlarged) */}
              <div style={{ textAlign: 'center', width: '100%', margin: '6px 0 10px 0' }}>
                <div
                  style={{
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: isUnlocked ? '22px' : '20px',
                    fontWeight: 900,
                    color: isUnlocked ? '#ffffff' : '#94a3b8',
                    lineHeight: 1.25,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    letterSpacing: '0.2px'
                  }}
                  title={w.title}
                >
                  {w.title}
                </div>
                <div
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: isUnlocked ? '16px' : '15px',
                    fontWeight: 800,
                    color: isUnlocked ? 'rgba(255, 255, 255, 0.85)' : '#64748b',
                    marginTop: '5px'
                  }}
                >
                  Questions {qStart}–{qEnd}
                </div>
              </div>

              {/* Bottom Area: Pink ▶ PRACTICE button if unlocked, or placeholder */}
              {isUnlocked ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartWorld(w.id);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '10px 28px',
                    color: '#ffffff',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '16px',
                    fontWeight: 900,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(244, 63, 94, 0.6)',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(244, 63, 94, 0.75)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(244, 63, 94, 0.6)';
                  }}
                >
                  <span style={{ fontSize: '14px' }}>▶</span>
                  <span>PRACTICE</span>
                </button>
              ) : (
                <div style={{ minHeight: '40px' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
