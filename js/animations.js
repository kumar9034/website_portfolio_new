// Animation Setup - GSAP and AOS Configuration

// Initialize AOS (Animate On Scroll)
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100,
      disable: false
    });
  }
}

// GSAP Animation Presets
const gsapAnimations = {
  // Hero section entrance animation
  heroEntrance: (element) => {
    if (typeof gsap === 'undefined') return;
    
    gsap.timeline()
      .from(element.querySelector('.hero-title'), {
        duration: 0.8,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
      })
      .from(element.querySelector('.hero-subtitle'), {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
      }, '-=0.5')
      .from(element.querySelectorAll('.hero-cta'), {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: 'back.out',
        stagger: 0.2
      }, '-=0.5');
  },

  // Card hover animation
  cardHover: (element) => {
    if (typeof gsap === 'undefined') return;
    
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        duration: 0.3,
        y: -10,
        boxShadow: '0 20px 60px rgba(54, 229, 142, 0.2)',
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        duration: 0.3,
        y: 0,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        ease: 'power2.out'
      });
    });
  },

  // Scroll reveal animation
  scrollReveal: (elements) => {
    if (typeof gsap === 'undefined') return;

    elements.forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          markers: false
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out'
      });
    });
  },

  // Parallax effect
  parallax: (element, speed = 0.5) => {
    if (typeof gsap === 'undefined') return;

    gsap.set(element, { y: 0 });
    
    window.addEventListener('scroll', () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      gsap.to(element, {
        y: scrolled * speed,
        ease: 'none',
        duration: 0
      });
    });
  },

  // Number counter animation
  countUp: (element, target, duration = 2) => {
    if (typeof gsap === 'undefined') return;

    gsap.to(element, {
      duration: duration,
      innerHTML: Math.round(target),
      snap: { innerHTML: 1 },
      ease: 'power1.inOut'
    });
  },

  // Text stagger animation
  textStagger: (text) => {
    if (typeof gsap === 'undefined') return;

    const letters = text.split('');
    text.innerHTML = letters
      .map(letter => `<span class="inline-block">${letter}</span>`)
      .join('');

    gsap.from(text.querySelectorAll('span'), {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: 'back.out',
      stagger: 0.05
    });
  }
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAOS();

  // Setup GSAP animations for cards
  document.querySelectorAll('.card-hover').forEach(card => {
    gsapAnimations.cardHover(card);
  });

  // Setup scroll reveal for elements with data-scroll-reveal
  const scrollRevealElements = document.querySelectorAll('[data-scroll-reveal]');
  if (scrollRevealElements.length > 0) {
    gsapAnimations.scrollReveal(scrollRevealElements);
  }

  // Setup parallax for elements with data-parallax
  document.querySelectorAll('[data-parallax]').forEach(element => {
    const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
    gsapAnimations.parallax(element, speed);
  });

  // Animate hero section on page load
  const hero = document.querySelector('.hero-content');
  if (hero) {
    gsapAnimations.heroEntrance(hero);
  }
});

// Reinitialize AOS when page content changes
function reinitializeAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// Export for use in other modules
window.gsapAnimations = gsapAnimations;
window.reinitializeAnimations = reinitializeAnimations;

// EmailJS Initialization
emailjs.init("iWsXv6gFNxSm2K2KP");

// Contact Form Submit
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.sendForm(
        "service_26rwidj",
        "template_32ifp21",
        "#contact-form"
    )
    .then(function () {

        alert("✅ Message sent successfully!");

        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

    })
    .catch(function (error) {

        console.error(error);

        alert("❌ Failed to send message. Please try again.");

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

    });

});





// service_26rwidj
// template_32ifp21

// iWsXv6gFNxSm2K2KP
