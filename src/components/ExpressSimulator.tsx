import React, { useState } from 'react';
import { Play, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Server, Send } from 'lucide-react';

interface SimulatedRequest {
  id: string;
  method: 'GET' | 'POST' | 'DELETE';
  endpoint: string;
  description: string;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

const SAMPLE_REQUESTS: SimulatedRequest[] = [
  {
    id: 'req-get-all',
    method: 'GET',
    endpoint: '/api/notes',
    description: 'Fetch all notes from the server collection.'
  },
  {
    id: 'req-post-note',
    method: 'POST',
    endpoint: '/api/notes',
    description: 'Send a new note in req.body to be created.',
    body: { title: 'Master Express Middleware', content: 'Understand req, res, and next()' }
  },
  {
    id: 'req-get-one',
    method: 'GET',
    endpoint: '/api/notes/1',
    description: 'Fetch single note using route param req.params.id.'
  },
  {
    id: 'req-delete-one',
    method: 'DELETE',
    endpoint: '/api/notes/1',
    description: 'Remove note with ID 1 from database.'
  },
  {
    id: 'req-auth-valid',
    method: 'GET',
    endpoint: '/api/admin/metrics',
    description: 'Access protected route with valid API key header.',
    headers: { 'x-api-key': 'secret-key-123' }
  },
  {
    id: 'req-auth-fail',
    method: 'GET',
    endpoint: '/api/admin/metrics',
    description: 'Attempt accessing protected route without API key (Triggers 401).',
    headers: {}
  }
];

export const ExpressSimulator: React.FC = () => {
  const [activeReq, setActiveReq] = useState<SimulatedRequest>(SAMPLE_REQUESTS[0]);
  const [simulating, setSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(0);

  // Simulated server state
  const [mockNotes, setMockNotes] = useState([
    { id: 1, title: 'Learn HTML Semantics', content: 'Study article, nav, header, main' },
    { id: 2, title: 'Learn Modern CSS', content: 'Flexbox, Grid, container queries' }
  ]);

  const executeRequest = async (reqToRun: SimulatedRequest) => {
    setSimulating(true);
    setCurrentStep(1); // Step 1: Request Arrives
    setResponseStatus(null);
    setResponseData(null);

    const startTime = performance.now();

    // Step 2: CORS Middleware
    await new Promise(r => setTimeout(r, 220));
    setCurrentStep(2);

    // Step 3: express.json() Body Parser
    await new Promise(r => setTimeout(r, 220));
    setCurrentStep(3);

    // Step 4: Auth middleware check if protected
    await new Promise(r => setTimeout(r, 220));
    setCurrentStep(4);

    if (reqToRun.endpoint.startsWith('/api/admin')) {
      if (reqToRun.headers?.['x-api-key'] !== 'secret-key-123') {
        const elapsed = Math.round(performance.now() - startTime);
        setExecutionTimeMs(elapsed);
        setResponseStatus(401);
        setResponseData({ error: 'Unauthorized: Invalid or missing API key in headers' });
        setCurrentStep(5);
        setSimulating(false);
        return;
      }
    }

    // Step 5: Route Handler Execution
    await new Promise(r => setTimeout(r, 260));
    setCurrentStep(5);

    let status = 200;
    let data: any = {};

    if (reqToRun.endpoint === '/api/notes' && reqToRun.method === 'GET') {
      status = 200;
      data = mockNotes;
    } else if (reqToRun.endpoint === '/api/notes' && reqToRun.method === 'POST') {
      const newNote = {
        id: Date.now(),
        title: reqToRun.body?.title || 'Untitled',
        content: reqToRun.body?.content || ''
      };
      setMockNotes(prev => [...prev, newNote]);
      status = 201;
      data = newNote;
    } else if (reqToRun.endpoint === '/api/notes/1' && reqToRun.method === 'GET') {
      const found = mockNotes.find(n => n.id === 1);
      if (found) {
        status = 200;
        data = found;
      } else {
        status = 404;
        data = { error: 'Note not found with ID 1' };
      }
    } else if (reqToRun.endpoint === '/api/notes/1' && reqToRun.method === 'DELETE') {
      setMockNotes(prev => prev.filter(n => n.id !== 1));
      status = 200;
      data = { message: 'Note 1 deleted successfully' };
    } else if (reqToRun.endpoint === '/api/admin/metrics') {
      status = 200;
      data = {
        systemUptimeSec: 14209,
        activeConnections: 42,
        memoryUsageMB: 78.4,
        status: 'nominal'
      };
    }

    const elapsed = Math.round(performance.now() - startTime);
    setExecutionTimeMs(elapsed);
    setResponseStatus(status);
    setResponseData(data);
    setSimulating(false);
  };

  const handleSelectReq = (req: SimulatedRequest) => {
    setActiveReq(req);
    setCurrentStep(0);
    setResponseStatus(null);
    setResponseData(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Interactive Express.js Server Simulator
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Trigger simulated HTTP requests to observe the live middleware pipeline, routing dispatch, and JSON response lifecycle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Request Chooser & Trigger (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-sm font-semibold text-slate-200">Simulate Client Request</h2>
            <span className="text-[11px] text-indigo-400 font-mono">React Frontend Client</span>
          </div>

          <div className="space-y-2">
            {SAMPLE_REQUESTS.map(req => {
              const isSelected = activeReq.id === req.id;
              const methodColor =
                req.method === 'GET'
                  ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
                  : req.method === 'POST'
                  ? 'text-indigo-400 bg-indigo-950/60 border-indigo-800'
                  : 'text-rose-400 bg-rose-950/60 border-rose-800';

              return (
                <button
                  key={req.id}
                  onClick={() => handleSelectReq(req)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-indigo-500 shadow-sm'
                      : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${methodColor}`}>
                      {req.method}
                    </span>
                    <span className="font-mono text-xs text-slate-200 truncate">{req.endpoint}</span>
                  </div>
                  <p className="text-xs text-slate-400">{req.description}</p>
                </button>
              );
            })}
          </div>

          {/* Request Payload details if POST */}
          {activeReq.body && (
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1 font-mono">Request Payload (JSON):</span>
              <pre className="font-mono text-xs text-indigo-300 overflow-x-auto">
                {JSON.stringify(activeReq.body, null, 2)}
              </pre>
            </div>
          )}

          {/* Trigger button */}
          <button
            onClick={() => executeRequest(activeReq)}
            disabled={simulating}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            {simulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Middleware Pipeline...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send {activeReq.method} {activeReq.endpoint}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Execution Pipeline & Response Inspector (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Visual Pipeline Stages */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Express.js Request-Response Cycle
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {/* Stage 1 */}
              <div
                className={`p-3 rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  currentStep >= 1
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">Step 1</div>
                <div className="text-xs font-semibold">HTTP Request</div>
                <div className="text-[10px] text-slate-400 font-mono">{activeReq.method}</div>
              </div>

              {/* Stage 2 */}
              <div
                className={`p-3 rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  currentStep >= 2
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">Step 2</div>
                <div className="text-xs font-semibold">cors()</div>
                <div className="text-[10px] text-slate-400">Headers OK</div>
              </div>

              {/* Stage 3 */}
              <div
                className={`p-3 rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  currentStep >= 3
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">Step 3</div>
                <div className="text-xs font-semibold">express.json()</div>
                <div className="text-[10px] text-slate-400">req.body</div>
              </div>

              {/* Stage 4 */}
              <div
                className={`p-3 rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  currentStep >= 4
                    ? responseStatus === 401
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">Step 4</div>
                <div className="text-xs font-semibold">Guards</div>
                <div className="text-[10px] text-slate-400">
                  {responseStatus === 401 ? 'Blocked 401' : 'next() Passed'}
                </div>
              </div>

              {/* Stage 5 */}
              <div
                className={`p-3 rounded-lg border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  currentStep >= 5
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">Step 5</div>
                <div className="text-xs font-semibold">Route Handler</div>
                <div className="text-[10px] text-slate-400">res.json()</div>
              </div>
            </div>
          </div>

          {/* Response Inspector */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-200">Express Response Inspector</span>
                {responseStatus && (
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      responseStatus >= 200 && responseStatus < 300
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : responseStatus === 401
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    HTTP {responseStatus}
                  </span>
                )}
              </div>
              {executionTimeMs > 0 && (
                <span className="text-[11px] font-mono text-slate-500">
                  Latency: {executionTimeMs}ms
                </span>
              )}
            </div>

            <div className="p-4 bg-slate-950 min-h-[160px] font-mono text-xs">
              {responseData ? (
                <pre className="text-emerald-300 overflow-x-auto leading-relaxed">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center text-slate-600 gap-2">
                  <Server className="w-6 h-6" />
                  <span>Click "Send Request" above to simulate route execution</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
