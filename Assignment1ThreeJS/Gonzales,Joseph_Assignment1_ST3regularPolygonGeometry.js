/***********
 *Gonzales, Joseph
 *Assignment 1 - ST-3-regularPolygonGeometry
 *ThreeJS
 ***********/

var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();


function createScene()
{
    var innerColor = 0xff0000; // red
    var outerColor = 0x0000ff; // blue
    polyhedron = regularPolygonGeometry(2, innerColor, outerColor);
    // light
    //   args: color, intensity, range (0 if limitless)
    //var light = new THREE.PointLight(0xFFFFFF, 1, 1000 );
    var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(0, 0, 100);
    var ambientLight = new THREE.AmbientLight(0x222222);

    scene.add(light);
    scene.add(ambientLight);
    scene.add(polyhedron);
}

function regularPolygonGeometry(n, innerColor, outerColor) {

    var vertices = [
        [ 1, 0, 1 ],
        [ 1, 0, -1 ],
        [ -1, 0, -1 ],
        [ -1, 0, 1 ],
        [0, 1, 0]
    ];

    var faces = [
        [0, 1, 2],
        [0, 1, 4],
        [1, 2, 4],
        [2, 3, 4],
        [3, 0, 4]
    ];
    // faces are indexed using characters
    var faceIndices = [ 'a', 'b', 'c', 'd' ];
    var size = 100;
    var radius = 2; //
    var geom = new THREE.PolyhedronGeometry(vertices, faces, radius, n);

    var red1 = (innerColor & 0xFF0000) >> 16;
    var green1 = (innerColor & 0x00FF00) >> 8;
    var blue1 = (innerColor & 0x0000FF);
    var green = green1;
    var red2 = (outerColor & 0xFF0000) >> 16;
    var green2 = (outerColor & 0x00FF00) >> 8;
    var blue2 = (outerColor & 0x0000FF);
    var red = parseFloat (red2 / 255);
    var blue = parseFloat (blue2 / 255);
    var green = parseFloat (green2 / 255);
    var stepred = red1 - red2;
    stepred = parseFloat (( stepred / geom.vertices.length) / 255);
    var stepblue = blue1 - blue2;
    stepblue = parseFloat (( stepblue / geom.vertices.length) / 255);
    var stepgreen = green1 - green2;
    stepgreen = parseFloat (( stepgreen / geom.vertices.length) / 255);
    var newcol = 0;
    for (var i = 0; i < geom.vertices.length; i++)
    {
        point = geom.vertices[ i ];
        var x = geom.vertices[i].x;
        var y = geom.vertices[i].y;
        var z = geom.vertices[i].z;
        var r = Math.sqrt(x*x+y*y+z*z);
        color = new THREE.Color( 0xffffff );
        //color.setRGB(red + newcol, green + newcol, blue + newcol);
        color.setRGB(red, green, blue);
        geom.colors[i] = color; // use this array for convenience
        red += stepred;
        blue += stepblue;
        green += stepgreen;
    }
    for ( var i = 0; i < geom.faces.length; i++ )
    {
        face = geom.faces[ i ];
        numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
        for( var j = 0; j < numberOfSides; j++ )
        {
            vertexIndex = face[ faceIndices[ j ] ];
            face.vertexColors[ j ] = geom.colors[ vertexIndex ];
        }
    }
    geom.colorsNeedUpdate = true;
    var mat = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
    var mesh = new THREE.Mesh(geom, mat);
    mesh.rotation.x = step = Math.PI/2;
    return mesh;
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
    renderer.setClearColor(0xFFFFFF, 1.0);

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, 0, 20);
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