/* ═══════════════════════════════════════
   StudyOS — Sleep, Gym, Nutrition
   ═══════════════════════════════════════ */

// ──────────── SLEEP ────────────
const SleepModule = {
  init() {
    this.renderInfo();
    this.bindEvents();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'sleep') this.renderInfo();
    });
  },

  bindEvents() {
    const qualitySlider = document.getElementById('sleepQuality');
    const qualityVal = document.getElementById('sleepQualityVal');
    qualitySlider?.addEventListener('input', () => {
      qualityVal.textContent = qualitySlider.value;
    });

    document.getElementById('logSleepBtn')?.addEventListener('click', () => {
      const bed  = document.getElementById('sleepBed')?.value || '22:30';
      const wake = document.getElementById('sleepWake')?.value || '06:30';
      const quality = parseInt(document.getElementById('sleepQuality')?.value || '7');

      const [bh, bm] = bed.split(':').map(Number);
      const [wh, wm] = wake.split(':').map(Number);

      let hours = (wh + wm / 60) - (bh + bm / 60);
      if (hours < 0) hours += 24;
      hours = Math.round(hours * 10) / 10;

      const log = Store.todayLog();
      log.sleepHours = hours;
      log.sleepQuality = quality;
      Store.saveTodayLog(log);
      Store.markPillar('sleep');
      Dashboard.render();

      const result = document.getElementById('sleepResult');
      if (result) {
        const emoji = hours >= 7 ? '😊' : hours >= 6 ? '😐' : '😴';
        result.innerHTML = `
          <div style="margin-top:12px;padding:12px;background:var(--glass-bg);border-radius:12px">
            ${emoji} <strong>${hours} hours</strong> of sleep logged · Quality: ${quality}/10<br>
            <span style="color:var(--text-muted);font-size:0.8rem">
              ${hours >= 7 ? '✅ Great! Your brain will consolidate today\'s learning well.' :
                hours >= 6 ? '⚠ Slightly under optimal. Aim for 7–9 hours.' :
                '❌ Below 6 hours impairs memory formation significantly.'}
            </span>
          </div>
        `;
      }
      showToast(`😴 ${hours}h sleep logged!`);
    });
  },

  renderInfo() {
    const grid = document.getElementById('sleepInfoGrid');
    if (!grid) return;
    grid.innerHTML = DATA.sleepInfo.map(info => `
      <div class="sleep-info-card glass-card">
        <div class="icon">${info.icon}</div>
        <h4>${info.title}</h4>
        <p>${info.body}</p>
      </div>
    `).join('');
  }
};

// ──────────── GYM ────────────
const GymModule = {
  init() {
    this.renderChecklist();
    this.renderInfo();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'gym') { this.renderChecklist(); this.renderInfo(); }
    });
  },

  renderChecklist() {
    const container = document.getElementById('gymChecklist');
    if (!container) return;
    const log = Store.todayLog();
    const done = log.gymDone || [];

    container.innerHTML = DATA.gymActivities.map(act => {
      const isDone = done.includes(act.name);
      return `
        <div class="check-item ${isDone ? 'checked' : ''}" data-name="${act.name}">
          <div class="check-box">${isDone ? '✔' : ''}</div>
          <div>
            <div class="check-text">${act.icon} ${act.name}</div>
            <div class="check-meta">${act.meta}</div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.check-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.dataset.name;
        const log = Store.todayLog();
        log.gymDone = log.gymDone || [];
        const idx = log.gymDone.indexOf(name);
        if (idx === -1) {
          log.gymDone.push(name);
          showToast(`💪 ${name} logged!`);
        } else {
          log.gymDone.splice(idx, 1);
        }
        if (log.gymDone.length > 0) {
          log.pillars.gym = true;
        } else {
          delete log.pillars.gym;
        }
        Store.saveTodayLog(log);
        Store.markPillar('gym');
        Dashboard.render();
        this.renderChecklist();
      });
    });
  },

  renderInfo() {
    const grid = document.getElementById('gymInfoGrid');
    if (!grid) return;
    grid.innerHTML = DATA.gymInfo.map(info => `
      <div class="gym-info-card glass-card">
        <div class="icon">${info.icon}</div>
        <h4>${info.title}</h4>
        <p>${info.body}</p>
      </div>
    `).join('');
  }
};

// ──────────── NUTRITION ────────────
const NutritionModule = {
  init() {
    this.render();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'nutrition') this.render();
    });
  },

  render() {
    const list = document.getElementById('nutritionList');
    if (!list) return;
    const log = Store.todayLog();
    const done = log.nutritionDone || [];

    list.innerHTML = DATA.nutritionItems.map(item => {
      const isDone = done.includes(item.name);
      return `
        <div class="check-item ${isDone ? 'checked' : ''}" data-name="${item.name}">
          <div class="check-box">${isDone ? '✔' : ''}</div>
          <div>
            <div class="check-text">${item.icon} ${item.name}</div>
            <div class="check-meta">${item.meta}</div>
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);max-width:200px;text-align:right">${item.tip}</div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.check-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.dataset.name;
        const log = Store.todayLog();
        log.nutritionDone = log.nutritionDone || [];
        const idx = log.nutritionDone.indexOf(name);
        if (idx === -1) {
          log.nutritionDone.push(name);
          showToast(`✅ ${name} logged!`);
        } else {
          log.nutritionDone.splice(idx, 1);
        }
        if (log.nutritionDone.length >= 4) log.pillars.hydrate = true;
        Store.saveTodayLog(log);
        Store.markPillar('hydrate');
        Dashboard.render();
        this.render();
        this.renderScore();
      });
    });

    this.renderScore();
  },

  renderScore() {
    const el = document.getElementById('nutritionScore');
    if (!el) return;
    const log = Store.todayLog();
    const count = (log.nutritionDone || []).length;
    const pct = Math.round((count / DATA.nutritionItems.length) * 100);
    el.innerHTML = `
      <div class="nutrition-score-num">${pct}%</div>
      <p style="color:var(--text-secondary);font-size:0.85rem">${count}/${DATA.nutritionItems.length} brain fuel items today</p>
      <div class="progress-bar-wrap" style="margin-top:12px">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
    `;
  }
};
