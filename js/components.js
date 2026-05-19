/* ========================================================
   SECUVALL · Componentes comunes
   Header, footer, cookies, botón volver arriba y Schema.org
   ======================================================== */

(() => {
  'use strict';

  const SITE_URL = 'https://rodriomat-source.github.io/secuvall-web/';
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = path === 'index.html' || path === '';

  const homeHref = (hash) => isHome ? hash : `index.html${hash}`;
  const activeClass = (page) => path === page ? ' active' : '';

  const brandIcon = (id = 'lgBrand') => `
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <defs>
          <linearGradient id="${id}" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#4f7cff"/>
            <stop offset="1" stop-color="#9d5cff"/>
          </linearGradient>
        </defs>
        <path d="M16 2L4 7v9c0 7.5 5.1 13.5 12 14 6.9-.5 12-6.5 12-14V7L16 2z" stroke="url(#${id})" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M11 16l3.5 3.5L21 12" stroke="url(#${id})" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>`;

  const header = `
    <div class="cursor-glow" aria-hidden="true"></div>
    <a class="skip-link" href="#main-content">Saltar al contenido principal</a>
    <header class="topbar" id="topbar">
      <div class="container topbar-content">
        <a href="index.html" class="brand" aria-label="Secuvall — Inicio">
          ${brandIcon('lgHeader')}
          <span class="brand-text">SECUVALL</span>
        </a>

        <nav class="nav" id="navMenu" aria-label="Navegación principal" aria-hidden="true">
          <a href="${homeHref('#inicio')}" class="nav-link${isHome ? ' active' : ''}" data-nav-section="inicio">Inicio</a>
          <a href="${homeHref('#empresa')}" class="nav-link" data-nav-section="empresa">Empresa</a>
          <a href="${homeHref('#servicios')}" class="nav-link${activeClass('servicios.html')}" data-nav-page="servicios.html">Servicios</a>
          <a href="planes.html" class="nav-link${activeClass('planes.html')}" data-nav-page="planes.html">Planes</a>
          <a href="${homeHref('#sectores')}" class="nav-link" data-nav-section="sectores">Sectores</a>
          <a href="blog.html" class="nav-link${activeClass('blog.html')}" data-nav-page="blog.html">Blog</a>
          <a href="${homeHref('#contacto')}" class="nav-link" data-nav-section="contacto">Contacto</a>

          <button class="theme-toggle" id="themeToggle" type="button" aria-label="Cambiar tema" aria-pressed="false" title="Cambiar tema">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>

          <a href="${homeHref('#contacto')}" class="btn btn-nav">Solicitar info</a>
        </nav>

        <button class="nav-toggle" id="navToggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="navMenu">
          <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </button>
      </div>
    </header>`;

  const footer = `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div>
            <a href="index.html" class="brand brand-footer" aria-label="Secuvall — Inicio">
              ${brandIcon('lgFooter')}
              <span class="brand-text">SECUVALL</span>
            </a>
            <p class="footer-about">Soluciones profesionales en ciberseguridad, vigilancia y servicios auxiliares.</p>
          </div>

          <div>
            <h4>Navegación</h4>
            <ul>
              <li><a href="${homeHref('#empresa')}">Empresa</a></li>
              <li><a href="servicios.html">Servicios</a></li>
              <li><a href="planes.html">Planes</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="${homeHref('#contacto')}">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="aviso-legal.html">Aviso legal</a></li>
              <li><a href="politica-privacidad.html">Política de privacidad</a></li>
              <li><a href="politica-cookies.html">Política de cookies</a></li>
              <li><a href="#" id="cookiesReopen">Configurar cookies</a></li>
            </ul>
          </div>

          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="tel:+34600000000">+34 600 000 000</a></li>
              <li><a href="mailto:info@secuvall.com">info@secuvall.com</a></li>
              <li>Galicia, España</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© <span id="year"></span> Secuvall · Todos los derechos reservados</span>
          <span class="footer-meta">Proyecto intermodular · 2º SMR</span>
        </div>
      </div>
    </footer>`;

  const cookieConsent = `
    <div class="cookie-banner" id="cookieBanner" role="region" aria-labelledby="cookieTitle" aria-describedby="cookieDesc" hidden>
      <div class="cookie-content">
        <div class="cookie-text">
          <h4 id="cookieTitle">🍪 Usamos cookies</h4>
          <p id="cookieDesc">Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes aceptar, rechazar o configurar tus preferencias. Más información en nuestra <a href="politica-cookies.html">política de cookies</a>.</p>
        </div>
        <div class="cookie-actions">
          <button class="btn btn-ghost btn-sm" type="button" id="cookieReject">Rechazar</button>
          <button class="btn btn-ghost btn-sm" type="button" id="cookieConfig">Configurar</button>
          <button class="btn btn-primary btn-sm" type="button" id="cookieAccept">Aceptar todas</button>
        </div>
      </div>
    </div>

    <div class="cookie-modal" id="cookieModal" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle" aria-describedby="cookieModalDesc" hidden>
      <div class="cookie-modal-backdrop" data-close></div>
      <div class="cookie-modal-content" role="document" tabindex="-1">
        <button class="cookie-modal-close" type="button" data-close aria-label="Cerrar preferencias de cookies">×</button>
        <h3 id="cookieModalTitle">Configurar cookies</h3>
        <p id="cookieModalDesc">Elige qué cookies quieres permitir. Las técnicas son siempre necesarias para el funcionamiento.</p>

        <div class="cookie-option">
          <div><strong>Cookies técnicas</strong><p>Necesarias para el funcionamiento de la web. No se pueden desactivar.</p></div>
          <label class="switch disabled"><span class="sr-only">Cookies técnicas activadas</span><input type="checkbox" checked disabled><span class="slider"></span></label>
        </div>

        <div class="cookie-option">
          <div><strong>Cookies analíticas</strong><p>Nos ayudan a entender cómo usas la web para poder mejorarla.</p></div>
          <label class="switch"><span class="sr-only">Permitir cookies analíticas</span><input type="checkbox" id="cookieAnalytics"><span class="slider"></span></label>
        </div>

        <div class="cookie-option">
          <div><strong>Cookies de marketing</strong><p>Usadas para mostrarte contenido y publicidad relevante.</p></div>
          <label class="switch"><span class="sr-only">Permitir cookies de marketing</span><input type="checkbox" id="cookieMarketing"><span class="slider"></span></label>
        </div>

        <div class="cookie-modal-actions">
          <button class="btn btn-ghost" type="button" id="cookieSavePrefs">Guardar preferencias</button>
          <button class="btn btn-primary" type="button" id="cookieAcceptAll">Aceptar todas</button>
        </div>
      </div>
    </div>`;

  const backToTop = `
    <button class="back-to-top" id="backToTop" type="button" aria-label="Volver arriba">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 15l-6-6-6 6"/></svg>
    </button>`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${SITE_URL}#organization`,
        name: 'Secuvall',
        url: SITE_URL,
        logo: `${SITE_URL}img/logo.png`,
        image: `${SITE_URL}img/empresa-real.webp`,
        description: 'Soluciones profesionales de ciberseguridad, vigilancia, control de accesos y servicios auxiliares.',
        email: 'info@secuvall.com',
        telephone: '+34600000000',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Ejemplo, 123',
          addressRegion: 'Galicia',
          addressCountry: 'ES'
        },
        areaServed: 'ES',
        priceRange: '€€',
        sameAs: []
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: 'Secuvall',
        publisher: { '@id': `${SITE_URL}#organization` },
        inLanguage: 'es-ES'
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}#service`,
        name: 'Servicios de ciberseguridad y vigilancia',
        provider: { '@id': `${SITE_URL}#organization` },
        areaServed: 'ES',
        serviceType: ['Ciberseguridad', 'Vigilancia', 'Control de accesos', 'Monitorización']
      }
    ]
  };

  const mount = (selector, html) => {
    document.querySelectorAll(selector).forEach((el) => { el.innerHTML = html; });
  };

  mount('[data-component="site-header"]', header);
  mount('[data-component="site-footer"]', footer);
  mount('[data-component="cookie-consent"]', cookieConsent);
  mount('[data-component="back-to-top"]', backToTop);

  if (!document.getElementById('schemaOrg')) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schemaOrg';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
})();
