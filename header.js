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