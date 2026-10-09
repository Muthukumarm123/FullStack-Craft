export interface JsTopicItem {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Functions & Scope' | 'Arrays & Objects' | 'Async & Promises' | 'DOM & Events' | 'ES6+ & Web APIs';
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Core' | 'React-Crucial' | 'Express-Crucial';
  summary: string;
  mentalModel: string;
  whyNeededForReactOrExpress: string;
  stepByStepExplanation: string[];
  codeSnippet: string;
  outputDescription: string;
  deepDive: string;
  commonPitfalls: string;
  practiceChallenge: string;
}

export const JS_CATEGORIES = [
  'All',
  'Fundamentals',
  'Functions & Scope',
  'Arrays & Objects',
  'Async & Promises',
  'DOM & Events',
  'ES6+ & Web APIs',
] as const;

export const JS_TOPICS: JsTopicItem[] = [
  // 1. Variables & Types
  {
    id: 'js-variables-types',
    title: 'Variables (let, const) & Data Types',
    category: 'Fundamentals',
    estimatedMinutes: 25,
    difficulty: 'Beginner',
    summary: 'Master the difference between variables that can be changed (let) and fixed identifiers (const), plus primitives vs objects.',
    mentalModel: 'Think of variables as labeled storage boxes. "const" is a sealed box with a permanent label: you can never put a different box in its place. "let" is a box with an erasable label you can swap anytime.',
    whyNeededForReactOrExpress: 'In React, you will use "const" for 99% of variables (component names, hooks, props, imports). In Express, you use "const" to import libraries and declare routes.',
    stepByStepExplanation: [
      'Step 1: Declare variables with "const" by default. Only switch to "let" if you know the value will be reassigned (like a loop counter).',
      'Step 2: Primitive types (strings "hello", numbers 42, booleans true) are stored directly by value.',
      'Step 3: Objects and arrays are stored as a memory address reference. Even with const, you can edit what is inside the object (user.role = "admin"), but you cannot replace the whole object (user = {}).',
      'Step 4: "var" is old 1995 JavaScript that causes unpredictable scoping bugs. Never use var in modern code.'
    ],
    codeSnippet: `// 1. Primitives (Fixed, direct values)
const username = "Sarah";        // String (text)
const followerCount = 1420;      // Number
const isOnline = true;           // Boolean (true/false)
let currentStreak = 5;           // let allows reassignment!

currentStreak = 6;               // ✅ Allowed with let!
// username = "Alex";            // ❌ TypeError: Assignment to constant variable!

// 2. Reference Objects (Contents can change, box label stays fixed)
const userProfile = {
  name: "Sarah",
  role: "Junior Developer"
};

// You CAN modify keys inside a const object:
userProfile.role = "Full-Stack Engineer"; // ✅ Works!
console.log(userProfile.role);             // "Full-Stack Engineer"`,
    outputDescription: 'const protects the variable name binding from accidental reassignment, while let permits updating values.',
    deepDive: 'Primitive values are immutable in JavaScript memory. When you change currentStreak from 5 to 6, a new number 6 is allocated in memory. Objects and arrays, however, point to a heap address reference.',
    commonPitfalls: 'Thinking that "const" makes an object or array freeze. If you need an object to be completely unchangeable, use Object.freeze(obj).',
    practiceChallenge: 'Declare a const user object with your name and age. Then write code that updates the age by +1 without reassigning the user variable.'
  },

  // 2. Modern Operators
  {
    id: 'js-operators-modern',
    title: 'Modern Operators (??, ?., and ===)',
    category: 'Fundamentals',
    estimatedMinutes: 30,
    difficulty: 'React-Crucial',
    summary: 'Safely read nested data without crashing using Optional Chaining (?.), handle missing values cleanly with Nullish Coalescing (??), and check exact equality with ===.',
    mentalModel: 'Optional Chaining (?.) is like checking if a room has a door before trying to open it: if the room doesn\'t exist, you safely stop instead of breaking the wall (throwing a crash).',
    whyNeededForReactOrExpress: 'CRUCIAL FOR REACT & EXPRESS: When your React component fetches data from Express, data might take 200ms to arrive. If you write user.profile.avatar, your app will crash with "Cannot read property of undefined". Writing user?.profile?.avatar prevents crashes completely!',
    stepByStepExplanation: [
      'Step 1: Always use === (triple equals). Never use == (double equals) which tries to guess types and causes bugs (like 0 == false being true).',
      'Step 2: Use ?. when reading nested properties that might not have loaded yet from an API.',
      'Step 3: Use ?? (nullish coalescing) to provide a fallback only when something is null or undefined (unlike || which also replaces valid 0 or false).'
    ],
    codeSnippet: `// Simulated API response from an Express backend:
const apiResponse = {
  status: 200,
  user: {
    name: "Devon",
    settings: {
      theme: "dark"
      // notificationCount is missing or 0
    }
  }
};

// 1. Optional Chaining (?.) - Safe reading
// Without ?., this crashes the entire webpage:
const bio = apiResponse.user?.profile?.bio; 
console.log(bio); // undefined (safely didn't crash!)

// 2. Nullish Coalescing (??) vs Logical OR (||)
const zeroLikes = 0;

// Logical OR (||) mistakenly replaces 0 because 0 is "falsy":
console.log(zeroLikes || 10); // 10 (Wrong! User had 0 likes, not 10)

// Nullish Coalescing (??) preserves 0 because 0 is NOT null or undefined:
console.log(zeroLikes ?? 10); // 0 (Correct!)`,
    outputDescription: 'Optional chaining guarantees safety against empty API payloads; nullish coalescing guarantees number zeros are preserved.',
    deepDive: 'The Nullish operator tests specifically for nullish values (null and undefined), whereas the traditional OR operator (||) tests for falsy values (0, "", false, NaN, null, undefined).',
    commonPitfalls: 'Using || to set a fallback for numbers (like user.score || 100). If a player has a score of 0, it mistakenly gives them 100!',
    practiceChallenge: 'Write a small helper function that takes an object and safely returns user?.address?.zipCode ?? "Zip not provided".'
  },

  // 3. Arrow Functions
  {
    id: 'js-arrow-functions',
    title: 'Arrow Functions & Shorthand Syntax',
    category: 'Functions & Scope',
    estimatedMinutes: 30,
    difficulty: 'React-Crucial',
    summary: 'Arrow functions () => {} are the modern, concise way to write functions in JavaScript, powering all modern React components and Express route handlers.',
    mentalModel: 'Think of an arrow function like an algebraic formula: (inputs) => output. You give it inputs on the left of the arrow, and it produces the result on the right.',
    whyNeededForReactOrExpress: 'In React, almost every component and click handler is an arrow function: const Button = () => <button onClick={() => doSomething()} />. In Express, routes look like: app.get("/api/users", (req, res) => res.json([])).',
    stepByStepExplanation: [
      'Step 1: Standard function: function add(a, b) { return a + b; }',
      'Step 2: Arrow function: const add = (a, b) => { return a + b; }',
      'Step 3: Implicit return shorthand (one line): const add = (a, b) => a + b; (no curly braces and no "return" keyword needed!)',
      'Step 4: Arrow functions do not bind their own "this", making them safe to pass around into React event listeners.'
    ],
    codeSnippet: `// 1. Traditional function:
function greetTraditional(name) {
  return "Hello, " + name;
}

// 2. Modern Arrow Function (Full format):
const greetModern = (name) => {
  return \`Hello, \${name}\`;
};

// 3. One-line Concise Arrow Function (Implicit Return):
// When there are no curly braces, whatever is after => is automatically returned!
const double = (num) => num * 2;
console.log(double(5)); // 10

// 4. How you will use it constantly in React:
// const handleClick = () => alert("Button clicked!");
// <button onClick={handleClick}>Click Me</button>`,
    outputDescription: 'Arrow functions reduce boilerplate and make function definitions lightweight and readable.',
    deepDive: 'Unlike regular function declarations, arrow functions inherit the "this" value of the enclosing lexical execution context. This solved one of the oldest JavaScript headaches where regular callbacks would lose access to the parent class or component context.',
    commonPitfalls: 'Forgetting that wrapping a one-line arrow function in curly braces cancels the implicit return! (x) => { x * 2 } returns undefined. If you use curly braces, you MUST write the "return" keyword.',
    practiceChallenge: 'Convert this traditional function into a one-line arrow function with implicit return: function isEven(n) { return n % 2 === 0; }'
  },

  // 4. Destructuring & Spread
  {
    id: 'js-destructuring-spread',
    title: 'Destructuring & Spread Operator (...)',
    category: 'Arrays & Objects',
    estimatedMinutes: 40,
    difficulty: 'React-Crucial',
    summary: 'Unpack values from objects or arrays in one line, and copy or merge data immutably using the three dots (...).',
    mentalModel: 'Destructuring is like unboxing a delivery: instead of reaching into the big package 5 times (package.shoes, package.shirt), you pull out "shoes" and "shirt" directly onto the table. Spread (...) is like taking all items out of an existing box and scattering them into a brand new box with one extra item added.',
    whyNeededForReactOrExpress: 'THE #1 MOST COMMON REACT PATTERN! In React, component props are always destructured: function Card({ title, price }) { ... }. When updating React state: setState(prev => ({ ...prev, name: "New" })). In Express: const { username, password } = req.body.',
    stepByStepExplanation: [
      'Step 1: Object Destructuring: const { name, age } = user; creates two new variables directly from user.name and user.age.',
      'Step 2: Renaming & Defaults: const { name: fullName, role = "User" } = user;',
      'Step 3: Array Destructuring: const [first, second] = ["HTML", "CSS"]; (This is exactly how React\'s const [count, setCount] = useState(0) works!)',
      'Step 4: Spread Operator (...): Creates a shallow copy. const newArray = [...oldArray, "newItem"]. This avoids mutating original data!'
    ],
    codeSnippet: `// 1. Destructuring in action:
const product = {
  id: 101,
  title: "Mechanical Keyboard",
  price: 99,
  brand: "Keychron"
};

// Extract title and price directly into variables:
const { title, price } = product;
console.log(\`\${title} costs $\${price}\`); // "Mechanical Keyboard costs $99"

// 2. Destructuring React props (Preview of React):
function ProductCard({ title, price }) {
  // Can use title and price directly without writing "props.title"
  return \`Card: \${title} ($\${price})\`;
}

// 3. Spread Operator (...) for Immutable State Updates:
const user = { name: "Carlos", city: "Madrid" };

// Create updated copy WITHOUT changing original "user":
const updatedUser = {
  ...user,
  city: "Barcelona", // Overwrites city
  isPro: true        // Adds new property
};
console.log(updatedUser); // { name: "Carlos", city: "Barcelona", isPro: true }`,
    outputDescription: 'Destructuring extracts properties cleanly; the spread operator creates new objects without mutating the original.',
    deepDive: 'The spread operator performs a shallow copy. It copies primitive values directly, but nested objects will still share the same reference. In React, immutability is essential because React detects changes by comparing old vs new object references.',
    commonPitfalls: 'Mutating an array with array.push(item) in React instead of using the spread operator [...array, item]. React will not re-render if you mutate directly!',
    practiceChallenge: 'Given an object { brand: "Apple", model: "MacBook Air", year: 2022 }, write code that uses spread (...) to create a new object that upgrades the year to 2026 and adds color: "Space Gray".'
  },

  // 5. Array Methods (map, filter, reduce)
  {
    id: 'js-array-methods',
    title: 'Essential Array Methods (map, filter, reduce, find)',
    category: 'Arrays & Objects',
    estimatedMinutes: 45,
    difficulty: 'React-Crucial',
    summary: 'Transform, filter, and calculate array data cleanly without messy for-loops. Used constantly in React to render dynamic lists.',
    mentalModel: 'Think of .map() like a factory conveyor belt: every raw material that goes in gets transformed into a finished product and put into a new box. Think of .filter() like a security gate: only items that pass the test are allowed into the VIP section.',
    whyNeededForReactOrExpress: 'In React, .map() is how you render HTML lists: {users.map(u => <UserCard key={u.id} user={u} />)}. In Express, you use .find() to locate a user by ID and .filter() to delete an item from a list.',
    stepByStepExplanation: [
      'Step 1: .map() loops through an array, runs a function on each element, and returns a BRAND NEW array of the exact same length with the transformed items.',
      'Step 2: .filter() loops through an array, tests each item (returns true or false), and returns a new array with ONLY items that returned true.',
      'Step 3: .find() returns the FIRST single item that matches the condition (or undefined if not found).',
      'Step 4: .reduce() boils an entire array down to a single total value (like summing prices).'
    ],
    codeSnippet: `const courses = [
  { id: 1, name: "HTML & CSS", price: 0, completed: true },
  { id: 2, name: "JavaScript Mastery", price: 49, completed: true },
  { id: 3, name: "React Frontend", price: 79, completed: false },
  { id: 4, name: "Express & Node Backend", price: 69, completed: false }
];

// 1. .map() - Transform each item (e.g. get just the names)
const courseNames = courses.map(course => course.name);
console.log(courseNames);
// ["HTML & CSS", "JavaScript Mastery", "React Frontend", "Express & Node Backend"]

// 2. .filter() - Keep only incomplete courses
const pendingCourses = courses.filter(course => !course.completed);
console.log(pendingCourses.length); // 2

// 3. .find() - Look up a specific item by ID (used in Express routes!)
const jsCourse = courses.find(course => course.id === 2);
console.log(jsCourse.name); // "JavaScript Mastery"

// 4. .reduce() - Calculate total cost of all courses
const totalCost = courses.reduce((acc, course) => acc + course.price, 0);
console.log(\`Total Price: $\${totalCost}\`); // $197`,
    outputDescription: 'Functional array methods return new arrays without mutating the original, making state predictable.',
    deepDive: 'Always choose map() over forEach() when you want to transform an array. forEach() returns undefined and is only meant for side-effects, while map() returns the transformed array needed by React JSX.',
    commonPitfalls: 'Forgetting to provide an initial value (the second argument 0) to reduce(). Without an initial value, reduce() takes the first element as accumulator, which causes NaN errors with objects.',
    practiceChallenge: 'Given an array of numbers [5, 12, 8, 130, 44], use .filter() to keep only numbers greater than 10, then use .map() to double them.'
  },

  // 6. Closures & Scope
  {
    id: 'js-functions-closures',
    title: 'Closures & Lexical Scope (The Secret Behind React Hooks)',
    category: 'Functions & Scope',
    estimatedMinutes: 35,
    difficulty: 'Core',
    summary: 'A closure is when an inner function remembers variables from its outer function even after the outer function has finished running.',
    mentalModel: 'A closure is like a backpack. When a function is born inside another function, it packs all the variables around it into its backpack and carries them wherever it goes for the rest of its life.',
    whyNeededForReactOrExpress: 'This is the exact JavaScript mechanism that powers React\'s "useState"! When you call useState(), React remembers your state variable between renders using a JavaScript closure!',
    stepByStepExplanation: [
      'Step 1: In JavaScript, inner functions have access to variables defined in their outer parent functions.',
      'Step 2: When the parent function finishes executing and returns, the child function still preserves access to the parent\'s variables in memory.',
      'Step 3: This allows creating private variables that external code cannot tamper with directly.'
    ],
    codeSnippet: `// A closure in plain JavaScript:
function createCounter(initialScore = 0) {
  let score = initialScore; // "Private" variable packed in the closure

  return {
    scoreGoal: () => {
      score += 1;
      return \`Current score: \${score}\`;
    },
    getScore: () => score
  };
}

// Instantiate two completely independent counters:
const teamA = createCounter(0);
const teamB = createCounter(0);

console.log(teamA.scoreGoal()); // "Current score: 1"
console.log(teamA.scoreGoal()); // "Current score: 2"
console.log(teamB.getScore());  // 0 (Team B's score was not touched!)

// You CANNOT do: teamA.score = 999;
// The variable "score" is securely encapsulated inside the closure!`,
    outputDescription: 'Closures encapsulate state safely without polluting global variables.',
    deepDive: 'Every execution context in JavaScript has a Lexical Environment record and a reference to its outer environment. When a function returns a nested function, the garbage collector does not delete the outer variables if the child still holds a reference to them.',
    commonPitfalls: 'Creating closures inside loops with old "var" used to cause all callbacks to share the final loop value. Modern "let" creates a new lexical scope for each iteration, fixing this issue.',
    practiceChallenge: 'Create a function createGreeter(greeting) that returns a function that takes a name and prints "\${greeting}, \${name}!". Test it with createGreeter("Welcome")("Alex").'
  },

  // 7. Async / Await & Fetch
  {
    id: 'js-async-promises',
    title: 'Asynchronous JavaScript: Promises, async/await & fetch()',
    category: 'Async & Promises',
    estimatedMinutes: 50,
    difficulty: 'Express-Crucial',
    summary: 'Handle operations that take time (like downloading data from a database or API) without freezing the user interface.',
    mentalModel: 'Think of a restaurant buzzer (pager). When you order food (fetch), the cashier doesn\'t make everyone behind you stand still until your burger is cooked. Instead, they give you a buzzer (a Promise). You sit down, and when the buzzer vibrates ("await"), you pick up your hot food.',
    whyNeededForReactOrExpress: 'THIS IS HOW WEBSITES TALK TO SERVERS! Your React frontend uses "async/await" and "fetch()" to ask Express for data. Your Express server uses "async/await" to read files or query databases.',
    stepByStepExplanation: [
      'Step 1: Network requests take time (50ms - 2000ms). JavaScript cannot freeze the whole browser while waiting.',
      'Step 2: A Promise represents a future value that is currently "pending", and will eventually be "fulfilled" or "rejected".',
      'Step 3: "async" marks a function as asynchronous. "await" pauses execution inside that function until the Promise resolves, without blocking other browser tasks.',
      'Step 4: Always wrap async/await in try { ... } catch (error) { ... } to handle offline networks or broken URLs gracefully.'
    ],
    codeSnippet: `// How React fetches data from an Express backend:
async function loadUserData(userId) {
  try {
    console.log("Fetching user from server...");
    
    // 1. Send HTTP GET request to backend:
    const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);

    // 2. Always verify HTTP status (200-299 OK)
    if (!response.ok) {
      throw new Error(\`Server returned status \${response.status}\`);
    }

    // 3. Parse JSON response body into a JavaScript object:
    const userData = await response.json();
    console.log("User received:", userData.name);
    return userData;
  } catch (error) {
    // 4. Handles network failures or errors gracefully:
    console.error("Could not fetch user:", error.message);
  }
}

// Calling the async function:
loadUserData(1);`,
    outputDescription: 'async/await writes asynchronous code that looks and reads like clean synchronous code.',
    deepDive: 'Under the hood, async/await is syntactic sugar over native Promises and microtasks. When JavaScript encounters "await", it yields control back to the Event Loop, allowing the browser to render frames and handle user clicks.',
    commonPitfalls: 'Forgetting that fetch() does NOT reject on HTTP 404 or 500 errors! It only rejects on total network disconnection. You must always check if (!response.ok) yourself!',
    practiceChallenge: 'Write an async function that fetches a post from https://jsonplaceholder.typicode.com/posts/1 and logs the title.'
  },

  // 8. ES Modules (import / export)
  {
    id: 'js-modules-import-export',
    title: 'ES Modules: import and export',
    category: 'ES6+ & Web APIs',
    estimatedMinutes: 25,
    difficulty: 'React-Crucial',
    summary: 'Break large web applications into small, clean, reusable files and share code with import and export.',
    mentalModel: 'Think of modules like Lego bricks in separate labeled compartments. Instead of dumping all 10,000 bricks in one huge messy bin (a giant 5,000-line script), you keep wheels in wheels.js and wings in wings.js, importing only what you need.',
    whyNeededForReactOrExpress: 'Every single React component and Express router file starts with import statements (import React from "react", import express from "express") and ends with export default MyComponent.',
    stepByStepExplanation: [
      'Step 1: Named Exports: export const add = (a, b) => a + b; (You can have multiple named exports per file).',
      'Step 2: Named Import: import { add, subtract } from "./math.js"; (Must match the exact name inside curly braces).',
      'Step 3: Default Export: export default function App() { ... } (Only ONE default export per file).',
      'Step 4: Default Import: import App from "./App.js"; (No curly braces; you can name it whatever you like).'
    ],
    codeSnippet: `// File 1: /src/utils/math.js
export const TAX_RATE = 0.08; // Named export

export function calculateTotal(subtotal) {
  return subtotal + (subtotal * TAX_RATE);
}

// Default export (main purpose of the file)
export default function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}

// ----------------------------------------
// File 2: /src/components/Checkout.js
// Importing default formatCurrency, plus named TAX_RATE and calculateTotal:
import formatCurrency, { TAX_RATE, calculateTotal } from '../utils/math.js';

const orderPrice = 100;
const finalAmount = calculateTotal(orderPrice);
console.log(formatCurrency(finalAmount)); // "$108.00"`,
    outputDescription: 'Modules isolate scope so variables in one file do not accidentally overwrite variables in another.',
    deepDive: 'ES Modules are statically analyzed at compile time before execution, which allows modern bundlers like Vite to perform "Tree Shaking"—automatically discarding unused exported functions to keep bundle sizes tiny.',
    commonPitfalls: 'Putting curly braces around a default import (import { formatCurrency } from ...) or forgetting curly braces for a named import.',
    practiceChallenge: 'Write a small module file that exports a default function sayHello(name) and a named constant DEFAULT_USER = "Guest".'
  }
];
