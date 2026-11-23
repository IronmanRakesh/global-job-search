/**
 * Global Job Search — Main Application
 * Handles UI, filtering, resume matching, 3D background, and interactions
 */

import {
  COUNTRIES, TECHNOLOGIES, JOB_TYPES, VISA_TYPES, EXPERIENCE_LEVELS, REMOTE_POLICIES,
  JOBS, formatSalary, formatDate, getCountryName, getCountryFlag,
  filterJobs, sortJobs, paginateJobs, parseResume, matchJobsToResume
} from './data.js';

// ============================================================================
// State Management
// ============================================================================

const state = {
  // Search
  filters: {
    keyword: '',
    jobType: ['fulltime'],
    country: [],
    visaType: [],
    salaryMin: null,
    salaryMax: null,
    techStack: [],
    experience: [],
    remote: [],
  },
  sortBy: 'relevance',
  viewMode: 'list',
  currentPage: 1,
  pageSize: 12,
  filteredJobs: [],
  totalJobs: 0,

  // Resume Match
  resumeFile: null,
  resumeData: null,
  matchedJobs: [],
  matchFilter: 'all',

  // UI
  theme: 'light',
  isMobileMenuOpen: false,
};

// ============================================================================
// DOM Elements Cache
// ============================================================================

const els = {};

// ============================================================================
// Utility Functions
// ============================================================================

function $(selector, root = document) { return root.querySelector(selector); }
function $$(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

function createElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function debounce(fn, ms = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}

function throttle(fn, ms = 100) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= ms) {
      lastTime = now;
      fn(...args);
    }
  };
}

function showToast(message, type = 'info', title = '') {
  const container = $('#toast-container');
  const toast = createElement(`
    <div class="toast ${type}" role="alert">
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' : ''}
        ${type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>' : ''}
        ${type === 'warning' ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>' : ''}
        ${type === 'info' ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>' : ''}
      </svg>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    </div>
  `);
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  });
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove());
    }
  }, 5000);
}

// ============================================================================
// 3D Background (Three.js-style but vanilla)
// ============================================================================

function initBackground() {
  const canvas = $('#bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];
  let mouseX = 0, mouseY = 0;
  let animationId;

  function resize() {
    dpr = Math.min(window.devicePixelRatio, 2);
    width = canvas.width = window.innerWidth * dpr;
    height = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    initParticles();
  }

  function initParticles() {
    const count = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: 220 + Math.random() * 40, // Blue-ish
      });
    }
  }

  function draw() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    // Draw connections
    ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.globalAlpha = (1 - dist / 120) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      // Mouse influence
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (1 - dist / 200) * 0.5;
        p.vx -= (dx / dist) * force * 0.02;
        p.vy -= (dy / dist) * force * 0.02;
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      // Dampen velocity
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Draw
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = `hsl(${p.hue}, 70%, 60%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    animationId = requestAnimationFrame(draw);
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      draw();
    }
  }

  window.addEventListener('resize', debounce(resize, 100));
  window.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Theme change handler
  const observer = new MutationObserver(() => {
    initParticles(); // Re-init with new colors
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  resize();
  draw();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    observer.disconnect();
  };
}

// ============================================================================
// Theme Management
// ============================================================================

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  $('#theme-toggle').addEventListener('click', () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// ============================================================================
// Mobile Menu
// ============================================================================

function initMobileMenu() {
  const toggle = $('.nav-toggle');
  const menu = $('.nav-menu');

  toggle.addEventListener('click', () => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    toggle.setAttribute('aria-expanded', state.isMobileMenuOpen);
    menu.classList.toggle('open', state.isMobileMenuOpen);
    document.body.style.overflow = state.isMobileMenuOpen ? 'hidden' : '';
  });

  // Close on link click
  $$('.nav-link', menu).forEach(link => {
    link.addEventListener('click', () => {
      state.isMobileMenuOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.isMobileMenuOpen) {
      state.isMobileMenuOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================================
// Filter Form
// ============================================================================

function initFilters() {
  const form = $('#filter-form');

  // Populate countries
  const countryList = $('#country-list');
  COUNTRIES.forEach(country => {
    const label = createElement(`
      <label class="filter-option">
        <input type="checkbox" name="country" value="${country.code}">
        <span class="filter-option-ui">
          <span>${country.flag} ${country.name}</span>
          <span style="margin-left:auto;color:var(--fg-subtle);font-size:0.75rem;">${country.jobs.toLocaleString()}</span>
        </span>
      </label>
    `);
    countryList.appendChild(label);
  });

  // Populate technologies
  const techList = $('#tech-list');
  const techByCategory = TECHNOLOGIES.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  Object.entries(techByCategory).forEach(([category, techs]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'tech-category';
    categoryDiv.innerHTML = `<div class="tech-category-label">${category.charAt(0).toUpperCase() + category.slice(1)}</div>`;
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'filter-options';
    techs.forEach(tech => {
      const label = createElement(`
        <label class="filter-option">
          <input type="checkbox" name="techStack" value="${tech.id}">
          <span class="filter-option-ui" style="gap:8px;">
            <span style="width:10px;height:10px;border-radius:2px;background:${tech.color};flex-shrink:0;"></span>
            <span>${tech.name}</span>
          </span>
        </label>
      `);
      optionsDiv.appendChild(label);
    });
    categoryDiv.appendChild(optionsDiv);
    techList.appendChild(categoryDiv);
  });

  // Filter search functionality
  $$('.filter-search input').forEach(input => {
    input.addEventListener('input', debounce(e => {
      const term = e.target.value.toLowerCase();
      const container = e.target.closest('.filter-group').querySelector('.filter-options');
      $$('.filter-option', container).forEach(opt => {
        const text = opt.textContent.toLowerCase();
        opt.style.display = text.includes(term) ? 'flex' : 'none';
      });
    }, 200));
  });

  // Expand/collapse
  $$('.filter-expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const target = $('#' + btn.getAttribute('aria-controls'));
      if (target) target.style.maxHeight = expanded ? '200px' : 'none';
    });
  });

  // Salary presets
  $$('.salary-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.salary-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $('#salary-min').value = btn.dataset.min || '';
      $('#salary-max').value = btn.dataset.max || '';
    });
  });

  // Form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    state.filters = {
      keyword: formData.get('keyword') || '',
      jobType: formData.getAll('jobType'),
      country: formData.getAll('country'),
      visaType: formData.getAll('visaType'),
      salaryMin: formData.get('salaryMin') ? parseInt(formData.get('salaryMin')) : null,
      salaryMax: formData.get('salaryMax') ? parseInt(formData.get('salaryMax')) : null,
      techStack: formData.getAll('techStack'),
      experience: formData.getAll('experience'),
      remote: formData.getAll('remote'),
    };
    state.currentPage = 1;
    applyFilters();
  });

  // Form reset
  form.addEventListener('reset', () => {
    state.filters = {
      keyword: '',
      jobType: ['fulltime'],
      country: [],
      visaType: [],
      salaryMin: null,
      salaryMax: null,
      techStack: [],
      experience: [],
      remote: [],
    };
    $$('.salary-preset').forEach(b => b.classList.remove('active'));
    $('#salary-min').value = '';
    $('#salary-max').value = '';
    state.currentPage = 1;
    applyFilters();
  });

  // Hero search form
  $('#hero-search').addEventListener('submit', e => {
    e.preventDefault();
    const keyword = $('#hero-keyword').value.trim();
    const location = $('#hero-location').value.trim();
    state.filters.keyword = keyword;
    if (location) {
      const country = COUNTRIES.find(c => c.name.toLowerCase().includes(location.toLowerCase()) || c.code.toLowerCase() === location.toLowerCase());
      if (country) state.filters.country = [country.code];
      else if (location.toLowerCase() === 'remote') {
        state.filters.remote = ['fully-remote'];
      }
    }
    state.currentPage = 1;
    applyFilters();
    $('#search').scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================================================
// Job Filtering & Rendering
// ============================================================================

function applyFilters() {
  let jobs = filterJobs(JOBS, state.filters);
  jobs = sortJobs(jobs, state.sortBy);
  state.filteredJobs = jobs;
  state.totalJobs = jobs.length;
  renderJobs();
  renderPagination();
}

function renderJobs() {
  const grid = $('#jobs-grid');
  const noResults = $('#no-results');
  const pagination = $('#pagination');

  if (state.filteredJobs.length === 0) {
    grid.innerHTML = '';
    noResults.hidden = false;
    pagination.hidden = true;
    $('#results-count').textContent = '0 jobs found';
    return;
  }

  noResults.hidden = true;
  pagination.hidden = false;

  const paginated = paginateJobs(state.filteredJobs, state.currentPage, state.pageSize);
  $('#results-count').textContent = `${state.totalJobs.toLocaleString()} job${state.totalJobs !== 1 ? 's' : ''} found`;

  grid.innerHTML = '';
  grid.classList.toggle('grid-view', state.viewMode === 'grid');

  paginated.jobs.forEach(job => {
    const card = createJobCard(job);
    grid.appendChild(card);
  });
}

function createJobCard(job) {
  const card = createElement(`
    <article class="job-card" data-job-id="${job.id}" role="listitem">
      <span class="job-card-flag ${job.eligibility}">${formatEligibility(job.eligibility)}</span>
      <div class="job-company">
        <div class="company-logo" style="background:${job.companyColor}22;color:${job.companyColor}">${job.companyLogo}</div>
        <div class="company-info">
          <div class="company-name">${job.company}</div>
          <div class="company-type">${job.companyType}</div>
        </div>
      </div>
      <div class="job-content">
        <h3 class="job-title">${job.title}</h3>
        <div class="job-meta">
          <span class="job-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${job.location}, ${getCountryName(job.country)} ${job.countryFlag}
          </span>
          <span class="job-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${formatJobType(job.jobType)}
          </span>
          <span class="job-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            ${formatExperience(job.experience)}
          </span>
          <span class="job-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            ${formatRemote(job.remotePolicy)}
          </span>
        </div>
        <div class="job-tags">
          ${job.techStack.slice(0, 6).map(t => `<span class="job-tag tech">${t}</span>`).join('')}
          ${job.visaTypes.some(v => v !== 'none-required') ? `<span class="job-tag visa">${job.visaTypes.find(v => v !== 'none-required')?.replace('-', ' ')}</span>` : ''}
        </div>
      </div>
      <div class="job-footer">
        <div class="job-salary">${formatSalary(job.salaryMin, job.salaryMax)}</div>
        <div class="job-actions">
          <button class="btn btn-ghost btn-sm" data-action="details">Details</button>
          <a href="${job.applyUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Apply</a>
        </div>
      </div>
    </article>
  `);

  // Event listeners
  card.querySelector('[data-action="details"]').addEventListener('click', () => openJobModal(job));
  card.querySelector('a[href*="careers"]').addEventListener('click', (e) => {
    // Track click
  });

  return card;
}

function formatEligibility(e) {
  const map = { eligible: '✓ Eligible', near: '⚠ Near Match', 'not-eligible': '✗ Not Eligible' };
  return map[e] || e;
}

function formatJobType(t) {
  const map = {
    fulltime: 'Full-time', parttime: 'Part-time', freelance: 'Freelance',
    contract: 'Contract', internship: 'Internship', government: 'Government'
  };
  return map[t] || t;
}

function formatExperience(e) {
  const map = { entry: 'Entry (0-2 yrs)', mid: 'Mid (2-5 yrs)', senior: 'Senior (5-10 yrs)', lead: 'Lead/Principal (10+)', executive: 'Executive' };
  return map[e] || e;
}

function formatRemote(r) {
  const map = { 'fully-remote': 'Fully Remote', hybrid: 'Hybrid', onsite: 'On-site', relocation: 'Relocation Offered' };
  return map[r] || r;
}

function renderPagination() {
  const pagination = $('#pagination');
  const paginated = paginateJobs(state.filteredJobs, state.currentPage, state.pageSize);
  const { totalPages, currentPage } = paginated;

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let html = '';

  // Previous
  html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}" aria-label="Previous page">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
  </button>`;

  // Pages
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  if (start > 1) {
    html += `<button class="page-btn" data-page="1">1</button>`;
    if (start > 2) html += `<span class="page-ellipsis">…</span>`;
  }

  for (let i = start; i <= end; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  if (end < totalPages) {
    if (end < totalPages - 1) html += `<span class="page-ellipsis">…</span>`;
    html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
  }

  // Next
  html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}" aria-label="Next page">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </button>`;

  pagination.innerHTML = html;

  $$('.page-btn', pagination).forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.dataset.page);
      if (!isNaN(page) && page !== state.currentPage && page >= 1 && page <= totalPages) {
        state.currentPage = page;
        renderJobs();
        renderPagination();
        $('.results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================================
// View Mode Toggle
// ============================================================================

function initViewToggle() {
  $$('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.viewMode = btn.dataset.view;
      $$('.view-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });
      renderJobs();
    });
  });
}

// ============================================================================
// Sort Select
// ============================================================================

function initSort() {
  $('#sort-select').addEventListener('change', e => {
    state.sortBy = e.target.value;
    state.currentPage = 1;
    applyFilters();
  });
}

// ============================================================================
// Job Detail Modal
// ============================================================================

function openJobModal(job) {
  const modal = $('#job-modal');
  const body = $('#modal-body');

  body.innerHTML = `
    <div class="modal-job-header">
      <div class="modal-company-logo" style="background:${job.companyColor}22;color:${job.companyColor}">${job.companyLogo}</div>
      <div class="modal-job-title-block">
        <h2>${job.title}</h2>
        <div class="modal-job-company">${job.company} · ${job.location}, ${getCountryName(job.country)} ${job.countryFlag}</div>
        <div class="modal-job-badges">
          <span class="modal-badge ${job.eligibility}">${formatEligibility(job.eligibility)}</span>
          <span class="modal-badge type">${formatJobType(job.jobType)}</span>
          <span class="modal-badge type">${formatExperience(job.experience)}</span>
          <span class="modal-badge type">${formatRemote(job.remotePolicy)}</span>
          ${job.visaTypes.some(v => v !== 'none-required') ? `<span class="modal-badge visa">Visa: ${job.visaTypes.filter(v => v !== 'none-required').map(v => v.replace('-', ' ')).join(', ')}</span>` : ''}
        </div>
      </div>
    </div>

    <div class="modal-job-body">
      <section class="modal-section">
        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Overview</h3>
        <div class="modal-meta-grid">
          <div class="modal-meta-item"><span class="modal-meta-label">Salary</span><span class="modal-meta-value">${formatSalary(job.salaryMin, job.salaryMax)}</span></div>
          <div class="modal-meta-item"><span class="modal-meta-label">Job Type</span><span class="modal-meta-value">${formatJobType(job.jobType)}</span></div>
          <div class="modal-meta-item"><span class="modal-meta-label">Experience</span><span class="modal-meta-value">${formatExperience(job.experience)}</span></div>
          <div class="modal-meta-item"><span class="modal-meta-label">Remote Policy</span><span class="modal-meta-value">${formatRemote(job.remotePolicy)}</span></div>
          <div class="modal-meta-item"><span class="modal-meta-label">Visa Support</span><span class="modal-meta-value">${job.visaTypes.map(v => v.replace('-', ' ')).join(', ')}</span></div>
          <div class="modal-meta-item"><span class="modal-meta-label">Posted</span><span class="modal-meta-value">${formatDate(job.postedDate)}</span></div>
          <div class="modal-meta-item"><span class="modal-meta-label">Expires</span><span class="modal-meta-value">${formatDate(job.expiresDate)}</span></div>
          <div class="modal-meta-item"><span class="modal-meta-label">Source</span><span class="modal-meta-value">${job.source === 'company-careers' ? 'Company Career Page' : job.source}</span></div>
        </div>
      </section>

      <section class="modal-section">
        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg> Description</h3>
        <div class="modal-description">${job.description}</div>
      </section>

      <section class="modal-section">
        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/></svg> Requirements</h3>
        <div class="modal-requirements">
          ${job.requirements.required.map((req, i) => `
            <div class="modal-requirement">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <div class="modal-requirement-text"><strong>Required:</strong> ${req}</div>
            </div>
          `).join('')}
          ${job.requirements.preferred.map((req, i) => `
            <div class="modal-requirement missing">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div class="modal-requirement-text"><strong>Preferred:</strong> ${req}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="modal-section">
        <h3><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/></svg> Tech Stack</h3>
        <div class="job-tags" style="gap:8px;">
          ${job.techStack.map(t => `<span class="job-tag tech">${t}</span>`).join('')}
        </div>
      </section>
    </div>

    <div class="modal-actions">
      <a href="${job.applyUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Apply on Company Site
      </a>
      <button class="btn btn-ghost btn-lg" data-action="save">Save Job</button>
    </div>
  `;

  body.querySelector('[data-action="save"]').addEventListener('click', () => {
    showToast(`${job.title} saved to your profile`, 'success', 'Saved!');
  });

  modal.showModal();
}

function initModal() {
  const modal = $('#job-modal');
  modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.open) modal.close();
  });
}

// ============================================================================
// Resume Match
// ============================================================================

function initResumeMatch() {
  const uploadArea = $('#upload-area');
  const fileInput = $('#resume-file');
  const browseBtn = $('#browse-btn');
  const removeBtn = $('#remove-resume');
  const changeBtn = $('#change-resume');
  const analyzeBtn = $('#analyze-btn');
  const newResumeBtn = $('#new-resume-btn');
  const uploadContent = $('#upload-content');
  const uploadPreview = $('#upload-preview');
  const previewName = $('#preview-name');
  const previewSize = $('#preview-size');
  const matchFilters = $$('.match-filter');
  const matchJobsContainer = $('#match-jobs');

  // Drag and drop
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => uploadArea.classList.add('drag-over'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('drag-over'), false);
  });

  uploadArea.addEventListener('drop', handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    if (file && validateFile(file)) {
      handleFile(file);
    }
  }

  // Click to browse
  browseBtn.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('click', e => {
    if (e.target === uploadArea || e.target === uploadContent || uploadContent.contains(e.target)) {
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });

  function validateFile(file) {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      showToast('Please upload a PDF, DOC, DOCX, or TXT file', 'error', 'Invalid File Type');
      return false;
    }
    if (file.size > maxSize) {
      showToast('File size must be less than 10MB', 'error', 'File Too Large');
      return false;
    }
    return true;
  }

  function handleFile(file) {
    state.resumeFile = file;
    previewName.textContent = file.name;
    previewSize.textContent = formatFileSize(file.size);
    uploadContent.hidden = true;
    uploadPreview.hidden = false;
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  // Remove/Change
  removeBtn.addEventListener('click', () => resetUpload());
  changeBtn.addEventListener('click', () => fileInput.click());

  function resetUpload() {
    state.resumeFile = null;
    state.resumeData = null;
    state.matchedJobs = [];
    fileInput.value = '';
    uploadContent.hidden = false;
    uploadPreview.hidden = true;
    $('#match-results-panel').hidden = true;
    $('#upload-panel').querySelector('.upload-area').style.display = 'block';
  }

  // Analyze
  analyzeBtn.addEventListener('click', async () => {
    if (!state.resumeFile) return;

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
      <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2v4" stroke-linecap="round"/></svg>
      Analyzing...
    `;

    try {
      state.resumeData = await parseResume(state.resumeFile);
      state.matchedJobs = matchJobsToResume(JOBS, state.resumeData);

      // Show results
      $('#upload-panel').querySelector('.upload-area').style.display = 'none';
      $('#match-results-panel').hidden = false;
      renderMatchStats();
      renderMatchJobs();
      showToast('Resume analyzed successfully!', 'success', 'Done');
    } catch (err) {
      showToast('Failed to analyze resume. Please try again.', 'error', 'Error');
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        Analyze & Match Jobs
      `;
    }
  });

  // New resume
  newResumeBtn.addEventListener('click', resetUpload);

  // Match filters
  matchFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      state.matchFilter = btn.dataset.filter;
      matchFilters.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn);
      });
      renderMatchJobs();
    });
  });

  function renderMatchStats() {
    if (!state.matchedJobs.length) return;

    const eligible = state.matchedJobs.filter(j => j.eligibility === 'eligible').length;
    const near = state.matchedJobs.filter(j => j.eligibility === 'near').length;
    const visa = state.matchedJobs.filter(j => j.hasVisaMatch).length;

    $('#total-matches').textContent = state.matchedJobs.length;
    $('#eligible-matches').textContent = eligible;
    $('#near-matches').textContent = near;
    $('#visa-matches').textContent = visa;

    $('#match-meta').textContent = `Based on your skills: ${state.resumeData.skills.slice(0, 5).join(', ')}${state.resumeData.skills.length > 5 ? '...' : ''}`;
  }

  function renderMatchJobs() {
    let jobs = state.matchedJobs;

    if (state.matchFilter !== 'all') {
      jobs = jobs.filter(j => j.eligibility === state.matchFilter);
    }

    matchJobsContainer.innerHTML = '';

    if (jobs.length === 0) {
      matchJobsContainer.innerHTML = `
        <div class="no-results" style="padding:40px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <h3>No matches for this filter</h3>
          <p>Try a different filter or adjust your resume</p>
        </div>
      `;
      return;
    }

    jobs.slice(0, 50).forEach(job => {
      const card = createMatchJobCard(job);
      matchJobsContainer.appendChild(card);
    });
  }

  function createMatchJobCard(job) {
    const card = createElement(`
      <article class="match-job-card" data-job-id="${job.id}" role="listitem">
        <div class="match-job-header">
          <div>
            <h4 class="match-job-title">${job.title}</h4>
            <div class="match-job-company">${job.company} · ${job.location}, ${getCountryName(job.country)}</div>
          </div>
          <div class="match-job-eligibility ${job.eligibility}">
            <svg class="match-job-eligibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${job.eligibility === 'eligible' ? '<polyline points="20 6 9 17 4 12"/>' : ''}
              ${job.eligibility === 'near' ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : ''}
              ${job.eligibility === 'not-eligible' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>' : ''}
            </svg>
            ${formatMatchEligibility(job.eligibility)}
          </div>
        </div>

        <div class="match-job-details">
          <span class="match-job-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
            ${formatSalary(job.salaryMin, job.salaryMax)}
          </span>
          <span class="match-job-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/></svg>
            ${formatExperience(job.experience)}
          </span>
          <span class="match-job-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            ${formatRemote(job.remotePolicy)}
          </span>
          <span class="match-job-detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/></svg>
            ${job.matchScore}% match
          </span>
        </div>

        <div class="match-job-tags">
          ${job.matchedSkills.slice(0, 5).map(s => `<span class="job-tag tech">${s}</span>`).join('')}
          ${job.missingSkills.slice(0, 3).map(s => `<span class="job-tag" style="background:var(--warning-light);border-color:var(--warning);color:var(--warning)">${s}</span>`).join('')}
          ${job.visaTypes.some(v => v !== 'none-required') ? `<span class="job-tag visa">${job.visaTypes.filter(v => v !== 'none-required').map(v => v.replace('-', ' ')).join(', ')}</span>` : ''}
        </div>

        ${job.todoItems.length > 0 ? `
        <div class="match-job-todo">
          <div class="match-job-todo-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            To Do for Eligible
          </div>
          <div class="match-job-todo-list">
            ${job.todoItems.map(item => `
              <div class="match-job-todo-item ${item.toLowerCase().includes('preferred') ? 'done' : ''}">${item}</div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <div class="match-job-actions">
          <button class="btn btn-ghost btn-sm" data-action="details">View Details</button>
          <a href="${job.applyUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Apply Now</a>
        </div>
      </article>
    `);

    card.querySelector('[data-action="details"]').addEventListener('click', () => openJobModal(job));

    return card;
  }

  function formatMatchEligibility(e) {
    const map = { eligible: 'Eligible ✓', near: 'Near Match ⚠', 'not-eligible': 'Not Eligible ✗' };
    return map[e] || e;
  }
}

// ============================================================================
// Clear Filters Button (No Results)
// ============================================================================

function initClearFilters() {
  $('#clear-filters-btn').addEventListener('click', () => {
    $('#filter-form').reset();
    state.filters = {
      keyword: '',
      jobType: ['fulltime'],
      country: [],
      visaType: [],
      salaryMin: null,
      salaryMax: null,
      techStack: [],
      experience: [],
      remote: [],
    };
    $$('.salary-preset').forEach(b => b.classList.remove('active'));
    $('#salary-min').value = '';
    $('#salary-max').value = '';
    state.currentPage = 1;
    applyFilters();
  });
}

// ============================================================================
// CTA Buttons
// ============================================================================

function initCTA() {
  $('#cta-search').addEventListener('click', () => {
    $('#search').scrollIntoView({ behavior: 'smooth' });
  });
  $('#cta-upload').addEventListener('click', () => {
    $('#resume-match').scrollIntoView({ behavior: 'smooth' });
  });
  $('#hero-search [type="submit"]').addEventListener('click', () => {
    $('#search').scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================================================
// Smooth Scroll for Anchor Links
// ============================================================================

function initSmoothScroll() {
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', href);
      }
    }
  });
}

// ============================================================================
// Scroll Animations (IntersectionObserver)
// ============================================================================

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $$('.step, .trust-item, .feature, .float-card, .section-header, .hero-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add animate-in class styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
    @media (prefers-reduced-motion: reduce) {
      .step, .trust-item, .feature, .float-card, .section-header, .hero-content > * {
        opacity: 1 !important; transform: none !important; transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// Stats Counter Animation
// ============================================================================

function initStatsCounter() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $$('.stat-value[data-count]').forEach(el => observer.observe(el));

  function animateValue(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = current.toLocaleString() + (target >= 1000000 ? 'M+' : target >= 1000 ? 'K+' : '+');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
}

// ============================================================================
// Keyboard Navigation
// ============================================================================

function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    // Escape closes modal
    if (e.key === 'Escape') {
      const modal = $('#job-modal');
      if (modal.open) modal.close();
    }

    // Arrow keys for pagination when focused
    if (e.target.matches('.page-btn') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      const buttons = $$('.page-btn:not(:disabled)');
      const index = buttons.indexOf(e.target);
      const nextIndex = e.key === 'ArrowRight' ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
      buttons[nextIndex].focus();
    }
  });
}

// ============================================================================
// Initialize Everything
// ============================================================================

function init() {
  // Core
  initTheme();
  initMobileMenu();
  initBackground();
  initModal();

  // Search
  initFilters();
  initViewToggle();
  initSort();
  initClearFilters();

  // Resume Match
  initResumeMatch();

  // UI
  initCTA();
  initSmoothScroll();
  initScrollAnimations();
  initStatsCounter();
  initKeyboardNav();

  // Initial render
  applyFilters();

  // Add spin animation for loading
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(style);

  console.log('Global Job Search initialized');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}