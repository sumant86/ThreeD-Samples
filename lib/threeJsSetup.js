var scene, camera, renderer, controls, cameraPresp;
var objects = [];
var displayLable;
var init = function(cameraType, renderType, callScene, bgColor) {
    scene = new THREE.Scene();
    if (cameraType == "PerspectiveCamera") {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 0;
        camera.position.y = 150;
        camera.position.z = 220;
    } else {
        camera = new THREE.OrthographicCamera(window.innerWidth / -4, window.innerWidth / 4, window.innerHeight / 4, window.innerHeight / -4, 0.1, 1000);
        camera.position.x = 150;
        camera.position.y = 50;
        camera.position.z = 250;
    }
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({antialias: true});
    } else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setClearColor(bgColor, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#MyCanvas").append(renderer.domElement);
    getScene(callScene);
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.addEventListener('change', render);
    window.addEventListener('resize', onWindowResize, true);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
};
var animate = function(animation) {
    requestAnimationFrame(animate);
    controls.update();
    render();
};

var render = function() {
    renderer.render(scene, camera);
};
var onWindowResize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
};
var getScene = function(callScene) {
    if (callScene == "stackChart") {
        stackChart();
    }
};
var ajaxLoader = {
    fetch: function(param, callBack) {
        $.ajax(param).done(callBack);
    }
};