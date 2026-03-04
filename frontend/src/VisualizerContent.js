// ─── Visualizer Card Data ─────────────────────────────────────────────────────
// Images (olly.png, dogs.png) should be placed in /public/ once available.
// The VisualizerCard component handles the missing-image fallback automatically.

export const VISUALIZER_CARDS = {
  whoami: {
    id: 'whoami',
    title: 'whoami',
    borderColor: '#7F7AFF',
    lines: [
      'Anushka Karmakar',
      'Product Marketing Manager',
      'Deep Tech & DevTools',
    ],
    image: { src: '/olly.png', label: 'olly.png' },
  },

  log: {
    id: 'log',
    title: 'log',
    borderColor: '#FFD632',
    lines: [
      '[v1.8] SigNoz — Scaling observability. 2x conversion lift & ATH community growth.',
      '[v1.5] ThriveStack — PLG playbooks & GTM for developer-first infrastructure.',
      '[v1.0] Founder, LeMiRide — Owned the Product. Built the kernel from the ground up.',
      '[v0.6] University of Surrey — MSc in International Management.',
      '[v0.1] Pratham — Initial commit. First professional logic gate.',
    ],
    image: { src: '/dogs.png', label: 'dogs.png' },
  },

  status: {
    id: 'status',
    title: 'status',
    borderColor: '#F379AC',
    lines: [
      'LHS = RHS.',
      'System: v1.8.',
      'Growth logic initialized.',
      'Zero-slop environment active.',
    ],
    image: null,
  },
};
