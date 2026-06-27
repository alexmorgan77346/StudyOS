/* ═══════════════════════════════════════
   StudyOS — AI Study Coach
   ═══════════════════════════════════════ */

const CoachModule = {
  history: [],

  init() {
    document.getElementById('coachSend')?.addEventListener('click', () => this.send());
    document.getElementById('coachInput')?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
    });

    document.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('coachInput').value = chip.dataset.q;
        this.send();
      });
    });
  },

  async send() {
    const input = document.getElementById('coachInput');
    const msg = input?.value.trim();
    if (!msg) return;
    input.value = '';

    this.addMessage('user', msg);
    this.history.push({ role: 'user', content: msg });

    const typingId = this.addMessage('bot', '…', true);

    try {
      const stats = Store.getStats();
      const log = Store.todayLog();

      const systemPrompt = `You are an expert AI Study Coach inside StudyOS — a cognitive performance app. 
You have deep knowledge of:
- Study techniques: active recall, spaced repetition, Feynman technique, interleaving, deep work, Pomodoro, Cornell notes, blurting, SQ3R, retrieval practice
- Neuroscience of learning: memory consolidation, BDNF, neuroplasticity, dopamine, sleep and memory
- Habit science: habit loops, streaks, identity-based habits
- Brain health: nutrition, exercise, sleep, stress management

User's current stats today:
- Brain Score: ${log.score || 0}%
- Streak: ${stats.streak || 0} days
- Focus sessions: ${(log.sessions || []).length}
- Habits done: ${Object.values(log.habits || {}).filter(Boolean).length}/${11}

Be warm, motivating, specific, and science-backed. Keep responses concise (2–4 paragraphs max).
Use bullet points sparingly. Speak directly to the user as "you". No generic filler phrases.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: systemPrompt,
          messages: this.history.slice(-10),
        })
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Sorry, I had trouble connecting. Please try again.';

      this.history.push({ role: 'assistant', content: reply });
      this.updateMessage(typingId, reply);

    } catch (err) {
      this.updateMessage(typingId, 'Connection error. Make sure you\'re online and try again.');
    }
  },

  addMessage(role, text, isTyping = false) {
    const container = document.getElementById('chatMessages');
    if (!container) return null;

    const id = 'msg_' + Date.now();
    const avatar = role === 'bot' ? '🤖' : '👤';
    const div = document.createElement('div');
    div.className = `chat-msg ${role === 'bot' ? 'bot-msg' : 'user-msg'}`;
    div.id = id;
    div.innerHTML = `
      <span class="chat-avatar">${avatar}</span>
      <div class="chat-bubble ${isTyping ? 'shimmer' : ''}">${this.formatText(text)}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
  },

  updateMessage(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    const bubble = el.querySelector('.chat-bubble');
    if (bubble) {
      bubble.classList.remove('shimmer');
      bubble.innerHTML = this.formatText(text);
    }
    document.getElementById('chatMessages').scrollTop = 99999;
  },

  formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• /gm, '&bull; ')
      .replace(/\n/g, '<br>');
  }
};
