// A spinning sphere.  Even with 2400 triangles it still looks lumpy!

// It is adapted from:
//   https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

// See here for a nice overview of three.js:
//   https://threejs.org/manual/#en/fundamentals

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90,
    window.innerWidth / window.innerHeight,
    0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const geometry = new THREE.SphereGeometry( 15, 48, 25 );  // 48 * 25 * 2 = 2400 triangles
const material = new THREE.MeshLambertMaterial( { color: 0x80ffd0 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

camera.position.z = 25;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();
