const canvas = document.getElementById("mathCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols = ["+", "−", "×", "÷", "=", "≠", "≈", "√", "π", "∑", "∫", "∞"];

const particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    let overlapping = true;
    let newX, newY;
    let attempts = 0;

    while (overlapping && attempts < 1000) {
      // Try to find a non-overlapping position
      newX = Math.random() * canvas.width;
      newY = Math.random() * canvas.height;
      overlapping = false;

      for (let i = 0; i < particles.length; i++) {
        const other = particles[i];
        const dx = newX - other.x;
        const dy = newY - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (this.size + other.size) * 0.6; // Adjust this factor as needed

        if (distance < minDistance) {
          overlapping = true;
          break;
        }
      }
      attempts++;
    }

    if (overlapping) {
      // If we couldn't find a non-overlapping spot, use a default
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    } else {
      this.x = newX;
      this.y = newY;
    }

    this.size = Math.random() * 20 + 16;
    this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.5 + 0.4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    if (
      this.x < -100 ||
      this.x > canvas.width + 100 ||
      this.y < -100 ||
      this.y > canvas.height + 100
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    ctx.font = `${this.size}px Inter, sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
    ctx.shadowBlur = 12;

    ctx.fillText(this.symbol, 0, 0);
    ctx.restore();
  }
}

function createParticles(num) {
  for (let i = 0; i < num; i++) {
    particles.push(new Particle());
  }
}

createParticles(60);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
