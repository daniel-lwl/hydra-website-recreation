// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    const body = document.body;

    // Toggle menu function
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    // Close menu function
    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    }

    // Event Listeners
    
    // Hamburger button click
    hamburger.addEventListener('click', toggleMenu);

    // Click outside menu to close
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Close menu when clicking on navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 990) {
            closeMenu();
        }
    });
    // ===== PROJECTS CAROUSEL FUNCTIONALITY =====
    const projectsGrid = document.getElementById('projectsGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalProjects = document.querySelectorAll('.project-card').length;
    
    function getVisibleCards() {
        // Return number of visible cards based on screen size
        if (window.innerWidth <= 768) {
            return 1; // Show 1 card on mobile/tablet
        }
        return 3; // Show 3 cards on desktop
    }
    
    function getMaxSlides() {
        const visibleCards = getVisibleCards();
        if (visibleCards === 1) {
            return totalProjects - 1; // Can slide through all 4 projects (0-3)
        }
        return totalProjects - visibleCards; // Desktop: can slide 1 position (0-1)
    }
    
    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const maxSlides = getMaxSlides();
        
        // Adjust currentSlide if it's out of bounds after resize
        if (currentSlide > maxSlides) {
            currentSlide = maxSlides;
        }
        
        let translateX;
        if (visibleCards === 1) {
            // Mobile: move by exactly 100% for each slide (no gap calculation needed)
            translateX = currentSlide * -100;
        } else {
            // Desktop: move by one card width including gap
            const cardWidth = 100 / visibleCards; // 33.333%
            translateX = currentSlide * -cardWidth;
        }
        
        projectsGrid.style.transform = `translateX(${translateX}%)`;
        
        // Update dots based on screen size
        if (visibleCards === 1) {
            // Mobile: 4 dots for 4 projects
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
                dot.style.display = index < totalProjects ? 'block' : 'none';
            });
        } else {
            // Desktop: 2 dots for 2 views
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === Math.min(currentSlide, 1));
                dot.style.display = index < 2 ? 'block' : 'none';
            });
        }
        
        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === maxSlides;
    }
    
    function nextSlide() {
        const maxSlides = getMaxSlides();
        if (currentSlide < maxSlides) {
            currentSlide++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }
    
    function goToSlide(slideIndex) {
        const maxSlides = getMaxSlides();
        const visibleCards = getVisibleCards();
        
        let targetSlide;
        if (visibleCards === 1) {
            // Mobile: direct slide mapping
            targetSlide = slideIndex;
        } else {
            // Desktop: map dot clicks to specific slides
            targetSlide = slideIndex === 0 ? 0 : maxSlides;
        }
        
        if (targetSlide >= 0 && targetSlide <= maxSlides) {
            currentSlide = targetSlide;
            updateCarousel();
        }
    }
    
    // Event listeners for carousel
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        updateCarousel();
    });

});