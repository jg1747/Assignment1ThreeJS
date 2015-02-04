/***********
 *Gonzales, Joseph
 *Assignment 1 - ST-2-RedBox
 *ThreeJS
 ***********/

var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();


function createScene() {
    // material
    var mat = new THREE.MeshLambertMaterial( {color: 0xFF0000, shading: THREE.FlatShading, side: THREE.DoubleSide })

    var cubeFaces = [];
    // up and down sides
    var i = 0;
    for (z = 0;z < 16;z+=8) {
        var geom = new THREE.Geometry();
        geom.vertices.push(new THREE.Vector3(-4, -4, z));
        geom.vertices.push(new THREE.Vector3( 4, -4, z));
        geom.vertices.push(new THREE.Vector3(-4,  4, z));
        geom.vertices.push(new THREE.Vector3( 4,  4, z));
        var normal = new THREE.Vector3(0, 0, 1);
        var face = new THREE.Face3(0, 1, 2, normal);
        var face2 = new THREE.Face3(1, 3, 2, normal);
        geom.faces.push(face);
        geom.faces.push(face2);
        cubeFaces[i] = new THREE.Mesh(geom, mat);
        cubeFaces[i].rotation.x = Math.PI/4.0;
        cubeFaces[i].rotation.y = Math.PI/4.0;
        i++;
    }

    // left and right sides
    for (z = -4;z < 12;z+=8) {
        var geom = new THREE.Geometry();
        geom.vertices.push(new THREE.Vector3(z,-4, 0));
        geom.vertices.push(new THREE.Vector3(z, 4, 0));
        geom.vertices.push(new THREE.Vector3(z, -4,  8));
        geom.vertices.push(new THREE.Vector3(z,  4,  8));
        var normal = new THREE.Vector3(0, 0, 1);
        var face = new THREE.Face3(0, 1, 2, normal);
        var face2 = new THREE.Face3(1, 3, 2, normal);
        geom.faces.push(face);
        geom.faces.push(face2);
        cubeFaces[i] = new THREE.Mesh(geom, mat);
        cubeFaces[i].rotation.x = Math.PI/4.0;
        cubeFaces[i].rotation.y = Math.PI/4.0;
        i++;
    }
    // bottom
    var geom = new THREE.Geometry();
    var z = -4;
    geom.vertices.push(new THREE.Vector3(-4, z, 0));
    geom.vertices.push(new THREE.Vector3( 4, z, 0));
    geom.vertices.push(new THREE.Vector3(-4, z,  8));
    geom.vertices.push(new THREE.Vector3( 4, z,  8));
    var normal = new THREE.Vector3(0, 0, 1);
    var face = new THREE.Face3(0, 2, 1, normal);
    var face2 = new THREE.Face3(2, 3, 1, normal);
    geom.faces.push(face);
    geom.faces.push(face2);
    cubeFaces[i] = new THREE.Mesh(geom, mat);
    cubeFaces[i].rotation.x = Math.PI/4.0;
    cubeFaces[i].rotation.y = Math.PI/4.0;
    i++;
    var cnt = i;
    console.log(cnt);
    // light
    //   args: color, intensity, range (0 if limitless)
    var light = new THREE.PointLight(0xFFFFFF, 1, 1000 );
    // var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-8, -10, 10);
    var ambientLight = new THREE.AmbientLight(0x222222);

    scene.add(light);
    scene.add(ambientLight);
    for (i = 0;i < cnt;i++) {
        scene.add(cubeFaces[i]);
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
    renderer.setClearColor(0xFFFFFF, 1.0);

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, 0, 40);
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