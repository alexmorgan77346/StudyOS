/* ═══════════════════════════════════════
   StudyOS — Achievements
   ═══════════════════════════════════════ */

const AchievementsModule = {
  init() {
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'achievements') this.render();
    });
  },

  render() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;
    const stats = Store.getStats();

    const unlocked = [];
    const locked = [];

    DATA.achievements.forEach(ach => {
      const isUnlocked = ach.req(stats);
      (isUnlocked ? unlocked : locked).push({ ...ach, isUnlocked });
    });

    const all = [...unlocked, ...locked];

    grid.innerHTML = all.map(ach => `
      <div class="achievement-card ${ach.isUnlocked ? 'unlocked' : 'locked'}">
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-name">${ach.name}</div>
        <div class="ach-desc">${ach.desc}</div>
        ${ach.isUnlocked ? '<div class="ach-unlocked-tag">✨ Unlocked</div>' : '<div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px">🔒 Locked</div>'}
      </div>
    `).join('');

    // Show unlocked count
    const summary = document.querySelector('#page-achievements .page-desc');
    if (summary) {
      summary.textContent = `${unlocked.length}/${DATA.achievements.length} badges earned`;
    }
  }
};
