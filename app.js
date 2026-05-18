const container = document.querySelector(".hero-text-effect-container");
container.style.height = innerHeight - 5 + "px";

const width = container.offsetWidth;
const height = container.offsetHeight;
let fontMonospace;
let fontDMSans;

const centerX = width / 2;
const centerY = height / 2;
let cellSize = 15;
let spacingX = 70;
let spacingY = 20;

let inc = 0.5;

let zoff = 0;
let zoff2 = 0;
let start = 0;

let frameRateContainer;

const str = [
    "Serverless",
    "Insomnia",
    "Workbench",
    "Figma",
    "RTSP",
    "FabricJS",
    "Nodemailer",
    "ffmpeg",
    "Socket",
    "Razorpay",
    "WebRTC",
    "Git",
    "ElectronJS",
    "Paypal",
    "Linux",
    "Tailwind",
    "PrimNG",
    "SCSS",
    "Docker",
    "Shell",
    "AWS",
    "SQL",
    "MySQL",
    "GCP",
    "Go",
    "gRPC",
    "Redis",
    "Postman",
    "Angular",
    "Stripe",
    "REST",
    "Firebase",
    "Express",
    "API",
    "NodeJS",
    "Typescript",
];
const str2 = `\`!.at,'"\\|{}[]<>?/!@#$%^&*()-=_+`;

function preload() {
    fontMonospace = loadFont("./fonts/SpaceMono-Bold.ttf");
}

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent(container);

    frameRateContainer = createP("");
    frameRateContainer.position(0, 0);
    frameRateContainer.style("color", "white");

    textSize(cellSize);
    textFont(fontMonospace);
    textAlign(LEFT, CENTER);

    fill("#39ff84");
    // stroke("#39ff84");
    noStroke(255);
    strokeWeight(1);

    noiseDetail(8, 0.75);
}

function draw() {
    background(0);

    let yoff = 0;
    for (let y = 0; y < height; y += cellSize + spacingY) {
        let xoff = 0;
        for (let x = 0; x < width; x += cellSize + spacingX) {
            let nx = floor(map(noise(xoff, yoff, zoff), 0, 1, 0, str.length - 1));
            if (calculateDistance({ x, y }) < 250) {
                textSize(cellSize * 2);
                fill("#39ff84");
                spacingX = spacingX * 2;
                spacingY = 40;
            } else {
                spacingX = 70;
                spacingY = 20;
                fill("#39ff8490");
                textSize(cellSize);
            }
            text(str[nx], x, y);
            xoff += inc;
        }
        yoff += inc;
    }
    zoff += 0.00005;
    start += inc;

    frameRateContainer.html(floor(frameRate()));

    // noLoop();
}

function calculateDistance({ x, y }) {
    const dist = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
    // console.log(dist);
    return dist;
}
