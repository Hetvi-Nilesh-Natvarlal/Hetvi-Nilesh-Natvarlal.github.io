'use strict';

/**
 * 1. NAVBAR & MENU LOGIC
 * Handles the mobile menu toggle and clicking on links
 */
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

if (navToggleBtn) {
  navToggleBtn.addEventListener("click", function () {
    header.classList.toggle("nav-active");
    this.classList.toggle("active");
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-active");
    navToggleBtn?.classList.remove("active");
  });
});

/**
 * 2. STICKY HEADER & BACK TO TOP
 * Changes header state and shows "Back to Top" button after 100px scroll
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
 * Uses IntersectionObserver for better performance than the 'scroll' event
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      // Stop observing once revealed to save resources
      observer.unobserve(entry.target);
    }
  });
}

const revealObserver = new IntersectionObserver(revealCallback, {
  threshold: 0.15
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

/**
 * 4. CONTACT FORM HANDLING
 * Basic logic to handle form submission
 */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Get form data (you can connect this to a service like EmailJS or Formspree)
    const formData = new FormData(this);
    console.log("Form Submitted:", Object.fromEntries(formData));

    // Simple success feedback
    const submitBtn = this.querySelector(".btn");
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = "Sending...";
    submitBtn.style.pointerEvents = "none";

    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      this.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.pointerEvents = "auto";
      }, 3000);
    }, 1500);
  });
}

/**
 * 5. SMOOTH SCROLL OFFSET
 * Ensures when you click a nav link, the header doesn't cover the section title
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});
