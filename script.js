const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

const switchScreen = (id) => {
  qsa('.screen').forEach((screen) => screen.classList.remove('active'));
  const el = qs('#' + id);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

qsa('[data-go]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-go');
    if (target) switchScreen(target);
  });
});

const buildCalendar = () => {
  const grid = qs('#calendar-grid');
  if (!grid) return;

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach((day) => {
    const el = document.createElement('div');
    el.className = 'weekday';
    el.textContent = day;
    grid.appendChild(el);
  });

  const date = new Date();
  const year = 2026;
  const month = 9; // October (0-based)
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    const empty = document.createElement('div');
    empty.className = 'day empty';
    grid.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const cell = document.createElement('div');
    cell.className = 'day';
    cell.textContent = day;
    if (day === 17) {
      cell.classList.add('highlight');
      cell.setAttribute('aria-label', 'Birthday day');
    }
    grid.appendChild(cell);
  }
};

const setRevealAge = () => {
  const ageDisplay = qs('#age-display');
  if (!ageDisplay) return;

  const date = new Date();
  const birthday = new Date(2026, 9, 17);
  let age = date.getFullYear() - birthday.getFullYear();
  const hasBirthdayPassed =
    date.getMonth() > birthday.getMonth() ||
    (date.getMonth() === birthday.getMonth() && date.getDate() >= birthday.getDate());

  if (!hasBirthdayPassed) age -= 1;
  age = Math.max(age, 1);
  ageDisplay.textContent = `${age}`;
};

const attachCandleInteraction = () => {
  const candleHit = qs('#candle-hit');
  const smoke = qs('#smoke');
  const flames = qsa('.flame');
  if (!candleHit) return;

  let disabled = false;

  const blowCandles = () => {
    if (disabled) return;
    disabled = true;

    flames.forEach((flame) => flame.classList.add('off'));
    if (smoke) {
      setTimeout(() => smoke.classList.add('show'), 180);
    }

    setTimeout(() => {
      switchScreen('reveal-screen');
      setRevealAge();
      const name = qs('[data-text="name"]');
      if (name) name.textContent = 'YOU';
      disabled = false;
    }, 900);
  };

  candleHit.addEventListener('click', blowCandles);
  candleHit.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      blowCandles();
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  buildCalendar();
  setRevealAge();
  attachCandleInteraction();
});
