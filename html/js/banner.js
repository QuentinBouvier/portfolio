var renderer, scene, camera, wireframe, meshDodeca;


init();
animate();

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
    
    // on créé un  cube au quel on définie un matériau puis on l’ajoute à la scène 
    // var geometry = new THREE.CubeGeometry( 200, 200, 200 );
    // var geo = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry( geometry )    
    // var material = new THREE.LineBasicMaterial( { color: 0x777777, linewidth: 20 } );   
    // wireframe = new THREE.LineSegments( geo, material );

    // scene.add(wireframe);

    // var line = new MeshLine();
    // line.setGeometry(geometry);
    // var lineMat = new MeshLineMaterial();
    // meshLineCube = new THREE.Mesh( line.geometry, lineMat);

    var geometry = new THREE.CubeGeometry(200,200,200);
    var lineGeometry = new THREE.EdgesGeometry(geometry);

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
    meshDodeca.rotation.y += 0.003;
    renderer.render( scene, camera );
}