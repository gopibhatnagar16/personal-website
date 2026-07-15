/* ------------------------------------------------------------------ *
 *  CASE STUDIES  —  edit copy freely. Each entry renders a page via
 *  src/components/CaseStudy.jsx at /work/:slug or /writing/:slug.
 *  `sections[].img: true` drops a placeholder image block under a section.
 * ------------------------------------------------------------------ */
export const caseStudies = {
  "subscriptions": {
    kind: "Work",
    password: "loremipsum",
    title: "Subscriptions",
    tagline:
      "A mandatory ₹399/month plan for low-GMV, unregistered merchants — designed so the trade-off reads as honest, not punitive.",
    meta: { Role: "Product Design", Year: "2026", Team: "Razorpay · PG Growth" },
    sections: [
      {
        h: "Overview",
        p: [
          "Razorpay rolled out a flat monthly subscription for a specific cohort of low-GMV merchants. I owned the dashboard surfaces and the communication strategy that introduced the change across the product.",
          "The real problem was trust. A new mandatory fee can feel like something being taken away, so every surface had to earn the change by explaining the 'why' plainly — and only ever make claims that actually held up.",
        ],
        img: true,
      },
      {
        h: "Approach",
        p: [
          "Cohort-based messaging, so each merchant saw language that matched their situation instead of a one-size-fits-all announcement.",
          "A consistent honesty guardrail: savings language appeared only where the math genuinely worked out for that merchant.",
          "A multi-surface system — WhatsApp, email, an in-product navbar chip, settlement notes, and a homepage banner — each doing one job at the right moment in the journey.",
        ],
      },
      {
        h: "Outcome",
        p: [
          "[Add the headline result here once the numbers are in — e.g. adoption within the cohort, churn, or the change in support tickets after launch.]",
        ],
        img: true,
      },
    ],
  },

  "growth-experiments": {
    kind: "Work",
    password: "loremipsum",
    title: "Growth experiments",
    tagline:
      "Small, fast bets on Razorpay's merchant growth surface — shipping to learn, not to be right.",
    meta: { Role: "Product Design", Year: "2025", Team: "Razorpay · PG Growth" },
    sections: [
      {
        h: "Overview",
        p: [
          "A running series of experiments across the growth surface — activation nudges, personalised CTAs, and homepage moments — aimed at moving merchants further down the funnel.",
          "Each bet was scoped small enough to ship quickly and measure cleanly, so we could compound learnings instead of debating them.",
        ],
        img: true,
      },
      {
        h: "How I worked",
        p: [
          "Prototyped in code as much as in Figma, so the interaction and the copy could be judged in something real before we committed engineering time.",
          "Built multi-state prototypes (for example, CTAs adapting across authentication states and cohorts) to pressure-test the edges before a single line shipped.",
        ],
      },
      {
        h: "What I took away",
        p: [
          "[Summarise the experiments that won and why, plus the pattern you'd reuse. Keep the honest ones that lost — they read as credible.]",
        ],
      },
    ],
  },

  "step-group": {
    kind: "Work",
    title: "Step Group",
    tagline:
      "A component-driven build on Razorpay's Blade design system — design and front-end, kept in lockstep.",
    meta: { Role: "Design × Front-end", Year: "2024", Team: "Razorpay" },
    sections: [
      {
        h: "Overview",
        p: [
          "A case study in building with Blade, Razorpay's design system — treating tokens and components as the source of truth rather than redrawing everything from scratch.",
          "The deliverable itself was interactive: a self-contained page with a sticky scroll-spy legend, so the story and the system were demonstrated in the same artifact.",
        ],
        img: true,
      },
      {
        h: "Approach",
        p: [
          "Mapped the surface to existing Blade components first, and only designed net-new where the system genuinely had a gap.",
          "Wrote the front-end alongside the design so spacing, motion, and states were decided in the browser — where they actually live.",
        ],
      },
      {
        h: "Outcome",
        p: [
          "[Add the impact — consistency gains, faster handoff, or reuse across teams — with a concrete example.]",
        ],
      },
    ],
  },

  "framer": {
    kind: "Writing",
    title: "Scaling Razorpay's growth surface on Framer",
    tagline:
      "Turning one-off marketing pages into a componentised, editable system in Framer.",
    meta: { Role: "Design Engineering", Year: "2025", Team: "Razorpay · PG Growth" },
    sections: [
      {
        h: "Overview",
        p: [
          "The growth surface had grown into a pile of bespoke pages that were slow to change and easy to break. The goal was to make it a system: reusable components, editable content, and a predictable path from idea to live page.",
        ],
        img: true,
      },
      {
        h: "Approach",
        p: [
          "Broke recurring layouts into a small set of Framer components with clear props, so new pages became composition rather than construction.",
          "Set up content and hand-off so non-designers could ship copy changes safely, without touching structure.",
        ],
      },
      {
        h: "Takeaways",
        p: [
          "[Add the before/after — how much faster pages ship now, and what you'd do differently at the next scale.]",
        ],
      },
    ],
  },
};
