console.log("subpage.js loaded");

// PAGE FADE IN

window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    const fades = document.querySelectorAll(".fade");

    fades.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add("show");
        }, i * 300);
    });
});

// PAGE TRANSITIONS

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", (e) => {

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:")
        ) {
            return;
        }

        e.preventDefault();

        document.body.classList.add("page-transition");

        setTimeout(() => {
            window.location.href = href;
        }, 400);

    });

});

// CURSOR

const cursor = document.querySelector(".cursor-glass");
const links = document.querySelectorAll(".header-nav a");

let lastX = 0;
let lastY = 0;
let velocity = 0;

let currentScale = 1;
let targetScale = 1;

document.addEventListener("mousemove", (e) => {

    if (!cursor) return;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    velocity = Math.sqrt(dx * dx + dy * dy);

    lastX = e.clientX;
    lastY = e.clientY;

    let speedScale = Math.max(
        0.5,
        1 - velocity / 80
    );

    let minDistance = Infinity;

    links.forEach(link => {

        const rect = link.getBoundingClientRect();

        const dx = Math.max(
            rect.left - e.clientX,
            0,
            e.clientX - rect.right
        );

        const dy = Math.max(
            rect.top - e.clientY,
            0,
            e.clientY - rect.bottom
        );

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        minDistance = Math.min(
            minDistance,
            distance
        );

    });

    const maxDist = 200;

    const proximity = Math.max(
        0,
        1 - minDistance / maxDist
    );

    targetScale =
        speedScale *
        (1 - proximity * 0.8);

});

function animateCursor() {

    if (!cursor) return;

    currentScale +=
        (targetScale - currentScale) * 0.06;

    cursor.style.transform =
        `translate(-50%, -50%) scale(${currentScale})`;

    requestAnimationFrame(
        animateCursor
    );

}

animateCursor();

// CATEGORY SCENES
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementById('category-model-container');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 40);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const loader = new GLTFLoader();

const gearGroup = new THREE.Group();
scene.add(gearGroup);

gearGroup.rotation.x = Math.PI / 2;

let gears1;
let gears2;

function positionGearGroup() {

    const distance = camera.position.z;

    const vFOV =
        THREE.MathUtils.degToRad(camera.fov);

    const visibleHeight =
        2 * Math.tan(vFOV / 2) * distance;

    const visibleWidth =
        visibleHeight * camera.aspect;

    // center of object sits on left-middle area
    gearGroup.position.set(
        -visibleWidth * 0.5,
        0,
        0
    );

}

loader.load('./assets/models/gears_01.glb', (gltf) => {

    gears1 = gltf.scene;

    gears1.scale.set(10, 10, 10);

    gearGroup.add(gears1);

    renderer.render(scene, camera);

});

loader.load('./assets/models/gears_02.glb', (gltf) => {

    gears2 = gltf.scene;

    gears2.scale.set(10, 10, 10);

    gearGroup.add(gears2);

    renderer.render(scene, camera);

});

positionGearGroup();

renderer.render(scene, camera);

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    positionGearGroup();

    renderer.render(scene, camera);

});