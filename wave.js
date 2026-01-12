const BIN_SIZE = 86;
const OVERLAP = 40;
const STEP = BIN_SIZE - OVERLAP;

/* 
  OVERSCAN VALUES — THIS IS THE FIX
  These ensure the wave always extends beyond
  ultra-wide screens, 4K, TVs, etc.
*/
const BIN_COUNT = 220;
const START_OFFSET = -3000;

/* WAVE CHARACTER */
const WAVE_HEIGHT = 190;
const SPEED = 0.008;
const BASELINE = 300;

/* OPTICAL ALIGNMENT */
const BIN_VERTICAL_OFFSET = 33;

/* SYSTEM SIZE — MASSIVE ON PURPOSE */
const SYSTEM_WIDTH = 10000;
const SYSTEM_HEIGHT = 700;

/* SVG ELEMENTS */
const svg = document.querySelector(".bin-wave-svg");
const binsGroup = document.querySelector(".bins");
const wavePath = document.getElementById("wave-path");
const maskBg = document.getElementById("mask-bg");
const whiteRegion = document.getElementById("white-region");

/* APPLY DIMENSIONS */
svg.setAttribute("width", SYSTEM_WIDTH);
svg.setAttribute("height", SYSTEM_HEIGHT);

maskBg.setAttribute("width", SYSTEM_WIDTH);
maskBg.setAttribute("height", SYSTEM_HEIGHT);

whiteRegion.setAttribute("width", SYSTEM_WIDTH);
whiteRegion.setAttribute("height", SYSTEM_HEIGHT);

/* STATE */
let phase = 0;
const bins = [];

/* CREATE BINS ONCE */
for (let i = 0; i < BIN_COUNT; i++) {
  const img = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );

  img.setAttribute("href", "/assets/bin.svg");
  img.setAttribute("width", BIN_SIZE);
  img.setAttribute("height", BIN_SIZE);

  binsGroup.appendChild(img);
  bins.push(img);
}

/* ANIMATION LOOP */
function animate() {
  phase += SPEED;

  let path = `M 0 ${BASELINE}`;

  bins.forEach((bin, i) => {
    const x = START_OFFSET + i * STEP;

    const waveY =
      BASELINE +
      Math.sin(phase + i * 0.26) * (WAVE_HEIGHT / 2);

    const binY = waveY - BIN_VERTICAL_OFFSET;

    bin.setAttribute(
      "transform",
      `translate(${x}, ${binY})`
    );

    path += ` L ${x} ${waveY}`;
  });

  path += ` L ${SYSTEM_WIDTH} ${SYSTEM_HEIGHT} L 0 ${SYSTEM_HEIGHT} Z`;
  wavePath.setAttribute("d", path);

  requestAnimationFrame(animate);
}

animate();