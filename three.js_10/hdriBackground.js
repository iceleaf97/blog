/**
 * Created by iceleaf on 2016/9/7.
 */

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

}




function createModel() {
    var geometry = new THREE.SphereGeometry( 500, 60, 40 );

    var material = new THREE.MeshBasicMaterial( {
        color: 0x9ad3de,
        //color: 0xe6af4b,
        map: new THREE.TextureLoader().load( 'hdri/texturify_pano.jpg' )
    } );

    var mesh = new THREE.Mesh( geometry, material );
    mesh.scale.set( - 1, 1, 1 );

    scene.add( mesh );
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
    control.object.position.set(0, 0, 200);
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
