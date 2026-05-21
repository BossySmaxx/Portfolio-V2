const wheel = document.getElementById("dialWheel");
const yearDisplay = document.getElementById("yearValue");

// experiences
const experiences = [
    {
        organization_name: "logicasana",
        role_title: "Solution Engineer",
        startMonth: 5,
        endMonth: 1,
        startYear: 2024,
        endYear: 2026,
        summary: `
            <li>Built the core backend of a wellness SaaS/ERP platform (lookzup.com) using Node.js, MySQL, Redis, and GCP — handling high-volume multi-tenant transactions with RESTful APIs for Wallets, Payments, Inventory, Billing, and Employee management.</li>
            <li>Cut API latency by 30% through MySQL indexing, optimized JOINs, lazy-loaded connection pooling. — also integrated Razorpay and PayPal for both Indian and International customers with webhook reconciliation, auto PDF invoicing, and real-time FCM/WhatsApp/Email notifications.</li>
            <li>Created a pipeline to import data of businesses from previous platform to new Lookzup Platform. Secured sensitive data using AES encryption at rest and kept the platform privacy-compliant across all tenants.</li>
        `,
    },
    {
        organization_name: "colorbracket technologies",
        role_title: "Solution Engineer",
        startMonth: 10,
        endMonth: 5,
        startYear: 2022,
        endYear: 2024,
        summary: `
            <li>Built the full frontend of Cure Mantra, a healthcare platform, using Angular, Tailwind, and SCSS — developed doctor/patient portals with appointment scheduling, advanced doctor search & booking, vitals tracking with charts, family management, online payments, invoice generation, and real-time notifications via WhatsApp, FCM, and Email.</li>
            <li>Developed scalable serverless backend APIs using JavaScript, AWS Lambda, and MySQL for a Medical Tourism platform — handled patient inquiries, hospital listings, and complex lead-management workflows optimized for high-volume international healthcare traffic.</li>
            <li>Engineered a live-streaming pipeline for iSpeck using FFmpeg to transmux RTSP feeds into HLS for browser playback — built interactive overlays on top of live camera feeds for real-time region marking and shape rendering across multiple streams simultaneously.</li>
            <li>Designed a high-throughput PDF reporting pipeline capable of generating reports for thousands of records in real time — also delivered responsive healthcare dashboards with charts, historical medical data visualization, reviews/ratings, and end-to-end payment and invoice workflows.</li>
        `,
    },
    {
        organization_name: "Geeta University - GTH",
        role_title: "Web Developer",
        startMonth: 10,
        endMonth: 8,
        startYear: 2021,
        endYear: 2022,
        summary: `
            <li>Managed and maintained the Geeta University website along with multiple subsidiary websites for associated universities and schools — built and customized WordPress templates using PHP and JavaScript to keep platforms efficient and user-friendly.</li>
            <li>Developed a Visitor Management System for Geeta University — handled end-to-end flow from visitor entry to tracking, built on top of the existing WordPress infrastructure.</li>
            <li>Built and integrated key website features including a Scholarship Calculator and an Events Calendar directly into the Geeta University website — improving student engagement and overall platform utility.</li>
        `,
    },
];

// --- CONTANT VALUES ---
const numTicks = 72;
const degreesPerYear = 50;
const friction = 0.94;
const springConstant = 0.15; // Controls how  "tight" the rubber band is

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
const startYear = 2026;
const minYear = 1999;
const maxYear = 2026;

// Calculating the absolute rotation limits based on the year range
const maxRotation = (maxYear - startYear) * degreesPerYear;
const minRotation = (minYear - startYear) * degreesPerYear;

// --- State variables ---
let currentRotation = 0;
let currentYear = startYear;
let isDragging = false;
let previousAngle = 0;
let currentVelocity = 0;
let animationFrameId = null;

const experiencesContainer = document.querySelector(".experiences-container");
const expYearEle = document.querySelector(".experiences-container .exp-year");
const expCompanyEle = document.querySelector(".experiences-container .exp-company");
const roleTitleEle = document.querySelector(".experiences-container .role-title");
const summaryListEle = document.querySelector(".experiences-container .summary-list");
const timelineNode = document.querySelector(".experiences-container .timeline-node");

// function to update the experiences UI when year changes
function changeExperienceAsPerYear(currentYear) {
    // get exprience details by year
    // console.log(expYearEle, roleTitleEle, summaryListEle);

    const selectedExperienceObj = experiences.find((item) => currentYear >= item.startYear && currentYear <= item.endYear);
    if (selectedExperienceObj) {
        expYearEle.textContent = selectedExperienceObj.startYear.toString().concat(" - ", selectedExperienceObj.endYear);
        roleTitleEle.textContent = selectedExperienceObj.role_title;
        expCompanyEle.textContent = selectedExperienceObj.organization_name;
        summaryListEle.innerHTML = selectedExperienceObj.summary;
    }
}

// --- Creating the draggable wheel ---
for (let i = 0; i < numTicks; i++) {
    const tick = document.createElement("div");
    tick.classList.add("tick");
    if (i % 6 === 0) tick.classList.add("major");
    tick.style.transform = `rotate(${i * (360 / numTicks)}deg)`;
    wheel.appendChild(tick);
}

function getAngle(e) {
    const rect = wheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

// --- Updates the rotatiuon of dial   ---
function updateDial() {
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Calculate what year we *should* be at based on rotation
    let rawYearOffset = Math.round(currentRotation / degreesPerYear);
    let targetYear = startYear + rawYearOffset;

    // Clamp the visual year to our bounds so it doesn't show 2027 while stretching
    let displayYear = Math.max(minYear, Math.min(maxYear, targetYear));

    if (displayYear !== currentYear) {
        let yearDiff = Math.abs(displayYear - currentYear);
        currentYear = displayYear;

        // UI Updates - Add code here for updating anything on the UI whenever a year chages
        yearDisplay.innerText = currentYear;
        yearDisplay.classList.add("changed");

        // UI updates happen here
        changeExperienceAsPerYear(currentYear);

        setTimeout(() => yearDisplay.classList.remove("changed"), 100);
    }
}

// --- Interaction Handlers ---
function startDrag(e) {
    isDragging = true;
    previousAngle = getAngle(e);
    currentVelocity = 0;
    cancelAnimationFrame(animationFrameId);
    document.body.style.cursor = "grabbing";
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const currentAngleValue = getAngle(e);
    let delta = currentAngleValue - previousAngle;

    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    // Apply Resistance (Rubber-banding) if dragging outside bounds
    if (currentRotation > maxRotation || currentRotation < minRotation) {
        delta *= 0.25; // Reduce drag effectiveness by 75%
    }

    currentRotation += delta;
    currentVelocity = currentVelocity * 0.4 + delta * 0.6;

    updateDial();
    previousAngle = currentAngleValue;
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = "default";

    function inertiaLoop() {
        // Apply spring force if outside limits
        if (currentRotation > maxRotation) {
            // Pulls back to maxRotation
            currentVelocity += (maxRotation - currentRotation) * springConstant;
            currentVelocity *= 0.8; // Higher dampening when bouncing back
        } else if (currentRotation < minRotation) {
            // Pulls back to minRotation
            currentVelocity += (minRotation - currentRotation) * springConstant;
            currentVelocity *= 0.8; // Higher dampening when bouncing back
        } else {
            // Normal friction when coasting inside bounds
            currentVelocity *= friction;
        }

        currentRotation += currentVelocity;
        updateDial();

        // Check if it's completely at rest
        let isOutOfBounds = currentRotation > maxRotation + 0.1 || currentRotation < minRotation - 0.1;
        if (Math.abs(currentVelocity) > 0.05 || isOutOfBounds) {
            animationFrameId = requestAnimationFrame(inertiaLoop);
        } else {
            currentVelocity = 0;
            // Snap perfectly to bounds to prevent sub-pixel drifting
            if (currentRotation > maxRotation) currentRotation = maxRotation;
            if (currentRotation < minRotation) currentRotation = minRotation;
            updateDial();
        }
    }
    inertiaLoop();
}

// --- Event Listeners ---
wheel.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", drag);
window.addEventListener("mouseup", endDrag);

wheel.addEventListener("touchstart", startDrag, { passive: false });
window.addEventListener("touchmove", drag, { passive: false });
window.addEventListener("touchend", endDrag);
