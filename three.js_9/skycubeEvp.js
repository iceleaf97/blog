/**
 * Created by iceleaf on 2016/9/7.
 */
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container, control;

var WIDTH, HEIGHT;

window.addEventListener('load', init, false);

function init() {
    createScene();
    createModel();
    render();
    createOrbit();
    loop();
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
    camera.position.set(0, 0, 50);

}



function createModel() {
    //create SkyBox
    var reflectionCube = new THREE.CubeTextureLoader()
        .setPath( 'skybox/' )
        .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
    reflectionCube.format = THREE.RGBFormat;
    scene.background = reflectionCube;// 天空盒背景
}

function render() {
    renderer = new THREE.WebGLRenderer({alpha: true, antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x004444);
    renderer.render(scene, camera);
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.object.position.set(0, 0, 70);
    control.target.set(0, 0, 0);
    control.update();
}

function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);

}
