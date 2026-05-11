/* =========================================================
   $POPTROLL — interactions
   ========================================================= */

// --- POP BUTTON ---
const popBtn = document.getElementById('popBtn');
const popCountEl = document.getElementById('popCount');
const trollField = document.getElementById('troll-field');
const popLabels = [
  'CLICK TO POP',
  'POP AGAIN',
  'MORE POPS',
  'KEEP GOING',
  'INSANE POPPER',
  'POP MASTER',
  'TROLL GOD',
  'YOU OK BRO?',
  'OK STOP',
  'FOR REAL STOP',
  'YOU NEED HELP',
  'CALL SOMEONE',
  'PLEASE',
  'I\'M BEGGING',
  '...',
  'WHY ARE YOU LIKE THIS',
  'WAGMI',
  '🐸',
];
const popSounds = ['POP!', 'BOOM!', 'TROLL!', 'KEK!', 'GM!', 'NGMI!', 'WAGMI!', 'COPE!', 'SEETHE!', 'BASED!', 'CRINGE!', '🐸', '🍿'];

let popCount = 0;

popBtn.addEventListener('click', (e) => {
  popCount++;
  popCountEl.textContent = popCount.toLocaleString();

  // change label
  const label = popBtn.querySelector('.btn-pop__label');
  const idx = Math.min(Math.floor(popCount / 3), popLabels.length - 1);
  label.textContent = popLabels[idx];

  // popped animation
  popBtn.classList.remove('popped');
  void popBtn.offsetWidth; // restart animation
  popBtn.classList.add('popped');

  // spawn troll emojis
  spawnTrolls(e.clientX, e.clientY, 6 + Math.min(popCount, 10));

  // every 10 pops, do something silly
  if (popCount === 10) toast('🚨 10 pops! you are officially a degen');
  if (popCount === 50) toast('🚀 50 pops! NASA called, they want you to stop');
  if (popCount === 100) toast('💎 100 pops! diamond hands confirmed');
  if (popCount === 420) toast('🌿 nice');
  if (popCount === 666) toast('😈 you opened the portal');
  if (popCount === 1000) toast('🏆 you actually clicked 1000 times. touch grass.');
});

function spawnTrolls(x, y, n) {
  const emojis = ['🤡','🎪','🎭','💥','✨','🔥','🤡','🎈','🤡'];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('div');
    el.className = 'troll-spawn';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (x - 14) + 'px';
    el.style.top = (y - 14) + 'px';
    el.style.setProperty('--dx', (Math.random() * 240 - 120) + 'px');
    el.style.setProperty('--dr', (Math.random() * 720 - 360) + 'deg');
    el.style.fontSize = (20 + Math.random() * 24) + 'px';
    trollField.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

// --- TOAST ---
function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: '#0d0a0b',
    color: '#ffe34a',
    padding: '16px 28px',
    fontFamily: "'Bungee', cursive",
    fontSize: '14px',
    border: '3px solid #ff2e88',
    boxShadow: '6px 6px 0 #6bbf3b',
    zIndex: 99999,
    opacity: '0',
    transition: 'all 0.3s',
    letterSpacing: '0.05em',
    maxWidth: '90vw',
    textAlign: 'center',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

// --- NAV CTA: TRICK BUTTON ---
const navCta = document.getElementById('navCta');
let dodgeCount = 0;
navCta.addEventListener('mouseenter', () => {
  if (dodgeCount < 3 && window.innerWidth > 880) {
    dodgeCount++;
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 40;
    navCta.style.transition = 'transform 0.2s';
    navCta.style.transform = `translate(${dx}px, ${dy}px) rotate(${(Math.random()-0.5)*20}deg)`;
    setTimeout(() => {
      navCta.style.transform = '';
    }, 600);
  }
});

// --- COPY CA ---
const copyBtn = document.getElementById('copyBtn');
const ca = document.getElementById('ca');
copyBtn.addEventListener('click', () => {
  navigator.clipboard?.writeText(ca.textContent).catch(() => {});
  const original = copyBtn.textContent;
  copyBtn.textContent = 'lol there\'s no CA yet';
  setTimeout(() => { copyBtn.textContent = original; }, 1800);
});

// --- COUNTER ANIMATION ON SCROLL ---
const statNums = document.querySelectorAll('.stat__num[data-target]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.4 });
statNums.forEach(n => observer.observe(n));

// --- KONAMI CODE EASTER EGG ---
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let kIndex = 0;
window.addEventListener('keydown', (e) => {
  if (e.key === konami[kIndex]) {
    kIndex++;
    if (kIndex === konami.length) {
      document.body.style.animation = 'spin 2s ease-in-out';
      toast('🎉 KONAMI ACTIVATED — you found the secret. enjoy your worthless points.');
      setTimeout(() => { document.body.style.animation = ''; }, 2000);
      kIndex = 0;
    }
  } else {
    kIndex = 0;
  }
});

// --- CONSOLE GREETING ---
console.log('%c$POPTROLL', 'font-size:48px;color:#ff2e88;font-weight:bold;text-shadow:3px 3px 0 #0d0a0b;');
console.log('%cyou\'re inspecting the source. respect. there\'s nothing here.', 'font-size:14px;color:#6bbf3b;');
console.log('%cbut since you\'re here... try the konami code 🐸', 'font-size:12px;font-style:italic;');
// --- MONEY RAIN CURSOR TRAIL ---
const moneyEmojis = ['🤡', '💸', '💵', '🤡', '💰', '🤡', '🎪', '🎭', '$POPTROLL', '🤡'];let lastTrailTime = 0;
const TRAIL_INTERVAL = 60; // ms between drops (lower = more spam)

document.addEventListener('mousemove', (e) => {
  const now = performance.now();
  if (now - lastTrailTime < TRAIL_INTERVAL) return;
  lastTrailTime = now;

  const drop = document.createElement('div');
  drop.className = 'money-drop';
  drop.textContent = moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)];
  drop.style.left = (e.clientX + (Math.random() * 20 - 10)) + 'px';
  drop.style.top = (e.clientY + (Math.random() * 10 - 5)) + 'px';
  drop.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
  drop.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
  drop.style.fontSize = (14 + Math.random() * 14) + 'px';
  document.body.appendChild(drop);
  setTimeout(() => drop.remove(), 1400);
});
