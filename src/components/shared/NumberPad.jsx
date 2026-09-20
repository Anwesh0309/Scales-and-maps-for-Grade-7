import React, { useEffect, useCallback } from 'react';

export default function NumberPad({
  value = '',
  onChange,
  onSubmit,
  _onSubmit,
  placeholder = '0',
  hideDisplay = false,
  layout = '3x4'
}) {
  const submitHandler = onSubmit || _onSubmit;

  const handleDigit = useCallback((d) => {
    if (d === '.' && value.includes('.')) return;
    if (value.length >= 8) return;
    onChange(value + d);
  }, [value, onChange]);

  const handleBackspace = useCallback(() => {
    onChange(value.slice(0, -1));
  }, [value, onChange]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input, textarea or select
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleDigit('.');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Enter' && submitHandler) {
        e.preventDefault();
        submitHandler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleBackspace, submitHandler]);

  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

  const isWide = layout === '6x2';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        maxWidth: isWide ? '360px' : '250px',
        width: '100%'
      }}
    >
      {!hideDisplay && (
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.55)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '14px',
            padding: '7px 16px',
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: '26px',
            fontWeight: 900,
            color: value ? '#facc15' : '#94a3b8',
            textAlign: 'right',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)'
          }}
        >
          {value || placeholder}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isWide ? 'repeat(6, 1fr)' : 'repeat(3, 1fr)',
          gap: '7px'
        }}
      >
        {buttons.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => (b === '⌫' ? handleBackspace() : handleDigit(b))}
            style={{
              background: b === '⌫' ? 'rgba(239, 68, 68, 0.38)' : 'rgba(255, 255, 255, 0.16)',
              border: '2px solid rgba(255, 255, 255, 0.28)',
              borderRadius: '12px',
              color: '#ffffff',
              fontFamily: 'Fredoka, Nunito, sans-serif',
              fontSize: isWide ? '20px' : '22px',
              fontWeight: 900,
              padding: '9px 0',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s',
              boxShadow: '0 3px 8px rgba(0,0,0,0.4)',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                b === '⌫' ? 'rgba(239, 68, 68, 0.65)' : 'rgba(255, 255, 255, 0.32)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                b === '⌫' ? 'rgba(239, 68, 68, 0.38)' : 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
