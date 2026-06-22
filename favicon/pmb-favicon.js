const size = 32;

const canvas = document.createElement("canvas");
canvas.width = size;
canvas.height = size;

const ctx = canvas.getContext("2d");

const favicon =
document.querySelector("link[rel='icon']") ||
document.head.appendChild(document.createElement("link"));

favicon.rel = "icon";

let t = 0;

// 0 ? 1 ? 0 loop every 2 seconds
const cycleTime = 2000;

function getProgress(ms){
    return (ms % cycleTime) / cycleTime;
}

// ping-pong (left to right then back)
function getScannerX(p){
    return p < 0.5
        ? p * 2
        : (1 - p) * 2;
}

let dotBounce = 0;

function drawBackground(){
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0,0,size,size);
}

// cyan dot with subtle float + bounce
function drawDot(){

    const float = Math.sin(t / 200) * 0.8;
    const bounce = Math.max(0, dotBounce);

    const y = 16 + float - bounce;

    ctx.fillStyle = "#00ffff";

    ctx.beginPath();
    ctx.arc(16, y, 2.4, 0, Math.PI * 2);
    ctx.fill();

    // tiny glow
    ctx.fillStyle = "rgba(0,255,255,0.4)";
    ctx.beginPath();
    ctx.arc(16, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
}

// red vertical scanner line
function drawScanner(x){

    const px = Math.floor(x * size);

    // thickness starts at 2px (your requirement)
    const w = 2;

    ctx.fillStyle = "rgba(255,0,0,0.9)";
    ctx.fillRect(px - w/2, 0, w, size);

    // glow tail
    ctx.fillStyle = "rgba(255,0,0,0.25)";
    ctx.fillRect(px - 4, 0, 8, size);
}

// collision logic (scanner passes center)
function updateBounce(scannerX){

    const px = scannerX * size;

    if(Math.abs(px - 16) < 1.2){
        dotBounce = 3; // trigger bounce
    }

    dotBounce *= 0.85; // decay
}

function loop(ms){

    t = ms;

    const p = getProgress(ms);
    const scannerX = getScannerX(p);

    updateBounce(scannerX);

    drawBackground();
    drawScanner(scannerX);
    drawDot();

    favicon.href = canvas.toDataURL("image/png");

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);