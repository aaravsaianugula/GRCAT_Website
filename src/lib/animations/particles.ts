export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

const COLORS = [
  "108, 180, 67",  // Gator Green
  "187, 212, 22",  // Leaf Green
  "44, 136, 43",   // GRC Green
];

export function createParticle(width: number, height: number): Particle {
  const colorIdx = Math.floor(Math.random() * COLORS.length);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2 + 1,
    color: COLORS[colorIdx],
    alpha: Math.random() * 0.5 + 0.3,
  };
}

export function getParticleCount(width: number): number {
  if (width < 640) return 20;
  if (width < 1024) return 40;
  return 80;
}

export function updateParticle(p: Particle, width: number, height: number) {
  p.x += p.vx;
  p.y += p.vy;

  if (p.x < 0 || p.x > width) p.vx *= -1;
  if (p.y < 0 || p.y > height) p.vy *= -1;

  p.x = Math.max(0, Math.min(width, p.x));
  p.y = Math.max(0, Math.min(height, p.y));
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  mouseX: number,
  mouseY: number,
  connectionDistance: number,
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < connectionDistance) {
        const opacity = (1 - dist / connectionDistance) * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108, 180, 67, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw particles + mouse interaction
  for (const p of particles) {
    // Subtle mouse attraction
    if (mouseX > 0 && mouseY > 0) {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200 * 0.02;
        p.vx += dx * force * 0.01;
        p.vy += dy * force * 0.01;
        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
    ctx.fill();
  }
}
