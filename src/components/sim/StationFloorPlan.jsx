import React, { useState } from 'react';

export function StationFloorPlanVisual({ problem }) {
  const isLighthouse = problem.id === 's4p2';
  const isBeetle = problem.id === 's4p3';

  // Workable interactive caliper tool
  const [activeInspector, setActiveInspector] = useState(
    isLighthouse ? 'door' : isBeetle ? 'length' : 'length'
  );
  const [zoomLevel, setZoomLevel] = useState(isBeetle ? 5 : 1);
  const [prevId, setPrevId] = useState(problem.id);

  if (prevId !== problem.id) {
    setPrevId(problem.id);
    setActiveInspector(isLighthouse ? 'door' : 'length');
    setZoomLevel(isBeetle ? 5 : 1);
  }

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
              color: '#fb923c',
              fontWeight: 900,
              letterSpacing: '0.4px'
            }}
          >
            📐 ARCHITECT'S WORKSHOP & SCALE MODELS
          </span>
          <span
            style={{
              fontSize: '13px',
              color: '#38bdf8',
              background: '#000000',
              border: '1.5px solid #38bdf8',
              padding: '2px 10px',
              borderRadius: '10px',
              fontWeight: 900
            }}
          >
            {isLighthouse ? '3D PHYSICAL MODEL (1 : 20)' : isBeetle ? 'FIELD MICROSCOPE (5 : 1)' : 'CAD BLUEPRINT (1 : 50)'}
          </span>
        </div>

        {/* Workable Inspection Mode Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {!isLighthouse && !isBeetle && (
            <>
              <button
                type="button"
                onClick={() => setActiveInspector('length')}
                style={{
                  background: activeInspector === 'length' ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  border: `2px solid ${activeInspector === 'length' ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '4px 12px',
                  color: '#ffffff',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                📐 Caliper Length (8 m)
              </button>
              <button
                type="button"
                onClick={() => setActiveInspector('width')}
                style={{
                  background: activeInspector === 'width' ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  border: `2px solid ${activeInspector === 'width' ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '4px 12px',
                  color: '#ffffff',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                📐 Caliper Width (6 m)
              </button>
            </>
          )}

          {isLighthouse && (
            <>
              <button
                type="button"
                onClick={() => setActiveInspector('door')}
                style={{
                  background: activeInspector === 'door' ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  border: `2px solid ${activeInspector === 'door' ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '4px 12px',
                  color: '#ffffff',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                🗼 Caliper Model Door (9 cm)
              </button>
              <button
                type="button"
                onClick={() => setActiveInspector('lantern')}
                style={{
                  background: activeInspector === 'lantern' ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  border: `2px solid ${activeInspector === 'lantern' ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '4px 12px',
                  color: '#ffffff',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                💡 Inspect Lantern
              </button>
            </>
          )}

          {isBeetle && (
            <>
              <button
                type="button"
                onClick={() => setZoomLevel(zoomLevel === 5 ? 1 : 5)}
                style={{
                  background: zoomLevel === 5 ? 'rgba(45, 212, 191, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  border: `2px solid ${zoomLevel === 5 ? '#2dd4bf' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '4px 12px',
                  color: '#ffffff',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                {zoomLevel === 5 ? '🔍 Lens: 5× Zoom' : '🔍 Lens: 1× Actual'}
              </button>
              <button
                type="button"
                onClick={() => setActiveInspector('length')}
                style={{
                  background: activeInspector === 'length' ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  border: `2px solid ${activeInspector === 'length' ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '16px',
                  padding: '4px 12px',
                  color: '#ffffff',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '13.5px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                📏 Caliper Drawing (6 cm)
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main SVG Blueprint / Model Canvas */}
      <div
        style={{
          position: 'relative',
          flex: '1 0 230px',
          minHeight: '230px',
          overflow: 'hidden',
          borderRadius: '16px',
          border: '2px solid rgba(56, 189, 248, 0.45)',
          background: '#0a1d37'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 720 240" style={{ display: 'block' }}>
          <defs>
            <pattern id="cadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="0.9" />
            </pattern>
          </defs>

          {/* Blueprint Grid Background */}
          <rect width="720" height="240" fill="#0c2340" />
          <rect width="720" height="240" fill="url(#cadGrid)" />

          {/* 1. Cabin Floor Plan (1 : 50) */}
          {!isLighthouse && !isBeetle && (
            <g transform="translate(30, 10)">
              {/* Outer Cabin Walls */}
              <rect
                x="50"
                y="30"
                width="380"
                height="150"
                fill="#071a33"
                stroke={activeInspector === 'length' || activeInspector === 'width' ? '#facc15' : '#38bdf8'}
                strokeWidth="4.5"
                rx="4"
              />
              <line x1="260" y1="30" x2="260" y2="180" stroke="#38bdf8" strokeWidth="4" />
              <line x1="50" y1="105" x2="170" y2="105" stroke="#38bdf8" strokeWidth="3.5" />

              {/* Door Swing Arcs */}
              <path d="M 260,105 A 32,32 0 0,0 292,137" fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4,4" />
              <line x1="260" y1="105" x2="260" y2="137" stroke="#facc15" strokeWidth="3" />

              {/* Room 1: Map Drafting Room */}
              <g transform="translate(65, 42)">
                <rect width="185" height="38" rx="8" fill="#000000" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="92" y="19" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                  🧭 Map Drafting Room
                </text>
                <text x="92" y="32" fill="#fde047" fontSize="12" fontWeight="800" textAnchor="middle">
                  Actual Length: 8.0 m
                </text>
              </g>

              {/* Room 2: Radio Nook */}
              <g transform="translate(60, 122)">
                <rect width="115" height="30" rx="6" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
                <text x="57" y="20" fill="#ffffff" fontSize="13.5" fontWeight="900" textAnchor="middle">
                  📻 Radio Nook
                </text>
              </g>

              {/* Room 3: Porch */}
              <g transform="translate(275, 82)">
                <rect width="145" height="38" rx="8" fill="#000000" stroke="#facc15" strokeWidth="1.5" />
                <text x="72" y="19" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                  🥾 Ranger Porch
                </text>
                <text x="72" y="32" fill="#fde047" fontSize="12" fontWeight="800" textAnchor="middle">
                  Actual Width: 6.0 m
                </text>
              </g>

              {/* Top Dimension Leader Arrow: Length (Cleaned - NO ANSWER LEAK) */}
              <line
                x1="50"
                y1="18"
                x2="430"
                y2="18"
                stroke={activeInspector === 'length' ? '#facc15' : 'rgba(250, 204, 21, 0.5)'}
                strokeWidth={activeInspector === 'length' ? '4' : '2.5'}
              />
              <line x1="50" y1="8" x2="50" y2="28" stroke="#facc15" strokeWidth="3" />
              <line x1="430" y1="8" x2="430" y2="28" stroke="#facc15" strokeWidth="3" />
              <g transform="translate(110, 2)">
                <rect
                  width="260"
                  height="26"
                  rx="6"
                  fill="#000000"
                  stroke={activeInspector === 'length' ? '#facc15' : 'rgba(250, 204, 21, 0.6)'}
                  strokeWidth="2"
                />
                <text x="130" y="18" fill="#fde047" fontSize="13.5" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                  📏 Real Length: 8.0 m (= 800 cm)
                </text>
              </g>

              {/* Right Dimension Leader Arrow: Width (Cleaned - NO ANSWER LEAK) */}
              <line
                x1="445"
                y1="30"
                x2="445"
                y2="180"
                stroke={activeInspector === 'width' ? '#facc15' : 'rgba(250, 204, 21, 0.5)'}
                strokeWidth={activeInspector === 'width' ? '4' : '2.5'}
              />
              <line x1="435" y1="30" x2="455" y2="30" stroke="#facc15" strokeWidth="3" />
              <line x1="435" y1="180" x2="455" y2="180" stroke="#facc15" strokeWidth="3" />
              <g transform="translate(455, 88)">
                <rect
                  width="195"
                  height="30"
                  rx="6"
                  fill="#000000"
                  stroke={activeInspector === 'width' ? '#facc15' : 'rgba(250, 204, 21, 0.6)'}
                  strokeWidth="1.5"
                />
                <text x="97" y="20" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                  📐 Real Width: 6.0 m (= 600 cm)
                </text>
              </g>

              {/* CAD Title Block */}
              <g transform="translate(455, 126)">
                <rect width="210" height="58" fill="#000000" stroke="#38bdf8" strokeWidth="2" />
                <text x="12" y="18" fill="#38bdf8" fontSize="12" fontWeight="900">CABIN BLUEPRINT</text>
                <text x="12" y="35" fill="#ffffff" fontSize="13" fontWeight="900">SCALE 1 : 50 (1 cm = 50 cm)</text>
                <text x="12" y="50" fill="#facc15" fontSize="11.5" fontWeight="900">ISLE OF WHISPERS ARCHIVES</text>
              </g>
            </g>
          )}

          {/* 2. Beacon Lighthouse Model (1 : 20) */}
          {isLighthouse && (
            <g transform="translate(140, 10)">
              <polygon points="180,40 240,40 260,200 160,200" fill="#ffffff" stroke="#dc2626" strokeWidth="4.5" />
              <polygon points="175,80 245,80 250,110 170,110" fill="#dc2626" />
              <polygon points="165,140 255,140 260,170 160,170" fill="#dc2626" />

              {/* Lantern Room */}
              <rect
                x="185"
                y="15"
                width="50"
                height="25"
                fill={activeInspector === 'lantern' ? '#fef08a' : '#fef08a'}
                stroke={activeInspector === 'lantern' ? '#f59e0b' : '#f59e0b'}
                strokeWidth={activeInspector === 'lantern' ? '4' : '3'}
                rx="4"
              />
              <polygon points="210,25 450,0 450,70" fill="rgba(254, 240, 138, 0.35)" />

              {/* Model Entrance Door */}
              <rect
                x="195"
                y="165"
                width="30"
                height="35"
                fill="#78350f"
                stroke={activeInspector === 'door' ? '#facc15' : '#d97706'}
                strokeWidth={activeInspector === 'door' ? '4' : '2.5'}
                rx="3"
              />
              <circle cx="200" cy="182" r="2.5" fill="#facc15" />

              {/* Dimension Arrow for Model Door (Cleaned - NO ANSWER LEAK) */}
              <line x1="240" y1="165" x2="240" y2="200" stroke="#facc15" strokeWidth="3.5" />
              <line x1="233" y1="165" x2="247" y2="165" stroke="#facc15" strokeWidth="3" />
              <line x1="233" y1="200" x2="247" y2="200" stroke="#facc15" strokeWidth="3" />
              <g transform="translate(250, 168)">
                <rect width="180" height="28" rx="6" fill="#000000" stroke="#facc15" strokeWidth="2" />
                <text x="90" y="19" fill="#fde047" fontSize="13.5" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                  📏 Model Door: 9 cm tall
                </text>
              </g>

              {/* Brass Pedestal Plaque */}
              <g transform="translate(90, 204)">
                <rect width="240" height="30" rx="6" fill="#000000" stroke="#facc15" strokeWidth="2.5" />
                <text x="120" y="20" fill="#fde047" fontSize="14" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                  BEACON TOWER MODEL · SCALE 1 : 20
                </text>
              </g>
            </g>
          )}

          {/* 3. Field Microscope Pine Beetle (5 : 1 Enlargement) */}
          {isBeetle && (
            <g transform="translate(180, 15)">
              <circle cx="180" cy="105" r="95" fill="#042f2e" stroke="#2dd4bf" strokeWidth="4.5" />
              <ellipse
                cx="180"
                cy="105"
                rx={zoomLevel === 5 ? 35 : 18}
                ry={zoomLevel === 5 ? 55 : 28}
                fill="#15803d"
                stroke="#86efac"
                strokeWidth="3.5"
                style={{ transition: 'all 0.3s ease' }}
              />
              <ellipse
                cx="180"
                cy={zoomLevel === 5 ? 45 : 75}
                rx={zoomLevel === 5 ? 20 : 10}
                ry={zoomLevel === 5 ? 15 : 8}
                fill="#14532d"
                stroke="#86efac"
                strokeWidth="2.5"
                style={{ transition: 'all 0.3s ease' }}
              />
              <line x1="145" y1="80" x2="110" y2="60" stroke="#86efac" strokeWidth="3.5" />
              <line x1="215" y1="80" x2="250" y2="60" stroke="#86efac" strokeWidth="3.5" />
              <line x1="145" y1="120" x2="105" y2="135" stroke="#86efac" strokeWidth="3.5" />
              <line x1="215" y1="120" x2="255" y2="135" stroke="#86efac" strokeWidth="3.5" />

              {/* Dimension Arrow for Drawing (Cleaned - NO ANSWER LEAK) */}
              <line x1="230" y1="40" x2="230" y2="160" stroke="#facc15" strokeWidth="3.5" />
              <line x1="220" y1="40" x2="240" y2="40" stroke="#facc15" strokeWidth="3" />
              <line x1="220" y1="160" x2="240" y2="160" stroke="#facc15" strokeWidth="3" />
              <g transform="translate(245, 88)">
                <rect width="210" height="30" rx="6" fill="#000000" stroke="#facc15" strokeWidth="2" />
                <text x="105" y="20" fill="#fde047" fontSize="14" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                  Drawing: 6 cm (Scale 5 : 1)
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Story 8 Narrative & Formula Box */}
      <div
        style={{
          marginTop: '6px',
          background: 'rgba(20, 10, 0, 0.9)',
          border: '1.5px solid #fb923c',
          borderRadius: '12px',
          padding: '6px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <span style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontWeight: 800 }}>
          📖 <strong style={{ color: '#facc15' }}>Story 8:</strong>{' '}
          {isBeetle
            ? 'Scale 5 : 1 is an Enlargement! Drawing length is 5 times actual real life.'
            : isLighthouse
            ? 'Scale 1 : 20 is a Reduction! Real lighthouse is 20 times the model size.'
            : 'Scale 1 : 50 is a Reduction! Real cabin is 50 times the blueprint size.'}
        </span>
        <span style={{ fontSize: '13.5px', color: '#fb923c', fontFamily: 'Fredoka, sans-serif', fontWeight: 900 }}>
          {isBeetle ? 'Actual = Drawing ÷ 5' : isLighthouse ? 'Real = Model × 20' : 'Blueprint cm = Real cm ÷ 50'}
        </span>
      </div>
    </div>
  );
}

export default function StationFloorPlan({ problem }) {
  return <StationFloorPlanVisual problem={problem} />;
}
