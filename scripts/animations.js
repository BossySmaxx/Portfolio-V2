/* ── CURSOR ── */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
});

// .tamagotchi-eyes animation
const tamagotchiEyes = document.querySelector(".tamagotchi-eye");
const tamagotchiEyesVariations = [
    "│   ▓  ║ ◉  (_..)  ◉  ║  ▓   │",
    "│   ▓  ║  -  (_..)  -  ║  ▓   │",
    "│   ▓  ║   _  (_..)  _ ║  ▓   │",
    "│   ▓  ║ °  (_..)  °   ║  ▓   │",
    "│   ▓  ║ ◉  (_..)  ◉  ║  ▓   │", // Normal
    "│   ▓  ║ ─   (_..)   ─  ║ ▓   │", // Blink (closed)
    "│   ▓  ║ ◔  (z.z)  ◔  ║  ▓   │", // Sleepy
    "│   ▓  ║ O  (!.!)  O  ║   ▓   │", // Surprised
    "│   ▓  ║ ^  (^.^)  ^  ║   ▓   │", // Happy
    "│   ▓  ║ ◉  (T.T)  ◉  ║  ▓   │", // Sad
    "│   ▓  ║ >  (>.#)  <  ║   ▓   │", // Angry
    "│   ▓  ║ ─   (_..)  ◉  ║  ▓  │", // Wink
    "│   ▓  ║ ◉  (.._)  ◉  ║  ▓   │", // Nose left
    "│   ▓  ║ ◉  (_..)  ◉  ║  ▓   │", // Nose right
    "│   ▓  ║ ◉  (._.)  ◉  ║  ▓   │", // Nose center
    "│   ▓  ║ ◐  (_..)  ◐  ║  ▓   │", // Look left
    "│   ▓  ║ ◑  (_..)  ◑  ║  ▓   │", // Look right
    "│   ▓  ║ @  (_..)  @   ║  ▓   │", // Dizzy
    "│   ▓  ║ ◉  (o.o)  ◉  ║  ▓   │", // Talking
    "│   ▓  ║ ;  (T.T)  ;   ║  ▓   │", // Crying
    "│   ▓  ║ ▬  (─.─)  ▬   ║  ▓   │", // Cool
    "│   ▓  ║ ♡  (^.^)  ♡   ║  ▓   │", // In love
    "│   ▓  ║ ◉  (~.?)  ◉  ║  ▓   │", // Confused
];

// Eye variations animations
function changeEyes() {
    tamagotchiEyes.innerHTML = tamagotchiEyesVariations[Math.floor(Math.random() * tamagotchiEyesVariations.length)];
    const nextTime = getRandom(500, 3000);
    setTimeout(changeEyes, nextTime);
}
changeEyes();

(function animateCursor() {
    console.log();

    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";

    requestAnimationFrame(animateCursor);
})();

/* ── TYPEWRITER ── */
const roles = ["Backend Engineer_", "Frontend Developer_", "API Architect_", "Angular Specialist_", "Full Stack Engineer_", "MEAN stack (MySQL, Express, Angular, Node.js)_"];
let ri = 0,
    ci = 0,
    deleting = false;

const tw = document.getElementById("typewriter");
function typeLoop() {
    const current = roles[ri];
    if (!deleting) {
        tw.textContent = current.slice(0, ++ci);
        if (ci === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
        setTimeout(typeLoop, 70);
    } else {
        tw.textContent = current.slice(0, --ci);
        if (ci === 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
            setTimeout(typeLoop, 350);
            return;
        }
        setTimeout(typeLoop, 35);
    }
}
setTimeout(typeLoop, 800);

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.1 },
);
revealEls.forEach((el) => revealObs.observe(el));

/* ── SKILL BARS ── */
const skillBars = document.querySelectorAll(".skill-bar-fill");
const skillObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const w = e.target.getAttribute("data-width");
                e.target.style.width = w + "%";
                skillObs.unobserve(e.target);
            }
        });
    },
    { threshold: 0.4 },
);
skillBars.forEach((b) => skillObs.observe(b));

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const navObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                navLinks.forEach((l) => {
                    l.style.color = l.getAttribute("href") === "#" + e.target.id ? "var(--phosphor)" : "";
                });
            }
        });
    },
    { threshold: 0.4 },
);
sections.forEach((s) => navObs.observe(s));

// tamagotchi screen border effect
// const tamagotchiContainer = document.querySelector(".tamagotchi-container");
// const lightBeam = document.querySelector(".light-beam");
// tamagotchiContainer.addEventListener("pointermove", (e) => {
//     // const centerX = tamagotchiContainer.cli / 2;
//     // const centerY = tamagotchiContainer.offsetY / 2;
//     const mx = e.offsetX;
//     const my = e.offsetY;
//     // console.log(tamagotchiContainer.clientTop, mx, my);
//     lightBeam.style.transform = `translate(${mx}px, ${my}px)`;
//     // const dist = calculateDistance2({ x1: centerX, y1: centerY, x2: mx, y2: my });
// });
