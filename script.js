const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const note = document.getElementById("note");

/* YES Button */
yesBtn.addEventListener("click", () => {
    note.classList.remove("hidden");
    startPetals();

    noBtn.style.display = "none"; // ❌ hide NO button
});

/* NO Button Movement */
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

/* Falling Petals Animation */
let petalInterval;

function startPetals() {
    if (petalInterval) return; // prevents multiple loops

    petalInterval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
            const petal = document.createElement("img");
            petal.src = "assets/petal.png";
            petal.className = "petal floating";

            petal.style.left = Math.random() * window.innerWidth + "px";
            petal.style.animationDuration = 4 + Math.random() * 4 + "s";

            document.body.appendChild(petal);

            setTimeout(() => petal.remove(), 9000);
        }
    }, 1000); // every 1 second new petals come
}

/* Fix autoplay on mobile */
document.body.addEventListener("click", () => {
    document.getElementById("bgMusic").play();
});

const music = document.getElementById("bgMusic");

function startMusic() {
    music.play();
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

// 🌸 Cursor / Touch Interaction

function repelPetals(x, y) {
    const petals = document.querySelectorAll(".petal");

    petals.forEach(petal => {
        const rect = petal.getBoundingClientRect();
        const petalX = rect.left + rect.width / 2;
        const petalY = rect.top + rect.height / 2;

        const dx = petalX - x;
        const dy = petalY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 120;

        if (distance < maxDistance) {
            const angle = Math.atan2(dy, dx);
            const pushDistance = (maxDistance - distance) * 0.8;

            petal.style.transform = `
                translate(${Math.cos(angle) * pushDistance}px,
                ${Math.sin(angle) * pushDistance}px)
            `;
        } else {
            petal.style.transform = "translate(0, 0)";
        }
    });
}

// Mouse move
document.addEventListener("mousemove", (e) => {
    repelPetals(e.clientX, e.clientY);
});

// Touch move (mobile)
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    repelPetals(touch.clientX, touch.clientY);
});
