export interface ExpressTopicItem {
  id: string;
  title: string;
  category: 'Environment Setup' | 'Node.js Core' | 'Express Basics' | 'Routing & CRUD' | 'Middleware' | 'Full-Stack Integration';
  summary: string;
  codeSnippet: string;
  terminalCommands?: string[];
  explanation: string;
  proTip: string;
}

export const EXPRESS_CATEGORIES = [
  'All',
  'Environment Setup',
  'Node.js Core',
  'Express Basics',
  'Routing & CRUD',
  'Middleware',
  'Full-Stack Integration',
] as const;

export const ENVIRONMENT_SETUP_STEPS = [
  {
    step: '1. Install Node.js & npm',
    title: 'Download LTS from Nodejs.org or NVM',
    terminal: 'node -v\nnpm -v',
    details: 'Download the Long Term Support (LTS) release from https://nodejs.org or use Node Version Manager (nvm install --lts). Verify in terminal that both node and npm output valid version numbers.'
  },
  {
    step: '2. Code Editor Setup',
    title: 'Install Visual Studio Code & Extensions',
    terminal: 'code .',
    details: 'Install VS Code along with key extensions: "Prettier - Code formatter", "ESLint", "Thunder Client" (for testing REST APIs inside VS Code), and "Tailwind CSS IntelliSense".'
  },
  {
    step: '3. Terminal & CLI Basics',
    title: 'Master Essential Command Line Commands',
    terminal: 'mkdir my-project && cd my-project\npwd\nls -la',
    details: 'Navigate folders with cd, list files with ls (or dir on Windows), create folders with mkdir, and inspect working directories with pwd.'
  },
  {
    step: '4. Initialize package.json',
    title: 'Setup Node Project Configuration',
    terminal: 'npm init -y',
    details: 'Generates a clean package.json file containing project name, version, entry point ("main": "server.js" or "server.ts"), scripts, and dependencies.'
  },
  {
    step: '5. Install Express & Developer Tools',
    title: 'Install Core & TypeScript Dependencies',
    terminal: 'npm install express cors dotenv\nnpm install -D typescript @types/express @types/node tsx',
    details: 'Installs Express for web routing, cors to allow frontend access, dotenv for secret environment variables, and tsx to execute TypeScript without manual compilation.'
  }
];

export const EXPRESS_TOPICS: ExpressTopicItem[] = [
  // Environment Setup
  {
    id: 'env-setup-complete',
    title: 'Complete Development Environment Setup Guide',
    category: 'Environment Setup',
    summary: 'From zero to running server: Node.js installation, terminal commands, VS Code configuration, and package.json management.',
    terminalCommands: [
      '# 1. Verify Node and npm are available',
      'node -v',
      'npm -v',
      '',
      '# 2. Create project folder & initialize',
      'mkdir fullstack-app',
      'cd fullstack-app',
      'npm init -y',
      '',
      '# 3. Add "type": "module" to package.json for modern import syntax',
      'npm pkg set type="module"',
      '',
      '# 4. Install Express and toolchain',
      'npm install express cors dotenv',
      'npm install -D tsx @types/express @types/node typescript'
    ],
    codeSnippet: `// Your project package.json configuration:
{
  "name": "fullstack-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.0",
    "tsx": "^4.15.0",
    "typescript": "^5.4.5"
  }
}`,
    explanation: 'Setting "type": "module" in package.json enables native ES Module syntax (import/export) instead of legacy CommonJS (require). Using tsx watch server.ts automatically restarts the server whenever you edit files.',
    proTip: 'Always create a .gitignore file containing node_modules and .env so you never commit sensitive API keys or megabytes of dependencies to Git.'
  },

  // Node.js Core
  {
    id: 'nodejs-core-architecture',
    title: 'Node.js Architecture & Built-in Modules (path, fs, http)',
    category: 'Node.js Core',
    summary: 'Understand the V8 JavaScript engine, asynchronous non-blocking event loop, and essential standard library modules.',
    codeSnippet: `import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import os from 'os';

// 1. Solving __dirname in modern ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Cross-platform path resolution (handles Windows \\ and Mac/Linux /)
const configFilePath = path.join(__dirname, 'config', 'settings.json');
console.log('Target path:', configFilePath);

// 3. Asynchronous File Operations (Non-blocking!)
async function manageStorage() {
  try {
    // Write JSON file to disk
    const systemInfo = {
      platform: os.platform(),
      totalMemGB: (os.totalmem() / (1024 ** 3)).toFixed(1),
      freeMemGB: (os.freemem() / (1024 ** 3)).toFixed(1)
    };
    await fs.writeFile(configFilePath, JSON.stringify(systemInfo, null, 2));

    // Read file from disk asynchronously
    const rawData = await fs.readFile(configFilePath, 'utf-8');
    const parsed = JSON.parse(rawData);
    console.log('Saved system report:', parsed);
  } catch (err) {
    console.error('File operation error:', err);
  }
}

manageStorage();`,
    explanation: 'Node.js uses Google V8 engine to execute JavaScript on servers. It offloads I/O tasks (file reading, database queries, network sockets) to libuv worker threads, keeping the main thread free to handle thousands of concurrent requests without locking.',
    proTip: 'Always use fs/promises instead of synchronous fs.readFileSync(), because synchronous file operations block the entire Node.js server thread for all users!'
  },

  // Express Basics
  {
    id: 'express-minimal-server',
    title: 'Building Your First Express Server from Scratch',
    category: 'Express Basics',
    summary: 'Line-by-line breakdown of a production-ready Express server with dotenv environment variables and port binding.',
    codeSnippet: `import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// 1. Load environment variables from .env file
dotenv.config();

// 2. Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Core built-in middleware
app.use(cors());                 // Enable Cross-Origin requests
app.use(express.json());         // Parse incoming JSON request bodies (req.body)

// 4. Define health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 5. Start listening on the specified network port
app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});`,
    explanation: 'express() initializes the routing dispatcher. app.use(express.json()) is mandatory: without it, req.body is undefined when users send POST data. app.listen binds to the TCP port and starts accepting HTTP connections.',
    proTip: 'Never hardcode port numbers. Always use process.env.PORT || 5000 so hosting platforms (Vercel, Render, Railway, AWS) can dynamically inject their assigned port.'
  },

  // Routing & CRUD
  {
    id: 'express-rest-crud',
    title: 'Complete RESTful API with Full CRUD Endpoints',
    category: 'Routing & CRUD',
    summary: 'Implement GET all, GET by ID, POST create, PUT update, and DELETE remove with proper HTTP status codes (200, 201, 400, 404).',
    codeSnippet: `import express from 'express';
const router = express.Router();

// Mock database in memory for demonstration
interface Note {
  id: number;
  title: string;
  content: string;
}

let notes: Note[] = [
  { id: 1, title: 'Learn React', content: 'Study components, hooks, and state' },
  { id: 2, title: 'Learn Express', content: 'Build REST APIs and middleware' }
];

// 1. GET /api/notes - Read all notes (supports optional search query)
router.get('/', (req, res) => {
  const { search } = req.query; // reads ?search=keyword
  if (typeof search === 'string') {
    const filtered = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
    return res.json(filtered);
  }
  res.json(notes);
});

// 2. GET /api/notes/:id - Read single note by ID
router.get('/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return res.status(404).json({ error: 'Note not found with given ID' });
  }
  res.json(note);
});

// 3. POST /api/notes - Create a new note
router.post('/', (req, res) => {
  const { title, content } = req.body;

  // Validation
  if (!title || !content) {
    return res.status(400).json({ error: 'Both title and content are required' });
  }

  const newNote: Note = {
    id: Date.now(),
    title,
    content
  };
  notes.push(newNote);

  // 201 Created status code indicates successful resource creation
  res.status(201).json(newNote);
});

// 4. PUT /api/notes/:id - Update an existing note
router.put('/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const index = notes.findIndex(n => n.id === noteId);

  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const { title, content } = req.body;
  notes[index] = { ...notes[index], title: title ?? notes[index].title, content: content ?? notes[index].content };
  res.json(notes[index]);
});

// 5. DELETE /api/notes/:id - Delete a note
router.delete('/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const exists = notes.some(n => n.id === noteId);

  if (!exists) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes = notes.filter(n => n.id !== noteId);
  res.status(200).json({ message: \`Note \${noteId} deleted successfully\` });
});

export default router;`,
    explanation: 'REST APIs map standard HTTP verbs to operations: GET (Read), POST (Create, status 201), PUT (Replace/Update, status 200), and DELETE (Delete, status 200 or 204). URL parameters are accessed via req.params; query parameters via req.query.',
    proTip: 'Use express.Router() to split different API domain resources (users, products, orders) into separate modular files.'
  },

  // Middleware
  {
    id: 'express-middleware-system',
    title: 'Middleware Deep-Dive & Global Error Handling',
    category: 'Middleware',
    summary: 'The core superpower of Express: request logging, authentication guards, and centralized 4-parameter error handlers.',
    codeSnippet: `import express, { Request, Response, NextFunction } from 'express';
const app = express();

// 1. Custom Logging Middleware (executes on every incoming request)
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  console.log(\`[\${req.method}] \${req.originalUrl}\`);

  // Hook into response finish event to calculate execution duration:
  res.on('finish', () => {
    const elapsed = Date.now() - startTime;
    console.log(\`Finished \${req.method} \${req.originalUrl} \${res.statusCode} in \${elapsed}ms\`);
  });

  next(); // CRITICAL: next() passes control to the next handler in chain!
};
app.use(requestLogger);

// 2. Route Guard / Authentication Middleware
const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'secret-key-123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next(); // Token is valid; proceed to handler
};

// Protect specific sensitive endpoint:
app.get('/api/admin/metrics', requireApiKey, (req, res) => {
  res.json({ secretMetrics: [100, 200, 300] });
});

// 3. Centralized Error-Handling Middleware (Must have EXACTLY 4 parameters!)
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Server Error:', err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      status
    }
  });
};
// Must be registered as the VERY LAST app.use() after all routes:
app.use(errorHandler);`,
    explanation: 'Middleware functions have access to the request object (req), response object (res), and the next function. If a middleware does not call next() or end the request with res.send/json, the request will hang indefinitely until timeout.',
    proTip: 'An error-handling middleware is identified by having exactly 4 arguments: (err, req, res, next). Express will only route errors thrown with next(err) to 4-argument functions.'
  },

  // Full-Stack Integration
  {
    id: 'fullstack-react-express-link',
    title: 'Connecting React (Frontend) to Express (Backend)',
    category: 'Full-Stack Integration',
    summary: 'Configure CORS, set up Vite development proxy, call endpoints with fetch, and serve static production builds.',
    codeSnippet: `// 1. IN EXPRESS: Configure CORS (Cross-Origin Resource Sharing)
import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5173', // allows React dev server to communicate
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 2. IN REACT vite.config.ts: Setup proxy (avoids CORS issues during local dev)
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

// 3. IN REACT COMPONENT: Calling the Express API
import { useState, useEffect } from 'react';

export function ProductsView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error("API Call Error:", err));
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : products.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}

// 4. PRODUCTION DEPLOYMENT: Express serving built React files
// In Express server.js:
import path from 'path';
// Serve static frontend assets from React's dist folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));
// Catch-all route to let React Router handle SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});`,
    explanation: 'In development, React runs on port 5173 and Express on port 5000. The Vite dev server proxy seamlessly forwards any request starting with /api to Express without exposing cross-origin errors.',
    proTip: 'In production, running npm run build on React generates static assets inside /dist, which Express can serve directly with express.static(), allowing you to deploy the entire full-stack app on a single server or container!'
  }
];
