// ===== Mobile Menu Toggle =====
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ===== Header scroll effect =====
const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,.1)';
    } else {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,.06)';
    }
    lastScroll = currentScroll;
});

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            const headerHeight = header.offsetHeight;
            window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
        }
    });
});

// ===== Hero Slider =====
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const arrowLeft = document.querySelector('.hero-arrow-left');
const arrowRight = document.querySelector('.hero-arrow-right');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

if (arrowRight) arrowRight.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
if (arrowLeft) arrowLeft.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.slide));
        resetAutoSlide();
    });
});

startAutoSlide();

// ===== Counter animation =====
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

// ===== Scroll reveal =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(
    '.product-card, .quality-card, .testimonial-card, .gallery-item, ' +
    '.about-text, .contact-form-wrap, .diff-item, .about-images'
).forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
});

// ===== Form submission =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '.7';

        setTimeout(() => {
            btn.textContent = '✓ Message Sent Successfully!';
            btn.style.background = '#25D366';
            btn.style.borderColor = '#25D366';
            btn.style.opacity = '1';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}
