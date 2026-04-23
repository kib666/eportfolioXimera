/* portfolio.js — OJT E-Portfolio Interactions */

(function() {
  'use strict';

  // --- NAV SCROLL EFFECT ---
  const nav = document.getElementById('portfolio-nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- MOBILE NAV TOGGLE ---
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  toggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
    });
  });

  // --- ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const navHeight = 70;

  function updateActiveNav() {
    const scrollPos = window.scrollY + navHeight + 20;
    let current = '';
    sections.forEach(function(section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- TAB SYSTEM (Section 3) ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      // Deactivate all
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function(c) {
        c.classList.remove('active');
      });
      // Activate clicked
      this.classList.add('active');
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });

  // --- SCROLL ANIMATION: FADE-IN ON SCROLL ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation targets
  const animTargets = document.querySelectorAll(
    '.intern-card, .dev-card, .deliverable-block, .solution-card, .reflection-card, .tool-pill, .dept-card'
  );
  animTargets.forEach(function(el) {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // Inject animation CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    .fade-up {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-up.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .intern-card:nth-child(2).fade-up, .dev-card:nth-child(2).fade-up { transition-delay: 0.1s; }
    .intern-card:nth-child(3).fade-up, .dev-card:nth-child(3).fade-up { transition-delay: 0.2s; }
    .dev-card:nth-child(4).fade-up { transition-delay: 0.1s; }
    .dev-card:nth-child(5).fade-up { transition-delay: 0.2s; }
    .dev-card:nth-child(6).fade-up { transition-delay: 0.3s; }
  `;
  document.head.appendChild(style);

  // Run once on load
  updateActiveNav();

})();
