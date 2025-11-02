
// ==========================================================================
// Smoke Effect Logic (from smoke-effect.mjs)
// ==========================================================================
function initSmokeEffect() {
    let scene, camera, renderer, smokeParticles = [], clock;

    function init() {
        if (typeof THREE === 'undefined') {
            console.error("Three.js library is not loaded.");
            return;
        }

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        scene.add(camera);

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const smokeContainer = document.getElementById('smoke-effect');
        if (smokeContainer) {
            smokeContainer.appendChild(renderer.domElement);
        } else {
            console.error("Smoke effect container not found.");
            return;
        }

        const light = new THREE.DirectionalLight(0x00aaff, 0.8);
        light.position.set(-1, 0, 1);
        scene.add(light);

        const smokeTexture = new THREE.TextureLoader().load('assets/images/smoke-texture.png');
        const smokeMaterial = new THREE.MeshLambertMaterial({
            color: 0x00aaff,
            map: smokeTexture,
            transparent: true,
            opacity: 0.2
        });

        const smokeGeo = new THREE.PlaneGeometry(300, 300);

        for (let p = 0; p < 150; p++) {
            let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
            particle.position.set(
                Math.random() * 500 - 250,
                Math.random() * 500 - 250,
                Math.random() * 1000 - 100
            );
            particle.rotation.z = Math.random() * 360;
            scene.add(particle);
            smokeParticles.push(particle);
        }

        clock = new THREE.Clock();
        animate();
    }

    function animate() {
        let delta = clock.getDelta();
        requestAnimationFrame(animate);

        smokeParticles.forEach(p => {
            p.rotation.z += (delta * 0.1);
        });

        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });

    init();
}

// ==========================================================================
// Scroll Animation Logic (from animations.mjs)
// ==========================================================================
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==========================================================================
// Main Script Logic (from script.mjs)
// ==========================================================================

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
        setTimeout(() => {
            heroText.classList.add('loaded');
        }, 200);
    }
}

// ==========================================================================
// DOMContentLoaded Event Listener
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    // initSmokeEffect(); // Desactivado para compatibilidad con headless browser
    initSmoothScrolling();
    initEntranceAnimation();
});
