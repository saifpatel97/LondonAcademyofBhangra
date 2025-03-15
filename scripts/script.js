// Hamburger Menu Functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

console.log("Script loaded"); // Debug log to confirm script is running

// Check if elements exist
console.log("Hamburger element:", hamburger);
console.log("Nav links element:", navLinks);

function toggleMenu() {
    console.log("Toggle menu called"); // Debug log
    hamburger.classList.toggle("is-active");
    navLinks.classList.toggle("active");
    body.classList.toggle("no-scroll");
    
    // Ensure mobile social icons visibility when menu is active
    const mobileIcons = navLinks.querySelector('.mobile-social-icons');
    if (mobileIcons) {
        mobileIcons.style.opacity = navLinks.classList.contains('active') ? '1' : '0';
    }
}

// Add mobile social icons to nav-links when in mobile view
function setupMobileMenu() {
    console.log("Setting up mobile menu"); // Debug log
    
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
                    <p>London Academy of Bhangra | 2025</p>
                </div>
            `;
            footer.appendChild(mobileFooterIcons);
        }
    }
}

// Initialize mobile menu
function initializeMobileMenu() {
    console.log("Initializing mobile menu"); // Debug log
    
    // Setup mobile menu immediately
    setupMobileMenu();
    
    // Handle hamburger menu click
    if (hamburger) {
        hamburger.addEventListener("click", (e) => {
            console.log("Hamburger clicked"); // Debug log
            e.stopPropagation();
            toggleMenu();
        });
    } else {
        console.error("Hamburger element not found");
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navLinks && hamburger && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        }
    });

    // Handle navigation links
    if (navLinks) {
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("active")) {
                    toggleMenu();
                }
            });
        });
    }

    // Handle logo click for home navigation
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                e.preventDefault(); // Prevent navigation if already on home page
            }
        });
    }

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
    console.log("DOM fully loaded"); // Debug log
    initializeMobileMenu();
});

// Handle window resize
window.addEventListener('resize', () => {
    setupMobileMenu();
    
    if (window.innerWidth > 768) {
        // Reset mobile menu state when returning to desktop view
        if (navLinks && navLinks.classList.contains("active")) {
            toggleMenu();
        }
    }
});

// SEO Enhancements - Add at the end of your script.js file

// Add structured data dynamically for better SEO
function addStructuredDataForPage() {
    // Only add if not already present
    if (document.querySelector('script[type="application/ld+json"]')) return;
    
    // Determine current page
    const currentPath = window.location.pathname;
    
    // Create structured data based on page
    let structuredData = {};
    
    // Base organization data
    const orgData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "London Academy of Bhangra",
        "url": "https://www.londonacademyofbhangra.com",
        "logo": "https://www.londonacademyofbhangra.com/images/lab-logo.png",
        "sameAs": [
            "https://www.instagram.com/londonacademyofbhangra/",
            "https://www.tiktok.com/@londonacademyofbhangra"
        ]
    };
    
    // Add page-specific structured data
    if (currentPath.includes('timetable')) {
        structuredData = {
            "@context": "https://schema.org",
            "@type": "DanceSchool",
            ...orgData,
            "description": "London's premier Bhangra dance academy offering classes for all levels",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gidea Park",
                "postalCode": "RM2 6HJ",
                "addressRegion": "London",
                "addressCountry": "UK"
            }
        };
    } else if (currentPath.includes('events')) {
        structuredData = {
            "@context": "https://schema.org",
            "@type": "EventSeries",
            ...orgData,
            "description": "Bhangra dance events and workshops in London",
            "location": {
                "@type": "Place",
                "name": "The Royal Liberty School",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Gidea Park",
                    "postalCode": "RM2 6HJ",
                    "addressRegion": "London",
                    "addressCountry": "UK"
                }
            }
        };
    } else {
        // Default to organization data for other pages
        structuredData = orgData;
    }
    
    // Create and append the script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.body.appendChild(script);
}

// Track outbound links for analytics
function trackOutboundLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.addEventListener('click', function() {
                // If you have Google Analytics, you can track outbound links
                if (typeof ga === 'function') {
                    ga('send', 'event', 'outbound', 'click', link.href);
                }
            });
        }
    });
}

// Add lazy loading to images for better performance
function addLazyLoadingToImages() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

// Execute SEO enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add SEO enhancements
    addStructuredDataForPage();
    trackOutboundLinks();
    addLazyLoadingToImages();
});

// Booking Form Functionality
function setupBookingForm() {
    console.log("Setting up booking form");
    
    // Get all booking buttons
    const bookButtons = document.querySelectorAll('.schedule-button, .price-button');
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('bookingForm');
    
    if (!modal || !form) {
        console.error("Booking modal or form not found");
        return;
    }
    
    // Open modal when booking buttons are clicked
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Book button clicked");
            
            // Pre-fill class type if available from the button context
            const classItem = button.closest('.class-item');
            if (classItem) {
                const className = classItem.querySelector('.class-name').textContent;
                const classTypeSelect = document.getElementById('classType');
                
                // Find the closest option match
                for (let i = 0; i < classTypeSelect.options.length; i++) {
                    if (className.includes(classTypeSelect.options[i].value)) {
                        classTypeSelect.selectedIndex = i;
                        break;
                    }
                }
                
                // Pre-fill date if available
                const classTime = classItem.querySelector('.class-time').textContent;
                if (classTime.includes("Thursday")) {
                    // Set to next Thursday
                    const today = new Date();
                    const nextThursday = new Date();
                    nextThursday.setDate(today.getDate() + ((4 + 7 - today.getDay()) % 7));
                    
                    const dateInput = document.getElementById('classDate');
                    dateInput.valueAsDate = nextThursday;
                }
            }
            
            // Show modal
            modal.classList.add('show');
            document.body.classList.add('no-scroll');
        });
    });
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', (e) => {
        // FormSubmit.co will handle the actual submission
        console.log("Form submitted");
    });
}

// Call the setup function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization
    initializeMobileMenu();
    
    // Add SEO enhancements
    addStructuredDataForPage();
    trackOutboundLinks();
    addLazyLoadingToImages();
    
    // Setup booking form
    setupBookingForm();
});

