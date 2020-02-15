const THREE = require('three');
const OrbitControls = require('./resources/js/vendor/three/OrbitControls.js');
// these need to be accessed inside more than one function so we'll declare them first
let renderer;
let camera;
let scene;
let mesh;
//let light;
let container;

function init() {

    container = document.querySelector( '#scene-container' );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 ); 
    
    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();

    // start the animation loop
    renderer.setAnimationLoop( () => {
    update();
    render();
    } );
    
}

//Configure meshes
function createMeshes() {

    const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );

    // create a texture loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    texture = textureLoader.load('resources/images/wall.jpg');
    // set the "color space" of the texture
    texture.encoding = THREE.sRGBEncoding;
    // reduce blurring at glancing angles
    texture.anisotropy = 16;
    
    const material = new THREE.MeshStandardMaterial( {
        color: 0xffffff, map: texture,
    } );

    mesh = new THREE.Mesh(geometry, material);
    scene.add( mesh );

}

// Configure renderer and set it into container
function createRenderer() {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
}

// Configure camera
function createCamera() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.set( -5, 5, 5 );
    camera.lookAt( 0, 0, 0 );
}

// Configure lights
function createLights() {
    const ambientLight = new THREE.HemisphereLight(
        0xddeeff, // bright sky color
        0x202020, // dim ground color
        3, // intensity
    );
    scene.add( ambientLight );
}

// Configure controls
function createControls() {

    controls = new THREE.OrbitControls( camera, container );
  
}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

    // increase the mesh's rotation each frame
    //mesh.rotation.z += 0.01;
    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.01;
  
}

// render, or 'draw a still image', of the scene
function render() {

    renderer.render( scene, camera );
  
}
// Resize Event
function onWindowResize() {

  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;
  // update the camera's frustum
  camera.updateProjectionMatrix();
  // update the size of the renderer AND the canvas
  renderer.setSize( container.clientWidth, container.clientHeight );
}

// call the init function to set everything up
init();

window.addEventListener( 'resize', onWindowResize );

