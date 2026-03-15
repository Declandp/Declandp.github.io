document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle 
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isDisplayed = window.getComputedStyle(navLinks).display !== 'none';
            if (isDisplayed) {
                navLinks.style.display = 'none';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.right = '5%';
                navLinks.style.background = 'var(--glass-bg)';
                navLinks.style.backdropFilter = 'blur(20px)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderRadius = '1rem';
                navLinks.style.border = '1px solid var(--glass-border)';
                navLinks.style.gap = '1.5rem';
                navLinks.style.textAlign = 'right';
            }
        });
    }

    // 2. Navbar Shrink / Glass on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem var(--padding-x)';
            navbar.style.background = 'rgba(9, 9, 11, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            navbar.style.padding = '1rem var(--padding-x)';
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }
    });

    // 3. Scroll Reveal Animation Logic (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal, .reveal-right');

    const revealOptions = {
        threshold: 0.15,      // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

});
