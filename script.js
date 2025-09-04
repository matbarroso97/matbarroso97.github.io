document.addEventListener('DOMContentLoaded', function () {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Typing effect
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const text = 'Olá, eu sou Matheus Barroso';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // Tech circuit background
  function createTechBackground() {
    const bgTech = document.querySelector('.bg-tech');
    if (!bgTech) return;
    
    // Create floating tech particles
    function createParticle() {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.background = 'rgba(230,0,0,0.6)';
      particle.style.borderRadius = '50%';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = Math.random() * window.innerHeight + 'px';
      particle.style.boxShadow = '0 0 6px rgba(230,0,0,0.8)';
      particle.style.animation = `particle-float ${Math.random() * 3 + 2}s ease-in-out infinite`;
      particle.style.zIndex = '-1';
      
      bgTech.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    }
    
    // Create circuit lines
    function createCircuitLine() {
      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.background = 'linear-gradient(90deg, transparent, rgba(230,0,0,0.1), transparent)';
      line.style.height = '1px';
      line.style.width = Math.random() * 200 + 100 + 'px';
      line.style.left = Math.random() * window.innerWidth + 'px';
      line.style.top = Math.random() * window.innerHeight + 'px';
      line.style.animation = `circuit-line ${Math.random() * 4 + 3}s ease-in-out infinite`;
      line.style.zIndex = '-1';
      
      bgTech.appendChild(line);
      
      setTimeout(() => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      }, 7000);
    }
    
    // Create initial elements
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createParticle(), i * 200);
      setTimeout(() => createCircuitLine(), i * 300);
    }
    
    // Keep creating new elements
    setInterval(createParticle, 1000);
    setInterval(createCircuitLine, 1500);
  }
  createTechBackground();

  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('site-menu');

  if (navToggle && menu) {
    navToggle.textContent = '☰';
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      const isMobile = window.matchMedia('(max-width: 620px)').matches;
      if (isMobile) {
        if (!expanded) {
          menu.style.display = 'flex';
          navToggle.textContent = '✕';
        } else {
          menu.style.display = 'none';
          navToggle.textContent = '☰';
        }
      }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        const isMobile = window.matchMedia('(max-width: 620px)').matches;
        if (isMobile) {
          menu.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.textContent = '☰';
        }
      });
    });

    window.addEventListener('resize', function () {
      const isMobile = window.matchMedia('(max-width: 620px)').matches;
      if (!isMobile) {
        menu.style.display = 'flex';
        navToggle.textContent = '';
      } else {
        menu.style.display = 'none';
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('in'); });
  }

  // Ensure FormSubmit redirects back to this page
  const form = document.getElementById('contact-form');
  if (form) {
    const hiddenNext = form.querySelector('input[name="_next"]');
    if (hiddenNext) {
      const base = window.location.origin + window.location.pathname;
      hiddenNext.value = base + '?enviado=1#contato';
    }
  }

  // Show success toast if returned from submission
  const params = new URLSearchParams(window.location.search);
  if (params.get('enviado') === '1') {
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.textContent = 'Mensagem enviada com sucesso!';
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('in'); }, 10);
    setTimeout(function () { toast.classList.remove('in'); }, 3000);
    setTimeout(function () { toast.remove(); }, 3600);
    // Clean URL
    const cleanUrl = window.location.origin + window.location.pathname + '#contato';
    history.replaceState({}, '', cleanUrl);
  }
});


