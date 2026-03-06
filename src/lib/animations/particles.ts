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
  // Reduce on low-end: use deviceMemory or hardwareConcurrency as proxy
  const cores = typeof navigator !== "undefined" ? (navigator.hardwareConcurrency ?? 4) : 4;
  const lowEnd = cores <= 2;

  if (width < 640) return lowEnd ? 10 : 15;
  if (width < 1024) return lowEnd ? 18 : 30;
  return lowEnd ? 30 : 55;
}

export function updateParticle(p: Particle, width: number, height: number) {
  p.x += p.vx;
  p.y += p.vy;

  if (p.x < 0 || p.x > width) p.vx *= -1;
  if (p.y < 0 || p.y > height) p.vy *= -1;

  p.x = Math.max(0, Math.min(width, p.x));
  p.y = Math.max(0, Math.min(height, p.y));
}

// ─── Spatial Grid for O(n*k) connection checks ─────────────────
export class SpatialGrid {
  private cellSize: number;
  private cols: number;
  private rows: number;
  private cells: Map<number, number[]>;

  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.cells = new Map();
  }

  clear() {
    this.cells.clear();
  }

  insert(index: number, x: number, y: number) {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    const key = row * this.cols + col;
    const cell = this.cells.get(key);
    if (cell) {
      cell.push(index);
    } else {
      this.cells.set(key, [index]);
    }
  }

  getNeighborIndices(x: number, y: number): number[] {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    const result: number[] = [];

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const c = col + dx;
        const r = row + dy;
        if (c < 0 || c >= this.cols || r < 0 || r >= this.rows) continue;
        const cell = this.cells.get(r * this.cols + c);
        if (cell) {
          for (const idx of cell) result.push(idx);
        }
      }
    }
    return result;
  }
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  mouseX: number,
  mouseY: number,
  connectionDistance: number,
  grid: SpatialGrid,
) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Rebuild spatial grid
  grid.clear();
  for (let i = 0; i < particles.length; i++) {
    grid.insert(i, particles[i].x, particles[i].y);
  }

  // Draw connections using spatial grid (O(n*k) instead of O(n^2))
  const drawn = new Set<string>();
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const neighbors = grid.getNeighborIndices(p.x, p.y);

    for (const j of neighbors) {
      if (j <= i) continue;
      const key = `${i}-${j}`;
      if (drawn.has(key)) continue;
      drawn.add(key);

      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < connectionDistance) {
        const opacity = (1 - dist / connectionDistance) * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108, 180, 67, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  }

  // Draw particles + mouse interaction
  for (const p of particles) {
    if (mouseX > 0 && mouseY > 0) {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200 * 0.02;
        p.vx += dx * force * 0.01;
        p.vy += dy * force * 0.01;
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
