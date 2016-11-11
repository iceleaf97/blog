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
    createGraphic(); // draw graphics
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
    var geom = new THREE.OctahedronGeometry(7, 0);
    var mtl = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geom, mtl);
    scene.add(mesh);
}

function createGraphic() {
    // declare a function and set the canvas size
    var c=document.getElementById("myCanvas");
    c.width = 300;
    c.height = 300;

    ctx=c.getContext("2d");                  // get 2D drawing context.
    // triangle(ctx, 150, 150, 100,"#00ff00");  // draw a triangle.
    star(ctx, 150, 150, 90, 5, 0.5, "#00FFFF");  // draw a star

    ///// put this triangle into the 3D scene. /////
    var texture = new THREE.Texture(c);
    texture.needsUpdate = true;

    var spriteMtl = new THREE.SpriteMaterial({
        map: texture
    });
    var sprite = new THREE.Sprite(spriteMtl);
    sprite.scale.set(5, 5, 1);
    sprite.position.set(10, 0, 0);
    scene.add(sprite);

}

function triangle(ctx, x, y, r, color) {
    ctx.fillStyle= color;
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,-r);
    ctx.lineTo(-r,r);
    ctx.lineTo(r,r);
    ctx.fill();
}


function star(ctx, x, y, r, p, m, color){
    ctx.fillStyle= color;
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < p; i++){
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    ctx.fill();
}



function render() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x300032, 1);
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
