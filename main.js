// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Hide Momo "No class" day sections after widget finishes rendering
function hideEmptyDays() {
  const schedule = document.querySelector('[data-momo-schedule]');
  if (!schedule) return;

  schedule.querySelectorAll('*').forEach(el => {
    if (el.childElementCount > 0 || el.textContent.trim() !== 'No class') return;
    // Walk up to the direct child of the weekly/list grid = the day section
    let node = el;
    while (node.parentElement && node.parentElement !== schedule) {
      const p = node.parentElement;
      if (p.classList.contains('momo-schedule__weekly-grid') ||
          p.classList.contains('momo-list-schedule__grid')) {
        node.style.display = 'none';
        return;
      }
      node = p;
    }
  });
}

// Debounce so we run only after the widget has stopped mutating the DOM
let momoTimer;
const momoEl = document.querySelector('[data-momo-schedule]');
if (momoEl) {
  new MutationObserver(() => {
    clearTimeout(momoTimer);
    momoTimer = setTimeout(hideEmptyDays, 300);
  }).observe(momoEl, { childList: true, subtree: true });
}
