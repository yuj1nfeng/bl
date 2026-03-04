/**
 * Anime Drama Blog Theme
 * Main JavaScript
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initAnimations();
    initCounter();
    initCopyCode();
  });

  /**
   * Navbar scroll effect
   */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const themeToggle = document.getElementById('theme-toggle');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (menuToggle && navbarMenu) {
      menuToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navbarMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }

    // Theme toggle (placeholder for future dark/light mode)
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        // Future theme switching logic
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
      });
    }
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Scroll animations
   */
  function initAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.post-card, .archive-item, .skill-item, .about-stat-item').forEach(function(el) {
      el.classList.add('animate-element');
      observer.observe(el);
    });
  }

  /**
   * Counter animation for stats
   */
  function initCounter() {
    const counters = document.querySelectorAll('.stat-value[data-count]');

    const animateCounter = function(counter) {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(function() {
        current += step;
        if (current >= target) {
          counter.textContent = target + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    };

    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
      counterObserver.observe(counter);
    });
  }

  /**
   * Copy code button for code blocks
   */
  function initCopyCode() {
    const codeBlocks = document.querySelectorAll('.article-content pre');

    codeBlocks.forEach(function(pre) {
      const button = document.createElement('button');
      button.className = 'copy-code-btn';
      button.innerHTML = '<i class="fas fa-copy"></i>';
      button.title = 'Copy code';

      pre.appendChild(button);

      button.addEventListener('click', function() {
        const code = pre.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(function() {
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(function() {
              button.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
          });
        }
      });
    });
  }

  /**
   * Lazy load images
   */
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-element {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-element.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .copy-code-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 8px 12px;
      background: var(--color-bg-tertiary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all var(--transition-base);
      opacity: 0;
    }

    pre:hover .copy-code-btn {
      opacity: 1;
    }

    .copy-code-btn:hover {
      background: var(--color-accent-primary);
      color: white;
      border-color: var(--color-accent-primary);
    }

    .article-content pre {
      position: relative;
    }
  `;
  document.head.appendChild(style);

})();
