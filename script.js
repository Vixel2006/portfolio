document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a.nav-link');
    // const mobileCtaButton = document.querySelector('.mobile-cta-button'); // This element no longer exists

    // Toggle mobile nav
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');
        // Removed mobile CTA button display logic
    });
    
    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                hamburger.classList.remove('open');
                mainNav.classList.remove('open');
                // Removed mobile CTA button display logic
            }
        });
    });

    // Removed logic for mobile CTA button click event listener

    // Active nav link on scroll
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('#main-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        // Adjust for sticky header height
        const headerHeight = document.querySelector('.main-header').offsetHeight; 
        const scrollOffset = headerHeight + 20; // Additional buffer

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - scrollOffset) { 
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
        
        // Special handling for the home section if it's the first thing on screen
        if (window.pageYOffset < document.getElementById('about').offsetTop - scrollOffset) {
             navLi.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').includes('home')) {
                    a.classList.add('active');
                }
            });
        }
    });
     // Set initial active state for 'Home' if page loads at the top
    if (window.location.hash === '' || window.location.hash === '#home') {
        document.querySelector('#main-nav ul li a[href="#home"]').classList.add('active');
    }
});

