/* ============================================================
   TROYZ SOLUTIONS — R&D PROJECT HUB
   Application Logic
   ============================================================ */

'use strict';

// ============================================================
// PROJECT DATA — Fetched & Enriched from GitHub
// ============================================================
const PROJECTS = [
  {
    id: 'ai-friend',
    name: 'AI Friend',
    repo: 'AI-Friend',
    githubUrl: 'https://github.com/04suriya07-spec/AI-Friend',
    liveUrl: 'https://www.whythis.space',
    language: 'TypeScript',
    domain: 'ai',
    description: 'A deeply personal AI companion project — built with passion and deep interest. Explores human-AI emotional connection, conversational intelligence, and personalized interaction models.',
    trendScore: 94,
    trendInsights: [
      'AI companions market expected to reach $15B by 2027',
      'Emotional AI and mental health tech seeing 3x YoY growth',
      'Apple, Meta, and OpenAI all investing in AI companion UX',
      'Personalization + long-term memory are the next frontier'
    ],
    icon: '🤖',
    iconClass: 'card-icon-ai',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-23',
    openIssues: 3,
    size: '82 MB',
    status: 'open',
    tags: ['AI', 'Companion', 'TypeScript', 'NLP']
  },
  {
    id: 'communit-app',
    name: 'Communit App',
    repo: 'Communit-App',
    githubUrl: 'https://github.com/04suriya07-spec/Communit-App',
    liveUrl: 'https://communit-app-vercel.vercel.app',
    language: 'TypeScript',
    domain: 'community',
    description: 'A community-first web platform for building tight-knit digital communities. Focuses on authentic engagement, real-time interactions, and modern social infrastructure.',
    trendScore: 78,
    trendInsights: [
      'Community platforms growing 40% faster than traditional social media',
      'Discord alternative market is highly competitive & lucrative',
      'Niche communities monetize 5x better than broad ones',
      'Real-time features are table stakes in 2026'
    ],
    icon: '🌐',
    iconClass: 'card-icon-community',
    createdAt: '2026-01-11',
    updatedAt: '2026-01-15',
    openIssues: 0,
    size: '648 KB',
    status: 'open',
    tags: ['Community', 'Social', 'TypeScript', 'Real-time']
  },
  {
    id: 'nexus-v2',
    name: 'NEXUS v2',
    repo: 'NEXUS-v2',
    githubUrl: 'https://github.com/04suriya07-spec/NEXUS-v2',
    liveUrl: null,
    language: 'Python',
    domain: 'ai',
    description: 'Version 2 of the NEXUS intelligence platform — a Python-based system architected for scalable AI workflows. Possibly a neural coordination layer or multi-agent orchestration engine.',
    trendScore: 91,
    trendInsights: [
      'Multi-agent AI orchestration is the hottest category in enterprise AI',
      'Python remains #1 language for AI infrastructure at scale',
      'Agentic AI frameworks raised $2B+ in 2025 alone',
      'v2 signals production-readiness — crucial for enterprise trust'
    ],
    icon: '⚡',
    iconClass: 'card-icon-platform',
    createdAt: '2026-05-07',
    updatedAt: '2026-08-13',
    openIssues: 0,
    size: '39 MB',
    status: 'open',
    tags: ['AI', 'Python', 'Platform', 'Agentic']
  },
  {
    id: 'vibrix-v2',
    name: 'Vibrix v2',
    repo: 'Vibrix-v2',
    githubUrl: 'https://github.com/04suriya07-spec/Vibrix-v2',
    liveUrl: 'https://vibrix-v2.vercel.app',
    language: 'TypeScript',
    domain: 'platform',
    description: 'The second iteration of Vibrix — a TypeScript-powered platform with a live Vercel deployment. Designed for modern web interactions with a focus on performance and vibrant UX.',
    trendScore: 75,
    trendInsights: [
      'Web platform SaaS market growing at 23% CAGR',
      'TypeScript adoption at 82% among professional developers',
      'Vercel-deployed apps get 40% faster time-to-market',
      'v2 iteration signals commitment to the product vision'
    ],
    icon: '🎵',
    iconClass: 'card-icon-platform',
    createdAt: '2026-05-22',
    updatedAt: '2026-08-13',
    openIssues: 0,
    size: '238 KB',
    status: 'open',
    tags: ['Platform', 'TypeScript', 'Vercel', 'UX']
  },
  {
    id: 'jarvis',
    name: 'Jarvis',
    repo: 'Jarvis',
    githubUrl: 'https://github.com/04suriya07-spec/Jarvis',
    liveUrl: null,
    language: 'Python',
    domain: 'ai',
    description: 'A Python-powered intelligent assistant system inspired by the iconic JARVIS AI. Voice-activated, context-aware, and built for productivity — a personal AI command center.',
    trendScore: 88,
    trendInsights: [
      'Voice AI assistants market hitting $26B by 2027',
      'Personal AI productivity tools are the fastest-growing SaaS niche',
      'Python + speech recognition stack is mature and production-ready',
      'On-device AI assistants seen as the privacy-first future'
    ],
    icon: '🧠',
    iconClass: 'card-icon-ai',
    createdAt: '2026-05-04',
    updatedAt: '2026-05-04',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['AI', 'Voice', 'Python', 'Assistant']
  },
  {
    id: 'algo-swing-bot',
    name: 'Algo Swing Trading Bot',
    repo: 'Algo-Swing-trading-bot',
    githubUrl: 'https://github.com/04suriya07-spec/Algo-Swing-trading-bot',
    liveUrl: null,
    language: 'Python',
    domain: 'fintech',
    description: 'An algorithmic swing trading bot written in Python. Leverages technical analysis, market signals, and automated execution to trade across swing timeframes with systematic precision.',
    trendScore: 86,
    trendInsights: [
      'Algorithmic trading now accounts for 60-73% of US equity volume',
      'Retail algo trading platforms saw 200% growth post-2024',
      'Swing trading bots have lower latency demands = easier to build at scale',
      'Backtesting + live execution as a single product is highly monetizable'
    ],
    icon: '📈',
    iconClass: 'card-icon-fintech',
    createdAt: '2026-02-20',
    updatedAt: '2026-02-20',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['FinTech', 'Trading', 'Python', 'Algorithmic']
  },
  {
    id: 'mayai',
    name: 'Mayai',
    repo: 'Mayai',
    githubUrl: 'https://github.com/04suriya07-spec/Mayai',
    liveUrl: null,
    language: 'TypeScript',
    domain: 'ai',
    description: 'Mayai — an AI-powered platform with a distinctive name suggesting intelligence and illusion. Likely explores generative AI, perception-based UX, or AI creative tools.',
    trendScore: 83,
    trendInsights: [
      'Generative AI tools market reaching $110B by 2030',
      'Creative AI is disrupting every vertical from design to music',
      'TypeScript AI apps benefit from type-safety at scale',
      'Unique branding ("Mayai" — meaning illusion) = strong IP positioning'
    ],
    icon: '✨',
    iconClass: 'card-icon-ai',
    createdAt: '2026-05-22',
    updatedAt: '2026-05-22',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['AI', 'Generative', 'TypeScript', 'Creative']
  },
  {
    id: 'fin-app',
    name: 'Fin App',
    repo: 'Fin-app',
    githubUrl: 'https://github.com/04suriya07-spec/Fin-app',
    liveUrl: null,
    language: 'TypeScript',
    domain: 'fintech',
    description: 'A comprehensive financial application built with TypeScript. Covers personal finance management, investment tracking, budgeting, or financial data visualization for modern users.',
    trendScore: 82,
    trendInsights: [
      'FinTech app market growing at 25% CAGR through 2028',
      'Personal finance apps saw 150M+ new users in 2025',
      'Open banking APIs enabling new financial product categories',
      'TypeScript ensures reliability in financial data handling'
    ],
    icon: '💰',
    iconClass: 'card-icon-fintech',
    createdAt: '2025-12-25',
    updatedAt: '2025-12-25',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['FinTech', 'Finance', 'TypeScript', 'Dashboard']
  },
  {
    id: 'back-testing',
    name: 'Back Testing Engine',
    repo: 'Back-testing',
    githubUrl: 'https://github.com/04suriya07-spec/Back-testing',
    liveUrl: null,
    language: 'Python',
    domain: 'fintech',
    description: 'A full-featured Python backtesting engine for validating trading strategies against historical data. Includes tick replay, performance profiling, SMC indicators, and connectors like Alpaca.',
    trendScore: 89,
    trendInsights: [
      'Quantitative trading infrastructure is a $4.2B market',
      'Institutional-grade backtesting tools rare in open-source space',
      'SMC (Smart Money Concepts) is the dominant retail trading theory of 2026',
      'Alpaca connector = direct bridge to live trading = full product pipeline'
    ],
    icon: '⚙️',
    iconClass: 'card-icon-fintech',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-13',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['FinTech', 'Backtesting', 'Python', 'Quant']
  },
  {
    id: 'solo-levelling',
    name: 'Solo Levelling System',
    repo: 'Solo_Levelling',
    githubUrl: 'https://github.com/04suriya07-spec/Solo_Levelling.git',
    liveUrl: null,
    language: 'TypeScript',
    domain: 'platform',
    description: 'A gamified self-improvement and life-simulation engine inspired by Solo Levelling. Features multi-agent AI brain coordination, narrative directors, daily quest loops, and active experience progression logs.',
    trendScore: 92,
    trendInsights: [
      'Gamification in productivity apps increases daily active users (DAU) by over 40%',
      'AI-driven custom narrative and agentic feedback is a rapidly growing design trend',
      'Combines personal growth with role-playing dynamics for high retention',
      'Strong potential for integration with smart wearables and task management suites'
    ],
    icon: '⚔️',
    iconClass: 'card-icon-platform',
    createdAt: '2026-08-13',
    updatedAt: '2026-08-13',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['Gamification', 'AI Brain', 'TypeScript', 'Self Improvement']
  },
  {
    id: 'ai-start-up',
    name: 'AI Start Up Workspace',
    repo: 'AI_Start_UP',
    githubUrl: 'https://github.com/04suriya07-spec/AI_Start_UP.git',
    liveUrl: null,
    language: 'TypeScript',
    domain: 'ai',
    description: 'An interactive sandbox for starting, launching, and managing AI agent startups. Simulates market response, agent-to-agent negotiation, and startup validation metrics.',
    trendScore: 95,
    trendInsights: [
      'Agentic startups and agent teams are predicted to run 30% of micro-SaaS businesses by 2028',
      'Autonomous simulation platforms are highly sought after by venture capital for rapid validation',
      'TypeScript-based node coordination offers secure, structured execution patterns',
      'Integrates easily with standard LLM providers (OpenAI, Anthropic) for autonomous operation'
    ],
    icon: '🚀',
    iconClass: 'card-icon-ai',
    createdAt: '2026-08-13',
    updatedAt: '2026-08-13',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['AI Agents', 'Startup Simulation', 'TypeScript', 'LLM Node']
  },
  {
    id: 'video-editing-tool',
    name: 'Video Editing Tool & Pipeline',
    repo: 'Video_Editing_Tool',
    githubUrl: 'https://github.com/04suriya07-spec/Video_Editing_Tool.git',
    liveUrl: null,
    language: 'Python',
    domain: 'platform',
    description: 'A automated Python video editing pipeline with multi-container docker-compose support. Designed for programmatic media processing, rendering, and content optimization.',
    trendScore: 87,
    trendInsights: [
      'Automated video creation and editing APIs are growing at a 32% CAGR',
      'Dockerized media containers simplify serverless deployment on AWS or GCP',
      'Python is the industry standard for scientific and media manipulation packages (FFmpeg wrapper)',
      'High utility for programmatic video generators, social media pipelines, and dynamic ads'
    ],
    icon: '🎬',
    iconClass: 'card-icon-platform',
    createdAt: '2026-08-13',
    updatedAt: '2026-08-13',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['Video Pipeline', 'Python', 'Docker', 'Automation']
  },
  {
    id: 'other-projects',
    name: 'Other Projects',
    repo: null,
    githubUrl: null,
    liveUrl: null,
    language: 'Various',
    domain: 'other',
    description: 'A dedicated space for projects and ideas that are not yet on GitHub — early-stage concepts, internal tools, experimental builds, or upcoming additions to the Troyz Solutions pipeline.',
    trendScore: 72,
    trendInsights: [
      'Early-stage ideas are often the highest-upside bets',
      'Keeping a backlog of concepts signals a healthy innovation culture',
      'Document even rough ideas — the best products start as notes',
      'This slot will be updated as new projects are added'
    ],
    icon: '📁',
    iconClass: 'card-icon-other',
    createdAt: '2026-08-13',
    updatedAt: '2026-08-13',
    openIssues: 0,
    size: '—',
    status: 'open',
    tags: ['Upcoming', 'Concepts', 'Various', 'Internal']
  }
];

// ============================================================
// DEFAULT R&D BRIEFS (PRE-POPULATED ANALYSES)
// ============================================================
const DEFAULT_BRIEFS = {
  'solo-levelling': [
    {
      author: 'Troyz R&D Team',
      text: 'A highly engaging gamified productivity system. The implementation of custom narrative arcs (like the Awakening arc) and AI-driven feedback loops dramatically improves daily retention odds. We should expand the reality graph engine to support integrations with popular IDEs (VS Code, Cursor) to track coding tasks as real quests.',
      score: 92,
      reason: 'Gamification is seeing a massive resurgence in developer tooling, with narrative-driven systems scoring extremely high on user retention studies.',
      date: 'Aug 13, 2026'
    }
  ],
  'ai-start-up': [
    {
      author: 'Troyz R&D Team',
      text: 'Autonomous multi-agent startup simulation sandbox. This project contains excellent infrastructure for simulating business operations, customer interactions, and agent negotiations. Recommend adding an automated financial ledger and mock marketing channel APIs to test agent pivot decisions under constraint.',
      score: 95,
      reason: 'Agentic startup simulations are the hottest vertical in enterprise sandbox environments, representing a massive B2B software opportunity.',
      date: 'Aug 13, 2026'
    }
  ],
  'video-editing-tool': [
    {
      author: 'Troyz R&D Team',
      text: 'Programmatic video processing and editing pipeline. The Docker Compose setup is highly containerized and modular. Suggest adding GPU-accelerated rendering configurations (NVIDIA Container Toolkit runtime) and an automated metadata-driven layout generator to support batch short-form content output.',
      score: 87,
      reason: 'Automated video rendering is key for scaling short-form organic marketing pipelines, where rendering latency is the primary production bottleneck.',
      date: 'Aug 13, 2026'
    }
  ]
};

// ============================================================
// STATE
// ============================================================
let state = {
  filter: 'all',
  lang: 'all',
  status: 'all',
  search: '',
  briefs: {
    ...DEFAULT_BRIEFS,
    ...JSON.parse(localStorage.getItem('troyz_briefs') || '{}')
  },
  claimed: JSON.parse(localStorage.getItem('troyz_claimed') || '{}'),
};

// ============================================================
// HELPERS
// ============================================================
function saveBriefs() {
  localStorage.setItem('troyz_briefs', JSON.stringify(state.briefs));
}

function saveClaimed() {
  localStorage.setItem('troyz_claimed', JSON.stringify(state.claimed));
}

function getTrendClass(score) {
  if (score >= 90) return 'score-hot';
  if (score >= 80) return 'score-high';
  if (score >= 65) return 'score-mid';
  return 'score-low';
}

function getFillClass(score) {
  if (score >= 90) return 'fill-hot';
  if (score >= 80) return 'fill-high';
  if (score >= 65) return 'fill-mid';
  return 'fill-low';
}

function getTrendEmoji(score) {
  if (score >= 90) return '🔥';
  if (score >= 80) return '📈';
  if (score >= 65) return '✅';
  return '📊';
}

function getDomainLabel(domain) {
  const labels = { ai: 'AI / ML', fintech: 'FinTech', platform: 'Platform', community: 'Community', other: 'Other' };
  return labels[domain] || (domain.charAt(0).toUpperCase() + domain.slice(1));
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === '—') return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (_) { return dateStr; }
}

function getBriefScoreColor(score) {
  if (score >= 85) return 'color: #fb7185; background: rgba(251,113,133,0.1); border: 1px solid rgba(251,113,133,0.25);';
  if (score >= 70) return 'color: #fbbf24; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.25);';
  if (score >= 50) return 'color: #34d399; background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.25);';
  return 'color: #94a3b8; background: rgba(148,163,184,0.1); border: 1px solid rgba(148,163,184,0.2);';
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1500;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// ============================================================
// RENDER PROJECTS
// ============================================================
function getFilteredProjects() {
  return PROJECTS.filter(p => {
    const matchDomain = state.filter === 'all' || p.domain === state.filter;
    const matchLang = state.lang === 'all' || p.language.toLowerCase() === state.lang;
    const matchStatus = state.status === 'all' || p.status === state.status;
    const query = state.search.toLowerCase().trim();
    const matchSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query)) ||
      p.domain.toLowerCase().includes(query);
    return matchDomain && matchLang && matchStatus && matchSearch;
  });
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const countEl = document.getElementById('projectCount');
  const filtered = getFilteredProjects();

  countEl.textContent = `Showing ${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results" role="status">
        <h3>No projects found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const briefCount = (state.briefs[p.id] || []).length;
    const isClaimed = !!state.claimed[p.id];
    const claimedBy = state.claimed[p.id];
    const statusBadge = isClaimed
      ? `<span class="badge badge-status-claimed">Claimed${claimedBy ? ' by ' + claimedBy : ''}</span>`
      : `<span class="badge badge-status-open">Open</span>`;

    return `
    <article class="project-card" role="listitem" tabindex="0"
      data-id="${p.id}" aria-label="${p.name} project card">
      <div class="card-top">
        <div class="card-icon ${p.iconClass}" aria-hidden="true">${p.icon}</div>
        <div class="card-badges">
          <span class="badge badge-lang ${p.language.toLowerCase()}">${p.language}</span>
          <span class="badge badge-domain">${getDomainLabel(p.domain)}</span>
          ${statusBadge}
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.description}</p>
      </div>
      <div class="card-trend">
        <div class="trend-header">
          <span class="trend-label">Market Trend Score</span>
          <span class="trend-score ${getTrendClass(p.trendScore)}">${getTrendEmoji(p.trendScore)} ${p.trendScore}/100</span>
        </div>
        <div class="trend-bar" role="progressbar" aria-valuenow="${p.trendScore}" aria-valuemin="0" aria-valuemax="100" aria-label="Trend score ${p.trendScore} out of 100">
          <div class="trend-fill ${getFillClass(p.trendScore)}" style="width: 0%" data-width="${p.trendScore}%"></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-meta">
          <span class="meta-item" title="Open issues">
            <span class="meta-icon" aria-hidden="true">&#128221;</span>
            <span>${briefCount} brief${briefCount !== 1 ? 's' : ''}</span>
          </span>
          <span class="meta-item" title="Last updated">
            <span class="meta-icon" aria-hidden="true">&#128337;</span>
            <span>${formatDate(p.updatedAt)}</span>
          </span>
        </div>
        <button class="card-action" data-id="${p.id}" aria-label="View details for ${p.name}">
          View <span aria-hidden="true">&#8594;</span>
        </button>
      </div>
    </article>`;
  }).join('');

  // Animate trend bars
  requestAnimationFrame(() => {
    document.querySelectorAll('.trend-fill').forEach(el => {
      setTimeout(() => {
        el.style.width = el.dataset.width;
      }, 100);
    });
  });

  // Card click events
  grid.querySelectorAll('.project-card, .card-action').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.dataset.id || el.closest('.project-card')?.dataset.id;
      if (id) openProjectModal(id);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = el.dataset.id;
        if (id) openProjectModal(id);
      }
    });
  });
}

// ============================================================
// PROJECT DETAIL MODAL
// ============================================================
function openProjectModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');
  const isClaimed = !!state.claimed[p.id];
  const claimedBy = state.claimed[p.id];
  const briefs = state.briefs[p.id] || [];

  const linksHtml = `
    <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="modal-link primary-link" aria-label="View ${p.name} on GitHub">
      &#128279; GitHub Repo
    </a>
    ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="modal-link" aria-label="View live deployment of ${p.name}">&#9654;&#65039; Live Demo</a>` : ''}
  `;

  const insightsHtml = p.trendInsights.map(insight => `
    <div class="insight-item">
      <span class="insight-icon" aria-hidden="true">&#10003;</span>
      <span>${insight}</span>
    </div>
  `).join('');

  const briefsHtml = briefs.length ? briefs.map(b => `
    <div class="brief-card">
      <div class="brief-header">
        <span class="brief-author">${escapeHtml(b.author)}</span>
        <span class="brief-score" style="${getBriefScoreColor(b.score)}">${getTrendEmoji(b.score)} ${b.score}/100</span>
      </div>
      <p class="brief-text">${escapeHtml(b.text)}</p>
      ${b.reason ? `<p class="brief-reason">${escapeHtml(b.reason)}</p>` : ''}
      <p class="brief-date">Submitted: ${b.date}</p>
    </div>
  `).join('') : `<div class="no-briefs">No briefs submitted yet. Be the first to analyze this project!</div>`;

  content.innerHTML = `
    <div class="modal-project-header">
      <div class="modal-project-icon ${p.iconClass}" aria-hidden="true">${p.icon}</div>
      <div class="modal-project-info">
        <h2 id="modalTitle" class="modal-project-name">${p.name}</h2>
        <div class="modal-badges">
          <span class="badge badge-lang ${p.language.toLowerCase()}">${p.language}</span>
          <span class="badge badge-domain">${getDomainLabel(p.domain)}</span>
          ${isClaimed
            ? `<span class="badge badge-status-claimed">Claimed by ${escapeHtml(claimedBy)}</span>`
            : '<span class="badge badge-status-open">Open for R&D</span>'}
        </div>
      </div>
    </div>

    <div class="modal-section">
      <p class="modal-section-title">About</p>
      <p class="modal-desc">${p.description}</p>
    </div>

    <div class="modal-trend-block">
      <p class="modal-trend-label">Market Trend Analysis</p>
      <div class="modal-trend-score-big ${getTrendClass(p.trendScore)}">${p.trendScore}<span style="font-size:1.2rem; opacity:0.5;">/100</span></div>
      <div class="trend-bar" style="margin-top:12px;" role="progressbar" aria-valuenow="${p.trendScore}" aria-valuemin="0" aria-valuemax="100">
        <div class="trend-fill ${getFillClass(p.trendScore)}" style="width:${p.trendScore}%;"></div>
      </div>
      <div class="modal-trend-insights">
        ${insightsHtml}
      </div>
    </div>

    <div class="modal-section">
      <p class="modal-section-title">Tags</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${p.tags.map(t => `<span class="badge badge-domain">${t}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <p class="modal-section-title">Repository Details</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">
          <div style="font-size:0.72rem;color:rgba(226,232,240,0.4);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Created</div>
          <div style="font-weight:600;font-size:0.9rem;">${formatDate(p.createdAt)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px;">
          <div style="font-size:0.72rem;color:rgba(226,232,240,0.4);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Last Updated</div>
          <div style="font-weight:600;font-size:0.9rem;">${formatDate(p.updatedAt)}</div>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <p class="modal-section-title">Links</p>
      <div class="modal-links">${linksHtml}</div>
    </div>

    <div class="modal-section">
      <p class="modal-section-title">R&D Briefs (${briefs.length})</p>
      <div class="briefs-list">${briefsHtml}</div>
    </div>

    <div class="modal-actions">
      <button class="btn-primary modal-claim-btn" id="claimProjectBtn" data-id="${p.id}" ${isClaimed ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
        ${isClaimed ? `&#10003; Claimed by ${escapeHtml(claimedBy)}` : '&#127919; Claim This Project'}
      </button>
      <button class="btn-ghost" id="submitBriefFromModal" data-id="${p.id}">
        &#9999;&#65039; Write Brief
      </button>
    </div>
  `;

  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Claim button
  const claimBtn = document.getElementById('claimProjectBtn');
  if (claimBtn && !isClaimed) {
    claimBtn.addEventListener('click', () => {
      const name = prompt('Enter your name to claim this project:');
      if (name && name.trim()) {
        state.claimed[p.id] = name.trim();
        saveClaimed();
        // Update project status
        const proj = PROJECTS.find(x => x.id === p.id);
        if (proj) proj.status = 'claimed';
        showToast(`Project claimed by ${name.trim()}!`, 'success');
        openProjectModal(p.id); // Refresh modal
        renderProjects();
      }
    });
  }

  // Write brief from modal
  const writeBriefBtn = document.getElementById('submitBriefFromModal');
  if (writeBriefBtn) {
    writeBriefBtn.addEventListener('click', () => {
      closeProjectModal();
      openSubmitModal(p.id);
    });
  }
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

// ============================================================
// SUBMIT MODAL
// ============================================================
function openSubmitModal(preSelectId) {
  const modal = document.getElementById('submitModal');
  const select = document.getElementById('projectSelect');
  const form = document.getElementById('submitForm');
  const success = document.getElementById('submitSuccess');

  // Populate project select
  select.innerHTML = '<option value="">Select a project</option>' +
    PROJECTS.map(p => `<option value="${p.id}" ${preSelectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('');

  form.removeAttribute('hidden');
  success.setAttribute('hidden', '');

  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSubmitModal() {
  const modal = document.getElementById('submitModal');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

// ============================================================
// FILTERS
// ============================================================
function initFilters() {
  // Filter toggle
  document.getElementById('filterToggleBtn').addEventListener('click', function () {
    const panel = document.getElementById('filterPanel');
    const isHidden = panel.hasAttribute('hidden');
    if (isHidden) {
      panel.removeAttribute('hidden');
      this.setAttribute('aria-expanded', 'true');
    } else {
      panel.setAttribute('hidden', '');
      this.setAttribute('aria-expanded', 'false');
    }
  });

  // Domain chips
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      state.filter = this.dataset.filter;
      renderProjects();
    });
  });

  // Language chips
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-lang]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      state.lang = this.dataset.lang;
      renderProjects();
    });
  });

  // Status chips
  document.querySelectorAll('[data-status]').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-status]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      state.status = this.dataset.status;
      renderProjects();
    });
  });

  // Search
  let searchTimeout;
  document.getElementById('searchInput').addEventListener('input', function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.search = this.value;
      renderProjects();
    }, 220);
  });
}

// ============================================================
// FORM
// ============================================================
function initForm() {
  const scoreInput = document.getElementById('trendScore');
  const scoreDisplay = document.getElementById('trendScoreDisplay');

  scoreInput.addEventListener('input', function () {
    scoreDisplay.textContent = this.value;
    this.setAttribute('aria-valuenow', this.value);
  });

  document.getElementById('submitForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('memberName').value.trim();
    const projectId = document.getElementById('projectSelect').value;
    const brief = document.getElementById('briefText').value.trim();
    const score = parseInt(document.getElementById('trendScore').value, 10);
    const reason = document.getElementById('trendReason').value.trim();

    if (!name || !projectId || !brief) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!state.briefs[projectId]) state.briefs[projectId] = [];

    state.briefs[projectId].push({
      author: name,
      text: brief,
      score,
      reason,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    saveBriefs();
    renderProjects();

    document.getElementById('submitForm').setAttribute('hidden', '');
    document.getElementById('submitSuccess').removeAttribute('hidden');
    showToast('Brief submitted successfully!', 'success');
  });

  document.getElementById('submitAgainBtn').addEventListener('click', function () {
    document.getElementById('submitForm').removeAttribute('hidden');
    document.getElementById('submitSuccess').setAttribute('hidden', '');
    document.getElementById('submitForm').reset();
    document.getElementById('trendScoreDisplay').textContent = '50';
  });
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.removeAttribute('hidden');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.setAttribute('hidden', '');
  }, 3500);
}

// ============================================================
// ESCAPE HTML
// ============================================================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ============================================================
// NAVBAR SCROLL
// ============================================================
function initNavScroll() {
  const nav = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================================
// CLOSE MODALS ON OVERLAY CLICK / ESC
// ============================================================
function initModalDismiss() {
  document.getElementById('modalClose').addEventListener('click', closeProjectModal);
  document.getElementById('submitModalClose').addEventListener('click', closeSubmitModal);

  document.getElementById('projectModal').addEventListener('click', function (e) {
    if (e.target === this) closeProjectModal();
  });
  document.getElementById('submitModal').addEventListener('click', function (e) {
    if (e.target === this) closeSubmitModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeSubmitModal();
    }
  });
}

// ============================================================
// CLAIM MODAL BTN (hero)
// ============================================================
function initClaimBtn() {
  document.getElementById('claimModalBtn').addEventListener('click', () => {
    openSubmitModal(null);
  });
}

// ============================================================
// HERO COUNTERS
// ============================================================
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

// ============================================================
// CARD ENTRANCE ANIMATION
// ============================================================
function initCardAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${(i % 3) * 0.08}s`;
        entry.target.style.animation = 'cardEnter 0.5s cubic-bezier(0.4,0,0.2,1) forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    observer.observe(card);
  });
}

// Add keyframe via JS (can't do it in CSS for dynamic elements)
const style = document.createElement('style');
style.textContent = `
  @keyframes cardEnter {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Apply claimed status from localStorage
  PROJECTS.forEach(p => {
    if (state.claimed[p.id]) p.status = 'claimed';
  });

  renderProjects();
  initFilters();
  initForm();
  initNavScroll();
  initModalDismiss();
  initClaimBtn();
  initCounters();

  // Animate cards after render
  setTimeout(initCardAnimations, 50);
});
