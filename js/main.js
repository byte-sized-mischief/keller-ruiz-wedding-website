// Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Modal functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Event listeners for close buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    // Navigation toggle functionality
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navLinks.classList.contains('active').toString());
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Carousel Implementation
    const carousel = document.querySelector('.engagement-carousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        let currentIndex = 0;
        let isAutoPlaying = true;
        let autoPlayInterval;

        function moveToSlide(index) {
            if (container) {
                container.style.transform = `translateX(-${index * 100}%)`;
                currentIndex = index;
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(currentIndex);
        }

        function startAutoPlay() {
            if (!isAutoPlaying) {
                isAutoPlaying = true;
                autoPlayInterval = setInterval(nextSlide, 5000);
            }
        }

        function stopAutoPlay() {
            if (isAutoPlaying) {
                isAutoPlaying = false;
                clearInterval(autoPlayInterval);
            }
        }

        // Event Listeners
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
            });
        }

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Start autoplay
        startAutoPlay();
    }

    // Initialize RSVP form if it exists
    if (typeof RSVPForm !== 'undefined') {
        rsvpFormInstance = new RSVPForm();
    }

    // Section visibility animation
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation || 'fadeInLeft';
                element.classList.add('animated', animation);
            }
        });
    }, {
        threshold: 0.25
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.wp1, .wp2, .wp3, .wp4, .wp5, .wp6, .wp7, .wp8, .wp9').forEach(element => {
        animationObserver.observe(element);
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            nav?.classList.add('fixed-nav');
        } else {
            nav?.classList.remove('fixed-nav');
        }

        if (header) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('nav-up');
            } else {
                header.classList.remove('nav-up');
            }
        }
        
        lastScroll = currentScroll;
    });

    // Prefill Invite Code from URL parameter and make it readonly
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invitecode');
    const inviteInput = document.getElementById('InviteCode');
    if (inviteInput) {
        if (inviteCode) {
            inviteInput.value = inviteCode;
            inviteInput.readOnly = true;
        } else {
            inviteInput.readOnly = false;
        }
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Handle form submission (to be implemented)
const rsvpForm = document.querySelector('#rsvp form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // RSVP form handling will be implemented later
        console.log('RSVP form submitted - implementation pending');
    });
}

// Add loading="lazy" to all images for better performance
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleReducedMotion() {
    document.body.classList.toggle('reduce-motion', prefersReducedMotion.matches);
}

prefersReducedMotion.addEventListener('change', handleReducedMotion);
handleReducedMotion();

// Future livestream functionality placeholder
const setupLivestream = () => {
    // This will be implemented when livestream feature is added
    console.log('Livestream setup - implementation pending');
};

// RSVP Form functionality
class RSVPForm {
    constructor() {
        this.form = document.getElementById('rsvpForm');
        this.toggleButton = document.querySelector('.rsvp-toggle');
        this.messageDiv = this.form ? this.form.querySelector('.form-message') : null;
        if (this.form && this.toggleButton && this.messageDiv) {
            this.initForm();
            this.checkInviteCode();
        }
    }
    
    checkInviteCode() {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const inviteCode = urlParams.get('code');
        const submitted = urlParams.get('submitted');
        
        if (submitted === 'true') {
            // Show success message if form was submitted
            this.showMessage('Thank you for your RSVP! We look forward to celebrating with you.', 'success');
            // Remove the submitted parameter from URL
            const newUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, '', newUrl);
        }
        
        if (inviteCode) {
            // Auto-fill the invite code
            const inviteInput = this.form.querySelector('#InviteCode');
            if (inviteInput) {
                inviteInput.value = inviteCode;
                
                // If we have an invite code, automatically show the form
                this.form.classList.remove('collapsed');
                this.toggleButton.classList.add('hidden');
                
                // Scroll to the form
                setTimeout(() => {
                    document.getElementById('rsvp').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1000); // Wait for page load
            }
        }
    }
    
    initForm() {
        // Toggle form visibility
        this.toggleButton.addEventListener('click', () => {
            // Toggle the collapsed class
            this.form.classList.toggle('collapsed');
            
            // Toggle button visibility
            this.toggleButton.classList.toggle('hidden');
            
            // If form is expanded, scroll it into view and focus first input
            if (!this.form.classList.contains('collapsed')) {
                this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    this.form.querySelector('input').focus();
                }, 500);
            }
        });
        
        // Add form validation
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add input validation
        this.addInputValidation();
    }
    
    addInputValidation() {
        // Add validation for party size and names
        const partySizeInput = this.form.querySelector('#PartySize');
        const partyNamesInput = this.form.querySelector('#Party');
        
        if (partySizeInput && partyNamesInput) {
            const validateParty = () => {
                const partySize = parseInt(partySizeInput.value) || 0;
                const partyNames = partyNamesInput.value.split('\n').filter(name => name.trim()).length;
                
                if (partySize > 0 && partyNames !== partySize) {
                    partyNamesInput.setCustomValidity(`Please list exactly ${partySize} names, one per line.`);
                } else {
                    partyNamesInput.setCustomValidity('');
                }
            };
            
            partySizeInput.addEventListener('input', validateParty);
            partyNamesInput.addEventListener('input', validateParty);
        }
        
        // Phone number validation
        const phoneInput = this.form.querySelector('#Phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', () => {
                const phoneRegex = /^\+?[\d\s-()]{10,}$/;
                const strippedPhone = phoneInput.value.replace(/[\s()-]/g, '');
                if (!phoneRegex.test(phoneInput.value) || strippedPhone.length < 10) {
                    phoneInput.setCustomValidity('Please enter a valid phone number with area code');
                } else {
                    phoneInput.setCustomValidity('');
                }
            });
        }
    }
    
    handleSubmit(e) {
        // Form will be handled by Formspree
        // We just need to validate the form
        if (!this.form.checkValidity()) {
            e.preventDefault();
            this.showMessage('Please fill in all required fields correctly.', 'error');
        }
    }
    
    showMessage(message, type) {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `form-message ${type}`;
        this.messageDiv.style.display = 'block';
        
        // Scroll message into view if it's not visible
        if (type === 'error') {
            this.messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

/********************** Collapsible Sections ***********************/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sections as expanded
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id !== 'top') { // Don't collapse hero section
            const header = section.querySelector('.section-header');
            const content = section.querySelector('.section-content');
            
            // Add click handler to section headers
            header.addEventListener('click', () => {
                // Close all other sections first
                sections.forEach(otherSection => {
                    if (otherSection !== section && otherSection.id !== 'top') {
                        otherSection.classList.add('collapsed');
                    }
                });
                
                // Toggle current section
                section.classList.toggle('collapsed');
                
                // If section is now expanded, scroll it into view
                if (!section.classList.contains('collapsed')) {
                    const headerOffset = header.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: headerOffset - 100, // Adjust offset as needed
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Open section if it's targeted by URL hash
    function openTargetedSection() {
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection && targetSection.classList.contains('section')) {
                // Close all sections
                sections.forEach(section => {
                    if (section.id !== 'top') {
                        section.classList.add('collapsed');
                    }
                });
                // Open target section
                targetSection.classList.remove('collapsed');
                // Scroll to it
                setTimeout(() => {
                    const headerOffset = targetSection.querySelector('.section-header').getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: headerOffset - 100,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    // Handle initial load and hash changes
    openTargetedSection();
    window.addEventListener('hashchange', openTargetedSection);
});

// --- Sparkle/Fizzy Effect for Buttons ---
function createSparkles(button) {
    // Remove any existing sparkles
    button.querySelectorAll('.fizzy-sparkle').forEach(e => e.remove());
    // Create 24 sparkles
    for (let i = 0; i < 24; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'fizzy-sparkle';
        sparkle.style.setProperty('--i', i);
        button.appendChild(sparkle);
    }
}

function triggerSparkle(button) {
    button.classList.remove('fizzy-animate');
    // Force reflow to restart animation
    void button.offsetWidth;
    button.classList.add('fizzy-animate');
}

// Initialize sparkles for all buttons
function initFizzyButtons() {
    document.querySelectorAll('.button').forEach(button => {
        createSparkles(button);
        button.addEventListener('mouseenter', () => triggerSparkle(button));
        button.addEventListener('click', () => triggerSparkle(button));
    });
}

initFizzyButtons();
// If buttons are dynamically added, you may want to call initFizzyButtons() again. 