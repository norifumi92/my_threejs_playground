const THREE = require('three');
const OrbitControls = require('./resources/js/vendor/three/OrbitControls.js');
const GLTFLoaders = require('./resources/js/vendor/three/GLTFLoader.js');
// these need to be accessed inside more than one function so we'll declare them first
let renderer;
let camera;
let scene;
let train;
//let light;
let container;
let axes;

function init() {

    container = document.querySelector( '#scene-container' );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x8FBCD4 ); 
    
    axes = new THREE.AxesHelper( 5 );
    scene.add( axes );

    createCamera();
    createControls();
    createLights();
    createMeshes();
    createRenderer();
    renderer.physicallyCorrectLights = true;

    // start the animation loop
    renderer.setAnimationLoop( () => {
    update();
    render();
    } );
    
}

//Configure meshes
function createMeshes() {

    // create a Group to hold the pieces of the train
    train = new THREE.Group();

    const materials = createMaterials();
    const geometries = createGeometries();
    const nose = new THREE.Mesh( geometries.nose, materials.body );
    nose.rotation.z = Math.PI / 2;
    nose.position.x = -1;

    const cabin = new THREE.Mesh( geometries.cabin, materials.body );
    cabin.position.set( 1.5, 0.4, 0 );

    const chimney = new THREE.Mesh( geometries.chimney, materials.detail );
    chimney.position.set( -2, 0.9, 0);

    const smallWheelRear = new THREE.Mesh( geometries.wheel, materials.detail );
    smallWheelRear.position.set( 0, -0.5, 0 );
  
    const smallWheelCenter = smallWheelRear.clone();
    smallWheelCenter.position.x = -1;

    const smallWheelFront = smallWheelRear.clone();
    smallWheelFront.position.x = -2;

    const bigWheel = smallWheelRear.clone();
    bigWheel.scale.set( 2, 2, 1.25 );
    bigWheel.position.set( 1.5, -0.1, 0 );

    train.add( 
        nose, 
        cabin,
        chimney,
        smallWheelRear,
        smallWheelCenter,
        smallWheelFront,
        bigWheel,
        )
    
    scene.add( train );
}

// Configure renderer and set it into container
function createRenderer() {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
}

function createMaterials() {

    const body = new THREE.MeshStandardMaterial( {
        color: 0xff3333,
        flatShading: true,
    })
    // just as with textures, we need to put colors into linear color space
    body.color.convertSRGBToLinear();

    const detail = new THREE.MeshStandardMaterial( {
        color: 0x333333, // darkgrey
        flatShading: true,
      } );
    
    detail.color.convertSRGBToLinear();

    return {
        body,
        detail,
    };
  
}
  
function createGeometries() {
    //create nose
    const nose = new THREE.CylinderBufferGeometry( 0.75, 0.75, 3, 20 );
    //create cabin
    const cabin = new THREE.BoxBufferGeometry( 2, 2, 1.5 );
    //create chimney
    const chimney = new THREE.CylinderBufferGeometry( 0.3, 0.1, 0.5 );
    //create wheel
    const wheel = new THREE.CylinderBufferGeometry( 0.4, 0.4, 1.5, 16 );
    wheel.rotateX( Math.PI / 2 );

    return {
        nose,
        cabin,
        chimney,
        wheel,
    }
}

// Configure camera
function createCamera() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.set( -5, 5, 7 );
    camera.lookAt( 0, 0, 0 );
}

// Configure lights
function createLights() {
    const ambientLight = new THREE.HemisphereLight(
        0xddeeff, // bright sky color
        0x202020, // dim ground color
        5, // intensity
    );

    const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
    mainLight.position.set( 10, 10, 10 );

    scene.add( ambientLight, mainLight );
}

// Configure controls
function createControls() {

    controls = new THREE.OrbitControls( camera, container );
  
}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

    // increase the mesh's rotation each frame
    //train.rotation.z += 0.01;
    //train.rotation.x += 0.01;
    train.rotation.y += 0.01;
  
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

function loadModels() {

    const loader = new THREE.GLTFLoader();

}

// call the init function to set everything up
init();

window.addEventListener( 'resize', onWindowResize );

