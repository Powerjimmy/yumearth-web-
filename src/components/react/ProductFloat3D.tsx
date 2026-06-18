import { useRef } from 'react';
import {
  motion, useScroll, useTransform, useMotionValue, useSpring,
} from 'framer-motion';

const layers = [
  {
    img: '/images/img/sandia.png',
    size: 110,
    x: '12%', y: '20%',
    scrollSpeed: 0.15,
    float: { y: [-6, 6], dur: 5.5, delay: 0 },
    shadow: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
    opacity: 0.75,
    zIndex: 1,
  },
  {
    img: '/images/img/peach.png',
    size: 100,
    x: '78%', y: '15%',
    scrollSpeed: 0.1,
    float: { y: [6, -6], dur: 4.8, delay: 0.6 },
    shadow: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
    opacity: 0.75,
    zIndex: 1,
  },
  {
    img: '/images/img/cereza.png',
    size: 115,
    x: '72%', y: '52%',
    scrollSpeed: 0.28,
    float: { y: [-10, 10], dur: 4.2, delay: 0.3 },
    shadow: 'drop-shadow(0 16px 32px rgba(0,0,0,0.35))',
    opacity: 0.85,
    zIndex: 2,
  },
  {
    img: '/images/img/fresa.png',
    size: 110,
    x: '8%', y: '55%',
    scrollSpeed: 0.22,
    float: { y: [8, -8], dur: 5, delay: 1 },
    shadow: 'drop-shadow(0 16px 32px rgba(0,0,0,0.35))',
    opacity: 0.85,
    zIndex: 2,
  },
  {
    img: '/images/img/mango.png',
    size: 120,
    x: '30%', y: '75%',
    scrollSpeed: 0.45,
    float: { y: [-10, 10], dur: 3.8, delay: 0.5 },
    shadow: 'drop-shadow(0 16px 32px rgba(0,0,0,0.35))',
    opacity: 0.9,
    zIndex: 2,
  },
];

function FloatingProduct({ layer, sectionProgress }: {
  layer: typeof layers[0];
  sectionProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // Each layer moves at a different speed = parallax depth
  const y = useTransform(sectionProgress, [0, 1], [0, -layer.scrollSpeed * 300]);

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: layer.x,
        top: layer.y,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: layer.zIndex,
        y,
      }}
    >
      <motion.div
        animate={{ y: layer.float.y }}
        transition={{
          duration: layer.float.dur,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: layer.float.delay,
        }}
        style={{ opacity: layer.opacity }}
      >
        <img
          src={layer.img}
          alt=""
          width={layer.size}
          height={layer.size}
          style={{
            width: layer.size,
            height: layer.size,
            objectFit: 'contain',
            filter: layer.shadow,
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProductFloat3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 30);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="blob-bg relative overflow-hidden"
        style={{ background: '#E8F7F9', minHeight: '600px', height: 'clamp(500px, 80vh, 800px)' }}
      >
        {/* Mouse-responsive container — all products follow mouse gently */}
        <motion.div
          className="absolute inset-0"
          style={{ x: springX, y: springY }}
        >
          {/* Desktop: full 3D parallax scene */}
          <div className="hidden md:block absolute inset-0">
            {layers.map((layer, i) => (
              <FloatingProduct key={i} layer={layer} sectionProgress={scrollYProgress} />
            ))}
          </div>

          {/* Mobile: just 2 big centered floating products */}
          <div className="md:hidden absolute inset-0 pointer-events-none">
            {/* top-left */}
            <motion.img
              src="/images/img/sandia.png" alt=""
              style={{ position: 'absolute', top: 16, left: 16, width: 70, height: 70, objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {/* top-right */}
            <motion.img
              src="/images/img/peach.png" alt=""
              style={{ position: 'absolute', top: 16, right: 16, width: 70, height: 70, objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {/* bottom-left */}
            <motion.img
              src="/images/img/fresa.png" alt=""
              style={{ position: 'absolute', bottom: 16, left: 16, width: 70, height: 70, objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {/* bottom-right */}
            <motion.img
              src="/images/img/mango.png" alt=""
              style={{ position: 'absolute', bottom: 16, right: 16, width: 70, height: 70, objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </motion.div>

        {/* Text overlay — centered */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.p
            className="text-xs font-black uppercase tracking-widest mb-4"
            style={{ color: 'var(--color-teal)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            It's delicious
          </motion.p>
          <motion.h2
            className="font-black mb-6"
            style={{
              fontFamily: "'ClashDisplay','Nunito',sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          >
            real ingredients.<br />
            <span style={{ color: 'var(--color-teal)' }}>real flavours.</span>
          </motion.h2>
          <motion.a
            href="/products"
            className="btn-primary text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          >
            See all products →
          </motion.a>
        </div>
      </section>
    
  );
}
