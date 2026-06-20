// Main JavaScript File - Handles core functionality

class Portfolio {
  constructor() {
    this.isDarkMode = this.getThemePreference();
    this.init();
  }

  init() {
    this.setTheme();
    this.setupNavbar();
    this.setupScrollAnimations();
    this.setupThemeToggle();
    this.setupSmoothScroll();
    this.setupFormHandling();
    this.setupCounterAnimation();
  }

  getThemePreference() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setTheme() {
    const html = document.documentElement;
    const body = document.body;
    
    if (this.isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      html.classList.remove('dark');
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.setTheme();
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  setupNavbar() {
    const navbar = document.querySelector('.navbar-scroll');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile menu
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      // Close menu on link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  setupScrollAnimations() {
    // Animate elements on scroll using Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      try {
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span>';
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
      } catch (error) {
        this.showNotification('Error sending message. Please try again.', 'error');
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  }

  setupCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-counter'));
          const duration = 2000;
          const start = 0;
          const increment = target / (duration / 16);
          
          let current = start;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + (counter.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
            }
          }, 16);
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-primary' : 'bg-red-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Utility method for smooth scrolling to section
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Initialize Portfolio
document.addEventListener('DOMContentLoaded', () => {
  window.portfolio = new Portfolio();
});
