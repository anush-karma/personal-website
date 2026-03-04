import React, { useState } from 'react';

// ─── Typography ───────────────────────────────────────────────────────────────

const INTER = "Inter, system-ui, -apple-system, sans-serif";
const LORA  = "'Lora', Georgia, serif";
const MONO  = "'JetBrains Mono', monospace";

// ─── Image with [Visual Artifact: Name] fallback ─────────────────────────────

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
          fontFamily: MONO,
          fontSize: '11px',
          letterSpacing: '0.06em',
        }}
      >
        [Visual Artifact: {label}]
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      onError={() => setFailed(true)}
      style={{ display: 'block', maxWidth: '60%', margin: '0 auto' }}
    />
  );
}

// ─── Section renderers ────────────────────────────────────────────────────────

function renderSection(section, borderColor, accentColor, idx) {
  switch (section.type) {

    case 'header':
      return (
        <p
          key={idx}
          style={{
            fontFamily: INTER,
            fontSize: '14px',
            fontWeight: 700,
            color: accentColor || '#888888',
            letterSpacing: '-0.01em',
            marginBottom: '14px',
            lineHeight: 1.4,
          }}
        >
          {section.content}
        </p>
      );

    case 'body':
      return (
        <p
          key={idx}
          style={{
            fontFamily: LORA,
            fontSize: '13px',
            color: '#1A1A1A',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          {section.content}
        </p>
      );

    case 'company':
      return (
        <p
          key={idx}
          style={{
            fontFamily: INTER,
            fontSize: '15px',
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
            lineHeight: 1.4,
            marginBottom: '6px',
          }}
        >
          {section.content}
        </p>
      );

    case 'subtitle':
      return (
        <p
          key={idx}
          style={{
            fontFamily: LORA,
            fontSize: '13px',
            color: '#666666',
            fontStyle: 'italic',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}
        >
          {section.content}
        </p>
      );

    case 'image':
      return (
        <div key={idx} style={{ marginBottom: '16px', textAlign: 'center' }}>
          <ImageWithFallback src={section.src} label={section.label} />
        </div>
      );

    case 'bullets':
      return (
        <ul
          key={idx}
          style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '14px' }}
        >
          {section.items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  color: borderColor,
                  flexShrink: 0,
                  marginTop: '7px',
                  fontSize: '6px',
                  lineHeight: 1,
                }}
              >
                &#9679;
              </span>
              <p
                style={{
                  fontFamily: LORA,
                  fontSize: '13px',
                  color: '#1A1A1A',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
      );

    case 'past':
      return (
        <p
          key={idx}
          style={{
            fontFamily: LORA,
            fontSize: '12px',
            color: '#888888',
            lineHeight: 1.6,
            paddingTop: '12px',
            borderTop: '1px solid #EBEBEB',
            marginBottom: '4px',
          }}
        >
          {section.content}
        </p>
      );

    case 'footer':
      return (
        <p
          key={idx}
          style={{
            fontFamily: LORA,
            fontSize: '12px',
            color: '#888888',
            fontStyle: 'italic',
            lineHeight: 1.6,
            paddingTop: '14px',
            borderTop: '1px solid #EBEBEB',
          }}
        >
          {section.content}
        </p>
      );

    default:
      return null;
  }
}

// ─── VisualizerCard ───────────────────────────────────────────────────────────

export default function VisualizerCard({ card, testIdSuffix = '' }) {
  return (
    <div
      data-testid={`visualizer-card${testIdSuffix}-${card.id}`}
      style={{
        width: '100%',
        paddingLeft: '20px',
        borderLeft: `4px solid ${card.borderColor}`,
        animation: 'fadeSlideUp 0.4s ease-out both',
        overflowY: 'auto',
        maxHeight: '100%',
      }}
    >
      {/* Card label */}
      <p
        style={{
          fontFamily: INTER,
          fontSize: '9px',
          color: '#BBBBBB',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          fontWeight: 700,
          marginBottom: '16px',
          lineHeight: 1.4,
        }}
      >
        {card.title}
      </p>

      {/* Sections */}
      {card.sections.map((section, idx) =>
        renderSection(section, card.borderColor, card.accentColor, idx)
      )}
    </div>
  );
}
