// standard global variables
var scene, camera, renderer, controls, cube, cubeScore;
var keyboard = new THREEx.KeyboardState();

function init() {

    scene = new THREE.Scene();
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);    // position and point the camera to the center of the scene
    camera.position.set(0, 150, 400);
    camera.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);


    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);


    // create the ground plane


    var groundTexture = new THREE.TextureLoader().load('images/floor.jpg');
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(1, 10);
    var groundMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: groundTexture,
        vertexColors: THREE.NoColors,
        side: THREE.BackSide
    });
    var groundGeometry = new THREE.PlaneGeometry(250, 10000);
    var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.y = 0;
    groundMesh.rotation.x = Math.PI / 2.0;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    var transparency = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
    var gameScore = 0;
    var updateFcts	= [];
    var dynamicTexture	= new THREEx.DynamicTexture(512,512);
    dynamicTexture.context.font	= "bolder 200px Verdana";
    dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
    updateFcts.push(function(){
        dynamicTexture.clear('white')
            .drawText(gameScore, undefined, 256, 'black')
    });

    updateFcts.push(function(){
        renderer.render( scene, camera );
    });

    var lastTimeMsec= null;
    requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
        lastTimeMsec	= nowMsec;
        // call each update function
        updateFcts.forEach(function(updateFn){
            updateFn(deltaMsec/1000, nowMsec/1000)
        })
    });

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
    var cubeScoreGeometry = new THREE.BoxGeometry(11000, 11000, 1);
    var cubeGeometry2 = new THREE.BoxGeometry(40, 40, 40);
    var lineGeometry = new THREE.BoxGeometry(10, 50, 10000);
    var cGeometry = new THREE.SphereGeometry(30, 30, 30);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xff0000});
    var cubeScoreMaterial =  new THREE.MeshBasicMaterial({
        map	: dynamicTexture.texture
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubeScore = new THREE.Mesh(cubeScoreGeometry, cubeScoreMaterial);
    cube.position.set(0, 25.1, 4800);
    cubeScore.position.set(-8000, -4125.1, -14900);
    scene.add(cube);
    scene.add(cubeScore);

    var finishTexture = new THREE.TextureLoader().load('images/finish.png');
    var finishGeometry = new THREE.BoxGeometry(250, 50, 70);
    var materialFinish = new THREE.MeshBasicMaterial({map: finishTexture, overdraw: 0.5});
    var finish = new THREE.Mesh(finishGeometry, materialFinish);
    finish.position.set(0, -24, -4000);
    scene.add(finish);
    scene.updateMatrixWorld(true);


    function gameOver() {
        var gameOverTexture = new THREE.TextureLoader().load('images/game_over.jpg');
        var gameOverGeometry = new THREE.BoxGeometry(100, 100, 100);
        var gameOverMaterial = new THREE.MeshBasicMaterial({map: gameOverTexture, overdraw: 0.5});
        var gameOver = new THREE.Mesh(gameOverGeometry, gameOverMaterial);
        gameOver.position.set(0, 100, -100);
        scene.add(gameOver);
    }

    function winner() {
        var winnerTexture = new THREE.TextureLoader().load('images/winner.jpg');
        var winnerGeometry = new THREE.BoxGeometry(100, 100, 100);
        var winnerMaterial = new THREE.MeshBasicMaterial({map: winnerTexture, overdraw: 0.5});
        var winner = new THREE.Mesh(winnerGeometry, winnerMaterial);
        winner.position.set(0, 100, -100);
        scene.add(winner);
    }



    var line = new THREE.Mesh(lineGeometry, transparency);
    var line2 = new THREE.Mesh(lineGeometry, transparency);
    line.position.set(120, 28, 10);
    line2.position.set(-120, 28, 10);
    scene.add(line, line2);

    var scoreGeometry = new THREE.BoxGeometry(200, 5, 5);
    var cubexScore, cubex2Score, cubex3Score, cubex4Score, cubex5Score, cubex6Score;

    var cubexRandomMaterial;
    function randomColor(){
        cubexRandomMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xff0000});
        return cubexRandomMaterial
    }

    var cubex = new THREE.Mesh(cGeometry, randomColor());
    cubexScore = new THREE.Mesh(scoreGeometry, transparency);
    cubex.position.set(-50, 30, 500);
    cubexScore.position.set(0, 30, 450);


    var cubex2 = new THREE.Mesh(cubeGeometry, randomColor());
    cubex2Score = new THREE.Mesh(scoreGeometry, transparency);
    cubex2.position.set(-50, 40, 3000);
    cubex2Score.position.set(0, 40, 2950);


    var cubex3 = new THREE.Mesh(cGeometry, randomColor());
    cubex3Score = new THREE.Mesh(scoreGeometry, transparency);
    cubex3.position.set(-50, 30, 2000);
    cubex3Score.position.set(0, 30, 1950);


    var cubex4 = new THREE.Mesh(cubeGeometry, randomColor());
    cubex4Score = new THREE.Mesh(scoreGeometry, transparency);
    cubex4.position.set(50, 40, 1000);
    cubex4Score.position.set(0, 40, 950);


    var cubex5 = new THREE.Mesh(cGeometry, randomColor());
    cubex5Score = new THREE.Mesh(scoreGeometry, transparency);
    cubex5.position.set(0, 30, 2500);
    cubex5Score.position.set(0, 30, 2450);


    var cubex6 = new THREE.Mesh(cubeGeometry, randomColor());
    cubex6Score = new THREE.Mesh(scoreGeometry, transparency);
    cubex6.position.set(-50, 40, 1500);
    cubex6Score.position.set(0, 40, 1450);
    scene.add(cubex, cubex2, cubex3, cubex4, 
        cubex5, cubex6, cubexScore, cubex2Score,
        cubex3Score, cubex4Score, cubex5Score, cubex6Score);




    var figures = [];
    var cubes = [];
    var finished = [];
    var score = [];




    figures.push(cubex, cubex2, cubex3, cubex4, cubex5, cubex6, line, line2);
    score.push(cubexScore, cubex2Score, cubex3Score, cubex4Score, cubex5Score, cubex6Score);
    cubes.push(cubex2, cubex4, cubex6);
    finished.push(finish);

    //create spotlight
    var light = new THREE.HemisphereLight(0xffffff, 0x003300, 1);
    light.position.set(-80, 500, 50);
    scene.add(light);


    var step = 0;



    function renderScene() {
        for (var i = 0; i < cubes.length; i++) {
            cubes[i].rotation.x += 0.02;
            cubes[i].rotation.y += 0.02;
            cubes[i].rotation.z += 0.02;
        }

        step += 0.05;
        cubex3.position.x = 100 * Math.cos(step);
        cubex.position.x = 100 * Math.cos(step);
        cubex5.position.y = 30 + (150 * Math.abs(Math.sin(step)));


        var moveSpeed = 20;
        var moveLeftRight = 1;


        if (keyboard.pressed("W"))
            cube.translateZ(-moveSpeed);
        if (keyboard.pressed("A") && keyboard.pressed("W"))
            cube.translateX(-moveLeftRight);
        if (keyboard.pressed("D") && keyboard.pressed("W"))
            cube.translateX(moveLeftRight);




        var originPoint = cube.position.clone();
        for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++) {
            var localVertex = cube.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(cube.matrix);
            var directionVector = globalVertex.sub(cube.position);

            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects(figures);
            var collisionResults2 = ray.intersectObjects(finished);
            var collisionResults3 = ray.intersectObjects(score);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                cube = new THREE.Mesh(cubeGeometry2, cubeMaterial);
                gameOver()

            }
            if (collisionResults2.length > 0 && collisionResults2[0].distance < directionVector.length()) {
                cube = new THREE.Mesh(cubeGeometry2, cubeMaterial);
                winner()

            }
            if (collisionResults3.length > 0 && collisionResults3[0].distance < directionVector.length()) {
                gameScore +=50;
                console.log(gameScore);

            }
        }




        var relativeCameraOffset = new THREE.Vector3(0, 100, 200);
        var cameraOffset = relativeCameraOffset.applyMatrix4(cube.matrixWorld);
        camera.position.x = cameraOffset.x;
        camera.position.y = cameraOffset.y;
        camera.position.z = cameraOffset.z;
        camera.lookAt(cube.position);

        // camera.position.y = 90;
        // camera.position.z = 3530;


        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);
        render();
    }

    function render() {
        renderer.render(scene, camera);

    }

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);

    // call the render function
    renderScene();
}


window.onload = init;