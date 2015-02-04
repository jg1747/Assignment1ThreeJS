/***********
 *Gonzales, Joseph
 *Assignment 1 - OT-1-starburst
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
    // renders a starburst of lines of length 2
    var innerColor = 0xff0000; // red
    var outerColor = 0x00ff00; // blue
    starburst(200, innerColor, outerColor);

}

function starburst(n, innerColor, outerColor) {
    var r = 2;
    var nsqrt = Math.sqrt (n);  // calculate two chunks
    for (j = 0; j < nsqrt; j++) {
        for (i = 0; i < nsqrt; i++) {
            // Spherical coordinates: (r,f,?) with r?[0,8), f?[0,2p), ??[0,p]
            // using an idea from here http://www.gamedev.net/topic/537269-procedural-sphere-creation/

            var theta = (j / nsqrt) * Math.PI;
            var phi   = (i / nsqrt) * Math.PI*2;
            var x = Math.sin(theta) * Math.cos(phi);
            var y = Math.cos(theta);
            var z = -Math.sin(theta) * Math.sin(phi);
            var geom = new THREE.Geometry();
            geom.vertices.push(new THREE.Vector3(0, 0, 0));

            var vertex = new THREE.Vector3(x, y, z);
            vertex.normalize();         // change to length 1
            vertex.multiplyScalar(r);   // now corrent the length

            geom.vertices.push(vertex);
            geom.colors.push(new THREE.Color(innerColor));
            geom.colors.push(new THREE.Color(outerColor));
            var mat = new THREE.LineBasicMaterial({vertexColors: true, linewidth: 20});
            var line = new THREE.Line(geom, mat, THREE.LineStrip);
            scene.add(line);
        }
    }
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
    camera.position.set(0, 0, 10);
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