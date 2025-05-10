document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('.section'); // Select all sections with the 'section' class
    const navLi = document.querySelectorAll('header nav ul li a'); // Select all nav links

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Get header height dynamically or use a fixed value if simpler
            const headerHeight = document.querySelector('header')?.offsetHeight || 70; // Adjust 70 if needed
            const activationOffset = headerHeight + 20; // Activate slightly after section starts

            // Check if the scroll position is past the top of the section minus an offset
            if (pageYOffset >= sectionTop - activationOffset) {
                current = section.getAttribute('id');
            }
        });

        // If scrolled to the very bottom, activate the last link (contact)
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) { // Small buffer
             const lastSection = sections[sections.length - 1];
             if (lastSection) {
                current = lastSection.getAttribute('id');
             }
        }


        navLi.forEach(a => {
            a.classList.remove('active');
            // Check if the link's data-link attribute matches the current section id
            if (a.getAttribute('data-link') === current) {
                a.classList.add('active');
            }
        });

         // Handle the case where the user is at the very top (highlight Home)
         if (window.pageYOffset < sections[0]?.offsetTop - (document.querySelector('header')?.offsetHeight || 70)) {
             navLi.forEach(a => a.classList.remove('active'));
             const homeLink = document.querySelector('header nav ul li a[data-link="home"]');
             if (homeLink) {
                 homeLink.classList.add('active');
             }
         }
    });
     // Trigger scroll once on load to set initial state
     window.dispatchEvent(new Event('scroll'));
});

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".hamburger");
    const nav = document.getElementById("nav-links");
    const navLinks = document.querySelectorAll('#nav-links a');

    // Toggle mobile menu
    burger.addEventListener("click", () => {
        nav.classList.toggle("open");
        // Toggle hamburger icon
        const icon = burger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove("open");
            burger.querySelector('i').classList.add('fa-bars');
            burger.querySelector('i').classList.remove('fa-times');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove("open");
            burger.querySelector('i').classList.add('fa-bars');
            burger.querySelector('i').classList.remove('fa-times');
        }
    });
});
