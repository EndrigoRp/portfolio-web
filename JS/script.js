// ── Navegação entre páginas ──
function show(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('nav-' + id).classList.add('active');
  window.scrollTo(0, 0);
}

// ── Formulário de contato ──
function sendForm(e) {
  e.preventDefault();
  const ok = document.getElementById('form-ok');
  ok.style.display = 'block';
  e.target.reset();
  setTimeout(() => ok.style.display = 'none', 5000);
}

// ── Contador de visitas (localStorage) ──
function initVisitCounter() {
  const key = 'portifolio_visitas';
  const atual = parseInt(localStorage.getItem(key) || '0') + 1;
  localStorage.setItem(key, atual);

  const el = document.getElementById('visit-count');
  if (el) {
    // animação de contagem
    let i = 0;
    const intervalo = setInterval(() => {
      i++;
      el.textContent = i;
      if (i >= atual) clearInterval(intervalo);
    }, Math.min(30, 600 / atual));
  }
}

// ── Efeito de luz que segue o mouse ──
function initMouseLight() {
  document.addEventListener('mousemove', (e) => {
    // pega a seção ativa
    const page = document.querySelector('.page.active');
    if (!page) return;

    const light = page.querySelector('.mouse-light');
    if (!light) return;

    const rect = page.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top + window.scrollY;

    light.style.left = x + 'px';
    light.style.top  = y + 'px';
  });
}

// ── Efeito de sombra/brilho nos links do nav ao hover ──
function initNavGlow() {
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      // remove glow dos outros
      links.forEach(l => l.style.textShadow = '');
      link.style.textShadow = '0 0 16px rgba(59,130,246,0.9)';
    });
    link.addEventListener('mouseleave', () => {
      // mantém só no ativo
      if (!link.classList.contains('active')) {
        link.style.textShadow = '';
      }
    });
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initVisitCounter();
  initMouseLight();
  initNavGlow();
});

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  if (localStorage.getItem('theme') === 'light') {
    root.classList.add('light');
  }

  btn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
});
