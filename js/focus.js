/* ═══════════════════════════════════════
   StudyOS — Focus Mode
   ═══════════════════════════════════════ */

const FocusModule = {
  timer: null,
  seconds: 25 * 60,
  totalSeconds: 25 * 60,
  running: false,
  mode: 'Pomodoro',
  sessionCount: 0,
  isBreak: false,

  init() {
    this.renderQuote();
    this.renderSessionLog();
    this.bindEvents();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'focus') {
        this.renderQuote();
        this.renderSessionLog();
      }
    });
  },

  bindEvents() {
    document.getElementById('focusStartBtn')?.addEventListener('click', () => this.start());
    document.getElementById('focusPauseBtn')?.addEventListener('click', () => this.pause());
    document.getElementById('focusResetBtn')?.addEventListener('click', () => this.reset());

    document.querySelectorAll('.mode-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mins = parseInt(btn.dataset.mins);
        this.mode = btn.dataset.mode;
        this.totalSeconds = mins * 60;
        this.seconds = this.totalSeconds;
        this.isBreak = false;
        this.updateDisplay();
        document.getElementById('focusModeLabel').textContent = this.mode;
        document.getElementById('focusPhase').textContent = 'Focus Phase';
      });
    });

    document.querySelectorAll('.sound-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sound-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  start() {
    if (this.running) return;
    this.running = true;
    document.getElementById('focusStartBtn').disabled = true;
    document.getElementById('focusPauseBtn').disabled = false;
    document.getElementById('focusTime').classList.add('running');

    this.timer = setInterval(() => {
      this.seconds--;
      this.updateDisplay();
      if (this.seconds <= 0) this.onComplete();
    }, 1000);
  },

  pause() {
    clearInterval(this.timer);
    this.running = false;
    document.getElementById('focusStartBtn').disabled = false;
    document.getElementById('focusPauseBtn').disabled = true;
    document.getElementById('focusTime').classList.remove('running');
  },

  reset() {
    this.pause();
    this.seconds = this.totalSeconds;
    this.isBreak = false;
    this.updateDisplay();
    document.getElementById('focusPhase').textContent = 'Focus Phase';
  },

  onComplete() {
    this.pause();
    this.sessionCount++;

    if (!this.isBreak) {
      // Log session
      const log = Store.todayLog();
      const sessionEntry = {
        mode: this.mode,
        mins: Math.round(this.totalSeconds / 60),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      log.sessions = log.sessions || [];
      log.sessions.push(sessionEntry);
      Store.saveTodayLog(log);
      Store.markPillar('focus');

      // Update stats
      Store.updateStats(s => { s.totalSessions = (s.totalSessions || 0) + 1; return s; });

      showToast(`✅ ${this.mode} complete! Take a break.`);
      Dashboard.render();

      // Switch to break
      const breakMins = this.sessionCount % 4 === 0 ? 20 : 5;
      this.isBreak = true;
      this.totalSeconds = breakMins * 60;
      this.seconds = this.totalSeconds;
      document.getElementById('focusPhase').textContent = `Break Time (${breakMins} min)`;
      document.getElementById('focusModeLabel').textContent = 'Break';
    } else {
      this.isBreak = false;
      this.totalSeconds = parseInt(document.querySelector('.mode-chip.active')?.dataset.mins || 25) * 60;
      this.seconds = this.totalSeconds;
      document.getElementById('focusPhase').textContent = 'Focus Phase';
      document.getElementById('focusModeLabel').textContent = this.mode;
      showToast('Break over! Ready to focus again?');
    }

    this.updateDisplay();
    this.renderSessionLog();

    // Browser notification
    if (Notification.permission === 'granted') {
      new Notification('StudyOS', { body: this.isBreak ? 'Break time! Rest your brain.' : 'Focus session complete!' });
    }
  },

  updateDisplay() {
    const m = Math.floor(this.seconds / 60).toString().padStart(2, '0');
    const s = (this.seconds % 60).toString().padStart(2, '0');
    const el = document.getElementById('focusTime');
    if (el) el.textContent = `${m}:${s}`;
  },

  renderQuote() {
    const el = document.getElementById('focusQuote');
    if (!el) return;
    const q = DATA.quotes[Math.floor(Math.random() * DATA.quotes.length)];
    el.textContent = q;
  },

  renderSessionLog() {
    const container = document.getElementById('sessionLog');
    if (!container) return;
    const log = Store.todayLog();
    const sessions = log.sessions || [];
    if (!sessions.length) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.82rem">No sessions yet today.</p>';
      return;
    }
    container.innerHTML = sessions.slice(-5).reverse().map(s => `
      <div class="session-entry">
        <span>🎯 ${s.mode} (${s.mins}m)</span>
        <span>${s.time}</span>
      </div>
    `).join('');
  }
};
