/* Small, dependency-free interactions for Tibetan Mastiff */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const toTop = document.getElementById("toTop");
  const year = document.getElementById("year");

  // Automatically update copyright year
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation menu
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = open ? "×" : "☰";
    });

    // Close menu after clicking a navigation link
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Scroll reveal animations
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Back-to-top button
  const updateTopButton = () => {
    if (toTop) {
      toTop.classList.toggle("visible", window.scrollY > 500);
    }
  };

  window.addEventListener("scroll", updateTopButton, {
    passive: true
  });

  updateTopButton();

  toTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});