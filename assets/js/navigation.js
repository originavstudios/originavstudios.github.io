document.addEventListener("DOMContentLoaded", () => {

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(drop => {

        drop.addEventListener("mouseenter", () => {
        drop.classList.add("open");
        });

        drop.addEventListener("mouseleave", () => {
        drop.classList.remove("open");
        });
    });
});