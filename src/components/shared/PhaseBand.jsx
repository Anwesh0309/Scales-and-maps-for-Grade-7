import React from 'react';

export default function PhaseBand({ phase = 'wonder' }) {
  return (
    <div 
      className={`phase-band phase-band--${phase}`} 
      role="presentation"
      aria-hidden="true" 
    />
  );
}
