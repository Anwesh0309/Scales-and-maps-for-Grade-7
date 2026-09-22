import React, { useState } from 'react';

export function StationAreaGridVisual({ problem }) {
  const isP1 = problem.id === 's3p1';
  const isP2 = problem.id === 's3p2';
  const isP3 = problem.id === 's3p3';

  // Interactive tile clicking state
  const [activeTiles, setActiveTiles] = useState({
    tile1: true,
    tile2: true,
    tile3: true,
    tileHalf: true
  });
  const [showInspector, setShowInspector] = useState(false);

  // Calculate counted map area
  const countedArea =
    (activeTiles.tile1 ? 1.0 : 0) +
    (activeTiles.tile2 ? 1.0 : 0) +
    (activeTiles.tile3 ? 1.0 : 0) +
    (activeTiles.tileHalf ? 0.5 : 0);

  const toggleTile = (key) => {
    setActiveTiles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAllTiles = () => {
    setActiveTiles({ tile1: true, tile2: true, tile3: true, tileHalf: true });
  };

  const clearTiles = () => {
    setActiveTiles({ tile1: false, tile2: false, tile3: false, tileHalf: false });
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
      {/* Header with Workable Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '18px',
              color: '#4ade80',
              fontWeight: 900,
              letterSpacing: '0.4px'
            }}
          >
            🌊 SILVER LAKE HYDROLOGY & AREA GRID (1 : n²)
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
            GIS OVERLAY
          </span>
        </div>

        {/* Workable Tile Buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={selectAllTiles}
            style={{
              background: 'rgba(74, 222, 128, 0.3)',
              border: '2px solid #4ade80',
              borderRadius: '16px',
              padding: '4px 12px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13.5px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            ✨ Count All Tiles
          </button>
          <button
            type="button"
            onClick={clearTiles}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '16px',
              padding: '4px 10px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13.5px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            ↺ Reset
          </button>
          <button
            type="button"
            onClick={() => setShowInspector(!showInspector)}
            style={{
              background: showInspector ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.15)',
              border: `2px solid ${showInspector ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '16px',
              padding: '4px 12px',
              color: '#ffffff',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '13.5px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            📐 1 : n² Rule
          </button>
        </div>
      </div>

      {/* SVG Satellite GIS Map of Silver Lake */}
      <div
        style={{
          position: 'relative',
          flex: '1 0 230px',
          minHeight: '230px',
          overflow: 'hidden',
          borderRadius: '16px',
          border: '2px solid rgba(74, 222, 128, 0.45)',
          background: '#071810'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 720 240" style={{ display: 'block' }}>
          <defs>
            <pattern id="cmGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1" />
            </pattern>
            <radialGradient id="lakeWater" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.98" />
            </radialGradient>
          </defs>

          {/* Background Land */}
          <rect width="720" height="240" fill="#143422" />

          {/* 1 cm Grid Overlay */}
          <rect width="720" height="240" fill="url(#cmGrid)" />

          {/* Grid Coordinates */}
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((col, i) => (
            <g key={col} transform={`translate(${i * 60 + 18}, 2)`}>
              <rect width="24" height="16" rx="4" fill="#000000" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <text x="12" y="12" fill="#ffffff" fontSize="12" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                {col}
              </text>
            </g>
          ))}
          {['1', '2', '3', '4'].map((row, i) => (
            <g key={row} transform={`translate(2, ${i * 60 + 20})`}>
              <rect width="16" height="22" rx="4" fill="#000000" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <text x="8" y="16" fill="#ffffff" fontSize="12" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                {row}
              </text>
            </g>
          ))}

          {/* Silver Lake Water Body */}
          <g transform="translate(180, 25)">
            {/* Natural Lake Perimeter */}
            <path
              d="M 30,20 L 210,20 Q 275,50 255,90 L 210,160 L 30,160 Q 10,90 30,20 Z"
              fill="url(#lakeWater)"
              stroke="#38bdf8"
              strokeWidth="4"
              filter="drop-shadow(0 4px 16px rgba(0,0,0,0.85))"
            />

            {/* Clickable 1 cm² Tiles on the Lake */}
            {/* Tile 1: Top-Left (1 cm²) */}
            <g
              onClick={() => toggleTile('tile1')}
              style={{ cursor: 'pointer' }}
              transform="translate(30, 20)"
            >
              <rect
                width="90"
                height="70"
                fill={activeTiles.tile1 ? 'rgba(74, 222, 128, 0.45)' : 'rgba(0, 0, 0, 0.4)'}
                stroke={activeTiles.tile1 ? '#4ade80' : 'rgba(255, 255, 255, 0.4)'}
                strokeWidth="2.5"
              />
              <g transform="translate(10, 22)">
                <rect width="70" height="26" rx="6" fill="#000000" stroke={activeTiles.tile1 ? '#4ade80' : '#ffffff'} strokeWidth="1.5" />
                <text x="35" y="18" fill={activeTiles.tile1 ? '#86efac' : '#ffffff'} fontSize="13" fontWeight="900" textAnchor="middle">
                  {activeTiles.tile1 ? '✓ 1.0 cm²' : '+ Count'}
                </text>
              </g>
            </g>

            {/* Tile 2: Top-Right (1 cm²) */}
            <g
              onClick={() => toggleTile('tile2')}
              style={{ cursor: 'pointer' }}
              transform="translate(120, 20)"
            >
              <rect
                width="90"
                height="70"
                fill={activeTiles.tile2 ? 'rgba(74, 222, 128, 0.45)' : 'rgba(0, 0, 0, 0.4)'}
                stroke={activeTiles.tile2 ? '#4ade80' : 'rgba(255, 255, 255, 0.4)'}
                strokeWidth="2.5"
              />
              <g transform="translate(10, 22)">
                <rect width="70" height="26" rx="6" fill="#000000" stroke={activeTiles.tile2 ? '#4ade80' : '#ffffff'} strokeWidth="1.5" />
                <text x="35" y="18" fill={activeTiles.tile2 ? '#86efac' : '#ffffff'} fontSize="13" fontWeight="900" textAnchor="middle">
                  {activeTiles.tile2 ? '✓ 1.0 cm²' : '+ Count'}
                </text>
              </g>
            </g>

            {/* Tile 3: Bottom-Left (1 cm²) */}
            <g
              onClick={() => toggleTile('tile3')}
              style={{ cursor: 'pointer' }}
              transform="translate(30, 90)"
            >
              <rect
                width="90"
                height="70"
                fill={activeTiles.tile3 ? 'rgba(74, 222, 128, 0.45)' : 'rgba(0, 0, 0, 0.4)'}
                stroke={activeTiles.tile3 ? '#4ade80' : 'rgba(255, 255, 255, 0.4)'}
                strokeWidth="2.5"
              />
              <g transform="translate(10, 22)">
                <rect width="70" height="26" rx="6" fill="#000000" stroke={activeTiles.tile3 ? '#4ade80' : '#ffffff'} strokeWidth="1.5" />
                <text x="35" y="18" fill={activeTiles.tile3 ? '#86efac' : '#ffffff'} fontSize="13" fontWeight="900" textAnchor="middle">
                  {activeTiles.tile3 ? '✓ 1.0 cm²' : '+ Count'}
                </text>
              </g>
            </g>

            {/* Tile Half: Bottom-Right East Bay (0.5 cm²) */}
            <g
              onClick={() => toggleTile('tileHalf')}
              style={{ cursor: 'pointer' }}
              transform="translate(120, 90)"
            >
              <polygon
                points="0,0 90,0 45,70 0,70"
                fill={activeTiles.tileHalf ? 'rgba(250, 204, 21, 0.45)' : 'rgba(0, 0, 0, 0.4)'}
                stroke={activeTiles.tileHalf ? '#facc15' : 'rgba(255, 255, 255, 0.4)'}
                strokeWidth="2.5"
              />
              <g transform="translate(8, 22)">
                <rect width="74" height="26" rx="6" fill="#000000" stroke={activeTiles.tileHalf ? '#facc15' : '#ffffff'} strokeWidth="1.5" />
                <text x="37" y="18" fill={activeTiles.tileHalf ? '#fde047' : '#ffffff'} fontSize="12.5" fontWeight="900" textAnchor="middle">
                  {activeTiles.tileHalf ? '✓ 0.5 cm²' : '+ 0.5 cm²'}
                </text>
              </g>
            </g>

            {/* Lake Title Banner */}
            <g transform="translate(35, 166)">
              <rect width="210" height="28" rx="8" fill="rgba(0,0,0,0.9)" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="105" y="19" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
                🌊 Silver Lake Reservoir
              </text>
            </g>
          </g>

          {/* Interactive Live Count Badge */}
          <g transform="translate(470, 25)">
            <rect width="230" height="85" rx="10" fill="#000000" stroke="#4ade80" strokeWidth="2.5" />
            <text x="115" y="22" fill="#86efac" fontSize="13" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
              📊 INTERACTIVE GRID COUNTER
            </text>
            <text x="115" y="52" fill="#facc15" fontSize="22" fontWeight="900" fontFamily="Fredoka, sans-serif" textAnchor="middle">
              {countedArea.toFixed(1)} cm² Counted
            </text>
            <text x="115" y="74" fill="#ffffff" fontSize="11.5" fontWeight="800" textAnchor="middle">
              (Click tiles on the lake to toggle)
            </text>
          </g>

          {/* Scale Reference Box in Bottom-Left */}
          <g transform="translate(16, 166)">
            <rect width="245" height="66" rx="8" fill="#000000" stroke="#4ade80" strokeWidth="2.5" />
            <text x="12" y="20" fill="#4ade80" fontSize="13" fontWeight="900" fontFamily="Fredoka, sans-serif">
              📐 LINEAR: {problem.scale || '1 cm : 2 km'}
            </text>
            <text x="12" y="40" fill="#facc15" fontSize="13.5" fontWeight="900" fontFamily="Fredoka, sans-serif">
              {isP1 && '🟩 AREA FORMULA: 1 cm² : (2 km)² = 4 km²'}
              {isP2 && '🟩 AREA FORMULA: 1 cm² : (0.5 km)² = 0.25 km²'}
              {isP3 && '🟩 RULE: Linear Factor = √(Area Factor)'}
            </text>
            <text x="12" y="57" fill="#ffffff" fontSize="12" fontWeight="900" fontFamily="monospace">
              Area Factor = (Linear Factor)²
            </text>
          </g>
        </svg>
      </div>

      {/* Story 7 Mathematical Breakdown */}
      <div
        style={{
          marginTop: '6px',
          background: 'rgba(10, 20, 15, 0.9)',
          border: '1.5px solid #4ade80',
          borderRadius: '12px',
          padding: '6px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <span style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontWeight: 800 }}>
          📖 <strong style={{ color: '#facc15' }}>Story 7:</strong> When length doubles and width doubles, area scales by (factor)² !
        </span>
        <span style={{ fontSize: '13.5px', color: '#4ade80', fontFamily: 'Fredoka, sans-serif', fontWeight: 900 }}>
          Real Area = Map Area (cm²) × (Linear Scale)²
        </span>
      </div>
    </div>
  );
}

export default function StationAreaGrid({ problem }) {
  return <StationAreaGridVisual problem={problem} />;
}
