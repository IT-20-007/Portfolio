// ==================== Main JavaScript ====================

// Wait for the DOM to load before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hidden');
    }, 1000);

    // Text Typing Animation - Only run on non-mobile (we've hidden it on mobile)
    const typingElement = document.querySelector('.typing-text');
    const words = ['Student','PenTestor','Bug Hunter'];
    let wordIndex = 0;
    
    if (typingElement) {
        // Check if we're on mobile (typing container is hidden via CSS)
        const isMobile = () => window.innerWidth <= 768;
        
        // Adjust animation duration based on screen size
        const getAnimationDuration = () => {
            return window.innerWidth <= 576 ? 2500 : 3500;
        };
        
        let typingInterval;
        
        const setupTypingAnimation = () => {
            // Only run animation on non-mobile devices
            if (isMobile()) {
                if (typingInterval) {
                    clearInterval(typingInterval);
                    typingInterval = null;
                }
                return;
            }
            
            // Clear existing interval if any
            if (typingInterval) {
                clearInterval(typingInterval);
            }
            
            // Set new interval with appropriate duration
            typingInterval = setInterval(() => {
                // Add fade out class
                typingElement.classList.add('changing');
                
                // Change text after fade out
                setTimeout(() => {
                    wordIndex = (wordIndex + 1) % words.length;
                    typingElement.textContent = words[wordIndex];
                    
                    // Remove fade out class to fade back in
                    setTimeout(() => {
                        typingElement.classList.remove('changing');
                    }, 50);
                }, 300);
            }, getAnimationDuration());
        };
        
        // Initial setup
        setupTypingAnimation();
        
        // Update on resize
        window.addEventListener('resize', setupTypingAnimation);
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Function to toggle menu state
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on overlay
    menuOverlay.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Active Navigation Link Based on Scroll Position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Animation with performance optimization
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    let scrollAnimationFrame;
    
    const animateOnScroll = () => {
        cancelAnimationFrame(scrollAnimationFrame);
        
        scrollAnimationFrame = requestAnimationFrame(() => {
            animateElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('show');
                }
            });
        });
    };
    
    // Initial check for visible elements on page load
    animateOnScroll();
    
    // Check for visible elements on scroll with debounce
    window.addEventListener('scroll', animateOnScroll);

    // Project Filtering
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Optimize images for better performance on mobile
    const optimizeImages = () => {
        const projectImages = document.querySelectorAll('.project-image img');
        const aboutImage = document.querySelector('.about-image img');
        
        if (window.innerWidth < 768) {
            // Project images optimization
            projectImages.forEach(img => {
                if (!img.getAttribute('data-src') && img.getAttribute('src')) {
                    img.setAttribute('data-src', img.getAttribute('src'));
                    // Add a loading attribute for better performance
                    img.setAttribute('loading', 'lazy');
                }
            });
            
            // About image optimization for mobile
            if (aboutImage) {
                // Adjust object position based on screen size for better portrait framing
                if (window.innerWidth < 576) {
                    aboutImage.style.objectPosition = 'center 20%';
                } else {
                    aboutImage.style.objectPosition = 'center 25%';
                }
            }
        } else {
            // Reset object position for larger screens
            if (aboutImage) {
                aboutImage.style.objectPosition = 'center center';
            }
        }
    };
    
    // Call on page load
    optimizeImages();
    
    // Call on window resize
    window.addEventListener('resize', optimizeImages);

    // Animate Skill Progress Bars
    const skillProgressBars = document.querySelectorAll('.progress');
    
    const animateProgressBars = () => {
        skillProgressBars.forEach(progressBar => {
            const value = progressBar.getAttribute('data-value');
            progressBar.style.width = `${value}%`;
        });
    };
    
    // Animate progress bars when skills section is in view
    const skillsSection = document.querySelector('#skills');
    
    const checkSkillsVisibility = () => {
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                animateProgressBars();
                window.removeEventListener('scroll', checkSkillsVisibility);
            }
        }
    };
    
    // Check if skills section is visible on page load
    checkSkillsVisibility();
    
    // Check if skills section becomes visible on scroll
    window.addEventListener('scroll', checkSkillsVisibility);

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill out all fields.';
                formMessage.style.display = 'block';
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For this demo, just show a success message
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Fix for iOS 100vh issue
    const fixIOSViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    fixIOSViewportHeight();
    window.addEventListener('resize', fixIOSViewportHeight);
}); 