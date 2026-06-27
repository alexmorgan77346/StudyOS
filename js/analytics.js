/* ═══════════════════════════════════════
   StudyOS — Analytics (Chart.js)
   ═══════════════════════════════════════ */

const AnalyticsModule = {
  charts: {},

  init() {
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'analytics') {
        setTimeout(() => this.renderAll(), 100);
      }
    });
  },

  destroyAll() {
    Object.values(this.charts).forEach(c => { try { c.destroy(); } catch {} });
    this.charts = {};
  },

  getChartDefaults() {
    const isDark = document.documentElement.dataset.theme !== 'light';
    return {
      gridColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      textColor: isDark ? '#9898b8' : '#44446a',
      fontFamily: "'Space Grotesk', sans-serif",
    };
  },

  renderAll() {
    this.destroyAll();
    const history = Store.getHistoryLogs(7);
    const def = this.getChartDefaults();

    const labels = history.map(h => {
      const d = new Date(h.date);
      return d.toLocaleDateString('en-IN', { weekday: 'short' });
    });

    // ── Study Hours chart (sessions count as proxy) ──
    const studyData = history.map(h => {
      const sessions = h.log?.sessions?.length || 0;
      return sessions * 0.4; // approx hours
    });

    const ctx1 = document.getElementById('studyChart');
    if (ctx1) {
      this.charts.study = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Study Hours',
            data: studyData,
            backgroundColor: 'rgba(79,159,255,0.6)',
            borderColor: '#4f9fff',
            borderWidth: 1.5,
            borderRadius: 6,
          }]
        },
        options: this.barOptions(def, 'Hours'),
      });
    }

    // ── Brain Score Trend ──
    const scoreData = history.map(h => h.log?.score || 0);
    const ctx2 = document.getElementById('scoreChart');
    if (ctx2) {
      this.charts.score = new Chart(ctx2, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Brain Score %',
            data: scoreData,
            borderColor: '#9b7ff4',
            backgroundColor: 'rgba(155,127,244,0.15)',
            pointBackgroundColor: '#9b7ff4',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
          }]
        },
        options: this.lineOptions(def, '%'),
      });
    }

    // ── Habit Completion ──
    const habitData = history.map(h => {
      const habits = h.log?.habits || {};
      return Object.values(habits).filter(Boolean).length;
    });
    const ctx3 = document.getElementById('habitChart');
    if (ctx3) {
      this.charts.habit = new Chart(ctx3, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Habits Done',
            data: habitData,
            backgroundColor: 'rgba(79,255,176,0.5)',
            borderColor: '#4fffb0',
            borderWidth: 1.5,
            borderRadius: 6,
          }]
        },
        options: this.barOptions(def, 'Habits'),
      });
    }

    // ── Sleep Quality ──
    const sleepData = history.map(h => h.log?.sleepHours || 0);
    const ctx4 = document.getElementById('sleepChart');
    if (ctx4) {
      this.charts.sleep = new Chart(ctx4, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Sleep Hours',
            data: sleepData,
            borderColor: '#5cf3ff',
            backgroundColor: 'rgba(92,243,255,0.12)',
            pointBackgroundColor: '#5cf3ff',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
          }]
        },
        options: this.lineOptions(def, 'hrs'),
      });
    }
  },

  barOptions(def, unit) {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => `${ctx.raw} ${unit}` } }
      },
      scales: {
        x: { grid: { color: def.gridColor }, ticks: { color: def.textColor, font: { family: def.fontFamily, size: 11 } } },
        y: { grid: { color: def.gridColor }, ticks: { color: def.textColor, font: { family: def.fontFamily, size: 11 } }, beginAtZero: true }
      }
    };
  },

  lineOptions(def, unit) {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => `${ctx.raw} ${unit}` } }
      },
      scales: {
        x: { grid: { color: def.gridColor }, ticks: { color: def.textColor, font: { family: def.fontFamily, size: 11 } } },
        y: { grid: { color: def.gridColor }, ticks: { color: def.textColor, font: { family: def.fontFamily, size: 11 } }, beginAtZero: true }
      }
    };
  }
};
