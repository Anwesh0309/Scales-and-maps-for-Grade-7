import React, { useState, useRef } from 'react';
import { REFLECT } from '../../content/reflect';
import { playAudioKey } from '../../utils/audio';

function RobotAvatar({ size = 92 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, filter: 'drop-shadow(0 6px 20px rgba(249, 115, 22, 0.45))' }}
      aria-label="Leo Assistant Robot"
    >
      <defs>
        <filter id="robotOrangeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f97316" floodOpacity="0.9" />
        </filter>
        <filter id="robotYellowGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#facc15" floodOpacity="1" />
        </filter>
      </defs>

      {/* Stand Base */}
      <path
        d="M20 66 Q36 71 52 66"
        stroke="#94a3b8"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Stand Neck */}
      <line x1="36" y1="54" x2="36" y2="67" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

      {/* Antenna */}
      <line x1="36" y1="14" x2="36" y2="6" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="5.5" r="4" fill="#f97316" filter="url(#robotOrangeGlow)" />

      {/* Outer Monitor Body */}
      <rect
        x="12"
        y="13"
        width="48"
        height="42"
        rx="21"
        fill="#0b0f19"
        stroke="#cbd5e1"
        strokeWidth="4"
      />

      {/* Orange Ear Knobs */}
      <circle cx="16" cy="19" r="4.5" fill="#f97316" filter="url(#robotOrangeGlow)" />
      <circle cx="56" cy="19" r="4.5" fill="#f97316" filter="url(#robotOrangeGlow)" />

      {/* Inner Screen Horizontal Track / Smile */}
      <line
        x1="24"
        y1="34"
        x2="48"
        y2="34"
        stroke="#facc15"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Glowing Center Yellow Eye */}
      <circle cx="36" cy="34" r="5" fill="#facc15" filter="url(#robotYellowGlow)" />
      <circle cx="34.5" cy="32.5" r="1.6" fill="#ffffff" />
    </svg>
  );
}

export default function ReflectScreen({
  reflectState,
  playState,
  onSetReflection,
  onSubmitReflection
}) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [studentName, setStudentName] = useState('Cartographer Liam');
  const [certGenerated, setCertGenerated] = useState(false);
  const certCanvasRef = useRef(null);

  const totalStars = Object.values(playState.worlds).reduce((acc, w) => acc + (w.stars || 0), 0);
  const streak = playState.bestStreak || playState.streak || 0;
  const xp = playState.xp || 0;

  const handleComplete = () => {
    playAudioKey('correct_praise');
    onSubmitReflection();
    setShowCelebration(true);
  };

  const handleGenerateCert = () => {
    setCertGenerated(true);
    setTimeout(() => {
      const canvas = certCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = 640;
      canvas.height = 420;

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 640, 420);
      bgGrad.addColorStop(0, '#1e143c');
      bgGrad.addColorStop(1, '#0c0424');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 640, 420);

      // Gold Border
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 6;
      ctx.strokeRect(15, 15, 610, 390);

      ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(22, 22, 596, 376);

      // Seal & Header
      ctx.fillStyle = '#facc15';
      ctx.font = '900 24px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF CARTOGRAPHY', 320, 65);

      ctx.fillStyle = '#c084fc';
      ctx.font = '800 14px Fredoka, sans-serif';
      ctx.fillText('SINGAPORE MOE GRADE 7 MATHEMATICS · SCALE & MAPS', 320, 95);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 15px Nunito, sans-serif';
      ctx.fillText('This certifies that', 320, 140);

      // Student Name
      ctx.fillStyle = '#facc15';
      ctx.font = '900 28px Fredoka, sans-serif';
      ctx.fillText(studentName || 'Cartographer', 320, 180);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '700 14px Nunito, sans-serif';
      ctx.fillText('has demonstrated mastery in map scale ratios, distance conversion,', 320, 220);
      ctx.fillText('area scaling (1 : n²), and scale drawings on the Isle of Whispers.', 320, 245);

      // Stars & XP
      ctx.fillStyle = '#4ade80';
      ctx.font = '900 16px Fredoka, sans-serif';
      ctx.fillText(`⭐ Total XP: ${xp}  |  ★ Total Stars: ${totalStars} / 30`, 320, 290);

      // Signatures
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.moveTo(100, 350);
      ctx.lineTo(240, 350);
      ctx.moveTo(400, 350);
      ctx.lineTo(540, 350);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 12px Fredoka, sans-serif';
      ctx.fillText('Leo the Lion 🦁', 170, 368);
      ctx.fillText('Ranger Arthur 🧭', 470, 368);
    }, 100);
  };

  const handleDownloadCert = () => {
    const canvas = certCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${studentName.replace(/\s+/g, '_')}_Cartographer_Certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '10px 16px',
        boxSizing: 'border-box'
      }}
    >
      {/* Main Glass Card matching screenshot with increased Grade 3 fonts and sizes */}
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: 'calc(100vh - 84px)',
          overflowY: 'auto',
          background: 'rgba(28, 18, 58, 0.88)',
          border: '1.5px solid rgba(129, 140, 248, 0.25)',
          borderRadius: '28px',
          padding: 'clamp(18px, 2.4vh, 26px) clamp(22px, 3.2vw, 40px)',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Glowing Top Indicator Pill */}
        <div
          style={{
            width: '90px',
            height: '6px',
            borderRadius: '10px',
            background: '#818cf8',
            boxShadow: '0 0 16px 3px rgba(129, 140, 248, 0.9)',
            marginBottom: '14px'
          }}
        />

        {/* Title: 🏆 Reflect & Scoreboard */}
        <h1
          style={{
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: 'clamp(28px, 3.6vw, 36px)',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 18px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            lineHeight: 1.2
          }}
        >
          <span style={{ fontSize: '1.2em' }}>🏆</span>
          <span>{REFLECT.title}</span>
        </h1>

        {/* 3 Stat Cards Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            width: '100%',
            marginBottom: '18px'
          }}
        >
          {/* Card 1: Total XP */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '20px',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '34px', lineHeight: 1, marginBottom: '4px' }}>✨</span>
            <span
              style={{
                color: '#facc15',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '36px',
                fontWeight: 900,
                lineHeight: 1.1
              }}
            >
              {xp}
            </span>
            <span
              style={{
                color: '#e2e8f0',
                fontSize: '16px',
                fontWeight: 800,
                marginTop: '4px'
              }}
            >
              Total XP
            </span>
          </div>

          {/* Card 2: Stars */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '20px',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '34px', lineHeight: 1, marginBottom: '4px' }}>⭐</span>
            <span
              style={{
                color: '#facc15',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '36px',
                fontWeight: 900,
                lineHeight: 1.1
              }}
            >
              {totalStars} / 30
            </span>
            <span
              style={{
                color: '#e2e8f0',
                fontSize: '16px',
                fontWeight: 800,
                marginTop: '4px'
              }}
            >
              Stars
            </span>
          </div>

          {/* Card 3: Best Streak */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '20px',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '34px', lineHeight: 1, marginBottom: '4px' }}>🔥</span>
            <span
              style={{
                color: '#facc15',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '36px',
                fontWeight: 900,
                lineHeight: 1.1
              }}
            >
              {streak}
            </span>
            <span
              style={{
                color: '#e2e8f0',
                fontSize: '16px',
                fontWeight: 800,
                marginTop: '4px'
              }}
            >
              Best Streak
            </span>
          </div>
        </div>

        {/* World Results Header */}
        <div
          style={{
            color: '#facc15',
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '10px',
            textAlign: 'center'
          }}
        >
          WORLD RESULTS
        </div>

        {/* 10 World Chips Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: '8px',
            width: '100%',
            marginBottom: '20px'
          }}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((worldNum) => {
            const worldStars = playState.worlds[worldNum]?.stars || 0;
            return (
              <div
                key={worldNum}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1.5px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '14px',
                  padding: '10px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span
                  style={{
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 800,
                    fontFamily: 'Fredoka, sans-serif'
                  }}
                >
                  W{worldNum}
                </span>
                <span
                  style={{
                    color: worldStars > 0 ? '#facc15' : '#94a3b8',
                    fontSize: '16px',
                    fontWeight: 800,
                    marginTop: '2px'
                  }}
                >
                  {worldStars > 0 ? '★'.repeat(worldStars) : '—'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Horizontal Divider Line */}
        <div
          style={{
            width: '100%',
            height: '1.5px',
            background: 'rgba(255, 255, 255, 0.12)',
            marginBottom: '18px'
          }}
        />

        {/* Reflection Prompt Text (Larger for Grade 3) */}
        <div
          style={{
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: 'clamp(17px, 2.1vw, 21px)',
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '16px',
            lineHeight: 1.45,
            maxWidth: '780px'
          }}
        >
          {REFLECT.prompt}
        </div>

        {/* Reflection Input Area (Large Robot Mascot + Readable Textarea) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
            marginBottom: '22px'
          }}
        >
          {/* Scaled Up Robot Mascot */}
          <RobotAvatar size={92} />

          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              value={reflectState.text || ''}
              onChange={(e) => onSetReflection(e.target.value)}
              placeholder={REFLECT.placeholder}
              rows={3}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(10, 6, 26, 0.72)',
                border: '1.5px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '20px',
                padding: '14px 20px 32px 20px',
                color: '#ffffff',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '17px',
                lineHeight: 1.55,
                resize: 'none',
                outline: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '20px',
                fontSize: '13px',
                fontWeight: 800,
                color: '#94a3b8',
                pointerEvents: 'none'
              }}
            >
              {(reflectState.text || '').length} / 10 min chars
            </div>
          </div>
        </div>

        {/* Complete Lesson Action Button (Larger for Grade 3) */}
        <button
          type="button"
          onClick={handleComplete}
          style={{
            background: 'linear-gradient(180deg, #fde047 0%, #eab308 100%)',
            color: '#1e1b4b',
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: '22px',
            fontWeight: 900,
            padding: '16px 52px',
            borderRadius: '50px',
            border: 'none',
            boxShadow: '0 6px 22px rgba(234, 179, 8, 0.45)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 10px 28px rgba(234, 179, 8, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(234, 179, 8, 0.45)';
          }}
        >
          Complete Lesson! 🎉
        </button>
      </div>

      {/* Celebration Modal (Awarding Badges & Certificate) */}
      {showCelebration && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '640px',
              width: '100%',
              background: 'rgba(25, 15, 50, 0.96)',
              border: '2px solid rgba(250, 204, 21, 0.4)',
              borderRadius: '26px',
              padding: '26px 30px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.75)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ fontSize: '56px', marginBottom: '8px' }}>🎓</div>
            <h2
              style={{
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '28px',
                fontWeight: 900,
                color: '#facc15',
                margin: '0 0 8px 0'
              }}
            >
              Expedition Completed!
            </h2>
            <p
              style={{
                color: '#e2e8f0',
                fontSize: '16px',
                margin: '0 0 18px 0',
                lineHeight: 1.45
              }}
            >
              You mastered map scale ratios, distance conversions, and area scaling (1 : n²)!
            </p>

            {/* Badges Earned */}
            <div
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '18px',
                padding: '14px 16px',
                marginBottom: '18px'
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  color: '#facc15',
                  letterSpacing: '1px',
                  marginBottom: '10px'
                }}
              >
                🏆 BADGES EARNED
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {REFLECT.badges.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: 'rgba(250, 204, 21, 0.14)',
                      border: '1px solid rgba(250, 204, 21, 0.35)',
                      borderRadius: '20px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#facc15',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    title={b.desc}
                  >
                    <span style={{ fontSize: '18px' }}>{b.icon}</span>
                    <span>{b.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Generator */}
            <div
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '18px',
                padding: '16px',
                marginBottom: '18px'
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#38bdf8', marginBottom: '10px' }}>
                📜 Official Certificate of Cartography
              </div>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '80%',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '10px',
                  color: '#facc15',
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '17px',
                  fontWeight: 900,
                  padding: '8px 14px',
                  textAlign: 'center',
                  outline: 'none',
                  marginBottom: '12px'
                }}
              />

              {certGenerated ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <canvas
                    ref={certCanvasRef}
                    style={{
                      width: '100%',
                      maxWidth: '340px',
                      borderRadius: '10px',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                      marginBottom: '10px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleDownloadCert}
                    className="btn-gold"
                    style={{ fontSize: '14px', padding: '8px 20px' }}
                  >
                    💾 Download Certificate (PNG)
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleGenerateCert}
                    className="btn-gold"
                    style={{ fontSize: '15px', padding: '10px 24px' }}
                  >
                    Generate Official Certificate
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowCelebration(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                padding: '12px 32px',
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Close & Return to Scoreboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
