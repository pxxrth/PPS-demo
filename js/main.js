document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect & Active State
    const nav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Nav background
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active state
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeDrawerBtn = document.querySelector('.close-drawer-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-links a');

    const toggleDrawer = () => {
        mobileDrawer.classList.toggle('open');
        document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', toggleDrawer);
    closeDrawerBtn.addEventListener('click', toggleDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // 3. Form Submission
    const quoteForm = document.getElementById('quote-form');
    const formSuccess = document.getElementById('form-success');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, send data to server here
            
            // Show success message
            quoteForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
        });
    }

    // 4. Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Intersection Observer for Animations

    // Fade Up Sections
    const fadeUpSections = document.querySelectorAll('.fade-up-section');
    const fadeUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeUpSections.forEach(section => {
        fadeUpObserver.observe(section);
    });

    // Trust Bar Number Count Up
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countUp = (el) => {
        const target = parseFloat(el.getAttribute('data-count'));
        if (isNaN(target)) return;

        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const isFloat = target % 1 !== 0;

        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                // Easing out function
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = target * easeOut;
                
                if (isFloat) {
                    el.textContent = currentVal.toFixed(1);
                } else {
                    el.textContent = Math.floor(currentVal);
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                if (isFloat) {
                    el.textContent = target.toFixed(1);
                } else {
                    el.textContent = target;
                }
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const trustBarObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            statNumbers.forEach(num => {
                if(num.hasAttribute('data-count')){
                    countUp(num);
                }
            });
            trustBarObserver.disconnect();
        }
    }, { threshold: 0.5 });

    const trustBar = document.querySelector('.trust-bar');
    if (trustBar) {
        trustBarObserver.observe(trustBar);
    }
});
