import React, { useEffect, useRef } from 'react';

interface QuantumGridProps {
  themeColor?: 'violet' | 'emerald' | 'cyan' | 'amber';
}

export const QuantumGridCanvas: React.FC<QuantumGridProps> = ({ themeColor = 'violet' }) => {
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

    // Mouse coordinates and smooth inertia
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 260,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Grid properties
    const spacing = 48; // Grid cell size
    const cols = Math.ceil(width / spacing) + 4;
    const rows = Math.ceil(height / spacing) + 4;

    let time = 0;

    const colorPalettes = {
      violet: {
        primary: 'rgba(167, 139, 250, ',
        glow: 'rgba(139, 92, 246, ',
        accent: 'rgba(216, 180, 254, ',
      },
      emerald: {
        primary: 'rgba(52, 211, 153, ',
        glow: 'rgba(16, 185, 129, ',
        accent: 'rgba(110, 231, 183, ',
      },
      cyan: {
        primary: 'rgba(56, 189, 248, ',
        glow: 'rgba(14, 165, 233, ',
        accent: 'rgba(186, 230, 253, ',
      },
      amber: {
        primary: 'rgba(251, 191, 36, ',
        glow: 'rgba(245, 158, 11, ',
        accent: 'rgba(253, 230, 138, ',
      },
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const palette = colorPalettes[themeColor] || colorPalettes.violet;

      // Calculate deformed grid points
      const grid: { x: number; y: number; distortion: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = (c - 2) * spacing;
          const baseY = (r - 2) * spacing;

          // Undulating quantum wave
          const wave = Math.sin(time + c * 0.15 + r * 0.1) * 4;

          // Distance to mouse
          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let warpX = baseX;
          let warpY = baseY + wave;
          let distortion = 0;

          if (mouse.active && dist < mouse.radius) {
            // Gravitational lens pinch & ripple
            const force = Math.cos((dist / mouse.radius) * (Math.PI / 2));
            const push = force * 45;
            warpX += (dx / dist) * push;
            warpY += (dy / dist) * push;
            distortion = force;
          }

          grid[r][c] = { x: warpX, y: warpY, distortion };
        }
      }

      // Draw horizontal curved grid lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = grid[r][c - 1];
            const midX = (prev.x + pt.x) / 2;
            const midY = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.strokeStyle = `${palette.primary}0.06)`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Draw vertical curved grid lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = grid[r][c];
          if (r === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = grid[r - 1][c];
            const midX = (prev.x + pt.x) / 2;
            const midY = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.strokeStyle = `${palette.primary}0.06)`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Draw quantum intersection nodes with dynamic illumination
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = grid[r][c];
          if (pt.x < 0 || pt.x > width || pt.y < 0 || pt.y > height) continue;

          if (pt.distortion > 0.15) {
            // Illuminated active node near gravity well
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5 + pt.distortion * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `${palette.accent}${Math.min(1, pt.distortion * 1.2)})`;
            ctx.shadowColor = palette.glow.slice(0, -1);
            ctx.shadowBlur = pt.distortion * 15;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Subtle ambient node
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `${palette.primary}0.25)`;
            ctx.fill();
          }
        }
      }

      // Interactive Quantum Singularity Aura around cursor
      if (mouse.active) {
        const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        aura.addColorStop(0, `${palette.glow}0.12)`);
        aura.addColorStop(0.5, `${palette.glow}0.04)`);
        aura.addColorStop(1, 'transparent');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
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
  }, [themeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
