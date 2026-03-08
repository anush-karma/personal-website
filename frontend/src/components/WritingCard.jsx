import React, { useState } from 'react';

// ─── Typography ───────────────────────────────────────────────────────────────

const INTER = "Inter, system-ui, -apple-system, sans-serif";
const LORA  = "'Lora', Georgia, serif";

// ─── Writing Data ─────────────────────────────────────────────────────────────

const GROUPS = [
  {
    label: 'Technical Writing',
    subtitle: null,
    items: [
      { title: 'Optimizing Log Processing at Scale', href: 'https://signoz.io/blog/optimizing-log-processing-at-scale/' },
      { title: 'Query Performance Improvement',      href: 'https://signoz.io/blog/query-performance-improvement/' },
      { title: 'Query Builder v5',                   href: 'https://signoz.io/blog/query-builder-v5/' },
    ],
  },
  {
    label: 'Feature Pages',
    subtitle: 'research, copy, and Figma mocks',
    items: [
      { title: 'Log Management',                         href: 'https://signoz.io/log-management/' },
      { title: 'Distributed Tracing',                    href: 'https://signoz.io/distributed-tracing/' },
      { title: 'Trace Funnels',                          href: 'https://signoz.io/trace-funnels/' },
      { title: 'Alerts Management',                      href: 'https://signoz.io/alerts-management/' },
      { title: 'External APIs',                          href: 'https://signoz.io/external-apis/' },
      { title: 'LLM Observability',                      href: 'https://signoz.io/llm-observability/' },
      { title: 'Observability for AI-Native Companies',  href: 'https://signoz.io/observability-for-ai-native-companies/' },
    ],
  },
  {
    label: 'Other',
    subtitle: null,
    items: [
      { title: '100th GitHub Release',        href: 'https://signoz.io/blog/100th-github-release/' },
      { title: 'Bug Fixes in Our Changelog',  href: 'https://signoz.io/blog/bug-fixes-in-our-changelog/' },
    ],
  },
];

// ─── LinkRow ──────────────────────────────────────────────────────────────────

function LinkRow({ title, href }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        gap: '6px',
        marginBottom: '10px',
      }}
    >
      <span
        style={{
          fontFamily: LORA,
          fontSize: '13px',
          color: '#1A1A1A',
          lineHeight: 1.5,
        }}
      >
        {title}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: hovered ? '#333333' : '#BBBBBB',
          textDecoration: 'none',
          fontSize: '13px',
          flexShrink: 0,
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        ↗
      </a>
    </div>
  );
}

// ─── WritingCard ──────────────────────────────────────────────────────────────

export default function WritingCard() {
  return (
    <div
      style={{
        width: '100%',
        paddingLeft: '20px',
        borderLeft: '4px solid #E6E4FF',
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
        ./writing
      </p>

      {GROUPS.map((group, gi) => (
        <div key={gi} style={{ marginBottom: gi < GROUPS.length - 1 ? '24px' : '0' }}>
          {/* Group label */}
          <p
            style={{
              fontFamily: INTER,
              fontSize: '10px',
              fontWeight: 700,
              color: '#BBBBBB',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              marginBottom: group.subtitle ? '4px' : '10px',
              lineHeight: 1.4,
            }}
          >
            {group.label}
          </p>

          {/* Optional subtitle */}
          {group.subtitle && (
            <p
              style={{
                fontFamily: LORA,
                fontSize: '12px',
                color: '#888888',
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginBottom: '10px',
              }}
            >
              {group.subtitle}
            </p>
          )}

          {/* Links */}
          {group.items.map((item, ii) => (
            <LinkRow key={ii} title={item.title} href={item.href} />
          ))}
        </div>
      ))}
    </div>
  );
}
