/**
 * Created by iceleaf on 2016/10/18.
 */
var scene, camera, WIDTH, HEIGHT, fov, aspect, near, far,
    renderer, container, control;
var stats;

// a web page has completely loaded, and run the function init()
window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();
    render();
    createOrbit();

    createStats();  // create stats information box

    loop();
    window.addEventListener('resize', handleWindowResize, false);
}

function createStats() {
    stats = new Stats();
    stats.showPanel(0);  // 0: FPS, 1: MS
    stats.domElement.style.position = 'absolute';  //////////////////////
    stats.domElement.style.top = '200px';          // set the position //
    stats.domElement.style.left = '100px';         //////////////////////
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
    fov = 50;
    aspect = WIDTH/HEIGHT;
    near = 1;
    far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 20);
}

function createLight() {
    var a_light = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(a_light);

    var d_light = new THREE.DirectionalLight(0xffffff, 1);
    d_light.position.set(10, 10, 10);
    scene.add(d_light);
}

function createModel(){
    var geometry = new THREE.OctahedronGeometry(5, 2);
    var mtl = new THREE.MeshPhongMaterial({
        color:0xffffff,
        wireframe: true
    });
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
    stats.begin();
    renderer.render(scene, camera);
    control.update();
    stats.end();
    requestAnimationFrame(loop);
}




