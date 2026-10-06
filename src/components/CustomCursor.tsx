import React, { useEffect, useState, useRef } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const sparkIdCounter = useRef(0);
  const lastEmitTime = useRef(0);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const sparkColors = ['#a855f7', '#38bdf8', '#ec4899', '#ffffff', '#c084fc'];

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, [role="button"], .tilt-target, .cursor-hoverable');
        setIsHovered(!!clickable);
      }

      // Spawn spark particle periodically
      const now = performance.now();
      if (now - lastEmitTime.current > 45) {
        lastEmitTime.current = now;
        const newSpark: Spark = {
          id: ++sparkIdCounter.current,
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          size: Math.random() * 3.5 + 2,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        };

        setSparks((prev) => [...prev.slice(-14), newSpark]);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Fade sparks
    const sparkInterval = setInterval(() => {
      setSparks((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 90);

    // Smooth trailer interpolation
    let animId: number;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    let currentX = -100;
    let currentY = -100;

    const loop = () => {
      currentX = lerp(currentX, pos.x, 0.22);
      currentY = lerp(currentY, pos.y, 0.22);
      setTrailerPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearInterval(sparkInterval);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Drifting trailing sparks */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="fixed rounded-full pointer-events-none transition-opacity duration-300 animate-pulse"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            boxShadow: `0 0 8px ${spark.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Leading center dot */}
      <div
        className={`fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full transition-transform duration-75 ease-out ${
          isHovered
            ? 'bg-cyan-400 shadow-[0_0_12px_#22d3ee] scale-150'
            : isClicking
            ? 'bg-purple-300 scale-75'
            : 'bg-purple-400 shadow-[0_0_8px_#c084fc]'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />

      {/* Trailing halo ring with crosshairs */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-cyan-400/80 bg-cyan-500/10 scale-125 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
            : isClicking
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 border-pink-400 bg-pink-500/20 scale-90'
            : 'w-8 h-8 -ml-4 -mt-4 border-purple-500/40 bg-purple-900/10'
        }`}
        style={{
          transform: `translate3d(${trailerPos.x}px, ${trailerPos.y}px, 0)`,
        }}
      >
        {isHovered && (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping opacity-75" />
            <div className="absolute top-0 w-1 h-0.5 bg-cyan-300" />
            <div className="absolute bottom-0 w-1 h-0.5 bg-cyan-300" />
            <div className="absolute left-0 w-0.5 h-1 bg-cyan-300" />
            <div className="absolute right-0 w-0.5 h-1 bg-cyan-300" />
          </>
        )}
      </div>
    </div>
  );
};
