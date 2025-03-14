// Hamburger Menu Functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle("is-active");
    navLinks.classList.toggle("active");
    body.classList.toggle("no-scroll");
}

// Add mobile social icons to nav-links when in mobile view
function setupMobileMenu() {
    // Create mobile social icons if they don't exist
    if (!document.querySelector('.nav-links .mobile-social-icons')) {
        const mobileIcons = document.createElement('div');
        mobileIcons.className = 'mobile-social-icons';
        mobileIcons.innerHTML = `
            <a href="https://www.instagram.com/londonacademyofbhangra/"><i class="fab fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@londonacademyofbhangra"><i class="fab fa-tiktok"></i></a>
        `;
        navLinks.appendChild(mobileIcons);
    }
    
    // Add mobile footer icons if they don't exist
    if (window.innerWidth <= 768) {
        const footer = document.querySelector('footer');
        if (footer && !document.querySelector('.mobile-footer-icons')) {
            const mobileFooterIcons = document.createElement('div');
            mobileFooterIcons.className = 'mobile-footer-icons';
            mobileFooterIcons.innerHTML = `
                <div class="social-links">
                    <a href="https://www.instagram.com/londonacademyofbhangra/"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@londonacademyofbhangra"><i class="fab fa-tiktok"></i></a>
                </div>
                <p>Created by the Goat</p>
            `;
            footer.appendChild(mobileFooterIcons);
        }
    }
}

// Initialize mobile menu
function initializeMobileMenu() {
    // Setup mobile menu immediately
    setupMobileMenu();
    
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

    // Add timetable filter functionality if on timetable page
    if (document.querySelector('.timetable-filters')) {
        setupTimetableFilters();
    }
}

// Timetable filter functionality
function setupTimetableFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const classItems = document.querySelectorAll('.class-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Show/hide class items based on filter
            classItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
});

// Handle window resize
window.addEventListener('resize', () => {
    setupMobileMenu();
    
    if (window.innerWidth > 768) {
        // Reset mobile menu state when returning to desktop view
        if (navLinks.classList.contains("active")) {
            toggleMenu();
        }
    }
});
