/**
 * Created by iceleaf on 2016/10/18.
 */
var scene, camera, WIDTH, HEIGHT, fov, aspect, near, far,
    renderer, container, control;

// a web page has completely loaded, and run the function init()
window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();
    render();
    createOrbit();
    loop();
}

function createScene() {
    scene = new THREE.Scene();
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    fov = 50;
    aspect = WIDTH/HEIGHT;
    near = 1;
    far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 20);
}

function createLight() {
    var d_light = new THREE.DirectionalLight(0xffffff, 1);
    d_light.position.set(10, 10, 10);
    scene.add(d_light);
}

function createModel(){
    var geometry = new THREE.OctahedronGeometry(5, 1);
    var mtl = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, mtl);
    scene.add(mesh);
}

function render() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    container = document.getElementById('scene');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.object.position.set(0, 20, 20);
    control.target.set(0, 0, 0);
    control.autoRotate = true;
    control.autoRotateSpeed = 1;
    control.update();
}

function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
    control.update();
}




