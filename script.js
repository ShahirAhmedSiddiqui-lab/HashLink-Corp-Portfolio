// Mobile Menu Toggle Functionality with smooth animations
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.animation = 'slideInLeft 0.3s ease-out';
            } else {
                mobileMenu.style.animation = 'slideInLeft 0.3s ease-out reverse';
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            }
        });

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.style.animation = 'slideInLeft 0.3s ease-out reverse';
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.animation = 'slideInLeft 0.3s ease-out reverse';
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
            }
        });
    }
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navigation highlight based on current page
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('text-primary', 'font-bold');
            link.classList.remove('text-on-surface-variant');
        } else {
            link.classList.remove('text-primary', 'font-bold');
            link.classList.add('text-on-surface-variant');
        }
    });
}

// Call on page load
highlightCurrentPage();

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('[data-animate]').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Form validation helper
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateURL(url) {
    if (!url) return true; // Optional field
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Add real-time validation to form fields
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const urlInputs = document.querySelectorAll('input[type="url"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('error');
                this.classList.remove('success');
            } else if (this.value) {
                this.classList.add('success');
                this.classList.remove('error');
            }
        });
    });
    
    urlInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateURL(this.value)) {
                this.classList.add('error');
                this.classList.remove('success');
            } else if (this.value) {
                this.classList.add('success');
                this.classList.remove('error');
            }
        });
    });
});

// Button ripple effect
document.querySelectorAll('button, a.button').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    const mobileMenu = document.getElementById('mobileMenu');
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// Scroll to top button functionality
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';
    scrollButton.className = 'fixed bottom-8 right-8 bg-primary-container text-on-primary-container p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-40 hover:opacity-100';
    scrollButton.id = 'scrollToTop';
    scrollButton.style.pointerEvents = 'none';
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.pointerEvents = 'auto';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.pointerEvents = 'none';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTop();

// Prevent form submission if there are validation errors
document.addEventListener('submit', function(e) {
    const form = e.target;
    const requiredFields = form.querySelectorAll('[required]');
    
    let hasErrors = false;
    requiredFields.forEach(field => {
        if (!field.value || field.classList.contains('error')) {
            hasErrors = true;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    if (hasErrors) {
        e.preventDefault();
        console.warn('Form has validation errors');
    }
}, true);

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

// Session storage for form data persistence
function saveFormData(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('change', function() {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            sessionStorage.setItem(formId + '_data', JSON.stringify(data));
        });
        
        // Load saved data
        const savedData = sessionStorage.getItem(formId + '_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        }
    }
}

// Save form data on load
document.addEventListener('DOMContentLoaded', function() {
    saveFormData('auditForm');
});

// Add focus management for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        e.target.style.outline = '2px solid #dbfcff';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        e.target.style.outline = 'none';
    }
});

console.log('HashLink Corp Portfolio - Scripts loaded successfully');
