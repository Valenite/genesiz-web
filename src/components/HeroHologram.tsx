import React, { useEffect, useRef } from 'react';

export const HeroHologram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const size = 260;
    const width = (canvas.width = size);
    const height = (canvas.height = size);

    const points: { x: number; y: number; z: number; baseAngle: number }[] = [];
    const numPoints = 130;

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(2 * (i / numPoints) - 1);
      const phi = Math.sqrt(numPoints * Math.PI) * theta;
      const r = 70; // Perfect spherical radius

      points.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(theta),
        baseAngle: theta,
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += 0.005;
      angleY += 0.007;

      const cx = width / 2;
      const cy = height / 2;

      // Draw glowing central orb
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 65);
      grad.addColorStop(0, 'rgba(192, 132, 252, 0.45)');
      grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();

      // Project 3D Sphere Points
      const projected: { x: number; y: number; scale: number; alpha: number }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        const x1 = p.x * Math.cos(angleY) + p.z * Math.sin(angleY);
        const z1 = -p.x * Math.sin(angleY) + p.z * Math.cos(angleY);

        // Rotate X
        const y2 = p.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = p.y * Math.sin(angleX) + z1 * Math.cos(angleX);

        const fov = 180;
        const scale = fov / (fov + z2);
        const x2d = x1 * scale + cx;
        const y2d = y2 * scale + cy;
        const alpha = Math.max(0.12, (z2 + 80) / 160);

        projected.push({ x: x2d, y: y2d, scale, alpha });
      }

      // Draw interconnecting latitudinal arcs
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.22)';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length - 1; i += 2) {
        if (projected[i].alpha > 0.35 && projected[i + 1].alpha > 0.35) {
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[i + 1].x, projected[i + 1].y);
          ctx.stroke();
        }
      }

      // Draw glowing nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.scale * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 215, 255, ${p.alpha * 0.95})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 aspect-square mx-auto flex items-center justify-center pointer-events-none">
      {/* Outer ambient blur */}
      <div className="absolute inset-0 bg-violet-600/20 blur-2xl rounded-full"></div>

      {/* Rotating outer compass rings (True 1:1 circular aspect ratio) */}
      <div className="absolute inset-2 aspect-square rounded-full border border-violet-500/25 border-dashed animate-[spin_30s_linear_infinite]"></div>
      <div className="absolute inset-6 aspect-square rounded-full border border-indigo-400/30 animate-[spin_20s_linear_infinite_reverse]"></div>

      {/* Canvas Hologram Sphere */}
      <canvas 
        ref={canvasRef} 
        width={260} 
        height={260} 
        className="relative z-10 w-full h-full aspect-square object-contain" 
      />
    </div>
  );
};
