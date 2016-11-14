/**
 * Created by iceleaf on 2016/11/10.
 */


var scene, camera, WIDTH, HEIGHT, fov, aspect, near, far,
    renderer, container, control;
var ctx;


window.addEventListener('load', init, false);

function init() {
    createScene();
    createModel();
    createLabel("Web3D Label", 40);  //   words of the label: three.js,   size of the font: 50
    render();
    createOrbit();
    loop();
    window.addEventListener('resize', windowResize, false);
}

function windowResize() {
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
    camera.position.set(0, 0, 30);
}

function createModel() {
    var geom = new THREE.ConeGeometry( 7, 10, 4 );
    var mtl = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geom, mtl);
    scene.add(mesh);
}

function createLabel(message, fontSize) {
    var canvas = document.createElement('canvas');    //////////////////////////////
                                                      // Create a canvas element. //
                                                      //////////////////////////////
    // 【Remove the two lines of code.】
    // canvas.id = "box";
    // document.body.appendChild(canvas);
    canvas.width = 300;
    canvas.height = 300;
    var canvasSize = 300;
    ctx=canvas.getContext("2d");                      // get 2D drawing context.

    ctx.font = "Bold "+fontSize+"px Bookman";   ////////////////////////////////////
    ctx.textAlign = "center";                   // write some words on the canvas.//
    ctx.fillStyle = "#ffff00";                  ////////////////////////////////////
    ctx.fillText(message, canvasSize/2, canvasSize/2);


    // draw a frame for the text. //
    // Method 1 : ctx.strokeRect();
    // var messageW = ctx.measureText(message).width;
    // var blank = fontSize/3;
    // ctx.strokeStyle = "#62bcfa";
    // ctx.lineWidth=2;
    // ctx.strokeRect(
    //     canvasSize/2-messageW/2-blank,
    //     canvasSize/2-fontSize,
    //     messageW+blank*2,
    //     fontSize+blank
    // );

    // Method 2 : ctx.stroke();
    var messageW = ctx.measureText(message).width;
    var blank = fontSize/3;
    ctx.strokeStyle = "#62bcfa";
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(canvasSize/2-messageW/2-blank, canvasSize/2-fontSize);
    ctx.lineTo(canvasSize/2+messageW/2+blank, canvasSize/2-fontSize);
    ctx.lineTo(canvasSize/2+messageW/2+blank, canvasSize/2+blank);
    ctx.lineTo(canvasSize/2-messageW/2-blank, canvasSize/2+blank);
    ctx.closePath();
    ctx.stroke();





    ///// put this label into the 3D scene. /////
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMtl = new THREE.SpriteMaterial({
        map: texture
    });
    var sprite = new THREE.Sprite(spriteMtl);
    sprite.scale.set(5, 5, 1);
    sprite.position.set(0, 6, 0);
    scene.add(sprite);

}



function render() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x252839, 1);
    renderer.render(scene, camera);
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

function createOrbit() {
    control = new THREE.OrbitControls(camera, renderer.domElement);
}

function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}
