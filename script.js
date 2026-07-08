console.log("script loaded");

// 3D MODEL FOR SCENE 3 of LANDING PAGE


import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const container = document.getElementById('model-container');

console.log(container);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);


import { GLTFLoader } from './libs/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(
    './assets/models/cylinder.glb',
    function (gltf) {
        const model = gltf.scene;

        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);

        scene.add(model);

        animate();

        function animate() {
            requestAnimationFrame(animate);

            model.rotation.y += 0.01;

            renderer.render(scene, camera);
        }
    },
    undefined,
    function (error) {
        console.error(error);
    }
);


camera.position.z = 3;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

renderer.setClearColor(0xff0000);

animate();
