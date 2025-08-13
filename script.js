// ======= Mobile menu toggle =======
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => {
  const visible = window.getComputedStyle(navLinks).display !== 'none';
  navLinks.style.display = visible ? 'none' : 'flex';
});

// ======= Scrollspy (active nav link) =======
const sections = [...document.querySelectorAll('main, section')];
const links = [...document.querySelectorAll('nav a')];
const byId = id => document.querySelector(`a[href="#${id}"]`);
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = byId(id);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  })
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
sections.forEach(sec => spy.observe(sec));

// ======= Reveal on scroll =======
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: .15 });
revealEls.forEach(el=>revealObs.observe(el));

// ======= Contact form =======
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if(!data.name || !data.email || !data.message){
    formMsg.textContent = 'Please fill out all fields.'; return;
  }
  window.location.href = `mailto:Sonukotak1234@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message + '\n\nFrom: ' + data.name + ' <' + data.email + '>')}`;
  formMsg.textContent = 'Opening your email client…';
  form.reset();
});

// ======= Year =======
document.getElementById('year').textContent = new Date().getFullYear();
