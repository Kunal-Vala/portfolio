/* ========================================================
   KUNAL VALA — PORTFOLIO SCRIPTS
   Animations, typing effect, scroll reveals, navigation
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ===================== TYPING EFFECT =====================
  const typingElement = document.getElementById('typingText');
  const phrases = [
    'Full Stack Developer.',
    'React Enthusiast.',
    'Node.js Builder.',
    'Problem Solver.',
    'CS Student (2027).',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ===================== CURSOR GLOW =====================
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  // Only enable on non-touch devices
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.classList.add('active');
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ===================== SCROLL REVEAL =====================
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // ===================== NAVIGATION =====================
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  const navLinks = document.querySelectorAll('.nav__link');

  let lastScrollY = window.scrollY;
  let ticking = false;

  // Hide/show nav on scroll
  function handleNavScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active')
      ? 'hidden'
      : '';
  });

  // Close mobile menu on link click
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  function setActiveNavLink() {
    const scrollY = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink);

  // ===================== SMOOTH SCROLL (for nav links) =====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===================== PROJECT CARD TILT EFFECT =====================
  if (window.matchMedia('(hover: hover)').matches) {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ===================== SKILL PILLS STAGGER =====================
  const skillPills = document.querySelectorAll('.skill-pill');
  skillPills.forEach((pill, index) => {
    pill.style.animationDelay = `${index * 30}ms`;
  });

  // ===================== PARALLAX HERO ELEMENTS =====================
  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const hero = document.querySelector('.hero');
      if (hero) {
        const heroContent = hero.querySelector('.hero__container');
        if (heroContent && scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
          heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
        }
      }
    });
  }

  // ===================== CONSOLE EASTER EGG =====================
  console.log(
    '%c Hey there! 👋 ',
    'background: #6366f1; color: white; font-size: 16px; padding: 8px 16px; border-radius: 4px;'
  );
  console.log(
    "%c Kunal Vala's Portfolio — Built with vanilla HTML, CSS & JS",
    'color: #818cf8; font-size: 12px;'
  );
  console.log(
    '%c Check out my GitHub: https://github.com/Kunal-Vala',
    'color: #a1a1aa; font-size: 11px;'
  );
});
