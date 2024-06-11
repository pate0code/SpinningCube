// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background color to white

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow map
document.body.appendChild(renderer.domElement);

// Create a light and enable shadows for the light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
light.castShadow = true; // Enable shadow casting by this light
scene.add(light);

// Create an ambient light for softer shadows
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Create a material for the cube
const material = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Gray color

// Create a geometry (the shape of the object)
const geometry = new THREE.BoxGeometry();

// Combine the geometry and material into a mesh
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // Enable shadow casting by the cube
scene.add(cube);

// Create a plane to catch the shadow
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true; // Enable shadow receiving by the plane
scene.add(plane);

// Create a function to animate the cube
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for the animation
    cube.rotation.x += 0.03;
    cube.rotation.y += 0.03;

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Run the animate function for the first time to kick things off
animate();

// Adjust the scene when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
