import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoadmapCard from '../components/RoadmapCard';
import RoadmapOverlay from '../components/RoadmapOverlay';
import { roadmapsData } from '../data/roadmapsData';

const local = {
  cat_typing: '/gifs/cat_typing.gif',
  cat_sleep: '/gifs/cat_sleep.gif',
  cat_gamer: '/gifs/cat_gamer.gif',
  cat_mouth_open: '/gifs/cat_mouth_open.gif',
  cat_paw: '/gifs/cat_paw.gif',
  tech_plotly: '/gifs/tech_plotly.gif',
  tech_sql: '/gifs/tech_sql.gif',
  placeholder: '/gifs/placeholder.png',
  sound: '/sounds/intro_chiptune.wav',
};

// ---- Rich, explicit roadmap details (feel free to move to data/roadmapsData.js later) ----
const detailed = {
  
  vscode: {
    title: 'VSCode Setup — dev environment (one-time setup)',
    overview:
      'Step-by-step VSCode setup for a data & Python workflow. Add screenshots where prompted.',
    steps: [
      {
        title: 'Install & Basics',
        items: [
          'Download VSCode (stable) and install.',
          'Open your project folder (File → Open Folder). Use the integrated terminal (Ctrl+`)',
        ],
      },
      {
        title: 'Extensions to install',
        items: [
          'Python (Microsoft) — language server, linting, debugging',
          'Pylance — improved type checking & IntelliSense',
          'Prettier or Black (formatting) — pick one for consistent formatting',
          'GitLens — better Git UI inside VSCode',
          'Docker (if you use Docker)',
          'Remote - Containers (optional, for reproducible dev containers)',
        ],
      },
      {
        title: 'Settings & Workspace',
        items: [
          'Create `.vscode/settings.json` for workspace settings (python.pythonPath, formatOnSave).',
          'Recommended settings snippet to add:',
          '```json\n{\n  \"editor.formatOnSave\": true,\n  \"python.languageServer\": \"Pylance\",\n  \"python.analysis.typeCheckingMode\": \"basic\"\n}\n```',
        ],
      },
      {
        title: 'Debugging',
        items: [
          'Create a `launch.json` to debug Python scripts or FastAPI uvicorn runs.',
          'Use breakpoints and the debug console for step-by-step debugging.',
        ],
      },
      {
        title: 'Snippets & Tasks',
        items: [
          'Add custom snippets for common imports (pandas, plotly) if you like.',
          'Create `tasks.json` for common tasks (run tests, lint, start dev server).',
        ],
      },
      {
        title: 'Screenshots & Tips (placeholders)',
        items: [
          'Screenshot 1: VSCode open folder view (add here).',
          'Screenshot 2: Extensions panel showing Python, Pylance, GitLens.',
          'Screenshot 3: Debugger run config.',
        ],
      },
    ],
    resources: [
      'https://code.visualstudio.com/docs/python/python-tutorial',
      'https://code.visualstudio.com/docs/editor/debugging',
    ],
  },
  python: {
    title: 'Python — Real Skills (6 weeks)',
    overview:
      'Move from notebook tinkerer to reliable engineer: scripts, packages, tests, and deployable apps.',
    weeks: [
      {
        title: 'Week 1 — Environment & Fundamentals',
        tasks: [
          'Install Python 3.10+ with pyenv / system installer. Learn virtualenv / venv and how to activate environments.',
          'Editor: VSCode basics (open folder, terminal); Git & GitHub account.',
          'Core topics: variables, control flow, functions, modules, packages, exceptions.',
          'Exercise: write a CLI script that reads a CSV and prints basic stats.',
        ],
      },
      {
        title: 'Week 2 — Data wrangling with pandas',
        tasks: [
          'Master pandas DataFrame/Series APIs: read_csv, groupby, merge, pivot, melt, apply, vectorized ops.',
          'File formats: CSV, Parquet with pyarrow; when to prefer parquet for speed & schema.',
          'Performance: chunked processing, avoiding row-wise loops.',
          'Exercise: build a cleaning script that reads raw CSV -> cleans -> writes parquet.',
        ],
      },
      {
        title: 'Week 3 — Analysis & Viz',
        tasks: [
          'Plotly Express & graph_objects for interactive plots; save static images for reports.',
          'Build a small Streamlit dashboard: load cleaned data, interactive filters, export selections.',
          'Micro-UX: tooltips, default filters, accessible color palettes.',
        ],
      },
      {
        title: 'Week 4 — Automation & I/O',
        tasks: [
          'Requests & APIs: call REST APIs, pagination, rate limits handling.',
          'Scheduling: cron locally, GitHub Actions for CI triggers, or simple serverless cron (Vercel/Render).',
          'Logging: Python logging module, structured logs (JSON) for later ingestion.',
        ],
      },
      {
        title: 'Week 5 — Packaging & Tests',
        tasks: [
          'Organize code into a package. Use poetry or pip + setup.cfg for packaging.',
          'Write unit tests with pytest, mock external calls, run coverage reports.',
          'CI: GitHub Actions to run tests on PRs.',
        ],
      },
      {
        title: 'Week 6 — Deploy & Showcase',
        tasks: [
          'Deploy Streamlit app or lightweight Flask/FastAPI back-end + Next/React front-end on Vercel/Streamlit Cloud.',
          'Write a README with tech stack, short demo GIF, and instructions to run locally.',
        ],
      },
    ],
    skills: [
      'Idiomatic Python (generators, context managers, comprehensions)',
      'Data wrangling (pandas, pyarrow)',
      'Scripting & automation (requests, pathlib, logging)',
      'Packaging & testing (pytest, poetry)',
      'Deploy basics (Streamlit, Vercel, Docker basics)',
    ],
    tools: [
      'Python 3.10+, pip / poetry',
      'VSCode (+ Python extension)',
      'pandas, numpy, pyarrow',
      'plotly, streamlit, matplotlib',
      'pytest, GitHub Actions, Docker (basic)',
    ],
    projects: [
      'Personal dataset dashboard (Streamlit) with filters + save state.',
      'ETL: scheduled job that ingests CSV -> cleans -> uploads to public storage (or GitHub repo).',
    ],
    resources: [
      'https://www.kaggle.com/learn/python',
      'https://pandas.pydata.org/docs/',
      'Python for Data Analysis (Wes McKinney) — pick chapters on pandas & I/O',
    ],
  },

  sql: {
    title: 'SQL & Pipelines (4–6 weeks)',
    overview:
      'Stop waiting for cleaned CSVs: learn to extract, transform, and feed data into dashboards and models.',
    weeks: [
      {
        title: 'Week 1 — Core SQL',
        tasks: [
          'SELECT, WHERE, GROUP BY, ORDER BY, basic aggregations.',
          'Practice: analyze a dataset with GROUP BY + aggregates.',
        ],
      },
      {
        title: 'Week 2 — Joins & CTEs',
        tasks: [
          'INNER/LEFT/RIGHT joins, deduplication strategies, common table expressions (CTEs).',
          'Learn to write readable SQL with clear formatting & comments.',
        ],
      },
      {
        title: 'Week 3 — Window functions & performance',
        tasks: [
          'ROW_NUMBER, RANK, moving averages, lead/lag functions.',
          'Indexes, explain plan basics to find slow queries.',
        ],
      },
      {
        title: 'Week 4 — Pipeline Integration',
        tasks: [
          'Use SQLAlchemy or psycopg2 to fetch data into pandas, push cleaned tables back.',
          'Intro to dbt: models, tests, documentation for transformation layer.',
        ],
      },
    ],
    skills: [
      'Set-based thinking (avoid row-by-row loops)',
      'Window functions & time-series SQL',
      'ETL patterns & idempotence',
      'dbt basics for transformation testing & docs',
    ],
    tools: ['Postgres (local), SQLite', 'Mode Analytics', 'dbt', 'SQL IDEs (TablePlus, DBeaver)'],
    projects: [
      'End-to-end: source CSV -> import to Postgres -> dbt model -> Streamlit dashboard',
    ],
    resources: ['https://mode.com/sql-tutorial/', 'https://docs.getdbt.com/'],
  },

  fastapi: {
    title: 'FastAPI — Build a Data API (2–3 weeks)',
    overview:
      'Expose your data & business logic via a typed API, with validation, docs, and tests.',
    weeks: [
      {
        title: 'Week 1 — Basics',
        tasks: [
          'Create a minimal app with FastAPI + Uvicorn. Add simple GET/POST endpoints.',
          'Learn Pydantic schemas for request/response validation.',
        ],
      },
      {
        title: 'Week 2 — Auth & Background Work',
        tasks: [
          'Add token-based auth (JWT) for protected endpoints.',
          'Background tasks for heavy processing (file parsing) with FastAPI background tasks or Celery.',
        ],
      },
      {
        title: 'Week 3 — Tests & Deploy',
        tasks: [
          'Test endpoints with pytest + httpx, use CI to automate tests.',
          'Containerize (Docker) and deploy to Render, Cloud Run, or serverless function provider.',
        ],
      },
    ],
    skills: [
      'Type-safe APIs with Pydantic',
      'Authentication patterns (JWT, OAuth basics)',
      'Background jobs & idempotency',
      'API testing & contract validation',
    ],
    tools: ['FastAPI', 'Uvicorn', 'Pydantic', 'httpx', 'Docker', 'Postgres/SQLite'],
    projects: [
      'CSV upload endpoint: POST CSV → queue → parsed results accessible via GET endpoints',
      'Small AI helper endpoint that accepts a question + dataset id and returns a summary (integrate OpenAI or local model).',
    ],
    resources: ['https://fastapi.tiangolo.com/', 'https://www.kennethreitz.org/essays/testing'],
  },

  system: {
    title: 'System Design for Data Apps (4–8 weeks)',
    overview:
      'Think beyond single notebooks: design systems that scale, are observable, and resilient.',
    weeks: [
      { title: 'Week 1 — Fundamentals', tasks: ['Latency vs throughput, load patterns, caches'] },
      {
        title: 'Week 2 — Storage & DBs',
        tasks: [
          'SQL vs NoSQL choices, replication, partitioning, when to pre-aggregate',
          'Practice: design read-heavy dashboard storage with caching layer',
        ],
      },
      {
        title: 'Week 3 — Messaging & Workers',
        tasks: [
          'Queue systems (Redis Streams, RabbitMQ, SQS), background workers (Celery, RQ).',
        ],
      },
      {
        title: 'Week 4 — Monitoring',
        tasks: [
          'Metrics, logs, and traces. Instrument a small service with Prometheus + Grafana or a hosted alternative.',
        ],
      },
    ],
    skills: [
      'Design tradeoffs (consistency, availability, partition tolerance)',
      'Scalability patterns (caching, pre-aggregation)',
      'Observability (logs/metrics/tracing)',
    ],
    tools: [
      'Postgres, Redis, RabbitMQ/SQS', 'Celery / RQ', 'Docker', 'Prometheus + Grafana', 'NGINX',
    ],
    projects: [
      'Design doc & prototype: dashboard service for 100k daily users (include caching & pre-agg).',
    ],
    resources: [
      'Grokking the System Design Interview (exercises)',
      'Designing Data-Intensive Applications (select chapters)',
    ],
  },

  genai: {
    title: 'Prompt Engineering & GenAI (2–4 weeks)',
    overview:
      'Use LLMs to augment analysis: write prompts that extract facts, summarize tables, and produce code snippets.',
    weeks: [
      {
        title: 'Week 1 — Prompt Basics',
        tasks: [
          'System vs user prompts, role assignment, few-shot prompting, temperature & top_p settings.',
          'Practice: write prompts that summarize a CSV column into top 5 insights.',
        ],
      },
      {
        title: 'Week 2 — Programmatic Usage',
        tasks: [
          'Use OpenAI / other APIs programmatically; implement caching & chunking for large docs.',
          'Learn to evaluate responses and detect hallucinations.',
        ],
      },
      {
        title: 'Week 3 — Chains & Retrieval',
        tasks: [
          'LangChain basics: chains, retrievers, embeddings for dataset QA.',
        ],
      },
    ],
    skills: ['Prompt engineering patterns', 'Embedding retrieval', 'Evaluation & cost control'],
    tools: ['OpenAI API', 'LangChain', 'tiktoken', 'Chroma / Pinecone (optional)'],
    projects: [
      'Streamlit: upload CSV → embed rows → ask questions about the data with an LLM-backed assistant.',
    ],
    resources: ['https://platform.openai.com/docs/', 'https://langchain.readthedocs.io/'],
  },

  viz: {
    title: 'Data Viz — Advanced (3–4 weeks)',
    overview:
      'From good charts to compelling stories: build interactive, accessible visualizations.',
    weeks: [
      { title: 'Week 1 — Visual Principles', tasks: ['Color, hierarchy, annotation, visual encodings'] },
      { title: 'Week 2 — Plotly & Interactivity', tasks: ['Custom hover, transitions, animation'] },
      { title: 'Week 3 — Multi-page Apps', tasks: ['Streamlit / Dash multi-page apps, caching, sharing'] },
    ],
    skills: ['Design choices', 'Plotly mastery', 'UX for dashboards', 'Accessibility basics'],
    tools: ['Plotly', 'Streamlit', 'Tableau / PowerBI (for industry exposure)'],
    projects: ['Shareable dashboard with state, export features, and short written narrative.'],
    resources: ['https://plotly.com/python/', 'Storytelling with Data'],
  },

  dsa: {
    title: 'Light DSA (ongoing micro-habit)',
    overview:
      'Just enough DSA to pass interviews and think algorithmically under pressure.',
    weeks: [
      { title: 'Ongoing', tasks: ['10–20 mins, 3 problems/week focusing patterns: arrays, strings, hashmaps, two-pointers.'] },
    ],
    skills: ['Problem patterns (sliding window, two pointers, hashmaps)'],
    tools: ['LeetCode / NeetCode / HackerRank'],
    projects: ['Maintain a small repo with solved problems + short notes for each pattern.'],
    resources: ['https://neetcode.io/'],
  },

  portfolio: {
    title: 'Portfolio & Deploy (1–2 weeks)',
    overview:
      'Make your work shareable and delicious: demos, clean READMEs, and hosted links.',
    weeks: [
      { title: 'Week 1 — Project polish', tasks: ['README, screenshots, GIF demo, 1-line summary + stack'] },
      { title: 'Week 2 — Hosting', tasks: ['Deploy to Streamlit Cloud or Vercel; custom domain optional'] },
    ],
    skills: ['Writing concise project descriptions', 'Deployment basics', 'Screenshot & GIF creation'],
    tools: ['GitHub Pages', 'Streamlit Cloud', 'Vercel'],
    projects: ['Personal site with 3 showcase projects: Viz, ETL, and an API/assistant.'],
    resources: ['https://vercel.com/docs', 'https://streamlit.io/'],
  },
};

export default function IndexPage() {
  const [introDone, setIntroDone] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [sike, setSike] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // stores id like 'python'
  const audioRef = useRef(null);

  const messageLine1 = 'Ni Hao Fine Shyt.🐾';
  const messageLine2 = 'Wanna be a tech baddie?';

  // keyboard start
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') {
        setIntroDone(true);
        if (audioEnabled && audioRef.current) audioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [audioEnabled]);

  const enableAudioAndStart = () => {
    setAudioEnabled(true);
    try {
      audioRef.current && audioRef.current.play().catch(() => {});
    } catch {}
    setIntroDone(true);
  };

  const handleSikeClick = () => {
    setSike(true);
    setTimeout(() => setSike(false), 1200);
  };

  // open overlay by id
  const openOverlay = (id) => {
    setSelectedId(id);
    // lock scroll
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    setSelectedId(null);
    document.body.style.overflow = '';
  };

  const selectedDetail = selectedId ? detailed[selectedId] : null;
  // for card thumbnail gif, find base record (fallback to placeholder)
  const findCardData = (id) => {
    const found = roadmapsData.find((r) => r.id === id);
    return found || { gif: local.placeholder, title: detailed[id]?.title || id };
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#eaf8ff 0%, #f4fbff 100%)' }}>
      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="intro"
            className="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0b67a3',
              zIndex: 1200,
              display: 'grid',
              placeItems: 'center',
              padding: 24,
            }}
          >
            <motion.div
              className="intro-card"
              initial={{ scale: 0.98, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 14 }}
              style={{
                width: 'min(920px, 94%)',
                borderRadius: 14,
                padding: 28,
                background: 'rgba(255,255,255,0.04)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <div style={{ width: 90, height: 90, borderRadius: 12, overflow: 'hidden' }}>
                  <img src={local.cat_gamer} alt="cat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h2 className="gamer-title" style={{ fontSize: 20, margin: 0 }}>Tech Glow-Up</h2>
                  <p style={{ margin: 6, color: '#0381d0ff', fontSize: 13 }}>A playful roadmap + projects for leveling up.</p>
                </div>
              </div>

              <div style={{ minHeight: 72, fontFamily: 'Press Start 2P, monospace', color: '#089cd6ff', fontSize: 16, whiteSpace: 'pre-wrap' }}>
                <div>{messageLine1}</div>
                <div>{messageLine2}</div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
                <button
                  onClick={enableAudioAndStart}
                  style={{
                    background: 'var(--gb-accent)',
                    color: '#00233a',
                    padding: '8px 14px',
                    borderRadius: 10,
                    fontWeight: 700,
                    border: 'none',
                  }}
                >
                  Tap to Start 🔊
                </button>

                <button
                  onClick={handleSikeClick}
                  style={{
                    background: 'transparent',
                    color: '#e6f8ff',
                    padding: '8px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.18)',
                  }}
                >
                  😤 Nah I've seen it, skip next time
                </button>
              </div>

              {sike && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} style={{ marginTop: 12, fontFamily: 'Press Start 2P, monospace', color: '#0e62bbff' }}>
                  sike 😏
                </motion.div>
              )}

              <div style={{ marginTop: 14 }}>
                <audio ref={audioRef} src={local.sound} loop />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main single-page dashboard (cards -> full-screen overlay tabs) */}
      <main className="full-width" style={{ maxWidth: 1200, margin: '36px auto', padding: '0 20px' }}>
        <header className="header-row" style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 18 }}>
          <div style={{ width: 120, height: 120, borderRadius: 14, overflow: 'hidden' }}>
            <img src={local.cat_typing} alt="cat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 className="gamer-title" style={{ fontSize: 32, margin: 0, color: 'var(--gb-mid)' }}>
              Tech Glow-Up Guide <span style={{ color: 'var(--gb-accent)' }}>by Venky💙</span>
            </h1>
            <p style={{ margin: '8px 0 0', color: '#144b69' }}>Projects, resources and tips.</p>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Render cards: use the roadmapsData + our added vscode card */}
          {[
            ...roadmapsData, // assumes roadmapsData contains the normal ones with id fields
            { id: 'vscode', title: 'VSCode Setup', gif: local.placeholder },
          ].map((r) => (
            <div key={r.id} style={{ cursor: 'pointer' }} onClick={() => openOverlay(r.id)}>
              <RoadmapCard data={findCardData(r.id)} onClick={() => openOverlay(r.id)} />
            </div>
          ))}
        </section>

        {/* Overlay modal for selected roadmap */}
        <AnimatePresence>
          {selectedId && selectedDetail && (
            <motion.div
              key="overlay"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#ffffff',
                zIndex: 1500,
                overflow: 'auto',
                padding: 28,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={findCardData(selectedId).gif || local.placeholder} alt="" style={{ width: 84, borderRadius: 8 }} />
                  <div>
                    <h2 style={{ margin: 0, color: '#062b48' }}>{selectedDetail.title}</h2>
                    <p style={{ margin: '4px 0 0', color: '#144b69' }}>{selectedDetail.overview}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={closeOverlay} style={{ padding: '8px 12px', borderRadius: 8 }}>Close</button>
                </div>
              </div>

              {/* Content columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, marginTop: 18 }}>
                <aside style={{ background: '#f7feff', padding: 14, borderRadius: 10 }}>
                  <h4 style={{ marginTop: 0 }}>Skills to build</h4>
                  <ul>
                    {(selectedDetail.skills || []).map((s, i) => <li key={i}>{s}</li>)}
                  </ul>

                  <h4 style={{ marginTop: 12 }}>Tools</h4>
                  <ul>
                    {(selectedDetail.tools || []).map((t, i) => <li key={i}>{t}</li>)}
                  </ul>

                  <h4 style={{ marginTop: 12 }}>Quick projects</h4>
                  <ul>
                    {(selectedDetail.projects || []).map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </aside>

                <section style={{ background: '#fff', padding: 10 }}>
                  {/* Weeks / steps */}
                  {(selectedDetail.weeks || selectedDetail.steps || []).length > 0 && (
                    <>
                      <h3>Week-by-week</h3>
                      <div style={{ display: 'grid', gap: 12 }}>
                        {(selectedDetail.weeks || selectedDetail.steps || []).map((w, i) => (
                          <div key={i} style={{ padding: 12, border: '1px solid #eef8fb', borderRadius: 8 }}>
                            <strong>{w.title || `Step ${i + 1}`}</strong>
                            <div style={{ marginTop: 8 }}>
                              {(w.tasks || w.items || (typeof w === 'string' ? [w] : [])).map((t, j) => (
                                <div key={j} style={{ marginBottom: 6 }}>{t}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Resources */}
                  {selectedDetail.resources && selectedDetail.resources.length > 0 && (
                    <>
                      <h3 style={{ marginTop: 16 }}>Resources</h3>
                      <ul>
                        {selectedDetail.resources.map((r, i) =>
                          typeof r === 'string' ? (
                            <li key={i}><a href={r} target="_blank" rel="noreferrer">{r}</a></li>
                          ) : (
                            <li key={i}><a href={r.url} target="_blank" rel="noreferrer">{r.title || r.url}</a></li>
                          )
                        )}
                      </ul>
                    </>
                  )}

                  {/* VSCode special: placeholder for screenshots */}
                  {selectedId === 'vscode' && (
                    <>
                      <h3 style={{ marginTop: 16 }}>Screenshots / Walkthrough</h3>
                      <p>Drop your screenshots into <code>/public/screenshots/</code> and they will appear here.</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                        <div style={{ height: 140, background: '#eef8fb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Screenshot 1 (add)</div>
                        <div style={{ height: 140, background: '#eef8fb', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Screenshot 2 (add)</div>
                      </div>
                      <p style={{ marginTop: 12 }}>When you add images, replace these placeholders with <code>&lt;img src="/screenshots/your.png" /&gt;</code>.</p>
                    </>
                  )}
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer style={{ marginTop: 32, textAlign: 'center', color: '#0b4f73' }}>
          Made with 💙 — cats, code, and slightly aggressive charm.
        </footer>
      </main>
    </div>
  );
}
