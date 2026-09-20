import React from 'react';

export default function FloatingBg() {
  const items = [
    // Left side watermark numbers matching screenshot
    { text: '100', top: '9%', left: '6%', size: '56px', opacity: 0.16, rotate: '-18deg', delay: '0s' },
    { text: '180°', top: '38%', left: '3%', size: '64px', opacity: 0.15, rotate: '-15deg', delay: '2s' },
    { text: '200', top: '67%', left: '7%', size: '58px', opacity: 0.16, rotate: '12deg', delay: '1s' },
    { text: '90°', top: '71%', left: '21%', size: '54px', opacity: 0.14, rotate: '-12deg', delay: '3.5s' },

    // Right side watermark numbers matching screenshot
    { text: '500', top: '7%', right: '23%', size: '78px', opacity: 0.18, rotate: '14deg', delay: '3s' },
    { text: '347', top: '23%', right: '11%', size: '66px', opacity: 0.17, rotate: '-14deg', delay: '4.5s' },
    { text: '123', top: '49%', right: '6%', size: '48px', opacity: 0.15, rotate: '16deg', delay: '2.5s' },
    { text: '999', top: '75%', right: '11%', size: '82px', opacity: 0.18, rotate: '10deg', delay: '1.5s' }
  ];

  return (
    <div className="floating-bg-container" aria-hidden="true">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="floating-bg-item"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            fontSize: item.size,
            color: `rgba(139, 92, 246, ${item.opacity})`,
            transform: `rotate(${item.rotate})`,
            animationDelay: item.delay
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
