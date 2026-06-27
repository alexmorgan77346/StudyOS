/* ═══════════════════════════════════════
   StudyOS — Study System + Roadmap
   ═══════════════════════════════════════ */

const StudyModule = {
  init() {
    this.renderTechniques();
    this.renderRoadmap();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'study')   this.renderTechniques();
      if (e.detail === 'roadmap') this.renderRoadmap();
    });
  },

  renderTechniques() {
    const grid = document.getElementById('techniquesGrid');
    if (!grid) return;
    grid.innerHTML = DATA.techniques.map(t => `
      <div class="technique-card" data-id="${t.id}">
        <div class="technique-icon">${t.icon}</div>
        <div class="technique-name">${t.name}</div>
        <div class="technique-tagline">${t.tagline}</div>
        <div class="technique-badge">
          <span class="badge ${t.badgeColor}">${t.badge}</span>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.technique-card').forEach(card => {
      card.addEventListener('click', () => {
        const t = DATA.techniques.find(x => x.id === card.dataset.id);
        if (t) this.openTechniqueModal(t);
      });
    });

    // Mark study pillar
    Store.markPillar('study');
    Dashboard.render();
  },

  openTechniqueModal(t) {
    openModal(`
      <div class="modal-technique">
        <div style="font-size:2rem;margin-bottom:8px">${t.icon}</div>
        <h3>${t.name}</h3>
        <span class="badge ${t.badgeColor}" style="margin-bottom:12px;display:inline-block">${t.badge}</span>

        <h4>What it is</h4>
        <div class="what-box">${t.what}</div>

        <h4>Why it works</h4>
        <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6">${t.why}</p>

        <div class="science-box">🔬 <strong>Science:</strong> ${t.science}</div>

        <h4>Step-by-step</h4>
        <ul>${t.steps.map(s => `<li>${s}</li>`).join('')}</ul>

        <h4>Example</h4>
        <div class="what-box" style="font-style:italic">💡 ${t.example}</div>

        <h4>Mistakes to avoid</h4>
        <ul>${t.mistakes.map(m => `<li>⚠ ${m}</li>`).join('')}</ul>
      </div>
    `);
  },

  renderRoadmap() {
    const container = document.getElementById('roadmapSteps');
    if (!container) return;
    const saved = Store.get('roadmap_progress', {});

    container.innerHTML = DATA.roadmapSteps.map((step, i) => {
      const done = !!saved[i];
      const active = !done && Object.keys(saved).length === i;
      return `
        <div class="roadmap-step ${done ? 'completed' : ''} ${active ? 'active' : ''}" data-step="${i}">
          <div class="step-dot">${done ? '✔' : i + 1}</div>
          <div class="step-content">
            <div class="step-title">${step.icon} ${step.title}</div>
            <div class="step-desc">${step.desc}</div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.step-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const current = Store.get('roadmap_progress', {});
        current[i] = !current[i];
        Store.set('roadmap_progress', current);
        this.renderRoadmap();
        if (Object.values(current).filter(Boolean).length >= DATA.roadmapSteps.length) {
          showToast('🎉 Roadmap complete! Great study session!');
        }
      });
    });
  }
};
