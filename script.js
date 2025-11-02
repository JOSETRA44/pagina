// Intersection Observer for section animations
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

// Three.js smoke effect
let scene, camera, renderer, smokeParticles = [], clock;

function initSmoke() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('smoke-effect').appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0x00aaff, 0.8);
    light.position.set(-1, 0, 1);
    scene.add(light);

    const smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
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
    animateSmoke();
}

function animateSmoke() {
    let delta = clock.getDelta();
    requestAnimationFrame(animateSmoke);

    smokeParticles.forEach(p => {
        p.rotation.z += (delta * 0.1);
    });

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initSmoke();
