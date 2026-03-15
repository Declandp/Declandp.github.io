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

    // 4. Mouse Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    if(cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.top = (e.clientY - 150) + 'px';
            cursorGlow.style.left = (e.clientX - 150) + 'px';
        });
    }

    // 5. Typewriter Effect
    const words = ["Pod Lead", "Dashboard Expert", "Data Architect", "Actionable Thinker"];
    let i = 0;
    let timer;
    const typewriter = document.getElementById('typewriter');
    
    function typingEffect() {
        if (!typewriter) return;
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                typewriter.innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        if (!typewriter) return;
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                typewriter.innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                typingEffect();
                return false;
            }
            timer = setTimeout(loopDeleting, 50);
        };
        loopDeleting();
    }
    
    if (typewriter) {
        typingEffect();
    }

    // 6. Number Counters Animation Logic
    const counters = document.querySelectorAll('.counter');
    const speed = 150; 
    
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        countUpObserver.observe(counter);
    });

});
