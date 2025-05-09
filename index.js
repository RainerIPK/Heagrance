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

    // Initialize all functionality
    setupMobileMenu();
    setupProductHover();

    // Add CSS for notifications and mobile menu
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
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
            
            .faq-item.active .faq-answer {
                display: block;
            }
        `;
        document.head.appendChild(style);
    };
    
    addContactPageStyles();
});

// Products page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Products filtering and sorting
    const setupProductsPage = () => {
        // Price range slider functionality
        const setupPriceRangeSlider = () => {
            const minSlider = document.getElementById('price-min');
            const maxSlider = document.getElementById('price-max');
            const minValue = document.getElementById('min-value');
            const maxValue = document.getElementById('max-value');
            
            if (minSlider && maxSlider) {
                // Update the slider values
                const updateValues = () => {
                    minValue.textContent = minSlider.value;
                    maxValue.textContent = maxSlider.value;
                };
                
                // Ensure min doesn't exceed max
                minSlider.addEventListener('input', () => {
                    const minVal = parseInt(minSlider.value);
                    const maxVal = parseInt(maxSlider.value);
                    
                    if (minVal > maxVal) {
                        minSlider.value = maxVal;
                    }
                    
                    updateValues();
                });
                
                // Ensure max doesn't go below min
                maxSlider.addEventListener('input', () => {
                    const minVal = parseInt(minSlider.value);
                    const maxVal = parseInt(maxSlider.value);
                    
                    if (maxVal < minVal) {
                        maxSlider.value = minVal;
                    }
                    
                    updateValues();
                });
                
                // Initialize values
                updateValues();
            }
        };
        
        // Filter toggle functionality for mobile
        const setupFilterToggle = () => {
            const filterToggleBtn = document.querySelector('.filter-toggle');
            const filterSidebar = document.querySelector('.filter-sidebar');
            
            if (filterToggleBtn && filterSidebar) {
                filterToggleBtn.addEventListener('click', () => {
                    filterSidebar.classList.toggle('show-filters');
                });
            }
        };
        
        // Remove filter functionality
        const setupRemoveFilter = () => {
            const removeFilterBtns = document.querySelectorAll('.remove-filter');
            
            removeFilterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // In a real app, this would remove the filter and rerender products
                    const filterTag = this.closest('.active-filter');
                    filterTag.remove();
                });
            });
        };
        
        // Reset filters button
        const setupResetFilters = () => {
            const resetBtn = document.querySelector('.reset-filters-btn');
            const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
            const priceMin = document.getElementById('price-min');
            const priceMax = document.getElementById('price-max');
            
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    // Reset all checkboxes
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = false;
                    });
                    
                    // Reset price sliders
                    if (priceMin && priceMax) {
                        priceMin.value = priceMin.min;
                        priceMax.value = priceMax.max;
                        
                        // Trigger input event to update the display values
                        const inputEvent = new Event('input');
                        priceMin.dispatchEvent(inputEvent);
                        priceMax.dispatchEvent(inputEvent);
                    }
                });
            }
        };
        
        // Pagination functionality
        const setupPagination = () => {
            const paginationBtns = document.querySelectorAll('.pagination-btn, .pagination-next');
            
            paginationBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // In a real app, this would load the appropriate page
                    // For demo, we'll just update the active state
                    if (!this.classList.contains('pagination-next')) {
                        document.querySelector('.pagination-btn.active').classList.remove('active');
                        this.classList.add('active');
                    } else {
                        // Handle next button
                        const activePage = document.querySelector('.pagination-btn.active');
                        const nextPage = activePage.nextElementSibling;
                        
                        if (nextPage && nextPage.classList.contains('pagination-btn')) {
                            activePage.classList.remove('active');
                            nextPage.classList.add('active');
                        }
                    }
                });
            });
        };
        
        // Initialize products page functionality
        setupPriceRangeSlider();
        setupFilterToggle();
        setupRemoveFilter();
        setupResetFilters();
        setupApplyFilters();
        setupSorting();
        setupPagination();
    };
    
    // Initialize products page if on products page
    if (document.querySelector('.products-page')) {
        setupProductsPage();
    }
});