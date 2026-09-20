import React, { useEffect } from 'react';

export default function FeedbackOverlay({ isCorrect, explanation, onContinue, duration = 1000 }) {
  useEffect(() => {
    if (!onContinue) return;
    const timer = setTimeout(() => {
      onContinue();
    }, duration);
    return () => clearTimeout(timer);
  }, [onContinue, duration]);

  return (
    <div
      onClick={onContinue}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(8, 4, 22, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
        cursor: 'pointer'
      }}
      role="alertdialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          width: '90%',
          background: isCorrect
            ? 'linear-gradient(180deg, #48b850 0%, #3ca044 100%)'
            : 'linear-gradient(180deg, #e44b46 0%, #d63732 100%)',
          borderRadius: '26px',
          boxShadow: isCorrect
            ? '0 16px 44px rgba(56, 161, 105, 0.5), 0 4px 16px rgba(0, 0, 0, 0.35)'
            : '0 16px 44px rgba(220, 38, 38, 0.5), 0 4px 16px rgba(0, 0, 0, 0.35)',
          padding: '28px 30px 26px 30px',
          textAlign: 'center',
          animation: 'popIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxSizing: 'border-box'
        }}
      >
        {/* Visual Icon matching the user screenshot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '12px'
          }}
        >
          {isCorrect ? (
            /* Festive Party Popper */
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              {/* Confetti streamers */}
              <path d="M34 10C34 6 38 4 36 2" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
              <path d="M42 14C46 12 50 16 52 14" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
              <path d="M26 14C22 12 18 16 16 14" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
              <circle cx="34" cy="18" r="3" fill="#a855f7" />
              <circle cx="48" cy="24" r="2.5" fill="#f43f5e" />
              <circle cx="20" cy="24" r="2.5" fill="#3b82f6" />
              {/* Party popper cone */}
              <path
                d="M24 48L32 26C33 24 37 24 38 26L46 48C47 50 45 52 43 52L27 52C25 52 23 50 24 48Z"
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="1.5"
              />
              {/* Popper stripes */}
              <path d="M27 42L43 42" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
              <path d="M30 34L40 34" stroke="#ec4899" strokeWidth="3.5" strokeLinecap="round" />
              {/* Burst sparkles */}
              <path d="M28 20L22 18" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M42 20L48 18" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            /* Teary Sad Face matching screenshot 2 */
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              {/* Face circle */}
              <circle cx="34" cy="34" r="28" fill="#facc15" stroke="#eab308" strokeWidth="2" />
              {/* Eyebrows */}
              <path d="M22 22C24 20 28 21 30 23" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M46 22C44 20 40 21 38 23" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" />
              {/* Eyes */}
              <circle cx="26" cy="28" r="4.5" fill="#1e1b4b" />
              <circle cx="27.5" cy="26.5" r="1.5" fill="#ffffff" />
              <circle cx="42" cy="28" r="4.5" fill="#1e1b4b" />
              <circle cx="43.5" cy="26.5" r="1.5" fill="#ffffff" />
              {/* Sad curved mouth */}
              <path d="M26 44C29 40 39 40 42 44" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
              {/* Teardrop on left cheek */}
              <path
                d="M23 34C23 34 20 38 20 40C20 42 21.5 43.5 23 43.5C24.5 43.5 26 42 26 40C26 38 23 34 23 34Z"
                fill="#38bdf8"
              />
            </svg>
          )}
        </div>

        {/* Title matching screenshot */}
        <h2
          style={{
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: '28px',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 10px 0',
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>{isCorrect ? 'Correct!' : 'Not quite!'}</span>
          {isCorrect && <span style={{ fontSize: '24px' }}>🎉</span>}
        </h2>

        {/* Explanation Text */}
        <div
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '17px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.45,
            padding: '0 6px'
          }}
        >
          {explanation}
        </div>
      </div>
    </div>
  );
}
