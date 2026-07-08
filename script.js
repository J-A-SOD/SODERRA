console.log("script loaded");

// 3D MODEL FOR SCENE 3 of LANDING PAGE


import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

// INTRO ANIM


const introOverlay = document.getElementById('intro-overlay');

const axisTop = document.getElementById('axis-top');
const axisBottom = document.getElementById('axis-bottom');
const axisLine = document.getElementById('axis-line');




introOverlay.addEventListener('click', () => {

    const topLabel = document.getElementById('top-label');
    const bottomLabel = document.getElementById('bottom-label');

    const target = window.innerHeight * 0.35;
    const duration = 1200;

    axisTop.style.transform =
        `translateY(-${target}px)`;

    axisBottom.style.transform =
        `translateY(${target}px)`;

    axisLine.style.height =
        `${target * 2}px`;

    let current = 0;

    const interval = setInterval(() => {

        current += target / 60;

        topLabel.innerText = current.toFixed(3);
        bottomLabel.innerText = current.toFixed(3);

        if (current >= target) {

            clearInterval(interval);

            topLabel.innerText = target.toFixed(3);
            bottomLabel.innerText = target.toFixed(3);

        }

    }, 20);

});



// Fade in ------------------------

window.addEventListener("load", () => {
  const fades = document.querySelectorAll(".fade");

  fades.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, i * 300);
  });
});

// CURSOR --------------------------------------------------
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

  let speedScale = Math.max(0.5, 1 - velocity / 80);

  let minDistance = Infinity;

  links.forEach(link => {
    const rect = link.getBoundingClientRect();

    const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
    const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);

    const distance = Math.sqrt(dx * dx + dy * dy);

    minDistance = Math.min(minDistance, distance);
  });

  const maxDist = 200;
  let proximity = Math.max(0, 1 - minDistance / maxDist);

  targetScale = speedScale * (1 - proximity * 0.8);
});

function animateCursor() {

  if (!cursor) return;

  currentScale += (targetScale - currentScale) * 0.06;

  cursor.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

// 


const container = document.getElementById('model-container');

console.log(container);

// ANIMATED INTRO

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

const xOffset = viewportWidth * 0.15;
const yOffset = viewportHeight * 0.25;
const spread = 40;

let anim_arch;
let anim_inter;
let anim_lens;
let anim_piano;

loader.load('./assets/models/anim_arch.glb', (gltf) => {
    anim_arch = gltf.scene;

    anim_arch.position.set(-spread, spread, 0);

    introScene.add(anim_arch);
});

loader.load('./assets/models/anim_inter.glb', (gltf) => {
    anim_inter = gltf.scene;

    anim_inter.position.set(-spread, spread, 0);

    introScene.add(anim_inter);
});

loader.load('./assets/models/anim_lens.glb', (gltf) => {
    anim_lens = gltf.scene;

    anim_lens.position.set(-spread, spread, 0);
    
    introScene.add(anim_lens);
});

loader.load('./assets/models/anim_piano.glb', (gltf) => {
    anim_piano = gltf.scene;

    anim_piano.position.set(-spread, spread, 0);


    introScene.add(anim_piano);
});

const introScene = new THREE.Scene();

// ANIMATED HUB

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(
    25,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});


renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(
    new THREE.Vector2(
        container.clientWidth,
        container.clientHeight
    ),
    scene,
    camera
);

camera.position.z = 103;
const models = [];
const loader = new GLTFLoader();

function convertToOutline(model) {

    model.traverse((child) => {

        if (child.isMesh) {

            const edges = new THREE.EdgesGeometry(
                child.geometry,
                5
            );

                        
            const outline = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({
                    color: '#424242',
                })
            );

            outline.renderOrder = 1;


            outline.position.copy(child.position);
            outline.rotation.copy(child.rotation);
            outline.scale.copy(child.scale);
            
            child.material = new THREE.MeshBasicMaterial({
                color: '#b8b5ab',
            });

            child.parent.add(outline);

            child.visible = true;
        }

    });

}


let staticbase;
let piano;
let speakerlarge;
let speakersmall;
let camerapos;
let cameraneg;
let cameralens;
let arch;
let helix;
let cogsneg;
let cogspos;

// loading the models //
loader.load('./assets/models/staticbase.glb', (gltf) => {
    staticbase = gltf.scene;
    convertToOutline(staticbase);
    staticbase.position.y = -24;
    staticbase.scale.set(2, 2, 2);
    scene.add(staticbase);
});

loader.load('./assets/models/piano.glb', (gltf) => {
    piano = gltf.scene;
    convertToOutline(piano);
    piano.scale.set(2, 2, 2);
    piano.position.y = -24;
    scene.add(piano);
});

loader.load('./assets/models/speakerlarge.glb', (gltf) => {
    speakerlarge = gltf.scene;
    convertToOutline(speakerlarge);
    speakerlarge.scale.set(2, 2, 2);
    speakerlarge.position.y = -24;
    scene.add(speakerlarge);
});

loader.load('./assets/models/speakersmall.glb', (gltf) => {
    speakersmall = gltf.scene;
    convertToOutline(speakersmall);
    speakersmall.scale.set(2, 2, 2);
    speakersmall.position.y = -24;
    scene.add(speakersmall);
});

loader.load('./assets/models/camerapos.glb', (gltf) => {
    camerapos = gltf.scene;
    convertToOutline(camerapos);
    camerapos.scale.set(2, 2, 2);
    camerapos.position.y = -24;
    scene.add(camerapos);
});

loader.load('./assets/models/cameraneg.glb', (gltf) => {
    cameraneg = gltf.scene;
    convertToOutline(cameraneg);
    cameraneg.scale.set(2, 2, 2);
    cameraneg.position.y = -24;
    scene.add(cameraneg);
});

loader.load('./assets/models/cameralens.glb', (gltf) => {
    cameralens = gltf.scene;
    convertToOutline(cameralens);
    cameralens.scale.set(2, 2, 2);
    cameralens.position.y = -24;
    scene.add(cameralens);
});

loader.load('./assets/models/arch.glb', (gltf) => {
    arch = gltf.scene;
    convertToOutline(arch);
    arch.scale.set(2, 2, 2);
    arch.position.y = -24;
    scene.add(arch);
});

loader.load('./assets/models/helix.glb', (gltf) => {
    helix = gltf.scene;
    convertToOutline(helix);
    helix.scale.set(2, 2, 2);
    helix.position.y = -24;
    scene.add(helix);
});

loader.load('./assets/models/cogsneg.glb', (gltf) => {
    cogsneg = gltf.scene;
    convertToOutline(cogsneg);
    cogsneg.scale.set(2, 2, 2);
    cogsneg.position.y = -24;
    scene.add(cogsneg);
});

loader.load('./assets/models/cogspos.glb', (gltf) => {
    cogspos = gltf.scene;
    convertToOutline(cogspos);
    cogspos.scale.set(2, 2, 2);
    cogspos.position.y = -24;
    scene.add(cogspos);
});

let pianoRotation = 0;
let speakerlargeRotation = 0;
let speakersmallRotation = 0;
let cameraposRotation = 0;
let cameranegRotation = 0;
let cameralensRotation = 0;
let archRotation = 0;
let helixRotation = 0;
let cogsnegRotation = 0;
let cogsposRotation = 0;

function animate() {
    requestAnimationFrame(animate);

    const scroll = window.scrollY;

    if (piano) {
        const targetRotation = scroll * 0.002;
        pianoRotation += (targetRotation - pianoRotation) * 0.05;
        piano.rotation.y = pianoRotation;
    }
    
    if (speakerlarge) {
        speakerlargeRotation += (scroll * -0.002 - speakerlargeRotation) * 0.05;
        speakerlarge.rotation.y = speakerlargeRotation;
    }

    if (speakersmall) {
        speakersmallRotation += (scroll * 0.002 - speakersmallRotation) * 0.05;
        speakersmall.rotation.y = speakersmallRotation;
    }   

    if (camerapos) {
        cameraposRotation += (scroll * 0.002 - cameraposRotation) * 0.05;
        camerapos.rotation.y = cameraposRotation;
    }   

    if (cameraneg) {           
        cameranegRotation += (scroll * -0.002 - cameranegRotation) * 0.05;
        cameraneg.rotation.y = cameranegRotation;
    }   

    if (cameralens) {
        cameralensRotation += (scroll * 0.002 - cameralensRotation) * 0.05;
        cameralens.rotation.y = cameralensRotation;
    }   
    
    if (arch) {    
        archRotation += (scroll * 0.002 - archRotation) * 0.05;
        arch.rotation.y = archRotation;
    }

    if (helix) {
        helixRotation += (scroll * 0.001 - helixRotation) * 0.05;
        helix.rotation.y = helixRotation;
    }   

    if (cogsneg) {
        cogsnegRotation += (scroll * 0.002 - cogsnegRotation) * 0.05;
        cogsneg.rotation.y = cogsnegRotation;
    }   

    if (cogspos) {
        cogsposRotation += (scroll * -0.008 - cogsposRotation) * 0.05;
        cogspos.rotation.y = cogsposRotation;
    }

    camera.lookAt(0, camera.position.y, 0);
    composer.render();
}

animate();
