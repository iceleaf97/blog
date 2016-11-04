/**
 * Created by iceleaf on 2016/9/7.
 */
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container, control;

var WIDTH, HEIGHT;

window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();
    render();
    createOrbit();
    loop();
    window.addEventListener('resize', handleWindowResize, false);
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
    camera.position.set(0, 0, 50);


}

function createLight() {
    var spotLight = new THREE.SpotLight(0xffd073,0.7);
    spotLight.position.set(-50, 50, 50);
    scene.add(spotLight);

    var ambientLt = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLt);
}



function createModel() {
    //create SkyBox
    var reflectionCube = new THREE.CubeTextureLoader()
        .setPath( 'pisa/' )
        .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );
    reflectionCube.format = THREE.RGBFormat;
    scene.background = reflectionCube;// 天空盒背景


    var geom = new THREE.SphereGeometry(10, 20, 20);


    var mtl = new THREE.MeshPhongMaterial( {
        color: 0xe62739,
        specular: 0xf2efe8,
        reflectivity: 0.5,
        // shininess: 20,
        shading: THREE.FlatShading,
        envMap: reflectionCube
    } );
    var mesh = new THREE.Mesh(geom, mtl);
    scene.add(mesh);
}

function render() {
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
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
