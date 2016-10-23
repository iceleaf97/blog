/**
 * Created by iceleaf on 2016/10/18.
 */
var scene, camera, WIDTH, HEIGHT, fov, aspect, near, far,
    renderer, container, control;

var time=0; // create a new variable as a timer.

// a web page has completely loaded, and run the function init()
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
    fov = 50;
    aspect = WIDTH/HEIGHT;
    near = 1;
    far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 80);
}


function createModel(){
    var geometry = new THREE.IcosahedronGeometry(10, 0);
    var material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
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
    control.object.position.set(0, 0, 80);
    control.target.set(0, 0, 0);
    control.update();
}

function loop() {
     time += 0.01;                         ///////////////////////////////////
     mesh.position.y = 10*Math.sin(time);  //  change the mesh's position   //
     mesh.position.x = 10*Math.cos(time);  //       in every frame          //
     mesh.rotation.y += 0.05;              ///////////////////////////////////
     renderer.render(scene, camera);
     requestAnimationFrame(loop);
     control.update();
}




