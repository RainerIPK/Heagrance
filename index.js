document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const setupMobileMenu = () => {
        const nav = document.querySelector('nav ul');
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        
        // Only insert hamburger menu in mobile view
        const insertHamburger = () => {
            if (window.innerWidth <= 768) {
                if (!document.querySelector('.hamburger')) {
                    document.querySelector('header').insertBefore(hamburger, nav);
                }
            } else {
                if (document.querySelector('.hamburger')) {
                    document.querySelector('.hamburger').remove();
                }
                nav.classList.remove('mobile-active');
            }
        };

        insertHamburger();
        window.addEventListener('resize', insertHamburger);

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            hamburger.classList.toggle('active');
        });
    };

    // Product hover effect
    const setupProductHover = () => {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const hoverIcons = card.querySelector('.hover-icons');
            
            card.addEventListener('mouseenter', () => {
                hoverIcons.style.bottom = '0';
            });
            
            card.addEventListener('mouseleave', () => {
                hoverIcons.style.bottom = '-50px';
            });
        });
    };

    // Add to cart functionality
    const setupCartFunctionality = () => {
        const addToCartBtns = document.querySelectorAll('.hover-icons .fa-shopping-cart');
        const cartCount = document.querySelector('.cart-count');
        let count = 0;

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Increment cart count
                count++;
                cartCount.textContent = count;
                
                // Get product info
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                
                // Show notification
                showNotification(`${productName} added to cart!`);
            });
        });
    };

    // Display notification
    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };

    // Newsletter subscription functionality
    const setupNewsletterForm = () => {
        const form = document.querySelector('.newsletter-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this.querySelector('input[type="email"]').value;
                
                if (email) {
                    showNotification('Thank you for subscribing to our newsletter!');
                    this.reset();
                }
            });
        }
    };

    // Initialize all functionality
    setupMobileMenu();
    setupProductHover();
    setupCartFunctionality();
    setupNewsletterForm();

    // Add CSS for notifications and mobile menu
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #333;
                color: white;
                padding: 15px 25px;
                border-radius: 4px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                z-index: 1000;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .hamburger {
                display: none;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 21px;
                cursor: pointer;
                z-index: 110;
            }
            
            .hamburger span {
                display: block;
                height: 3px;
                width: 100%;
                background-color: #000;
                transition: all 0.3s ease;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
            
            @media (max-width: 768px) {
                .hamburger {
                    display: flex;
                }
                
                nav ul {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 250px;
                    height: 100vh;
                    background-color: white;
                    flex-direction: column;
                    padding: 80px 20px 30px;
                    z-index: 100;
                    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                    transition: left 0.3s ease;
                }
                
                nav ul.mobile-active {
                    left: 0;
                }
                
                nav ul li {
                    margin: 15px 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    addDynamicStyles();
});

// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const setupFaqAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length > 0) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });
        }
    };

    // Form validation and submission
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                const requiredFields = contactForm.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                // Email validation
                const emailField = contactForm.querySelector('#email');
                if (emailField && emailField.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailField.value)) {
                        isValid = false;
                        emailField.classList.add('error');
                    }
                }
                
                if (isValid) {
                    // In a real application, you would send the form data to a server here
                    // For now, just show a success message
                    showNotification('Thank you for your message. We will get back to you shortly!');
                    contactForm.reset();
                } else {
                    showNotification('Please fill in all required fields correctly.', 'error');
                }
            });
            
            // Remove error class on input
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            });
        }
    };
    
    // Initialize contact page functionality if elements exist
    setupFaqAccordion();
    setupContactForm();
    
    // Add CSS for form validation
    const addContactPageStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .error {
                border-color: #ff3860 !important;
            }
            
            .notification.error {
                background-color: #ff3860;
            }
            
            .faq-item.active .faq-answer {
                display: block;
            }
        `;
        document.head.appendChild(style);
    };
    
    addContactPageStyles();
});