'use strict';

/**
 * Navbar Toggle Logic
 */
const header = document.querySelector(".header"); // Changed to class selector for reliability
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

// Toggle mobile menu
if (navToggleBtn) {
  navToggleBtn.addEventListener("click", function () {
    header.classList.toggle("nav-active");
    this.classList.toggle("active");
  });
}

// Close menu when a link is clicked
navbarLinks.forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-active");
    navToggleBtn.classList.remove("active");
  });
});

/**
 * Scroll Reveal
 */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".section, .portfolio-card, .skills-item")
  .forEach(el => observer.observe(el));

/**
 * Sticky Header & Back to Top
 */
const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});

document.querySelectorAll(".section, .portfolio-card, .skills-item")
  .forEach(el => observer.observe(el));



/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

