/* PAGE NAV */
function showPage(id, e) {
  if (e) e.preventDefault();
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const targetPage = document.getElementById(id);
  if (targetPage) targetPage.classList.add('active');
  
  // Update nav links
  document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
  const link = document.getElementById('nav-' + id);
  if (link) link.classList.add('active');
  
  // Close mobile navbar if open
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    // If using Bootstrap bundle, we can use the BS API, or just click the toggler
    document.querySelector('.navbar-toggler').click();
  }
  
  // Scroll to top
  window.scrollTo({top: 0, behavior: 'smooth'});
  
  // Trigger animations
  setTimeout(triggerReveal, 80);
}

/* CURSOR */
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
}

/* NAVBAR SCROLL */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

/* PARTICLES */
(function(){
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = 4 + Math.random() * 10;
    // We add some inline styles for the particles
    p.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,.55);
      width: ${sz}px;
      height: ${sz}px;
      left: ${Math.random()*100}%;
      animation: floatUp linear infinite;
      animation-duration: ${6+Math.random()*10}s;
      animation-delay: ${-Math.random()*10}s;
    `;
    c.appendChild(p);
  }
  
  // Add keyframes if not present
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.innerHTML = `
      @keyframes floatUp {
        0% { transform: translateY(100vh) scale(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: .7; }
        100% { transform: translateY(-80px) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* SCROLL REVEAL */
function triggerReveal() {
  const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
  if (!window.IntersectionObserver) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add('visible'); 
        obs.unobserve(e.target); 
      } 
    });
  }, {threshold: 0.1});
  
  els.forEach(el => obs.observe(el));
}

// Initial reveal call
document.addEventListener('DOMContentLoaded', triggerReveal);

/* FORM TOAST */
function handleSubmit() {
  const t = document.getElementById('toast');
  if (t) {
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  }
  
  // Clear inputs
  document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select').forEach(el => {
    el.value = '';
  });
}
