document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    // Dynamic Beer List Population
    const beerGrid = document.getElementById('beer-grid');
    const beerList = [
        { 
            name: 'Vee Haw Nashville', 
            type: 'Wheat Ale', 
            abv: '5.2%',
            brewery: 'Vee Haw Brewing Co.'
        },
        { 
            name: 'Black Abbey Rose', 
            type: 'Belgian-Style Ale', 
            abv: '6.2%',
            brewery: 'Black Abbey Brewing'
        },
        { 
            name: 'Urban Hiker', 
            type: 'Peanut Butter Milk Stout', 
            abv: '5.8%',
            brewery: 'Urban Brewing'
        },
        { 
            name: 'Czann\'s Blonde', 
            type: 'American Blonde Ale', 
            abv: '4.8%',
            brewery: 'Czann\'s Brewing'
        },
        { 
            name: 'Street Sweeper', 
            type: 'IPA', 
            abv: '6.0%',
            brewery: 'Bearded Iris Brewing'
        },
        { 
            name: 'Marble Fox', 
            type: 'Nitro Coffee Stout', 
            abv: '6.5%',
            brewery: 'Marble Brewing'
        }
    ];

    if (beerGrid) {
        beerList.forEach(beer => {
            const beerCard = document.createElement('div');
            beerCard.classList.add('beer-card');
            beerCard.innerHTML = `
                <h3>${beer.name}</h3>
                <p>${beer.type}</p>
                <small>ABV: ${beer.abv}</small>
                <p class="brewery">${beer.brewery}</p>
            `;
            beerGrid.appendChild(beerCard);
        });
    }

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for fixed header
                const offset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });

    // Newsletter Signup
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Simple email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailInput.value)) {
                    // In a real-world scenario, you'd send this to a backend
                    alert(`Thanks for subscribing with ${emailInput.value}! 🍺`);
                    emailInput.value = ''; // Clear the input
                } else {
                    alert('Please enter a valid email address.');
                }
            }
        });
    }

    // Lazy Image Loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '0px 0px 50px 0px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Active Section Highlighting
    const sections = document.querySelectorAll('.section');
    const navMenuLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});