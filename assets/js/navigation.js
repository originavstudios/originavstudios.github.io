function initNavigation() {
    const dropdowns = document.querySelectorAll(".dropdown");
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (!navToggle || !mainNav) {
        console.warn("navigation: navToggle or mainNav is missing", { navToggle, mainNav });
        return;
    }

    dropdowns.forEach(drop => {
        const openMenu = () => {
            drop.classList.add("open");
        };

        const closeMenu = () => {
            drop.classList.remove("open");
        };

        drop.addEventListener("mouseenter", openMenu);
        drop.addEventListener("mouseleave", closeMenu);

        const submenu = drop.querySelector(".dropdown-menu");
        if (submenu) {
            submenu.addEventListener("mouseenter", openMenu);
            submenu.addEventListener("mouseleave", closeMenu);
        }

        const link = drop.querySelector(":scope > a");
        if (link) {
            link.addEventListener("click", event => {
                if (window.matchMedia("(max-width: 768px)").matches) {
                    // In mobile mode, parent item should open submenu and not navigate away
                    if (drop.querySelector(".dropdown-menu")) {
                        event.preventDefault();
                        drop.classList.toggle("open");
                        return;
                    }
                }

                // allow default behavior for non-dropdown links
            });
        }
    });

    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        mainNav.classList.toggle("open", isOpen);
    });

    document.addEventListener("click", event => {
        if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
            mainNav.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            mainNav.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

// Initialize only when header has been inserted into the DOM
window.addEventListener("headerLoaded", () => {
    initNavigation();
});
