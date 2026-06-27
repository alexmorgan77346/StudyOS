/* ═══════════════════════════════════════
   StudyOS — Habit Tracker
   ═══════════════════════════════════════ */

const HabitsModule = {
  init() {
    this.render();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'habits') this.render();
    });
  },

  render() {
    this.renderHabits();
    this.renderHeatmap();
  },

  renderHabits() {
    const container = document.getElementById('habitsContainer');
    if (!container) return;

    const log = Store.todayLog();
    const done = log.habits || {};
    const streaks = Store.get('habit_streaks', {});

    container.innerHTML = DATA.defaultHabits.map(habit => {
      const isDone = !!done[habit.id];
      const streak = streaks[habit.id] || 0;
      return `
        <div class="habit-item ${isDone ? 'habit-done' : ''}" data-id="${habit.id}">
          <span class="habit-icon">${habit.icon}</span>
          <div class="habit-info">
            <div class="habit-name">${habit.name}</div>
            <div class="habit-streak">${habit.meta} ${streak > 0 ? `· 🔥 ${streak} day streak` : ''}</div>
          </div>
          <div class="habit-check">${isDone ? '✔' : ''}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.habit-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const log = Store.todayLog();
        log.habits = log.habits || {};
        log.habits[id] = !log.habits[id];
        Store.saveTodayLog(log);

        // Update streaks
        const streaks = Store.get('habit_streaks', {});
        if (log.habits[id]) {
          streaks[id] = (streaks[id] || 0) + 1;
          showToast(`✅ ${DATA.defaultHabits.find(h => h.id === id)?.name} done!`);
        } else {
          streaks[id] = Math.max(0, (streaks[id] || 1) - 1);
        }
        Store.set('habit_streaks', streaks);

        // Sync with pillars
        const pillarMap = { sleep: 'sleep', study: 'study', gym: 'gym', meditate: 'meditate', revise: 'revision' };
        if (pillarMap[id]) Store.markPillar(pillarMap[id]);

        // Check perfect day
        const allHabitsDone = DATA.defaultHabits.every(h => log.habits[h.id]);
        if (allHabitsDone) {
          Store.checkPerfectDay(log);
          showToast('🏆 All habits complete! Perfect day!');
        }

        Dashboard.render();
        this.render();
      });
    });
  },

  renderHeatmap() {
    const container = document.getElementById('heatmap');
    if (!container) return;

    const cells = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = 'log_' + d.toISOString().split('T')[0];
      const log = Store.get(key, null);
      const habitCount = log ? Object.values(log.habits || {}).filter(Boolean).length : 0;
      const level = habitCount >= 8 ? 'h-high' : habitCount >= 4 ? 'h-med' : habitCount >= 1 ? 'h-low' : '';
      cells.push(`<div class="heatmap-cell ${level}" title="${d.toLocaleDateString('en-IN', {day:'numeric',month:'short'})} — ${habitCount} habits"></div>`);
    }
    container.innerHTML = cells.join('');
  }
};
