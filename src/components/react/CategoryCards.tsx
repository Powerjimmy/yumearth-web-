import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

interface CardProps {
  href: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  emoji: string;
  bg: string;
  accent: string;
  floatItems: { img: string; emoji: string; x: string; y: string; size: string; delay: number }[];
  index: number;
}

function Category3DCard({ href, title, tagline, desc, image, emoji, bg, accent, floatItems, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20, mass: 0.5 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: index * 0.12 }}
      style={{ perspective: '900px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: bg,
          touchAction: 'none',
        }}
        whileTap={{ scale: 0.98 }}
        className="rounded-3xl overflow-hidden relative cursor-pointer group"
      >
        <a href={href} className="block h-full">
          {/* Floating product images */}
          <div className="relative pt-12 pb-0 px-10 min-h-[320px]" style={{ transformStyle: 'preserve-3d' }}>
            {/* Main image — pops forward in 3D */}
            <motion.img
              src={image}
              alt={title}
              className="relative z-10 mx-auto block"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                filter: `drop-shadow(0 24px 48px rgba(0,0,0,0.18))`,
                transform: 'translateZ(60px)',
              }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Floating mini products around it — hidden on mobile */}
            {floatItems.map((item, i) => (
              <motion.img
                key={i}
                src={item.img}
                alt=""
                className="absolute pointer-events-none"
                style={{
                  width: item.size,
                  height: item.size,
                  objectFit: 'contain',
                  left: item.x,
                  top: item.y,
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                  transform: 'translateZ(30px)',
                  opacity: 0.75,
                }}
                animate={{ y: [0, -8, 0], rotate: [0, i % 2 === 0 ? 4 : -4, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ))}
          </div>

          {/* Text content — below the floaters */}
          <div className="px-10 pb-10 pt-6" style={{ transform: 'translateZ(20px)' }}>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: accent }}>
              {tagline}
            </p>
            <h3 className="font-black mb-3"
              style={{ fontFamily: "'ClashDisplay','Nunito',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', lineHeight: 0.95, letterSpacing: '-0.03em', color: 'var(--color-ink)' }}>
              {title}
            </h3>
            <p className="text-sm mb-6 max-w-xs" style={{ color: 'rgba(0,0,0,0.50)', lineHeight: 1.65 }}>
              {desc}
            </p>
            <span
              className="inline-flex items-center gap-2 text-sm font-black transition-gap"
              style={{ color: accent }}
            >
              View range
              <span style={{ display: 'inline-block', animation: 'arrow-nudge 1.5s ease-in-out infinite' }}>
                →
              </span>
            </span>
          </div>

          {/* Subtle shine overlay on hover */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)' }}
          />
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function CategoryCards() {
  const categories = [
    {
      href: '/lollipops',
      title: 'Lollipops',
      tagline: '',
      desc: '',
      image: '/images/products/bolsa-lollipops-red.webp',
      emoji: '🍭',
      bg: '#FFF0F2',
      accent: '#D7002D',
      floatItems: [
        { img: '/images/products/bolsa-vitamin-c.webp', emoji: '🍬', x: '5%', y: '12%', size: '80px', delay: 0.3 },
        { img: '/images/products/lollipops/strawberry-smash.webp', emoji: '🍭', x: '78%', y: '8%', size: '64px', delay: 0.8 },
      ],
    },
    {
      href: '/soft-candy',
      title: 'Soft Candy',
      tagline: '',
      desc: '',
      image: '/images/products/fruit-snacks.webp',
      emoji: '🍇',
      bg: '#EFF8E6',
      accent: '#4a9100',
      floatItems: [
        { img: '/images/products/gummy-bears.webp', emoji: '🐻', x: '4%', y: '18%', size: '72px', delay: 0.2 },
        { img: '/images/products/sour-beans.webp', emoji: '🫘', x: '78%', y: '8%', size: '64px', delay: 0.6 },
        { img: '/images/products/giggles.webp', emoji: '😄', x: '74%', y: '55%', size: '56px', delay: 1.0 },
      ],
    },
  ];

  return (
    
      <section className="blob-bg pt-10 pb-24 md:py-24" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="mb-14"
          >
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--color-teal)' }}>
              Our candy categories
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-black"
                style={{ fontFamily: "'ClashDisplay','Nunito',sans-serif", fontSize: 'clamp(2.5rem,6vw,4.5rem)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
                it's delicious.
              </h2>
              <a href="/products" className="btn-secondary text-sm self-start md:self-auto">
                View all products →
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <Category3DCard key={cat.title} {...cat} index={i} />
            ))}
          </div>
        </div>
      </section>
    
  );
}
