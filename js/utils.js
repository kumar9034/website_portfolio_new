// Utility Functions

const Utils = {
  // Format number with separator
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Create element with classes
  createElement: (tag, classes = '', html = '') => {
    const el = document.createElement(tag);
    if (classes) el.className = classes;
    if (html) el.innerHTML = html;
    return el;
  },

  // Add multiple event listeners
  addEventListeners: (element, events, handler) => {
    events.forEach(event => {
      element.addEventListener(event, handler);
    });
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Get scroll percentage
  getScrollPercentage: () => {
    const h = document.documentElement;
    return (window.scrollY / (h.scrollHeight - window.innerHeight)) * 100;
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate phone
  validatePhone: (phone) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
  },

  // Copy to clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return false;
    }
  },

  // Add loading state to button
  setButtonLoading: (button, isLoading = true) => {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.innerHTML = '<span class="loading"></span>';
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || 'Submit';
    }
  },

  // Local storage with expiry
  setStorageWithExpiry: (key, value, expiryHours = 24) => {
    const item = {
      value: value,
      expiry: Date.now() + (expiryHours * 60 * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  getStorageWithExpiry: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.value;
  },

  // Lazy load images
  lazyLoadImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  },

  // Smooth scroll to element
  smoothScroll: (element, offset = 0) => {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
};

// Export utilities
window.Utils = Utils;
