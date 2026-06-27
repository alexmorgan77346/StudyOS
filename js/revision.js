/* ═══════════════════════════════════════
   StudyOS — Revision Planner
   ═══════════════════════════════════════ */

const RevisionModule = {
  intervals: [0, 1, 3, 7, 15, 30, 90], // days after original study date

  init() {
    this.render();
    document.getElementById('addRevisionBtn')?.addEventListener('click', () => this.addTopic());
    document.getElementById('revisionTopic')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.addTopic();
    });
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'revision') this.render();
    });
  },

  addTopic() {
    const input = document.getElementById('revisionTopic');
    const topic = input?.value.trim();
    if (!topic) return;

    const revisions = Store.getRevisions();
    const today = Store.today();

    // Create all revision dates for this topic
    this.intervals.forEach(days => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      revisions.push({
        id: Date.now() + '_' + days,
        topic,
        studiedDate: today,
        dueDate: date.toISOString().split('T')[0],
        interval: days,
        done: false,
      });
    });

    Store.set('revisions', revisions);
    Store.markPillar('revision');
    Dashboard.render();

    input.value = '';
    showToast(`📚 "${topic}" added to 7 revision sessions!`);
    this.render();
  },

  render() {
    const container = document.getElementById('revisionSchedule');
    if (!container) return;

    const revisions = Store.getRevisions();
    const today = Store.today();

    if (!revisions.length) {
      container.innerHTML = `
        <div class="glass-card" style="text-align:center;padding:var(--space-xl)">
          <div style="font-size:2rem;margin-bottom:8px">📅</div>
          <p style="color:var(--text-secondary)">No revision topics yet. Add your first topic above!</p>
        </div>
      `;
      return;
    }

    // Group by relative time
    const groups = {
      overdue: [], today: [], upcoming: [], done: []
    };

    revisions.forEach(r => {
      if (r.done) { groups.done.push(r); return; }
      if (r.dueDate < today) { groups.overdue.push(r); return; }
      if (r.dueDate === today) { groups.today.push(r); return; }
      groups.upcoming.push(r);
    });

    let html = '';

    if (groups.overdue.length) {
      html += this.renderGroup('⚠ Overdue', groups.overdue, true);
    }
    if (groups.today.length) {
      html += this.renderGroup('📅 Due Today', groups.today);
    }
    if (groups.upcoming.length) {
      html += this.renderGroup('🔜 Upcoming', groups.upcoming.slice(0, 20));
    }
    if (groups.done.length) {
      html += this.renderGroup(`✅ Completed (${groups.done.length})`, groups.done.slice(-5));
    }

    container.innerHTML = html;

    // Bind check buttons
    container.querySelectorAll('.rev-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const revisions = Store.getRevisions();
        const item = revisions.find(r => r.id === id);
        if (item) {
          item.done = !item.done;
          Store.set('revisions', revisions);
          Store.updateStats(s => { s.revisionsCompleted = (s.revisionsCompleted || 0) + (item.done ? 1 : -1); return s; });
          Store.markPillar('revision');
          Dashboard.render();
          this.render();
          if (item.done) showToast(`✅ "${item.topic}" revision done!`);
        }
      });
    });
  },

  renderGroup(label, items, overdue = false) {
    return `
      <div class="revision-day-group">
        <div class="revision-day-label" style="${overdue ? 'color:var(--accent-rose)' : ''}">${label}</div>
        ${items.map(r => `
          <div class="revision-item ${r.done ? 'done-rev' : ''}">
            <button class="rev-check-btn" data-id="${r.id}">${r.done ? '✔' : ''}</button>
            <div class="rev-topic">${r.topic}</div>
            <div class="rev-interval">
              ${r.interval === 0 ? 'Same day' : `+${r.interval}d`} · ${this.formatDate(r.dueDate)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }
};
