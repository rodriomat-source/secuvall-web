(() => {
  'use strict';

  const qs  = (s, p=document) => p.querySelector(s);
  const qsa = (s, p=document) => [...p.querySelectorAll(s)];

  /* Año */
  const year = qs('#year');
  if(year) year.textContent = new Date().getFullYear();

  /* Tema */
  const html = document.documentElement;
  const toggle = qs('#themeToggle');

  toggle?.addEventListener('click',()=>{
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme',next);
    try{localStorage.setItem('secuvall-theme',next);}catch(e){}
  });

  /* Menú móvil */
  const navToggle = qs('#navToggle');
  const navMenu = qs('#navMenu');

  navToggle?.addEventListener('click',()=>{
    navMenu.classList.toggle('open');
  });

  qsa('#navMenu a').forEach(link=>{
    link.addEventListener('click',()=>{
      navMenu.classList.remove('open');
    });
  });

  /* Scroll header */
  const topbar = qs('#topbar');
  const backToTop = qs('#backToTop');

  const onScroll = ()=>{
    const y = window.scrollY;
    topbar?.classList.toggle('scrolled',y>20);
    backToTop?.classList.toggle('show',y>600);
  };

  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  backToTop?.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });

})();