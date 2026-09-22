import React, { useState, useEffect } from 'react';
import { STATIONS } from '../../content/stations';
import NumberPad from '../shared/NumberPad';
import { playAudioKey, stopAudio } from '../../utils/audio';
import { StationMapVisual } from '../sim/StationMapRuler';
import { StationUnitLadderVisual } from '../sim/StationUnitLadder';
import { StationAreaGridVisual } from '../sim/StationAreaGrid';
import { StationFloorPlanVisual } from '../sim/StationFloorPlan';

export default function SimulateScreen({
  simulateState,
  audioEnabled,
  onSelectStation,
  onSolveProblem,
  onCompleteSimulate
}) {
  const currentStationNum = simulateState.currentStation || 1;
  const currentStationData = STATIONS.find((s) => s.id === currentStationNum) || STATIONS[0];
  const stationProgress = simulateState.stations[currentStationNum] || { done: false, stars: 0, currentProblem: 0 };
  const currentProblemIndex = Math.min(stationProgress.currentProblem || 0, 2);
  const currentProblem = currentStationData.problems[currentProblemIndex];

  const [userVal, setUserVal] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isSolvedLocally, setIsSolvedLocally] = useState(false);
  const [prevProblemId, setPrevProblemId] = useState(currentProblem?.id);

  // Synchronously reset problem input and feedback during render when problem changes
  if (prevProblemId !== currentProblem?.id) {
    setPrevProblemId(currentProblem?.id);
    setUserVal('');
    setFeedback(null);
    setShowHint(false);
    setAttemptCount(0);
    setIsSolvedLocally(false);
  }

  // Audio synchronization on problem change or audio unmuting
  const currentProblemId = currentProblem?.id;
  useEffect(() => {
    stopAudio();
    if (audioEnabled && currentProblemId) {
      playAudioKey(`${currentProblemId}_task`);
    }

    return () => {
      stopAudio();
    };
  }, [currentProblemId, audioEnabled]);

  const isAlreadyDone = (stationProgress.currentProblem || 0) > currentProblemIndex;
  const isCurrentProblemSolved = isAlreadyDone || isSolvedLocally;

  const handleCheckAnswer = () => {
    if (!userVal) return;
    let cleanVal = String(userVal).trim().replace(/\s+/g, '').replace(/,/g, '');
    if (cleanVal.includes(':')) {
      const parts = cleanVal.split(':');
      cleanVal = parts[1] || parts[0];
    }
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return;

    let isMatch = false;
    if (typeof currentProblem.expected === 'number') {
      isMatch = Math.abs(num - currentProblem.expected) < 0.15;
    } else if (currentProblem.expectedWidth && currentProblem.expectedHeight) {
      isMatch =
        Math.abs(num - currentProblem.expectedWidth) < 0.15 ||
        Math.abs(num - currentProblem.expectedHeight) < 0.15;
    } else {
      isMatch = num === parseFloat(currentProblem.expected);
    }

    if (isMatch) {
      if (audioEnabled) {
        playAudioKey('correct_praise');
      }
      const correctStr = currentProblem.unit === 'n'
        ? `1 : ${currentProblem.expected.toLocaleString()} (n = ${currentProblem.expected.toLocaleString()})`
        : `${currentProblem.expected} ${currentProblem.unit}`;
      setFeedback({
        ok: true,
        msg: `🎉 Spot on! ${correctStr} is correct! Excellent calculation!`
      });
      setIsSolvedLocally(true);
    } else {
      if (audioEnabled) {
        playAudioKey('try_again_praise');
      }
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);

      if (nextAttempt === 1) {
        setFeedback({
          ok: false,
          msg: `Not quite yet! Check your conversion and calculation. Click '💡 Show Working Steps' above for step-by-step guidance.`
        });
      } else {
        const expectedStr = currentProblem.unit === 'n'
          ? `1 : ${currentProblem.expected.toLocaleString()} (n = ${currentProblem.expected.toLocaleString()})`
          : `${currentProblem.expected} ${currentProblem.unit}`;
        setFeedback({
          ok: false,
          msg: `Expected: ${expectedStr}. Guide: ${currentProblem.step1} ${currentProblem.step2}`
        });
      }
    }
  };

  const handleNext = () => {
    setIsSolvedLocally(false);
    if (currentProblemIndex < 2) {
      onSolveProblem(currentStationNum, 3, currentProblemIndex + 1);
    } else if (currentStationNum < 4) {
      onSolveProblem(currentStationNum, 3, 3);
      onSelectStation(currentStationNum + 1);
    } else {
      onSolveProblem(currentStationNum, 3, 3);
      onCompleteSimulate();
    }
  };

  const stationIcons = ['🧭', '🪜', '🌊', '📐'];

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
        padding: '4px 16px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      {/* Main Simulation Stations Card Container (Scaled up for Grade 3) */}
      <div
        style={{
          background: 'rgba(20, 12, 44, 0.94)',
          border: '2px solid rgba(129, 140, 248, 0.35)',
          borderRadius: '26px',
          padding: '12px 24px 16px 24px',
          maxWidth: '1340px',
          width: '100%',
          height: 'calc(100% - 4px)',
          maxHeight: 'calc(100vh - 74px)',
          boxShadow: '0 24px 68px rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        {/* Top Glowing Indicator Pill */}
        <div
          style={{
            width: '90px',
            height: '6px',
            background: '#38bdf8',
            borderRadius: '4px',
            boxShadow: '0 0 16px 2px #38bdf8',
            margin: '0 auto 6px auto',
            flexShrink: 0
          }}
        />

        {/* Title: 🧪 Simulation Stations (Enlarged) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: '32px',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 8px 0',
            flexShrink: 0
          }}
        >
          <span style={{ fontSize: '32px' }}>🧪</span>
          <span>Simulation Stations: Real-World Cartography</span>
        </div>

        {/* 2-Column Split */}
        <div
          style={{
            display: 'flex',
            gap: '18px',
            alignItems: 'stretch',
            width: '100%',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
          }}
        >
          {/* Left Column: Station Selection List & Practice Button */}
          <div
            style={{
              width: 'clamp(270px, 24vw, 320px)',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            {/* Station Buttons List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {STATIONS.map((station, idx) => {
                const isSelected = currentStationNum === station.id;
                const isDone = simulateState.stations[station.id]?.done;
                const badgeIcon = stationIcons[idx % stationIcons.length];

                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => onSelectStation(station.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      background: isSelected
                        ? 'rgba(56, 189, 248, 0.3)'
                        : 'rgba(255, 255, 255, 0.08)',
                      border: `2.5px solid ${
                        isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)'
                      }`,
                      boxShadow: isSelected
                        ? '0 0 20px rgba(56, 189, 248, 0.55)'
                        : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      {/* Scaled-Up Icon Box */}
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: isSelected
                            ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                            : 'rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '26px',
                          flexShrink: 0
                        }}
                      >
                        {badgeIcon}
                      </div>

                      {/* Station Name & Subtitle */}
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: 'Fredoka, sans-serif',
                            fontSize: '17px',
                            fontWeight: 900,
                            color: '#ffffff',
                            lineHeight: 1.25,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          Station {station.id}: {station.title.split(': ')[1] || station.title}
                        </div>
                        <div
                          style={{
                            fontSize: '13.5px',
                            fontWeight: 800,
                            color: isSelected ? '#bae6fd' : '#cbd5e1',
                            marginTop: '3px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {station.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Unlock / Completed Status */}
                    <span style={{ fontSize: '22px', color: '#facc15', marginLeft: '6px', flexShrink: 0 }}>
                      {isDone ? '✓' : '🔓'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Button in Left Column */}
            <button
              type="button"
              onClick={onCompleteSimulate}
              style={{
                background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 22px',
                color: '#1e1b4b',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '18px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(250, 204, 21, 0.7)',
                transition: 'all 0.15s',
                textAlign: 'center',
                marginTop: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              Go to Practice Phase! →
            </button>
          </div>

          {/* Right Column: Active Simulation Workspace */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              background: 'rgba(10, 6, 26, 0.75)',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '12px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              height: '100%',
              boxSizing: 'border-box',
              overflowY: 'auto'
            }}
          >
            {/* Header: Station Name & Problem X of 3 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
                flexShrink: 0
              }}
            >
              <span
                style={{
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#ffffff'
                }}
              >
                Station {currentStationNum}: {currentStationData.title.split(': ')[1] || currentStationData.title}
              </span>

              {/* Problem Selection Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#ffffff'
                  }}
                >
                  Problem {currentProblemIndex + 1} of 3:
                </span>
                {[0, 1, 2].map((idx) => {
                  const isCurrent = idx === currentProblemIndex;
                  const isSolved = (stationProgress.currentProblem || 0) > idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSolveProblem(currentStationNum, stationProgress.stars, idx)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isCurrent
                          ? '#facc15'
                          : isSolved
                          ? '#4ade80'
                          : 'rgba(255, 255, 255, 0.22)',
                        border: 'none',
                        color: isCurrent ? '#1e1b4b' : '#ffffff',
                        fontFamily: 'Fredoka, sans-serif',
                        fontSize: '16px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s',
                        boxShadow: isCurrent ? '0 0 14px rgba(250, 204, 21, 0.9)' : 'none'
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Task Prompt Box - Enlarged for Grade 7 & Teachers */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                border: '1.5px solid rgba(250, 204, 21, 0.45)',
                borderRadius: '16px',
                padding: '10px 16px',
                marginBottom: '8px',
                flexShrink: 0
              }}
            >
              {/* Teacher / Learning Objective Standard */}
              {currentProblem.objective && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#bae6fd',
                    fontFamily: 'Fredoka, sans-serif',
                    fontWeight: 800,
                    marginBottom: '5px'
                  }}
                >
                  <span style={{ color: '#38bdf8' }}>🎯 Target:</span>
                  <span>{currentProblem.objective}</span>
                </div>
              )}

              <div
                style={{
                  fontFamily: 'Fredoka, Nunito, sans-serif',
                  fontSize: 'clamp(18px, 2.2vw, 22px)',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.4
                }}
              >
                <span style={{ color: '#facc15' }}>Solve:&nbsp;</span>
                {currentProblem.task}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '6px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '17px',
                    fontWeight: 900,
                    color: '#38bdf8'
                  }}
                >
                  ✨ Scale: {currentProblem.scale || currentProblem.inputScale}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const nextShow = !showHint;
                    setShowHint(nextShow);
                    stopAudio();
                    if (nextShow && audioEnabled && currentProblemId) {
                      playAudioKey(`${currentProblemId}_guide`);
                    }
                  }}
                  style={{
                    background: 'rgba(250, 204, 21, 0.25)',
                    border: '1.5px solid #facc15',
                    borderRadius: '16px',
                    padding: '5px 14px',
                    color: '#fde047',
                    fontSize: '14.5px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  {showHint ? 'Hide Working ✕' : '💡 Show Working Steps'}
                </button>
              </div>

              {/* Expandable High-Contrast Working Helper */}
              {showHint && (
                <div
                  style={{
                    marginTop: '8px',
                    background: 'rgba(30, 20, 0, 0.9)',
                    border: '1.5px solid #facc15',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '15px',
                    color: '#ffffff',
                    fontWeight: 800,
                    lineHeight: 1.45
                  }}
                >
                  <div style={{ color: '#fde047', fontWeight: 900, marginBottom: '4px' }}>
                    💡 Step-by-Step Mathematical Guide:
                  </div>
                  <div style={{ color: '#e2e8f0', marginBottom: '3px' }}>1. {currentProblem.step1}</div>
                  <div style={{ color: '#e2e8f0' }}>2. {currentProblem.step2}</div>
                </div>
              )}
            </div>

            {/* Central Interactive Simulation Box */}
            <div
              style={{
                background: 'rgba(12, 8, 30, 0.95)',
                border: '1.5px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '18px',
                padding: '10px 14px',
                flex: 1,
                minHeight: '260px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {currentStationNum === 1 && <StationMapVisual problem={currentProblem} />}
              {currentStationNum === 2 && <StationUnitLadderVisual problem={currentProblem} />}
              {currentStationNum === 3 && <StationAreaGridVisual problem={currentProblem} />}
              {currentStationNum === 4 && <StationFloorPlanVisual problem={currentProblem} />}
            </div>

            {/* Bottom Controls: Answer Box, NumberPad & Action Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '8px',
                gap: '16px',
                flexShrink: 0
              }}
            >
              {/* Left: Answer Box & Feedback */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '220px', maxWidth: '280px', flex: '1 1 auto' }}>
                <span
                  style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '16px',
                    fontWeight: 900,
                    color: '#ffffff'
                  }}
                >
                  Your Answer:
                </span>
                <div
                  style={{
                    background: '#000000',
                    border: '2.5px solid #facc15',
                    borderRadius: '14px',
                    padding: '8px 18px',
                    fontSize: '26px',
                    fontWeight: 900,
                    fontFamily: 'Fredoka, sans-serif',
                    color: '#facc15',
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.6)'
                  }}
                >
                  {currentProblem.unit === 'n' ? (
                    <div>
                      <div>
                        n = {(() => {
                          const n = parseFloat(String(userVal).replace(/[^0-9.]/g, ''));
                          return !isNaN(n) ? n.toLocaleString() : (userVal || '0');
                        })()}
                      </div>
                      <div style={{ fontSize: '13px', color: '#bae6fd', fontWeight: 800 }}>
                        Ratio 1 : {(() => {
                          const n = parseFloat(String(userVal).replace(/[^0-9.]/g, ''));
                          return !isNaN(n) ? n.toLocaleString() : 'n';
                        })()}
                      </div>
                    </div>
                  ) : (
                    `${userVal || '0'} ${currentProblem.unit}`
                  )}
                </div>

                {feedback && (
                  <div
                    style={{
                      padding: '5px 12px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: 900,
                      background: feedback.ok ? 'rgba(34, 197, 94, 0.35)' : 'rgba(239, 68, 68, 0.35)',
                      color: feedback.ok ? '#86efac' : '#fca5a5',
                      border: `1.5px solid ${feedback.ok ? '#4ade80' : '#ef4444'}`,
                      textAlign: 'center',
                      lineHeight: 1.3
                    }}
                  >
                    {feedback.msg}
                  </div>
                )}
              </div>

              {/* Center: Touch NumberPad */}
              <div style={{ flex: 1, maxWidth: '360px', display: 'flex', justifyContent: 'center' }}>
                <NumberPad
                  value={userVal}
                  onChange={setUserVal}
                  hideDisplay={true}
                  layout="6x2"
                  onSubmit={userVal && !isCurrentProblemSolved ? handleCheckAnswer : handleNext}
                />
              </div>

              {/* Right: Golden Action Button (Larger for Grade 3) */}
              <button
                type="button"
                onClick={userVal && !isCurrentProblemSolved ? handleCheckAnswer : handleNext}
                style={{
                  background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '16px 36px',
                  color: '#1e1b4b',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '19px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 0 24px rgba(250, 204, 21, 0.75)',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {userVal && !isCurrentProblemSolved
                  ? 'Check Answer ✨'
                  : currentProblemIndex < 2
                  ? 'Next Problem →'
                  : currentStationNum < 4
                  ? 'Next Station →'
                  : 'Go to Practice! →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
