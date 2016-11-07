/**
 * Created by iceleaf on 2016/10/18.
 */
var scene, camera, WIDTH, HEIGHT, fov, aspect, near, far,
    renderer, container, control;
var stats;
var mesh;   // The mesh is the target we want to control.
var gui, parameters;


// a web page has completely loaded, and run the function init()
window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();
    render();
    createOrbit();
    createStats();

    createGUI();   // show the GUI list on the screen.

    loop();
    window.addEventListener('resize', handleWindowResize, false);
}


function createGUI() {
    gui = new dat.GUI();    // create a new GUI object

    parameters = {
        x: 0, y: 0, z: 0,      ////////////////////
        visible: true,         //   Initialize   //
        color: "#ff0000",      //   parameters   //
        opacity: 1,            ////////////////////
        geometry: "Sphere",
        reset: function () {
            resetMesh();
        }
    };

    //  GUI for controlling position of the mesh
    var pos_folder = gui.addFolder('Position');
    var meshX = pos_folder.add(parameters, 'x').min(-100).max(100).step(1).listen();
    var meshY = pos_folder.add(parameters, 'y').min(0).max(100).step(1).listen();
    var meshZ = pos_folder.add(parameters, 'z').min(-100).max(100).step(1).listen();
    pos_folder.open();

    //  While parameter: 'x, y, z', are changed,
    //  the position of the target mesh would be translated.
    meshX.onChange(function (value) {
       mesh.position.x = value;
    });
    meshY.onChange(function (value) {
        mesh.position.y = value;
    });
    meshZ.onChange(function (value) {
        mesh.position.z = value;
    });

    // GUI for controlling the visibility of the mesh
    var meshVisible = gui.add(parameters, 'visible').name('Visible').listen();

    //  While parameter: 'visible', is changed,
    //  the visibility of the target mesh would be changed.
    meshVisible.onChange(function (value) {
        mesh.visible = value;
    });

    // GUI for controlling color of the mesh
    var meshColor = gui.addColor(parameters, 'color').name('Color').listen();

    //  While parameter: 'color', is changed,
    //  the color of the target mesh would be changed.
    meshColor.onChange(function (value) {
        console.log(parameters,value);
        mesh.material.color.setHex(value.replace("#", "0x"));
        console.log(parameters,value);
    });

    // GUI for controlling opacity of the mesh
    var meshOpacity = gui.add(parameters, 'opacity').min(0).max(1).name('Opacity').listen();

    //  While parameter: 'opacity', is changed,
    //  the opacity of the target mesh would be changed.
    meshOpacity.onChange(function (value) {
        mesh.material.opacity = value;
    });

    // GUI for controlling type of the geometry
    var meshGeom = gui.add(
        parameters,
        'geometry',
        ["Box", "Sphere", "Cylinder", "Cone"]
    ).name('Geometry').listen();

    //  While parameter: 'Geometry', is changed,
    //  the geometry type of the target mesh would be changed.
    meshGeom.onChange(function () {
        changeMesh();
    });

    // While the 'Reset the mesh' button is clicked,
    // reset the condition of target mesh.
    gui.add(parameters, 'reset').name("Reset the mesh");

    // Open the dropdown list
    gui.open();

}

function resetMesh() {
    parameters.x = 0;
    parameters.y = 0;
    parameters.z = 0;
    parameters.color = "#ff0000";
    parameters.opacity = 1;
    parameters.visible = true;
    parameters.geometry = "Sphere";

    mesh.position.x = parameters.x;
    mesh.position.y = parameters.y;
    mesh.position.z = parameters.z;
    mesh.material.color.setHex( parameters.color.replace("#", "0x") );
    mesh.material.opacity = parameters.opacity;
    mesh.visible = parameters.visible;
    mesh.geometry = new THREE.SphereGeometry(10, 10, 10);
}

function changeMesh() {
    var value = parameters.geometry;
    var newGeom;
    switch (value){
        case "Box":
            newGeom = new THREE.BoxGeometry(10, 10, 10);
            break;
        case "Sphere":
            newGeom = new THREE.SphereGeometry(10, 10, 10);
            break;
        case "Cylinder":
            newGeom = new THREE.CylinderGeometry( 10, 10, 20, 32 );
            break;
        case "Cone":
            newGeom = new THREE.ConeGeometry( 10, 20, 32 );
            break;
        default:
            newGeom = new THREE.SphereGeometry(10, 10, 10);
            break;
    }
    mesh.geometry = newGeom;

}


function createStats() {
    stats = new Stats();
    stats.showPanel(0);  // 0: FPS, 1: MS
    stats.domElement.style.position = 'absolute';  //////////////////////
    stats.domElement.style.top = '5px';            // set the position //
    stats.domElement.style.left = '5px';           //////////////////////
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
    camera.position.set(0, 100, 100);
}

function createLight() {
    var a_light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(a_light);

    var s_light = new THREE.SpotLight(0xffffff, 0.5);
    s_light.castShadow = true;
    s_light.shadow.mapSize.width = 1000;
    s_light.shadow.mapSize.height = 1000;
    s_light.position.set(100, 200, 150);
    scene.add(s_light);
}

function createModel(){
    // Create a ground
    var planeGeom = new THREE.PlaneGeometry(100, 100, 1, 1);
    var planeMtl = new THREE.MeshLambertMaterial({color: 0x6ed3cf});
    var plane = new THREE.Mesh(planeGeom, planeMtl);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -15;
    scene.add(plane);

    // Create a 3D object above the ground
    var geometry = new THREE.SphereGeometry(10, 10, 10);
    var mtl = new THREE.MeshPhongMaterial({color: 0xff0000});
    mesh = new THREE.Mesh(geometry, mtl);
    mesh.material.transparent = true;
    mesh.castShadow = true;
    scene.add(mesh);
}

function render() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x9ad3de, 1);
    renderer.shadowMap.enabled = true;
    renderer.render(scene, camera);
    container = document.getElementById('scene');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
}

function loop() {
    stats.begin();
    renderer.render(scene, camera);
    control.update();
    stats.end();
    requestAnimationFrame(loop);
}




