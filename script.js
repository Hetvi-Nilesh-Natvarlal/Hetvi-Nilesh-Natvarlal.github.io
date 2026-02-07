'use strict';

const header = document.querySelector(".header");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

// 1. Mobile Menu Toggle
if (navToggleBtn) {
  navToggleBtn.addEventListener("click", () => {
    header.classList.toggle("nav-active");
  });
}

// 2. Close menu on link click
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-active");
  });
});

// 3. Sticky Header and Back to Top
const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});

// 4. Simple Reveal
const sections = document.querySelectorAll(".section, .portfolio-card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.opacity = "1";
  });
}, { threshold: 0.1 });

sections.forEach(s => {
  s.style.opacity = "0";
  s.style.transition = "opacity 1s ease";
  observer.observe(s);
});
