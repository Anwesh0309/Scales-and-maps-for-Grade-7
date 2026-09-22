import React, { useState, useRef, useEffect, useCallback } from 'react';

export function StationMapVisual({ problem }) {
  // SVG viewBox is 720 x 260
  // Ruler initial position: parked near top of map
  const [rulerPos, setRulerPos] = useState({ x: 30, y: 15, angle: 0 });
  const [isDragging, setIsDragging] = useState(null); // 'drag' | 'rotate' | null
  const [markerCm, setMarkerCm] = useState(null);
  const [prevId, setPrevId] = useState(problem?.id);
  const svgRef = useRef(null);
  const dragStartRef = useRef({ startX: 0, startY: 0, startAngle: 0, svgX: 0, svgY: 0 });

  // Reset ruler position and marker when switching problems
  if (prevId !== problem?.id) {
    setPrevId(problem?.id);
    setMarkerCm(null);
    setRulerPos({ x: 30, y: 15, angle: 0 });
  }

  // Convert client coordinates to SVG user coordinates
  const getSVGCoords = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return { x: e.clientX, y: e.clientY };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: e.clientX, y: e.clientY };
    return pt.matrixTransform(ctm.inverse());
  }, []);

  const handlePointerDown = (e, mode = 'drag') => {
    if (e.preventDefault) e.preventDefault();
    e.stopPropagation();
    setIsDragging(mode);
    const svgPt = getSVGCoords(e);
    dragStartRef.current = {
      startX: rulerPos.x,
      startY: rulerPos.y,
      startAngle: rulerPos.angle,
      svgX: svgPt.x,
      svgY: svgPt.y
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e) => {
      const svgPt = getSVGCoords(e);
      if (isDragging === 'drag') {
        const dx = svgPt.x - dragStartRef.current.svgX;
        const dy = svgPt.y - dragStartRef.current.svgY;
        setRulerPos((prev) => ({
          ...prev,
          // Allow full fluid dragging across the entire SVG map and beyond
          x: Math.max(-280, Math.min(720, dragStartRef.current.startX + dx)),
          y: Math.max(-50, Math.min(250, dragStartRef.current.startY + dy))
        }));
      } else if (isDragging === 'rotate') {
        // Calculate angle from ruler's 0-point (rulerPos.x + 25, rulerPos.y + 18) to cursor
        const originX = rulerPos.x + 25;
        const originY = rulerPos.y + 18;
        const dx = svgPt.x - originX;
        const dy = svgPt.y - originY;
        const angleDeg = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
        setRulerPos((prev) => ({
          ...prev,
          angle: (angleDeg + 360) % 360
        }));
      }
    };

    const onPointerUp = () => {
      setIsDragging(null);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging, getSVGCoords, rulerPos.x, rulerPos.y]);

  const rotateRuler = (delta) => {
    setRulerPos((prev) => ({ ...prev, angle: (prev.angle + delta + 360) % 360 }));
  };

  const handleAngleSlider = (newAngle) => {
    setRulerPos((prev) => ({ ...prev, angle: parseInt(newAngle, 10) }));
  };

  // 1 cm on map & ruler = 65 SVG units
  // Pinecrest Harbor is at (80, 115)
  // Beacon Lighthouse is at (494, 175) -> distance = 418.3 units = 6.43 cm -> angle = 8.3 deg
  const handleSnapToTrail = () => {
    setRulerPos({ x: 55, y: 97, angle: 8 });
  };

  // Falcon Lookout is at (280, 145) -> dx = 200, dy = 30 -> angle = 8.5 deg
  const handleSnapToLookout = () => {
    setRulerPos({ x: 55, y: 97, angle: 9 });
  };

  // Pinecrest Woods patrol trail is at (170, 165)
  const handleSnapToWoods = () => {
    setRulerPos({ x: 145, y: 147, angle: 12 });
  };

  const handleResetRuler = () => {
    setRulerPos({ x: 30, y: 15, angle: 0 });
    setMarkerCm(null);
  };

  const handleSlideMarker = () => {
    const targetCm = problem?.mapLengthCm ? Math.min(problem.mapLengthCm, 7.0) : 6.4;
    setMarkerCm(markerCm === null ? targetCm : null);
  };

  // Ruler dimensions: 1 cm = 65px. 7 cm ruler = 455px (plus 25px left & 35px right = 515px total)
  const CM_UNIT = 65;
  const ZERO_X = 25;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        gap: '6px',
        overflowY: 'auto'
      }}
    >
      {/* Top Header Controls - Workable across the whole area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px',
          flexShrink: 0,
          zIndex: 2,
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '17px',
              color: '#38bdf8',
              fontWeight: 900,
              letterSpacing: '0.4px'
            }}
          >
            🗺️ TOPOGRAPHIC TRAIL MAP
          </span>
          <span
            style={{
              fontSize: '12.5px',
              color: '#facc15',
              background: '#000000',
              border: '1.5px solid #facc15',
              padding: '2px 8px',
              borderRadius: '10px',
              fontWeight: 900
            }}
          >
            SCALE 1 cm : 500 m
          </span>
        </div>

        {/* Workable Action Buttons */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleSnapToTrail}
            style={{
              background: 'rgba(56, 189, 248, 0.35)',
              border: '2px solid #38bdf8',
              borderRadius: '18px',
              padding: '4px 12px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            📍 Snap to Lighthouse
          </button>
          <button
            type="button"
            onClick={handleSnapToLookout}
            style={{
              background: 'rgba(245, 158, 11, 0.35)',
              border: '2px solid #f59e0b',
              borderRadius: '18px',
              padding: '4px 10px',
              color: '#fde047',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            🦅 Snap to Lookout
          </button>
          <button
            type="button"
            onClick={handleSnapToWoods}
            style={{
              background: 'rgba(74, 222, 128, 0.35)',
              border: '2px solid #4ade80',
              borderRadius: '18px',
              padding: '4px 10px',
              color: '#86efac',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            🌲 Snap to Woods
          </button>
          <button
            type="button"
            onClick={handleSlideMarker}
            style={{
              background: markerCm !== null ? 'rgba(239, 68, 68, 0.45)' : 'rgba(250, 204, 21, 0.35)',
              border: `2px solid ${markerCm !== null ? '#ef4444' : '#facc15'}`,
              borderRadius: '18px',
              padding: '4px 10px',
              color: markerCm !== null ? '#fca5a5' : '#fde047',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            {markerCm !== null ? '✕ Clear Marker' : '🎯 Target Marker'}
          </button>

          {/* Stepped Rotation Controls */}
          <button
            type="button"
            onClick={() => rotateRuler(-5)}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '16px',
              padding: '4px 8px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            ↺ -5°
          </button>
          <button
            type="button"
            onClick={() => rotateRuler(5)}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              borderRadius: '16px',
              padding: '4px 8px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            ↻ +5°
          </button>

          {/* Angle Display & Interactive Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="range"
              min="0"
              max="360"
              value={rulerPos.angle}
              onChange={(e) => handleAngleSlider(e.target.value)}
              title="Rotate Ruler Angle"
              style={{
                width: '68px',
                accentColor: '#38bdf8',
                cursor: 'pointer'
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: '#38bdf8',
                fontFamily: 'monospace',
                fontWeight: 900,
                background: '#000000',
                padding: '3px 7px',
                borderRadius: '8px',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                minWidth: '32px',
                textAlign: 'center'
              }}
            >
              {rulerPos.angle}°
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetRuler}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              padding: '4px 10px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            ↺ Park
          </button>
        </div>
      </div>

      {/* SVG Interactive Canvas: Responsive & Workable across the full map */}
      <div
        style={{
          position: 'relative',
          flex: '1 0 230px',
          minHeight: '230px',
          overflow: 'hidden',
          borderRadius: '16px',
          border: '2px solid rgba(56, 189, 248, 0.45)',
          background: '#09182b',
          userSelect: 'none',
          touchAction: 'none'
        }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 720 260"
          style={{
            background: 'linear-gradient(135deg, #0a1b30 0%, #05101d 100%)',
            display: 'block'
          }}
        >
          <defs>
            <pattern id="utmGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
            </pattern>
            <filter id="rulerShadow" x="-10%" y="-20%" width="120%" height="150%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Coordinate Grid Background */}
          <rect width="720" height="260" fill="url(#utmGrid)" />

          {/* Depth Soundings */}
          <g transform="translate(20, 26)">
            <rect width="90" height="22" rx="4" fill="rgba(0,0,0,0.75)" stroke="#38bdf8" strokeWidth="1" />
            <text x="45" y="16" fill="#38bdf8" fontSize="12.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">12m Depth</text>
          </g>
          <g transform="translate(615, 220)">
            <rect width="95" height="22" rx="4" fill="rgba(0,0,0,0.75)" stroke="#38bdf8" strokeWidth="1" />
            <text x="47" y="16" fill="#38bdf8" fontSize="12.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">28m Depth</text>
          </g>

          {/* Main Island Coastline - Spans across the full map */}
          <path
            d="M 35,120 Q 90,30 240,40 T 450,35 T 580,75 T 670,165 T 560,235 T 340,240 T 150,225 T 35,170 Z"
            fill="#1b4332"
            stroke="#4ade80"
            strokeWidth="4"
            filter="drop-shadow(0 4px 14px rgba(0,0,0,0.9))"
          />

          {/* Topographic Contour Lines */}
          <path d="M 120,110 Q 200,65 340,70 T 500,95 T 560,165 T 460,210 T 260,205 T 120,160 Z" fill="none" stroke="rgba(250, 204, 21, 0.45)" strokeWidth="2.5" />
          <path d="M 200,115 Q 260,85 360,90 T 450,110 T 480,160 T 400,190 T 280,185 T 200,150 Z" fill="none" stroke="rgba(250, 204, 21, 0.6)" strokeWidth="3" />

          {/* Elevation Badges */}
          <g transform="translate(130, 70)">
            <rect width="52" height="20" rx="4" fill="#000000" stroke="#facc15" strokeWidth="1.5" />
            <text x="26" y="15" fill="#fde047" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">50m</text>
          </g>
          <g transform="translate(230, 85)">
            <rect width="56" height="20" rx="4" fill="#000000" stroke="#facc15" strokeWidth="1.5" />
            <text x="28" y="15" fill="#fde047" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">100m</text>
          </g>
          <g transform="translate(320, 85)">
            <rect width="150" height="22" rx="5" fill="#000000" stroke="#facc15" strokeWidth="1.5" />
            <text x="75" y="16" fill="#fde047" fontSize="12.5" fontFamily="Fredoka, sans-serif" fontWeight="900" textAnchor="middle">▲ Falcon Ridge 180m</text>
          </g>

          {/* Pinecrest Woods Area */}
          <g transform="translate(170, 165)">
            <rect width="140" height="26" rx="6" fill="rgba(0,0,0,0.85)" stroke="#4ade80" strokeWidth="1.5" />
            <text x="70" y="18" fill="#86efac" fontSize="13.5" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
              🌲 Pinecrest Woods
            </text>
          </g>

          {/* Survey Trail Line: From Harbor (80, 115) to Lighthouse (494, 175) */}
          <path
            d="M 80,115 Q 280,130 494,175"
            stroke="#facc15"
            strokeWidth="5.5"
            strokeDasharray="9,5"
            fill="none"
          />
          <line x1="80" y1="115" x2="494" y2="175" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,4" />

          {/* Landmark 1: Pinecrest Harbor at (80, 115) */}
          <circle cx="80" cy="115" r="16" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3.5" />
          <text x="80" y="121" fill="#ffffff" fontSize="15" textAnchor="middle">⚓</text>
          <g transform="translate(10, 68)">
            <rect width="150" height="36" rx="6" fill="rgba(0,0,0,0.9)" stroke="#38bdf8" strokeWidth="2" />
            <text x="75" y="17" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
              Pinecrest Harbor
            </text>
            <text x="75" y="30" fill="#93c5fd" fontSize="11.5" fontWeight="900" fontFamily="Nunito, sans-serif" textAnchor="middle">
              (Trail Start: 0 cm)
            </text>
          </g>

          {/* Landmark 2: Falcon Lookout at (280, 145) */}
          <circle cx="280" cy="145" r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
          <g transform="translate(220, 153)">
            <rect width="120" height="22" rx="4" fill="rgba(0,0,0,0.85)" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="60" y="16" fill="#fde047" fontSize="12" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
              🦅 Falcon Lookout
            </text>
          </g>

          {/* Landmark 3: Beacon Lighthouse at (494, 175) - Exactly 6.4 cm from Harbor */}
          <circle cx="494" cy="175" r="16" fill="#dc2626" stroke="#ffffff" strokeWidth="3.5" />
          <text x="494" y="181" fill="#ffffff" fontSize="15" textAnchor="middle">🗼</text>
          <g transform="translate(420, 198)">
            <rect width="165" height="36" rx="6" fill="rgba(0,0,0,0.9)" stroke="#ef4444" strokeWidth="2" />
            <text x="82" y="17" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
              Beacon Lighthouse
            </text>
            <text x="82" y="30" fill="#fde047" fontSize="11.5" fontWeight="900" fontFamily="Nunito, sans-serif" textAnchor="middle">
              (Destination Target)
            </text>
          </g>

          {/* Compass Rose */}
          <g transform="translate(660, 42)">
            <circle cx="0" cy="0" r="24" fill="#000000" stroke="#38bdf8" strokeWidth="2.5" />
            <polygon points="0,-20 6,-4 0,0 -6,-4" fill="#ef4444" />
            <polygon points="0,20 6,4 0,0 -6,4" fill="#ffffff" />
            <polygon points="20,0 4,6 0,0 4,-6" fill="#ffffff" />
            <polygon points="-20,0 -4,6 0,0 -4,-6" fill="#ffffff" />
            <text x="0" y="-24" fill="#ef4444" fontSize="12.5" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">N</text>
          </g>

          {/* Scale Bar: 1 cm = 65 SVG units (500m) */}
          <g transform="translate(16, 204)">
            <rect width="220" height="46" rx="8" fill="#000000" stroke="#facc15" strokeWidth="2" />
            <rect x="15" y="20" width="32.5" height="9" fill="#ffffff" />
            <rect x="47.5" y="20" width="32.5" height="9" fill="#000000" stroke="#ffffff" strokeWidth="1" />
            <rect x="80" y="20" width="65" height="9" fill="#ffffff" />
            <rect x="145" y="20" width="65" height="9" fill="#000000" stroke="#ffffff" strokeWidth="1" />
            <text x="15" y="40" fill="#ffffff" fontSize="11.5" fontWeight="900" fontFamily="monospace">0</text>
            <text x="80" y="40" fill="#ffffff" fontSize="11.5" fontWeight="900" fontFamily="monospace">500m</text>
            <text x="145" y="40" fill="#ffffff" fontSize="11.5" fontWeight="900" fontFamily="monospace">1km</text>
            <text x="210" y="40" fill="#ffffff" fontSize="11.5" fontWeight="900" fontFamily="monospace">2km</text>
            <text x="110" y="14" fill="#facc15" fontSize="12" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
              SCALE 1 cm : 500 m (1 : 50 000)
            </text>
          </g>

          {/* ========================================================================= */}
          {/* DRAGGABLE & ROTATABLE SVG SURVEYOR RULER (WORKABLE OVER THE ENTIRE MAP) */}
          {/* ========================================================================= */}
          <g
            transform={`translate(${rulerPos.x}, ${rulerPos.y}) rotate(${rulerPos.angle}, ${ZERO_X}, 18)`}
            filter="url(#rulerShadow)"
            style={{ cursor: isDragging === 'drag' ? 'grabbing' : 'grab' }}
            onPointerDown={(e) => handlePointerDown(e, 'drag')}
          >
            {/* Ruler Body */}
            <rect
              x="0"
              y="0"
              width={ZERO_X + 7 * CM_UNIT + 30}
              height="58"
              rx="8"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="2.5"
            />

            {/* Centimetre and Millimetre Ticks (0 cm to 7 cm) */}
            <g style={{ pointerEvents: 'none', userSelect: 'none' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((cm) => {
                const tickX = ZERO_X + cm * CM_UNIT;
                return (
                  <g key={cm}>
                    {/* Major Centimetre Tick */}
                    <line x1={tickX} y1="0" x2={tickX} y2="24" stroke="#000000" strokeWidth="2.5" />
                    <text
                      x={tickX}
                      y="38"
                      fill={cm === 6 || cm === 7 ? '#dc2626' : '#000000'}
                      fontSize="15"
                      fontWeight="900"
                      fontFamily="Fredoka, sans-serif"
                      textAnchor="middle"
                    >
                      {cm}
                    </text>

                    {/* Half-centimetre Tick */}
                    {cm < 7 && (
                      <line
                        x1={tickX + CM_UNIT / 2}
                        y1="0"
                        x2={tickX + CM_UNIT / 2}
                        y2="15"
                        stroke="#475569"
                        strokeWidth="1.8"
                      />
                    )}

                    {/* Millimetre Ticks */}
                    {cm < 7 &&
                      [1, 2, 3, 4, 6, 7, 8, 9].map((mm) => (
                        <line
                          key={mm}
                          x1={tickX + (mm * CM_UNIT) / 10}
                          y1="0"
                          x2={tickX + (mm * CM_UNIT) / 10}
                          y2="8"
                          stroke="#64748b"
                          strokeWidth="1"
                        />
                      ))}
                  </g>
                );
              })}

              {/* Zero Mark Visual Indicator Pin */}
              <circle cx={ZERO_X} cy="18" r="4" fill="#38bdf8" stroke="#000000" strokeWidth="1.5" />
              <text x={ZERO_X} y="52" fill="#0284c7" fontSize="10" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                START
              </text>

              {/* Sliding Target Marker (Active when student clicks Slide Marker) */}
              {markerCm !== null && (
                <g transform={`translate(${ZERO_X + markerCm * CM_UNIT}, 0)`}>
                  <line x1="0" y1="0" x2="0" y2="58" stroke="#dc2626" strokeWidth="3" />
                  <polygon points="-6,0 6,0 0,9" fill="#dc2626" />
                  <polygon points="-6,58 6,58 0,49" fill="#dc2626" />
                  <g transform="translate(0, -6)">
                    <rect x="-24" y="-14" width="48" height="16" rx="4" fill="#dc2626" />
                    <text x="0" y="-3" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                      TARGET
                    </text>
                  </g>
                </g>
              )}

              {/* Bottom Grip Bar Instruction */}
              <text
                x={(ZERO_X + 7 * CM_UNIT) / 2}
                y="52"
                fill="#475569"
                fontSize="10"
                fontWeight="900"
                fontFamily="Fredoka, sans-serif"
                textAnchor="middle"
              >
                🖐️ DRAG ANYWHERE · GRAB ↻ TO ROTATE (CM)
              </text>
            </g>

            {/* Interactive Rotation Dial Knob at Right End */}
            <g
              transform={`translate(${ZERO_X + 7 * CM_UNIT + 16}, 28)`}
              onPointerDown={(e) => handlePointerDown(e, 'rotate')}
              style={{ cursor: 'crosshair' }}
            >
              <circle
                r="16"
                fill={isDragging === 'rotate' ? '#facc15' : '#38bdf8'}
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x="0" y="4.5" fill="#0f172a" fontSize="13" fontWeight="900" textAnchor="middle">
                ↻
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Story Narrative Box */}
      <div
        style={{
          marginTop: '6px',
          background: 'rgba(10, 20, 40, 0.9)',
          border: '1.5px solid #38bdf8',
          borderRadius: '12px',
          padding: '6px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <span style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontWeight: 800 }}>
          📖 <strong style={{ color: '#facc15' }}>Story 1–4:</strong> {problem.storyContext}
        </span>
        <span style={{ fontSize: '13.5px', color: '#38bdf8', fontFamily: 'Fredoka, sans-serif', fontWeight: 900 }}>
          Formula: Ground Distance = Map Distance (cm) × Scale Rate
        </span>
      </div>
    </div>
  );
}

export default function StationMapRuler({ problem }) {
  return <StationMapVisual problem={problem} />;
}
