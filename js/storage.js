/* ═══════════════════════════════════════
   StudyOS — LocalStorage Utilities
   ═══════════════════════════════════════ */

const Store = {
  prefix: 'studyos_',

  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(this.prefix + key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },

  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch(e) { console.warn('Storage full:', e); }
  },

  update(key, fn, fallback = {}) {
    const current = this.get(key, fallback);
    const updated = fn(current);
    this.set(key, updated);
    return updated;
  },

  // Today's date string
  today() {
    return new Date().toISOString().split('T')[0];
  },

  // Get or create today's log
  todayLog() {
    const key = 'log_' + this.today();
    return this.get(key, {
      date: this.today(),
      pillars: {},
      habits: {},
      sessions: [],
      sleepHours: 0,
      sleepQuality: 0,
      gymDone: [],
      nutritionDone: [],
      revisionsDone: 0,
      memoryGames: 0,
      score: 0
    });
  },

  saveTodayLog(log) {
    this.set('log_' + this.today(), log);
  },

  // Stats aggregated
  getStats() {
    return this.get('stats', {
      streak: 0,
      lastActiveDate: '',
      totalSessions: 0,
      memoryGames: 0,
      maxScore: 0,
      revisionsCompleted: 0,
      articlesRead: 0,
      perfectDay: 0,
      daysUsed: 0,
    });
  },

  updateStats(fn) {
    return this.update('stats', fn, {
      streak: 0,
      lastActiveDate: '',
      totalSessions: 0,
      memoryGames: 0,
      maxScore: 0,
      revisionsCompleted: 0,
      articlesRead: 0,
      perfectDay: 0,
      daysUsed: 0,
    });
  },

  // Revision topics
  getRevisions() {
    return this.get('revisions', []);
  },

  // Goals
  getGoals(type) {
    return this.get('goals_' + type, []);
  },
  saveGoals(type, goals) {
    this.set('goals_' + type, goals);
  },

  // Score calculation
  calcScore(log) {
    const weights = {
      sleep: 15, study: 20, gym: 10,
      revision: 15, hydrate: 10, meditate: 5,
      focus: 15, memory: 10
    };
    let total = 0;
    let max = 0;
    for (const [k, w] of Object.entries(weights)) {
      max += w;
      if (log.pillars[k]) total += w;
    }
    return Math.round((total / max) * 100);
  },

  // History logs for analytics
  getHistoryLogs(days = 7) {
    const logs = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = 'log_' + d.toISOString().split('T')[0];
      const log = this.get(key, null);
      logs.push({ date: d.toISOString().split('T')[0], log });
    }
    return logs;
  },

  // Mark pillar done
  markPillar(id, value = true) {
    const log = this.todayLog();
    log.pillars[id] = value;
    log.score = this.calcScore(log);
    this.saveTodayLog(log);

    // Update max score
    this.updateStats(s => {
      if (log.score > s.maxScore) s.maxScore = log.score;
      // Update streak
      if (s.lastActiveDate !== this.today()) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        if (s.lastActiveDate === yStr) {
          s.streak += 1;
        } else if (s.lastActiveDate !== this.today()) {
          s.streak = 1;
        }
        s.lastActiveDate = this.today();
        s.daysUsed = (s.daysUsed || 0) + 1;
      }
      return s;
    });

    return log;
  },

  // Check perfect day
  checkPerfectDay(log) {
    const allPillars = ['sleep','study','gym','revision','hydrate','meditate','focus','memory'];
    const allDone = allPillars.every(p => log.pillars[p]);
    if (allDone) {
      this.updateStats(s => { s.perfectDay = (s.perfectDay || 0) + 1; return s; });
    }
    return allDone;
  }
};
