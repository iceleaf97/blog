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
    camera.position.set(0, 0, 80);
}

function createLight() {
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6);
    directionalLight.position.set( 50, 50, 50 );
    scene.add( directionalLight );
}

var texture = new THREE.TextureLoader().load( "textures/white-leather.jpg" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 3, 2 );

function createModel(){
    var geometry = new THREE.IcosahedronGeometry(10, 3);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        //map: texture,
        bumpMap: texture,
        bumpScale: 0.8,
        //wireframe: true
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

}

function render() {
    renderer = new THREE.WebGLRenderer({alpha: true});
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
     renderer.render(scene, camera);
     requestAnimationFrame(loop);
     control.update();
}




