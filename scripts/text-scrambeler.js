// ascii characters
const characters = "!@#$%^&*()_+<█>{}[]~◇"; // ascii char table
const blocks = "░▓█";
// const textElements = document.querySelectorAll(".scramble-text");

function applyScrambleEffect(element) {
    let iteration = 0;
    const targetText = element.dataset.value;

    // Clear prevuious animations
    clearInterval(element.scrambleInterval);

    element.scrambleInterval = setInterval(() => {
        element.innerText = targetText
            .split("")
            .map((char, index) => {
                // If iteration reaches the targetText length it should collapse from chaos to the targetText
                if (iteration >= targetText.length) {
                    return targetText[index];
                }
                // Otherwise, display a random character from the ascii char table
                const seed = Math.floor(Math.random() * characters.length);
                // increases the probablity of blocky chars to appear 10% more
                if (seed <= characters.length / 10) {
                    return blocks[seed];
                }
                return characters[seed];
            })
            .join("");

        // clear the interval once the text is fully revealed
        if (iteration >= targetText.length) {
            clearInterval(element.scrambleInterval);
        }

        // A smaller number (e.g., 1/4) means a longer scramble per character.
        // A larger number (e.g., 1) means it resolves instantly character by character.
        iteration += 1 / 2;
    }, 24); // 30ms interval controls the frame rate of the scramble
}

/* ── Collapse Scrambling Text entropy when in view ── */
const textElementsObservers = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                applyScrambleEffect(e.target);
                observer.unobserve(e.target);
            }
        });
    },
    { threshold: 0.1 },
);
const textElements = document.querySelectorAll(".scramble-text");
textElements.forEach((el) => textElementsObservers.observe(el));
