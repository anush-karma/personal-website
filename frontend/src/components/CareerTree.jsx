import React, { useState, useRef } from 'react';

// ─── Typography ───────────────────────────────────────────────────────────────

const INTER = "Inter, system-ui, -apple-system, sans-serif";
const LORA  = "'Lora', Georgia, serif";
const MONO  = "'JetBrains Mono', 'Fira Code', monospace";

// ─── Palette ──────────────────────────────────────────────────────────────────

const ROOT_COLOR   = '#333333';
const BRANCH_COLOR = '#CCCCCC';
const FOLDER_COLOR = '#444444';
const ACTIVE_COLOR = '#111111';
const BORDER_COLOR = '#FFF9E0';   // butter pastel left border
const LABEL_COLOR  = '#999999';
const BODY_COLOR   = '#1A1A1A';

// ─── Tree Data ────────────────────────────────────────────────────────────────

const TREE_ROOT = 'root/Anushka_Karmakar [v1.8]';

const FOLDERS = [
  {
    id: 'signoz',
    name: 'signoz/',
    role: 'Sole Marketer',
    badge: 'SigNoz',
    isLast: false,
    details: [
      {
        id: 'mascot',
        label: 'Mascot',
        content: "Designed and launched 'Olly' (Arctic Bear) at KubeCon NA.",
        image: { src: '/olly.png', label: 'Olly' },
      },
      {
        id: 'gtm',
        label: 'GTM',
        content: 'Engineered the Datadog Migration Tool launch across 9+ technical pages.',
      },
      {
        id: 'growth',
        label: 'Growth',
        content: 'Delivered 2x conversion lift on core feature pages via messaging audits.',
      },
      {
        id: 'hiring',
        label: 'Hiring',
        content: 'Designed the 3-step evaluation process for Brand and DevRel hires.',
      },
      {
        id: 'ops',
        label: 'Ops',
        content: 'Resolved US/International shipping crises for SRECon and KubeCon.',
      },
    ],
  },
  {
    id: 'thrivestack',
    name: 'thrivestack/',
    role: 'PMM',
    isLast: false,
    details: [
      {
        id: 'authority',
        label: 'Authority',
        content:
          'Scaled domain rating from 23 to 56 in 8 days through targeted technical content and backlink architecture.',
      },
      {
        id: 'research',
        label: 'Research',
        content:
          'Conducted 172 structured user interviews to define ICP and feed product roadmap decisions.',
      },
    ],
  },
  {
    id: 'lemiride',
    name: 'lemiride/',
    role: 'Founder',
    isLast: false,
    details: [
      {
        id: 'product',
        label: 'Product',
        content:
          'Sole owner of the product spec and GTM from day one. Built the core business logic from the ground up.',
      },
      {
        id: 'exit',
        label: 'Exit',
        content: 'Navigated the company from first commit to acquisition.',
      },
    ],
  },
  {
    id: 'surrey_uni',
    name: 'surrey_uni/',
    role: 'MSc',
    isLast: false,
    details: [
      {
        id: 'degree',
        label: 'Degree',
        content:
          'MSc in International Management, University of Surrey. Systems thinking applied to global market structures.',
      },
    ],
  },
  {
    id: 'pratham',
    name: 'pratham/',
    role: 'Commit 0',
    isLast: true,
    details: [
      {
        id: 'init',
        label: 'Init',
        content:
          "First professional commit. Entry point at Pratham, one of India's largest education NGOs. Translating complex impact data into public communication.",
      },
    ],
  },
];

// ─── Image with fallback ──────────────────────────────────────────────────────

function TreeImage({ src, label }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          maxWidth: '120px',
          aspectRatio: '1',
          margin: '14px auto 0',
          backgroundColor: '#F7F7F7',
          border: '2px dashed #E0E0E0',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#BBBBBB',
          fontFamily: MONO,
          fontSize: '10px',
          letterSpacing: '0.04em',
          padding: '8px',
          textAlign: 'center',
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
      style={{ display: 'block', maxWidth: '160px', margin: '14px auto 0' }}
    />
  );
}

// ─── SigNoz Pill Badge ────────────────────────────────────────────────────────

function PillBadge({ text }) {
  return (
    <span
      data-testid="signoz-badge"
      style={{
        display: 'inline-block',
        background: '#F3F4F6',
        color: '#111827',
        padding: '4px 12px',
        borderRadius: '99px',
        fontWeight: 600,
        fontSize: '13px',
        fontFamily: INTER,
        marginBottom: '14px',
      }}
    >
      {text}
    </span>
  );
}

// ─── FolderRow ────────────────────────────────────────────────────────────────

function FolderRow({ folder, isOpen, onToggle, detailRef, idSuffix }) {
  return (
    <div data-testid={`tree-folder${idSuffix}-${folder.id}`}>
      {/* Clickable folder header */}
      <button
        data-testid={`tree-btn${idSuffix}-${folder.id}`}
        onClick={onToggle}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'baseline',
          gap: '6px',
          padding: '5px 0',
          width: '100%',
          textAlign: 'left',
        }}
      >
        {/* Branch character — stays Mono for alignment */}
        <span
          style={{
            fontFamily: MONO,
            fontSize: '13px',
            color: BRANCH_COLOR,
            flexShrink: 0,
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          {folder.isLast ? '\u2514\u2500\u2500' : '\u251C\u2500\u2500'}
        </span>

        {/* Folder name — Inter for readability */}
        <span
          style={{
            fontFamily: INTER,
            fontSize: '13px',
            fontWeight: isOpen ? 600 : 400,
            color: isOpen ? ACTIVE_COLOR : FOLDER_COLOR,
            transition: 'color 0.15s ease',
          }}
        >
          {folder.name}
        </span>

        {/* Role tag */}
        <span
          style={{
            fontFamily: INTER,
            fontSize: '11px',
            color: '#BBBBBB',
            flexShrink: 0,
          }}
        >
          ({folder.role})
        </span>
      </button>

      {/* Expanded detail block */}
      {isOpen && (
        <div
          ref={detailRef}
          data-testid={`tree-detail${idSuffix}-${folder.id}`}
          style={{
            paddingLeft: '24px',
            paddingTop: '14px',
            paddingBottom: '6px',
            borderLeft: `4px solid ${BORDER_COLOR}`,
            marginLeft: '5px',
            marginBottom: '2px',
            animation: 'fadeSlideUp 0.25s ease-out both',
          }}
        >
          {/* Optional company pill badge */}
          {folder.badge && <PillBadge text={folder.badge} />}

          {folder.details.map((detail) => (
            <div
              key={detail.id}
              data-testid={`tree-entry${idSuffix}-${folder.id}-${detail.id}`}
              style={{ marginBottom: '18px' }}
            >
              {/* Label — Inter Bold */}
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: '10px',
                  fontWeight: 700,
                  color: LABEL_COLOR,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  lineHeight: 1.4,
                }}
              >
                {detail.label}
              </p>

              {/* Body — Lora Serif */}
              <p
                style={{
                  fontFamily: LORA,
                  fontSize: '13px',
                  color: BODY_COLOR,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {detail.content}
              </p>

              {detail.image && (
                <TreeImage src={detail.image.src} label={detail.image.label} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CareerTree ───────────────────────────────────────────────────────────────

export default function CareerTree({ testIdSuffix = '' }) {
  const [openFolder, setOpenFolder] = useState(null);
  const detailRefs = useRef({});

  function handleToggle(id) {
    const next = openFolder === id ? null : id;
    setOpenFolder(next);
    if (next) {
      setTimeout(() => {
        detailRefs.current[next]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 60);
    }
  }

  return (
    <div
      data-testid={`career-tree${testIdSuffix}`}
      style={{ width: '100%', animation: 'fadeSlideUp 0.4s ease-out both' }}
    >
      {/* Root label — Inter Bold */}
      <p
        style={{
          fontFamily: INTER,
          fontSize: '12px',
          fontWeight: 700,
          color: ROOT_COLOR,
          letterSpacing: '-0.01em',
          marginBottom: '8px',
          lineHeight: 1.4,
        }}
      >
        {TREE_ROOT}
      </p>

      {FOLDERS.map((folder) => (
        <FolderRow
          key={folder.id}
          folder={folder}
          isOpen={openFolder === folder.id}
          onToggle={() => handleToggle(folder.id)}
          idSuffix={testIdSuffix}
          detailRef={(el) => { detailRefs.current[folder.id] = el; }}
        />
      ))}
    </div>
  );
}
