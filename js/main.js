/* =========================================================
   SECUVALL · main.js (VERSIÓN ESTABLE 2026)
   Compatible con TODOS los HTML actuales
   ========================================================= */

(() => {
  'use strict';

  const qs  = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  /* =========================================================
     AÑO DINÁMICO
  ========================================================= */
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     TEMA
  ========================================================= */
  const html = document.documentElement;
  const themeToggle = qs('#themeToggle');

  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('secuvall-theme', next); } catch(e){}
  });

  /* =========================================================
     MENÚ MÓVIL
  ========================================================= */
  const navToggle = qs('#navToggle');
  const navMenu   = qs('#navMenu');

  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  qsa('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', false);
    });
  });

  /* =========================================================
     HEADER + BACK TO TOP
  ========================================================= */
  const topbar = qs('#topbar');
  const backToTop = qs('#backToTop');

  const handleScroll = () => {
    const y = window.scrollY;
    topbar?.classList.toggle('scrolled', y > 20);
    backToTop?.classList.toggle('show', y > 600);
  };

  window.addEventListener('scroll', handleScroll, { passive:true });
  handleScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  });

  /* =========================================================
     REVEAL
  ========================================================= */
  const reveals = qsa('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .15 });

    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* =========================================================
     FOOTER REVEAL (ESTABLE)
  ========================================================= */
  const footer = qs('.footer');
  if (footer && 'IntersectionObserver' in window) {
    const footerIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('footer-visible');
        }
      });
    }, { threshold: .25 });

    footerIO.observe(footer);
  }

  /* =========================================================
     CONTADORES
  ========================================================= */
  const counters = qsa('.stat-value[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start)/duration,1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };

    requestAnimationFrame(tick);
  };

  if (counters.length && 'IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold:.6 });

    counters.forEach(c => counterIO.observe(c));
  }

  /* =========================================================
     TYPING HERO
  ========================================================= */
  const typingEl = qs('#typing');

  if (typingEl) {
    const words = ['empresas','instituciones','datos','instalaciones','personas'];
    let w = 0, c = 0, del = false;

    const type = () => {
      const word = words[w];

      if (del) {
        typingEl.textContent = word.substring(0, c--);
        if (c < 0) {
          del = false;
          w = (w+1)%words.length;
          setTimeout(type, 400);
          return;
        }
      } else {
        typingEl.textContent = word.substring(0, c++);
        if (c > word.length) {
          del = true;
          setTimeout(type, 1400);
          return;
        }
      }

      setTimeout(type, del ? 50 : 90);
    };

    setTimeout(type, 600);
  }

  /* =========================================================
     SCROLL STEPS PROGRESS (SOLO SI EXISTE)
  ========================================================= */
  const stepsSection = qs('#metodo');
  const stepsProgress = qs('#stepsProgress');

  if (stepsSection && stepsProgress) {

    const updateSteps = () => {
      const rect = stepsSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const passed = -rect.top;

      const progress = Math.min(Math.max(passed / total, 0), 1);
      stepsProgress.style.height = (progress * 100) + '%';
    };

    window.addEventListener('scroll', updateSteps, { passive:true });
    window.addEventListener('resize', updateSteps);
    updateSteps();
  }

})();