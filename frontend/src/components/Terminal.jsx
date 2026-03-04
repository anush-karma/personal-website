import React, { useState, useRef, useEffect, useCallback } from 'react';

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

function TypewriterText({ text, speed, onScrollRequest, onComplete }) {
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
      style={{ color: '#E0E0E0', whiteSpace: 'pre-wrap', lineHeight: '1.7' }}
    >
      {displayed.split('\n').map((line, i) => {
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
          </div>
        );
      })}
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
  const bootIdxRef = useRef(0);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  // Auto-scroll when history grows
  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Boot sequence — each line kicks off the next via onComplete
  const addNextBootLine = useCallback(() => {
    const idx = bootIdxRef.current;
    if (idx < BOOT_LINES.length) {
      bootIdxRef.current = idx + 1;
      setHistory(prev => [
        ...prev,
        { id: uid(), type: 'boot', text: BOOT_LINES[idx] },
      ]);
    } else {
      setBootDone(true);
    }
  }, []);

  // Kick off boot on mount
  useEffect(() => {
    addNextBootLine();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const processCommand = useCallback((raw) => {
    const result = resolveCommand(raw);

    if (result === '__CLEAR__') {
      setHistory([]);
      return;
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
      style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center p-4 sm:p-8 font-mono gap-4"
    >
      {/* ── Terminal Window ── */}
      <div
        data-testid="terminal-window"
        className="w-full max-w-4xl rounded-lg overflow-hidden flex flex-col"
        style={{ height: '80vh', border: '1px solid #333333' }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 shrink-0 select-none"
          style={{ backgroundColor: '#111111', borderBottom: '1px solid #333333' }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#3a3a3a' }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#3a3a3a' }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#3a3a3a' }}
          />
          <span className="ml-4 text-xs" style={{ color: '#555555' }}>
            guest@anushka-portfolio:~
          </span>
        </div>

        {/* Output Area */}
        <div
          data-testid="terminal-output"
          className="flex-1 overflow-y-auto p-5 text-sm"
          style={{ backgroundColor: '#0D0D0D' }}
        >
          {/* Boot Message */}
          <div className="mb-6 select-none">
            <p style={{ color: '#7F7AFF', fontWeight: 700, fontSize: '15px' }}>
              The Kernel — v1.8.0
            </p>
            <p style={{ color: '#888888', marginTop: '2px' }}>
              Anushka Karmakar's Portfolio Terminal
            </p>
            <p style={{ color: '#222222', marginTop: '6px', letterSpacing: '0.05em' }}>
              {'─'.repeat(54)}
            </p>
            <p style={{ color: '#555555', marginTop: '6px' }}>
              Type{' '}
              <span style={{ color: '#7F7AFF' }}>'help'</span>
              {' '}to get started.
            </p>
          </div>

          {/* Command History */}
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
                <span
                  data-testid="command-entry"
                  style={{ color: '#E0E0E0' }}
                >
                  {item.text}
                </span>
              </div>
            ) : item.type === 'boot' ? (
              <div key={item.id} className="mb-1" style={{ lineHeight: '1.7' }}>
                <TypewriterText
                  text={item.text}
                  speed={20}
                  onScrollRequest={scrollToBottom}
                  onComplete={addNextBootLine}
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

          {/* Scroll anchor */}
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

          {/* Visible text + cursor display */}
          <div className="relative flex-1 flex items-center text-sm">
            <span style={{ color: '#E0E0E0' }}>{input}</span>
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
            {/* Hidden but focusable real input */}
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

      {/* ── Hot Chips ── */}
      <div
        data-testid="hot-chips"
        className="flex items-center gap-3 w-full max-w-4xl"
        onClick={e => e.stopPropagation()}
      >
        {[
          { label: 'whoami', color: '#7F7AFF' },
          { label: 'log',    color: '#FFD632' },
          { label: 'status', color: '#F379AC' },
        ].map(({ label, color }) => (
          <button
            key={label}
            data-testid={`chip-${label}`}
            disabled={!bootDone}
            onClick={() => {
              processCommand(label);
              focusInput();
            }}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${color}`,
              color: color,
              padding: '6px 18px',
              fontFamily: 'inherit',
              fontSize: '13px',
              cursor: bootDone ? 'pointer' : 'not-allowed',
              borderRadius: '4px',
              opacity: bootDone ? 1 : 0.35,
              transition: 'background-color 150ms ease, opacity 150ms ease',
            }}
            onMouseEnter={e => {
              if (bootDone) e.currentTarget.style.backgroundColor = `${color}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            [{label}]
          </button>
        ))}
      </div>
    </div>
  );
}
