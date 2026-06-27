/* ═══════════════════════════════════════
   StudyOS — Dashboard
   ═══════════════════════════════════════ */

const Dashboard = {
  init() {
    this.render();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'dashboard') this.render();
    });
    // Add SVG gradient for ring
    const svg = document.querySelector('.score-ring');
    if (svg && !svg.querySelector('defs')) {
      svg.insertAdjacentHTML('afterbegin', `
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4f9fff"/>
            <stop offset="100%" stop-color="#9b7ff4"/>
          </linearGradient>
        </defs>
      `);
    }
  },

  render() {
    const log = Store.todayLog();
    const stats = Store.getStats();
    const score = log.score || 0;

    // Score number
    const scoreEl = document.getElementById('brainScore');
    if (scoreEl) scoreEl.textContent = score + '%';

    // Ring
    const ring = document.getElementById('ringFill');
    if (ring) {
      const circumference = 2 * Math.PI * 50; // r=50
      const offset = circumference - (score / 100) * circumference;
      ring.style.strokeDashoffset = offset;
      ring.style.strokeDasharray = circumference;
    }

    // Streak
    const streakEl = document.getElementById('streakNum');
    if (streakEl) streakEl.textContent = stats.streak || 0;

    // Pillars
    this.renderPillars(log);
  },

  renderPillars(log) {
    const grid = document.getElementById('pillarsGrid');
    if (!grid) return;

    const pillarMeta = {
      sleep:    { val: log.sleepHours ? `${log.sleepHours}h` : '—',    label: 'hrs of sleep' },
      study:    { val: log.pillars.study ? '✔ Done' : '—',             label: 'study session' },
      gym:      { val: log.gymDone?.length ? `${log.gymDone.length} done` : '—', label: 'workout' },
      revision: { val: log.pillars.revision ? '✔ Done' : '—',          label: 'revision' },
      hydrate:  { val: log.nutritionDone?.length ? `${log.nutritionDone.length}/8` : '—', label: 'nutrition checks' },
      meditate: { val: log.pillars.meditate ? '✔ Done' : '—',          label: 'meditation' },
      focus:    { val: log.sessions?.length ? `${log.sessions.length} sessions` : '—', label: 'focus sessions' },
      memory:   { val: log.memoryGames ? `${log.memoryGames} games` : '—', label: 'memory games' },
    };

    grid.innerHTML = DATA.pillars.map(p => {
      const done = !!log.pillars[p.id];
      const meta = pillarMeta[p.id] || {};
      return `
        <div class="pillar-card ${done ? 'done' : ''}" data-page="${p.page}">
          <div class="pillar-header">
            <span class="pillar-emoji">${p.icon}</span>
            <span class="pillar-status ${done ? 'done-tag' : 'pending-tag'}">
              ${done ? '✔ Done' : 'Pending'}
            </span>
          </div>
          <div class="pillar-name">${p.name}</div>
          <div class="pillar-val">${meta.val || '—'}</div>
        </div>
      `;
    }).join('');

    // Click to navigate
    grid.querySelectorAll('.pillar-card').forEach(card => {
      card.addEventListener('click', () => {
        Router.navigate(card.dataset.page);
      });
    });
  }
};
