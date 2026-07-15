console.log("js file has initially loaded");
console.log("version 3.1.1");
console.log("project: SODERRA");
console.log("property of JOHANNES SODERSTROM");
history.scrollRestoration = "manual";

// LOAD RESET

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

// 3D MODEL FOR SCENE 3 of LANDING PAGE

import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';

import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

// INTRO ANIM
const LtextSfx =
    new Audio('./assets/sounds/sfx_textl.mp3');

LtextSfx.volume = 0.5;
LtextSfx.preload = 'auto';

const RtextSfx =
    new Audio('./assets/sounds/sfx_textr.mp3');

RtextSfx.volume = 0.5;
RtextSfx.preload = 'auto';

const archSfx =
    new Audio('./assets/sounds/sfx_b1.mp3');

const pianoSfx =
    new Audio('./assets/sounds/sfx_b2.mp3');

const lensSfx =
    new Audio('./assets/sounds/sfx_b3.mp3');

const interSfx =
    new Audio('./assets/sounds/sfx_b4.mp3');

archSfx.volume = 0.5;
pianoSfx.volume = 0.5;
lensSfx.volume = 0.5;
interSfx.volume = 0.5;

const assembleSfx =
    new Audio('./assets/sounds/sfx_load.mp3');

assembleSfx.volume = 0.5;
assembleSfx.preload = 'auto';

const clickSfx =
    new Audio('./assets/sounds/sfx_click.mp3');

clickSfx.volume = 0.5;
clickSfx.preload = 'auto';

const hoverSfx =
    new Audio('./assets/sounds/sfx_hover.mp3');

hoverSfx.volume = 0.3;
hoverSfx.preload = 'auto';

const introarch = document.getElementById('arch');
const introinter = document.getElementById('inter');
const introlens = document.getElementById('lens');
const intropiano = document.getElementById('piano');

const introTextLeft =
    document.getElementById('intro-text-left');

const introTextRight =
    document.getElementById('intro-text-right');

const introOverlay = document.getElementById('intro-overlay');

const axisTop = document.getElementById('axis-top');
const axisBottom = document.getElementById('axis-bottom');
const axisLine = document.getElementById('axis-line');

const y = window.innerHeight * 0.25;

let assembled = false;

let introHasPlayed = false;

function setAssemblyState(isAssembled) {

    if (isAssembled) {

        introarch.style.transform = 'translateY(0)';
        introinter.style.transform = 'translateY(0)';
        introlens.style.transform = 'translateY(0)';
        intropiano.style.transform = 'translateY(0)';

    } else {

        introarch.style.transform =
            `translateY(-${y}px)`;

        intropiano.style.transform =
            `translateY(-${y * 0.35}px)`;

        introlens.style.transform =
            `translateY(${y * 0.35}px)`;

        introinter.style.transform =
            `translateY(${y}px)`;

    }

    assembled = isAssembled;
}

document.body.classList.add('intro-lock');
introarch.style.transform =
    `translateY(-${y}px)`;

intropiano.style.transform =
    `translateY(-${y * 0.35}px)`;

introlens.style.transform =
    `translateY(${y * 0.35}px)`;

introinter.style.transform =
    `translateY(${y}px)`;

function startIntro() {

    if (introHasPlayed) return;

    clickSfx.currentTime = 0;
    clickSfx.play();    

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

    setTimeout(() => {

        setTimeout(() => {
            introarch.style.opacity = 1;
            archSfx.currentTime = 0;
            archSfx.play();
        }, duration);

        setTimeout(() => {
            intropiano.style.opacity = 1;
            pianoSfx.currentTime = 0;
            pianoSfx.play();
        }, duration + 150);

        setTimeout(() => {
            introlens.style.opacity = 1;
            lensSfx.currentTime = 0;
            lensSfx.play();
        }, duration + 300);

        setTimeout(() => {
            introinter.style.opacity = 1;
            interSfx.currentTime = 0;
            interSfx.play();
        }, duration + 450);

    }, duration);

    setTimeout(() => {

        introTextLeft.style.opacity = 1;

        LtextSfx.currentTime = 0;
        LtextSfx.play();

    }, duration + 900);

    setTimeout(() => {

        introTextRight.style.opacity = 1;

        RtextSfx.currentTime = 0;
        RtextSfx.play();

    }, duration + 1000);

    setTimeout(() => {

        setAssemblyState(true);

        assembleSfx.currentTime = 0;
        assembleSfx.play();

    }, duration + 3000);

    setTimeout(() => {
        document
            .querySelectorAll('.corner-text')
            .forEach(el => {
                el.style.opacity = 1;
            });
    }, duration + 600);
    
    let current = 0;

    setTimeout(() => {

        document.body.classList.remove('intro-lock');

        introHasPlayed = true;

    }, duration + 3500);

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
       

}

axisTop.addEventListener('click', (e) => {

    e.stopPropagation();

    if (!introHasPlayed) {
        startIntro();
        return;
    }

    assembleSfx.currentTime = 0;
    assembleSfx.play();

    setAssemblyState(!assembled);

});

axisBottom.addEventListener('click', (e) => {

    e.stopPropagation();

    if (!introHasPlayed) {
        startIntro();
        return;
    }
    
    assembleSfx.currentTime = 0;
    assembleSfx.play();

    setAssemblyState(!assembled);

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

let lastX = 0;
let lastY = 0;
let velocity = 0;

let currentScale = 1;
let targetScale = 1;
let hoverActive = false;

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

const visiblePanels = [...document.querySelectorAll('.category-panel.visible')];

const targets = [
    axisTop,
    axisBottom,
    ...document.querySelectorAll('.header-nav a'),
    ...document.querySelectorAll('.project-media'),
    ...visiblePanels
];

targets.forEach(target => {

    if (!target) return;

    const rect = target.getBoundingClientRect();

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

    const distance = Math.sqrt(dx * dx + dy * dy);

    minDistance = Math.min(minDistance, distance);

});

    const maxDist = 100;
    let proximity = Math.max(0, 1 - minDistance / maxDist);

    targetScale = speedScale * (1 - proximity * 0.9);

    if (proximity > 0.5) {

        cursor.classList.add('active');

        if (!hoverActive) {

            hoverActive = true;

            hoverSfx.currentTime = 0;
            hoverSfx.play();

        }

    } else {

        cursor.classList.remove('active');

        hoverActive = false;

}

});

function animateCursor() {

  if (!cursor) return;

  currentScale += (targetScale - currentScale) * 0.06;

  cursor.style.transform = `translate(-50%, -50%) scale(${currentScale})`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

const categoryContainer =
    document.getElementById('category-model-container');

// ANIMATED HUB
const container = document.getElementById('model-container');

if (container) {


    let activeScreen = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const screenOffset = 3.3; // tweak this



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

    renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);


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
                    color: '#d4d4d4',
                });

                child.parent.add(outline);

                child.visible = true;
            }

        });

    }

    let screen1;
    let screen2;
    let screen3;
    let screen4;

    loader.load('./assets/models/screen_1.glb', (gltf) => {
        screen1 = gltf.scene;
        convertToOutline(screen1);
        screen1.scale.set(2, 2, 2);
        screen1.position.y = -24;
        scene.add(screen1);
    });

    loader.load('./assets/models/screen_2.glb', (gltf) => {
        screen2 = gltf.scene;
        convertToOutline(screen2);
        screen2.scale.set(2, 2, 2);
        screen2.position.y = -24;
        scene.add(screen2);
    });

    loader.load('./assets/models/screen_3.glb', (gltf) => {
        screen3 = gltf.scene;
        convertToOutline(screen3);
        screen3.scale.set(2, 2, 2);
        screen3.position.y = -24;
        scene.add(screen3);
    });

    loader.load('./assets/models/screen_4.glb', (gltf) => {
        screen4 = gltf.scene;
        convertToOutline(screen4);
        screen4.scale.set(2, 2, 2);
        screen4.position.y = -24;
        scene.add(screen4);
    });

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
    let screen1Rotation = 200;
    let screen2Rotation = 180;
    let screen3Rotation = 180;
    let screen4Rotation = 180;

    function animate() {
        requestAnimationFrame(animate);

        const scroll = window.scrollY;

        const nameOffset =
            Math.min(
                window.innerWidth * 0.03,
                scroll * 0.05
            );

        introTextLeft.style.transform =
            `translate(calc(-100% - ${nameOffset}px), -50%)`;

        introTextRight.style.transform =
            `translate(${nameOffset}px, -50%)`;

        if (screen1) {
            screen1Rotation += (
                (scroll * -0.0027 + screenOffset)
                - screen1Rotation
            ) * 0.05;

            screen1.rotation.y = screen1Rotation;
        }
        
        if (screen2) {
            screen2Rotation += (
                (scroll * -0.003 + screenOffset)
                - screen2Rotation
            ) * 0.05;

            screen2.rotation.y = screen2Rotation;
        }

        if (screen3) {
            screen3Rotation += (
                (scroll * -0.0033 + screenOffset)
                - screen3Rotation
            ) * 0.05;

            screen3.rotation.y = screen3Rotation;
        }

        if (screen4) {
            screen4Rotation += (
                (scroll * -0.0034 + screenOffset)
                - screen4Rotation
            ) * 0.05;

            screen4.rotation.y = screen4Rotation;
        }

        const screens = [
            screen1,
            screen2,
            screen3,
            screen4
        ].filter(Boolean);

        activeScreen = null;

        screens.forEach(screen => {

            const worldPos = new THREE.Vector3();

            screen.getWorldPosition(worldPos);

            worldPos.project(camera);

            if (Math.abs(worldPos.x) < 0.08) {
                activeScreen = screen;
            }

        });

        
        
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
}

// PAGE TRANSITIONS ----------------------------------------------------------------- //

document.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', (e) => {

        const href = link.getAttribute('href');

        if (!href || href.startsWith('#')) {
            return;
        }

        e.preventDefault();

        document.body.classList.add('page-transition');

        setTimeout(() => {
            window.location.href = href;
        }, 400);

    });

});

// PANELS

const panel = document.getElementById("panel-inter");
const panelTitle = document.getElementById("panel-title");
const panelTL = document.getElementById("panel-tl");
const panelTR = document.getElementById("panel-tr");
const panelBL = document.getElementById("panel-bl");
const panelBR = document.getElementById("panel-br");

window.addEventListener("scroll", () => {
    
    const scene3 =
        document.querySelector(".scene-3");

    const rect =
        scene3.getBoundingClientRect();

    const sceneHeight =
        rect.height - window.innerHeight;

    const progress =
        Math.max(
            0,
            Math.min(
                1,
                -rect.top / sceneHeight
            )
        );
            
    if (progress >= 0.13 && progress < 0.30) {

        panel.href = "proj-interactive.html";
        panelTitle.textContent = "INTERACTIVE MEDIA";

        panelTL.innerHTML =
            "INTERACTIVE<br>MEDIA";

        panelTR.innerHTML =
            "2025-2026<br>ACTIVE";

        panelBL.innerHTML =
            "PROJECT COUNT<br>ONGOING";

        panelBR.innerHTML =
            "CLICK PANEL<br>TO VIEW WORK";

        panel.classList.add("visible");

    
    }

    else if (progress >= 0.35 && progress < 0.50) {

        panel.href = "proj-arch.html";
        panelTitle.textContent = "ARCHITECTURAL DESIGN";

        panelTL.innerHTML =
            "ARCHITECTURE<br>DESIGN";

        panelTR.innerHTML =
            "2021–2026<br>ACTIVE";

        panelBL.innerHTML =
            "THEORETICAL<br>DESIGN WORK";

        panelBR.innerHTML =
            "CLICK PANEL<br>TO VIEW WORK";

        panel.classList.add("visible");

    }

    else if (progress >= 0.55 && progress < 0.70) {

        panel.href = "proj-photo.html";
        panelTitle.textContent = "ART AND VISUAL MEDIA";

        panelTL.innerHTML =
            "CONCEPT ARTWORK<br>CREATION";

        panelTR.innerHTML =
            "2019–2026<br>ACTIVE";

        panelBL.innerHTML =
            "INDIVIDUAL<br>WORKS";

        panelBR.innerHTML =
            "CLICK PANEL<br>TO VIEW WORK";

        panel.classList.add("visible");

    }

    else if (progress >= 0.75 && progress < 0.95) {

        panel.href = "proj-music.html";
        panelTitle.textContent = "MUSIC AND AUDIO";

        panelTL.innerHTML =
            "MUSIC PRODUCTION<br>AND SOUND DESIGN";

        panelTR.innerHTML =
            "2018–2026<br>ACTIVE";

        panelBL.innerHTML =
            "COMPOSITION AND<br>ARRANGEMENT";

        panelBR.innerHTML =
            "CLICK PANEL<br>TO VIEW WORK";

        panel.classList.add("visible");

    }

    else {
    panel.classList.remove("visible");
    }

});





// DEBUG

window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    
});

// document.getElementById("panel-inter").addEventListener("click", () => {
//     console.log("clicked");
// });


// SNAPPING SCROLL

// const snapPoints = [1200, 1600, 1920, 2320];
// const snapRange = 250;      // distance at which attraction starts
// const snapStrength = 0.02;  // higher = stronger pull

// function magneticScroll() {
//     const y = window.scrollY;

//     let closest = snapPoints[0];
//     let closestDistance = Math.abs(y - closest);

//     snapPoints.forEach(point => {
//         const distance = Math.abs(y - point);

//         if (distance < closestDistance) {
//             closest = point;
//             closestDistance = distance;
//         }
//     });

//     if (closestDistance < snapRange) {
//         const target = y + (closest - y) * snapStrength;

//         window.scrollTo({
//             top: target,
//             behavior: "instant"
//         });
//     }

//     requestAnimationFrame(magneticScroll);
// }

// magneticScroll();

