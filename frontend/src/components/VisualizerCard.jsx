import React, { useState } from 'react';

// ─── Image with text-label fallback ──────────────────────────────────────────

function ImageWithFallback({ src, label }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        data-testid={`image-placeholder-${label}`}
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          backgroundColor: '#F7F7F7',
          border: '2px dashed #E0E0E0',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#BBBBBB',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '11px',
          letterSpacing: '0.06em',
        }}
      >
        [ {label} ]
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      onError={() => setFailed(true)}
      style={{ width: '100%', borderRadius: '6px', display: 'block' }}
    />
  );
}

// ─── VisualizerCard ───────────────────────────────────────────────────────────

export default function VisualizerCard({ card, testIdSuffix = '' }) {
  return (
    <div
      data-testid={`visualizer-card${testIdSuffix}-${card.id}`}
      style={{
        width: '100%',
        paddingLeft: '20px',
        borderLeft: `3px solid ${card.borderColor}`,
        animation: 'fadeSlideUp 0.4s ease-out both',
      }}
    >
      {/* Title */}
      <p
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '10px',
          color: card.borderColor,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          fontWeight: 600,
          marginBottom: '18px',
        }}
      >
        {card.title}
      </p>

      {/* Content lines */}
      <div style={{ marginBottom: card.image ? '20px' : 0 }}>
        {card.lines.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '14px',
              color: '#1A1A1A',
              lineHeight: '1.85',
              marginBottom: '2px',
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Optional image */}
      {card.image && (
        <ImageWithFallback src={card.image.src} label={card.image.label} />
      )}
    </div>
  );
}
