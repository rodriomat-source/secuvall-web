(() => {
  'use strict';

  const qs  = (s,p=document)=>p.querySelector(s);
  const qsa = (s,p=document)=>[...p.querySelectorAll(s)];

  /* Año */
  const year = qs('#year');
  if(year) year.textContent = new Date().getFullYear();

  /* Tema */
  const html = document.documentElement;
  const toggle = qs('#themeToggle');
  toggle?.addEventListener('click',()=>{
    const current = html.getAttribute('data-theme')||'dark';
    const next = current==='dark'?'light':'dark';
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

  /* Scroll header + back to top */
  const topbar = qs('#topbar');
  const backToTop = qs('#backToTop');
  const onScroll = ()=>{
    const y=window.scrollY;
    topbar?.classList.toggle('scrolled',y>20);
    backToTop?.classList.toggle('show',y>600);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  backToTop?.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });

  /* Safe Card Reveal */
  const premiumCards = qsa('.card,.pricing-card,.step-card,.service-feature,.value-item');

  if('IntersectionObserver'in window){
    const cardIO=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          cardIO.unobserve(entry.target);
        }
      });
    },{threshold:.15});
    premiumCards.forEach(el=>cardIO.observe(el));
  }else{
    premiumCards.forEach(el=>el.classList.add('is-visible'));
  }

  /* Footer Reveal */
  const footer=qs('.footer');
  if(footer&&'IntersectionObserver'in window){
    const footerIO=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          footer.classList.add('footer-visible');
        }
      });
    },{threshold:.2});
    footerIO.observe(footer);
  }

  /* Scroll Progress */
  const progressBar=qs('.scroll-progress');
  const updateProgress=()=>{
    const scrollTop=window.scrollY;
    const height=document.body.scrollHeight-window.innerHeight;
    const progress=(scrollTop/height)*100;
    if(progressBar)progressBar.style.width=progress+'%';
  };
  window.addEventListener('scroll',updateProgress,{passive:true});
  updateProgress();

  /* Magnetic Buttons */
  qsa('.btn-primary').forEach(btn=>{
    btn.classList.add('magnetic');
    btn.addEventListener('mousemove',e=>{
      const rect=btn.getBoundingClientRect();
      const x=e.clientX-rect.left-rect.width/2;
      const y=e.clientY-rect.top-rect.height/2;
      btn.style.transform=`translate(${x*0.12}px,${y*0.12}px)`;
    });
    btn.addEventListener('mouseleave',()=>{
      btn.style.transform='';
    });
  });

})();