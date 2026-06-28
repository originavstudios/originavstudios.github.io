function initNavigation() {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".nav-toggle");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!nav || !toggle) {
    return;
  }

  function closeMobileNav() {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    const expanded = nav.classList.contains("open");
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  dropdowns.forEach(drop => {
    const trigger = drop.querySelector("a");
    if (!trigger) return;

    trigger.addEventListener("click", event => {
      if (window.innerWidth <= 900) {
        event.preventDefault();
        drop.classList.toggle("open");
      }
    });

    drop.addEventListener("mouseenter", () => {
      if (window.innerWidth > 900) {
        drop.classList.add("open");
      }
    });

    drop.addEventListener("mouseleave", () => {
      if (window.innerWidth > 900) {
        drop.classList.remove("open");
      }
    });
  });

  document.addEventListener("click", event => {
    const target = event.target;
    if (window.innerWidth <= 900) {
      if (!nav.contains(target) && !toggle.contains(target)) {
        closeMobileNav();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileNav();
      dropdowns.forEach(drop => drop.classList.remove("open"));
    }
  });
}

document.addEventListener("templatesLoaded", initNavigation);
