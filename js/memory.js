/* ═══════════════════════════════════════
   StudyOS — Memory Training
   ═══════════════════════════════════════ */

const MemoryModule = {
  currentGame: null,
  gameState: {},

  init() {
    this.renderGames();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'memory') this.renderGames();
    });
  },

  renderGames() {
    const grid = document.getElementById('memoryGamesGrid');
    if (!grid) return;
    grid.innerHTML = DATA.memoryGames.map(g => `
      <div class="memory-game-card" data-id="${g.id}">
        <div class="icon">${g.icon}</div>
        <h4>${g.name}</h4>
        <p>${g.desc}</p>
      </div>
    `).join('');

    grid.querySelectorAll('.memory-game-card').forEach(card => {
      card.addEventListener('click', () => this.launchGame(card.dataset.id));
    });
  },

  launchGame(id) {
    const area = document.getElementById('memoryGameArea');
    const titleEl = document.getElementById('gameTitle');
    const content = document.getElementById('gameContent');
    if (!area || !content) return;

    area.style.display = 'block';
    area.scrollIntoView({ behavior: 'smooth', block: 'start' });

    this.currentGame = id;
    this.gameState = { level: 1, score: 0 };

    const game = DATA.memoryGames.find(g => g.id === id);
    titleEl.textContent = `${game.icon} ${game.name}`;

    switch(id) {
      case 'number':   this.startNumberMemory(content); break;
      case 'word':     this.startWordMemory(content); break;
      case 'pattern':  this.startPatternMemory(content); break;
      case 'reaction': this.startReactionGame(content); break;
      case 'sequence': this.startSequenceGame(content); break;
    }

    // Log game
    Store.updateStats(s => { s.memoryGames = (s.memoryGames || 0) + 1; return s; });
    const log = Store.todayLog();
    log.memoryGames = (log.memoryGames || 0) + 1;
    log.pillars.memory = true;
    Store.saveTodayLog(log);
    Store.markPillar('memory');
    Dashboard.render();
  },

  // ── Number Memory ──
  startNumberMemory(container) {
    const digits = this.gameState.level + 2;
    const number = Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join('');
    this.gameState.target = number;
    this.gameState.phase = 'show';

    container.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.88rem">Level ${this.gameState.level} — Memorize this number:</p>
      <div class="number-display" id="numDisplay">${number}</div>
      <p id="numStatus" style="color:var(--text-muted);font-size:0.85rem">Memorizing… <span id="numTimer">3</span>s</p>
    `;

    let t = 3;
    const tick = setInterval(() => {
      t--;
      const timerEl = document.getElementById('numTimer');
      if (timerEl) timerEl.textContent = t;
      if (t <= 0) {
        clearInterval(tick);
        document.getElementById('numDisplay').textContent = '?????';
        document.getElementById('numStatus').innerHTML = 'Now type what you saw:';
        container.innerHTML += `
          <div class="game-input-row" style="margin-top:12px">
            <input class="form-input" id="numInput" placeholder="Enter the number…" maxlength="15" />
            <button class="btn-primary" id="numSubmit">Check</button>
          </div>
          <p id="numFeedback" style="margin-top:12px;font-size:0.9rem"></p>
        `;
        document.getElementById('numInput')?.focus();
        document.getElementById('numSubmit')?.addEventListener('click', () => this.checkNumber(container));
        document.getElementById('numInput')?.addEventListener('keydown', e => {
          if (e.key === 'Enter') this.checkNumber(container);
        });
      }
    }, 1000);
  },

  checkNumber(container) {
    const input = document.getElementById('numInput')?.value.trim();
    const feedback = document.getElementById('numFeedback');
    if (input === this.gameState.target) {
      this.gameState.level++;
      if (feedback) feedback.innerHTML = `<span style="color:var(--accent-green)">✅ Correct! Moving to level ${this.gameState.level}</span>`;
      setTimeout(() => this.startNumberMemory(container), 1200);
    } else {
      if (feedback) feedback.innerHTML = `<span style="color:var(--accent-rose)">❌ The number was: <strong>${this.gameState.target}</strong>. Score: Level ${this.gameState.level}</span>
        <br><button class="btn-secondary" style="margin-top:8px" id="numRestart">Try Again</button>`;
      document.getElementById('numRestart')?.addEventListener('click', () => {
        this.gameState.level = 1;
        this.startNumberMemory(container);
      });
    }
  },

  // ── Word Memory ──
  startWordMemory(container) {
    const wordBank = ['apple','bridge','cloud','dream','eagle','forest','garden','harbor','island','jungle','kindle','lantern','mirror','nature','ocean','planet','quantum','river','silver','thunder','umbrella','valley','wisdom','xenon','yellow','zenith'];
    const count = Math.min(3 + this.gameState.level, 10);
    const words = [];
    const used = new Set();
    while (words.length < count) {
      const w = wordBank[Math.floor(Math.random() * wordBank.length)];
      if (!used.has(w)) { used.add(w); words.push(w); }
    }
    this.gameState.wordTarget = [...words];

    container.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.88rem">Level ${this.gameState.level} — Memorize these ${count} words:</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px 0">
        ${words.map(w => `<span class="badge badge-blue" style="font-size:0.9rem;padding:6px 14px">${w}</span>`).join('')}
      </div>
      <p id="wordTimer" style="color:var(--text-muted)">Time to memorize: <span id="wordSecs">${count * 2}</span>s</p>
    `;

    let t = count * 2;
    const tick = setInterval(() => {
      t--;
      const el = document.getElementById('wordSecs');
      if (el) el.textContent = t;
      if (t <= 0) {
        clearInterval(tick);
        container.innerHTML = `
          <p style="color:var(--text-secondary)">Type all the words you remember (comma separated):</p>
          <input class="form-input" id="wordInput" placeholder="apple, bridge, cloud…" style="margin:12px 0" />
          <button class="btn-primary" id="wordSubmit">Check</button>
          <div id="wordFeedback" style="margin-top:12px;font-size:0.88rem"></div>
        `;
        document.getElementById('wordSubmit')?.addEventListener('click', () => {
          const raw = document.getElementById('wordInput')?.value || '';
          const typed = raw.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
          const target = this.gameState.wordTarget;
          const correct = typed.filter(w => target.includes(w));
          const missed = target.filter(w => !typed.includes(w));
          const fb = document.getElementById('wordFeedback');
          fb.innerHTML = `
            <span style="color:var(--accent-green)">✅ Correct (${correct.length}/${target.length}): ${correct.join(', ') || '—'}</span><br>
            <span style="color:var(--accent-rose)">❌ Missed: ${missed.join(', ') || 'None!'}</span><br>
            ${correct.length === target.length ? '<span style="color:var(--accent-green)">🎉 Perfect!</span>' : ''}
            <br><button class="btn-secondary" style="margin-top:8px" id="wordNext">Next Level</button>
          `;
          if (correct.length === target.length) this.gameState.level++;
          document.getElementById('wordNext')?.addEventListener('click', () => this.startWordMemory(container));
        });
      }
    }, 1000);
  },

  // ── Pattern Memory ──
  startPatternMemory(container) {
    const size = 3 + Math.min(this.gameState.level - 1, 3);
    const cellCount = size * size;
    const litCount = Math.min(2 + this.gameState.level, cellCount - 1);
    const litCells = new Set();
    while (litCells.size < litCount) {
      litCells.add(Math.floor(Math.random() * cellCount));
    }
    this.gameState.patternTarget = [...litCells];
    this.gameState.patternSelected = new Set();
    this.gameState.patternSize = size;

    const renderGrid = (showAnswer) => {
      container.innerHTML = `
        <p style="color:var(--text-secondary);font-size:0.88rem">
          ${showAnswer ? `Memorize the highlighted cells (${litCount} cells):` : 'Click the cells you remember:'}
        </p>
        <div style="display:inline-grid;grid-template-columns:repeat(${size},1fr);gap:6px;margin:16px auto">
          ${Array.from({length: cellCount}, (_, i) => {
            const isLit = litCells.has(i);
            const isSel = !showAnswer && this.gameState.patternSelected.has(i);
            return `<div class="heatmap-cell" data-idx="${i}" style="
              width:48px;height:48px;border-radius:8px;cursor:${showAnswer?'default':'pointer'};
              background:${showAnswer && isLit ? 'var(--accent-blue)' : isSel ? 'var(--accent-purple)' : 'rgba(255,255,255,0.06)'};
              border:1px solid var(--border);transition:background 0.2s
            "></div>`;
          }).join('')}
        </div>
        <div id="patternStatus"></div>
      `;
    };

    renderGrid(true);

    setTimeout(() => {
      renderGrid(false);
      container.querySelectorAll('[data-idx]').forEach(cell => {
        cell.addEventListener('click', () => {
          const idx = parseInt(cell.dataset.idx);
          if (this.gameState.patternSelected.has(idx)) {
            this.gameState.patternSelected.delete(idx);
            cell.style.background = 'rgba(255,255,255,0.06)';
          } else {
            this.gameState.patternSelected.add(idx);
            cell.style.background = 'var(--accent-purple)';
          }
          if (this.gameState.patternSelected.size === litCount) {
            this.checkPattern(container);
          }
        });
      });
    }, (litCount + 1) * 600);
  },

  checkPattern(container) {
    const target = new Set(this.gameState.patternTarget);
    const selected = this.gameState.patternSelected;
    let correct = 0;
    target.forEach(i => { if (selected.has(i)) correct++; });
    const perfect = correct === target.size && selected.size === target.size;
    if (perfect) this.gameState.level++;

    document.getElementById('patternStatus').innerHTML = `
      <p style="margin-top:12px;color:${perfect ? 'var(--accent-green)' : 'var(--accent-rose)'}">
        ${perfect ? '✅ Perfect pattern!' : `❌ ${correct}/${target.size} correct`}
      </p>
      <button class="btn-secondary" style="margin-top:8px" id="patternNext">
        ${perfect ? 'Next Level' : 'Try Again'}
      </button>
    `;
    document.getElementById('patternNext')?.addEventListener('click', () => this.startPatternMemory(container));
  },

  // ── Reaction Time ──
  startReactionGame(container) {
    let attempts = [];
    let waiting = false;
    let startTime = 0;
    let timeout;

    const render = () => {
      container.innerHTML = `
        <p style="color:var(--text-secondary);font-size:0.88rem">Click the green area as fast as possible!</p>
        <div id="reactionBox" style="
          width:200px;height:200px;border-radius:20px;margin:20px auto;
          background:var(--glass-bg);border:2px solid var(--border);
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;font-size:1rem;color:var(--text-muted);
          transition:background 0.15s
        ">Wait…</div>
        <div id="reactionResults" style="margin-top:12px;font-size:0.88rem"></div>
      `;

      const box = document.getElementById('reactionBox');
      const startWait = () => {
        waiting = false;
        box.style.background = 'var(--glass-bg)';
        box.style.borderColor = 'var(--border)';
        box.textContent = 'Wait…';
        const delay = 1500 + Math.random() * 3000;
        timeout = setTimeout(() => {
          waiting = true;
          startTime = Date.now();
          box.style.background = 'rgba(79,255,176,0.4)';
          box.style.borderColor = 'var(--accent-green)';
          box.textContent = 'CLICK NOW!';
        }, delay);
      };

      box.addEventListener('click', () => {
        if (!waiting) {
          clearTimeout(timeout);
          box.textContent = 'Too early! Wait for green.';
          setTimeout(startWait, 1000);
          return;
        }
        const rt = Date.now() - startTime;
        attempts.push(rt);
        box.style.background = 'var(--glass-bg)';
        box.textContent = `${rt}ms`;

        const resEl = document.getElementById('reactionResults');
        const avg = Math.round(attempts.reduce((a,b) => a+b, 0) / attempts.length);
        resEl.innerHTML = `
          Last: <strong>${rt}ms</strong> · Avg: <strong>${avg}ms</strong> · Attempts: ${attempts.length}/5
          ${rt < 200 ? ' ⚡ Lightning fast!' : rt < 300 ? ' ✅ Good reaction' : ' Try to be quicker!'}
        `;

        if (attempts.length < 5) {
          setTimeout(startWait, 800);
        } else {
          resEl.innerHTML += `
            <br><br><strong>Final average: ${avg}ms</strong>
            ${avg < 200 ? ' 🏆 Excellent reflexes!' : avg < 300 ? ' ✅ Above average' : ' Keep practicing!'}
            <br><button class="btn-secondary" style="margin-top:8px" id="reactRestart">Play Again</button>
          `;
          document.getElementById('reactRestart')?.addEventListener('click', () => {
            attempts = [];
            this.startReactionGame(container);
          });
        }
      });

      startWait();
    };
    render();
  },

  // ── Sequence Game ──
  startSequenceGame(container) {
    const emojis = ['🔴','🔵','🟢','🟡','🟠','🟣'];
    const seqLen = 2 + this.gameState.level;
    const sequence = Array.from({length: seqLen}, () => emojis[Math.floor(Math.random() * emojis.length)]);
    this.gameState.seqTarget = sequence;
    this.gameState.seqInput = [];

    container.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.88rem">Memorize this sequence (${seqLen} items):</p>
      <div id="seqDisplay" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:16px 0;font-size:2rem">
        ${sequence.map(e => `<span>${e}</span>`).join('')}
      </div>
      <p id="seqStatus" style="color:var(--text-muted)">Memorizing… <span id="seqTimer">${seqLen + 1}</span>s</p>
    `;

    let t = seqLen + 1;
    const tick = setInterval(() => {
      t--;
      const el = document.getElementById('seqTimer');
      if (el) el.textContent = t;
      if (t <= 0) {
        clearInterval(tick);
        container.innerHTML = `
          <p style="color:var(--text-secondary)">Click the sequence in the correct order:</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:16px 0">
            ${emojis.map(e => `<button class="btn-secondary" data-emoji="${e}" style="font-size:1.5rem;padding:10px 16px">${e}</button>`).join('')}
          </div>
          <div id="seqProgress" style="display:flex;gap:8px;justify-content:center;margin:12px 0">
            ${sequence.map(() => `<span style="width:20px;height:20px;border-radius:50%;background:var(--glass-bg);border:1px solid var(--border);display:inline-block"></span>`).join('')}
          </div>
          <div id="seqFeedback"></div>
        `;

        container.querySelectorAll('[data-emoji]').forEach(btn => {
          btn.addEventListener('click', () => {
            const emoji = btn.dataset.emoji;
            const idx = this.gameState.seqInput.length;
            this.gameState.seqInput.push(emoji);

            // Update dots
            const dots = container.querySelectorAll('#seqProgress span');
            if (dots[idx]) {
              dots[idx].style.background = emoji === sequence[idx] ? 'var(--accent-green)' : 'var(--accent-rose)';
            }

            if (this.gameState.seqInput.length === sequence.length) {
              const correct = this.gameState.seqInput.every((e, i) => e === sequence[i]);
              if (correct) this.gameState.level++;
              document.getElementById('seqFeedback').innerHTML = `
                <p style="color:${correct ? 'var(--accent-green)' : 'var(--accent-rose)'}">
                  ${correct ? '✅ Perfect sequence!' : `❌ Correct was: ${sequence.join(' ')}`}
                </p>
                <button class="btn-secondary" style="margin-top:8px" id="seqNext">
                  ${correct ? 'Next Level' : 'Try Again'}
                </button>
              `;
              document.getElementById('seqNext')?.addEventListener('click', () => this.startSequenceGame(container));
            }
          });
        });
      }
    }, 1000);
  }
};
