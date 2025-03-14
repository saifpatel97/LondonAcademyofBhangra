// Hamburger Menu Functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;
const logo = document.querySelector(".logo");

function toggleMenu() {
    hamburger.classList.toggle("is-active");
    navLinks.classList.toggle("active");
    body.classList.toggle("no-scroll");
}

// Add mobile social icons to nav-links when in mobile view
function addMobileSocialIcons() {
    if (!document.querySelector('.mobile-social-icons')) {
        const mobileIcons = document.createElement('div');
        mobileIcons.className = 'mobile-social-icons';
        mobileIcons.innerHTML = `
            <a href="https://www.instagram.com/londonacademyofbhangra/"><i class="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@londonacademyofbhangraa"><i class="fab fa-tiktok"></i></a>
        `;
        navLinks.appendChild(mobileIcons);
    }
}

// Initialize mobile menu
function initializeMobileMenu() {
    addMobileSocialIcons();
    
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        }
    });

    // Close menu when clicking nav links
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        });
    });
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Reset mobile menu state when returning to desktop view
        if (navLinks.classList.contains("active")) {
            toggleMenu();
        }
    }
});
