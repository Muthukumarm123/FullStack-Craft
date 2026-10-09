export interface QuizQuestion {
  id: string;
  topic: 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'Express';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // HTML
  {
    id: 'q-html-1',
    topic: 'HTML',
    question: 'Why is <!DOCTYPE html> required at the top of an HTML document?',
    options: [
      'It loads external JavaScript libraries.',
      'It instructs the browser to render the page in standard HTML5 mode rather than legacy quirks mode.',
      'It links the default CSS stylesheet.',
      'It is an optional comment for search engines.'
    ],
    correctIndex: 1,
    explanation: '<!DOCTYPE html> prevents browsers from falling back to archaic quirks mode, guaranteeing modern CSS and standards compliance.'
  },
  {
    id: 'q-html-2',
    topic: 'HTML',
    question: 'Which element is semantically ideal for a self-contained blog post or forum thread that could be independently syndicated?',
    options: ['<section>', '<div>', '<article>', '<aside>'],
    correctIndex: 2,
    explanation: '<article> represents an independent, self-contained piece of composition that can be distributed outside the page context.'
  },
  {
    id: 'q-html-3',
    topic: 'HTML',
    question: 'What is the correct way to link an <input> with its corresponding descriptive <label>?',
    options: [
      'Give both elements the same class name.',
      'Match the label\'s "for" attribute to the input\'s "id" attribute.',
      'Wrap both in an <i> tag.',
      'Set the label\'s "name" attribute equal to the input\'s "type".'
    ],
    correctIndex: 1,
    explanation: 'Setting label for="userId" matching input id="userId" links them for screen readers and allows clicking the label to focus the input.'
  },

  // CSS
  {
    id: 'q-css-1',
    topic: 'CSS',
    question: 'What does "box-sizing: border-box" do to element sizing calculations?',
    options: [
      'It removes all margins from the element.',
      'It forces borders to become circular.',
      'It includes padding and border within the defined width and height.',
      'It causes elements to ignore CSS Grid rules.'
    ],
    correctIndex: 2,
    explanation: 'With border-box, an element with width: 300px and padding: 20px stays exactly 300px wide, absorbing the padding inside.'
  },
  {
    id: 'q-css-2',
    topic: 'CSS',
    question: 'In Flexbox, which property aligns flex items along the perpendicular (cross) axis?',
    options: ['justify-content', 'align-items', 'flex-direction', 'gap'],
    correctIndex: 1,
    explanation: 'justify-content aligns on the main axis, while align-items controls alignment on the cross axis.'
  },
  {
    id: 'q-css-3',
    topic: 'CSS',
    question: 'What revolutionary capability does the :has() pseudo-class introduce in modern CSS?',
    options: [
      'It acts as a parent selector, styling an element based on its descendants or subsequent siblings.',
      'It loads external web fonts faster.',
      'It enables 3D GPU graphics without WebGL.',
      'It automatically translates text into different languages.'
    ],
    correctIndex: 0,
    explanation: ':has() is CSS\'s parent selector (e.g., .card:has(img) styles the card only when it contains an image).'
  },

  // JavaScript
  {
    id: 'q-js-1',
    topic: 'JavaScript',
    question: 'What is the key difference between nullish coalescing (??) and logical OR (||)?',
    options: [
      '?? works only with arrays, whereas || works with strings.',
      '?? defaults ONLY on null or undefined, while || treats 0, "", and false as falsy.',
      '|| is asynchronous, while ?? is synchronous.',
      'There is no difference; they are exact aliases.'
    ],
    correctIndex: 1,
    explanation: '0 || 10 evaluates to 10 (overriding 0), whereas 0 ?? 10 preserves 0 because 0 is not nullish (null or undefined).'
  },
  {
    id: 'q-js-2',
    topic: 'JavaScript',
    question: 'What is a JavaScript closure?',
    options: [
      'A method that closes browser windows.',
      'An inner function retaining access to its enclosing lexical scope even after the outer function has returned.',
      'A syntax error when closing brackets are missing.',
      'A way to delete variables from memory immediately.'
    ],
    correctIndex: 1,
    explanation: 'A closure is created when a function remembers and accesses variables from its lexical environment where it was defined.'
  },
  {
    id: 'q-js-3',
    topic: 'JavaScript',
    question: 'How does event delegation improve application performance?',
    options: [
      'It removes all event listeners from the DOM.',
      'It attaches a single listener to a common ancestor rather than dozens of listeners to individual child elements.',
      'It forces events to run in parallel Web Workers.',
      'It prevents users from clicking buttons twice.'
    ],
    correctIndex: 1,
    explanation: 'Event delegation leverages event bubbling to handle events on hundreds of items with one lightweight parent listener.'
  },

  // React
  {
    id: 'q-react-1',
    topic: 'React',
    question: 'Why should you never mutate React state directly like "todos.push(newTodo)"?',
    options: [
      'Because JavaScript arrays do not support the push method.',
      'Because React checks Object.is reference equality; mutating in-place will not trigger a re-render.',
      'Because pushing to an array will crash the browser tab.',
      'Because React state only accepts primitive numbers.'
    ],
    correctIndex: 1,
    explanation: 'React compares state references. If the object/array reference does not change, React assumes nothing changed and skips re-rendering.'
  },
  {
    id: 'q-react-2',
    topic: 'React',
    question: 'What is the purpose of the cleanup function returned from a useEffect hook?',
    options: [
      'To clear the browser history.',
      'To reset all component state to zero.',
      'To clean up subscriptions, timers, or abort fetches before the effect re-runs or when the component unmounts.',
      'To format the component\'s TypeScript code.'
    ],
    correctIndex: 2,
    explanation: 'The return function inside useEffect runs before the effect executes again and when the component unmounts, preventing memory leaks.'
  },
  {
    id: 'q-react-3',
    topic: 'React',
    question: 'When should you use the useRef hook instead of useState?',
    options: [
      'When you need to store data that should immediately re-render the UI on change.',
      'When accessing a DOM element directly or storing a mutable value that shouldn\'t trigger re-renders.',
      'When making network fetch requests to Express.',
      'When defining component prop types.'
    ],
    correctIndex: 1,
    explanation: 'useRef creates a mutable container whose .current property persists across renders without causing the component to re-render.'
  },

  // Express
  {
    id: 'q-express-1',
    topic: 'Express',
    question: 'What is the crucial role of "app.use(express.json())" in an Express server?',
    options: [
      'It converts JavaScript objects to XML format.',
      'It parses incoming JSON request bodies, populating req.body with readable data.',
      'It compresses responses using gzip.',
      'It secures passwords with bcrypt.'
    ],
    correctIndex: 1,
    explanation: 'Without express.json() middleware, req.body will be undefined on incoming POST and PUT requests.'
  },
  {
    id: 'q-express-2',
    topic: 'Express',
    question: 'How does Express distinguish a global error-handling middleware from regular middleware?',
    options: [
      'It must be named "errorRouter".',
      'It takes exactly four parameters: (err, req, res, next).',
      'It must return a Promise.',
      'It is registered inside package.json.'
    ],
    correctIndex: 1,
    explanation: 'Express inspects function arity (length); a function with 4 arguments (err, req, res, next) is treated specifically as an error handler.'
  },
  {
    id: 'q-express-3',
    topic: 'Express',
    question: 'Why is CORS (Cross-Origin Resource Sharing) middleware required when connecting React to Express?',
    options: [
      'Because React and Express use different versions of JavaScript.',
      'Because browsers block cross-origin HTTP requests between different ports (e.g. port 5173 to port 5000) for security.',
      'Because Express cannot send JSON without CORS.',
      'Because Node.js cannot run without CORS installed.'
    ],
    correctIndex: 1,
    explanation: 'The browser Same-Origin Policy blocks frontend requests to a different port unless the backend explicitly allows it via CORS headers.'
  }
];
