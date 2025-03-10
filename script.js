document.addEventListener('DOMContentLoaded', () => {
    const imageCarousel = document.getElementById('mobile-carousel');
    const featuresCarousel = document.getElementById('features-carousel');
    
    let imageCurrentSlide = 0;
    let featuresCurrentSlide = 0;
    
    const imageTotalSlides = 3; // Total number of images
    const featuresTotalSlides = 4; // Total number of features
    
    let touchStartX = 0;
    let touchEndX = 0;

    // Image carousel
    const imageCarouselInner = document.querySelector('#mobile-carousel .flex');
    const imageDots = document.querySelectorAll('#mobile-carousel .w-2');

    function updateImageDots() {
        imageDots.forEach((dot, index) => {
            dot.classList.toggle('bg-white', index === imageCurrentSlide);
            dot.classList.toggle('bg-white/50', index !== imageCurrentSlide);
        });
    }

    function slideImages() {
        imageCurrentSlide = (imageCurrentSlide + 1) % imageTotalSlides;
        if (imageCarouselInner) {
            imageCarouselInner.style.transform = `translateX(-${imageCurrentSlide * 100}%)`;
            updateImageDots();
        }
    }

    // Features carousel
    const featureDots = document.querySelectorAll('#features-carousel .w-2');

    function updateFeatureDots() {
        featureDots.forEach((dot, index) => {
            dot.classList.toggle('bg-gray-800', index === featuresCurrentSlide);
            dot.classList.toggle('bg-gray-300', index !== featuresCurrentSlide);
        });
    }

    function slideFeatures() {
        featuresCurrentSlide = (featuresCurrentSlide + 1) % featuresTotalSlides;
        if (featuresCarousel) {
            const carouselInner = featuresCarousel.querySelector('.flex');
            if (carouselInner) {
                carouselInner.style.transform = `translateX(-${featuresCurrentSlide * 100}%)`;
                updateFeatureDots();
            }
        }
    }

    // Touch events for image carousel
    imageCarouselInner?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    imageCarouselInner?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe(imageCarouselInner, touchStartX, touchEndX, (direction) => {
            if (direction === 'left') {
                imageCurrentSlide = (imageCurrentSlide + 1) % imageTotalSlides;
            } else {
                imageCurrentSlide = (imageCurrentSlide - 1 + imageTotalSlides) % imageTotalSlides;
            }
            imageCarouselInner.style.transform = `translateX(-${imageCurrentSlide * 100}%)`;
            updateImageDots();
        });
    });

    // Touch events for features carousel
    const featuresCarouselInner = featuresCarousel?.querySelector('.flex');
    
    featuresCarouselInner?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    featuresCarouselInner?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe(featuresCarouselInner, touchStartX, touchEndX, (direction) => {
            if (direction === 'left') {
                featuresCurrentSlide = (featuresCurrentSlide + 1) % featuresTotalSlides;
            } else {
                featuresCurrentSlide = (featuresCurrentSlide - 1 + featuresTotalSlides) % featuresTotalSlides;
            }
            featuresCarouselInner.style.transform = `translateX(-${featuresCurrentSlide * 100}%)`;
            updateFeatureDots();
        });
    });

    function handleSwipe(element, start, end, callback) {
        const diff = start - end;
        const threshold = 50; // minimum distance for swipe

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                callback('left');
            } else {
                callback('right');
            }
        }
    }

    // Initialize dots and start carousels
    updateImageDots();
    updateFeatureDots();
    
    // Start carousels
    if (imageCarouselInner) {
        slideImages(); // Start immediately
        setInterval(slideImages, 16000);
    }
    if (featuresCarouselInner) {
        setInterval(slideFeatures, 8000);
    }

    // Floating banner
    const banner = document.getElementById('floating-banner');
    let lastScrollY = window.scrollY;
    let isVisible = false;

    function handleScroll() {
        const currentScroll = window.scrollY;
        const scrolledEnough = currentScroll > 100; // Show after 100px of scroll

        if (scrolledEnough && !isVisible) {
            banner.style.transform = 'translateY(0)';
            isVisible = true;
        } else if (!scrolledEnough && isVisible) {
            banner.style.transform = 'translateY(100%)';
            isVisible = false;
        }

        lastScrollY = currentScroll;
    }

    window.addEventListener('scroll', handleScroll);
}); 