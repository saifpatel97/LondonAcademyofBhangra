// Hamburger Menu Functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle("is-active");
    navLinks.classList.toggle("active");
    body.classList.toggle("no-scroll");
}

hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        if (navLinks.classList.contains("active")) toggleMenu();
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", toggleMenu);
});