import React from 'react';
import { WONDER } from '../../content/wonder';
import Mascot from '../shared/Mascot';

export default function WonderScreen({ onNext }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: 'clamp(6px, 1.5vh, 18px) 16px',
        zIndex: 5
      }}
    >
      {/* Centered Main Wonder Hook Card */}
      <div
        style={{
          background: 'rgba(22, 13, 52, 0.76)',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '32px',
          padding: 'clamp(20px, 3vh, 32px) clamp(24px, 3.5vw, 44px)',
          maxWidth: '620px',
          width: '100%',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Purple Glowing Indicator Pill */}
        <div
          style={{
            width: '80px',
            height: '6px',
            background: '#c084fc',
            borderRadius: '4px',
            boxShadow: '0 0 18px #c084fc, 0 0 32px rgba(192, 132, 252, 0.8)',
            margin: '0 auto clamp(8px, 1.2vh, 14px) auto'
          }}
        />

        {/* Title (Enlarged, Bold & Clear) */}
        <div
          style={{
            fontFamily: 'Fredoka, Nunito, sans-serif',
            fontSize: 'clamp(36px, 5vh, 48px)',
            fontWeight: 900,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            margin: '0 auto clamp(6px, 1vh, 12px) auto',
            letterSpacing: '-0.3px',
            textShadow: '0 4px 14px rgba(0,0,0,0.5)'
          }}
        >
          <span style={{ fontSize: 'clamp(32px, 4.4vh, 42px)' }}>🔮</span>
          <span>{WONDER.title}</span>
        </div>

        {/* Enlarged Floating Robot Mascot (Noticeably Larger for Young Learners) */}
        <div style={{ margin: '0 auto clamp(8px, 1.2vh, 16px) auto', transform: 'scale(1.18)' }}>
          <Mascot type="robot" mood="curious" customDimension={104} />
        </div>

        {/* Dashed Reveal Box (Larger Icon & Punchy Headline) */}
        <div
          style={{
            background: 'rgba(10, 6, 26, 0.72)',
            border: '2px dashed rgba(250, 204, 21, 0.75)',
            borderRadius: '24px',
            padding: 'clamp(14px, 2vh, 22px) clamp(18px, 2.8vw, 32px)',
            margin: '0 auto clamp(12px, 1.8vh, 20px) auto',
            width: '100%',
            maxWidth: '580px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)'
          }}
        >
          {/* Top Box Graphic Icon */}
          <div style={{ fontSize: 'clamp(44px, 5.8vh, 56px)', marginBottom: '4px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.35))' }}>
            🗺️
          </div>

          {/* Huge Golden Headline */}
          <div
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontSize: 'clamp(44px, 6.2vh, 58px)',
              fontWeight: 900,
              color: '#facc15',
              margin: '2px 0',
              textShadow: '0 0 30px rgba(250, 204, 21, 0.6), 0 4px 14px rgba(0,0,0,0.6)',
              letterSpacing: '0.5px',
              lineHeight: 1.12
            }}
          >
            {WONDER.hookHeadline}
          </div>

          {/* Purple Subtext with Checkmark */}
          <div
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontSize: 'clamp(15px, 2.2vh, 18px)',
              letterSpacing: '2px',
              color: '#c084fc',
              textTransform: 'uppercase',
              fontWeight: 900,
              marginTop: '4px'
            }}
          >
            {WONDER.hookSub}
          </div>
        </div>

        {/* Narrative Prompt Paragraph (Grade 3 Large Readable Font Size) */}
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(18px, 2.6vh, 23px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.42,
            maxWidth: '600px',
            margin: '0 auto clamp(14px, 2.2vh, 22px) auto',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)'
          }}
        >
          A trail map of the Isle of Whispers shows Pinecrest Harbor and the mountain peak just{' '}
          <span style={{ color: '#facc15', fontWeight: 900 }}>8 cm</span> apart. The ranger says the hike is{' '}
          <span style={{ color: '#facc15', fontWeight: 900 }}>4 km</span> long.
          <br />
          How can a tiny line on paper stand for a whole trail?
        </p>

        {/* Primary Action CTA Button (Large, Bold & Glowing) */}
        <div>
          <button
            type="button"
            onClick={onNext}
            className="btn-gold"
            style={{
              fontFamily: 'Fredoka, sans-serif',
              fontSize: 'clamp(22px, 3vh, 28px)',
              fontWeight: 900,
              padding: 'clamp(13px, 1.9vh, 18px) clamp(46px, 6vw, 70px)',
              borderRadius: '50px',
              color: '#0f172a',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 42px rgba(250, 204, 21, 0.65), 0 10px 28px rgba(0,0,0,0.45)',
              letterSpacing: '0.4px',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            {WONDER.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

