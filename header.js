console.log("js file has initially loaded");
console.log("version 3.1.1");
console.log("project: SODERRA");
console.log("property of JOHANNES SODERSTROM");
history.scrollRestoration = "manual";

// LOAD RESET

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


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

const hoverSfx =
    new Audio('./assets/sounds/sfx_hover.mp3');

hoverSfx.volume = 0.3;
hoverSfx.preload = 'auto';

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
    ...document.querySelectorAll('.header-nav a'),
    ...visiblePanels,
    ...document.querySelectorAll('.project-media')
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

    const maxDist = 200;
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


// CATEGORY SCENES

const gear1 = document.querySelector('.gear1');
const gear2 = document.querySelector('.gear2');
const gear3 = document.querySelector('.gear3');
const gear4 = document.querySelector('.gear4');

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    if (gear1) {
        gear1.style.transform =
            `translate(-50%, -50%) rotate(${scroll * 0.05}deg)`;
    }

    if (gear2) {
        gear2.style.transform =
            `translate(-50%, -50%) rotate(${-scroll * 0.2}deg)`;
    }

    if (gear3) {
        gear3.style.transform =
            `translate(-50%, -50%) rotate(${scroll * 0.01}deg)`;
    }

    if (gear4) {
        gear4.style.transform =
            `translate(-50%, -50%) rotate(${-scroll * 0.1}deg)`;
    }

});

const snapPoints = Array.from(
    { length: 20 },
    (_, i) => i * 450
);

const gear =
    new Audio('./assets/sounds/sfx_textl.mp3');

gear.volume = 1;
gear.preload = 'auto';

const snapRange = 150;
const snapStrength = 0.2;
let lastSnapIndex = 0;

function magneticScroll() {

    const y = window.scrollY;

    const currentSnapIndex = Math.round(y / 450);

    if (currentSnapIndex !== lastSnapIndex) {

        gear.currentTime = 0;
        gear.play();

        lastSnapIndex = currentSnapIndex;
    }

    let closest = snapPoints[0];
    let closestDistance = Math.abs(y - closest);

    snapPoints.forEach(point => {

        const distance = Math.abs(y - point);

        if (distance < closestDistance) {
            closest = point;
            closestDistance = distance;
        }

    });

    if (closestDistance < snapRange) {

        const target =
            y + (closest - y) * snapStrength;

        window.scrollTo({
            top: target,
            behavior: 'instant'
        });

    }

    requestAnimationFrame(magneticScroll);

}



magneticScroll();

