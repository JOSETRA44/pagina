export function initSmokeEffect() {
    let scene, camera, renderer, smokeParticles = [], clock;

    function init() {
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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    init();
}
