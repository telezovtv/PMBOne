const size = 32;

const canvas = document.createElement("canvas");
canvas.width = size;
canvas.height = size;

const ctx = canvas.getContext("2d");

const favicon =
document.querySelector("link[rel='icon']") ||
document.head.appendChild(document.createElement("link"));

favicon.rel="icon";

let angle = 0;

const targets = [
    {r:7,a:0.6},
    {r:11,a:2.1},
    {r:9,a:4.4},
    {r:13,a:5.5}
];

function glow(color,blur){
    ctx.shadowColor=color;
    ctx.shadowBlur=blur;
}

function drawBackground(){

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0,0,size,size);

}

function drawRings(){

    glow("#00ffff",3);

    ctx.strokeStyle="rgba(0,255,255,.35)";

    [5,10,15].forEach(r=>{

        ctx.beginPath();
        ctx.arc(16,16,r,0,Math.PI*2);
        ctx.stroke();

    });

}

function drawSweep(){

    glow("#00ffff",8);

    const x=16+Math.cos(angle)*15;
    const y=16+Math.sin(angle)*15;

    const grad=ctx.createLinearGradient(16,16,x,y);

    grad.addColorStop(0,"rgba(0,255,255,.8)");
    grad.addColorStop(1,"rgba(0,255,255,0)");

    ctx.strokeStyle=grad;

    ctx.beginPath();
    ctx.moveTo(16,16);
    ctx.lineTo(x,y);
    ctx.stroke();

}

function drawTargets(){

    targets.forEach(t=>{

        const x=16+Math.cos(t.a)*t.r;
        const y=16+Math.sin(t.a)*t.r;

        const d=Math.abs(angle-t.a);

        const alpha=Math.max(0.2,1-d);

        glow("#00ffff",8);

        ctx.fillStyle=`rgba(0,255,255,${alpha})`;

        ctx.beginPath();
        ctx.arc(x,y,1.3,0,Math.PI*2);
        ctx.fill();

    });

}

function drawCenter(){

    glow("#00ffff",10);

    ctx.fillStyle="#00ffff";

    ctx.beginPath();
    ctx.arc(16,16,2.2,0,Math.PI*2);
    ctx.fill();

}

function loop(){

    drawBackground();
    drawRings();
    drawSweep();
    drawTargets();
    drawCenter();

    favicon.href=canvas.toDataURL("image/png");

    angle+=0.03;

    if(angle>Math.PI*2)
        angle=0;

    requestAnimationFrame(loop);

}

loop();