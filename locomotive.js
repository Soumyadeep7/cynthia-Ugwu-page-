// =======================================================
// LOCOMOTIVE SCROLL + GSAP + INTERACTIONS
// =======================================================

document.documentElement.classList.add("js-loading");

// -------------------------------------------------------
// Locomotive Scroll init
// -------------------------------------------------------
const scrollContainer = document.querySelector("[data-scroll-container]");

const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.085,
    multiplier: 1,
    getDirection: true,
    getSpeed: true,
    smartphone: {
        smooth: false
    },
    tablet: {
        smooth: true
    }
});

window.addEventListener("load", () => {
    scroll.update();
    document.documentElement.classList.remove("js-loading");
});

// Keep scroll updated
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => scroll.update(), 300);
});

document.querySelectorAll("img").forEach(img => {
    if (img.complete) scroll.update();
    else img.addEventListener("load", () => scroll.update(), { once: true });
});

// -------------------------------------------------------
// HERO ANIMATION
// -------------------------------------------------------
function firstPageAnim() {
    const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    tl.from("#nav", {
        y: -40,
        opacity: 0,
        duration: 1
    })
    .to(".boundingelem", {
        y: 0,
        duration: 1.6,
        stagger: 0.12,
        ease: "expo.out"
    }, "-=0.6")
    .from("#herofooter", {
        y: 30,
        opacity: 0,
        duration: 1
    }, "-=1");
}

// -------------------------------------------------------
// MOUSE FOLLOWER
// -------------------------------------------------------
function circleMouseFollower() {
    const circle = document.querySelector("#minicircle");
    if (!circle) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const speed = 0.18;

    window.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        posX += (mouseX - posX) * speed;
        posY += (mouseY - posY) * speed;

        circle.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        requestAnimationFrame(animate);
    }

    animate();
}

// -------------------------------------------------------
// PROJECT HOVER IMAGE FOLLOW
// -------------------------------------------------------
document.querySelectorAll(".elem").forEach(elem => {
    const img = elem.querySelector("img");
    if (!img) return;

    let lastX = 0;

    elem.addEventListener("mouseenter", () => {
        gsap.to(img, { opacity: 0.22, duration: 0.4 });
    });

    elem.addEventListener("mouseleave", () => {
        gsap.to(img, {
            opacity: 0,
            duration: 0.4,
            rotate: 0
        });
    });

    elem.addEventListener("mousemove", e => {
        const bounds = elem.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const rotation = gsap.utils.clamp(-15, 15, e.clientX - lastX);
        lastX = e.clientX;

        gsap.to(img, {
            x: x - bounds.width / 2,
            y: y - bounds.height / 2,
            rotate: rotation,
            duration: 0.3,
            ease: "power3.out"
        });
    });
});

// -------------------------------------------------------
// INIT
// -------------------------------------------------------
firstPageAnim();
circleMouseFollower();

// Safety update for Locomotive after animations
setTimeout(() => scroll.update(), 800);
