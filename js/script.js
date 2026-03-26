document.addEventListener('DOMContentLoaded', () => {
    // Page Fade In
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-out';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    const navbar = document.getElementById('navbar');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-active');
        });
    }

    // Close mobile menu when clicking a link or clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbar.classList.contains('mobile-active')) {
            navbar.classList.remove('mobile-active');
        }
    });

    // Close menu on link click (for mobile)
    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-active');
        });
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, no need to observe again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to all elements with reveal or stagger class
    document.querySelectorAll('.reveal, .stagger, .section, .card, .stat-card, .info-card').forEach(el => {
        if (!el.classList.contains('reveal') && !el.classList.contains('stagger')) {
            el.classList.add('reveal', 'reveal-up');
        }
        observer.observe(el);
    });

    // Share Functionality
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Rizal Shrine | Dapitan City',
                text: 'Explore the historical sanctuary where Dr. Jose Rizal lived in exile.',
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                    window.open(fbUrl, '_blank');
                }
            } catch (err) {
                console.error('Error sharing:', err);
            }
        });
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        
        // Open Lightbox
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.overlay h4').textContent;
                
                lightboxImg.src = img.src;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                document.body.classList.add('lightbox-open');
            });
        });

        // Close Lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
            lightboxImg.src = ''; // Clear source to stop potential video playback if any
        };

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
