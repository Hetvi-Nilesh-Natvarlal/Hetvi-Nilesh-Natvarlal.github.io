'use strict';

/**
 * 1. NAVBAR & MENU LOGIC
 * Handles the mobile toggle and adds a click-outside-to-close feature
 */
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  header.classList.toggle("nav-active");
  navToggleBtn.classList.toggle("active");
  document.body.classList.toggle("nav-open");
}

if (navToggleBtn) {
  navToggleBtn.addEventListener("click", toggleNavbar);
}

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-active");
    navToggleBtn?.classList.remove("active");
    document.body.classList.remove("nav-open");
  });
});

// Close menu when clicking outside of the navbar
document.addEventListener("click", function (event) {
  const isClickInsideNavbar = navbar.contains(event.target);
  const isClickInsideBtn = navToggleBtn.contains(event.target);

  if (!isClickInsideNavbar && !isClickInsideBtn && header.classList.contains("nav-active")) {
    header.classList.remove("nav-active");
    navToggleBtn.classList.remove("active");
    document.body.classList.remove("nav-open");
  }
});

/**
 * 2. STICKY HEADER & BACK TO TOP
 */
const backTopBtn = document.querySelector("[data-back-to-top]");

const activeElementOnScroll = function () {
  const isScrolled = window.scrollY > 100;
  header?.classList.toggle("active", isScrolled);
  backTopBtn?.classList.toggle("active", isScrolled);
}

window.addEventListener("scroll", activeElementOnScroll);

/**
 * 3. MODERN REVEAL ON SCROLL
 * Uses IntersectionObserver to trigger the [data-reveal] CSS animations
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      // Stop observing after it has revealed once for better performance
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

/**
 * 4. CONTACT FORM HANDLING
 * Updated to match the new high-contrast "Coral/Peach" theme
 */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector(".btn");
    const originalText = submitBtn.textContent;
    
    // Change state to "Sending"
    submitBtn.textContent = "Sending...";
    submitBtn.style.pointerEvents = "none";
    submitBtn.style.opacity = "0.8";

    // Simulate form submission (e.g., to EmailJS or Formspree)
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      // Match the success color to your new secondary blue or a soft green
      submitBtn.style.background = "linear-gradient(135deg, #89c4d1, #5ba4b5)"; 
      submitBtn.style.opacity = "1";
      
      this.reset();
      
      // Revert button back to original state after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.pointerEvents = "auto";
        submitBtn.style.background = ""; // Reverts to CSS primary gradient
      }, 3000);
    }, 1500);
  });
}

/**
 * 5. SMOOTH SCROLL OFFSET FIX
 * Corrects the scroll position so the sticky header doesn't cover section titles
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      
      // Calculate header height dynamically
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});
