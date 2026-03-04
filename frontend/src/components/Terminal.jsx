import React, { useState, useRef, useEffect, useCallback } from 'react';
import VisualizerCard from './VisualizerCard';
import CareerTree from './CareerTree';
import { VISUALIZER_CARDS } from '../VisualizerContent';

// ─── Command Dictionary ───────────────────────────────────────────────────────

const LOG_OUTPUT = [
  '[v1.8] SigNoz: Scaling observability. Solved for 2x conversion lift & ATH community growth.',
  '[v1.5] ThriveStack: Defined PLG playbooks and GTM for developer-first infrastructure.',
  '[v1.0] Founder, LeMiRide: Owned the Product. Built the kernel of business logic from the ground up.',
  '[v0.6] University of Surrey: Global system upgrade. MSc in International Management.',
  '[v0.1] Pratham: Initial commit. First professional logic gate.',
].join('\n');

function resolveCommand(cmd) {
  switch (cmd.trim().toLowerCase()) {
    case 'help':
      return 'Available commands: [whoami, status, log, clear]';
    case 'whoami':
      return 'Anushka Karmakar | Product Marketing Manager | Deep Tech & DevTools';
    case 'status':
      return 'LHS = RHS. System: v1.8. Growth logic initialized. Zero-slop environment active.';
    case 'log':
      return LOG_OUTPUT;
    case 'clear':
      return '__CLEAR__';
    case '':
      return null;
    default:
      return `Command not found: '${cmd.trim()}'. Type 'help' for available commands.`;
  }
}

// ─── TypewriterText ───────────────────────────────────────────────────────────

function TypewriterText({ text, speed, onScrollRequest, onComplete, showCursor }) {
  const [count, setCount] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (count >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }
    const t = setTimeout(() => {
      setCount(c => c + 1);
      onScrollRequest?.();
    }, speed);
    return () => clearTimeout(t);
  }, [count, text.length, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayed = text.slice(0, count);

  return (
    <div
      data-testid="response-block"
      style={{ color: '#FFFFFF', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}
    >
      {displayed.split('\n').map((line, i, arr) => {
        const isLast = i === arr.length - 1;
        const parts = line.split(/(\[v\d+\.\d+\])/g);
        return (
          <div key={i}>
            {parts.map((part, j) =>
              /^\[v\d+\.\d+\]$/.test(part) ? (
                <span key={j} style={{ color: '#7F7AFF', fontWeight: 600 }}>
                  {part}
                </span>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
            {showCursor && isLast && (
              <span
                className="animate-blink inline-block"
                style={{
                  width: '0.55em',
                  height: '1.05em',
                  backgroundColor: '#7F7AFF',
                  marginLeft: '1px',
                  verticalAlign: 'middle',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── VisualizerPlaceholder ────────────────────────────────────────────────────

function VisualizerPlaceholder() {
  return (
    <div
      data-testid="visualizer-placeholder"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        opacity: 0.3,
      }}
    >
      <div
        style={{
          width: '28px',
          height: '1px',
          backgroundColor: '#AAAAAA',
          marginBottom: '10px',
        }}
      />
      <p
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: '13px',
          color: '#888888',
          textAlign: 'center',
          lineHeight: '1.7',
        }}
      >
        run whoami, log,
        <br />
        or status to see more
      </p>
    </div>
  );
}

// ─── Terminal ─────────────────────────────────────────────────────────────────

let _uid = 0;
const uid = () => ++_uid;

const BOOT_LINES = [
  'Initializing AK-OS [v1.8]...',
  'Loading Deep_Tech_Modules...',
  'System ready. Anushka Karmakar active.',
  "Type 'help' or use the buttons below.",
];

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [bootDone, setBootDone] = useState(false);
  const [currentBootLine, setCurrentBootLine] = useState(-1);
  const [activeCard, setActiveCard] = useState(null);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  // Auto-scroll when history grows
  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Boot sequence: each line queued at cumulative delay (string length × 20ms)
  useEffect(() => {
    const timeouts = [];
    let delay = 0;

    BOOT_LINES.forEach((line, i) => {
      timeouts.push(
        setTimeout(() => {
          setCurrentBootLine(i);
          setHistory(prev => [
            ...prev,
            { id: uid(), type: 'boot', text: line, lineIdx: i },
          ]);
        }, delay)
      );
      delay += line.length * 20;
    });

    timeouts.push(
      setTimeout(() => {
        setCurrentBootLine(-1);
        setBootDone(true);
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const processCommand = useCallback((raw) => {
    const result = resolveCommand(raw);
    const cmd = raw.trim().toLowerCase();

    if (result === '__CLEAR__') {
      setHistory([]);
      setActiveCard(null);
      return;
    }

    if (['whoami', 'log', 'status'].includes(cmd)) {
      setActiveCard(cmd);
    }

    const entries = [];
    if (raw.trim() !== '') {
      entries.push({ id: uid(), type: 'command', text: raw.trim() });
    }
    if (result !== null) {
      entries.push({ id: uid(), type: 'response', text: result });
    }
    if (entries.length > 0) {
      setHistory(prev => [...prev, ...entries]);
    }
  }, []);

  const onKeyDown = useCallback(
    e => {
      if (!bootDone) return;
      if (e.key === 'Enter') {
        const cmd = input;
        setInput('');
        setHistIdx(-1);
        if (cmd.trim()) setCmdHistory(prev => [cmd, ...prev]);
        processCommand(cmd);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const next = Math.min(histIdx + 1, cmdHistory.length - 1);
        if (cmdHistory[next] !== undefined) {
          setHistIdx(next);
          setInput(cmdHistory[next]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.max(histIdx - 1, -1);
        setHistIdx(next);
        setInput(next === -1 ? '' : cmdHistory[next]);
      } else if (e.key === 'Tab') {
        e.preventDefault();
      }
    },
    [bootDone, input, histIdx, cmdHistory, processCommand]
  );

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      onClick={focusInput}
      style={{
        backgroundColor: '#FFFFFF',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Main layout: single column on mobile, 60/40 row on desktop ── */}
      <div className="flex h-full">

        {/* ── Left Pane: Terminal + Hot Chips ── */}
        <div
          className="flex flex-col w-full lg:w-3/5"
          style={{ padding: '20px 16px 80px', gap: '32px', height: '100%', minWidth: 0 }}
        >

          {/* Terminal Window */}
          <div
            data-testid="terminal-window"
            className="rounded-lg overflow-hidden flex flex-col"
            style={{
              flex: 1,
              minHeight: '500px',
              backgroundColor: '#0D0D0D',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.07)',
            }}
          >
            {/* Title Bar */}
            <div
              className="relative flex items-center px-4 py-3 shrink-0 select-none"
              style={{ backgroundColor: '#1A1A1A', borderBottom: '1px solid #2a2a2a' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27C93F' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  style={{
                    fontSize: '12px',
                    color: '#666666',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    letterSpacing: '0.04em',
                  }}
                >
                  anushka-karmakar — zsh
                </span>
              </div>
            </div>

            {/* Output Area */}
            <div
              data-testid="terminal-output"
              className="flex-1 overflow-y-auto p-5 text-sm"
              style={{ backgroundColor: '#0D0D0D' }}
            >
              {/* Boot Header */}
              <div className="mb-6 select-none">
                <p style={{ color: '#7F7AFF', fontWeight: 700, fontSize: '15px' }}>
                  The Kernel — v1.8.0
                </p>
                <p style={{ color: '#888888', marginTop: '2px' }}>
                  Anushka Karmakar's Portfolio Terminal
                </p>
                <p style={{ color: '#333333', marginTop: '6px', letterSpacing: '0.05em' }}>
                  {'─'.repeat(54)}
                </p>
                <p style={{ color: '#666666', marginTop: '6px' }}>
                  Type{' '}
                  <span style={{ color: '#7F7AFF' }}>'help'</span>
                  {' '}to get started.
                </p>
              </div>

              {/* Command / Response History */}
              {history.map(item =>
                item.type === 'command' ? (
                  <div
                    key={item.id}
                    className="flex gap-3 mb-1"
                    style={{ lineHeight: '1.7' }}
                  >
                    <span
                      style={{ color: '#7F7AFF', userSelect: 'none' }}
                      className="shrink-0"
                    >
                      guest@kernel:~$
                    </span>
                    <span data-testid="command-entry" style={{ color: '#FFFFFF' }}>
                      {item.text}
                    </span>
                  </div>
                ) : item.type === 'boot' ? (
                  <div key={item.id} className="mb-1" style={{ lineHeight: '1.7' }}>
                    <TypewriterText
                      text={item.text}
                      speed={20}
                      onScrollRequest={scrollToBottom}
                      showCursor={currentBootLine === item.lineIdx}
                    />
                  </div>
                ) : (
                  <div key={item.id} className="mb-4">
                    <TypewriterText
                      text={item.text}
                      speed={20}
                      onScrollRequest={scrollToBottom}
                    />
                  </div>
                )
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div
              className="flex items-center gap-3 px-5 py-3 shrink-0"
              style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid #333333' }}
            >
              <span
                style={{ color: bootDone ? '#7F7AFF' : '#444444', userSelect: 'none' }}
                className="shrink-0 text-sm"
              >
                guest@kernel:~$
              </span>

              <div className="relative flex-1 flex items-center text-sm">
                <span style={{ color: '#FFFFFF' }}>{input}</span>
                <span
                  data-testid="terminal-cursor"
                  className="animate-blink inline-block"
                  style={{
                    width: '0.55em',
                    height: '1.15em',
                    backgroundColor: bootDone ? '#7F7AFF' : '#333333',
                    marginLeft: '1px',
                    verticalAlign: 'middle',
                  }}
                />
                <input
                  ref={inputRef}
                  data-testid="terminal-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={!bootDone}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    width: '1px',
                    height: '1px',
                    top: 0,
                    left: 0,
                  }}
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>

          {/* Hot Chips */}
          <div
            data-testid="hot-chips"
            className="flex items-center shrink-0"
            style={{ gap: '12px' }}
            onClick={e => e.stopPropagation()}
          >
            {[
              { label: 'whoami', bg: '#E6E4FF', text: '#333333', shadow: 'rgba(230,228,255,0.9)' },
              { label: 'log',    bg: '#FFF9E0', text: '#333333', shadow: 'rgba(255,249,224,1.0)' },
              { label: 'status', bg: '#FFE4E9', text: '#333333', shadow: 'rgba(255,228,233,0.9)' },
            ].map(({ label, bg, text, shadow }) => (
              <button
                key={label}
                data-testid={`chip-${label}`}
                disabled={!bootDone}
                onClick={() => { processCommand(label); focusInput(); }}
                style={{
                  backgroundColor: bg,
                  border: 'none',
                  color: text,
                  padding: '9px 22px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: bootDone ? 'pointer' : 'not-allowed',
                  borderRadius: '8px',
                  opacity: bootDone ? 1 : 0.4,
                  transition: 'all 0.5s ease',
                  boxShadow: bootDone ? `0 2px 12px ${shadow}` : 'none',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  if (!bootDone) return;
                  e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 10px 28px ${shadow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = bootDone ? `0 2px 12px ${shadow}` : 'none';
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right Pane: Visualizer Stage (desktop ≥1024px only) ── */}
        <div
          data-testid="visualizer-stage"
          className="hidden lg:flex lg:w-2/5 flex-col"
          style={{
            padding: '48px 40px 80px 40px',
            borderLeft: '1px solid #F0F0F0',
            overflowY: 'auto',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 25px, #F1F1F1 25px, #F1F1F1 26px)',
          }}
        >
          {activeCard === 'log' ? (
            <CareerTree key="log-tree" />
          ) : activeCard ? (
            <VisualizerCard key={activeCard} card={VISUALIZER_CARDS[activeCard]} />
          ) : (
            <VisualizerPlaceholder />
          )}
        </div>
      </div>

      {/* ── Mobile Bottom Drawer (<1024px only) ── */}
      {activeCard && (
        <div
          data-testid="mobile-drawer"
          className="lg:hidden fixed inset-x-0 bottom-0 z-50"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px 16px 0 0',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
            maxHeight: '60vh',
            overflow: 'auto',
            animation: 'drawerSlideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) both',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 25px, #F1F1F1 25px, #F1F1F1 26px)',
          }}
        >
          <div style={{ padding: '16px 24px 32px' }}>
            {/* Handle + close row */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '3px',
                  backgroundColor: '#E0E0E0',
                  borderRadius: '2px',
                }}
              />
              <button
                data-testid="drawer-close"
                onClick={e => { e.stopPropagation(); setActiveCard(null); }}
                style={{
                  position: 'absolute',
                  right: 0,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999999',
                  fontSize: '14px',
                  padding: '4px 8px',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {activeCard === 'log' ? (
              <CareerTree key="log-tree-mobile" testIdSuffix="-mobile" />
            ) : (
              <VisualizerCard
                key={`mobile-${activeCard}`}
                card={VISUALIZER_CARDS[activeCard]}
                testIdSuffix="-mobile"
              />
            )}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div
        data-testid="footer"
        className="flex justify-between items-center"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 24px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F5F5F5',
        }}
        onClick={e => e.stopPropagation()}
      >
        <span style={{ fontSize: '12px', color: '#999999' }}>
          Product Marketing Manager | SigNoz [v1.8]
        </span>
        <a
          href="https://linkedin.com/in/anushkakarmakar/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-linkedin-link"
          style={{
            fontSize: '12px',
            color: '#999999',
            textDecoration: 'none',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#9B97E8'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#999999'; }}
        >
          linkedin.com/in/anushkakarmakar
        </a>
      </div>
    </div>
  );
}
