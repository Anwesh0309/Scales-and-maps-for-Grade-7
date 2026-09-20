import React from 'react';

export default function QuestionVisual({ visual }) {
  if (!visual) return null;

  return (
    <div
      style={{
        background: 'rgba(15, 10, 38, 0.85)',
        border: '2.5px solid rgba(56, 189, 248, 0.45)',
        borderRadius: '22px',
        padding: '16px 24px',
        margin: '12px auto',
        maxWidth: '740px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.5), inset 0 2px 16px rgba(0,0,0,0.4)',
        boxSizing: 'border-box'
      }}
      aria-label="Question diagram"
    >
      {/* 1. Direct Image or Custom URL visual */}
      {(visual.image || visual.url || visual.src || visual.type === 'image') && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          {visual.title && (
            <div
              style={{
                fontSize: '18px',
                fontFamily: 'Fredoka, sans-serif',
                color: '#facc15',
                fontWeight: 900,
                letterSpacing: '0.6px',
                marginBottom: '10px'
              }}
            >
              {visual.title}
            </div>
          )}
          <img
            src={visual.image || visual.url || visual.src}
            alt={visual.alt || 'Question illustration'}
            style={{
              maxWidth: '100%',
              maxHeight: '280px',
              borderRadius: '18px',
              border: '2.5px solid rgba(56, 189, 248, 0.5)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.55)',
              objectFit: 'contain'
            }}
          />
        </div>
      )}

      {/* 2. Graphical Scale Bar */}
      {visual.type === 'bar' && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              fontSize: '17px',
              fontFamily: 'Fredoka, sans-serif',
              color: '#facc15',
              fontWeight: 900,
              letterSpacing: '0.8px',
              marginBottom: '10px'
            }}
          >
            📏 GRAPHICAL SCALE BAR ({visual.lengthCm} cm on map)
          </div>
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 520 86"
            style={{ maxWidth: '520px', display: 'block', margin: '0 auto' }}
          >
            {/* Scale Bar Segments */}
            <rect x="30" y="16" width="230" height="26" fill="#ffffff" stroke="#facc15" strokeWidth="3" />
            <rect x="260" y="16" width="230" height="26" fill="#0f172a" stroke="#facc15" strokeWidth="3" />
            {/* Bold End Ticks and Mid Tick */}
            <line x1="30" y1="8" x2="30" y2="48" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
            <line x1="260" y1="8" x2="260" y2="48" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
            <line x1="490" y1="8" x2="490" y2="48" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
            {/* Extra Large Labels for Grade 3 */}
            <text x="30" y="76" fill="#f8fafc" fontSize="21" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">0</text>
            <text x="260" y="76" fill="#f8fafc" fontSize="21" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">
              {visual.realLabel ? (parseFloat(visual.realLabel) / 2) + visual.realLabel.replace(/[\d.]/g, '') : '1 km'}
            </text>
            <text x="490" y="76" fill="#facc15" fontSize="21" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">
              {visual.realLabel || '2 km'}
            </text>
          </svg>
        </div>
      )}

      {/* 3. Surveyor Measurement Ruler */}
      {visual.type === 'ruler' && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              fontSize: '17px',
              fontFamily: 'Fredoka, sans-serif',
              color: '#38bdf8',
              fontWeight: 900,
              letterSpacing: '0.8px',
              marginBottom: '8px'
            }}
          >
            🧭 SURVEYOR MEASUREMENT: {visual.lengthCm} cm
          </div>
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 520 114"
            style={{ maxWidth: '520px', display: 'block', margin: '0 auto' }}
          >
            {/* Background terrain */}
            <rect x="15" y="10" width="490" height="94" rx="16" fill="#1e1b4b" stroke="rgba(255, 255, 255, 0.24)" strokeWidth="2" />
            
            {/* Trail */}
            <line x1="82" y1="52" x2="438" y2="52" stroke="#facc15" strokeWidth="4" strokeDasharray="8,6" />

            {/* Landmark A */}
            <circle cx="62" cy="52" r="18" fill="#3b82f6" stroke="#93c5fd" strokeWidth="3" />
            <text x="62" y="58" fill="#ffffff" fontSize="18" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">A</text>
            <text x="62" y="94" fill="#cbd5e1" fontSize="14" fontFamily="Fredoka, sans-serif" fontWeight="800" textAnchor="middle">{visual.labelA || 'Harbor'}</text>

            {/* Landmark B */}
            <circle cx="458" cy="52" r="18" fill="#ef4444" stroke="#fca5a5" strokeWidth="3" />
            <text x="458" y="58" fill="#ffffff" fontSize="18" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">B</text>
            <text x="458" y="94" fill="#cbd5e1" fontSize="14" fontFamily="Fredoka, sans-serif" fontWeight="800" textAnchor="middle">{visual.labelB || 'Peak'}</text>

            {/* Ruler Overlay */}
            <rect x="46" y="26" width="428" height="28" rx="5" fill="rgba(255, 255, 255, 0.96)" stroke="#334155" strokeWidth="2" />
            {/* Ruler ticks */}
            {[0, 35.6, 71.3, 107, 142.6, 178.3, 214, 249.6, 285.3, 321, 356.6, 392.3, 428].map((x, i) => (
              <line
                key={i}
                x1={46 + x}
                y1="26"
                x2={46 + x}
                y2={i % 2 === 0 ? 43 : 36}
                stroke="#0f172a"
                strokeWidth={i % 2 === 0 ? 2.2 : 1.4}
              />
            ))}
            <text
              x="260"
              y="20"
              fill="#facc15"
              fontSize="18"
              fontFamily="Fredoka, sans-serif"
              fontWeight="900"
              textAnchor="middle"
            >
              {visual.lengthCm} cm on map
            </text>
          </svg>
        </div>
      )}

      {/* 4. Area Grid Visual */}
      {visual.type === 'grid' && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              fontSize: '17px',
              fontFamily: 'Fredoka, sans-serif',
              color: '#4ade80',
              fontWeight: 900,
              letterSpacing: '0.8px',
              marginBottom: '8px'
            }}
          >
            🗺️ AREA GRID: {visual.label || '1 cm² Grid Map'}
          </div>
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 420 160"
            style={{ maxWidth: '420px', display: 'block', margin: '0 auto' }}
          >
            {/* Grid background */}
            <rect x="0" y="0" width="420" height="160" rx="12" fill="#130d36" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            {/* Grid lines */}
            {[0, 70, 140, 210, 280, 350, 420].map((x) => (
              <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="160" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" />
            ))}
            {[0, 40, 80, 120, 160].map((y) => (
              <line key={`y-${y}`} x1="0" y1={y} x2="420" y2={y} stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" />
            ))}
            {/* Shaded area */}
            <rect x="70" y="40" width="140" height="80" rx="10" fill="rgba(56, 189, 248, 0.6)" stroke="#38bdf8" strokeWidth="3" />
            <text x="140" y="88" fill="#ffffff" fontSize="22" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">
              Lake
            </text>
          </svg>
        </div>
      )}

      {/* 5. Floor Plan Visual */}
      {visual.type === 'plan' && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              fontSize: '17px',
              fontFamily: 'Fredoka, sans-serif',
              color: '#facc15',
              fontWeight: 900,
              letterSpacing: '0.8px',
              marginBottom: '8px'
            }}
          >
            📐 FLOOR PLAN (Scale 1 : 50)
          </div>
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 480 144"
            style={{ maxWidth: '480px', display: 'block', margin: '0 auto' }}
          >
            {/* Room Boundary */}
            <rect x="30" y="16" width="370" height="92" rx="12" fill="rgba(139, 92, 246, 0.32)" stroke="#a78bfa" strokeWidth="3" />
            
            {/* Width Dimension Indicator */}
            <line x1="30" y1="124" x2="400" y2="124" stroke="#facc15" strokeWidth="2.5" />
            <line x1="30" y1="116" x2="30" y2="132" stroke="#facc15" strokeWidth="2.5" />
            <line x1="400" y1="116" x2="400" y2="132" stroke="#facc15" strokeWidth="2.5" />
            <text x="215" y="138" fill="#facc15" fontSize="17" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">
              {visual.widthCm} cm
            </text>
            
            {/* Height Dimension Indicator */}
            <line x1="416" y1="16" x2="416" y2="108" stroke="#facc15" strokeWidth="2.5" />
            <line x1="408" y1="16" x2="424" y2="16" stroke="#facc15" strokeWidth="2.5" />
            <line x1="408" y1="108" x2="424" y2="108" stroke="#facc15" strokeWidth="2.5" />
            <text x="428" y="68" fill="#facc15" fontSize="17" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="start">
              {visual.heightCm} cm
            </text>
            
            {/* Room Title inside */}
            <text x="215" y="68" fill="#ffffff" fontSize="22" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">
              {visual.label || 'Living Room'}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}
