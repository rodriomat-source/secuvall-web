/* ========================================================
   SECUVALL · main.js
   Tema, menú, reveal, contadores, typing, cookies, form, etc.
   ======================================================== */

(() => {
  'use strict';

  /* ---------- Año dinámico ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Tema (dark/light) ---------- */
  const THEME_KEY = 'secuvall-theme';
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details summary, [tabindex]:not([tabindex="-1"])';

  const getFocusable = (root) => Array.from(root.querySelectorAll(focusableSelector))
    .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden') && el.offsetParent !== null);

  let trapCleanup = null;
  const trapFocus = (container, onEscape) => {
    trapCleanup?.();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = getFocusable(container);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    trapCleanup = () => {
      document.removeEventListener('keydown', onKeyDown);
      trapCleanup = null;
    };
    return trapCleanup;
  };

  const setTheme = (t) => {
    html.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0a0e27' : '#f7f9ff');
    if (themeToggle) {
      const isLight = t === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute('aria-label', isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
      themeToggle.title = isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro';
    }
  };
  setTheme(html.getAttribute('data-theme') || 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    let navTrapCleanup = null;
    const isMobileNav = () => window.matchMedia('(max-width: 768px)').matches;
    navMenu.setAttribute('aria-hidden', String(isMobileNav()));

    const closeMenu = ({ restoreFocus = false } = {}) => {
      navMenu.classList.remove('open');
      navMenu.setAttribute('aria-hidden', String(isMobileNav()));
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menú');
      navTrapCleanup?.();
      navTrapCleanup = null;
      if (restoreFocus) navToggle.focus();
    };

    const openMenu = () => {
      navMenu.classList.add('open');
      navMenu.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Cerrar menú');
      const focusables = getFocusable(navMenu);
      focusables[0]?.focus();
      navTrapCleanup = trapFocus(navMenu, () => closeMenu({ restoreFocus: true }));
    };

    navToggle.addEventListener('click', () => {
      navMenu.classList.contains('open') ? closeMenu({ restoreFocus: true }) : openMenu();
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    window.addEventListener('resize', () => {
      if (!isMobileNav()) closeMenu();
      navMenu.setAttribute('aria-hidden', String(isMobileNav() && !navMenu.classList.contains('open')));
    });
  }

  /* ---------- Header con shadow al scroll ---------- */
  const topbar = document.getElementById('topbar');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    const y = window.scrollY;
    if (topbar) topbar.classList.toggle('scrolled', y > 20);
    if (backToTop) backToTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = (i % 4) * 80;
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contadores animados ---------- */
  const counters = document.querySelectorAll('.stat-value[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    };
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));
  }

  /* ---------- Typing animation en hero ---------- */
  const typingEl = document.getElementById('typing');
  if (typingEl) {
    const words = ['empresas', 'instituciones', 'datos', 'instalaciones', 'personas'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 50;
    const pauseEnd = 1600;

    if (prefersReducedMotion) {
      typingEl.textContent = words[0];
    } else {
      const type = () => {
        const current = words[wordIndex];
        if (isDeleting) {
          typingEl.textContent = current.substring(0, Math.max(charIndex - 1, 0));
          charIndex--;
          if (charIndex <= 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            window.setTimeout(type, 300);
            return;
          }
          window.setTimeout(type, deleteSpeed);
        } else {
          typingEl.textContent = current.substring(0, charIndex + 1);
          charIndex++;
          if (charIndex >= current.length) {
            isDeleting = true;
            window.setTimeout(type, pauseEnd);
            return;
          }
          window.setTimeout(type, typeSpeed);
        }
      };
      window.setTimeout(type, 600);
    }
  }

  /* ---------- Link activo en nav ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const getLinkHash = (link) => {
    try { return new URL(link.getAttribute('href'), window.location.href).hash; }
    catch (e) { return ''; }
  };
  const sections = Array.from(navLinks)
    .map(l => getLinkHash(l))
    .filter(Boolean)
    .map(hash => document.querySelector(hash))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', getLinkHash(link) === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => navIO.observe(s));
  }

  /* ---------- Formulario ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      // Validación
      const data = {
        nombre: form.nombre?.value.trim() || '',
        email: form.email?.value.trim() || '',
        asunto: form.asunto?.value.trim() || '',
        mensaje: form.mensaje?.value.trim() || '',
        rgpd: form.rgpd?.checked
      };

      if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
        status.classList.add('error');
        status.textContent = '⚠️ Por favor, completa todos los campos.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        status.classList.add('error');
        status.textContent = '⚠️ Introduce un email válido.';
        return;
      }
      if (!data.rgpd) {
        status.classList.add('error');
        status.textContent = '⚠️ Debes aceptar la política de privacidad.';
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.classList.add('loading');
      btn.disabled = true;

      // Insertar spinner si no existe
      if (!btn.querySelector('.spinner')) {
        const sp = document.createElement('span');
        sp.className = 'spinner';
        btn.prepend(sp);
      }

      try {
        const accessKey = form.querySelector('input[name="access_key"]')?.value;
        const isConfigured = accessKey && accessKey !== 'REEMPLAZA-CON-TU-ACCESS-KEY';

        if (isConfigured) {
          // Envío real con Web3Forms
          const formData = new FormData(form);
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });
          const json = await res.json();
          if (json.success) {
            status.classList.add('success');
            status.textContent = '✓ ¡Gracias! Hemos recibido tu mensaje. Te responderemos pronto.';
            form.reset();
          } else {
            throw new Error(json.message || 'Error al enviar');
          }
        } else {
          // Modo demo (no hay access key configurada)
          await new Promise(r => setTimeout(r, 800));
          status.classList.add('success');
          status.textContent = '✓ ¡Mensaje recibido! (Modo demo · configura tu access key de Web3Forms para envíos reales)';
          form.reset();
        }
      } catch (err) {
        status.classList.add('error');
        status.textContent = '✗ Error al enviar. Inténtalo de nuevo o escríbenos a info@secuvall.com';
      } finally {
        btn.classList.remove('loading');
        btn.disabled = false;
      }
    });
  }

  /* ---------- Parallax glows ---------- */
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (!prefersReducedMotion && glow1 && glow2 && window.matchMedia('(min-width: 1024px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      glow1.style.transform = `translate(${x}px, ${y}px)`;
      glow2.style.transform = `translate(${-x}px, ${-y}px)`;
    });
  }

  /* ========================================================
     COOKIES — Banner + Modal de configuración
     ======================================================== */
  const COOKIE_KEY = 'secuvall-cookies';
  const banner = document.getElementById('cookieBanner');
  const modal = document.getElementById('cookieModal');
  const btnAccept = document.getElementById('cookieAccept');
  const btnReject = document.getElementById('cookieReject');
  const btnConfig = document.getElementById('cookieConfig');
  const btnSavePrefs = document.getElementById('cookieSavePrefs');
  const btnAcceptAll = document.getElementById('cookieAcceptAll');
  const btnReopen = document.getElementById('cookiesReopen');
  const inpAnalytics = document.getElementById('cookieAnalytics');
  const inpMarketing = document.getElementById('cookieMarketing');

  const getCookiePrefs = () => {
    try {
      const raw = localStorage.getItem(COOKIE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  };

  const saveCookiePrefs = (prefs) => {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({
        ...prefs,
        timestamp: Date.now()
      }));
    } catch (e) {}
    applyCookiePrefs(prefs);
  };

  const applyCookiePrefs = (prefs) => {
    // Aquí cargarías scripts según las preferencias
    // Ejemplo (descomenta cuando tengas Google Analytics):
    // if (prefs.analytics) loadGoogleAnalytics();
    // if (prefs.marketing) loadMarketingPixels();
    console.log('[Cookies] Preferencias aplicadas:', prefs);
  };

  const showBanner = () => {
    if (!banner) return;
    banner.hidden = false;
    requestAnimationFrame(() => banner.classList.add('show'));
  };

  const hideBanner = () => {
    if (!banner) return;
    banner.classList.remove('show');
    setTimeout(() => banner.hidden = true, 500);
  };

  let lastFocusedBeforeModal = null;
  let modalTrapCleanup = null;

  const showModal = () => {
    if (!modal) return;
    const prefs = getCookiePrefs();
    if (inpAnalytics) inpAnalytics.checked = prefs?.analytics || false;
    if (inpMarketing) inpMarketing.checked = prefs?.marketing || false;
    lastFocusedBeforeModal = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      modal.classList.add('show');
      const target = modal.querySelector('.cookie-modal-close') || modal.querySelector('.cookie-modal-content');
      target?.focus();
      modalTrapCleanup = trapFocus(modal, hideModal);
    });
  };

  const hideModal = () => {
    if (!modal || modal.hidden) return;
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    modalTrapCleanup?.();
    modalTrapCleanup = null;
    setTimeout(() => {
      modal.hidden = true;
      if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
        lastFocusedBeforeModal.focus();
      }
    }, 300);
  };
    // Mostrar banner si no hay preferencias guardadas
  const existing = getCookiePrefs();
  if (!existing) {
    setTimeout(showBanner, 1000);
  } else {
    applyCookiePrefs(existing);
  }

  btnAccept?.addEventListener('click', () => {
    saveCookiePrefs({ technical: true, analytics: true, marketing: true });
    hideBanner();
  });
  btnReject?.addEventListener('click', () => {
    saveCookiePrefs({ technical: true, analytics: false, marketing: false });
    hideBanner();
  });
  btnConfig?.addEventListener('click', () => {
    showModal();
  });
  btnSavePrefs?.addEventListener('click', () => {
    saveCookiePrefs({
      technical: true,
      analytics: inpAnalytics?.checked || false,
      marketing: inpMarketing?.checked || false
    });
    hideModal();
    hideBanner();
  });
  btnAcceptAll?.addEventListener('click', () => {
    saveCookiePrefs({ technical: true, analytics: true, marketing: true });
    hideModal();
    hideBanner();
  });
  btnReopen?.addEventListener('click', (e) => {
    e.preventDefault();
    showModal();
  });

  // Cerrar modal con backdrop o botón close
  modal?.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', hideModal);
  });

  /* ========================================================
     ADDONS: cursor glow + trust-bar speed
     ======================================================== */

  // Glow global: actualiza variables CSS con el puntero
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && !prefersReducedMotion) {
    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      cursorGlow.style.setProperty('--gx', x + '%');
      cursorGlow.style.setProperty('--gy', y + '%');
    }, { passive: true });
  }

  // Trust bar: ajustar duración según ancho del contenido (mantiene scroll fluido)
  const trustBarItems = document.getElementById('trustBarItems');
  if (trustBarItems) {
    const halfWidth = trustBarItems.scrollWidth / 2;
    const seconds = Math.max(16, halfWidth / 50);
    trustBarItems.style.animationDuration = seconds + 's';
  }

  /* ---------- Scroll steps progress (sección método) ---------- */
  const stepsSection = document.getElementById('metodo');
  const stepsProgress = document.getElementById('stepsProgress');

  if (stepsSection && stepsProgress) {
    const updateStepsProgress = () => {
      const rect = stepsSection.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // tramo útil: desde que entra hasta que sale
      const start = vh * 0.15;
      const end = vh * 0.85;

      const total = (rect.height - (end - start));
      const passed = (start - rect.top);

      const p = total > 0 ? Math.min(Math.max(passed / total, 0), 1) : 0;
      stepsProgress.style.height = (p * 100).toFixed(2) + '%';
    };

    window.addEventListener('scroll', updateStepsProgress, { passive: true });
    window.addEventListener('resize', updateStepsProgress);
    updateStepsProgress();
  }

/* ========= FOOTER REVEAL ========= */

const footer = document.querySelector('.footer');
if(footer && 'IntersectionObserver' in window){
  const footerIO = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        footer.classList.add('footer-visible');
      }
    });
  },{threshold:.3});
  footerIO.observe(footer);
}

/* ========= PREMIUM DEPTH SCROLL ========= */

const depthSections = document.querySelectorAll('.section');

const updateDepth = () => {
  const vh = window.innerHeight;

  depthSections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const progress = (vh - rect.top) / vh;
    const depth = Math.max(Math.min(progress * -40, 40), -40);
    sec.style.setProperty('--depthY', depth + 'px');
  });
};

if (!prefersReducedMotion) {
  window.addEventListener('scroll', updateDepth, { passive:true });
  updateDepth();
}

/* ========= MAGNETIC BUTTON ========= */

if (!prefersReducedMotion) document.querySelectorAll('.btn-primary').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    btn.style.transform = `translate(${x*0.15}px,${y*0.15}px)`;
  });
  btn.addEventListener('mouseleave',()=>{
    btn.style.transform = '';
  });
});

})();