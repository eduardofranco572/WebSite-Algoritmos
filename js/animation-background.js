const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

const numStars = 1500;
const stars = [];

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = (Math.random() - 0.5) * canvas.width;
        this.y = (Math.random() - 0.5) * canvas.height;
        this.z = Math.random() * canvas.width;
        this.pz = this.z;
    }
    update(speed) {
        this.z -= speed;
        if (this.z < 1) {
            this.reset();
        }
    }
    draw() {
        const sx = (this.x / this.z) * canvas.width / 2 + canvas.width / 2;
        const sy = (this.y / this.z) * canvas.height / 2 + canvas.height / 2;
        const px = (this.x / this.pz) * canvas.width / 2 + canvas.width / 2;
        const py = (this.y / this.pz) * canvas.height / 2 + canvas.height / 2;
        const radius = Math.max(0, (1 - this.z / canvas.width) * 2);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.lineWidth = radius;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();

        this.pz = this.z;
    }
}

let speed = 0.2;
let targetSpeed = 0.2;
const warpSpeed = 20;
const warpDuration = 1500;

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function triggerWarp() {
    targetSpeed = warpSpeed;
    setTimeout(() => {
        targetSpeed = 0.2;
    }, warpDuration);
}

function animate() {
    // AQUI ESTÁ A CORREÇÃO: Limpa o canvas em vez de preencher com preto
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    speed += (targetSpeed - speed) * 0.03;
    for (const star of stars) {
        star.update(speed);
        star.draw();
    }
    requestAnimationFrame(animate);
}

resizeCanvas();
animate();
