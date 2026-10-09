export interface ReactTopicItem {
  id: string;
  title: string;
  category: 'Installation & Setup' | 'JSX & Components' | 'State & Hooks' | 'Advanced Hooks' | 'Forms & Architecture';
  summary: string;
  codeSnippet: string;
  stepByStep?: string[];
  explanation: string;
  bestPractices: string;
}

export const REACT_CATEGORIES = [
  'All',
  'Installation & Setup',
  'JSX & Components',
  'State & Hooks',
  'Advanced Hooks',
  'Forms & Architecture',
] as const;

export const REACT_INSTALL_STEPS = [
  {
    step: '1. Verify Node.js',
    command: 'node -v && npm -v',
    description: 'Ensure Node.js LTS (v18.0.0 or higher) and npm (v9.0.0 or higher) are installed in your terminal.'
  },
  {
    step: '2. Scaffold with Vite',
    command: 'npm create vite@latest my-react-app -- --template react-ts',
    description: 'Vite creates an ultra-fast, modern React + TypeScript development setup with instantaneous Hot Module Replacement.'
  },
  {
    step: '3. Navigate & Install',
    command: 'cd my-react-app\nnpm install',
    description: 'Navigate into your new project directory and install all required packages (react, react-dom, typescript, vite).'
  },
  {
    step: '4. Start Development Server',
    command: 'npm run dev',
    description: 'Launches your local development server at http://localhost:5173 with instant hot reloading.'
  },
  {
    step: '5. Build for Production',
    command: 'npm run build',
    description: 'Compiles and bundles your optimized static HTML, CSS, and JS into the /dist directory ready for hosting on Vercel, Netlify, or Express.'
  }
];

export const REACT_PROJECT_STRUCTURE = [
  {
    file: 'index.html',
    purpose: 'The single HTML entry point containing <div id="root"></div> where React mounts your application.'
  },
  {
    file: 'src/main.tsx',
    purpose: 'Initializes ReactDOM via createRoot(document.getElementById("root")).render(<App />) with React.StrictMode.'
  },
  {
    file: 'src/App.tsx',
    purpose: 'The top-level root component of your application that orchestrates your layouts, views, and state.'
  },
  {
    file: 'src/index.css',
    purpose: 'Global stylesheet importing Tailwind CSS or custom base CSS resets and font definitions.'
  },
  {
    file: 'package.json',
    purpose: 'Declares project dependencies (react, react-dom), devDependencies (vite, typescript), and run scripts (dev, build, preview).'
  },
  {
    file: 'vite.config.ts',
    purpose: 'Configuration for the Vite bundler including the @vitejs/plugin-react plugin and module path aliases.'
  },
  {
    file: 'tsconfig.json',
    purpose: 'TypeScript compiler configuration defining modern ESNext target, path aliases, and jsx: react-jsx.'
  }
];

export const REACT_TOPICS: ReactTopicItem[] = [
  // Installation & Setup
  {
    id: 'react-setup-guide',
    title: 'How to Install & Structure a Modern React Project',
    category: 'Installation & Setup',
    summary: 'Step-by-step blueprint to initialize React using Vite and TypeScript, understand the file tree, and configure scripts.',
    codeSnippet: `// 1. Terminal commands to create your project:
// npm create vite@latest modern-app -- --template react-ts
// cd modern-app
// npm install
// npm run dev

// 2. The entry point file: src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}`,
    stepByStep: [
      'Install Node.js from https://nodejs.org (LTS Recommended)',
      'Run npm create vite@latest my-app -- --template react-ts',
      'Change directory: cd my-app and run npm install',
      'Launch the dev server: npm run dev and visit http://localhost:5173',
      'Edit src/App.tsx to see instant live updates in your browser'
    ],
    explanation: 'Vite replaced legacy tools like Create React App (CRA) by serving source code over native ES modules during development, resulting in near-instant server starts and sub-millisecond HMR updates.',
    bestPractices: 'Always choose TypeScript (--template react-ts). Strong typing prevents undefined property crashes and self-documents your component props.'
  },

  // JSX & Components
  {
    id: 'react-components-props',
    title: 'Functional Components, JSX & TypeScript Props',
    category: 'JSX & Components',
    summary: 'Write reusable, modular functional components and type their incoming props with TypeScript interfaces and destructuring.',
    codeSnippet: `// Define strong TypeScript contract for component props
interface UserCardProps {
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Guest';
  isActive?: boolean; // optional prop
  children?: React.ReactNode; // nested elements
}

// Modern functional component with prop destructuring & default value
export function UserCard({ name, email, role, isActive = true, children }: UserCardProps) {
  return (
    <article className="user-card">
      <div className="card-header">
        <h3 className="user-name">{name}</h3>
        <span className="role-tag">{role}</span>
      </div>
      <p className="user-email">{email}</p>
      <div className="status-indicator">
        {isActive ? '● Active' : '○ Offline'}
      </div>
      {/* Render children passed between <UserCard>...</UserCard> */}
      {children && <div className="card-extra">{children}</div>}
    </article>
  );
}

// Usage in parent component:
// <UserCard name="Alex Morgan" email="alex@dev.io" role="Admin">
//   <button className="btn">Send Message</button>
// </UserCard>`,
    explanation: 'React components are pure JavaScript functions that accept an object of arguments (props) and return React elements rendered as JSX. JSX syntax requires wrapping adjacent elements in a parent or fragment (<>...</>).',
    bestPractices: 'Keep components focused on a single responsibility. Prefer composing smaller components over building 500-line monster files.'
  },

  // State & Hooks
  {
    id: 'react-usestate',
    title: 'State Management with useState (Primitives, Objects, Arrays)',
    category: 'State & Hooks',
    summary: 'Manage component memory and trigger re-renders. Learn the immutable update pattern for objects and lists.',
    codeSnippet: `import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoManager() {
  // 1. Primitive state
  const [inputText, setInputText] = useState('');

  // 2. Array of objects state
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React State', completed: true },
    { id: 2, text: 'Build Express Backend', completed: false }
  ]);

  // Adding item (IMMUTABLE: never use todos.push()!)
  const handleAddTodo = () => {
    if (!inputText.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false
    };
    // Always create a new array with the spread operator:
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputText('');
  };

  // Toggling boolean property immutably via .map()
  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        placeholder="Add task..."
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    explanation: 'React state updates must be immutable. React determines if a re-render is necessary by comparing Object.is(oldState, newState). If you mutate state directly (e.g. state.push()), the memory reference is unchanged, and React will not re-render.',
    bestPractices: 'When the new state depends on previous state, always pass an updater function: setCount(prev => prev + 1).'
  },
  {
    id: 'react-useeffect',
    title: 'Side Effects & Lifecycle with useEffect',
    category: 'State & Hooks',
    summary: 'Synchronize components with external systems (API data fetching, event listeners, timers) and handle cleanup properly.',
    codeSnippet: `import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
}

export function PostFeed({ categoryId }: { categoryId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController cancels in-flight fetches when component unmounts or category changes!
    const controller = new AbortController();
    setLoading(true);

    async function loadData() {
      try {
        const res = await fetch(\`/api/posts?cat=\${categoryId}\`, {
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();

    // Cleanup function: runs before effect re-runs or when component unmounts
    return () => {
      controller.abort();
    };
  }, [categoryId]); // Dependency array: Effect re-runs ONLY when categoryId changes!

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}`,
    explanation: 'The dependency array controls execution: [] runs once on mount; [dep1, dep2] runs on mount and whenever dependencies change; omitted array runs after every single render. The cleanup function prevents memory leaks.',
    bestPractices: 'Always clean up intervals, subscriptions, and WebSocket connections inside the return function of useEffect.'
  },

  // Advanced Hooks
  {
    id: 'react-advanced-hooks',
    title: 'Advanced Hooks: useRef, useMemo, useCallback & useContext',
    category: 'Advanced Hooks',
    summary: 'Avoid unnecessary re-renders, manage DOM nodes, cache expensive calculations, and avoid prop drilling.',
    codeSnippet: `import { useRef, useMemo, useCallback, createContext, useContext } from 'react';

// 1. useRef: Access native DOM or store values WITHOUT triggering re-renders
export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus(); // directly invokes focus on DOM element
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Search..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

// 2. useMemo: Cache computationally heavy calculations
function DataAnalytics({ numbers }: { numbers: number[] }) {
  // Only recalculates when the 'numbers' array reference changes:
  const statistics = useMemo(() => {
    console.log("Computing heavy statistical calculation...");
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;
    return { sum, avg };
  }, [numbers]);

  return <div>Average: {statistics.avg}</div>;
}

// 3. useCallback: Preserves function instance between renders
// Pass to memoized children to avoid re-rendering them unnecessarily
function Parent() {
  const handleItemSelect = useCallback((itemId: string) => {
    console.log("Selected:", itemId);
  }, []); // stable reference across all parent re-renders

  return <ChildList onSelect={handleItemSelect} />;
}

// 4. useContext: Global state without prop drilling
const ThemeContext = createContext<{ dark: boolean; toggle: () => void } | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}`,
    explanation: 'useMemo caches calculated values; useCallback caches function definitions. useRef holds a mutable .current container that persists for the full lifecycle of the component without causing re-renders.',
    bestPractices: 'Do not prematurely memoize everything. Only use useMemo/useCallback when profiling identifies an actual performance bottleneck.'
  },

  // Forms & Architecture
  {
    id: 'react-forms-architecture',
    title: 'Controlled Forms & Custom Reusable Hooks',
    category: 'Forms & Architecture',
    summary: 'Build robust controlled forms with validation, and encapsulate reusable logic into custom hooks (e.g. useLocalStorage, useWindowSize).',
    codeSnippet: `import { useState, useEffect } from 'react';

// 1. Custom Hook: useLocalStorage (encapsulates browser storage logic)
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
}

// 2. Controlled Form with Validation
export function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subscribeNewsletter: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevents page refresh!
    console.log("Submitting form:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <label>
        <input name="subscribeNewsletter" type="checkbox" checked={formData.subscribeNewsletter} onChange={handleChange} />
        Receive Updates
      </label>
      <button type="submit">Register</button>
    </form>
  );
}`,
    explanation: 'Controlled forms store the inputs current value in React state, making form validation, conditional field rendering, and serialization straightforward and predictable.',
    bestPractices: 'Name custom hooks starting with "use" (e.g., useFetch, useDebounce) so the React linter can enforce the Rules of Hooks.'
  }
];
