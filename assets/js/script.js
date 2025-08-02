/* =====================================================
   GABRIEL RODRIGUEZ TORRES - PORTFOLIO JAVASCRIPT
   Version fusionnée complète avec toutes les fonctionnalités
   ===================================================== */

// =====================================================
// 1. GLOBAL VARIABLES & CONSTANTS
// =====================================================
let DOM = {}; // Initialisé vide, sera rempli quand le DOM sera prêt

// Dish data for modal - VERSION COMPLÈTE FUSIONNÉE
const dishes = [
    {
        name: "Pacific Oyster Elevation",
        category: "Signature Creation",
        tags: ["Author's Creation", "Baja California Sur", "Molecular Technique"],
        description: "Pristine Baja California Sur oyster enhanced with house-made celery oil infusion, cultured sour cream with active probiotics, and balsamic vinegar caviar through calcium-sodium alginate spherification. This creation represents the intersection of Mexican coastal purity and molecular gastronomy innovation.",
        philosophy: "A testament to the philosophy that luxury lies in simplicity perfected through technique—where the ocean's essence meets scientific precision.",
        credit: "Personal creation"
    },
    {
        name: "Cured Mackerel Tartare",
        category: "Signature Creation",
        tags: ["Author's Creation", "Mexico City"],
        description: "Premium mackerel cured through traditional techniques, enhanced with house-made truffle mayonnaise infusion, vibrant mango gel through precision spherification, fresh dill microgreens, and activated corn ash dust. This creation represents the marriage of Japanese curing methods with Mexican coastal ingredients and contemporary molecular techniques.",
        philosophy: "Transforming humble coastal catch into luxury through technique—where traditional preservation meets modern culinary artistry.",
        credit: "Personal creation"
    },
    {
        name: "Crescentina Revolution",
        category: "Signature Creation",
        tags: ["Author's Creation", "Mexico City"],
        description: "Traditional Modenese crescentina reimagined with chocolate-infused clam velouté, Ossetra caviar pearls, and aged smoked provolone DOP. The crescentina is elevated through 48-hour fermentation and finished with molecular chocolate foam that captures the essence of oceanic umami. A bold fusion of Italian tradition with contemporary Mexican innovation.",
        philosophy: "Pushing boundaries where sweet meets savory—proving that true innovation respects tradition while fearlessly exploring new territories.",
        credit: "Personal creation"
    },
    {
        name: "Mediterranean Focaccia Experience",
        category: "Signature Creation",
        tags: ["Signature Creation", "Mexico City", "Molecular Gastronomy"],
        description: "72-hour fermented sourdough focaccia with sea salt crystallization, topped with Veracruz clam velouté infused with saffron, red wine vinegar caviar pearls, first-press Arbequina olive oil, and hand-foraged borage flowers. A celebration of Mediterranean coastal cuisine through contemporary technique.",
        philosophy: "Elevating humble bread to haute cuisine through fermentation science, molecular transformation, and the poetry of seasonal ingredients.",
        credit: "Personal creation"
    },
    {
        name: "Zero-Waste Nopal Symphony",
        category: "Collaboration",
        tags: ["El Balcón del Zócalo", "Cold Line", "Sustainability Focus"],
        description: "Revolutionary sustainable creation featuring grilled nopal enhanced with cricket flour protein, harissa crafted from citrus peel waste, house-made ricotta from whey recovery, totoaba tonnato sauce, garum fermented from fish trim, tzatziki utilizing daily vegetable scraps, and crispy potato skin chips. Executed under Chef Patricia Quintana's vision.",
        philosophy: "Demonstrating that sustainability and luxury are not mutually exclusive—where zero-waste philosophy meets Michelin-level execution.",
        credit: "Created for Chef Patricia Quintana at El Balcón del Zócalo"
    },
    {
        name: "Churro Deconstruction",
        category: "Collaboration",
        tags: ["Augurio, Puebla", "Cold Line", "Pastry Innovation"],
        description: "Traditional Mexican churro transformed through contemporary pastry technique. Featuring artisanal churro with precise temperature control, hoja santa aromatic infusion, and molecular tomatillo-Meyer lemon gel. Cinnamon dust applied tableside with liquid nitrogen theatricality. Created for Chef Angel Vázquez.",
        philosophy: "Reimagining childhood memories through the lens of modern pastry—where nostalgia meets molecular transformation.",
        credit: "Created for Chef Angel Vázquez at Augurio, Puebla"
    },
    {
        name: "Premium Baja California Oyster",
        category: "Collaboration",
        tags: ["FISM, Baja California", "Ocean Fresh", "Authentic Cuisine"],
        description: "Exceptional Baja California oysters representing FISM's dedication to premium, ocean-fresh ingredients sourced from our pristine Pacific waters.",
        philosophy: "Authentic coastal cuisine celebrating the natural excellence and marine heritage of Baja California's unique terroir.",
        credit: "Experience crafted at FISM Restaurant, Baja California"
    },
    {
        name: "Cacio e Pepe Perfection",
        category: "Collaboration",
        tags: ["Feroce, Mexico City", "Hot Line", "Roman Classic"],
        description: "The eternal Roman dish executed with unwavering precision. Fresh tonnarelli made daily, Pecorino Romano DOP aged 18 months, Tellicherry black pepper toasted à la minute. The mantecatura technique creates the perfect emulsion—silky, glossy, sublime. A study in restraint and technique.",
        philosophy: "Proving that true luxury lies in perfect execution of simplicity—where three ingredients become transcendent through technique.",
        credit: "Executed under Chef Mauro Chiecchio at Feroce, Mexico City"
    },
    {
        name: "Zéfiro Signature Gnocchi",
        category: "Collaboration",
        tags: ["Zéfiro, Universidad del Claustro de Sor Juana", "University Restaurant", "Italian Technique"],
        description: "Hand-crafted potato gnocchi served in a rich mushroom reduction with wild forest mushrooms, finished with fresh microgreens and edible flowers. The dish showcases classical Italian technique elevated through modern presentation and local ingredient integration.",
        philosophy: "Bridging culinary education with professional execution—where academic theory meets practical artistry in the university kitchen.",
        credit: "Created at Zéfiro, Universidad del Claustro de Sor Juana, Mexico City"
    }
];

// Gallery state
let currentModalIndex = 0;
let isModalOpen = false;

// =====================================================
// 2. UTILITY FUNCTIONS
// =====================================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get current section in viewport
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 100;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    return currentSection;
}

// =====================================================
// 3. NAVIGATION FUNCTIONALITY
// =====================================================

// Sticky navigation on scroll
const handleNavScroll = throttle(() => {
    if (DOM.navbar) {
        if (window.scrollY > 50) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
    }

    // Update active navigation state
    updateActiveNavigation();
}, 16);

// Update active navigation state
function updateActiveNavigation() {
    const currentSection = getCurrentSection();

    if (DOM.navLinks) {
        DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);

            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    }
}

// Smooth scroll to section
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;

    const offset = 80; // Navigation height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// =====================================================
// 4. MOBILE MENU TOGGLE
// =====================================================
function initMobileMenu() {
    if (DOM.menuToggle && DOM.navMenu) {
        DOM.menuToggle.addEventListener('click', () => {
            DOM.navMenu.classList.toggle('active');
            DOM.menuToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = DOM.navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu on window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && DOM.navMenu && DOM.menuToggle) {
            DOM.navMenu.classList.remove('active');
            DOM.menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250));
}

// =====================================================
// 5. PROFILE PHOTO TOGGLE
// =====================================================
function initProfileToggle() {
    if (DOM.heroProfile) {
        // Toggle profile photo on click (mobile friendly)
        DOM.heroProfile.addEventListener('click', () => {
            const uniformImg = DOM.heroProfile.querySelector('.profile-img.uniform');
            const fishImg = DOM.heroProfile.querySelector('.profile-img.fish');

            if (uniformImg && fishImg) {
                if (uniformImg.style.opacity === '0' || uniformImg.style.opacity === '') {
                    uniformImg.style.opacity = '1';
                    fishImg.style.opacity = '0';
                } else {
                    uniformImg.style.opacity = '0';
                    fishImg.style.opacity = '1';
                }
            }
        });
    }
}

// =====================================================
// 6. INTERSECTION OBSERVER FOR ANIMATIONS
// =====================================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    if (DOM.fadeElements) {
        DOM.fadeElements.forEach(el => fadeInObserver.observe(el));
    }

    // Also observe dish cards for stagger animation
    if (DOM.dishCards) {
        DOM.dishCards.forEach(card => fadeInObserver.observe(card));
    }
}

// =====================================================
// 7. GALLERY FILTER FUNCTIONALITY
// =====================================================
function initGalleryFilters() {
    if (DOM.filterButtons) {
        DOM.filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter dishes with animation
                if (DOM.dishCards) {
                    DOM.dishCards.forEach(card => {
                        const category = card.getAttribute('data-category');

                        if (filter === 'all' || category === filter) {
                            card.style.display = 'block';
                            // Force reflow for animation
                            void card.offsetWidth;
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });
    }
}

// =====================================================
// 8. MODAL FUNCTIONALITY COMPLÈTE
// =====================================================

// Open modal
function openModal(index) {
    currentModalIndex = index;
    isModalOpen = true;

    const dish = dishes[index];
    const card = DOM.dishCards[index];
    const imgSrc = card.querySelector('.dish-img').src;

    // Set modal content
    if (DOM.modalImg) {
        DOM.modalImg.src = imgSrc;
        DOM.modalImg.alt = dish.name;
    }

    if (DOM.modalTitle) {
        DOM.modalTitle.textContent = dish.name;
    }

    if (DOM.modalDescription) {
        DOM.modalDescription.textContent = dish.description;
    }

    // Philosophy handling
    if (dish.philosophy && DOM.modalPhilosophy) {
        DOM.modalPhilosophy.textContent = dish.philosophy;
        DOM.modalPhilosophy.style.display = 'block';
    } else if (DOM.modalPhilosophy) {
        DOM.modalPhilosophy.style.display = 'none';
    }

    // Clear and add tags
    if (DOM.modalTags) {
        DOM.modalTags.innerHTML = '';
        dish.tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'modal-tag';
            tagEl.textContent = tag;
            DOM.modalTags.appendChild(tagEl);
        });
    }

    // Show modal
    if (DOM.modal) {
        DOM.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Add keyboard navigation
    document.addEventListener('keydown', handleModalKeyboard);
}

// Close modal
function closeModal() {
    isModalOpen = false;
    if (DOM.modal) {
        DOM.modal.classList.remove('active');
    }
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleModalKeyboard);
}

// Navigate modal images
function navigateModal(direction) {
    const totalDishes = dishes.length;
    currentModalIndex = (currentModalIndex + direction + totalDishes) % totalDishes;
    openModal(currentModalIndex);
}

// Handle keyboard navigation in modal
function handleModalKeyboard(e) {
    if (!isModalOpen) return;

    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            navigateModal(-1);
            break;
        case 'ArrowRight':
            navigateModal(1);
            break;
    }
}

// Modal navigation is now handled through static HTML buttons

// Initialize modal functionality
function initModal() {
    // Add click handlers to dish cards
    if (DOM.dishCards) {
        DOM.dishCards.forEach((card, index) => {
            card.addEventListener('click', () => openModal(index));
        });
    }

    // Close modal handlers
    if (DOM.modalClose) {
        DOM.modalClose.addEventListener('click', closeModal);
    }

    if (DOM.modal) {
        DOM.modal.addEventListener('click', (e) => {
            if (e.target === DOM.modal) closeModal();
        });
    }

    // Navigation button handlers
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateModal(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateModal(1));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isModalOpen) {
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
            if (e.key === 'Escape') closeModal();
        }
    });
}

// =====================================================
// 9. SCROLL INDICATOR
// =====================================================
function initScrollIndicator() {
    if (DOM.scrollIndicator) {
        DOM.scrollIndicator.addEventListener('click', () => {
            smoothScrollTo('#philosophy');
        });
    }
}

// =====================================================
// 10. LAZY LOADING IMAGES
// =====================================================
function initLazyLoading() {
    const imageObserverOptions = {
        threshold: 0,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Load the image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                // Add loaded class for animation
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });

                imageObserver.unobserve(img);
            }
        });
    }, imageObserverOptions);

    // Convert images to lazy loading (except hero images)
    const lazyImages = document.querySelectorAll('.dish-img');

    lazyImages.forEach(img => {
        // Store original src as data-src
        if (!img.closest('.hero')) {
            const src = img.src;
            img.dataset.src = src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            img.style.backgroundColor = '#2a2a2a';
            imageObserver.observe(img);
        }
    });
}

// =====================================================
// 11. NAVIGATION LINKS
// =====================================================
function initNavigationLinks() {
    if (DOM.navLinks) {
        // Navigation link click handler
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                smoothScrollTo(target);

                // Close mobile menu if open
                if (DOM.navMenu) {
                    DOM.navMenu.classList.remove('active');
                }
                if (DOM.menuToggle) {
                    DOM.menuToggle.classList.remove('active');
                }
            });
        });
        
        // Initialize active section indicator
        initActiveSectionIndicator();
    }
}

// Active section indicator on scroll
function initActiveSectionIndicator() {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        rootMargin: '-40% 0px -60% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                updateActiveNavLink(activeId);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    DOM.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// =====================================================
// 12. PERFORMANCE OPTIMIZATIONS
// =====================================================

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/images/hero/gabriel-uniform.jpg',
        'assets/images/hero/gabriel-fish.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Add loading animation
function addLoadingAnimation() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="preloader-text">GRT</div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => preloader.remove(), 600);
        }, 800);
    });
}

// Parallax effect for hero section (desktop only)
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }, 16));
}

// Enhanced hover effects for touch devices
function enhanceTouchHover() {
    let touchTimeout;

    if (DOM.dishCards) {
        DOM.dishCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.classList.add('touch-hover');
                clearTimeout(touchTimeout);
            });

            card.addEventListener('touchend', () => {
                touchTimeout = setTimeout(() => {
                    card.classList.remove('touch-hover');
                }, 500);
            });
        });
    }
}

// Copy email to clipboard
function addEmailCopyFeature() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (!emailLink) return;

    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.textContent;

        navigator.clipboard.writeText(email).then(() => {
            // Show success message
            const tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--gold-primary);
                color: var(--black-primary);
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
                z-index: 9999;
                animation: slideUp 0.3s ease;
            `;

            document.body.appendChild(tooltip);

            setTimeout(() => {
                tooltip.style.animation = 'slideDown 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        });
    });
}

// =====================================================
// 13. DOM INITIALIZATION - POINT CLÉ
// =====================================================
function initializeDOM() {
    // Initialize DOM object when DOM is ready
    DOM = {
        navbar: document.getElementById('navbar'),
        navLinks: document.querySelectorAll('.nav-link'),
        menuToggle: document.getElementById('menu-toggle'),
        navMenu: document.getElementById('nav-menu'),
        heroProfile: document.querySelector('.hero-profile'),
        modal: document.getElementById('modal'),
        modalImg: document.getElementById('modal-img'),
        modalTitle: document.getElementById('modal-title'),
        modalTags: document.getElementById('modal-tags'),
        modalDescription: document.getElementById('modal-description'),
        modalPhilosophy: document.getElementById('modal-philosophy'),
        modalCredit: document.getElementById('modal-credit'),
        modalClose: document.getElementById('modal-close'),
        dishCards: document.querySelectorAll('.dish-card'),
        filterButtons: document.querySelectorAll('.filter-btn'),
        fadeElements: document.querySelectorAll('.fade-in'),
        scrollIndicator: document.querySelector('.scroll-indicator')
    };
}

// =====================================================
// 14. CONTACT FORM FUNCTIONALITY
// =====================================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const bookConsultationBtn = document.getElementById('book-consultation');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Create email body
            const subject = encodeURIComponent('Portfolio Contact Form Submission');
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );
            
            // Open email client
            window.location.href = `mailto:gabriel.rod.tor@gmail.com?subject=${subject}&body=${body}`;
            
            // Optional: Reset form after submission
            setTimeout(() => {
                form.reset();
            }, 1000);
        });
    }
    
    // Book Consultation button - pre-fills subject
    if (bookConsultationBtn) {
        bookConsultationBtn.addEventListener('click', function() {
            // Pre-fill form with consultation subject
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = 'I would like to book a consultation for a private dining experience.\n\nPreferred date: \nNumber of guests: \nOccasion: \nSpecial requirements: ';
                messageField.focus();
                // Scroll to form
                messageField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
}

// =====================================================
// 15. STICKY NAVIGATION
// =====================================================
function initStickyNavigation() {
    if (!DOM.navbar) return;
    
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    const handleScroll = throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > scrollThreshold) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
        
        // Optional: Hide/show navigation on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            // Scrolling down - hide nav
            DOM.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show nav
            DOM.navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, 16);
    
    window.addEventListener('scroll', handleScroll);
}

// =====================================================
// 16. MAIN INITIALIZATION
// =====================================================
function init() {
    console.log('🚀 Initializing Gabriel Rodriguez Torres Portfolio...');

    // Initialize DOM elements first
    initializeDOM();

    // Preload critical images
    preloadImages();

    // Add loading animation
    addLoadingAnimation();

    // Initialize all features
    initNavigationLinks();
    initMobileMenu();
    initProfileToggle();
    initAnimations();
    initGalleryFilters();
    initModal();
    initScrollIndicator();
    initLazyLoading();
    initContactForm();
    initStickyNavigation();

    // Add parallax effect (optional - can be disabled on mobile)
    if (window.innerWidth > 768) {
        addParallaxEffect();
    }

    // Enhance touch interactions
    if ('ontouchstart' in window) {
        enhanceTouchHover();
    }

    // Add email copy feature
    addEmailCopyFeature();

    // Set up scroll listener
    window.addEventListener('scroll', handleNavScroll);

    // Initial navigation state
    updateActiveNavigation();

    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        import('https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js');
    }

    console.log('✅ Portfolio initialization complete!');
}

// =====================================================
// 15. START THE APPLICATION
// =====================================================

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Console message for fellow developers
console.log('%c Gabriel Rodriguez Torres - Culinary Portfolio', 'background: #c9a961; color: #0a0a0a; font-size: 16px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
console.log('%c Crafted with passion for culinary excellence 🍽️', 'color: #c9a961; font-size: 12px; padding: 5px 0;');
