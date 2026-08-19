/**
 * Parallax & Micro-Interaction Engine - Sakshi Bansal Portfolio
 */
class ParallaxEngine {
  constructor() {
    this.bgLayers = [];
    this.midLayers = [];
    this.tiltCards = [];
    this.counters = [];
    this.hasAnimatedCounters = false;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bgLayers = document.querySelectorAll('[data-parallax-speed="0.2"]');
      this.midLayers = document.querySelectorAll('[data-parallax-speed="0.5"]');
      this.tiltCards = document.querySelectorAll('.tilt-card');
      this.counters = document.querySelectorAll('.stat-number');

      this.bindScroll();
      this.bindTilt();
      this.initCounters();
    });
  }

  bindScroll() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;

          // Parallax background layers (0.2x speed)
          this.bgLayers.forEach(el => {
            el.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
          });

          // Parallax middle layers (0.5x speed)
          this.midLayers.forEach(el => {
            el.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  bindTilt() {
    this.tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg rotation
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  initCounters() {
    if (!this.counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimatedCounters) {
          this.hasAnimatedCounters = true;
          this.animateCounters();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    } else {
      this.counters.forEach(c => observer.observe(c));
    }
  }

  animateCounters() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // Ease out quad
        const currentVal = Math.floor(progress * (2 - progress) * target);
        
        counter.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  }
}

// Global instance
window.parallaxEngine = new ParallaxEngine();
