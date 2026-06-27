/* ═══════════════════════════════════════
   StudyOS — Goal System
   ═══════════════════════════════════════ */

const GoalsModule = {
  activeTab: 'daily',

  init() {
    this.render();
    document.querySelectorAll('.goal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.goal-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = tab.dataset.gtab;
        this.renderGoals();
      });
    });
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'goals') this.render();
    });
  },

  render() {
    this.renderGoals();
  },

  renderGoals() {
    const container = document.getElementById('goalsContent');
    if (!container) return;
    const goals = Store.getGoals(this.activeTab);

    let html = '';

    if (!goals.length) {
      html = `
        <div class="glass-card" style="text-align:center;padding:var(--space-xl)">
          <div style="font-size:2rem;margin-bottom:8px">🎯</div>
          <p style="color:var(--text-secondary)">No ${this.activeTab} goals yet. Add your first goal below!</p>
        </div>
      `;
    } else {
      html = goals.map((g, i) => `
        <div class="goal-item glass-card">
          <div style="font-size:1.2rem;cursor:pointer" data-toggle="${i}">${g.done ? '✅' : '⬜'}</div>
          <div class="goal-text" style="${g.done ? 'text-decoration:line-through;opacity:0.5' : ''}">${g.text}</div>
          <button class="btn-icon" data-del="${i}" style="width:32px;height:32px;font-size:0.75rem">✕</button>
        </div>
      `).join('');
    }

    html += `
      <div class="goal-add-row">
        <input class="form-input" id="goalInput" placeholder="Add a new ${this.activeTab} goal…" />
        <button class="btn-primary" id="goalAdd">Add</button>
      </div>
    `;

    container.innerHTML = html;

    document.getElementById('goalAdd')?.addEventListener('click', () => this.addGoal());
    document.getElementById('goalInput')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.addGoal();
    });

    container.querySelectorAll('[data-toggle]').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.toggle);
        const goals = Store.getGoals(this.activeTab);
        goals[i].done = !goals[i].done;
        Store.saveGoals(this.activeTab, goals);
        this.renderGoals();
        if (goals[i].done) showToast('🎯 Goal completed!');
      });
    });

    container.querySelectorAll('[data-del]').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.del);
        const goals = Store.getGoals(this.activeTab);
        goals.splice(i, 1);
        Store.saveGoals(this.activeTab, goals);
        this.renderGoals();
      });
    });
  },

  addGoal() {
    const input = document.getElementById('goalInput');
    const text = input?.value.trim();
    if (!text) return;
    const goals = Store.getGoals(this.activeTab);
    goals.push({ text, done: false, created: Store.today() });
    Store.saveGoals(this.activeTab, goals);
    input.value = '';
    showToast(`✅ Goal added to ${this.activeTab}!`);
    this.renderGoals();
  }
};
