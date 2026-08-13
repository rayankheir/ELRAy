// ==================================================
// MERCH CAROUSEL — auto-rotating showcase
// ==================================================
(function () {
    const carousel = document.getElementById('merchCarousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.merch-slide'));
    const caption = document.getElementById('merchCarouselCaption');
    const dotsWrap = document.getElementById('merchCarouselDots');
    const prevBtn = carousel.querySelector('.merch-carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.merch-carousel-arrow.next');

    if (slides.length === 0) return;

    const AUTOPLAY_MS = 4000;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let current = 0;
    let timer = null;

    // build dots
    slides.forEach((slide, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('active');
        dots[current].classList.add('active');
        caption.textContent = slides[current].dataset.caption || '';
    }

    function next() {
        goTo(current + 1);
    }

    function prev() {
        goTo(current - 1);
    }

    function startAutoplay() {
        if (prefersReducedMotion) return;
        stopAutoplay();
        timer = setInterval(next, AUTOPLAY_MS);
    }

    function stopAutoplay() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    prevBtn.addEventListener('click', () => {
        prev();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        next();
        startAutoplay();
    });

    // pause on hover / keyboard focus, resume on leave
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    startAutoplay();
})();