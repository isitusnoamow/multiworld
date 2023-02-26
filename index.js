let timer;
let playing = false;
let framesperchange = 30;
// set inner height and width based on screen size
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;// global vars
let scene, camera, renderer, controls, mesh, projector, materials, wireframe;
let objects = [];

init()

update()

function init(){
    timer = 0;
    scene = new THREE.Scene({ antialias: true });
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(45, winWidth / winHeight, 0.01, 1000);
    camera.position.set(0, 0, 1.5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(winWidth, winHeight);
    document.getElementById("three").appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, document.getElementById("three"));


    scene.remove(mesh);
    scene.remove(wireframe)

    let geometry = new THREE.SphereGeometry(0.5,64,64)
    let material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    mesh = new THREE.Mesh(geometry, material);
    wireframe = new THREE.WireframeHelper(mesh);
    generateRandom()
    scene.add(wireframe);
    scene.add(mesh);
    objects = [];
    objects.push(mesh);



    window.addEventListener('resize', onWindowResize);
}

function generateRandom(){
    for (let i = 0; i < 4096; i++) {
        let color = Math.floor(Math.random() * 5)
        if (color === 0) {
            mesh.geometry.faces[i].color.setHex(0x005f00);
        } else if (color === 1) {
            mesh.geometry.faces[i].color.setHex(0x004f00);
        } else if (color === 2) {
            mesh.geometry.faces[i].color.setHex(0x00007f);
        } else if (color === 3) {
            mesh.geometry.faces[i].color.setHex(0x00007f);
        } else if (color === 4) {
            mesh.geometry.faces[i].color.setHex(0x555500);
        }
        mesh.geometry.colorsNeedUpdate = true;
    }
}

function onWindowResize() {
    camera.aspect = winWidth / winHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(winWidth, winHeight);
}

function update() {
    requestAnimationFrame(update);
    controls.update();
    renderer.render(scene, camera);
    if (timer === (framesperchange - 1)) {
        timer = 0;
    } else {
        timer++;
    }
}