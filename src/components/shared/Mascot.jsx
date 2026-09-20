import React from 'react';

export default function Mascot({ type = 'leo', mood = 'idle', size = 'default', customDimension }) {
  const isRobot = type === 'robot';

  let dimension = 76;
  if (size === 'hero') dimension = 142;
  else if (size === 'xlarge') dimension = 124;
  else if (size === 'large') dimension = 108;
  else if (size === 'small') dimension = 50;

  if (customDimension) {
    dimension = customDimension;
  }

  return (
    <div
      className={`mascot-container ${mood}`}
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: isRobot
          ? 'drop-shadow(0 6px 20px rgba(56, 189, 248, 0.45))'
          : 'drop-shadow(0 8px 24px rgba(250, 204, 21, 0.45))'
      }}
    >
      {isRobot ? (
        <svg
          width={dimension}
          height={dimension}
          viewBox="0 0 100 100"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="robotHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="robotScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <filter id="robotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4ade80" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Antenna */}
          <line x1="50" y1="18" x2="50" y2="8" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="7" r="5" fill="#4ade80" filter="url(#robotGlow)" />

          {/* Ear bolts */}
          <rect x="12" y="42" width="6" height="16" rx="3" fill="#64748b" />
          <rect x="82" y="42" width="6" height="16" rx="3" fill="#64748b" />

          {/* Outer Rounded Helmet */}
          <rect
            x="16"
            y="22"
            width="68"
            height="56"
            rx="28"
            fill="url(#robotHeadGrad)"
            stroke="#64748b"
            strokeWidth="2.5"
          />

          {/* Inner Glossy Screen */}
          <rect
            x="22"
            y="28"
            width="56"
            height="44"
            rx="22"
            fill="url(#robotScreenGrad)"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Screen Light Reflection */}
          <path
            d="M28,34 Q50,30 72,34"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Glowing Green Visor Eyes / Happy Expression */}
          <path
            d="M32,50 Q39,42 46,50"
            stroke="#4ade80"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#robotGlow)"
          >
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
          </path>
          <path
            d="M54,50 Q61,42 68,50"
            stroke="#4ade80"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#robotGlow)"
          >
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
          </path>

          {/* Tiny Cheerful Visor Smile */}
          <path
            d="M46,58 Q50,62 54,58"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#robotGlow)"
          />
        </svg>
      ) : (
        <svg
          width={dimension}
          height={dimension}
          viewBox="0 0 100 100"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="leoBadgeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            <linearGradient id="leoRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Outer Badge Circular Rim */}
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="url(#leoBadgeGlow)"
            stroke="url(#leoRing)"
            strokeWidth="3.5"
            filter="url(#badgeShadow)"
          />

          {/* Mane spikes / Sunburst tufts */}
          <circle cx="50" cy="50" r="39" fill="#d97706" opacity="0.9" />

          {/* Ears */}
          <circle cx="28" cy="28" r="11" fill="#b45309" />
          <circle cx="28" cy="28" r="7" fill="#fde047" />
          <circle cx="28" cy="28" r="4.5" fill="#fca5a5" />

          <circle cx="72" cy="28" r="11" fill="#b45309" />
          <circle cx="72" cy="28" r="7" fill="#fde047" />
          <circle cx="72" cy="28" r="4.5" fill="#fca5a5" />

          {/* Leo Main Head */}
          <circle cx="50" cy="52" r="33" fill="#fbbf24" />

          {/* Rosy Cheeks */}
          <ellipse cx="32" cy="57" rx="5.5" ry="3.5" fill="#f87171" opacity="0.6" />
          <ellipse cx="68" cy="57" rx="5.5" ry="3.5" fill="#f87171" opacity="0.6" />

          {/* Big Cartoon Eyes */}
          <ellipse cx="38" cy="47" rx="5" ry="6" fill="#1e1b4b" />
          <ellipse cx="62" cy="47" rx="5" ry="6" fill="#1e1b4b" />

          {/* Eye Sparkle Catchlights (Double Twinkle for kid-friendly cuteness) */}
          <circle cx="36.5" cy="45" r="2.2" fill="#ffffff" />
          <circle cx="39.5" cy="49" r="1.1" fill="#ffffff" />

          <circle cx="60.5" cy="45" r="2.2" fill="#ffffff" />
          <circle cx="63.5" cy="49" r="1.1" fill="#ffffff" />

          {/* Muzzle */}
          <ellipse cx="50" cy="58" rx="11" ry="8" fill="#fef08a" />

          {/* Cute Nose */}
          <polygon points="50,55 45,51 55,51" fill="#78350f" rx="1" />

          {/* Cheerful Smile */}
          <path
            d="M45,58 Q50,63 55,58"
            stroke="#78350f"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

