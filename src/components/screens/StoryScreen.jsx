import React from 'react';
import { STORY, STORY_TITLE } from '../../content/story';
import Mascot from '../shared/Mascot';
import { stopAudio } from '../../utils/audio';

export default function StoryScreen({ storyIndex, onSetStoryIndex, onComplete }) {
  const currentSlide = STORY[storyIndex] || STORY[0];
  const isFirst = storyIndex === 0;
  const isLast = storyIndex === STORY.length - 1;

  const handleNext = () => {
    stopAudio();
    if (isLast) {
      onComplete();
    } else {
      onSetStoryIndex(storyIndex + 1);
    }
  };

  const handleBack = () => {
    stopAudio();
    if (!isFirst) {
      onSetStoryIndex(storyIndex - 1);
    }
  };

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
        padding: '6px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      {/* Centered Cluster Container (1040px wide for extra-large Grade 3 readability) */}
      <div
        style={{
          width: '100%',
          maxWidth: '1040px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* 1. Top Story Progress Bar (1 / 8) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '12px',
            gap: '16px'
          }}
        >
          <div
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.16)',
              height: '10px',
              borderRadius: '6px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${((storyIndex + 1) / STORY.length) * 100}%`,
                height: '100%',
                background: '#facc15',
                borderRadius: '6px',
                transition: 'width 0.3s ease-out'
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '20px',
              fontWeight: 800,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              letterSpacing: '0.5px'
            }}
          >
            {storyIndex + 1} / {STORY.length}
          </span>
        </div>

        {/* 2. Main 2-Column Story Card */}
        <div
          style={{
            background: 'rgba(18, 11, 42, 0.85)',
            border: '1.8px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '32px',
            padding: '24px 30px',
            width: '100%',
            boxShadow: '0 24px 68px rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '32px',
            boxSizing: 'border-box'
          }}
        >
          {/* Left Column: Massive Cinematic Story Illustration (480px x 380px) */}
          <div
            style={{
              width: '480px',
              height: '380px',
              flexShrink: 0,
              borderRadius: '26px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.65)'
            }}
          >
            <img
              src={currentSlide.image}
              alt={`Story scene ${currentSlide.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '26px',
                display: 'block'
              }}
            />
          </div>

          {/* Right Column: Title, Paragraph, Question Pill, Leo Bubble */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
              textAlign: 'left'
            }}
          >
            <div>
              {/* Story Title - 40px bold hero header */}
              <h2
                style={{
                  fontFamily: 'Fredoka, Nunito, sans-serif',
                  fontSize: '40px',
                  fontWeight: 900,
                  color: '#facc15',
                  margin: '0 0 12px 0',
                  letterSpacing: '-0.4px',
                  lineHeight: 1.15
                }}
              >
                {STORY_TITLE}
              </h2>

              {/* Story Paragraph - 21.5px large, crystal-clear reading text */}
              <p
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '21.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.45,
                  margin: '0 0 16px 0'
                }}
              >
                {currentSlide.paragraph}
              </p>
            </div>

            {/* Question Pill - 19.5px text, prominent sparkles & amber border */}
            <div
              style={{
                border: '2px solid rgba(250, 204, 21, 0.85)',
                background: 'rgba(16, 9, 36, 0.9)',
                borderRadius: '50px',
                padding: '11px 26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                margin: '0 0 16px 0',
                textAlign: 'center',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.4)'
              }}
            >
              <span style={{ fontSize: '19px', color: '#facc15' }}>✨</span>
              <span
                style={{
                  fontFamily: 'Fredoka, Nunito, sans-serif',
                  fontSize: '19.5px',
                  fontWeight: 900,
                  color: '#facc15',
                  letterSpacing: '0.2px'
                }}
              >
                "{currentSlide.question}"
              </span>
              <span style={{ fontSize: '19px', color: '#facc15' }}>✨</span>
            </div>

            {/* Leo Avatar & Speech Bubble - 64px avatar badge and 18.5px speech bubble */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              {/* Leo Mascot Avatar Circle Badge (64px) */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Mascot type="leo" mood="idle" customDimension={64} />
              </div>

              {/* Speech Bubble with 18.5px font */}
              <div
                style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  fontFamily: 'Fredoka, Nunito, sans-serif',
                  fontSize: '18.5px',
                  fontWeight: 900,
                  padding: '11px 26px',
                  borderRadius: '50px',
                  boxShadow: '0 6px 22px rgba(0, 0, 0, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{currentSlide.leo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Footer Navigation: Back, Dots, Next */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '16px'
          }}
        >
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            disabled={isFirst}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1.5px solid rgba(255, 255, 255, 0.22)',
              borderRadius: '50px',
              padding: '11px 36px',
              color: isFirst ? 'rgba(255, 255, 255, 0.35)' : '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '18px',
              fontWeight: 800,
              cursor: isFirst ? 'default' : 'pointer',
              transition: 'all 0.15s',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
            }}
            onMouseEnter={(e) => {
              if (!isFirst) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isFirst) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
              }
            }}
          >
            ← Back
          </button>

          {/* 8 Pagination Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
            {STORY.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSetStoryIndex(idx)}
                style={{
                  width: idx === storyIndex ? '14px' : '11px',
                  height: idx === storyIndex ? '14px' : '11px',
                  borderRadius: '50%',
                  background: idx === storyIndex ? '#facc15' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: idx === storyIndex ? '0 0 12px #facc15' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease'
                }}
                title={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Finish Button */}
          <button
            type="button"
            onClick={handleNext}
            style={{
              background: 'linear-gradient(180deg, #fde047 0%, #facc15 50%, #eab308 100%)',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '20px',
              fontWeight: 900,
              padding: '13px 44px',
              borderRadius: '50px',
              color: '#0f172a',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(250, 204, 21, 0.7), 0 4px 18px rgba(0, 0, 0, 0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 34px rgba(250, 204, 21, 0.85), 0 6px 22px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(250, 204, 21, 0.7), 0 4px 18px rgba(0, 0, 0, 0.35)';
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
