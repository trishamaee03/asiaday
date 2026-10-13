// script.js — populate calendar, navigation, interactions
document.addEventListener('DOMContentLoaded', () => {
  // Helpers
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  // NAV: buttons with data-go
  qsa('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-go');
      if (!target) return;
      switchScreen(target);
    });
  });

  // mini back buttons
  qsa('.mini-back').forEach(b => b.addEventListener('click', () => {
    const go = b.getAttribute('data-go') || 'menu-screen';
    switchScreen(go);
  }));

  function switchScreen(id) {
    qsa('.screen').forEach(s => s.classList.remove('active'));
    const el = qs('#' + id);
    if (el) el.classList.add('active');
    // scroll to top of page area for mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // CALENDAR: build the grid
  function buildCalendar() {
    const grid = qs('#calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Weekday headers
    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    weekdays.forEach(name => {
      const w = document.createElement('div');
      w.className = 'weekday';
      w.textContent = name;
      grid.appendChild(w);
    });

    // Determine month/year from the calendar header if present
    let monthIndex, year;
    const header = qs('.calendar-head h2');
    if (header) {
      const m = header.textContent.match(/([A-Za-z]+)\s*(\d{4})/);
      if (m) {
        const monthName = m[1];
        year = parseInt(m[2], 10);
        const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        monthIndex = monthNames.indexOf(monthName);
      }
    }
    const now = new Date();
    if (typeof monthIndex !== 'number' || monthIndex < 0) monthIndex = now.getMonth();
    if (!year) year = now.getFullYear();

    // Parse birthday from .birthday-tag (e.g., "October 17 — her special day!")
    let birthdayDay = null;
    const bTag = qs('.birthday-tag');
    if (bTag) {
      const m = bTag.textContent.match(/(\d{1,2})/);
      if (m) birthdayDay = parseInt(m[1], 10);
    }

    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    // leading empty cells
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day empty';
      grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      cell.className = 'day';
      const num = document.createElement('div');
      num.className = 'date-num';
      num.textContent = d;
      cell.appendChild(num);

      // mark birthday
      if (birthdayDay && d === birthdayDay) {
        cell.classList.add('birthday');
        // optionally add a small photo icon inside the cell if a photo exists
        const photo = document.createElement('span');
        photo.className = 'birthday-photo';
        photo.style.position = 'absolute';
        photo.style.left = '8px';
        photo.style.top = '8px';
        // leave blank — CSS pseudo elements style the birthday look
        cell.appendChild(photo);
      }

      grid.appendChild(cell);
    }

    // trailing empty cells to fill last row (optional)
    const totalCells = firstDay + daysInMonth;
    const remainder = totalCells % 7;
    if (remainder !== 0) {
      for (let i = 0; i < (7 - remainder); i++) {
        const e = document.createElement('div');
        e.className = 'day empty';
        grid.appendChild(e);
      }
    }
  }

  // Candle interaction
  const candleHit = qs('#candle-hit');
  if (candleHit) {
    candleHit.addEventListener('click', blowCandles);
    candleHit.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); blowCandles(); } });
  }

  function blowCandles() {
    const flames = qsa('.flame');
    flames.forEach(f => f.classList.add('off'));
    const smoke = qs('#smoke');
    if (smoke) smoke.classList.add('show');

    // brief delay then show reveal screen and confetti
    setTimeout(() => {
      switchScreen('reveal-screen');
      // set a default age (try to compute if possible)
      const ageDisplay = qs('#age-display');
      if (ageDisplay) {
        // try to read birth year from data attribute (not present) — fall back to 18
        ageDisplay.innerHTML = '';
        const number = 18; // example/fallback
        const n = document.createElement('span'); n.textContent = String(number)[0] || '';
        const n2 = document.createElement('span'); n2.textContent = String(number).slice(1) || '';
        if (String(number).length === 1) {
          ageDisplay.textContent = number;
        } else {
          ageDisplay.appendChild(n);
          ageDisplay.appendChild(n2);
        }
      }
      launchConfetti();
    }, 900);
  }

  // Confetti
  function launchConfetti() {
    const container = qs('#confetti');
    if (!container) return;
    container.innerHTML = '';
    const colors = [getComputedStyle(document.documentElement).getPropertyValue('--olive').trim() || '#899b70',
      getComputedStyle(document.documentElement).getPropertyValue('--yellow').trim() || '#e8dca9',
      getComputedStyle(document.documentElement).getPropertyValue('--pink').trim() || '#e9c9bd'];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('i');
      const left = Math.random() * 100;
      el.style.left = left + 'vw';
      el.style.top = (-10 - Math.random() * 10) + 'vh';
      el.style.background = colors[i % colors.length];
      el.style.width = (6 + Math.random() * 8) + 'px';
      el.style.height = (8 + Math.random() * 12) + 'px';
      el.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      el.style.opacity = '0.95';
      el.style.animationDelay = (Math.random() * 0.8) + 's';
      container.appendChild(el);
    }
    // remove after animation
    setTimeout(() => { container.innerHTML = ''; }, 3500);
  }

  // Image fallbacks: if an image fails to load, replace with simple SVG placeholder
  qsa('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const label = img.getAttribute('data-fallback') || 'photo';
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260'><rect width='100%' height='100%' fill='%23dce6d1'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2362765a' font-family='Arial' font-size='28'>${label}</text></svg>`;
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    });
    // trigger error handler if src is missing
    if (!img.src) img.dispatchEvent(new Event('error'));
  });

  // Envelope toggle
  const envelopeButton = qs('#envelope-button');
  if (envelopeButton) {
    envelopeButton.addEventListener('click', () => {
      envelopeButton.classList.toggle('open');
      const exp = envelopeButton.getAttribute('aria-expanded') === 'true';
      envelopeButton.setAttribute('aria-expanded', String(!exp));
      const letter = qs('#surprise-letter');
      if (letter) letter.classList.toggle('open');
      // update caption
      const caption = qs('#envelope-caption');
      if (caption) caption.textContent = envelopeButton.classList.contains('open') ? "A letter just for you ♡" : "Open when you're ready.";
    });
  }

  // letter toggle button
  const letterToggle = qs('#letter-toggle');
  if (letterToggle) {
    letterToggle.addEventListener('click', () => {
      const letter = qs('#surprise-letter');
      if (letter) letter.classList.toggle('open');
      // flip envelope too for visual consistency
      envelopeButton && envelopeButton.classList.toggle('open');
      const exp = envelopeButton ? envelopeButton.getAttribute('aria-expanded') === 'true' : false;
      envelopeButton && envelopeButton.setAttribute('aria-expanded', String(!exp));
    });
  }

  // small accessibility: allow keyboard on blow button
  const blowBtn = qs('#blow-button');
  if (blowBtn) blowBtn.addEventListener('click', blowCandles);

  // Build calendar initially
  buildCalendar();

  // Rebuild on window resize in case fonts/layout change
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildCalendar, 250);
  });

});
