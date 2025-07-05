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
    // RSVP and volunteer form JS removed; now handled by Google Form embeds.

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

// RSVP and volunteer form JS removed; now handled by Google Form embeds. 