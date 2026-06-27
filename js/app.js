/* ═══════════════════════════════════════
   StudyOS — App Bootstrap
   ═══════════════════════════════════════ */

const App = {
  init() {
    // Router
    Router.init();

    // Theme
    this.initTheme();

    // Init all modules
    Dashboard.init();
    StudyModule.init();
    FocusModule.init();
    RevisionModule.init();
    SleepModule.init();
    GymModule.init();
    NutritionModule.init();
    RelaxModule.init();
    MemoryModule.init();
    KnowledgeModule.init();
    HabitsModule.init();
    GoalsModule.init();
    AnalyticsModule.init();
    AchievementsModule.init();
    CoachModule.init();

    // Service Worker
    this.registerSW();

    // Notifications
    this.requestNotifications();

    // Daily streak check
    this.checkStreak();

    // Install banner
    this.initInstallPrompt();

    console.log('🧠 StudyOS initialized');
  },

  initTheme() {
    const saved = localStorage.getItem('studyos_theme') || 'dark';
    document.documentElement.dataset.theme = saved;
    this.updateThemeBtn(saved);

    document.getElementById('themeToggle')?.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme;
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('studyos_theme', next);
      this.updateThemeBtn(next);
      // Re-render charts if on analytics page
      if (Router.currentPage === 'analytics') {
        setTimeout(() => AnalyticsModule.renderAll(), 50);
      }
    });
  },

  updateThemeBtn(theme) {
    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (text) text.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  },

  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('✅ Service Worker registered'))
        .catch(err => console.warn('SW error:', err));
    }
  },

  requestNotifications() {
    if ('Notification' in window && Notification.permission === 'default') {
      // Defer to avoid blocking startup
      setTimeout(() => {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            console.log('✅ Notifications granted');
            this.scheduleReminders();
          }
        });
      }, 3000);
    }
  },

  scheduleReminders() {
    // Simple interval-based reminders (real push notifications require backend)
    const reminders = [
      { hour: 20, msg: '💧 Have you drunk enough water today?' },
      { hour: 22, msg: '🌙 Time to wind down for quality sleep!' },
      { hour: 9,  msg: '📖 Good morning! Ready to study?' },
    ];
    const now = new Date();
    reminders.forEach(r => {
      if (now.getHours() < r.hour) {
        const delay = (r.hour - now.getHours()) * 3600000;
        setTimeout(() => {
          if (Notification.permission === 'granted') {
            new Notification('StudyOS', { body: r.msg, icon: 'assets/icons/icon-192.png' });
          }
        }, delay);
      }
    });
  },

  checkStreak() {
    const stats = Store.getStats();
    const today = Store.today();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    // If last active was before yesterday, reset streak
    if (stats.lastActiveDate && stats.lastActiveDate < yStr) {
      Store.updateStats(s => { s.streak = 0; return s; });
    }
  },

  initInstallPrompt() {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;

      // Show install hint after 10s
      setTimeout(() => {
        if (deferredPrompt) {
          showToast('📱 Install StudyOS for offline access!');
          // Allow clicking toast to install (simplified)
          const toast = document.getElementById('toast');
          toast?.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
          }, { once: true });
        }
      }, 10000);
    });
  }
};

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => App.init());
