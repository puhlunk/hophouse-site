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

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !e.target.closest('.menu-toggle') && !e.target.closest('.nav-menu')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('open');
        }
    });

    // Dynamic Beer List Population from JSON file
    const beerGrid = document.getElementById('beer-grid');
    const featuredBeerElement = document.getElementById('featured-beer');

    if (beerGrid) {
        // Fetch the beer data from our JSON file
        fetch('beers.json')
            .then(response => response.json())
            .then(data => {
                // Clear any existing content
                beerGrid.innerHTML = '';
                
                // Get all beers
                const allBeers = data.beers;
                
                // Get featured beers
                const featuredBeers = allBeers.filter(beer => beer.featured);
                
                // Update the featured beer in the hero section
                if (featuredBeerElement && featuredBeers.length > 0) {
                    // Randomly select a featured beer
                    const randomIndex = Math.floor(Math.random() * featuredBeers.length);
                    featuredBeerElement.textContent = featuredBeers[randomIndex].name;
                }
                
                // Initially show only featured beers (6 max)
                const initialBeers = featuredBeers.slice(0, 6);
                const hiddenBeers = allBeers.filter(beer => !featuredBeers.includes(beer));
                
                // Add featured beers
                initialBeers.forEach(beer => {
                    const beerCard = createBeerCard(beer);
                    beerGrid.appendChild(beerCard);
                });
                
                // Add hidden beers (initially not shown)
                hiddenBeers.forEach(beer => {
                    const beerCard = createBeerCard(beer);
                    beerCard.classList.add('hidden');
                    beerGrid.appendChild(beerCard);
                });
                
                // Create button container
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('beer-buttons');
                
                // Add "View All" button
                const viewAllButton = document.createElement('button');
                viewAllButton.id = 'view-all-beers';
                viewAllButton.classList.add('btn', 'btn-primary');
                viewAllButton.innerText = `View All ${allBeers.length} Beers`;
                buttonContainer.appendChild(viewAllButton);
                
                // Add "Hide Beers" button (initially hidden)
                const hideButton = document.createElement('button');
                hideButton.id = 'hide-beers';
                hideButton.classList.add('btn', 'btn-secondary', 'hidden');
                hideButton.innerText = 'Show Featured Only';
                buttonContainer.appendChild(hideButton);
                
                // Add button container after beer grid
                beerGrid.insertAdjacentElement('afterend', buttonContainer);
                
                // Add event listener to the view all button
                viewAllButton.addEventListener('click', function() {
                    // Show all hidden beers
                    document.querySelectorAll('.beer-card.hidden').forEach(card => {
                        card.classList.remove('hidden');
                    });
                    
                    // Hide view all button and show hide button
                    this.classList.add('hidden');
                    hideButton.classList.remove('hidden');
                });
                
                // Add event listener to the hide button
                hideButton.addEventListener('click', function() {
                    // Hide non-featured beers
                    allBeers.forEach((beer, index) => {
                        if (!beer.featured) {
                            const cards = document.querySelectorAll('.beer-card');
                            // Find the corresponding card
                            for (let i = 0; i < cards.length; i++) {
                                if (cards[i].querySelector('h3').textContent === beer.name) {
                                    cards[i].classList.add('hidden');
                                }
                            }
                        }
                    });
                    
                    // Show view all button and hide the hide button
                    viewAllButton.classList.remove('hidden');
                    this.classList.add('hidden');
                    
                    // Scroll back to beer section
                    document.getElementById('beer-list').scrollIntoView({ behavior: 'smooth' });
                });
            })
            .catch(error => {
                console.error('Error loading beer data:', error);
                // Fallback if JSON fails to load
                beerGrid.innerHTML = '<p>Unable to load beer list. Please try again later.</p>';
            });
    }

    // Helper function to create beer cards
    function createBeerCard(beer) {
        const beerCard = document.createElement('div');
        beerCard.classList.add('beer-card');
        
        const titleEl = document.createElement('h3');
        titleEl.textContent = beer.name;
        
        const typeEl = document.createElement('p');
        typeEl.classList.add('type');
        typeEl.textContent = beer.type;
        
        const abvEl = document.createElement('p');
        abvEl.classList.add('abv');
        abvEl.textContent = `ABV: ${beer.abv}`;
        
        const breweryEl = document.createElement('p');
        breweryEl.classList.add('brewery');
        breweryEl.textContent = beer.brewery;
        
        // Add description if it exists
        let descriptionEl = null;
        if (beer.description) {
            descriptionEl = document.createElement('p');
            descriptionEl.classList.add('description');
            descriptionEl.textContent = beer.description;
        }
        
        // Add origin if it exists
        let originEl = null;
        if (beer.origin) {
            originEl = document.createElement('p');
            originEl.classList.add('origin');
            originEl.textContent = beer.origin;
        }
        
        // Append all elements
        beerCard.appendChild(titleEl);
        beerCard.appendChild(typeEl);
        beerCard.appendChild(abvEl);
        
        if (descriptionEl) {
            beerCard.appendChild(descriptionEl);
        }
        
        if (originEl) {
            beerCard.appendChild(originEl);
        }
        
        beerCard.appendChild(breweryEl);
        
        return beerCard;
    }

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .hero-cta a[href^="#"], .footer-section a[href^="#"]');
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
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('open');
                }
            }
        });
    });

    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Active Section Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle function to limit the rate at which a function is executed
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttle(highlightNavOnScroll, 100));

    // Run once on initial load
    highlightNavOnScroll();
});