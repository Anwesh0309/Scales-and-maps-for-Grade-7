import React, { useState } from 'react';

export function StationUnitLadderVisual({ problem }) {
  const [selectedRung, setSelectedRung] = useState('m');
  const [testNumber, setTestNumber] = useState(
    problem?.id === 's2p2' ? '2' : problem?.id === 's2p3' ? '50000' : '250'
  );
  const [activeFormula, setActiveFormula] = useState(null);
  const [prevId, setPrevId] = useState(problem?.id);

  if (prevId !== problem?.id) {
    setPrevId(problem?.id);
    setTestNumber(problem?.id === 's2p2' ? '2' : problem?.id === 's2p3' ? '50000' : '250');
    setActiveFormula(null);
  }

  const handleConvert = (factor, _opName, formulaText) => {
    const val = parseFloat(testNumber);
    if (isNaN(val)) return;
    const res = val * factor;
    setActiveFormula(`${testNumber} × ${factor.toLocaleString()} = ${res.toLocaleString()} cm (${formulaText})`);
  };

  const handleDivide = (divisor, formulaText) => {
    const val = parseFloat(testNumber);
    if (isNaN(val)) return;
    const res = val / divisor;
    setActiveFormula(`${testNumber} ÷ ${divisor} = ${res.toLocaleString()} (${formulaText})`);
  };

  const handleReset = () => {
    setTestNumber('');
    setActiveFormula(null);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '6px 12px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}
    >
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '18px',
              color: '#c084fc',
              fontWeight: 900,
              letterSpacing: '0.4px'
            }}
          >
            🧭 CARTOGRAPHER'S CALIBRATION DESK
          </span>
          <span
            style={{
              fontSize: '13px',
              color: '#4ade80',
              background: '#000000',
              border: '1.5px solid #4ade80',
              padding: '3px 10px',
              borderRadius: '10px',
              fontWeight: 900
            }}
          >
            RATIO 1 : n
          </span>
        </div>

        <span
          style={{
            fontFamily: 'Fredoka, sans-serif',
            fontSize: '14px',
            color: '#facc15',
            background: '#000000',
            border: '1.5px solid #facc15',
            padding: '3px 12px',
            borderRadius: '16px',
            fontWeight: 900
          }}
        >
          {problem.storyContext}
        </span>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '12px', flex: '1 0 auto', minHeight: '230px' }}>
        {/* Left Column: Interactive Metric Unit Ladder */}
        <div
          style={{
            background: 'rgba(10, 5, 25, 0.92)',
            border: '2px solid #c084fc',
            borderRadius: '16px',
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontSize: '14.5px', fontWeight: 900, color: '#ffffff', fontFamily: 'Fredoka, sans-serif' }}>
            🪜 METRIC UNIT LADDER (CLICK RUNGS TO INSPECT)
          </div>

          {/* Rung 1: Kilometres */}
          <div
            onClick={() => setSelectedRung('km')}
            style={{
              background: selectedRung === 'km' ? 'rgba(250, 204, 21, 0.38)' : 'rgba(255, 255, 255, 0.12)',
              border: `2px solid ${selectedRung === 'km' ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '14px',
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 900, color: '#ffffff', fontSize: '18px' }}>
              ⛰️ Kilometres (km)
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '16px', color: '#fde047', fontWeight: 900 }}>
              1 km = 100 000 cm
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ background: '#000000', border: '1.5px solid #38bdf8', padding: '2px 12px', borderRadius: '10px', color: '#38bdf8', fontSize: '13px', fontWeight: 900, fontFamily: 'monospace' }}>
              ↓ × 1 000 (add 3 zeroes) &nbsp;|&nbsp; ↑ ÷ 1 000
            </span>
          </div>

          {/* Rung 2: Metres */}
          <div
            onClick={() => setSelectedRung('m')}
            style={{
              background: selectedRung === 'm' ? 'rgba(56, 189, 248, 0.38)' : 'rgba(255, 255, 255, 0.12)',
              border: `2px solid ${selectedRung === 'm' ? '#38bdf8' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '14px',
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 900, color: '#ffffff', fontSize: '18px' }}>
              🏃 Metres (m)
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '16px', color: '#38bdf8', fontWeight: 900 }}>
              1 m = 100 cm
            </span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ background: '#000000', border: '1.5px solid #4ade80', padding: '2px 12px', borderRadius: '10px', color: '#4ade80', fontSize: '13px', fontWeight: 900, fontFamily: 'monospace' }}>
              ↓ × 100 (add 2 zeroes) &nbsp;|&nbsp; ↑ ÷ 100
            </span>
          </div>

          {/* Rung 3: Centimetres */}
          <div
            onClick={() => setSelectedRung('cm')}
            style={{
              background: selectedRung === 'cm' ? 'rgba(74, 222, 128, 0.38)' : 'rgba(255, 255, 255, 0.12)',
              border: `2px solid ${selectedRung === 'cm' ? '#4ade80' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '14px',
              padding: '8px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 900, color: '#ffffff', fontSize: '18px' }}>
              📏 Centimetres (cm)
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '16px', color: '#4ade80', fontWeight: 900 }}>
              Base Map Unit
            </span>
          </div>
        </div>

        {/* Right Column: Workable Conversion Sandbox Tool */}
        <div
          style={{
            background: 'rgba(10, 5, 25, 0.92)',
            border: '2px solid #facc15',
            borderRadius: '16px',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '14.5px', fontWeight: 900, color: '#facc15', fontFamily: 'Fredoka, sans-serif' }}>
                🧮 INTERACTIVE CONVERSION WORKBENCH
              </span>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            </div>

            {/* Live Input & Conversion Testing Field */}
            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: '#cbd5e1', fontWeight: 800 }}>TEST NUMBER / PRESET:</span>
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <input
                  type="text"
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  placeholder="e.g. 250, 2, 5..."
                  style={{
                    flex: 1,
                    background: '#000000',
                    border: '2px solid #38bdf8',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    color: '#facc15',
                    fontSize: '18px',
                    fontFamily: 'Fredoka, monospace',
                    fontWeight: 900
                  }}
                />
                <button
                  type="button"
                  onClick={() => setTestNumber('250')}
                  style={{
                    background: testNumber === '250' ? '#38bdf8' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    color: testNumber === '250' ? '#000000' : '#ffffff',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '12.5px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  250m
                </button>
                <button
                  type="button"
                  onClick={() => setTestNumber('2')}
                  style={{
                    background: testNumber === '2' ? '#38bdf8' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    color: testNumber === '2' ? '#000000' : '#ffffff',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '12.5px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  2km
                </button>
                <button
                  type="button"
                  onClick={() => setTestNumber('50000')}
                  style={{
                    background: testNumber === '50000' ? '#38bdf8' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    color: testNumber === '50000' ? '#000000' : '#ffffff',
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '12.5px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  50k
                </button>
              </div>
            </div>

            {/* Workable Operation Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
              <button
                type="button"
                onClick={() => handleConvert(100, 'm to cm', 'm → cm')}
                style={{
                  background: 'rgba(56, 189, 248, 0.25)',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '10px',
                  padding: '6px 8px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 900,
                  fontFamily: 'Fredoka, sans-serif',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                ⚡ × 100 (m → cm)
              </button>
              <button
                type="button"
                onClick={() => handleConvert(100000, 'km to cm', 'km → cm')}
                style={{
                  background: 'rgba(250, 204, 21, 0.25)',
                  border: '1.5px solid #facc15',
                  borderRadius: '10px',
                  padding: '6px 8px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 900,
                  fontFamily: 'Fredoka, sans-serif',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                ⚡ × 100 000 (km → cm)
              </button>
              <button
                type="button"
                onClick={() => handleDivide(5, 'Ratio ÷ 5')}
                style={{
                  background: 'rgba(74, 222, 128, 0.25)',
                  border: '1.5px solid #4ade80',
                  borderRadius: '10px',
                  padding: '6px 8px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 900,
                  fontFamily: 'Fredoka, sans-serif',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                ✂️ ÷ 5 (Simplify Ratio)
              </button>
              <button
                type="button"
                onClick={() => handleDivide(2, 'Enlarge 200%')}
                style={{
                  background: 'rgba(192, 132, 252, 0.25)',
                  border: '1.5px solid #c084fc',
                  borderRadius: '10px',
                  padding: '6px 8px',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 900,
                  fontFamily: 'Fredoka, sans-serif',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                🔍 ÷ 2 (200% Enlargement)
              </button>
            </div>

            {/* Live Calculation Output Display */}
            {activeFormula && (
              <div
                style={{
                  background: '#000000',
                  border: '2px solid #4ade80',
                  borderRadius: '10px',
                  padding: '6px 12px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '11px', color: '#86efac', fontWeight: 900 }}>CALCULATION RESULT:</div>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#fde047', fontFamily: 'Fredoka, monospace' }}>
                  {activeFormula}
                </div>
              </div>
            )}
          </div>

          {/* Golden Rule Callout */}
          <div
            style={{
              background: '#000000',
              border: '2px dashed #facc15',
              borderRadius: '10px',
              padding: '6px 12px',
              textAlign: 'center',
              fontSize: '13.5px',
              fontWeight: 900,
              fontFamily: 'Fredoka, sans-serif',
              color: '#fde047'
            }}
          >
            ⚡ Rule: Both sides must be in centimetres before writing 1 : n!
          </div>
        </div>
      </div>

      {/* Story Narrative Box */}
      <div
        style={{
          marginTop: '6px',
          background: 'rgba(10, 5, 25, 0.9)',
          border: '1.5px solid #c084fc',
          borderRadius: '12px',
          padding: '6px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <span style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontWeight: 800 }}>
          📖 <strong style={{ color: '#facc15' }}>Story 2 & 5:</strong> 'A scale is a promise.' Ratios have NO units because centimetres cancel!
        </span>
        <span style={{ fontSize: '13.5px', color: '#c084fc', fontFamily: 'Fredoka, sans-serif', fontWeight: 900 }}>
          Ratio: 1 : n (1 cm on map = n cm on ground)
        </span>
      </div>
    </div>
  );
}

export default function StationUnitLadder({ problem }) {
  return <StationUnitLadderVisual problem={problem} />;
}
