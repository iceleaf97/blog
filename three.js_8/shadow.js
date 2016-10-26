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
}

function createLight() {
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
    scene.add(ambientLight);
    var spotLight = new THREE.SpotLight( 0xffffff, 0.6);
    spotLight.position.set( 50, 50, 50 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1000;
    spotLight.shadow.mapSize.height = 1000;
    scene.add( spotLight );
}


function createModel(){
    var planeGeom = new THREE.PlaneGeometry(100, 100);
    var planeMtl = new THREE.MeshPhongMaterial({
        color: 0x89bdd3
    });
    var plane = new THREE.Mesh(planeGeom, planeMtl);
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.rotation.x = -Math.PI/2;
    plane.position.set(0, -15, 0);
    scene.add(plane);

    var geometry = new THREE.ConeGeometry( 10, 20, 32 );
    var material = new THREE.MeshPhongMaterial({
        color: 0xe3e3e3,
        shininess: 1
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

}

function render() {
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x9ad3de)
    renderer.shadowMap.enabled = true;
    renderer.render(scene, camera);
    container = document.getElementById('scene');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
    control.object.position.set(0, 40, 80);
    control.target.set(0, 0, 0);
    control.update();
}

function loop() {
     renderer.render(scene, camera);
     requestAnimationFrame(loop);
     control.update();
}




