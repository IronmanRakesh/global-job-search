/**
 * Global Job Search — Main Application
 * Flow: Job Type → Country → Fetch → Advanced Filters & Results
 */

import {
  TARGET_COUNTRIES, JOB_TYPES, VISA_TYPES, TECHNOLOGIES, EXPERIENCE_LEVELS, REMOTE_POLICIES,
  SAMPLE_JOBS, formatSalary, formatDate, getCountryName, getCountryFlag, getCountryCurrency,
  filterJobs, sortJobs, paginateJobs, parseResume, matchJobsToResume
} from './data.js';

// ============================================================================
// State Management
// ============================================================================

const state = {
  // Search flow
  currentStep: 'job-type', // 'job-type', 'country', 'loading', 'results'
  selectedJobType: null,
  selectedCountries: [],
  fetchedJobs: [],
  filteredJobs: [],

  // Filters (for results page)
  filters: {
    keyword: '',
    jobType: [],
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

function showStep(step) {
  state.currentStep = step;
  $('#step-job-type').classList.toggle('hidden', step !== 'job-type');
  $('#step-country').classList.toggle('hidden', step !== 'country');
  $('#step-loading').classList.toggle('hidden', step !== 'loading');
  $('#search').classList.toggle('hidden', step !== 'results');
}

function updateFetchButton() {
  const btn = $('#fetch-jobs-btn');
  btn.disabled = state.selectedCountries.length === 0;
  btn.textContent = state.selectedCountries.length > 0
    ? `Fetch Jobs (${state.selectedCountries.length} countries selected)`
    : 'Fetch Jobs';
}

// ============================================================================
// Job Type Selection
// ============================================================================

function initJobTypeSelection() {
  $$('.job-type-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      state.selectedJobType = type;
      $$('.job-type-card').forEach(c => {
        c.setAttribute('aria-checked', c === card);
      });
      // Move to country selection after a brief delay
      setTimeout(() => {
        showStep('country');
        renderCountryGrid();
        updateFetchButton();
      }, 300);
    });

    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// ============================================================================
// Country Grid
// ============================================================================

function renderCountryGrid() {
  const grid = $('#country-grid');
  grid.innerHTML = '';

  TARGET_COUNTRIES.forEach(country => {
    const isSelected = state.selectedCountries.includes(country.code);
    const card = createElement(`
      <button type="button" class="country-card" data-country="${country.code}" role="radio" aria-checked="${isSelected}" tabindex="0">
        <span class="country-flag">${country.flag}</span>
        <span class="country-name">${country.name}</span>
        <span class="country-code">${country.code}</span>
      </button>
    `);

    card.addEventListener('click', () => toggleCountry(country.code));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCountry(country.code);
      }
    });

    grid.appendChild(card);
  });
}

function toggleCountry(code) {
  const index = state.selectedCountries.indexOf(code);
  if (index === -1) {
    state.selectedCountries.push(code);
  } else {
    state.selectedCountries.splice(index, 1);
  }
  renderCountryGrid();
  updateFetchButton();
}

// ============================================================================
// Fetch Jobs (simulated)
// ============================================================================

function initFetchJobs() {
  $('#fetch-jobs-btn').addEventListener('click', async () => {
    showStep('loading');

    // Simulate fetching from real sources
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Filter sample jobs by selected job type and countries
    let jobs = SAMPLE_JOBS.filter(job =>
      job.jobType === state.selectedJobType &&
      state.selectedCountries.includes(job.country)
    );

    // Also include remote jobs from companies that hire in those countries
    const remoteJobs = SAMPLE_JOBS.filter(job =>
      job.jobType === state.selectedJobType &&
      job.remotePolicy === 'fully-remote' &&
      job.companyType !== 'government'
    );

    jobs = [...jobs, ...remoteJobs];
    // Remove duplicates
    jobs = jobs.filter((job, i, arr) => arr.findIndex(j => j.id === job.id) === i);

    state.fetchedJobs = jobs;
    state.filteredJobs = jobs;
    state.totalJobs = jobs.length;
    state.filters.jobType = [state.selectedJobType];
    state.filters.country = [...state.selectedCountries];
    state.currentPage = 1;

    renderResultsHeader();
    renderCountryFilters();
    renderTechFilters();
    renderJobs();
    renderPagination();

    showStep('results');
    $('#search').scrollIntoView({ behavior: 'smooth' });
  });

  $('#back-to-job-type').addEventListener('click', () => {
    state.selectedCountries = [];
    showStep('job-type');
  });

  $('#new-search-btn').addEventListener('click', () => {
    state.selectedJobType = null;
    state.selectedCountries = [];
    state.fetchedJobs = [];
    state.filteredJobs = [];
    $$('.job-type-card').forEach(c => c.setAttribute('aria-checked', 'false'));
    showStep('job-type');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderResultsHeader() {
  const jobType = JOB_TYPES.find(t => t.value === state.selectedJobType);
  $('#result-job-type').textContent = jobType?.label || state.selectedJobType;
  $('#result-countries').textContent = state.selectedCountries
    .map(c => TARGET_COUNTRIES.find(t => t.code === c)?.name || c)
    .join(', ');
  $('#results-count').textContent = state.totalJobs.toLocaleString();
  $('#results-subtitle').textContent = `${state.totalJobs.toLocaleString()} verified jobs found`;
}

// ============================================================================
// Filter Rendering
// ============================================================================

function renderCountryFilters() {
  const list = $('#country-filter-list');
  list.innerHTML = '';

  state.selectedCountries.forEach(code => {
    const country = TARGET_COUNTRIES.find(c => c.code === code);
    if (!country) return;
    const isChecked = state.filters.country.includes(code);
    const label = createElement(`
      <label class="filter-option">
        <input type="checkbox" name="country" value="${code}" ${isChecked ? 'checked' : ''}>
        <span class="filter-option-ui">
          <span>${country.flag} ${country.name}</span>
        </span>
      </label>
    `);
    list.appendChild(label);
  });

  // Bind checkbox events
  $$('input[name="country"]', list).forEach(input => {
    input.addEventListener('change', () => {
      const value = input.value;
      if (input.checked) {
        if (!state.filters.country.includes(value)) state.filters.country.push(value);
      } else {
        state.filters.country = state.filters.country.filter(v => v !== value);
      }
      applyFilters();
    });
  });
}

function renderTechFilters() {
  const list = $('#tech-filter-list');
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
    list.appendChild(categoryDiv);
  });

  // Filter search
  $('#tech-filter-list').closest('.filter-group').querySelector('.filter-search input')
    .addEventListener('input', debounce(e => {
      const term = e.target.value.toLowerCase();
      $$('.filter-option', list).forEach(opt => {
        const text = opt.textContent.toLowerCase();
        opt.style.display = text.includes(term) ? 'flex' : 'none';
      });
    }, 200));
}

// ============================================================================
// Job Filtering & Rendering
// ============================================================================

function applyFilters() {
  let jobs = filterJobs(state.fetchedJobs, state.filters);
  jobs = sortJobs(jobs, state.sortBy);
  state.filteredJobs = jobs;
  state.totalJobs = jobs.length;
  state.currentPage = 1;
  renderJobs();
  renderPagination();
  $('#results-count').textContent = state.totalJobs.toLocaleString();
  $('#results-subtitle').textContent = `${state.totalJobs.toLocaleString()} verified jobs found`;
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
        <div class="job-salary">${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</div>
        <div class="job-actions">
          <button class="btn btn-ghost btn-sm" data-action="details">Details</button>
          <a href="${job.applyUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Apply on Company Site</a>
        </div>
      </div>
    </article>
  `);

  card.querySelector('[data-action="details"]').addEventListener('click', () => openJobModal(job));

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

  html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}" aria-label="Previous page">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
  </button>`;

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
// Filter Form
// ============================================================================

function initFilters() {
  const form = $('#filter-form');

  // Keyword search
  $('#keyword-filter').addEventListener('input', debounce(e => {
    state.filters.keyword = e.target.value;
    applyFilters();
  }, 300));

  // Visa type
  $$('input[name="visaType"]', form).forEach(input => {
    input.addEventListener('change', () => {
      const value = input.value;
      if (input.checked) {
        if (!state.filters.visaType.includes(value)) state.filters.visaType.push(value);
      } else {
        state.filters.visaType = state.filters.visaType.filter(v => v !== value);
      }
      applyFilters();
    });
  });

  // Salary presets
  $$('.salary-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.salary-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $('#salary-min').value = btn.dataset.min || '';
      $('#salary-max').value = btn.dataset.max || '';
      state.filters.salaryMin = btn.dataset.min ? parseInt(btn.dataset.min) : null;
      state.filters.salaryMax = btn.dataset.max ? parseInt(btn.dataset.max) : null;
      applyFilters();
    });
  });

  $('#salary-min').addEventListener('change', e => {
    state.filters.salaryMin = e.target.value ? parseInt(e.target.value) : null;
    $$('.salary-preset').forEach(b => b.classList.remove('active'));
    applyFilters();
  });

  $('#salary-max').addEventListener('change', e => {
    state.filters.salaryMax = e.target.value ? parseInt(e.target.value) : null;
    $$('.salary-preset').forEach(b => b.classList.remove('active'));
    applyFilters();
  });

  // Experience
  $$('input[name="experience"]', form).forEach(input => {
    input.addEventListener('change', () => {
      const value = input.value;
      if (input.checked) {
        if (!state.filters.experience.includes(value)) state.filters.experience.push(value);
      } else {
        state.filters.experience = state.filters.experience.filter(v => v !== value);
      }
      applyFilters();
    });
  });

  // Remote
  $$('input[name="remote"]', form).forEach(input => {
    input.addEventListener('change', () => {
      const value = input.value;
      if (input.checked) {
        if (!state.filters.remote.includes(value)) state.filters.remote.push(value);
      } else {
        state.filters.remote = state.filters.remote.filter(v => v !== value);
      }
      applyFilters();
    });
  });

  // Tech stack
  $$('input[name="techStack"]', form).forEach(input => {
    input.addEventListener('change', () => {
      const value = input.value;
      if (input.checked) {
        if (!state.filters.techStack.includes(value)) state.filters.techStack.push(value);
      } else {
        state.filters.techStack = state.filters.techStack.filter(v => v !== value);
      }
      applyFilters();
    });
  });

  // Form reset
  form.addEventListener('reset', () => {
    state.filters = {
      keyword: '',
      jobType: [state.selectedJobType],
      country: [...state.selectedCountries],
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
    $('#keyword-filter').value = '';
    state.currentPage = 1;
    applyFilters();
  });

  // Country filter search
  $('#country-filter-list').closest('.filter-group').querySelector('.filter-search input')
    .addEventListener('input', debounce(e => {
      const term = e.target.value.toLowerCase();
      $$('.filter-option', '#country-filter-list').forEach(opt => {
        const text = opt.textContent.toLowerCase();
        opt.style.display = text.includes(term) ? 'flex' : 'none';
      });
    }, 200));

  // Expand/collapse
  $$('.filter-expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const target = $('#' + btn.getAttribute('aria-controls'));
      if (target) target.style.maxHeight = expanded ? '200px' : 'none';
    });
  });

  $('#clear-filters-btn').addEventListener('click', () => form.reset());
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
          <div class="modal-meta-item"><span class="modal-meta-label">Salary</span><span class="modal-meta-value">${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</span></div>
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
      state.matchedJobs = matchJobsToResume(SAMPLE_JOBS, state.resumeData);

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
            ${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
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

  $$('.nav-link', menu).forEach(link => {
    link.addEventListener('click', () => {
      state.isMobileMenuOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

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
// CTA Buttons
// ============================================================================

function initCTA() {
  $('#cta-search').addEventListener('click', () => {
    showStep('job-type');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  $('#cta-upload').addEventListener('click', () => {
    $('#resume-match').scrollIntoView({ behavior: 'smooth' });
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

  $$('.step, .trust-item, .feature, .job-type-card, .country-card, .section-header, .hero-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
    @media (prefers-reduced-motion: reduce) {
      .step, .trust-item, .feature, .job-type-card, .country-card, .section-header, .hero-content > * {
        opacity: 1 !important; transform: none !important; transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================================================
// Keyboard Navigation
// ============================================================================

function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const modal = $('#job-modal');
      if (modal.open) modal.close();
    }

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
  initModal();

  // Search flow
  initJobTypeSelection();
  initFetchJobs();

  // Results
  initViewToggle();
  initSort();
  initFilters();

  // Resume Match
  initResumeMatch();

  // UI
  initCTA();
  initSmoothScroll();
  initScrollAnimations();
  initKeyboardNav();

  // Initial state
  showStep('job-type');

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