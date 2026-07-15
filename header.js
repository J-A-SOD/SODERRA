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

const snapRange = 50;
const snapStrength = 0.0;
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

const adSolemImages = [
    "/SODERRA/assets/projects/int_adsolem/img (1).png",
    "/SODERRA/assets/projects/int_adsolem/img (2).png",
    "/SODERRA/assets/projects/int_adsolem/img (3).png",
    "/SODERRA/assets/projects/int_adsolem/img (4).png"
];

const adSolemPreview =
    document.getElementById("ad-solem-preview");

let adSolemIndex = 0;

if (adSolemPreview) {

    setInterval(() => {

        adSolemIndex =
            (adSolemIndex + 1) % adSolemImages.length;

        adSolemPreview.src =
            adSolemImages[adSolemIndex];

    }, 2000);

}


const imleImages = [
    "/SODERRA/assets/projects/int_IMLE/img (1).png",
    "/SODERRA/assets/projects/int_IMLE/img (2).png",
    "/SODERRA/assets/projects/int_IMLE/img (3).png",
    "/SODERRA/assets/projects/int_IMLE/img (4).png"
];

const imlePreview =
    document.getElementById("imle-preview");

let imleIndex = 0;

if (imlePreview) {

    setInterval(() => {

        imleIndex =
            (imleIndex + 1) % imleImages.length;

        imlePreview.src =
            imleImages[imleIndex];

    }, 2000);

}

const kowloonImages = [
    "/SODERRA/assets/projects/int_kowloon/img (1).png",
    "/SODERRA/assets/projects/int_kowloon/img (2).png",
    "/SODERRA/assets/projects/int_kowloon/img (3).png",
    "/SODERRA/assets/projects/int_kowloon/img (4).png"
];

const kowloonPreview =
    document.getElementById("kowloon-preview");

let kowloonIndex = 0;

if (kowloonPreview) {

    setInterval(() => {

        kowloonIndex =
            (kowloonIndex + 1) % kowloonImages.length;

        kowloonPreview.src =
            kowloonImages[kowloonIndex];

    }, 2000);

}

const synthImages = [
    "/SODERRA/assets/projects/int_synth/img (1).png",
    "/SODERRA/assets/projects/int_synth/img (2).png",
    "/SODERRA/assets/projects/int_synth/img (3).png",
    "/SODERRA/assets/projects/int_synth/img (4).png"
];

const synthPreview =
    document.getElementById("synth-preview");

let synthIndex = 0;

if (synthPreview) {

    setInterval(() => {

        synthIndex =
            (synthIndex + 1) % synthImages.length;

        synthPreview.src =
            synthImages[synthIndex];

    }, 2000);

}

const hk01Images = [
    "/SODERRA/assets/projects/pho_hk-city/img (1).jpg",
    "/SODERRA/assets/projects/pho_hk-city/img (2).jpg",
    "/SODERRA/assets/projects/pho_hk-city/img (3).jpg",
    "/SODERRA/assets/projects/pho_hk-city/img (4).jpg"
];

const hk01Preview =
    document.getElementById("hk01-preview");

let hk01Index = 0;

if (hk01Preview) {

    setInterval(() => {

        hk01Index =
            (hk01Index + 1) % hk01Images.length;

        hk01Preview.src =
            hk01Images[hk01Index];

    }, 2000);

}

const hk02Images = [
    "/SODERRA/assets/projects/pho_hk-ground/img (1).jpg",
    "/SODERRA/assets/projects/pho_hk-ground/img (2).jpg",
    "/SODERRA/assets/projects/pho_hk-ground/img (3).jpg",
    "/SODERRA/assets/projects/pho_hk-ground/img (4).jpg"
];

const hk02Preview =
    document.getElementById("hk02-preview");

let hk02Index = 0;

if (hk02Preview) {

    setInterval(() => {

        hk02Index =
            (hk02Index + 1) % hk02Images.length;

        hk02Preview.src =
            hk02Images[hk02Index];

    }, 2000);

}

const mandelImages = [
    "/SODERRA/assets/projects/art_mandel/img (1).jpg",
    "/SODERRA/assets/projects/art_mandel/img (2).jpg",
    "/SODERRA/assets/projects/art_mandel/img (3).jpg",
    "/SODERRA/assets/projects/art_mandel/img (4).jpg"
];

const mandelPreview =
    document.getElementById("mandel-preview");

let mandelIndex = 0;

if (mandelPreview) {

    setInterval(() => {

        mandelIndex =
            (mandelIndex + 1) % mandelImages.length;

        mandelPreview.src =
            mandelImages[mandelIndex];

    }, 2000);

}

const japanImages = [
    "/SODERRA/assets/projects/art_japan/img (1).jpg",
    "/SODERRA/assets/projects/art_japan/img (2).jpg",
    "/SODERRA/assets/projects/art_japan/img (3).jpg",
    "/SODERRA/assets/projects/art_japan/img (4).jpg"
];

const japanPreview =
    document.getElementById("japan-preview");

let japanIndex = 0;

if (japanPreview) {

    setInterval(() => {

        japanIndex =
            (japanIndex + 1) % japanImages.length;

        japanPreview.src =
            japanImages[japanIndex];

    }, 2000);

}

const romeImages = [
    "/SODERRA/assets/projects/art_rome/img (1).jpg",
    "/SODERRA/assets/projects/art_rome/img (2).jpg",
    "/SODERRA/assets/projects/art_rome/img (3).jpg",
    "/SODERRA/assets/projects/art_rome/img (4).jpg"
];

const romePreview =
    document.getElementById("rome-preview");

let romeIndex = 0;

if (romePreview) {

    setInterval(() => {

        romeIndex =
            (romeIndex + 1) % romeImages.length;

        romePreview.src =
            romeImages[romeIndex];

    }, 2000);

}

const cliffImages = [
    "/SODERRA/assets/projects/arch_cliffside/img (1).png",
    "/SODERRA/assets/projects/arch_cliffside/img (2).png",
    "/SODERRA/assets/projects/arch_cliffside/img (3).png",
    "/SODERRA/assets/projects/arch_cliffside/img (4).png"
];

const cliffPreview =
    document.getElementById("cliff-preview");

let cliffIndex = 0;

if (cliffPreview) {

    setInterval(() => {

        cliffIndex =
            (cliffIndex + 1) % cliffImages.length;

        cliffPreview.src =
            cliffImages[cliffIndex];

    }, 2000);

}

const houseImages = [
    "/SODERRA/assets/projects/arch_house/img (3).png",
    "/SODERRA/assets/projects/arch_house/img (4).png",
    "/SODERRA/assets/projects/arch_house/img (5).png",
    "/SODERRA/assets/projects/arch_house/img (6).png"
];

const housePreview =
    document.getElementById("house-preview");

let houseIndex = 0;

if (housePreview) {

    setInterval(() => {

        houseIndex =
            (houseIndex + 1) % houseImages.length;

        housePreview.src =
            houseImages[houseIndex];

    }, 2000);

}

const housingImages = [
    "/SODERRA/assets/projects/arch_housing/img (1).jpg",
    "/SODERRA/assets/projects/arch_housing/img (2).jpg",
    "/SODERRA/assets/projects/arch_housing/img (10).jpg",
    "/SODERRA/assets/projects/arch_housing/img (11).jpg"
];

const housingPreview =
    document.getElementById("housing-preview");

let housingIndex = 0;

if (housingPreview) {

    setInterval(() => {

        housingIndex =
            (housingIndex + 1) % housingImages.length;

        housingPreview.src =
            housingImages[housingIndex];

    }, 2000);

}

const kampungImages = [
    "/SODERRA/assets/projects/arch_kampung/img (1).png",
    "/SODERRA/assets/projects/arch_kampung/img (6).png",
    "/SODERRA/assets/projects/arch_kampung/img (9).png",
    "/SODERRA/assets/projects/arch_kampung/img (10).png"
];

const kampungPreview =
    document.getElementById("kampung-preview");

let kampungIndex = 0;

if (kampungPreview) {

    setInterval(() => {

        kampungIndex =
            (kampungIndex + 1) % kampungImages.length;

        kampungPreview.src =
            kampungImages[kampungIndex];

    }, 2000);

}

const soderraImages = [
    "/SODERRA/assets/projects/int_soderra/img (1).png",
    "/SODERRA/assets/projects/int_soderra/img (2).png",
    "/SODERRA/assets/projects/int_soderra/img (3).png",
    "/SODERRA/assets/projects/int_soderra/img (5).png"
];

const soderraPreview =
    document.getElementById("soderra-preview");

let soderraIndex = 0;

if (soderraPreview) {

    setInterval(() => {

        soderraIndex =
            (soderraIndex + 1) % soderraImages.length;

        soderraPreview.src =
            soderraImages[soderraIndex];

    }, 2000);

}