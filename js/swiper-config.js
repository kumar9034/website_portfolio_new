// Swiper Configuration for Carousels

let swipers = {};

function initSwipers() {
  // Testimonials Swiper
  if (document.getElementById('testimonials-swiper')) {
    swipers.testimonials = new Swiper('#testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }

  // Projects Swiper
  if (document.getElementById('projects-swiper')) {
    swipers.projects = new Swiper('#projects-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.projects-swiper-next',
        prevEl: '.projects-swiper-prev'
      },
      pagination: {
        el: '.projects-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }

  // Blog Swiper
  if (document.getElementById('blog-swiper')) {
    swipers.blog = new Swiper('#blog-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: true
      },
      navigation: {
        nextEl: '.blog-swiper-next',
        prevEl: '.blog-swiper-prev'
      },
      pagination: {
        el: '.blog-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }

  // Gallery Swiper
  if (document.getElementById('gallery-swiper')) {
    swipers.gallery = new Swiper('#gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev'
      },
      pagination: {
        el: '.gallery-pagination',
        clickable: true,
        type: 'fraction'
      },
      zoom: {
        maxRatio: 3
      }
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    initSwipers();
  }
});

// Export for external use
window.initSwipers = initSwipers;
window.swipers = swipers;
