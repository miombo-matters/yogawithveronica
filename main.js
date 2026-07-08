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

// Class description toggles
document.querySelectorAll('.class-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const more = btn.previousElementSibling;
    const expanded = more.hidden;
    more.hidden = !expanded;
    btn.textContent = expanded ? 'Show less' : 'Show more';
    btn.setAttribute('aria-expanded', expanded);
  });
});

// Venue map — two markers, both churches visible
const mapEl = document.getElementById('venue-map');
if (mapEl && typeof L !== 'undefined') {
  const map = L.map('venue-map', { scrollWheelZoom: false }).setView([55.9217, -3.2107], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);
  L.marker([55.9243, -3.2087]).addTo(map)
    .bindPopup('<strong>Morningside Parish Church</strong><br>2 Cluny Gardens<br><em>Beginners Yoga &amp; Vinyasa Flow</em>');
  L.marker([55.9191, -3.2126]).addTo(map)
    .bindPopup('<strong>Greenbank Church</strong><br>Braidburn Terrace<br><em>Gentle Yoga</em>');
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Hide Momo "No class" day rows.
// The widget renders a flat grid: [day-title, "No class"|item, day-title, item, ...]
// So we hide the "No class" element AND its preceding day-title sibling.
function hideEmptyDays() {
  document.querySelectorAll(
    '.momo-schedule__weekly-grid, .momo-list-schedule__grid'
  ).forEach(grid => {
    Array.from(grid.children).forEach(child => {
      if (child.childElementCount === 0 && child.textContent.trim() === 'No class') {
        child.style.display = 'none';
        if (child.previousElementSibling) {
          child.previousElementSibling.style.display = 'none';
        }
      }
    });
  });
}

// Run at intervals to catch initial render, then watch for week navigation
setTimeout(hideEmptyDays, 500);
setTimeout(hideEmptyDays, 1500);
const momoEl = document.querySelector('[data-momo-schedule]');
if (momoEl) {
  let momoTimer;
  new MutationObserver(() => {
    clearTimeout(momoTimer);
    momoTimer = setTimeout(hideEmptyDays, 400);
  }).observe(momoEl, { childList: true, subtree: true });
}
