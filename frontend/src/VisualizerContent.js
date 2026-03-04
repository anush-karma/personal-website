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

  log: {
    id: 'log',
    title: 'log',
    borderColor: '#FFD632',
    sections: [
      {
        type: 'company',
        content: 'SigNoz [v1.8]',
      },
      {
        type: 'subtitle',
        content:
          'First marketing hire and sole marketer for an OTel-native observability platform.',
      },
      {
        type: 'image',
        src: '/olly.png',
        label: 'Olly',
      },
      {
        type: 'bullets',
        items: [
          'Conceived and launched Olly, the Arctic Bear mascot, at KubeCon North America to humanize the infrastructure stack.',
          'Built the GTM engine for the Datadog Migration Tool, including technical landing pages and personal outreach for 500+ customers.',
          'Founded the Community Advocate Program and managed the merch fulfillment logic from scratch.',
          'Engineered a 2x conversion lift on core feature pages through messaging audits and Clarity tracking.',
          'Designed and managed the hiring process for the marketing team, including DevRel and Brand/Community roles.',
          'Handled international logistics and shipping crises for KubeCon and SRECon.',
        ],
      },
      {
        type: 'past',
        content:
          'Past: ThriveStack [v1.5] (Scaled DR 23 to 56 in 8 days); LeMiRide [v1.0] (Founder/Product, navigated to acquisition).',
      },
    ],
  },

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
