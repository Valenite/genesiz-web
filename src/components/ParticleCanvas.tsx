import React, { useEffect, useRef } from 'react';

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates and velocity tracking
    const mouse = {
      x: -2000,
      y: -2000,
      px: -2000,
      py: -2000,
      speed: 0,
      radius: 110,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
      mouse.px = -2000;
      mouse.py = -2000;
      mouse.speed = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Well-balanced particle count
    const count = Math.min(Math.floor((width * height) / 12000), 85);
    const nodes: {
      x: number;
      y: number;
      baseVx: number;
      baseVy: number;
      impulseX: number;
      impulseY: number;
      radius: number;
      wanderAngle: number;
      wanderSpeed: number;
      color: string;
      baseAlpha: number;
    }[] = [];

    const brokenLinks: Map<string, number> = new Map();

    const colors = [
      'rgba(255, 255, 255, ',   // Crisp White
      'rgba(192, 132, 252, ',   // Lavender Purple
      'rgba(167, 139, 250, ',   // Soft Violet
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const wanderSpeed = Math.random() * 0.18 + 0.18; // Steady, calm organic drift

      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseVx: Math.cos(angle) * wanderSpeed,
        baseVy: Math.sin(angle) * wanderSpeed,
        impulseX: 0,
        impulseY: 0,
        radius: Math.random() * 0.9 + 1.3, // Nicely sized dots (1.3px - 2.2px)
        wanderAngle: angle,
        wanderSpeed,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.35 + 0.45, // Clean, visible alpha (0.45 - 0.8)
      });
    }

    // Helper: Line segment intersection (Blade Slicing detection)
    const lineIntersect = (
      p0_x: number, p0_y: number, p1_x: number, p1_y: number,
      p2_x: number, p2_y: number, p3_x: number, p3_y: number
    ): boolean => {
      const s1_x = p1_x - p0_x;
      const s1_y = p1_y - p0_y;
      const s2_x = p3_x - p2_x;
      const s2_y = p3_y - p2_y;

      const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
      const t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

      return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    };

    // Helper: Distance from point to line segment
    const distToSegment = (
      px: number, py: number,
      x1: number, y1: number,
      x2: number, y2: number
    ): number => {
      const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
      if (l2 === 0) return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));
      let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
      t = Math.max(0, Math.min(1, t));
      const projX = x1 + t * (x2 - x1);
      const projY = y1 + t * (y2 - y1);
      return Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
    };

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Decrement broken link cooldowns
      brokenLinks.forEach((cooldown, key) => {
        if (cooldown <= 1) {
          brokenLinks.delete(key);
        } else {
          brokenLinks.set(key, cooldown - 1);
        }
      });

      // 1. Gentle dispersion from cursor
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const push = force * (1.2 + Math.min(mouse.speed * 0.05, 1.8));
            n.impulseX += (dx / dist) * push * 0.12;
            n.impulseY += (dy / dist) * push * 0.12;
          }
        }
      }

      // 2. Draw & Sever Balanced Threads (Perfect Visibility)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const key = `${i}_${j}`;

          if (brokenLinks.has(key)) {
            continue;
          }

          const nodeA = nodes[i];
          const nodeB = nodes[j];

          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 135; // Balanced connection span

          if (dist < maxDist) {
            // Check if cursor movement sliced through this thread
            let wasCut = false;

            if (mouse.px > 0 && mouse.x > 0 && mouse.speed > 1.2) {
              if (lineIntersect(mouse.px, mouse.py, mouse.x, mouse.y, nodeA.x, nodeA.y, nodeB.x, nodeB.y)) {
                wasCut = true;
              }
            }

            if (!wasCut && mouse.x > 0) {
              const distanceToThread = distToSegment(
                mouse.x, mouse.y,
                nodeA.x, nodeA.y,
                nodeB.x, nodeB.y
              );
              if (distanceToThread < 24) {
                wasCut = true;
              }
            }

            if (wasCut) {
              brokenLinks.set(key, 80 + Math.floor(Math.random() * 30));
              const angleA = Math.atan2(nodeA.y - mouse.y, nodeA.x - mouse.x);
              const angleB = Math.atan2(nodeB.y - mouse.y, nodeB.x - mouse.x);
              nodeA.impulseX += Math.cos(angleA) * 0.9;
              nodeA.impulseY += Math.sin(angleA) * 0.9;
              nodeB.impulseX += Math.cos(angleB) * 0.9;
              nodeB.impulseY += Math.sin(angleB) * 0.9;
              continue;
            }

            // Balanced visibility thread (crisp yet gentle)
            const alpha = (1 - dist / maxDist) * 0.26;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(180, 155, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Update & Render Well-Defined Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Smooth continuous wander steering
        n.wanderAngle += (Math.sin(frame * 0.02 + i) - 0.5) * 0.035;
        n.baseVx = Math.cos(n.wanderAngle) * n.wanderSpeed;
        n.baseVy = Math.sin(n.wanderAngle) * n.wanderSpeed;

        // Damping on mouse impulses
        n.impulseX *= 0.95;
        n.impulseY *= 0.95;

        n.x += n.baseVx + n.impulseX;
        n.y += n.baseVy + n.impulseY;

        // Wrap boundaries seamlessly
        if (n.x < -15) n.x = width + 15;
        if (n.x > width + 15) n.x = -15;
        if (n.y < -15) n.y = height + 15;
        if (n.y > height + 15) n.y = -15;

        // Subtle breathing alpha pulse
        const pulse = Math.sin(frame * 0.025 + i * 1.5) * 0.1;
        const currentAlpha = Math.max(0.3, Math.min(1, n.baseAlpha + pulse));

        // Soft outer subtle halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${currentAlpha * 0.25})`;
        ctx.fill();

        // Core distinct node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}${currentAlpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
};
