import React from 'react';

export default function TopBar({ phase, completed, onGoPhase, audioEnabled, onToggleAudio, onHome, onClose }) {
  const steps = [
    { key: 'wonder', num: '01', icon: '🧭', label: 'Wonder' },
    { key: 'story', num: '02', icon: '📖', label: 'Story' },
    { key: 'simulate', num: '03', icon: '🧪', label: 'Simulate' },
    { key: 'play', num: '04', icon: '🎮', label: 'Practice' },
    { key: 'reflect', num: '05', icon: '📋', label: 'Reflect' }
  ];

  return (
    <header className="glass-header">
      {/* Home Button - scaled up for Grade 3 visibility */}
      <button 
        type="button" 
        onClick={onHome} 
        className="btn-icon-glass"
        title="Return to Home"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(26, 15, 60, 0.75)',
          border: '1.5px solid rgba(255, 255, 255, 0.24)',
          borderRadius: '50px',
          padding: '8px 22px',
          color: '#ffffff',
          fontFamily: 'Fredoka, Nunito, sans-serif',
          fontSize: '16px',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          transition: 'all 0.15s'
        }}
      >
        <span style={{ fontSize: '19px' }}>🏠</span>
        <span>Home</span>
      </button>

      {/* 5-Node Phase Stepper (Pill buttons with connecting lines) */}
      <nav 
        aria-label="Phase Stepper"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 1vw, 12px)',
          background: 'rgba(18, 10, 44, 0.8)',
          padding: '6px clamp(10px, 1.2vw, 18px)',
          borderRadius: '50px',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          boxShadow: '0 8px 26px rgba(0, 0, 0, 0.45)'
        }}
      >
        {steps.map((step, idx) => {
          const isActive = phase === step.key;
          const isDone = completed[step.key];

          return (
            <React.Fragment key={step.key}>
              <button
                type="button"
                onClick={() => onGoPhase(step.key)}
                style={{
                  background: isActive
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(255, 255, 255, 0.06)',
                  border: isActive
                    ? '2px solid #ffffff'
                    : '1.2px solid rgba(255, 255, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  opacity: 1,
                  padding: '6px 15px',
                  borderRadius: '35px',
                  transition: 'all 0.2s',
                  color: isActive ? '#ffffff' : '#e2e8f0',
                  boxShadow: isActive ? '0 0 18px rgba(255, 255, 255, 0.4)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.38)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                  }
                }}
              >
                {/* Step number badge circle */}
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13.5px',
                    fontWeight: 900,
                    fontFamily: 'Fredoka, sans-serif',
                    background: isActive
                      ? '#facc15'
                      : isDone
                      ? '#22c55e'
                      : 'rgba(255, 255, 255, 0.22)',
                    color: isActive ? '#0f0926' : '#fff',
                    boxShadow: isActive ? '0 0 10px #facc15' : 'none',
                    flexShrink: 0
                  }}
                >
                  {isDone && !isActive ? '✓' : step.num}
                </span>

                {/* Step Icon */}
                <span style={{ fontSize: '17px' }}>{step.icon}</span>

                {/* Step Label */}
                <span
                  style={{
                    fontFamily: 'Fredoka, Nunito, sans-serif',
                    fontSize: '16px',
                    fontWeight: isActive ? 900 : 800,
                    letterSpacing: '0.2px',
                    display: 'inline-block'
                  }}
                >
                  {step.label}
                </span>
              </button>

              {/* Connecting line between pills */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    width: 'clamp(8px, 1vw, 14px)',
                    height: '2px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '1px'
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Audio Sound / Muted Toggle Pill Inside Stepper Bar */}
        <button
          type="button"
          onClick={onToggleAudio}
          style={{
            background: audioEnabled ? 'rgba(139, 92, 246, 0.25)' : 'rgba(239, 68, 68, 0.25)',
            border: `1.8px solid ${audioEnabled ? 'rgba(167, 139, 250, 0.55)' : 'rgba(248, 113, 113, 0.55)'}`,
            borderRadius: '50px',
            padding: '6px 15px',
            color: audioEnabled ? '#ddd6fe' : '#fca5a5',
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            cursor: 'pointer',
            marginLeft: '6px'
          }}
          title={audioEnabled ? 'Mute narration' : 'Enable sound'}
        >
          <span style={{ fontSize: '16px' }}>{audioEnabled ? '🔊' : '🔇'}</span>
          <span>{audioEnabled ? 'Sound' : 'Muted'}</span>
        </button>
      </nav>

      {/* Close Button */}
      <button 
        type="button" 
        onClick={onClose || onHome} 
        className="btn-close"
        title="Exit to Landing"
      >
        ✕
      </button>
    </header>
  );
}
