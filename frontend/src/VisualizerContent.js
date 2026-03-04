// ─── Visualizer Card Data ─────────────────────────────────────────────────────
// Section types: header | body | company | subtitle | image | bullets | past | footer
// No em dashes. Images served from /public/.

export const VISUALIZER_CARDS = {

  whoami: {
    id: 'whoami',
    title: 'whoami',
    borderColor: '#7F7AFF',
    sections: [
      {
        type: 'header',
        content: 'Structural GTM',
      },
      {
        type: 'body',
        content:
          'Mathematics taught me to look for the underlying structure in any chaotic system. In marketing, that structure is rarely found in a generic playbook. I build brands for developers by prioritizing technical depth and proof over loud claims. If the product is the engine, the brand is the trust that allows a user to hit the ignition.',
      },
    ],
  },

  // log is now rendered as an interactive CareerTree component (see CareerTree.jsx)

  status: {
    id: 'status',
    title: 'status',
    borderColor: '#F379AC',
    sections: [
      {
        type: 'body',
        content:
          'I prefer systems I can touch. When I am not auditing a funnel or writing a changelog, I am working on the physical infrastructure of my home. This involves carpentry, electrical work, or building complex LEGO sets.',
      },
      {
        type: 'image',
        src: '/dogs.png',
        label: 'Dogs',
      },
      {
        type: 'footer',
        content:
          'I live with two Indian Pariah dogs who keep me grounded (and guarded) in the physical world. I also train in calisthenics, focusing on the iterative process of getting stronger.',
      },
    ],
  },
};
