/* ═══════════════════════════════════════
   StudyOS — Brain Relaxation
   ═══════════════════════════════════════ */

const RelaxModule = {
  breathTimer: null,
  breathRunning: false,

  init() {
    this.renderGrid();
    document.addEventListener('pageChanged', e => {
      if (e.detail === 'relax') this.renderGrid();
    });
    document.getElementById('breathStart')?.addEventListener('click', () => this.startBreathing());
    document.getElementById('breathStop')?.addEventListener('click', () => this.stopBreathing());
  },

  renderGrid() {
    const grid = document.getElementById('relaxGrid');
    if (!grid) return;
    grid.innerHTML = DATA.relaxItems.map(item => `
      <div class="relax-card" data-type="${item.type}">
        <div class="icon">${item.icon}</div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
    `).join('');

    grid.querySelectorAll('.relax-card').forEach(card => {
      card.addEventListener('click', () => this.openRelax(card.dataset.type));
    });
  },

  openRelax(type) {
    const modal = document.getElementById('breathingModal');
    if (!modal) return;

    // Stop any existing breathing
    this.stopBreathing();

    const configs = {
      box:      { title: '📦 Box Breathing', phases: [['Inhale',4],['Hold',4],['Exhale',4],['Hold',4]] },
      '478':    { title: '4️⃣ 4-7-8 Breathing', phases: [['Inhale',4],['Hold',7],['Exhale',8]] },
      meditate: { title: '🧘 Mindfulness Meditation', info: 'Sit comfortably. Focus on your breath. When your mind wanders, gently return attention to breathing. Do this for 5–10 minutes.' },
      pmr:      { title: '💪 Progressive Muscle Relaxation', info: 'Start at your feet. Tense each muscle group for 5 seconds, then release. Work upward: feet → calves → thighs → abdomen → arms → shoulders → face.' },
      eye:      { title: '👁 Eye Relaxation (20-20-20)', info: 'Every 20 minutes, look at something 20 feet away for 20 seconds. Blink 20 times. Rub palms together and cup over closed eyes for warmth.' },
      nature:   { title: '🌿 Nature Break', info: 'Step outside for 10 minutes. No phone. Observe natural sounds, light, and textures. This activates the parasympathetic nervous system and lowers cortisol.' },
      music:    { title: '🎵 Music Therapy', info: 'Put on slow instrumental music (60–80 BPM). Close your eyes. Let your mind rest without agenda for 5–10 minutes. Baroque music is especially effective for relaxation.' },
      stretch:  { title: '🤸 Desk Stretch', info: '1. Neck rolls: 5 each side\n2. Shoulder shrugs: 10 times\n3. Wrist circles: 10 each\n4. Seated torso twist: 5 each side\n5. Hamstring stretch: lean forward seated, 30 sec' },
    };

    const config = configs[type];
    if (!config) return;

    document.getElementById('breathTitle').textContent = config.title;

    if (config.phases) {
      // Breathing animation
      modal.style.display = 'block';
      document.getElementById('breathCircle').style.display = 'flex';
      document.getElementById('breathStart').style.display = 'inline-block';
      document.getElementById('breathStop').style.display = 'inline-block';
      document.getElementById('breathPhaseDesc').textContent = 'Press Start to begin';
      this.currentPhases = config.phases;
    } else {
      // Info card
      modal.style.display = 'block';
      document.getElementById('breathCircle').style.display = 'none';
      document.getElementById('breathStart').style.display = 'none';
      document.getElementById('breathStop').style.display = 'none';
      document.getElementById('breathPhaseDesc').innerHTML =
        config.info.split('\n').map(l => `<p style="margin-bottom:6px">${l}</p>`).join('');
    }

    // Mark pillar
    Store.markPillar('meditate');
    Dashboard.render();
  },

  startBreathing() {
    if (this.breathRunning) return;
    this.breathRunning = true;
    this.runCycle(0, 0);
  },

  runCycle(phaseIdx, count) {
    if (!this.breathRunning) return;
    const phases = this.currentPhases;
    const [label, secs] = phases[phaseIdx];
    const circle = document.getElementById('breathCircle');
    const textEl = document.getElementById('breathText');
    const countEl = document.getElementById('breathCount');
    const descEl = document.getElementById('breathPhaseDesc');

    if (!circle) return;

    // Animate circle
    circle.className = 'breath-circle';
    if (label === 'Inhale') circle.classList.add('expand');
    else if (label === 'Exhale') circle.classList.add('shrink');
    else circle.classList.add('hold');

    textEl.textContent = label;
    descEl.textContent = label === 'Inhale' ? 'Breathe in slowly' :
                          label === 'Exhale' ? 'Breathe out slowly' : 'Hold your breath';

    let remaining = secs;
    countEl.textContent = remaining;

    const tick = setInterval(() => {
      remaining--;
      countEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(tick);
        if (!this.breathRunning) return;
        const nextPhase = (phaseIdx + 1) % phases.length;
        const nextCount = nextPhase === 0 ? count + 1 : count;
        setTimeout(() => this.runCycle(nextPhase, nextCount), 300);
      }
    }, 1000);

    this.breathTimer = tick;
  },

  stopBreathing() {
    this.breathRunning = false;
    clearInterval(this.breathTimer);
    const circle = document.getElementById('breathCircle');
    if (circle) {
      circle.className = 'breath-circle';
      document.getElementById('breathText').textContent = 'Ready';
      document.getElementById('breathCount').textContent = '';
      document.getElementById('breathPhaseDesc').textContent = 'Press Start to begin';
    }
  }
};
