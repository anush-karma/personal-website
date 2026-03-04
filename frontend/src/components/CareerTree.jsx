import React, { useState, useRef } from 'react';

const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const LORA = "'Lora', Georgia, serif";
const YELLOW = '#FFD632';

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
        label: 'The Mascot',
        content:
          'Conceived and launched Olly, the Arctic Bear, at KubeCon North America. The brief was to humanize the infrastructure stack for developers who distrust marketing.',
        image: { src: '/olly.png', label: 'Olly' },
      },
      {
        id: 'growth',
        label: 'Growth',
        content:
          'Engineered a 2x conversion lift on core feature pages through messaging audits and Clarity heatmap tracking.',
      },
      {
        id: 'product',
        label: 'Product',
        content:
          'Built the GTM engine for the Datadog Migration Tool. Technical landing pages and personal outreach to 500+ migration candidates.',
      },
      {
        id: 'ops',
        label: 'Ops',
        content:
          'Managed international logistics and resolved shipping crises for KubeCon North America and SRECon.',
      },
      {
        id: 'hiring',
        label: 'Hiring',
        content:
          'Designed the job architecture and ran the 3-step interview process for DevRel and Brand/Community hires.',
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
            color: YELLOW,
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
            color: isOpen ? YELLOW : '#1A1A1A',
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
            color: '#AAAAAA',
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
            borderLeft: `2px solid ${YELLOW}`,
            marginLeft: '5px',
            marginBottom: '2px',
            animation: 'fadeSlideUp 0.25s ease-out both',
          }}
        >
          {folder.details.map((detail) => (
            <div
              key={detail.id}
              data-testid={`tree-entry${idSuffix}-${folder.id}-${detail.id}`}
              style={{ marginBottom: '16px' }}
            >
              {/* Entry label */}
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: YELLOW,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '5px',
                }}
              >
                {detail.label}
              </p>

              {/* Entry body */}
              <p
                style={{
                  fontFamily: LORA,
                  fontSize: '13px',
                  color: '#1A1A1A',
                  lineHeight: '1.75',
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
      // After the accordion animates open, scroll it into view (critical for mobile drawer)
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
          fontSize: '13px',
          color: YELLOW,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          marginBottom: '8px',
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
