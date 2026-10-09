export interface HtmlTagItem {
  tag: string;
  category: 'Structure' | 'Text & Headings' | 'Forms & Inputs' | 'Media & Embeds' | 'Tables' | 'Semantics' | 'Interactive' | 'Metadata' | 'Obsolete';
  description: string;
  selfClosing?: boolean;
  commonAttributes: string[];
  syntax: string;
  example: string;
  previewHtml: string;
  bestPractices: string;
  accessibilityNotes?: string;
}

export const HTML_CATEGORIES = [
  'All',
  'Structure',
  'Text & Headings',
  'Forms & Inputs',
  'Media & Embeds',
  'Tables',
  'Semantics',
  'Interactive',
  'Metadata',
  'Obsolete',
] as const;

export const HTML_TAGS: HtmlTagItem[] = [
  // Document Structure & Root
  {
    tag: '<!DOCTYPE html>',
    category: 'Structure',
    description: 'Document Type Declaration. Tells browser engine to parse document in HTML5 standard standards-compliant mode rather than quirks mode.',
    selfClosing: true,
    commonAttributes: ['None'],
    syntax: '<!DOCTYPE html>',
    example: '<!DOCTYPE html>\n<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>',
    previewHtml: '<div style="font-family:sans-serif;color:#94a3b8;font-size:13px;">Specifies standard HTML5 rendering engine mode. Must be the very first line of any HTML file.</div>',
    bestPractices: 'Must be on line 1 without leading whitespace. Not case-sensitive, but uppercase is conventional standard.'
  },
  {
    tag: '<html>',
    category: 'Structure',
    description: 'The root element representing the top-level container of an HTML document. All other elements must be descendants of this element.',
    commonAttributes: ['lang', 'dir'],
    syntax: '<html lang="en">...</html>',
    example: '<html lang="en" dir="ltr">\n  <head>\n    <title>Web Guide</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>',
    previewHtml: '<div style="padding:10px;border:1px dashed #6366f1;border-radius:6px;font-size:13px;color:#c7d2fe;">&lt;html lang="en"&gt; wraps all head and body content</div>',
    bestPractices: 'Always include the lang attribute (e.g., lang="en") for screen readers, accessibility, and search engine localization.',
    accessibilityNotes: 'Screen readers rely on lang to pronounce words with the correct dialect, inflection, and accent rules.'
  },
  {
    tag: '<head>',
    category: 'Metadata',
    description: 'Container for metadata (document title, character set, stylesheets, scripts, viewport settings) not directly rendered as page body content.',
    commonAttributes: ['None'],
    syntax: '<head>...</head>',
    example: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Mastering HTML5</title>\n  <link rel="stylesheet" href="style.css">\n</head>',
    previewHtml: '<div style="font-size:13px;color:#94a3b8;">Contains machine-readable metadata, scripts, styles, and viewport configurations.</div>',
    bestPractices: 'Place charset and viewport meta tags immediately after opening head tag to optimize browser parse speed.'
  },
  {
    tag: '<title>',
    category: 'Metadata',
    description: 'Sets the document title displayed in the browser tab, bookmarks bar, and search engine results pages (SERPs).',
    commonAttributes: ['None'],
    syntax: '<title>Page Title</title>',
    example: '<title>Modern Full-Stack Web Development Guide 2026</title>',
    previewHtml: '<div style="background:#1e293b;padding:8px 12px;border-radius:6px;font-size:12px;color:#38bdf8;border:1px solid #334155;">Tab Preview: <strong>Modern Full-Stack Web Development Guide 2026</strong></div>',
    bestPractices: 'Keep under 60 characters to avoid truncation in Google search results. Make it descriptive and unique per page.'
  },
  {
    tag: '<meta>',
    category: 'Metadata',
    description: 'Defines document metadata like character encoding, author, description, Open Graph tags for social preview, and mobile viewport.',
    selfClosing: true,
    commonAttributes: ['charset', 'name', 'content', 'http-equiv', 'property'],
    syntax: '<meta name="description" content="...">',
    example: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Learn web development">\n<meta property="og:title" content="Web Dev Mastery">',
    previewHtml: '<div style="font-size:12px;color:#cbd5e1;line-height:1.6;">&lt;meta charset="UTF-8"&gt;<br>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</div>',
    bestPractices: 'Crucial for mobile responsiveness. Always specify width=device-width, initial-scale=1.0.'
  },
  {
    tag: '<link>',
    category: 'Metadata',
    description: 'Establishes relationships between current document and external resources such as CSS stylesheets, favicons, preconnect fonts, and canonical URLs.',
    selfClosing: true,
    commonAttributes: ['rel', 'href', 'type', 'media', 'as', 'crossorigin'],
    syntax: '<link rel="stylesheet" href="styles.css">',
    example: '<link rel="stylesheet" href="/src/index.css">\n<link rel="icon" type="image/svg+xml" href="/vite.svg">\n<link rel="preconnect" href="https://fonts.googleapis.com">',
    previewHtml: '<div style="font-size:12px;color:#94a3b8;">Links external CSS, web fonts, favicons, and prefetch hints into the browser.</div>',
    bestPractices: 'Use rel="preload" or rel="preconnect" for performance-critical fonts and high-priority assets.'
  },
  {
    tag: '<style>',
    category: 'Metadata',
    description: 'Encloses embedded CSS rules directly within the HTML document.',
    commonAttributes: ['media'],
    syntax: '<style>/* CSS rules */</style>',
    example: '<style>\n  .card {\n    background: #0f172a;\n    padding: 1.5rem;\n    border-radius: 8px;\n  }\n</style>',
    previewHtml: '<div style="background:#0f172a;padding:12px;border-radius:6px;border:1px solid #334155;color:#f8fafc;font-size:13px;">Rendered styled element using embedded CSS rules.</div>',
    bestPractices: 'Prefer external stylesheets for cacheability and code reuse, but use embedded style tags for critical above-the-fold CSS.'
  },
  {
    tag: '<script>',
    category: 'Metadata',
    description: 'Embeds or imports executable JavaScript code. Supports modern ES modules and async/defer execution strategies.',
    commonAttributes: ['src', 'type', 'async', 'defer', 'nomodule', 'crossorigin'],
    syntax: '<script type="module" src="app.js"></script>',
    example: '<script type="module" src="/src/main.tsx"></script>\n<script defer src="/analytics.js"></script>',
    previewHtml: '<div style="font-size:12px;color:#94a3b8;">Executes client-side JavaScript. Modern code uses type="module" for ES module imports.</div>',
    bestPractices: 'Use defer for traditional scripts to avoid blocking DOM rendering, or type="module" which defers automatically.'
  },
  {
    tag: '<body>',
    category: 'Structure',
    description: 'The main container enclosing all renderable, interactive content of the webpage visible to human users and screen readers.',
    commonAttributes: ['class', 'id'],
    syntax: '<body>...</body>',
    example: '<body class="bg-slate-950 text-slate-100">\n  <header>...</header>\n  <main>...</main>\n  <footer>...</footer>\n</body>',
    previewHtml: '<div style="padding:12px;background:#090d16;border:1px solid #1e293b;border-radius:6px;font-size:13px;color:#cbd5e1;">Contains all headers, navigations, main content, and footers.</div>',
    bestPractices: 'There must only be one body tag per document. Keep presentation styling inside CSS classes rather than inline body attributes.'
  },

  // Semantics & Sectioning
  {
    tag: '<header>',
    category: 'Semantics',
    description: 'Represents introductory content or a set of navigational links for its enclosing section or the entire page.',
    commonAttributes: ['class', 'id', 'role'],
    syntax: '<header>...</header>',
    example: '<header class="site-header">\n  <a href="/" class="logo">Brand</a>\n  <nav>\n    <a href="/docs">Docs</a>\n    <a href="/pricing">Pricing</a>\n  </nav>\n</header>',
    previewHtml: '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#1e293b;border-radius:6px;font-size:13px;color:#e2e8f0;"><strong>Brand Wordmark</strong><div style="display:flex;gap:12px;font-size:12px;color:#94a3b8;"><span>Docs</span><span>Tutorials</span><span>API</span></div></div>',
    bestPractices: 'A page can have multiple header elements (one for the page, and one inside an article or section).'
  },
  {
    tag: '<nav>',
    category: 'Semantics',
    description: 'Defines a landmark section of navigation links intended for primary site navigation or page table of contents.',
    commonAttributes: ['aria-label'],
    syntax: '<nav aria-label="Main Navigation">...</nav>',
    example: '<nav aria-label="Primary Navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/guides">Guides</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>',
    previewHtml: '<div style="display:flex;gap:16px;font-size:13px;color:#818cf8;border-bottom:1px solid #334155;padding-bottom:8px;"><span style="text-decoration:underline;">Home</span><span>Components</span><span>Reference</span></div>',
    bestPractices: 'Reserve for major navigation blocks. If multiple nav elements exist, provide distinct aria-label attributes for accessibility.',
    accessibilityNotes: 'Screen readers provide shortcut commands to jump directly to nav landmarks.'
  },
  {
    tag: '<main>',
    category: 'Semantics',
    description: 'Specifies the dominant, central content unique to this specific document, excluding global headers, footers, and sidebars.',
    commonAttributes: ['id', 'class'],
    syntax: '<main>...</main>',
    example: '<main id="content">\n  <h1>Modern JavaScript Foundations</h1>\n  <p>JavaScript is a versatile multi-paradigm language...</p>\n</main>',
    previewHtml: '<div style="padding:12px;background:#0f172a;border:1px solid #334155;border-radius:6px;"><div style="font-size:14px;font-weight:600;color:#f1f5f9;margin-bottom:4px;">Main Page Content Area</div><div style="font-size:12px;color:#94a3b8;">Unique content for the current route goes here.</div></div>',
    bestPractices: 'Only one visible main element per document. Never nest inside header, footer, or nav elements.'
  },
  {
    tag: '<article>',
    category: 'Semantics',
    description: 'Self-contained composition in a document intended to be independently distributable or reusable (e.g., blog post, news story, forum post).',
    commonAttributes: ['class', 'id'],
    syntax: '<article>...</article>',
    example: '<article>\n  <h2>Understanding Closures in JavaScript</h2>\n  <p class="meta">Published Oct 2026 · 5 min read</p>\n  <p>A closure gives a function access to its outer scope...</p>\n</article>',
    previewHtml: '<div style="padding:14px;border:1px solid #334155;border-radius:6px;background:#1e293b;"><div style="font-size:14px;font-weight:600;color:#f8fafc;">Understanding Closures</div><div style="font-size:11px;color:#94a3b8;margin:4px 0 8px;">Published Oct 2026 · 5 min read</div><div style="font-size:12px;color:#cbd5e1;">A closure preserves outer lexical environment references...</div></div>',
    bestPractices: 'Should generally contain its own heading (h1-h6) and make sense independently if syndicated in an RSS feed.'
  },
  {
    tag: '<section>',
    category: 'Semantics',
    description: 'Represents a standalone generic section of a document without a more specific semantic element, typically with a heading.',
    commonAttributes: ['class', 'id', 'aria-labelledby'],
    syntax: '<section>...</section>',
    example: '<section id="features">\n  <h2>Core Features</h2>\n  <p>Explore built-in developer tools and reactive hooks.</p>\n</section>',
    previewHtml: '<div style="padding:12px;border-left:2px solid #6366f1;background:#111827;border-radius:0 6px 6px 0;"><div style="font-size:13px;font-weight:600;color:#e0e7ff;">Section: Core Features</div><div style="font-size:12px;color:#94a3b8;margin-top:2px;">Thematic grouping of related content.</div></div>',
    bestPractices: 'Do not use as a purely visual wrapper (use div for that). Sections should almost always have a heading child.'
  },
  {
    tag: '<aside>',
    category: 'Semantics',
    description: 'Represents a portion of a document whose content is only tangentially related to the content around it (e.g., sidebars, callouts, related links).',
    commonAttributes: ['class', 'id'],
    syntax: '<aside>...</aside>',
    example: '<aside class="related-topics">\n  <h3>Related Articles</h3>\n  <ul>\n    <li><a href="#">Event Loop Explained</a></li>\n    <li><a href="#">Promises Deep Dive</a></li>\n  </ul>\n</aside>',
    previewHtml: '<div style="padding:10px 12px;background:#1e1b4b;border:1px solid #4338ca;border-radius:6px;"><div style="font-size:12px;font-weight:600;color:#c7d2fe;">Pro-Tip Sidebar / Aside</div><div style="font-size:11px;color:#a5b4fc;margin-top:2px;">Tangentially related contextual notes and resources.</div></div>',
    bestPractices: 'Screen readers treat aside as a landmark role (complementary). Great for glossaries, author bios, or related posts.'
  },
  {
    tag: '<footer>',
    category: 'Semantics',
    description: 'Represents a footer for its nearest sectioning content or page root, typically containing copyright, legal links, or author metadata.',
    commonAttributes: ['class', 'id'],
    syntax: '<footer>...</footer>',
    example: '<footer>\n  <p>&copy; 2026 FullStack Craft. Open educational guide.</p>\n  <nav>\n    <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>\n  </nav>\n</footer>',
    previewHtml: '<div style="border-top:1px solid #334155;padding-top:8px;font-size:11px;color:#64748b;display:flex;justify-content:space-between;"><span>© 2026 FullStack Craft</span><span>Privacy · Terms · GitHub</span></div>',
    bestPractices: 'Can appear at the bottom of the page or at the end of an article for author bylines and references.'
  },

  // Text Content & Headings
  {
    tag: '<h1> to <h6>',
    category: 'Text & Headings',
    description: 'Six levels of section headings. h1 is the highest level of structural importance and h6 is the lowest.',
    commonAttributes: ['class', 'id'],
    syntax: '<h1>Main Title</h1>\n<h2>Subheading</h2>',
    example: '<h1>Full-Stack Web Development</h1>\n<h2>1. Frontend Foundations</h2>\n<h3>1.1 HTML Semantics</h3>',
    previewHtml: '<div style="display:flex;flex-direction:column;gap:4px;"><span style="font-size:16px;font-weight:700;color:#f8fafc;">h1 Heading (24px - 36px)</span><span style="font-size:14px;font-weight:600;color:#e2e8f0;">h2 Heading (18px - 24px)</span><span style="font-size:12px;font-weight:600;color:#94a3b8;">h3 Heading (14px - 16px)</span></div>',
    bestPractices: 'Never skip heading levels (e.g. h1 directly to h3). Have exactly one h1 per page for optimal SEO and screen-reader hierarchy.'
  },
  {
    tag: '<p>',
    category: 'Text & Headings',
    description: 'Represents a paragraph of text. Browsers automatically add vertical margin before and after by default.',
    commonAttributes: ['class'],
    syntax: '<p>Paragraph text content...</p>',
    example: '<p>\n  HTML stands for HyperText Markup Language. It provides the skeletal structure of every web page on the internet.\n</p>',
    previewHtml: '<p style="margin:0;font-size:13px;line-height:1.5;color:#cbd5e1;">HTML stands for HyperText Markup Language. It provides the skeletal structure of every web page on the internet.</p>',
    bestPractices: 'Avoid using empty p tags for spacing; use CSS margins or flexbox gap instead.'
  },
  {
    tag: '<a>',
    category: 'Text & Headings',
    description: 'The anchor element creates hyperlinks to other web pages, files, email addresses, phone numbers, or page anchors.',
    commonAttributes: ['href', 'target', 'rel', 'download'],
    syntax: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>',
    example: '<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">\n  MDN Web Docs\n</a>\n<a href="mailto:support@example.com">Email Us</a>',
    previewHtml: '<a href="#" style="color:#60a5fa;text-decoration:underline;font-size:13px;cursor:pointer;">Explore Documentation (Anchor Link)</a>',
    bestPractices: 'When using target="_blank", always add rel="noopener noreferrer" to prevent security tab-nabbing vulnerabilities and memory leaks.',
    accessibilityNotes: 'Link text should describe the destination clearly. Avoid generic text like "click here" or "read more".'
  },
  {
    tag: '<ul> / <ol> / <li>',
    category: 'Text & Headings',
    description: 'Unordered lists (bullet points) and Ordered lists (numbered sequences), containing one or more list item (li) elements.',
    commonAttributes: ['type', 'start', 'reversed'],
    syntax: '<ul>\n  <li>Item 1</li>\n</ul>\n<ol start="1">\n  <li>Step 1</li>\n</ol>',
    example: '<ul>\n  <li>HTML5 Semantics</li>\n  <li>Modern CSS Flexbox</li>\n  <li>JavaScript ES6+</li>\n</ul>',
    previewHtml: '<ul style="margin:0;padding-left:18px;font-size:12px;color:#cbd5e1;line-height:1.6;"><li>HTML5 Semantics</li><li>Modern CSS Flexbox</li><li>JavaScript ES6+</li></ul>',
    bestPractices: 'li elements must be direct children of ul, ol, or menu elements.'
  },
  {
    tag: '<blockquote>',
    category: 'Text & Headings',
    description: 'Indicates that the enclosed text is an extended quotation from an external source, with optional cite attribute.',
    commonAttributes: ['cite'],
    syntax: '<blockquote cite="https://source.url">...</blockquote>',
    example: '<blockquote cite="https://en.wikipedia.org/wiki/Tim_Berners-Lee">\n  <p>The Web does not just connect machines, it connects people in their diversity.</p>\n  <footer>— Tim Berners-Lee</footer>\n</blockquote>',
    previewHtml: '<div style="border-left:3px solid #6366f1;padding-left:12px;font-style:italic;font-size:13px;color:#c7d2fe;">"The Web does not just connect machines, it connects people." <span style="font-size:11px;color:#818cf8;display:block;margin-top:4px;">— Tim Berners-Lee</span></div>',
    bestPractices: 'Pair with cite or footer inside the blockquote for the attribution source.'
  },
  {
    tag: '<pre> & <code>',
    category: 'Text & Headings',
    description: 'pre preserves preformatted whitespace and line breaks. code represents a computer code fragment or syntax block.',
    commonAttributes: ['class'],
    syntax: '<pre><code>const answer = 42;</code></pre>',
    example: '<pre><code class="language-js">\nfunction greeting(name) {\n  return `Hello, ${name}!`;\n}\n</code></pre>',
    previewHtml: '<pre style="background:#020617;border:1px solid #1e293b;padding:8px 12px;border-radius:6px;font-size:12px;color:#38bdf8;margin:0;"><code>const user = { name: "Alex", role: "Dev" };</code></pre>',
    bestPractices: 'Wrap code inside pre for multi-line code blocks; use code alone for inline mentions like <code>const</code>.'
  },
  {
    tag: '<strong> & <em>',
    category: 'Text & Headings',
    description: 'strong indicates strong importance, seriousness, or urgency (bold). em indicates stress emphasis that alters sentence meaning (italics).',
    commonAttributes: ['class'],
    syntax: '<strong>Crucial</strong> and <em>emphasized</em>',
    example: '<p>You <strong>must</strong> save your work before <em>exiting</em>.</p>',
    previewHtml: '<div style="font-size:13px;color:#cbd5e1;">You <strong style="color:#f8fafc;font-weight:700;">must</strong> save before <em style="color:#a5b4fc;font-style:italic;">exiting</em>.</div>',
    bestPractices: 'Prefer strong and em over visual b and i because screen readers adjust pitch and voice cadence for semantic importance.'
  },
  {
    tag: '<span> & <div>',
    category: 'Structure',
    description: 'div is generic block-level container; span is generic inline container. Both lack semantic meaning and are used for CSS styling hooks.',
    commonAttributes: ['class', 'id', 'data-*'],
    syntax: '<div class="wrapper"><span class="highlight">Text</span></div>',
    example: '<div class="metric-card">\n  <span class="label">Total Users:</span>\n  <span class="value">42,000</span>\n</div>',
    previewHtml: '<div style="display:inline-block;padding:4px 8px;background:#334155;border-radius:4px;font-size:12px;color:#f8fafc;">div / span generic container</div>',
    bestPractices: 'Use semantic elements (article, section, header, nav) whenever appropriate; only use div/span when no semantic element fits.'
  },

  // Forms & User Inputs
  {
    tag: '<form>',
    category: 'Forms & Inputs',
    description: 'Represents a document section containing interactive controls for submitting data to a web server or client-side handler.',
    commonAttributes: ['action', 'method', 'enctype', 'autocomplete', 'novalidate', 'target'],
    syntax: '<form action="/api/submit" method="POST">...</form>',
    example: '<form id="loginForm" method="POST" action="/api/auth">\n  <label for="email">Email</label>\n  <input id="email" type="email" required>\n  <button type="submit">Sign In</button>\n</form>',
    previewHtml: '<div style="border:1px solid #334155;padding:10px;border-radius:6px;background:#0f172a;font-size:12px;color:#cbd5e1;">&lt;form&gt; wraps interactive inputs and handles submit events</div>',
    bestPractices: 'In modern SPAs (React/Vue), intercept submit with event.preventDefault() to handle data client-side.'
  },
  {
    tag: '<input>',
    category: 'Forms & Inputs',
    description: 'Creates interactive form controls to accept user data. The type attribute fundamentally determines input behavior and validation.',
    selfClosing: true,
    commonAttributes: ['type', 'name', 'value', 'placeholder', 'required', 'disabled', 'pattern', 'min', 'max', 'step', 'checked'],
    syntax: '<input type="text" name="username" placeholder="Enter name">',
    example: '<!-- Text, Password, Email, Number, Checkbox, Date, File -->\n<input type="email" placeholder="you@domain.com" required>\n<input type="password" placeholder="••••••••">\n<input type="checkbox" id="agree">\n<input type="range" min="0" max="100" value="50">',
    previewHtml: '<div style="display:flex;flex-direction:column;gap:6px;"><input type="text" placeholder="Type here..." style="background:#1e293b;border:1px solid #475569;border-radius:4px;padding:4px 8px;color:#f8fafc;font-size:12px;" /><div style="display:flex;gap:12px;align-items:center;"><label style="font-size:12px;color:#cbd5e1;"><input type="checkbox" checked style="margin-right:4px;" /> Checkbox</label><input type="range" style="accent-color:#6366f1;width:80px;" /></div></div>',
    bestPractices: 'Always pair every input with a label element (matching for and id) to guarantee accessibility and click target enlargement.',
    accessibilityNotes: 'Failing to link inputs with labels prevents screen reader users from understanding what information is requested.'
  },
  {
    tag: '<label>',
    category: 'Forms & Inputs',
    description: 'Represents a caption for an item in a user interface. Clicking the label focuses or toggles the associated input element.',
    commonAttributes: ['for'],
    syntax: '<label for="inputId">Username</label>',
    example: '<label for="user-age">Age in years:</label>\n<input type="number" id="user-age" min="18">',
    previewHtml: '<label style="font-size:12px;color:#c7d2fe;display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" style="accent-color:#6366f1;" /> Clickable Label (toggles checkbox)</label>',
    bestPractices: 'Always use for="id" or wrap the input directly inside the label tag.'
  },
  {
    tag: '<button>',
    category: 'Forms & Inputs',
    description: 'An interactive clickable element used to trigger actions or submit forms. Has built-in keyboard accessibility (Enter/Space) and focusability.',
    commonAttributes: ['type', 'disabled', 'name', 'value', 'form'],
    syntax: '<button type="button">Click</button>',
    example: '<button type="submit" class="btn-primary">Submit Form</button>\n<button type="button" onclick="openModal()">Open Dialog</button>\n<button type="reset">Clear</button>',
    previewHtml: '<div style="display:flex;gap:8px;"><button style="background:#4f46e5;color:white;border:none;padding:5px 12px;border-radius:4px;font-size:12px;cursor:pointer;">Primary</button><button style="background:#1e293b;border:1px solid #475569;color:#e2e8f0;padding:5px 12px;border-radius:4px;font-size:12px;cursor:pointer;">Secondary</button></div>',
    bestPractices: 'Always explicitly specify type="button" when a button is NOT meant to submit a form, as default is type="submit" inside a form.'
  },
  {
    tag: '<select> & <option>',
    category: 'Forms & Inputs',
    description: 'Provides a dropdown menu of selectable options. Group options using optgroup.',
    commonAttributes: ['name', 'multiple', 'size', 'required', 'disabled'],
    syntax: '<select name="country">\n  <option value="us">United States</option>\n</select>',
    example: '<select name="framework" id="framework">\n  <option value="">Choose framework...</option>\n  <option value="react">React</option>\n  <option value="vue">Vue</option>\n  <option value="express">Express</option>\n</select>',
    previewHtml: '<select style="background:#1e293b;color:#f8fafc;border:1px solid #475569;border-radius:4px;padding:4px 8px;font-size:12px;"><option>React 19</option><option>Node.js & Express</option><option>TypeScript</option></select>',
    bestPractices: 'Provide an empty first option with value="" as a placeholder hint for required select dropdowns.'
  },
  {
    tag: '<textarea>',
    category: 'Forms & Inputs',
    description: 'Multi-line plain-text editing control for longer text entries like comments, feedback, or markdown content.',
    commonAttributes: ['rows', 'cols', 'placeholder', 'maxlength', 'required', 'readonly'],
    syntax: '<textarea rows="4" placeholder="Enter message..."></textarea>',
    example: '<textarea id="feedback" name="feedback" rows="4" placeholder="Share your feedback..."></textarea>',
    previewHtml: '<textarea rows="2" style="background:#1e293b;color:#f8fafc;border:1px solid #475569;border-radius:4px;padding:6px;font-size:12px;width:100%;box-sizing:border-box;" placeholder="Multi-line input area..."></textarea>',
    bestPractices: 'Use CSS resize property (e.g. resize: vertical) to control user resizing behavior.'
  },
  {
    tag: '<fieldset> & <legend>',
    category: 'Forms & Inputs',
    description: 'fieldset groups related form controls together; legend acts as a caption title for the group.',
    commonAttributes: ['disabled'],
    syntax: '<fieldset>\n  <legend>Shipping Details</legend>\n  ...\n</fieldset>',
    example: '<fieldset>\n  <legend>Notification Preferences</legend>\n  <label><input type="radio" name="notify" value="email"> Email</label>\n  <label><input type="radio" name="notify" value="sms"> SMS</label>\n</fieldset>',
    previewHtml: '<fieldset style="border:1px solid #475569;border-radius:4px;padding:6px 10px;margin:0;"><legend style="font-size:11px;color:#818cf8;padding:0 4px;">Notification Mode</legend><div style="font-size:12px;color:#cbd5e1;display:flex;gap:12px;"><label><input type="radio" name="demo-notif" checked style="accent-color:#6366f1;" /> Email</label><label><input type="radio" name="demo-notif" style="accent-color:#6366f1;" /> SMS</label></div></fieldset>',
    bestPractices: 'Setting disabled on fieldset disables every input control inside it at once without needing individual attributes.'
  },

  // Media & Embeds
  {
    tag: '<img>',
    category: 'Media & Embeds',
    description: 'Embeds an image into the document. Critical attributes include src, alt, and modern loading="lazy" for performance.',
    selfClosing: true,
    commonAttributes: ['src', 'alt', 'width', 'height', 'loading', 'srcset', 'sizes', 'decoding'],
    syntax: '<img src="photo.jpg" alt="Description" loading="lazy">',
    example: '<img\n  src="/logo.svg"\n  alt="FullStack Craft Logo"\n  width="240"\n  height="80"\n  loading="lazy"\n  decoding="async"\n>',
    previewHtml: '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#1e293b;border-radius:6px;border:1px solid #334155;"><div style="width:28px;height:28px;background:#4f46e5;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;color:white;">⚡</div><span style="font-size:12px;color:#e2e8f0;">Image Element Preview (&lt;img&gt;)</span></div>',
    bestPractices: 'Always include width and height to prevent Cumulative Layout Shift (CLS), and alt for accessibility.',
    accessibilityNotes: 'Images with meaningful information need descriptive alt text. Purely decorative images must have alt="" so screen readers ignore them.'
  },
  {
    tag: '<picture> & <source>',
    category: 'Media & Embeds',
    description: 'Encloses multiple source elements and an img to offer alternative image formats (AVIF, WebP, JPG) and responsive resolutions.',
    commonAttributes: ['media', 'srcset', 'type'],
    syntax: '<picture>\n  <source srcset="hero.webp" type="image/webp">\n  <img src="hero.jpg" alt="Hero">\n</picture>',
    example: '<picture>\n  <source media="(min-width: 1024px)" srcset="large.avif" type="image/avif">\n  <source srcset="medium.webp" type="image/webp">\n  <img src="fallback.jpg" alt="Responsive visual representation">\n</picture>',
    previewHtml: '<div style="font-size:12px;color:#94a3b8;border:1px dashed #475569;padding:8px;border-radius:4px;">Serves modern next-gen image formats (AVIF/WebP) with automatic fallback for older browsers.</div>',
    bestPractices: 'Order source tags from most modern format to fallback. An img tag is strictly required as the final child.'
  },
  {
    tag: '<video>',
    category: 'Media & Embeds',
    description: 'Embeds video content with native playback controls, poster thumbnails, subtitles, and autoplay policies.',
    commonAttributes: ['src', 'controls', 'autoplay', 'muted', 'loop', 'poster', 'playsinline', 'preload'],
    syntax: '<video controls poster="thumb.jpg">\n  <source src="clip.mp4" type="video/mp4">\n</video>',
    example: '<video controls playsinline preload="metadata" poster="/thumb.jpg">\n  <source src="/intro.mp4" type="video/mp4">\n  <source src="/intro.webm" type="video/webm">\n  <track kind="captions" src="/captions.vtt" srclang="en" label="English">\n  Your browser does not support HTML5 video.\n</video>',
    previewHtml: '<div style="background:#020617;border:1px solid #1e293b;border-radius:6px;padding:12px;text-align:center;"><div style="font-size:12px;color:#38bdf8;">🎬 HTML5 Native Video Player</div><div style="font-size:11px;color:#64748b;margin-top:2px;">[Play] [00:00 / 02:45] [Mute] [Fullscreen]</div></div>',
    bestPractices: 'For background autoplay video, modern browsers strictly require both autoplay AND muted attributes.'
  },
  {
    tag: '<audio>',
    category: 'Media & Embeds',
    description: 'Embeds sound content such as music, podcasts, or sound effects directly into the web page.',
    commonAttributes: ['src', 'controls', 'autoplay', 'loop', 'muted', 'preload'],
    syntax: '<audio controls src="audio.mp3"></audio>',
    example: '<audio controls preload="none">\n  <source src="/podcast-ep1.mp3" type="audio/mpeg">\n  <source src="/podcast-ep1.ogg" type="audio/ogg">\n</audio>',
    previewHtml: '<div style="background:#1e293b;padding:8px 12px;border-radius:6px;display:flex;align-items:center;gap:8px;font-size:12px;color:#cbd5e1;"><span style="color:#10b981;">▶</span> 0:00 / 3:42 <span style="margin-left:auto;color:#64748b;">🔊 Audio Control</span></div>',
    bestPractices: 'Avoid autoplay audio on page load as it disrupts users and violates UX conventions.'
  },
  {
    tag: '<iframe>',
    category: 'Media & Embeds',
    description: 'Inline Frame: Embeds another separate HTML document or third-party widget (maps, videos, widgets) within current page.',
    commonAttributes: ['src', 'title', 'width', 'height', 'loading', 'sandbox', 'allow', 'referrerpolicy'],
    syntax: '<iframe src="https://example.com" title="Embedded Content" sandbox="..."></iframe>',
    example: '<iframe\n  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"\n  title="YouTube video player"\n  allow="accelerometer; autoplay; encrypted-media; gyroscope"\n  sandbox="allow-scripts allow-same-origin"\n  loading="lazy"\n></iframe>',
    previewHtml: '<div style="border:1px dashed #6366f1;padding:8px;border-radius:4px;font-size:12px;color:#a5b4fc;text-align:center;">Isolated Nested Browsing Context (iFrame Sandbox)</div>',
    bestPractices: 'Always include a descriptive title attribute for screen readers, and utilize the sandbox attribute for security isolation.',
    accessibilityNotes: 'Screen readers announce iframe title attributes to let users decide whether to interact with the frame.'
  },
  {
    tag: '<canvas>',
    category: 'Media & Embeds',
    description: 'Provides a pixel-based raster surface that can be drawn on dynamically via JavaScript (2D graphics, games, charts, WebGL).',
    commonAttributes: ['width', 'height'],
    syntax: '<canvas id="myCanvas" width="400" height="200"></canvas>',
    example: '<canvas id="chartCanvas" width="600" height="300"></canvas>\n<script>\n  const canvas = document.getElementById("chartCanvas");\n  const ctx = canvas.getContext("2d");\n  ctx.fillStyle = "#6366f1";\n  ctx.fillRect(10, 10, 100, 100);\n</script>',
    previewHtml: '<div style="background:#090d16;border:1px solid #334155;border-radius:4px;height:45px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#818cf8;">2D & WebGL Canvas Graphics Canvas</div>',
    bestPractices: 'Set width and height via HTML attributes, not CSS, to avoid stretching pixel aspect ratios.'
  },

  // Tables
  {
    tag: '<table>, <thead>, <tbody>, <tr>, <th>, <td>',
    category: 'Tables',
    description: 'Elements for rendering multi-dimensional structured tabular data. thead, tbody, and tfoot structure rows; th indicates headers.',
    commonAttributes: ['scope', 'colspan', 'rowspan'],
    syntax: '<table>\n  <thead><tr><th>Header</th></tr></thead>\n  <tbody><tr><td>Data</td></tr></tbody>\n</table>',
    example: '<table>\n  <caption>Monthly Developer Metrics</caption>\n  <thead>\n    <tr>\n      <th scope="col">Framework</th>\n      <th scope="col">Stars</th>\n      <th scope="col">Downloads</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>React</td>\n      <td>225k</td>\n      <td>24M/wk</td>\n    </tr>\n  </tbody>\n</table>',
    previewHtml: '<table style="width:100%;font-size:11px;border-collapse:collapse;color:#cbd5e1;"><tr style="border-bottom:1px solid #475569;color:#93c5fd;"><th style="text-align:left;padding:4px;">Language</th><th style="text-align:left;padding:4px;">Type</th></tr><tr><td style="padding:4px;">JavaScript</td><td style="padding:4px;">Dynamic</td></tr><tr><td style="padding:4px;">TypeScript</td><td style="padding:4px;">Static</td></tr></table>',
    bestPractices: 'Always use th with scope="col" or scope="row" for accessible table headers. Never use tables for general page layout.'
  },

  // Interactive Elements
  {
    tag: '<details> & <summary>',
    category: 'Interactive',
    description: 'Native disclosure accordion widget. Users can toggle open/closed state to reveal or hide extra information without JavaScript.',
    commonAttributes: ['open'],
    syntax: '<details>\n  <summary>Click to view details</summary>\n  <p>Expanded content here...</p>\n</details>',
    example: '<details>\n  <summary>What is the difference between let and const?</summary>\n  <p>let allows reassignment, while const declares an immutable binding.</p>\n</details>',
    previewHtml: '<details style="font-size:12px;color:#cbd5e1;background:#1e293b;padding:6px 10px;border-radius:4px;cursor:pointer;"><summary style="font-weight:600;color:#c7d2fe;">Click to toggle FAQ</summary><div style="margin-top:6px;font-size:11px;color:#94a3b8;">Native HTML disclosure element without any JS needed!</div></details>',
    bestPractices: 'Fully accessible out of the box with keyboard navigation (Enter/Space toggles).'
  },
  {
    tag: '<dialog>',
    category: 'Interactive',
    description: 'Native HTML modal or non-modal dialog box. Supports showModal() with built-in backdrop, focus trapping, and Escape key handling.',
    commonAttributes: ['open'],
    syntax: '<dialog id="myModal">\n  <p>Dialog content</p>\n  <button onclick="this.closest(\'dialog\').close()">Close</button>\n</dialog>',
    example: '<dialog id="cookieNotice">\n  <h3>Privacy Choices</h3>\n  <p>We respect your privacy preferences.</p>\n  <button onclick="cookieNotice.close()">Accept</button>\n</dialog>\n<script>\n  // Open with: cookieNotice.showModal();\n</script>',
    previewHtml: '<div style="border:1px solid #4f46e5;padding:8px 12px;background:#1e1b4b;border-radius:6px;font-size:12px;color:#c7d2fe;display:flex;justify-content:space-between;align-items:center;"><span>Native Modal Dialog Element</span><span style="font-size:10px;background:#4338ca;padding:2px 6px;border-radius:3px;">ESC to close</span></div>',
    bestPractices: 'Always use dialog.showModal() rather than setting open attribute directly so the browser creates the top-layer ::backdrop.'
  },
  {
    tag: '<template> & <slot>',
    category: 'Interactive',
    description: 'Mechanisms for holding client-side content that is not rendered when the page loads, but can be cloned during runtime via JavaScript or Web Components.',
    commonAttributes: ['id', 'name'],
    syntax: '<template id="cardTemplate">\n  <div class="card">\n    <h3>Title</h3>\n  </div>\n</template>',
    example: '<template id="row-template">\n  <tr>\n    <td class="name"></td>\n    <td class="email"></td>\n  </tr>\n</template>\n<script>\n  const template = document.getElementById("row-template");\n  const clone = template.content.cloneNode(true);\n</script>',
    previewHtml: '<div style="font-size:12px;color:#94a3b8;font-style:italic;">Template content remains inert until instantiated via JavaScript cloneNode().</div>',
    bestPractices: 'Crucial building block for Web Components and high-performance DOM batch rendering.'
  },

  // Obsolete / Deprecated with Modern Replacements
  {
    tag: '<marquee>, <center>, <font>, <strike>',
    category: 'Obsolete',
    description: 'Deprecated legacy elements removed from the HTML standard. Do not use in modern production applications.',
    commonAttributes: ['None'],
    syntax: '<!-- DO NOT USE --> <center>Text</center>',
    example: '/* Modern CSS Replacements */\n/* Instead of <center>: */\n.container { display: grid; place-items: center; }\n\n/* Instead of <marquee>: */\n@keyframes scroll { ... }\n\n/* Instead of <font>: */\n.text { font-family: sans-serif; color: #6366f1; }',
    previewHtml: '<div style="border:1px solid #dc2626;background:#450a0a;padding:8px;border-radius:4px;font-size:11px;color:#fca5a5;">⚠️ Deprecated! Replace with CSS flexbox, grid, animations, and color properties.</div>',
    bestPractices: 'Replace with CSS layout, typography, and animation rules.'
  }
];
