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

    // --- Global Lightbox System ---
    
    // Inject Lightbox if missing
    if (!document.getElementById('lightbox')) {
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.className = 'lightbox';
        lb.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-content">
                <img id="lightbox-img" class="lightbox-img" src="" alt="Full Screen View">
                <h4 id="lightbox-caption" class="lightbox-caption"></h4>
            </div>
        `;
        document.body.appendChild(lb);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    const openLightbox = (src, captionText) => {
        lightboxImg.src = src;
        lightboxCaption.textContent = captionText || "";
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        setTimeout(() => { lightboxImg.src = ''; }, 300); // Clear after fade out
    };

    // Attach to all images in interest-based containers
    const setupClickableImages = () => {
        // Targets: Gallery Items, Cards, General Image Wrappers, and any standalone content images
        const containers = document.querySelectorAll('.gallery-item, .card, .image-wrapper, .stat-card, .info-card');
        const standaloneImages = document.querySelectorAll('main img:not(.nav-logo)');
        
        const attachToElement = (el, img) => {
            if (!img || el.dataset.lightboxSet) return;
            el.dataset.lightboxSet = "true";
            el.style.cursor = 'zoom-in';
            
            el.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
                
                let caption = "";
                const heading = el.querySelector('h1, h2, h3, h4, .overlay h4');
                if (heading) {
                    caption = heading.textContent;
                } else {
                    caption = img.alt || "Historical Detail";
                }
                openLightbox(img.src, caption);
            });
        };

        containers.forEach(container => {
            const img = container.querySelector('img');
            attachToElement(container, img);
        });

        standaloneImages.forEach(img => {
            // Only attach to standalone image if it's not already handled by a container parent
            if (!img.closest('.gallery-item, .card, .image-wrapper, .stat-card, .info-card')) {
                attachToElement(img, img);
            }
        });
    };

    setupClickableImages();

    // Event Listeners for closing
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
});
