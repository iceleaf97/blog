/**
 * Created by iceleaf on 2016/9/7.
 */
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container, control, stats;

var WIDTH, HEIGHT;

window.addEventListener('load', init, false);

function init() {
    if ( !Detector.webgl ) Detector.addGetWebGLMessage();  // Ensure WebGL is supported in the browser.

    createScene();
    createLight();
    createModel();  // The most important part in this lecture
    render();
    createOrbit();
    createStats();  // Show the FPS value.
    loop();
    window.addEventListener('resize', handleWindowResize, false);
}

function createStats() {
    stats = new Stats();
    document.body.appendChild(stats.domElement);
}

function handleWindowResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH/HEIGHT;
    camera.updateProjectionMatrix();
}

function createScene() {
    scene = new THREE.Scene();
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    aspectRatio = WIDTH/HEIGHT;
    fieldOfView = 50;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);


}

function createLight() {
    var directLt = new THREE.DirectionalLight(0xffffff, 1);
    directLt.position.set(10, 10, 10);
    scene.add(directLt);
    var ambientLt = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLt);
}



function createModel() {
    // MTLLoader for loading all the texture information of the model.
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('models/');
    mtlLoader.load( 'tree.mtl', function( materials ) {
        materials.preload();
        //OBJLoader for loading all the vetices information of the geometry.
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.load( 'models/tree.obj', function ( object ) {
            scene.add( object );
        });
    });

}

function render() {
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.render(scene, camera);
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.object.position.set(0, 0, 10);
    control.target.set(0, 0, 0);
    control.update();
}

function loop() {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(loop);
}
