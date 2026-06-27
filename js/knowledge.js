/* ═══════════════════════════════════════
   StudyOS — Knowledge Hub
   ═══════════════════════════════════════ */

const KnowledgeModule = {
  init() {
    this.render();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'knowledge') this.render();
    });
  },

  render() {
    const grid = document.getElementById('knowledgeGrid');
    if (!grid) return;
    const read = Store.get('articlesRead_set', []);

    grid.innerHTML = DATA.knowledgeTopics.map((topic, i) => {
      const isRead = read.includes(i);
      return `
        <div class="knowledge-card" data-idx="${i}">
          <div class="icon">${topic.icon}</div>
          <h4>${topic.title}</h4>
          <p>${topic.short}</p>
          ${isRead ? '<span class="badge badge-green" style="margin-top:8px;display:inline-block">✔ Read</span>' : ''}
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.knowledge-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx);
        this.openTopic(idx);
      });
    });
  },

  openTopic(idx) {
    const topic = DATA.knowledgeTopics[idx];
    if (!topic) return;

    openModal(`
      <div>
        <div style="font-size:2rem;margin-bottom:8px">${topic.icon}</div>
        <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:var(--space-md)">${topic.title}</h3>
        <div style="font-size:0.9rem;color:var(--text-secondary);line-height:1.8">
          ${topic.body.split('\n\n').map(p => `<p style="margin-bottom:12px">${p.replace(/\n/g, '<br>')}</p>`).join('')}
        </div>
        <button class="btn-primary" id="markRead" style="margin-top:16px">✔ Mark as Read</button>
      </div>
    `);

    document.getElementById('markRead')?.addEventListener('click', () => {
      const read = Store.get('articlesRead_set', []);
      if (!read.includes(idx)) {
        read.push(idx);
        Store.set('articlesRead_set', read);
        Store.updateStats(s => { s.articlesRead = read.length; return s; });
        showToast('📚 Article marked as read!');
      }
      closeModal();
      this.render();
    });
  }
};
