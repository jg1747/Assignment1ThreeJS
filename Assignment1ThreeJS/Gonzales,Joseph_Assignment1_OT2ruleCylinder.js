/***********
 *Gonzales, Joseph
 *Assignment 1 - OT-2-ruleCylinder
 *ThreeJS
 ***********/

var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();


function createScene()
{
    // light
    //   args: color, intensity, range (0 if limitless)
    //var light = new THREE.PointLight(0xFFFFFF, 1, 1000 );
    var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(0, 0, 100);

    var ambientLight = new THREE.AmbientLight(0x222222);

    scene.add(light);
    scene.add(ambientLight);
    var color = 0xff0000; // red
    var mesh = ruledCylinder(10, color);
    scene.add(mesh);
}

function ruledCylinder(n, color) {
    var sides = n;      // n sides
    var slices = 40;    // angle slices
    var radius = 2;     // cylinder radius
    var height = 2;     // cylinder height
    numVertices = sides * slices;

    var angleincs = 2*Math.PI/sides;
    var cs_angleincs = 2*Math.PI/slices;
    var zval;
    var i = 0;
    var z = 0;
    var geom = new THREE.Geometry();
    for(m=0; m<slices; m++) {
        for (n=0; n<sides; n++) {
            var x = Math.cos(i);
            var y = Math.sin(i);
            // first segment bottom-top
            var vertex = new THREE.Vector3(x, y, z);
            geom.vertices.push(vertex);
            geom.colors.push(new THREE.Color(color));

            vertex = new THREE.Vector3(x, y, z+height);
            geom.vertices.push(vertex);
            geom.colors.push(new THREE.Color(color));
            // second segment top-top

            vertex = new THREE.Vector3(x, y, z+height);
            geom.vertices.push(vertex);
            geom.colors.push(new THREE.Color(color));
            x = Math.cos(i+angleincs);
            y = Math.sin(i+angleincs);
            vertex = new THREE.Vector3(x, y, z+height);
            geom.vertices.push(vertex);
            geom.colors.push(new THREE.Color(color));
            // now bottom - bottom
            vertex = new THREE.Vector3(x, y, z);
            geom.vertices.push(vertex);
            geom.colors.push(new THREE.Color(color));
            x = Math.cos(i);
            y = Math.sin(i);
            vertex = new THREE.Vector3(x, y, z);
            geom.vertices.push(vertex);
            geom.colors.push(new THREE.Color(color));
            i += angleincs;
        }
    }

    var mat = new THREE.LineBasicMaterial({vertexColors: true, linewidth: 20});
    var line = new THREE.Line(geom, mat, THREE.LinePieces);
    return line;
}


function animate() {
    window.requestAnimationFrame(animate);
    render();
}


function render() {

    var delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
}


function init() {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var canvasRatio = canvasWidth / canvasHeight;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, -16, 8);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function showGrids() {
    // Nothing in this example
    // Grid step size is 1; axes meet at (0,0,0)
    // Coordinates.drawGrid({size:100,scale:1,orientation:"z"});
    //Coordinates.drawAllAxes({axisLength:11, axisRadius:0.05});
}


function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}


try {
    init();
    showGrids();
    createScene();
    addToDOM();
    render();
    animate();
} catch(e) {
    var errorMsg = "Error: " + e;
    alert (errorMsg);
}