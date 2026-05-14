/* =========================================================
   SECUVALL · main.js 2026 Premium
   Tema · Menú · Reveal · Footer Panel · Animaciones · Cookies
   ========================================================= */

(() => {
  'use strict';

  /* =========================================================
     UTILITIES
  ========================================================= */

  const qs  = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => [...p.querySelectorAll(s)];

  /* =========================================================
     AÑO DINÁMICO
  ========================================================= */

  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     TEMA (DARK / LIGHT)
  ========================================================= */

  const THEME_KEY = 'secuvall-theme';
  const html = document.documentElement;
  const themeToggle = qs('#themeToggle');

  const setTheme = (t) => {
    html.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch(e){}
    const meta = qs('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0a0e27' : '#f7f9ff');
  };

  themeToggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
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

  const onScroll = () => {
    const y = window.scrollY;

    topbar?.classList.toggle('scrolled', y > 20);
    backToTop?.classList.toggle('show', y > 600);
  };

  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  });

  /* =========================================================
     SCROLL REVEAL GLOBAL
  ========================================================= */

  const revealElements = qsa('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    const revealIO = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold:.15 });

    revealElements.forEach(el => revealIO.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* =========================================================
     FOOTER SILICON VALLEY PANEL
  ========================================================= */

  const footer = qs('.footer');

  if (footer && 'IntersectionObserver' in window) {
    const footerIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add('footer-visible');
        }
      });
    }, { threshold:.35 });

    footerIO.observe(footer);
  }

  /* =========================================================
     CONTADORES
  ========================================================= */

  const counters = qsa('.stat-value[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start)/duration,1);
      const eased = 1 - Math.pow(1-progress,3);
      el.textContent = Math.floor(eased * target);
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
     PARALLAX GLOW HERO
  ========================================================= */

  const glow1 = qs('.glow-1');
  const glow2 = qs('.glow-2');

  if (glow1 && glow2 && window.matchMedia('(min-width:1024px)').matches) {
    document.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - .5) * 30;
      const y = (e.clientY / window.innerHeight - .5) * 30;

      glow1.style.transform = `translate(${x}px,${y}px)`;
      glow2.style.transform = `translate(${-x}px,${-y}px)`;
    }, { passive:true });
  }

  /* =========================================================
     CURSOR GLOW GLOBAL
  ========================================================= */

  const cursorGlow = qs('.cursor-glow');

  if (cursorGlow) {
    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      cursorGlow.style.setProperty('--gx', x+'%');
      cursorGlow.style.setProperty('--gy', y+'%');
    }, { passive:true });
  }

  /* =========================================================
     COOKIES SYSTEM
  ========================================================= */

  const COOKIE_KEY = 'secuvall-cookies';

  const banner = qs('#cookieBanner');
  const modal  = qs('#cookieModal');

  const btnAccept     = qs('#cookieAccept');
  const btnReject     = qs('#cookieReject');
  const btnConfig     = qs('#cookieConfig');
  const btnSavePrefs  = qs('#cookieSavePrefs');
  const btnAcceptAll  = qs('#cookieAcceptAll');
  const btnReopen     = qs('#cookiesReopen');

  const inpAnalytics  = qs('#cookieAnalytics');
  const inpMarketing  = qs('#cookieMarketing');

  const getPrefs = () => {
    try {
      return JSON.parse(localStorage.getItem(COOKIE_KEY));
    } catch { return null; }
  };

  const savePrefs = (prefs) => {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({
        ...prefs,
        timestamp: Date.now()
      }));
    } catch(e){}
  };

  if (!getPrefs()) {
    setTimeout(() => banner?.classList.add('show'), 900);
  }

  btnAccept?.addEventListener('click', () => {
    savePrefs({technical:true,analytics:true,marketing:true});
    banner?.classList.remove('show');
  });

  btnReject?.addEventListener('click', () => {
    savePrefs({technical:true,analytics:false,marketing:false});
    banner?.classList.remove('show');
  });

  btnConfig?.addEventListener('click', () => {
    modal?.classList.add('show');
  });

  btnSavePrefs?.addEventListener('click', () => {
    savePrefs({
      technical:true,
      analytics:inpAnalytics?.checked || false,
      marketing:inpMarketing?.checked || false
    });
    modal?.classList.remove('show');
    banner?.classList.remove('show');
  });

  btnAcceptAll?.addEventListener('click', () => {
    savePrefs({technical:true,analytics:true,marketing:true});
    modal?.classList.remove('show');
    banner?.classList.remove('show');
  });

  btnReopen?.addEventListener('click', e => {
    e.preventDefault();
    modal?.classList.add('show');
  });

})();