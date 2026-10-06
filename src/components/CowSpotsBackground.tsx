import React, { useEffect, useRef } from 'react';

export type SpotTheme = 'void' | 'classic' | 'cyberpunk';

interface CowSpotsBackgroundProps {
  theme?: SpotTheme;
  speed?: number; // 0.5 to 2.5
  spotCount?: number; // 8 to 28
  interactive?: boolean;
}

interface CowBlob {
  x: number;
  y: number;
  baseRadius: number;
  vx: number;
  vy: number;
  angle: number;
  rotSpeed: number;
  points: { angle: number; rOffset: number; noiseSpeed: number }[];
  color: string;
  glowColor: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const CowSpotsBackground: React.FC<CowSpotsBackgroundProps> = ({
  theme = 'void',
  speed = 1,
  spotCount = 16,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const ripplesRef = useRef<Ripple[]>([]);
  const blobsRef = useRef<CowBlob[]>([]);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initSpots();
      initStars();
    };

    window.addEventListener('resize', handleResize);

    const initStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor((width * height) / 8000);
      const starColors = ['#ffffff', '#c084fc', '#67e8f9', '#fbcfe8', '#e9d5ff'];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.4,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
      starsRef.current = stars;
    };

    const initSpots = () => {
      const blobs: CowBlob[] = [];
      const count = spotCount;

      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() * 65 + 45;
        const numVertices = Math.floor(Math.random() * 4) + 8; // 8-11 points for organic blob
        const points = [];

        for (let j = 0; j < numVertices; j++) {
          const angle = (j / numVertices) * Math.PI * 2;
          // random offset to create irregular cow spot lobes
          const rOffset = (Math.random() - 0.45) * 0.45;
          points.push({
            angle,
            rOffset,
            noiseSpeed: Math.random() * 0.02 + 0.01,
          });
        }

        let spotColor = 'rgba(15, 7, 30, 0.9)';
        let glowColor = 'rgba(168, 85, 247, 0.4)';

        if (theme === 'void') {
          // deep void spot with purple/cyan edge
          spotColor = i % 2 === 0 ? 'rgba(12, 6, 26, 0.92)' : 'rgba(8, 4, 18, 0.95)';
          glowColor = i % 3 === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(168, 85, 247, 0.45)';
        } else if (theme === 'classic') {
          // Holstein cow print on milk-lit void
          spotColor = 'rgba(14, 14, 20, 0.96)';
          glowColor = 'rgba(255, 255, 255, 0.3)';
        } else if (theme === 'cyberpunk') {
          spotColor = 'rgba(13, 10, 35, 0.9)';
          glowColor = i % 2 === 0 ? 'rgba(244, 63, 94, 0.5)' : 'rgba(6, 182, 212, 0.5)';
        }

        blobs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius,
          vx: (Math.random() - 0.5) * 0.6 * speed,
          vy: (Math.random() - 0.5) * 0.6 * speed,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.006 * speed,
          points,
          color: spotColor,
          glowColor,
        });
      }

      blobsRef.current = blobs;
    };

    initSpots();
    initStars();

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Cosmic Void Gradient Background
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );

      if (theme === 'void') {
        bgGrad.addColorStop(0, '#1a0b38');
        bgGrad.addColorStop(0.35, '#0e0520');
        bgGrad.addColorStop(0.7, '#070212');
        bgGrad.addColorStop(1, '#030107');
      } else if (theme === 'classic') {
        bgGrad.addColorStop(0, '#2d1b4e');
        bgGrad.addColorStop(0.4, '#1b1231');
        bgGrad.addColorStop(0.8, '#0d071a');
        bgGrad.addColorStop(1, '#05030a');
      } else {
        bgGrad.addColorStop(0, '#1e0836');
        bgGrad.addColorStop(0.4, '#09132b');
        bgGrad.addColorStop(0.8, '#060317');
        bgGrad.addColorStop(1, '#020108');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Cosmic Milk Way Dust / Nebula
      ctx.save();
      const nebulaGrad = ctx.createLinearGradient(0, 0, width, height);
      nebulaGrad.addColorStop(0, 'rgba(147, 51, 234, 0.08)');
      nebulaGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.06)');
      nebulaGrad.addColorStop(0.6, 'rgba(236, 72, 153, 0.07)');
      nebulaGrad.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 3. Render Stars & Twinkle
      starsRef.current.forEach((star) => {
        star.alpha += Math.sin(frame * star.twinkleSpeed) * 0.01;
        const currentAlpha = Math.max(0.15, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 4. Update and Render Ripples (on clicks)
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += 4;
        rip.alpha -= 0.02;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${rip.alpha * 0.8})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      }

      // 5. Constellation Lines between nearby spots
      ctx.save();
      const blobs = blobsRef.current;
      for (let i = 0; i < blobs.length; i++) {
        for (let j = i + 1; j < blobs.length; j++) {
          const dx = blobs[i].x - blobs[j].x;
          const dy = blobs[i].y - blobs[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.15;
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.moveTo(blobs[i].x, blobs[i].y);
            ctx.lineTo(blobs[j].x, blobs[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 6. Draw Moving Cow Spots
      const mouse = mouseRef.current;

      blobs.forEach((blob) => {
        // Drift position
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.angle += blob.rotSpeed;

        // Wrap boundaries with padding
        const pad = blob.baseRadius * 1.5;
        if (blob.x < -pad) blob.x = width + pad;
        if (blob.x > width + pad) blob.x = -pad;
        if (blob.y < -pad) blob.y = height + pad;
        if (blob.y > height + pad) blob.y = -pad;

        // Mouse avoidance/attraction physics
        let mouseDeformX = 0;
        let mouseDeformY = 0;
        if (interactive && mouse.active) {
          const mdx = blob.x - mouse.x;
          const mdy = blob.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const pushRadius = 260;

          if (mDist < pushRadius && mDist > 0) {
            const force = (1 - mDist / pushRadius) * 22;
            blob.x += (mdx / mDist) * (force * 0.08);
            blob.y += (mdy / mDist) * (force * 0.08);
            mouseDeformX = (mdx / mDist) * force * 0.5;
            mouseDeformY = (mdy / mDist) * force * 0.5;
          }
        }

        // Draw Cow Spot Shape using Catmull-Rom or Bezier Splines through points
        ctx.save();
        ctx.translate(blob.x, blob.y);
        ctx.rotate(blob.angle);

        // Compute vertex positions
        const polyPoints: { x: number; y: number }[] = [];
        blob.points.forEach((pt, pIdx) => {
          // Dynamic undulating radius for liquid cow spot feel
          const wave = Math.sin(frame * pt.noiseSpeed + pIdx) * 6;
          const r = blob.baseRadius * (1 + pt.rOffset) + wave;
          const px = Math.cos(pt.angle) * r + (mouseDeformX * Math.cos(pt.angle) * 0.3);
          const py = Math.sin(pt.angle) * r + (mouseDeformY * Math.sin(pt.angle) * 0.3);
          polyPoints.push({ x: px, y: py });
        });

        // Draw smooth closed shape
        ctx.beginPath();
        const n = polyPoints.length;
        for (let i = 0; i < n; i++) {
          const pCurrent = polyPoints[i];
          const pNext = polyPoints[(i + 1) % n];
          const midX = (pCurrent.x + pNext.x) / 2;
          const midY = (pCurrent.y + pNext.y) / 2;

          if (i === 0) {
            ctx.moveTo(midX, midY);
          } else {
            ctx.quadraticCurveTo(pCurrent.x, pCurrent.y, midX, midY);
          }
        }
        ctx.closePath();

        // Spot Glow Shadow
        ctx.shadowColor = blob.glowColor;
        ctx.shadowBlur = 24;
        ctx.fillStyle = blob.color;
        ctx.fill();

        // Holographic Iridescent Stroke
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = blob.glowColor;
        ctx.stroke();

        // Inner spot detail (luminous cow patch inner accent)
        ctx.beginPath();
        const innerScale = 0.5;
        for (let i = 0; i < n; i++) {
          const pCurrent = polyPoints[i];
          const pNext = polyPoints[(i + 1) % n];
          const midX = ((pCurrent.x + pNext.x) / 2) * innerScale;
          const midY = ((pCurrent.y + pNext.y) / 2) * innerScale;

          if (i === 0) {
            ctx.moveTo(midX, midY);
          } else {
            ctx.quadraticCurveTo(pCurrent.x * innerScale, pCurrent.y * innerScale, midX, midY);
          }
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fill();

        ctx.restore();
      });

      // 7. Mouse Glow Follower Aura
      if (interactive && mouse.active) {
        const auraGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180
        );
        auraGrad.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
        auraGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const onClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 180,
        alpha: 0.9,
      });
    };

    // Touch handlers for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          active: true,
        };
        ripplesRef.current.push({
          x: touch.clientX,
          y: touch.clientY,
          radius: 8,
          maxRadius: 140,
          alpha: 0.85,
        });
      }
    };

    const onTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [theme, speed, spotCount, interactive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle cosmic grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
