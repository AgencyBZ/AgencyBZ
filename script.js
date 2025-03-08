document.addEventListener('DOMContentLoaded', function() {
    // Image carousel
    const imageCarousel = document.querySelector('#mobile-carousel .flex');
    const imageDots = document.querySelectorAll('#mobile-carousel .w-2');
    const imageTotalSlides = 3;
    let imageCurrentSlide = imageTotalSlides - 1; // Start from the last slide
    let touchStartX = 0;
    let touchEndX = 0;

    function updateImageDots() {
        imageDots.forEach((dot, index) => {
            dot.classList.toggle('bg-white', index === imageCurrentSlide);
            dot.classList.toggle('bg-white/50', index !== imageCurrentSlide);
        });
    }

    function slideImages() {
        imageCurrentSlide = (imageCurrentSlide - 1 + imageTotalSlides) % imageTotalSlides; // Move backwards
        imageCarousel.style.transform = `translateX(-${imageCurrentSlide * 100}%)`;
        updateImageDots();
    }

    // Features carousel
    const featuresCarousel = document.querySelector('#features-carousel .flex');
    const featureDots = document.querySelectorAll('#features-carousel .w-2');
    let featuresCurrentSlide = 0;
    const featuresTotalSlides = 4;

    function updateFeatureDots() {
        featureDots.forEach((dot, index) => {
            dot.classList.toggle('bg-gray-800', index === featuresCurrentSlide);
            dot.classList.toggle('bg-gray-300', index !== featuresCurrentSlide);
        });
    }

    function slideFeatures() {
        featuresCurrentSlide = (featuresCurrentSlide + 1) % featuresTotalSlides;
        featuresCarousel.style.transform = `translateX(-${featuresCurrentSlide * 100}%)`;
        updateFeatureDots();
    }

    // Touch events for image carousel
    imageCarousel?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    imageCarousel?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe(imageCarousel, touchStartX, touchEndX, (direction) => {
            if (direction === 'left') {
                imageCurrentSlide = (imageCurrentSlide + 1) % imageTotalSlides;
            } else {
                imageCurrentSlide = (imageCurrentSlide - 1 + imageTotalSlides) % imageTotalSlides;
            }
            imageCarousel.style.transform = `translateX(-${imageCurrentSlide * 100}%)`;
            updateImageDots();
        });
    });

    // Touch events for features carousel
    featuresCarousel?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    featuresCarousel?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe(featuresCarousel, touchStartX, touchEndX, (direction) => {
            if (direction === 'left') {
                featuresCurrentSlide = (featuresCurrentSlide + 1) % featuresTotalSlides;
            } else {
                featuresCurrentSlide = (featuresCurrentSlide - 1 + featuresTotalSlides) % featuresTotalSlides;
            }
            featuresCarousel.style.transform = `translateX(-${featuresCurrentSlide * 100}%)`;
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

    // Initialize dots
    updateImageDots();
    updateFeatureDots();

    // Start the carousels
    if (imageCarousel) setInterval(slideImages, 5000); // Change image every 5 seconds
    if (featuresCarousel) setInterval(slideFeatures, 4000); // Change feature every 4 seconds

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