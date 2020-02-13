var THREE = require('three');
// these need to be accessed inside more than one function so we'll declare them first
let renderer;
let camera;
let scene;
let mesh;
let light;
let container;

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff ); 

    const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );

    // create a texture loader
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    texture = loader.load('resources/images/wall.jpg');

    // set the "color space" of the texture
    texture.encoding = THREE.sRGBEncoding;
    // reduce blurring at glancing angles
    texture.anisotropy = 16;

    //material should not be MeshBasicMaterial since it will not react to lights.
    const material = new THREE.MeshStandardMaterial( {
        color: 0xffffff, map: texture,
        } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    light = new THREE.DirectionalLight( 0xffffff, 3.0);
    light.position.set( 10, 10, 10 );
    scene.add( light );

    // Get a reference to the container element that will hold our scene
    container = document.querySelector( '#scene-container' );
    // add the automatically created <canvas> element to the page
    container.appendChild( renderer.domElement );
    createCamera()
}

function createCamera() {
    fov = 45;
    camera = new THREE.PerspectiveCamera( 
        fov,
        container.clientWidth/container.clientHeight,
        0.1,
        1000 
        );
    camera.position.set( 0, 0, 10 );
    camera.lookAt( 0, 0, 0 );
}

function animate() {
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render( scene, camera );
};

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

    // increase the mesh's rotation each frame
    mesh.rotation.z += 0.01;
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  
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
  console.log("client width :"+container.clientWidth);
}

// call the init function to set everything up
init();

window.addEventListener( 'resize', onWindowResize );


// start the animation loop
renderer.setAnimationLoop( () => {
update();
render();

} );
