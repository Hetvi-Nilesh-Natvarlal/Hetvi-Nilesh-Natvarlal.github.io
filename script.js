'use strict';

/**
 * 1. NAVBAR & MENU LOGIC
 * Improved to handle the "data-navbar" attribute and body overflow
 */
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  header.classList.toggle("nav-active");
  navToggleBtn.classList.toggle("active");
  // Optional: Prevent body scroll when menu is open
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
 * Optimized for the "data-reveal" attributes in the new HTML
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(element => revealObserver.observe(element));

/**
 * 4. CONTACT FORM HANDLING
 * Matches the ".btn" inside the new form structure
 */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector(".btn");
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = "Sending...";
    submitBtn.style.pointerEvents = "none";

    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.backgroundColor = "#b8d8e0"; // Soft pastel blue success color
      this.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.pointerEvents = "auto";
        submitBtn.style.backgroundColor = ""; // Reset to CSS default
      }, 3000);
    }, 1500);
  });
}

/**
 * 5. SMOOTH SCROLL OFFSET FIX
 * Important: Subtracts header height so sections aren't cut off at the top
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});
