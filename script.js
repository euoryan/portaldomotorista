// Cache de elementos DOM
const DOM = {
    nav: {
      toggle: document.querySelector('.nav-toggle'),
      links: document.querySelector('.nav-links'),
      items: document.querySelectorAll('.nav-links a')
    },
    sections: document.querySelectorAll('section, #contato'),
    hero: {
      scrollIndicator: document.querySelector('.scroll-indicator'),
      projectsSection: document.querySelector('#projetos')
    }
  };
  
  // Gerenciamento de Performance
  const Performance = {
    scrollPosition: 0,
    ticking: false,
    init() {
      this.setupEventListeners();
      this.setupIntersectionObserver();
      this.setupLazyLoading();
      this.initializeActiveLink();
    },
    
    setupEventListeners() {
      // Scroll otimizado
      window.addEventListener('scroll', () => {
        this.scrollPosition = window.scrollY;
        if (!this.ticking) {
          requestAnimationFrame(() => {
            this.updateActiveLink();
            this.ticking = false;
          });
          this.ticking = true;
        }
      }, { passive: true });
  
      // Resize com debounce
      let resizeTimeout;
      window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => this.updateActiveLink(), 250);
      }, { passive: true });
  
      // Nav toggle otimizado
      DOM.nav.toggle.addEventListener('click', () => {
        DOM.nav.links.classList.toggle('show');
      });
  
      // Scroll suave otimizado para links
      DOM.nav.items.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          DOM.nav.links.classList.remove('show');
          
          const href = link.getAttribute('href');
          if (href === '#') {
            this.smoothScroll(document.documentElement, 0);
          } else {
            const target = document.querySelector(href);
            if (target) {
              const offset = target.offsetTop - 70;
              this.smoothScroll(document.documentElement, offset);
            }
          }
        });
      });
  
      // Scroll indicator
      DOM.hero.scrollIndicator?.addEventListener('click', () => {
        const offset = DOM.hero.projectsSection.offsetTop - 70;
        this.smoothScroll(document.documentElement, offset);
      });
    },
  
    setupIntersectionObserver() {
      const options = {
        rootMargin: '0px',
        threshold: 0.5
      };
  
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, options);
  
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    },
  
    setupLazyLoading() {
      const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
  
      document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    },
  
    smoothScroll(element, targetPosition, duration = 600) {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;
  
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
      
      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
      
      requestAnimationFrame(animation);
    },
  
    updateActiveLink() {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = '';
  
      DOM.sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.getAttribute('id') || 'home';
        }
      });
  
      if (window.scrollY < 100) currentSection = 'home';
  
      DOM.nav.items.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSection || (href === '' && currentSection === 'home')) {
          link.classList.add('active');
        }
      });
    },
  
    initializeActiveLink() {
      this.updateActiveLink();
      window.addEventListener('load', () => this.updateActiveLink());
    }
  };
  
  // Inicialização
  document.addEventListener('DOMContentLoaded', () => Performance.init());