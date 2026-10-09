export interface CssTopicItem {
  id: string;
  title: string;
  category: 'Selectors' | 'Box Model' | 'Flexbox' | 'CSS Grid' | 'Positioning' | 'Typography' | 'Colors & Effects' | 'Animations' | 'Modern CSS';
  summary: string;
  syntax: string;
  codeSnippet: string;
  explanation: string;
  proTip: string;
  interactiveAvailable?: boolean;
}

export const CSS_CATEGORIES = [
  'All',
  'Selectors',
  'Box Model',
  'Flexbox',
  'CSS Grid',
  'Positioning',
  'Typography',
  'Colors & Effects',
  'Animations',
  'Modern CSS',
] as const;

export const CSS_TOPICS: CssTopicItem[] = [
  // Selectors
  {
    id: 'css-selectors-basic',
    title: 'CSS Selectors & Combinators',
    category: 'Selectors',
    summary: 'Target HTML elements with precision using type, class, ID, child (>), descendant (space), adjacent sibling (+), and general sibling (~) selectors.',
    syntax: 'element | .class | #id | parent > child | prev + next',
    codeSnippet: `/* Type, Class, and ID Selectors */
p { color: #94a3b8; }
.card { border-radius: 8px; }
#navbar { position: sticky; top: 0; }

/* Direct Child Selector (only immediate children) */
ul > li { list-style: none; }

/* Descendant Selector (any nested level) */
article p { line-height: 1.7; }

/* Adjacent Sibling (immediately follows) */
h2 + p { margin-top: 0.5rem; }

/* Attribute Selector */
input[type="email"] { border-color: #6366f1; }
a[href^="https"] { color: #38bdf8; }`,
    explanation: 'CSS specificity hierarchy determines precedence: Inline styles (1000) > IDs (100) > Classes/Attributes/Pseudo-classes (10) > Elements/Pseudo-elements (1). Universal selector (*) has 0 specificity.',
    proTip: 'Prefer class selectors over IDs for styling to avoid specificity wars. Reserve IDs for anchor links and form labels.'
  },
  {
    id: 'css-pseudo-classes',
    title: 'Modern Pseudo-Classes (:has, :is, :where, :focus-visible)',
    category: 'Selectors',
    summary: 'State and relational selectors. Includes cutting-edge CSS features like :has() (the parent selector) and :focus-visible for accessibility.',
    syntax: ':hover | :focus-visible | :has(...) | :is(...) | :where(...)',
    codeSnippet: `/* Interactive states */
button:hover { background-color: #4338ca; }
button:active { transform: scale(0.98); }
button:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

/* :has() - The Parent Selector (Huge milestone in CSS) */
/* Style card if it contains an image */
.card:has(img) {
  padding-top: 0;
}
/* Style form group when input is invalid */
.form-field:has(input:invalid) {
  border-color: #ef4444;
}

/* :is() vs :where() (where resets specificity to 0) */
:is(h1, h2, h3) { font-family: 'Plus Jakarta Sans', sans-serif; }
:where(header, footer) a { color: inherit; }`,
    explanation: ':has() allows styling a parent or previous sibling based on descendant conditions without JavaScript! :where() carries zero specificity weight, perfect for default CSS resets.',
    proTip: 'Always style :focus-visible instead of completely removing :focus outline, ensuring keyboard navigation accessibility while keeping mouse clicks clean.'
  },

  // Box Model
  {
    id: 'css-box-model',
    title: 'Box Model & box-sizing: border-box',
    category: 'Box Model',
    summary: 'Every HTML element is a rectangular box comprising content, padding, border, and margin. Learn how border-box prevents calculation bugs.',
    syntax: 'box-sizing: border-box | content-box;\nmargin | border | padding | width | height;',
    codeSnippet: `/* Universal Reset (Essential in modern web development) */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.box {
  width: 300px;
  padding: 24px;
  border: 2px solid #334155;
  margin: 16px auto;
  /* With border-box, total rendered width remains exactly 300px! */
  /* With content-box, width would become 300 + 48 + 4 = 352px */
}`,
    explanation: 'Under content-box (the legacy default), padding and borders increase total element width, causing layout breakage. With box-sizing: border-box, padding and borders are absorbed inside the defined width/height.',
    proTip: 'Apply box-sizing: border-box globally on *, *::before, *::after in your base stylesheet.'
  },

  // Flexbox
  {
    id: 'css-flexbox-guide',
    title: 'Flexbox Deep-Dive (1-Dimensional Layouts)',
    category: 'Flexbox',
    summary: 'Master flex-direction, justify-content, align-items, flex-wrap, and the flex item sizing trinity (flex-grow, flex-shrink, flex-basis).',
    syntax: 'display: flex;\nflex-direction | justify-content | align-items | gap;',
    codeSnippet: `/* Flex Container Properties */
.container {
  display: flex;
  flex-direction: row;       /* row | row-reverse | column | column-reverse */
  justify-content: space-between; /* flex-start | center | flex-end | space-between | space-around */
  align-items: center;       /* stretch | flex-start | center | flex-end | baseline */
  flex-wrap: wrap;           /* nowrap | wrap | wrap-reverse */
  gap: 1.5rem;               /* spacing between items */
}

/* Flex Item Properties */
.item-fluid {
  flex-grow: 1;              /* absorbs remaining available space */
  flex-shrink: 1;            /* shrinks when space is constricted */
  flex-basis: 0%;            /* initial size before distribute */
  /* Shorthand: flex: 1 1 0%; or flex: 1; */
}

.item-fixed {
  flex: 0 0 280px;           /* fixed 280px sidebar, won't grow or shrink */
}`,
    explanation: 'Flexbox arranges elements along a main axis (defined by flex-direction) and a cross axis (perpendicular). justify-content aligns on the main axis; align-items aligns on the cross axis.',
    proTip: 'Use gap instead of margin on flex items to avoid unwanted margins on outer boundaries.',
    interactiveAvailable: true
  },

  // CSS Grid
  {
    id: 'css-grid-guide',
    title: 'CSS Grid Deep-Dive (2-Dimensional Layouts)',
    category: 'CSS Grid',
    summary: 'Create robust two-dimensional layouts using grid-template-columns, fr units, repeat(), minmax(), auto-fit, and grid-area.',
    syntax: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\ngap: 1.5rem;',
    codeSnippet: `/* Ultra-popular responsive auto-fitting grid (No media queries needed!) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Explicit Named Grid Areas Layout */
.dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr 60px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`,
    explanation: 'CSS Grid excels at synchronized columns and rows simultaneously. The minmax(280px, 1fr) auto-fit pattern is the gold standard for responsive card layouts across mobile and desktop.',
    proTip: 'auto-fill creates empty columns if space allows; auto-fit stretches existing items to fill the container row width.',
    interactiveAvailable: true
  },

  // Positioning
  {
    id: 'css-positioning',
    title: 'CSS Positioning & Stacking Context (z-index)',
    category: 'Positioning',
    summary: 'Understand the fundamental differences between static, relative, absolute, fixed, and sticky positioning, and how stacking contexts work.',
    syntax: 'position: static | relative | absolute | fixed | sticky;\ntop | right | bottom | left | z-index;',
    codeSnippet: `/* Relative: Stays in normal flow; reference point for absolute children */
.card {
  position: relative;
}

/* Absolute: Removed from flow; positioned relative to nearest positioned ancestor */
.badge {
  position: absolute;
  top: 12px;
  right: 12px;
}

/* Fixed: Positioned relative to viewport; stays when user scrolls */
.modal-overlay {
  position: fixed;
  inset: 0; /* shorthand for top:0; right:0; bottom:0; left:0; */
  background: rgba(0, 0, 0, 0.7);
}

/* Sticky: Relative until scroll offset threshold is met, then acts fixed */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
}`,
    explanation: 'A new stacking context is created by opacity < 1, transform != none, filter != none, or position with z-index. An element with z-index: 9999 cannot escape a parent with lower stacking context.',
    proTip: 'Use inset: 0 instead of writing top: 0; right: 0; bottom: 0; left: 0 separately.'
  },

  // Typography
  {
    id: 'css-typography',
    title: 'Modern Typography & Fluid Scaling with clamp()',
    category: 'Typography',
    summary: 'Fluid typography that scales smoothly between mobile and desktop without rigid breakpoints, plus text-wrap: balance.',
    syntax: 'font-size: clamp(min, preferred, max);\ntext-wrap: balance | pretty;',
    codeSnippet: `/* Fluid Typography using CSS clamp() */
h1 {
  /* Minimum: 2rem (32px), Ideal: 4vw, Maximum: 3.75rem (60px) */
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.75rem);
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 700;
  /* Eliminates single-word orphan lines in headlines! */
  text-wrap: balance;
}

p {
  font-size: 1rem;
  line-height: 1.65;
  color: #cbd5e1;
  max-width: 68ch; /* 68 characters per line for optimal reading comfort */
  text-wrap: pretty;
}`,
    explanation: 'clamp(MIN, SCALING_FORMULA, MAX) recalculates smoothly on window resize without jumpy media query shifts. max-width: 65ch keeps line length within human cognitive comfort zones (45-75 characters).',
    proTip: 'Always pair font-size adjustments with appropriate line-height (tighter 1.1-1.25 for large titles, looser 1.5-1.7 for body prose).'
  },

  // Colors & Effects
  {
    id: 'css-colors-effects',
    title: 'Modern Colors (OKLCH), Gradients, and Glassmorphism',
    category: 'Colors & Effects',
    summary: 'Perceptually uniform colors with OKLCH, smooth multi-stop gradients, box-shadow depth, and backdrop-filter glass effects.',
    syntax: 'color: oklch(L C H [/ A]);\nbackdrop-filter: blur(12px);\nbox-shadow: ...;',
    codeSnippet: `/* Modern OKLCH color space (perceptually uniform lightness) */
:root {
  --brand-primary: oklch(0.62 0.22 264);
  --brand-accent: oklch(0.75 0.18 160);
  --surface-panel: rgba(15, 23, 42, 0.75);
}

/* Frosted Glass Effect (Glassmorphism) */
.glass-header {
  background-color: var(--surface-panel);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* Layered soft shadow for natural depth */
.elevated-card {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 10px 15px -3px rgba(0, 0, 0, 0.2);
}`,
    explanation: 'OKLCH fixes the perceptual flaws of HSL where yellow at 50% lightness looks blindingly bright while blue at 50% lightness looks dark. In OKLCH, 50% lightness is physically perceived as identical brightness across all hues.',
    proTip: 'Always provide a fallback background color with transparency when using backdrop-filter in case blur is not supported.'
  },

  // Animations & Transitions
  {
    id: 'css-animations',
    title: 'CSS Transitions, Transforms & @keyframes Animations',
    category: 'Animations',
    summary: 'GPU-accelerated hardware animations using transform and opacity for buttery 60fps / 120fps UI performance.',
    syntax: 'transition: transform 200ms cubic-bezier(...);\n@keyframes name { from {} to {} }',
    codeSnippet: `/* High-performance button hover */
.interactive-btn {
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
              background-color 180ms ease;
  will-change: transform;
}

.interactive-btn:hover {
  transform: translateY(-2px);
}

.interactive-btn:active {
  transform: translateY(0);
}

/* @keyframes Infinite Pulse Ring */
@keyframes ripple {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.pulse-circle {
  animation: ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}`,
    explanation: 'Never animate layout properties like width, height, top, left, or margin—they trigger costly CPU layout recalculation (reflow). Only animate transform and opacity, which run directly on the GPU compositor thread.',
    proTip: 'Respect user motion sensitivity preferences with @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }.'
  },

  // Modern CSS
  {
    id: 'css-modern-features',
    title: 'CSS Custom Properties, @container Queries & CSS Nesting',
    category: 'Modern CSS',
    summary: 'Next-generation CSS capabilities: Container queries that respond to parent container width, native CSS nesting, and CSS variables.',
    syntax: 'container-type: inline-size;\n@container (min-width: 400px) { ... }\n--var-name: value;',
    codeSnippet: `/* CSS Variables (Custom Properties) */
:root {
  --radius-lg: 12px;
  --spacing-unit: 8px;
}

/* Native CSS Nesting (Baseline in all modern browsers) */
.card {
  padding: calc(var(--spacing-unit) * 3);
  border-radius: var(--radius-lg);

  & .card-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  &:hover {
    border-color: #6366f1;
  }
}

/* @container Queries: Responsive based on PARENT size, not screen! */
.card-wrapper {
  container-type: inline-size;
  container-name: card-container;
}

@container card-container (min-width: 450px) {
  .card {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }
}`,
    explanation: 'Container queries solve the fundamental limitation of media queries: A card component can now automatically switch between horizontal and vertical layouts whether it is placed in a narrow sidebar or a wide main column!',
    proTip: 'Container queries make design systems truly modular and portable across any layout position.'
  }
];
