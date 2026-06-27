/* ═══════════════════════════════════════
   StudyOS — Router & Navigation
   ═══════════════════════════════════════ */

const Router = {
  currentPage: 'dashboard',
  pageNames: {
    dashboard: 'Dashboard', study: 'Study System', roadmap: 'Learning Roadmap',
    focus: 'Focus Mode', revision: 'Revision Planner', sleep: 'Sleep',
    gym: 'Gym & Exercise', nutrition: 'Brain Nutrition', relax: 'Brain Relaxation',
    memory: 'Memory Training', knowledge: 'Knowledge Hub', habits: 'Habit Tracker',
    goals: 'Goal System', analytics: 'Analytics', achievements: 'Achievements',
    coach: 'AI Study Coach'
  },

  init() {
    // Nav items
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        this.navigate(el.dataset.page);
      });
    });

    // Action chips on dashboard navigate to pages
    document.addEventListener('click', e => {
      const chip = e.target.closest('[data-page]');
      if (chip && !chip.classList.contains('nav-item')) {
        this.navigate(chip.dataset.page);
      }
    });

    // Sidebar toggle
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarClose = document.getElementById('sidebarClose');

    menuBtn?.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    });

    sidebarClose?.addEventListener('click', () => this.closeSidebar());
    overlay?.addEventListener('click', () => this.closeSidebar());

    // Date badge
    const dateBadge = document.getElementById('dateBadge');
    if (dateBadge) {
      dateBadge.textContent = new Date().toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short'
      });
    }

    // Go to hash page if present
    const hash = location.hash.replace('#', '');
    if (hash && this.pageNames[hash]) this.navigate(hash);
  },

  navigate(page) {
    if (!this.pageNames[page]) return;

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show target
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // Update topbar title
    const title = document.getElementById('topbarTitle');
    if (title) title.textContent = this.pageNames[page];

    this.currentPage = page;
    location.hash = page;

    // Close sidebar on mobile
    this.closeSidebar();

    // Fire page init events
    document.dispatchEvent(new CustomEvent('pageChanged', { detail: page }));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('overlay')?.classList.remove('active');
  }
};

// Toast utility
function showToast(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// Modal utility
function openModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('modalBackdrop').classList.add('active');
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('active');
}

document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalBackdrop')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
