export interface StudyDayPlan {
  dayNumber: number;
  phase: string;
  title: string;
  estimatedMinutes: number;
  whatYouWillLearn: string;
  actionItems: string[];
  keyConcept: string;
  reactExpressConnection: string;
}

export interface StudyPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  estimatedTotalHours: number;
  estimatedCalendarWeeks: string;
  prerequisites: string;
  keyOutcomes: string[];
  days: StudyDayPlan[];
}

export const STUDY_PHASES: StudyPhase[] = [
  {
    id: 'phase-js-bridge',
    phaseNumber: 1,
    title: 'Phase 1: The JS-to-React Bridge (Finish Second Half of JS)',
    subtitle: 'You already know the basics (variables, loops). Now master the 5 modern JS features React strictly relies on.',
    estimatedTotalHours: 9,
    estimatedCalendarWeeks: '1 - 1.5 Weeks (at 1-1.5 hrs/day)',
    prerequisites: 'Basic understanding of if/else, loops, and basic function declarations.',
    keyOutcomes: [
      'Write concise arrow functions with implicit returns',
      'Destructure objects and arrays in a single line',
      'Use .map() and .filter() without relying on old for-loops',
      'Understand why React state updates use the spread operator (...)',
      'Fetch JSON data using modern async/await'
    ],
    days: [
      {
        dayNumber: 1,
        phase: 'Phase 1',
        title: 'Arrow Functions & Template Literals',
        estimatedMinutes: 60,
        whatYouWillLearn: 'Replace function keyword with () => {} and use backticks for strings (${variable}).',
        actionItems: [
          'Read the Arrow Functions guide in the JavaScript manual',
          'Practice writing 5 one-line arrow functions with implicit returns',
          'Convert concatenated strings ("Hello " + name) into template literals (`Hello ${name}`)'
        ],
        keyConcept: 'const add = (a, b) => a + b; (no return keyword needed if on one line!)',
        reactExpressConnection: 'Every modern React component and Express route is written as an arrow function.'
      },
      {
        dayNumber: 2,
        phase: 'Phase 1',
        title: 'Destructuring & Spread Operator (...)',
        estimatedMinutes: 75,
        whatYouWillLearn: 'Unpack properties directly and create immutable copies with three dots (...).',
        actionItems: [
          'Practice extracting title and price from an object: const { title, price } = product;',
          'Practice array destructuring: const [state, setState] = ...;',
          'Create a copy of an object and override one field using spread: { ...old, field: "new" }'
        ],
        keyConcept: 'const { title } = props; allows you to avoid typing props.title over and over.',
        reactExpressConnection: 'React components destructure props 100% of the time, and React state updates require spread syntax.'
      },
      {
        dayNumber: 3,
        phase: 'Phase 1',
        title: 'Array Transformation (.map() & .filter())',
        estimatedMinutes: 90,
        whatYouWillLearn: 'Looping through collections without manual index tracking or push().',
        actionItems: [
          'Take an array of 5 products and use .map() to return an array of their formatted prices',
          'Use .filter() to return only products where inStock === true',
          'Chain them together: products.filter(...).map(...)'
        ],
        keyConcept: '.map() returns a brand-new array of identical length with transformed items.',
        reactExpressConnection: 'In React, .map() is the ONLY standard way to render lists of HTML elements.'
      },
      {
        dayNumber: 4,
        phase: 'Phase 1',
        title: 'Closures & Lexical Scope',
        estimatedMinutes: 60,
        whatYouWillLearn: 'How inner functions remember variables from outer scopes.',
        actionItems: [
          'Read the Closures guide in the JavaScript manual',
          'Create a createCounter() function that preserves a private count variable',
          'Observe why the inner function still remembers count even after the outer function finishes'
        ],
        keyConcept: 'Closures are "backpacks" where functions carry their birthplace variables forever.',
        reactExpressConnection: 'React\'s useState() hook works entirely through JavaScript closures.'
      },
      {
        dayNumber: 5,
        phase: 'Phase 1',
        title: 'Asynchronous JavaScript & fetch() with async/await',
        estimatedMinutes: 90,
        whatYouWillLearn: 'Non-blocking I/O, Promises, and making HTTP network calls.',
        actionItems: [
          'Write an async function that fetches a user from https://jsonplaceholder.typicode.com/users/1',
          'Check if (!res.ok) before parsing with res.json()',
          'Wrap the call inside try { ... } catch (err) { ... }'
        ],
        keyConcept: 'await pauses execution inside the async function until data arrives without freezing the browser.',
        reactExpressConnection: 'This is the exact way your React app will talk to your Express.js backend.'
      },
      {
        dayNumber: 6,
        phase: 'Phase 1',
        title: 'Phase 1 Capstone Challenge',
        estimatedMinutes: 90,
        whatYouWillLearn: 'Combine all 5 JS skills into one mini vanilla project in the Live Sandbox.',
        actionItems: [
          'Open the Live Sandbox tab',
          'Fetch a list of posts from an API using async/await',
          'Use .filter() to search through them, and .map() to display them on screen',
          'Destructure each post object inside the loop'
        ],
        keyConcept: 'Confidence test: You are now 100% ready to start React!',
        reactExpressConnection: 'You now possess all the JavaScript prerequisites required for professional React development.'
      }
    ]
  },
  {
    id: 'phase-react',
    phaseNumber: 2,
    title: 'Phase 2: React Fundamentals & Component Architecture',
    subtitle: 'Install React with Vite + TypeScript and master components, reactive state, effects, and forms.',
    estimatedTotalHours: 16,
    estimatedCalendarWeeks: '2 Weeks (at 1-1.5 hrs/day)',
    prerequisites: 'Phase 1 (Arrow functions, destructuring, .map(), async/await).',
    keyOutcomes: [
      'Scaffold React projects with Vite and navigate project file trees',
      'Create reusable functional components with TypeScript props',
      'Manage component memory and updates with useState',
      'Fetch data and handle timers cleanly with useEffect',
      'Build controlled forms with two-way data binding'
    ],
    days: [
      {
        dayNumber: 7,
        phase: 'Phase 2',
        title: 'React Installation & Anatomy with Vite',
        estimatedMinutes: 60,
        whatYouWillLearn: 'How to install React with npm create vite@latest and how index.html, main.tsx, and App.tsx connect.',
        actionItems: [
          'Follow the React Installation Guide in the React section',
          'Inspect the project file tree breakdown',
          'Understand createRoot(document.getElementById("root")).render(<App />)'
        ],
        keyConcept: 'Vite compiles your TypeScript and JSX in milliseconds using native browser ES modules.',
        reactExpressConnection: 'Vite is the standard build tool used across modern companies.'
      },
      {
        dayNumber: 8,
        phase: 'Phase 2',
        title: 'JSX Syntax & Functional Components',
        estimatedMinutes: 75,
        whatYouWillLearn: 'Writing HTML inside JavaScript, embedding expressions with { }, and passing props.',
        actionItems: [
          'Build a <UserCard /> component that accepts name, role, and avatar props',
          'Type props using a TypeScript interface (interface UserCardProps { ... })',
          'Destructure props in the component parameter list'
        ],
        keyConcept: 'JSX tags must close, class becomes className, and JavaScript expressions go in { curly braces }.',
        reactExpressConnection: 'Components are the building blocks of every page in your app.'
      },
      {
        dayNumber: 9,
        phase: 'Phase 2',
        title: 'State with useState (Reactivity in Action)',
        estimatedMinutes: 90,
        whatYouWillLearn: 'Component memory and triggering re-renders without touching the DOM manually.',
        actionItems: [
          'Test the Interactive Live Reactivity Sandbox in the React guide',
          'Build a counter with increment, decrement, and reset',
          'Learn the immutable updater pattern: setCount(prev => prev + 1)'
        ],
        keyConcept: 'Never modify state directly (state.push). Always provide a new array or object ([...prev, newItem]).',
        reactExpressConnection: 'useState is the most frequently used hook in all of frontend development.'
      },
      {
        dayNumber: 10,
        phase: 'Phase 2',
        title: 'Dynamic Lists & Keys with .map()',
        estimatedMinutes: 75,
        whatYouWillLearn: 'Rendering arrays of data and why unique key props are critical.',
        actionItems: [
          'Render an array of products using {products.map(p => <ProductCard key={p.id} {...p} />)}',
          'Observe why using array index as key causes bugs when items are deleted',
          'Add a conditional empty state (products.length === 0 && <p>No items found</p>)'
        ],
        keyConcept: 'The key prop helps React identify which items have changed, been added, or been removed.',
        reactExpressConnection: 'Every real-world web application renders dynamic database records in lists.'
      },
      {
        dayNumber: 11,
        phase: 'Phase 2',
        title: 'Side Effects & Data Fetching with useEffect',
        estimatedMinutes: 90,
        whatYouWillLearn: 'Synchronizing with APIs, dependency array rules, and cleanup functions.',
        actionItems: [
          'Fetch posts from an API when the component first mounts using useEffect(() => { ... }, [])',
          'Handle loading and error states with separate useState variables',
          'Write a cleanup function to cancel in-flight requests'
        ],
        keyConcept: 'An empty dependency array [] runs only once when component mounts; [id] re-runs when id changes.',
        reactExpressConnection: 'This is the bridge where React requests data from your Express backend.'
      },
      {
        dayNumber: 12,
        phase: 'Phase 2',
        title: 'Controlled Forms & User Input',
        estimatedMinutes: 75,
        whatYouWillLearn: 'Two-way binding where React state drives input values.',
        actionItems: [
          'Build a form with text input, email input, and checkbox',
          'Handle form submission with e.preventDefault()',
          'Validate input values and display inline feedback'
        ],
        keyConcept: '<input value={text} onChange={e => setText(e.target.value)} /> guarantees single source of truth.',
        reactExpressConnection: 'Forms send POST payloads to your Express server.'
      },
      {
        dayNumber: 13,
        phase: 'Phase 2',
        title: 'Essential Advanced Hooks (useRef & useContext)',
        estimatedMinutes: 75,
        whatYouWillLearn: 'Direct DOM manipulation with useRef and global state with useContext.',
        actionItems: [
          'Use useRef to auto-focus an input when a modal opens',
          'Create a ThemeContext to toggle dark/light mode across components without prop drilling'
        ],
        keyConcept: 'useRef stores a mutable value that does NOT trigger a re-render when changed.',
        reactExpressConnection: 'Crucial for complex dashboards and multi-page layouts.'
      },
      {
        dayNumber: 14,
        phase: 'Phase 2',
        title: 'Phase 2 Mini Project: Interactive Task Tracker',
        estimatedMinutes: 120,
        whatYouWillLearn: 'Assemble all React skills into a functional frontend application.',
        actionItems: [
          'Build a complete Task Tracker with Add, Delete, Toggle Complete, and Filter by status',
          'Break it down into modular components (<TaskHeader />, <TaskInput />, <TaskList />, <TaskItem />)'
        ],
        keyConcept: 'You can now build interactive client-side web apps with confidence!',
        reactExpressConnection: 'This app is ready to connect to a backend server.'
      }
    ]
  },
  {
    id: 'phase-express',
    phaseNumber: 3,
    title: 'Phase 3: Node.js & Express.js Backend Development',
    subtitle: 'Setup your machine environment, write HTTP route handlers, master middleware, and build REST APIs.',
    estimatedTotalHours: 14,
    estimatedCalendarWeeks: '1.5 - 2 Weeks (at 1-1.5 hrs/day)',
    prerequisites: 'Phase 1 & Phase 2.',
    keyOutcomes: [
      'Master the terminal CLI, npm init -y, and package.json management',
      'Understand the Node.js event loop and asynchronous non-blocking I/O',
      'Build an Express server with GET, POST, PUT, DELETE REST endpoints',
      'Parse request bodies with express.json() and protect routes with middleware',
      'Handle errors gracefully with centralized 4-parameter error handlers'
    ],
    days: [
      {
        dayNumber: 15,
        phase: 'Phase 3',
        title: 'Machine Environment Setup (Node, npm & Terminal)',
        estimatedMinutes: 60,
        whatYouWillLearn: 'Install Node LTS, verify npm in terminal, set up VS Code, and initialize package.json.',
        actionItems: [
          'Run node -v and npm -v in your computer terminal',
          'Create a project directory: mkdir backend-app && cd backend-app',
          'Initialize with npm init -y and configure "type": "module"',
          'Install express, cors, dotenv, and dev tools (tsx, typescript)'
        ],
        keyConcept: 'package.json is the control center of your Node.js application.',
        reactExpressConnection: 'Every full-stack project begins with this exact environment setup.'
      },
      {
        dayNumber: 16,
        phase: 'Phase 3',
        title: 'Node.js Architecture & Core Modules',
        estimatedMinutes: 60,
        whatYouWillLearn: 'Google V8 engine, asynchronous non-blocking I/O, path resolution, and fs/promises.',
        actionItems: [
          'Learn why Node.js can handle thousands of concurrent connections on a single thread',
          'Use path.join() to construct cross-platform file paths safely',
          'Read and write JSON files asynchronously with fs/promises'
        ],
        keyConcept: 'Node delegates heavy disk and network tasks to background worker threads so the main loop never blocks.',
        reactExpressConnection: 'Understanding Node explains how Express serves web requests.'
      },
      {
        dayNumber: 17,
        phase: 'Phase 3',
        title: 'Building Your First Express Server',
        estimatedMinutes: 75,
        whatYouWillLearn: 'app = express(), app.listen(PORT), and understanding the Request / Response cycle.',
        actionItems: [
          'Create a server.ts file with Express',
          'Define a health check route: app.get("/api/health", (req, res) => res.json({ status: "ok" }))',
          'Run the server with tsx watch server.ts and test it in your browser at http://localhost:5000'
        ],
        keyConcept: 'Express is a routing and middleware framework built on top of Node\'s HTTP module.',
        reactExpressConnection: 'This is the server your React app will talk to.'
      },
      {
        dayNumber: 18,
        phase: 'Phase 3',
        title: 'Building a Full CRUD REST API',
        estimatedMinutes: 90,
        whatYouWillLearn: 'GET (Read), POST (Create, status 201), PUT (Update), DELETE (Delete) with HTTP status codes.',
        actionItems: [
          'Test the Interactive Express Simulator in the Express section',
          'Write a complete /api/notes router with in-memory array storage',
          'Use req.params.id to look up specific items',
          'Validate required fields in req.body and return 400 Bad Request on failure'
        ],
        keyConcept: 'REST APIs use standard HTTP verbs (GET, POST, PUT, DELETE) and HTTP status codes (200, 201, 400, 404).',
        reactExpressConnection: 'These endpoints supply all dynamic data to your React frontend.'
      },
      {
        dayNumber: 19,
        phase: 'Phase 3',
        title: 'Express Middleware & Route Guards',
        estimatedMinutes: 75,
        whatYouWillLearn: 'The (req, res, next) pipeline, body parsing, custom loggers, and authentication checks.',
        actionItems: [
          'Understand why app.use(express.json()) is mandatory for req.body to work',
          'Write a custom request logger middleware that measures execution duration in milliseconds',
          'Write an auth guard that checks for an "x-api-key" header and returns 401 Unauthorized if invalid'
        ],
        keyConcept: 'Middleware runs in sequence: if next() is not called, the request hangs forever.',
        reactExpressConnection: 'Middleware protects sensitive endpoints and processes incoming data before routes see it.'
      },
      {
        dayNumber: 20,
        phase: 'Phase 3',
        title: 'Global Error Handling & Production Structure',
        estimatedMinutes: 60,
        whatYouWillLearn: 'Centralized 4-argument error handlers (err, req, res, next) and modular router files.',
        actionItems: [
          'Implement a 4-argument error handling middleware at the bottom of server.ts',
          'Organize routes into separate files using express.Router()',
          'Configure environment variables with a .env file and dotenv.config()'
        ],
        keyConcept: 'Express identifies error middleware specifically by checking that it has exactly 4 arguments.',
        reactExpressConnection: 'Guarantees that backend errors return clean JSON to React instead of crashing the server.'
      }
    ]
  },
  {
    id: 'phase-fullstack',
    phaseNumber: 4,
    title: 'Phase 4: Full-Stack Integration (React + Express)',
    subtitle: 'Connect your React frontend to your Express backend, solve CORS, configure Vite proxies, and deploy.',
    estimatedTotalHours: 10,
    estimatedCalendarWeeks: '1 Week (at 1-1.5 hrs/day)',
    prerequisites: 'Phase 2 (React) & Phase 3 (Express).',
    keyOutcomes: [
      'Configure CORS in Express to allow frontend communication',
      'Set up Vite proxy in vite.config.ts for seamless local development',
      'Make fetch() calls from React components with loading & error UI states',
      'Compile React with npm run build and serve static files with express.static()',
      'Deploy the full-stack web application to hosting platforms'
    ],
    days: [
      {
        dayNumber: 21,
        phase: 'Phase 4',
        title: 'CORS & Vite Development Proxy',
        estimatedMinutes: 60,
        whatYouWillLearn: 'Why browsers block cross-origin requests and how to configure cors() and Vite proxies.',
        actionItems: [
          'Install cors in Express and enable: app.use(cors({ origin: "http://localhost:5173" }))',
          'Configure server.proxy in React\'s vite.config.ts so /api forwards to http://localhost:5000'
        ],
        keyConcept: 'Same-Origin Policy security prevents React (port 5173) from calling Express (port 5000) unless CORS is configured.',
        reactExpressConnection: 'The bridge that allows frontend and backend to talk smoothly.'
      },
      {
        dayNumber: 22,
        phase: 'Phase 4',
        title: 'Full-Stack Data Flow (Fetching & Mutating)',
        estimatedMinutes: 90,
        whatYouWillLearn: 'Reading from Express in React with useEffect and sending form data to Express with fetch(POST).',
        actionItems: [
          'In React: Fetch all notes from Express on mount and display them in a list',
          'In React: Submit a form that sends a POST request with JSON body to Express',
          'Update local React state optimistically when Express returns the newly created 201 object'
        ],
        keyConcept: 'Complete full-stack round trip: User enters data -> React -> Express API -> Response -> React UI updates.',
        reactExpressConnection: 'This is the core recipe behind every real web application in the world.'
      },
      {
        dayNumber: 23,
        phase: 'Phase 4',
        title: 'Production Build & Static Serving',
        estimatedMinutes: 75,
        whatYouWillLearn: 'Compiling React into /dist and serving it from Express with express.static().',
        actionItems: [
          'Run npm run build in your React project to generate optimized HTML, CSS, and JS',
          'In Express: app.use(express.static("dist"))',
          'Add catch-all route app.get("*", (req, res) => res.sendFile("dist/index.html"))'
        ],
        keyConcept: 'You can host both React and Express on a single Node server in production!',
        reactExpressConnection: 'Simplifies deployment so you only need one web service instead of two.'
      },
      {
        dayNumber: 24,
        phase: 'Phase 4',
        title: 'Full-Stack Graduation Capstone Project',
        estimatedMinutes: 120,
        whatYouWillLearn: 'Build and deploy a complete Full-Stack Web Application from scratch.',
        actionItems: [
          'Create a Full-Stack Notes or Product Catalog application',
          'Express backend with 5 CRUD routes and in-memory or JSON storage',
          'React frontend with TypeScript, custom components, and responsive CSS',
          'Celebrate! You have graduated from knowing basic JS to building complete full-stack web applications!'
        ],
        keyConcept: 'You have mastered the modern web development stack: HTML, CSS, JS, React, Node.js, and Express.',
        reactExpressConnection: 'You are now ready to apply for junior full-stack developer roles or build your own startups.'
      }
    ]
  }
];
