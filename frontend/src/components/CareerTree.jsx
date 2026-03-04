import React, { useState, useRef } from 'react';

const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const LORA = "'Lora', Georgia, serif";

// ─── Pastel-aligned palette ───────────────────────────────────────────────────
// Tree structure uses muted neutrals to match the notebook aesthetic.
// #FFF9E0 (butter pastel) is used only for the left-border accent on expanded blocks.

const ROOT_COLOR   = '#333333';   // root label text
const BRANCH_COLOR = '#CCCCCC';   // ├── └── chars
const FOLDER_COLOR = '#444444';   // inactive folder names
const ACTIVE_COLOR = '#111111';   // active folder name (bold)
const BORDER_COLOR = '#FFF9E0';   // detail block left border (butter pastel)
const LABEL_COLOR  = '#999999';   // entry section labels (uppercase Mono)
const BODY_COLOR   = '#1A1A1A';   // Lora body text

// ─── Tree Data ────────────────────────────────────────────────────────────────

const TREE_ROOT = 'root/Anushka_Karmakar [v1.8]';

const FOLDERS = [
  {
    id: 'signoz',
    name: 'signoz/',
    role: 'Sole Marketer',
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
      style={{
        display: 'block',
        maxWidth: '160px',
        margin: '14px auto 0',
      }}
    />
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
        {/* Tree branch character */}
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

        {/* Folder name */}
        <span
          style={{
            fontFamily: MONO,
            fontSize: '13px',
            color: isOpen ? ACTIVE_COLOR : FOLDER_COLOR,
            fontWeight: isOpen ? 600 : 400,
            transition: 'color 0.15s ease',
          }}
        >
          {folder.name}
        </span>

        {/* Role tag */}
        <span
          style={{
            fontFamily: MONO,
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
            paddingTop: '12px',
            paddingBottom: '6px',
            borderLeft: `2px solid ${BORDER_COLOR}`,
            marginLeft: '5px',
            marginBottom: '2px',
            animation: 'fadeSlideUp 0.25s ease-out both',
          }}
        >
          {folder.details.map((detail) => (
            <div
              key={detail.id}
              data-testid={`tree-entry${idSuffix}-${folder.id}-${detail.id}`}
              style={{ marginBottom: '18px' }}
            >
              {/* Entry label */}
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  color: LABEL_COLOR,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '4px',
                  lineHeight: '16px',
                }}
              >
                {detail.label}
              </p>

              {/* Entry body */}
              <p
                style={{
                  fontFamily: LORA,
                  fontSize: '13px',
                  color: BODY_COLOR,
                  lineHeight: '26px',
                  margin: 0,
                }}
              >
                {detail.content}
              </p>

              {/* Optional image */}
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
      style={{
        width: '100%',
        animation: 'fadeSlideUp 0.4s ease-out both',
      }}
    >
      {/* Tree root label */}
      <p
        style={{
          fontFamily: MONO,
          fontSize: '12px',
          color: ROOT_COLOR,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          marginBottom: '8px',
          lineHeight: '26px',
        }}
      >
        {TREE_ROOT}
      </p>

      {/* Folder rows */}
      {FOLDERS.map((folder) => (
        <FolderRow
          key={folder.id}
          folder={folder}
          isOpen={openFolder === folder.id}
          onToggle={() => handleToggle(folder.id)}
          idSuffix={testIdSuffix}
          detailRef={(el) => {
            detailRefs.current[folder.id] = el;
          }}
        />
      ))}
    </div>
  );
}
