
 // Tarjeta del inicio: alternar entre código y resultado.
const card = document.querySelector('#code-card');
const toggle = document.querySelector('#code-toggle');
const filename = document.querySelector('#code-filename');

toggle.addEventListener('click', () => {
  const showingResult = card.classList.toggle('show-result');
  toggle.setAttribute('aria-pressed', showingResult);
  toggle.textContent = showingResult ? 'Ver código ↗' : 'Ver resultado ↗';
  filename.textContent = showingResult ? 'vista previa' : 'idea.js';
});

// Marcar la sección que se está viendo.
const links = document.querySelectorAll('.nav-link[href^="#"]');
const sections = [...links].map(link => document.querySelector(link.getAttribute('href')));

function setActive(id) {
  links.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (visible.length) {
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      setActive(visible[0].target.id);
    }
  }, { rootMargin: '-20% 0px -45% 0px', threshold: [0, 0.2, 0.5] });

  sections.forEach(section => section && observer.observe(section));
}

// En móvil, al tocar el icono aparece su nombre sin impedir la navegación.
let labelTimer;
links.forEach(link => {
  link.addEventListener('click', () => {
    setActive(link.hash.slice(1));
    if (window.matchMedia('(hover: none)').matches) {
      links.forEach(item => item.classList.remove('show-label'));
      link.classList.add('show-label');
      clearTimeout(labelTimer);
      labelTimer = setTimeout(() => link.classList.remove('show-label'), 1400);
    }
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
