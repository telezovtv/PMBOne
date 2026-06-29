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

// 2 second cycle
const cycleTime = 2000;

// blinking control for dot
let blink = 1;

function progress(ms){
    return (ms % cycleTime) / cycleTime;
}

// ping-pong scanner (0 → 1 → 0)
function scannerPos(p){
    return p < 0.5 ? p * 2 : (1 - p) * 2;
}

// background
function drawBackground(){
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0,0,size,size);
}

// cyan i-dot (bigger + blinking)
function drawDot(){

    // blink every ~500ms
    blink = Math.floor(t / 250) % 2;

    const alpha = blink ? 1 : 0.35;

    ctx.fillStyle = `rgba(0,255,255,${alpha})`;

    // BIGGER BALL (requested)
    ctx.beginPath();
    ctx.arc(16,16,3.2,0,Math.PI*2);
    ctx.fill();

    // glow
    ctx.fillStyle = `rgba(0,255,255,${alpha * 0.4})`;
    ctx.beginPath();
    ctx.arc(16,16,4.5,0,Math.PI*2);
    ctx.fill();
}

// red scanner line (2.5px)
function drawScanner(x){

    const px = x * size;

    const w = 2.5; // 2 + 0.5 px requirement

    ctx.fillStyle = "rgba(255,0,0,0.9)";
    ctx.fillRect(px - w/2, 0, w, size);

    // soft glow trail
    ctx.fillStyle = "rgba(255,0,0,0.25)";
    ctx.fillRect(px - 5, 0, 10, size);
}

let lastFrame = 0;

function loop(ms){

    if(ms - lastFrame < 80) return;
    lastFrame = ms;

    t = ms;

    const p = progress(ms);
    const x = scannerPos(p);

    drawBackground();
    drawScanner(x);
    drawDot();

    favicon.href = canvas.toDataURL("image/png");
}
