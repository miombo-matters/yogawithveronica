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

// Hide day columns with no classes.
// DOM: .momo-schedule__weekly > div (one per day, no class attr)
//   contains .momo-schedule-item when a class exists, otherwise a <p>No class</p>.
const noClassesMsg = document.querySelector('.momo-no-classes-week');

function hideEmptyDays() {
  const dayDivs = document.querySelectorAll('.momo-schedule__weekly > div');
  if (!dayDivs.length) return;
  let visibleCount = 0;
  dayDivs.forEach(dayDiv => {
    const hasClass = !!dayDiv.querySelector('.momo-schedule-item');
    dayDiv.style.display = hasClass ? '' : 'none';
    if (hasClass) visibleCount++;
  });
  if (noClassesMsg) noClassesMsg.hidden = visibleCount > 0;
}

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
