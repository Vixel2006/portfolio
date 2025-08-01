document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a.nav-link');

    // Toggle mobile nav
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');
    });
    
    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                hamburger.classList.remove('open');
                mainNav.classList.remove('open');
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('#main-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});
