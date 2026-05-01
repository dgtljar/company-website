// ── Mobile nav ───────────────────────────────────────
const Navbar = document.querySelector('.navbar');
const Fabars = document.querySelector('.fa-bars');

Fabars.onclick = () => {
    Navbar.classList.toggle('active');
};

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => Navbar.classList.remove('active'));
});

// ── Header scroll effect ─────────────────────────────
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Scroll reveal ────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

// Double rAF ensures the browser paints opacity:0 before we start observing,
// preventing the race condition where .visible is added before the hidden
// state is rendered (common on mobile where elements are close to the viewport).
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    });
});

// ── Animated counters ────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const steps  = 50;
    const delay  = 1500 / steps;
    let step = 0;
    const timer = setInterval(() => {
        step++;
        el.textContent = Math.min(Math.round((target / steps) * step), target) + suffix;
        if (step >= steps) clearInterval(timer);
    }, delay);
}

const statsSection = document.querySelector('.stats');
if (statsSection) {
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.counter').forEach(animateCounter);
            }
        });
    }, { threshold: 0.4 }).observe(statsSection);
}

// ── Hero slider ──────────────────────────────────────
var swiper = new Swiper('.home-slid', {
    loop: true,
    autoplay: {
        delay: 5500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
