'use strict';

/**
 * 1. Selecting Elements (The basics)
 */
const header = document.querySelector("[data-header]"); // Use data-attrs for JS
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const backTopBtn = document.querySelector("[data-back-to-top]");

/**
 * 2. Mobile Menu Logic
 * Added a check to prevent errors if elements don't exist
 */
if (navToggleBtn && header) {
  navToggleBtn.addEventListener("click", () => {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

// Automatically close menu when clicking a link (Great for One-Page sites)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-active");
  });
});

/**
 * 3. Header & Back-to-Top Scroll Logic
 * Separated "active" (Sticky) from "nav-active" (Menu open)
 */
const handleScroll = () => {
  const isScrolled = window.scrollY >= 100;
  
  header?.classList.toggle("active", isScrolled);
  backTopBtn?.classList.toggle("active", isScrolled);
};

window.addEventListener("scroll", handleScroll);

/**
 * 4. Improved Reveal-on-Scroll
 * Instead of hiding things in JS, we just add a class.
 */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      // Once revealed, stop watching to save browser memory
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const revealElements = document.querySelectorAll("[data-reveal]");
revealElements.forEach(el => revealObserver.observe(el));
