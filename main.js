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

// Hide Momo "No class" day rows after widget renders
function hideMomoEmptyDays() {
  const schedule = document.querySelector('[data-momo-schedule]');
  if (!schedule) return;

  const walker = document.createTreeWalker(schedule, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.trim() !== 'No class') continue;
    // Walk up to find the day-level container (direct child of the weekly grid)
    let el = node.parentElement;
    while (el && el !== schedule) {
      const parent = el.parentElement;
      if (parent && (
        parent.classList.contains('momo-schedule__weekly-grid') ||
        parent.classList.contains('momo-list-schedule__grid')
      )) {
        el.style.display = 'none';
        break;
      }
      el = parent;
    }
  }
}

const momoContainer = document.querySelector('[data-momo-schedule]');
if (momoContainer) {
  const observer = new MutationObserver(() => hideMomoEmptyDays());
  observer.observe(momoContainer, { childList: true, subtree: true });
}
