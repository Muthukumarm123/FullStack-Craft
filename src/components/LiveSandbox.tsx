import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Layout, Eye, Sparkles } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  category: string;
  html: string;
  css: string;
  js: string;
}

const PRESETS: Preset[] = [
  {
    id: 'product-card',
    name: 'Product Card (HTML + Flexbox)',
    category: 'HTML & CSS',
    html: `<div class="card">
  <div class="card-badge">New Arrival</div>
  <div class="card-img-placeholder">
    <span class="icon">⚡</span>
  </div>
  <div class="card-body">
    <h3 class="card-title">Wireless Studio Headphones</h3>
    <p class="card-desc">Active noise-canceling with 40-hour battery life and spatial audio driver.</p>
    <div class="card-footer">
      <span class="price">$199.00</span>
      <button class="buy-btn" onclick="handleBuy()">Add to Cart</button>
    </div>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 32px 16px;
  background-color: #090d16;
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
}

.card {
  width: 320px;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  position: relative;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: #4f46e5;
}

.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #4f46e5;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 9999px;
  z-index: 10;
}

.card-img-placeholder {
  height: 140px;
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 40px;
}

.card-body {
  padding: 20px;
}

.card-title {
  margin: 0 0 8px 0;
  color: #f9fafb;
  font-size: 17px;
  font-weight: 600;
}

.card-desc {
  margin: 0 0 16px 0;
  color: #9ca3af;
  font-size: 13px;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #38bdf8;
}

.buy-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;
}

.buy-btn:hover {
  background: #4338ca;
}`,
    js: `function handleBuy() {
  console.log("Product added to cart!");
  const btn = document.querySelector('.buy-btn');
  btn.textContent = "✓ In Cart";
  btn.style.background = "#10b981";
  setTimeout(() => {
    btn.textContent = "Add to Cart";
    btn.style.background = "#4f46e5";
  }, 2000);
}`
  },
  {
    id: 'interactive-todo',
    name: 'Todo & Counter (HTML + CSS + JS)',
    category: 'Full Frontend',
    html: `<div class="todo-app">
  <div class="header">
    <h2>Task Tracker</h2>
    <div class="counter">
      Completed: <span id="done-count">0</span> / <span id="total-count">2</span>
    </div>
  </div>

  <div class="input-group">
    <input id="task-input" type="text" placeholder="Add a new task..." />
    <button id="add-btn" onclick="addTask()">Add</button>
  </div>

  <ul id="task-list">
    <li class="task-item" onclick="toggleTask(this)">
      <span>Master HTML Semantic Elements</span>
      <button class="delete-btn" onclick="deleteTask(event, this)">✕</button>
    </li>
    <li class="task-item" onclick="toggleTask(this)">
      <span>Understand CSS Flexbox & Grid</span>
      <button class="delete-btn" onclick="deleteTask(event, this)">✕</button>
    </li>
  </ul>
</div>`,
    css: `body {
  margin: 0;
  padding: 24px;
  background-color: #0b0f19;
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  justify-content: center;
}

.todo-app {
  width: 100%;
  max-width: 380px;
  background: #131b2e;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 20px;
  color: #f1f5f9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 12px;
}

.header h2 {
  margin: 0;
  font-size: 18px;
  color: #e2e8f0;
}

.counter {
  font-size: 12px;
  color: #818cf8;
}

.input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

#task-input {
  flex: 1;
  background: #0b0f19;
  border: 1px solid #334155;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  outline: none;
}

#task-input:focus {
  border-color: #6366f1;
}

#add-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
}

#task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-item {
  background: #0f172a;
  border: 1px solid #1e293b;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.task-item:hover {
  border-color: #475569;
}

.task-item.completed {
  text-decoration: line-through;
  color: #64748b;
  background: #090d16;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.15);
}`,
    js: `function updateStats() {
  const items = document.querySelectorAll('.task-item');
  const completed = document.querySelectorAll('.task-item.completed');
  document.getElementById('total-count').textContent = items.length;
  document.getElementById('done-count').textContent = completed.length;
}

function toggleTask(item) {
  item.classList.toggle('completed');
  updateStats();
  console.log("Toggled task completion status");
}

function deleteTask(event, btn) {
  event.stopPropagation();
  const li = btn.closest('li');
  li.remove();
  updateStats();
  console.log("Deleted task");
}

function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'task-item';
  li.onclick = function() { toggleTask(this); };
  li.innerHTML = '<span>' + text + '</span><button class=\"delete-btn\" onclick=\"deleteTask(event, this)\">✕</button>';

  document.getElementById('task-list').appendChild(li);
  input.value = '';
  updateStats();
  console.log("Added new task:", text);
}

document.getElementById('task-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});`
  },
  {
    id: 'native-dialog',
    name: 'Native Modal (<dialog>)',
    category: 'HTML & JS',
    html: `<div class="container">
  <h2>HTML5 Native Modal Dialog</h2>
  <p>Uses the semantic &lt;dialog&gt; element with built-in backdrop and ESC key listener.</p>
  <button class="open-btn" onclick="openModal()">Open Native Dialog</button>

  <dialog id="demo-dialog">
    <div class="dialog-content">
      <div class="dialog-header">
        <h3>Confirmation Required</h3>
        <button class="close-x" onclick="closeModal()">✕</button>
      </div>
      <p>This dialog runs using HTML5's top-layer standard. No third-party modal library required!</p>
      <div class="dialog-actions">
        <button class="cancel-btn" onclick="closeModal()">Cancel</button>
        <button class="confirm-btn" onclick="confirmAction()">Proceed</button>
      </div>
    </div>
  </dialog>
</div>`,
    css: `body {
  margin: 0;
  padding: 32px;
  background-color: #0b0f19;
  font-family: system-ui, -apple-system, sans-serif;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  text-align: center;
  max-width: 400px;
}

h2 { margin-top: 0; font-size: 20px; }
p { color: #94a3b8; font-size: 14px; line-height: 1.5; }

.open-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
}

dialog {
  background: #1e293b;
  color: #f8fafc;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  max-width: 360px;
  width: 90%;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}

.dialog-content {
  padding: 20px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.dialog-header h3 { margin: 0; font-size: 16px; }
.close-x { background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 16px; }

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  background: #334155;
  color: #e2e8f0;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.confirm-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
}`,
    js: `const dialog = document.getElementById('demo-dialog');

function openModal() {
  dialog.showModal(); // Opens modal with ::backdrop
  console.log("Dialog opened via showModal()");
}

function closeModal() {
  dialog.close();
  console.log("Dialog closed");
}

function confirmAction() {
  console.log("Action confirmed!");
  closeModal();
}`
  }
];

export const LiveSandbox: React.FC = () => {
  const [activePreset, setActivePreset] = useState<Preset>(PRESETS[0]);
  const [htmlCode, setHtmlCode] = useState(PRESETS[0].html);
  const [cssCode, setCssCode] = useState(PRESETS[0].css);
  const [jsCode, setJsCode] = useState(PRESETS[0].js);
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css' | 'js'>('html');
  const [logs, setLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const selectPreset = (preset: Preset) => {
    setActivePreset(preset);
    setHtmlCode(preset.html);
    setCssCode(preset.css);
    setJsCode(preset.js);
    setLogs([]);
  };

  const resetCode = () => {
    setHtmlCode(activePreset.html);
    setCssCode(activePreset.css);
    setJsCode(activePreset.js);
    setLogs([]);
  };

  const copyCurrentCode = () => {
    const full = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}\n\n// JavaScript\n${jsCode}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compile code into iframe
  useEffect(() => {
    const srcDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>
            // Intercept console.log to communicate back to parent frame
            const originalLog = console.log;
            console.log = (...args) => {
              originalLog(...args);
              window.parent.postMessage({
                type: 'SANDBOX_LOG',
                message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
              }, '*');
            };
            window.onerror = (msg) => {
              window.parent.postMessage({
                type: 'SANDBOX_LOG',
                message: '[Error]: ' + msg
              }, '*');
            };
            try {
              ${jsCode}
            } catch (err) {
              console.log("[Script Error]: " + err.message);
            }
          </script>
        </body>
      </html>
    `;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = srcDoc;
    }
  }, [htmlCode, cssCode, jsCode]);

  // Listen for iframe logs
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'SANDBOX_LOG') {
        setLogs(prev => [...prev.slice(-15), e.data.message]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Area */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interactive Code Sandbox
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Write and execute real HTML5, modern CSS, and vanilla JavaScript with live browser rendering.
          </p>
        </div>

        {/* Preset selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-slate-400 whitespace-nowrap">Template:</span>
          {PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => selectPreset(preset)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activePreset.id === preset.id
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Preview Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Side: Code Editor */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-lg min-h-[500px]">
          {/* Editor Header Bar */}
          <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveEditorTab('html')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                  activeEditorTab === 'html'
                    ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveEditorTab('css')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                  activeEditorTab === 'css'
                    ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveEditorTab('js')}
                className={`px-3 py-1 text-xs rounded font-medium transition-colors cursor-pointer ${
                  activeEditorTab === 'js'
                    ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                JavaScript
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyCurrentCode}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Copy full code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={resetCode}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Reset code to template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with monospace font */}
          <div className="flex-1 p-3 bg-slate-950 font-mono text-xs">
            {activeEditorTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={e => setHtmlCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] bg-transparent text-emerald-300 resize-none outline-none leading-relaxed"
                placeholder="<!-- Write HTML here -->"
              />
            )}
            {activeEditorTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={e => setCssCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] bg-transparent text-cyan-300 resize-none outline-none leading-relaxed"
                placeholder="/* Write CSS here */"
              />
            )}
            {activeEditorTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={e => setJsCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] bg-transparent text-amber-300 resize-none outline-none leading-relaxed"
                placeholder="// Write JavaScript here"
              />
            )}
          </div>
        </div>

        {/* Right Side: Live Render & Console */}
        <div className="flex flex-col gap-4">
          {/* Live Preview Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-lg flex-1 min-h-[340px]">
            <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">Live Browser Output</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Isolated Sandbox</span>
            </div>

            <div className="flex-1 bg-slate-950 p-2">
              <iframe
                ref={iframeRef}
                title="Live Sandbox"
                sandbox="allow-scripts allow-modals"
                className="w-full h-full min-h-[300px] border-0 rounded-lg bg-slate-950"
              />
            </div>
          </div>

          {/* Interactive Console Output */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg h-[160px] flex flex-col">
            <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-slate-300">Console Logs</span>
              </div>
              <button
                onClick={() => setLogs([])}
                className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 p-3 font-mono text-xs overflow-y-auto space-y-1 bg-slate-950 text-slate-300">
              {logs.length === 0 ? (
                <span className="text-slate-600 italic">No console logs yet. Trigger actions in the preview.</span>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className={log.startsWith('[Error]') ? 'text-red-400' : 'text-slate-200'}>
                      {log}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
