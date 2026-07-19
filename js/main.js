// Main JS: menu toggle, in-view animations, filters
document.addEventListener('DOMContentLoaded',()=>{
  const hamburger=document.getElementById('hamburger');
  const mainNav=document.getElementById('mainNav');

  // Overlay handling for mobile nav
  const navOverlay = document.getElementById('navOverlay');
  function openNav(state){
    if(!mainNav || !hamburger) return;
    if(state){
      mainNav.classList.add('open');
      document.documentElement.classList.add('nav-open');
      hamburger.setAttribute('aria-expanded','true');
    } else {
      mainNav.classList.remove('open');
      document.documentElement.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded','false');
    }
  }
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  function toggleMobileMenu(state){
    if(!mobileMenuPanel) return;
    if(state){
      mobileMenuPanel.classList.add('open');
      document.documentElement.classList.add('nav-open');
      if(mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded','true');
      mobileMenuPanel.setAttribute('aria-hidden','false');
    } else {
      mobileMenuPanel.classList.remove('open');
      document.documentElement.classList.remove('nav-open');
      if(mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded','false');
      mobileMenuPanel.setAttribute('aria-hidden','true');
    }
  }

  if(hamburger && mainNav){
    hamburger.addEventListener('click',()=>{openNav(!mainNav.classList.contains('open'))});
  }
  if(mobileMenuToggle){
    mobileMenuToggle.addEventListener('click',()=>{toggleMobileMenu(!mobileMenuPanel?.classList.contains('open'))});
  }
  if(mobileMenuClose){
    mobileMenuClose.addEventListener('click',()=>toggleMobileMenu(false));
  }
  if(navOverlay){navOverlay.addEventListener('click',()=>{openNav(false);toggleMobileMenu(false)})}

  // Make header solid on scroll
  const header=document.querySelector('.site-header');
  function checkHeader(){if(window.scrollY>40){header.classList.add('solid')}else{header.classList.remove('solid')}}
  checkHeader();window.addEventListener('scroll',checkHeader);

  // simple in-view observer
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('in-view')} 
    })
  },{threshold:0.12});

  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

  // portfolio filters
  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click',e=>{
      document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      document.querySelectorAll('.project').forEach(p=>{
        if(f==='all'||p.dataset.category===f){p.style.display='block'}else{p.style.display='none'}
      })
    })
  });

  // Testimonial carousel simple auto-rotate
  const carousel=document.querySelector('.testimonial-carousel');
  if(carousel){
    let idx=0;const items=carousel.querySelectorAll('.testimonial-item');
    function show(){items.forEach((it,i)=>{it.style.display=(i===idx)?'block':'none'});idx=(idx+1)%items.length}
    show();setInterval(show,4500);
  }

  // Accordion
  document.querySelectorAll('.acc-toggle').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item = btn.closest('.acc-item');
      const panel = btn.nextElementSibling;
      const open = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(el=>{
        el.classList.remove('open');
        if(el.querySelector('.acc-panel')) el.querySelector('.acc-panel').style.display = 'none';
      });
      if(!open){
        item.classList.add('open');
        panel.style.display = 'block';
      }
    });
  });
  
  // Close mobile nav when link clicked
  document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{if(mainNav.classList.contains('open')){openNav(false)}}));
  document.querySelectorAll('.mobile-menu-panel a').forEach(a=>a.addEventListener('click',()=>toggleMobileMenu(false)));

  // Theme toggle: remember preference
  const themeToggle = document.getElementById('themeToggle');
  function setTheme(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem('theme',t)}
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(savedTheme);
  if(themeToggle){
    themeToggle.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '🌙' : '☀️';
    themeToggle.addEventListener('click',()=>{
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(current);
      themeToggle.textContent = current === 'light' ? '🌙' : '☀️';
    });
  }
});
