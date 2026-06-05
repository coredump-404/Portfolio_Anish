document.addEventListener('DOMContentLoaded', function() {
  new Typed('#typed-role', {
    strings: ['Senior Design Engineer', 'Electrical Design Engineer'],
    typeSpeed: 120,
    backSpeed: 50,
    backDelay: 1500,
    loop: true
  });
});

window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.opacity = '0';
    setTimeout(() => loading.remove(), 500);
  }
  document.body.classList.add('loaded');
});

const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-link, .btn[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navMenu && mobileToggle) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (link.classList.contains('nav-link')) link.classList.add('active');
    }
  });
});

let hasAnimatedCounters = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'about' && !hasAnimatedCounters) {
        animateProgressBars();
        animateCounters();
        hasAnimatedCounters = true;
      }
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.fade-in').forEach(section => observer.observe(section));

function animateProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target')) || 0;
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
}

let ticking = false;
function updateNav() {
  let current = '';
  document.querySelectorAll('section, header').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNav);
    ticking = true;
  }
});

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (themeToggle) {
  themeToggle.textContent = savedTheme === 'dark' ? '🌓' : '☀️';
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌓' : '☀️';
  });
}

const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (backToTop) backToTop.classList.toggle('visible', window.pageYOffset > 300);
});
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const animateOnScroll = () => {
  document.querySelectorAll('.timeline-item, .cert-card, .project').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('animate-in');
    }
  });
};
window.addEventListener('scroll', animateOnScroll);
animateOnScroll();
