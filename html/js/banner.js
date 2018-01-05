$(document).ready(function() {

    init();
    animate();
});

var controls = [];

function initKonami()
{
    $('html, body').animate({
        scrollTop: 0
    }, 400, function() {
        $('#cube').addClass('konamied');
    });

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

function keyDown(e)
{
    console.log('down '  + e.keyCode);
    controls[e.keyCode] = true;
}

function keyUp(e)
{
    console.log('up ' + e.keyCode);
    controls[e.keyCode] = false;
}

function konamiControls()
{
    if (controls !== undefined) 
    {
        // console.log(controls);

        // esc
        if (controls[27])
        {
            $('#cube').removeClass('konamied');
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyUp', keyUp);
            enableScroll();
        }

        // up arrow
        if (controls[38])
        {
            camera.position.z -= 10;
        }

        // down arrow
        if (controls[40])
        {
            camera.position.z += parseInt(10);
        }
    }
}

var renderer, scene, camera, wireframe, meshDodeca;

function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer({antialias: true});

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('cube').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 800);
    camera.position.x = 200;
    camera.position.y = -50;
    scene.add(camera);

    // Création d'une géométrie wireframe pour le cube
    var geometry = new THREE.CubeGeometry(200,200,200);
    var lineGeometry = new THREE.EdgesGeometry(geometry);

    // matériau uni noir pour le cube
    var material = new THREE.MeshBasicMaterial({
        color: 0x000000
    });

    meshDodeca = new THREE.Mesh(geometry, material);

    scene.add(meshDodeca);

    var line = new MeshLine();
    line.setGeometry(lineGeometry);
    var lineMat = new MeshLineMaterial({
        color: new THREE.Color( 0x777777 ),
        lineWidth: 20
    });
    wireframe = new THREE.LineSegments(lineGeometry, lineMat);

    //meshDodeca.rotation.y = 0.5;
    
    meshDodeca.add(wireframe);

    // on effectue le rendu de la scène
    renderer.render( scene, camera );
}

function animate(){
    requestAnimationFrame( animate );
    konamiControls();
    meshDodeca.rotation.y += 0.003;
    renderer.render( scene, camera );
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}