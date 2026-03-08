// ─── Visualizer Card Data ─────────────────────────────────────────────────────
// borderColor: used for the left-border accent line (pastel)
// accentColor: used for header text (readable, darker version of the pastel)

export const VISUALIZER_CARDS = {

  about: {
    id: 'about',
    title: 'about',
    borderColor: '#E6E4FF',
    accentColor: '#6B68C8',
    sections: [
      {
        type: 'header',
        content: 'PMM, DevTools',
      },
      {
        type: 'body',
        content:
          'Most PMMs pick a lane: they write, or they design, or they do strategy. In the era of AI, that separation makes even less sense. Research is faster, execution is faster, and the only thing that actually differentiates is taste. I build for brand first because metrics are downstream of whether developers actually believe you. And in dev tools, trust is the only thing that compounds.',
      },
    ],
  },

  // work is now rendered as an interactive CareerTree component (see CareerTree.jsx)

  life: {
    id: 'life',
    title: 'life',
    borderColor: '#FFE4E9',
    accentColor: '#C06080',
    sections: [
      {
        type: 'body',
        content:
          'Currently PMM at SigNoz, an open source observability platform. I run, do calisthenics, and live with two Indian Pariah dogs who have strong opinions about my work schedule. This year I am going to Thailand for a week to learn Muay Thai and get punched in the face.',
      },
      {
        type: 'image',
        src: process.env.PUBLIC_URL + '/dogs.png',
        label: 'Dogs',
      },
      {
        type: 'footer',
        content:
          'Remote from Mumbai. Open to the right opportunity.',
      },
    ],
  },
};
