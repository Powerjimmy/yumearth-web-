import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number; // degrees max tilt, default 12
  scale?: number;     // hover scale, default 1.04
}

export default function TiltCard({
  children,
  className = '',
  style = {},
  intensity = 12,
  scale = 1.04,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(rawX, { stiffness: 300, damping: 30, mass: 0.5 });
  const rotateY = useSpring(rawY, { stiffness: 300, damping: 30, mass: 0.5 });
  const scaleVal = useSpring(1, { stiffness: 320, damping: 28, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1
    rawY.set(dx * intensity);
    rawX.set(-dy * intensity);
    scaleVal.set(scale);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    scaleVal.set(1);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '900px', touchAction: 'none', ...style }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleVal,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
