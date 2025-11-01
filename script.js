// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const container = document.getElementById('canvas-container');

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xbb86fc, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 3D Object
const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xbb86fc, roughness: 0.5, metalness: 0.8 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
