# PRD — The Kernel: Anushka Karmakar's Portfolio Terminal

## Problem Statement
Build a React-based Terminal Emulator component for a personal portfolio. The terminal is the "Kernel" of a full portfolio page, centered on a clean dark background. It accepts text input, processes a defined command set, and returns styled responses with animations.

---

## Architecture
- **Stack**: React 18, Tailwind CSS 3, JetBrains Mono (Google Fonts)
- **Backend**: Minimal FastAPI (health check only — app is frontend-pure)
- **Storage**: In-memory React state (no database needed)
- **Font**: JetBrains Mono via Google Fonts
- **Hosting**: Supervisor-managed (frontend port 3000, backend port 8001)

### Key Files
| File | Purpose |
|------|---------|
| `frontend/src/components/Terminal.jsx` | Core terminal logic & UI |
| `frontend/src/App.js` | Entry point, renders Terminal |
| `frontend/src/index.css` | Global dark theme + scrollbar |
| `frontend/tailwind.config.js` | Custom blink animation + mono font |
| `frontend/public/index.html` | JetBrains Mono font import |

---

## User Personas
- **Recruiter / Hiring Manager**: Wants to quickly scan career background. Types `log` or `whoami`.
- **Tech Founder / Collaborator**: Curious about tech cred. Types `status` or explores commands.
- **PMM Peer**: Wants context on PLG/DevTool experience. Types `log`.

---

## Core Requirements (Static)
1. Dark matte theme: `#0D0D0D` bg, `#E0E0E0` text, `#7F7AFF` accent, `#333333` border
2. Monospace font (JetBrains Mono)
3. 5 commands: `help`, `whoami`, `status`, `log`, `clear`
4. Command outputs match the spec exactly
5. Typewriter effect: 20ms/char
6. Blinking block cursor (#7F7AFF)
7. Auto-scroll to bottom on new output
8. Auto-focus input on load + click-to-focus
9. ArrowUp/Down for command history navigation
10. `[v1.x]` tags in log output highlighted in purple

---

## Command Dictionary
| Command | Output |
|---------|--------|
| `help` | `Available commands: [whoami, status, log, clear]` |
| `whoami` | `Anushka Karmakar \| Product Marketing Manager \| Deep Tech & DevTools` |
| `status` | `LHS = RHS. System: v1.8. Growth logic initialized. Zero-slop environment active.` |
| `log` | 5-entry career history (v1.8 → v0.1), descending |
| `clear` | Wipes terminal history |

---

## What's Been Implemented

### Sprint 1 — MVP (Feb 2026)
- [x] Full terminal UI with dark theme and JetBrains Mono
- [x] All 5 commands with exact outputs from spec (help, whoami, status, log, clear)
- [x] TypewriterText component (20ms/char, character-by-character)
- [x] Purple highlight for `[vX.X]` tags in log output
- [x] Blinking block cursor in `#7F7AFF`
- [x] Auto-focus input + click-anywhere-to-focus
- [x] ArrowUp / ArrowDown command history navigation
- [x] Tab key prevention (keeps focus in terminal)
- [x] Scroll anchor for smooth auto-scroll
- [x] Custom scrollbar styled to match theme
- [x] Boot message: "The Kernel — v1.8.0"

## Sprint 3 — High-Fidelity Interface (Feb 2026)
- [x] White canvas (#FFFFFF) — page bg, html/body/#root all aligned
- [x] Terminal vault: max-width 850px, flex:1 height, min-height 500px, box-shadow 0 20px 50px rgba(0,0,0,0.1)
- [x] Header: #1A1A1A bg, real stoplight dots (#FF5F56/#FFBD2E/#27C93F), "anushka-karmakar — zsh" absolutely centered
- [x] Hot Chips redesigned: solid color backgrounds, 8px border-radius, bold Inter sans-serif, hover scale(1.05) + deeper shadow with transition: all 0.2s ease
- [x] Footer: fixed bottom, 12px #999999 Inter — "System: v1.8 | Deep Tech & DevTools" left, "LinkedIn: /in/anushkakarmakar" right
- [x] Terminal content text upgraded from #E0E0E0 → #FFFFFF throughout
- [x] All prior sprints (boot sequence, sequential typing, inline cursor) preserved
- [x] Testing: 100% pass rate (19/19 visual + functional tests via Playwright)
- [x] Boot sequence: 4 lines printed sequentially on mount via chain-callback TypewriterText
- [x] `[v1.8]` in boot line 1 auto-highlighted purple by existing regex
- [x] Input + Hot Chips disabled (`opacity: 0.35`, `cursor: not-allowed`) during boot
- [x] Input + cursor visually dim during boot, re-activate on `bootDone`
- [x] Hot Chips: 3 buttons below terminal — `[whoami]` purple, `[log]` yellow, `[status]` pink
- [x] Chips call `processCommand` directly, same as keyboard — no duplicate logic
- [x] Testing: 100% pass rate (17/17 tests) via Playwright automation

### Sprint 4 — Responsive Visualizer (Feb 2026)
- [x] Dual-pane layout: 60/40 flex-row on desktop (≥1024px), single-column on mobile
- [x] Visualizer Stage (right pane): shows placeholder text until a command is run
- [x] VisualizerCard component: Lora serif, left border accent, content lines, image fallback
- [x] whoami card: purple border (#7F7AFF), "Structural GTM" header + full body paragraph
- [x] log card: yellow border (#FFD632), company/subtitle/olly.png/6 bullets/past section
- [x] status card: pink border (#F379AC), body/dogs.png/italic footer
- [x] Images (olly.png, dogs.png) saved to /public/ -- transparent PNGs rendering on white bg
- [x] Image fallback: [Visual Artifact: Name] dashed box
- [x] Sections-based data model in VisualizerContent.js (header/body/company/subtitle/image/bullets/past/footer)
- [x] No em dashes in any content or code; right pane scrollable for tall cards
- [x] Cards animate in with fadeSlideUp (0.4s ease-out), re-mount on command change
- [x] `clear` command resets active card back to placeholder
- [x] Mobile bottom-sheet drawer: slides up with drawerSlideUp animation
- [x] Drawer has drag handle + ✕ close button (dismisses on click)
- [x] Distinct data-testids for desktop vs mobile card instances
- [x] Lora font added to Google Fonts import in index.html
- [x] fadeSlideUp + drawerSlideUp keyframes added to index.css
- [x] Testing: 100% pass rate (30/30 tests via Playwright — desktop + mobile)

### Sprint 5 -- Career Directory Tree (Feb 2026)
- [x] CareerTree.jsx: interactive file tree replaces static log card
- [x] 5 folders: signoz/ (Sole Marketer), thrivestack/ (PMM), lemiride/ (Founder), surrey_uni/ (MSc), pratham/ (Commit 0)
- [x] Tree branch chars: Unicode 251C (├──) for non-last, 2514 (└──) for last
- [x] Accordion: one folder open at a time, toggle collapse on re-click
- [x] signoz/ detail: 5 sections (The Mascot + olly.png, Growth, Product, Ops, Hiring)
- [x] thrivestack/: Authority + Research; lemiride/: Product + Exit; surrey_uni/: Degree; pratham/: Init
- [x] Mobile: CareerTree renders inside the slide-up drawer with scroll-on-expand behavior
- [x] No em dashes in any content; whoami/status cards unchanged from Sprint 4
- [x] Testing: 100% pass rate (26/26 tests -- desktop + mobile)

### Sprint 6 -- Final Polish and Launch (Feb 2026)
- [x] Pastel Hot Chips: whoami=#E6E4FF lavender, log=#FFF9E0 butter, status=#FFE4E9 blush; dark gray #333333 text; 0.5s transition; scale+lift on hover
- [x] Notebook right pane: repeating-linear-gradient #F1F1F1 every 26px on right pane and mobile drawer
- [x] All right-pane text: Lora serif, 26px line-height
- [x] Terminal vault: box-shadow 0 40px 100px rgba(0,0,0,0.07), border 1px solid rgba(0,0,0,0.05)
- [x] Footer: "Product Marketing Manager | SigNoz [v1.8]" left; clickable LinkedIn link right (lavender hover)
- [x] Global auto-focus: clicking anywhere focuses terminal input
- [x] signoz/ tree: updated 5 entries (Mascot/GTM/Growth/Hiring/Ops), no em dashes
- [x] whoami card: border #E6E4FF, accentColor #6B68C8; status: border #FFE4E9, accentColor #C06080
- [x] Testing: 100% pass rate (23/23 tests -- desktop + mobile)

---

### Backlog
#### P1 -- Nice to Have
- contact command with clickable email + LinkedIn card in the Visualizer
- projects command with portfolio links
- Mobile keyboard UX improvements
- Tab completion for commands
- surrey_uni/ and pratham/ folders: add more detail entries

#### P2 -- Future
- ASCII art header for boot message
- Subtle CRT scanline overlay
- Share terminal session link
- Share terminal session link
