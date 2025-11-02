import { initScrollAnimations } from './animations.mjs';
import { initSmokeEffect } from './smoke-effect.mjs';

/**
 * Initializes smooth scrolling for navigation links.
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Triggers the hero section entrance animation.
 */
function initEntranceAnimation() {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        // Delay helps ensure the page is fully ready before the animation starts
        setTimeout(() => {
            heroText.classList.add('loaded');
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmokeEffect();
    initSmoothScrolling();
    initEntranceAnimation();
});
