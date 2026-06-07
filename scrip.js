const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const messages = [
    "luv u na",
    "luv na aun"
];

let time = 0;

function heart(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t))
    };
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(
        canvas.width / 2,
        canvas.height / 2
    );

    const rotateY = time * 0.01;

    for (let i = 0; i < 180; i++) {

        const t =
            (i / 180) * Math.PI * 2 +
            time * 0.02;

        const p = heart(t);

        let x = p.x * 22;
        let y = p.y * 22;

        const depth =
            Math.sin(t + rotateY) * 120;

        const perspective =
            600 / (600 + depth);

        x *= perspective;
        y *= perspective;

        const next = heart(t + 0.01);

        const angle = Math.atan2(
            next.y - p.y,
            next.x - p.x
        );

        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(angle);

        ctx.font =
            `${14 * perspective + 6}px Arial`;

        ctx.fillStyle =
            `rgba(255,182,193,${
                0.4 + perspective * 0.6
            })`;

        ctx.shadowColor = "#ff69b4";
        ctx.shadowBlur = 20;

        ctx.fillText(
            messages[i % 2],
            0,
            0
        );

        ctx.restore();
    }

    ctx.restore();

    time++;

    requestAnimationFrame(draw);
}

draw();