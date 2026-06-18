import { motion } from 'framer-motion';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import TiltCard from './TiltCard';

interface Product {
  name: string;
  tagline: string;
  desc: string;
  bg: string;
  accent: string;
  emoji: string;
  img: string;
  flavors: string[];
}

const products: Product[] = [
  {
    name: 'Lollipops',
    tagline: '#besteverlollipop',
    desc: 'Pomegranate pucker. Strawberry smash. Very very cherry. Real fruit flavor, zero artificial dyes.',
    bg: '#FFF0F2',
    accent: '#D7002D',
    emoji: '🍭',
    img: '/images/products/lollipops.webp',
    flavors: ['Pomegranate Pucker', 'Strawberry Smash', 'Very Very Cherry', 'Perfectly Peach', 'Sour Apple Tart'],
  },
  {
    name: 'Fruit Snacks',
    tagline: '100% Daily Vitamin C',
    desc: 'Cherry, Peach, Strawberry, Banana. Organic fruit snacks with real Vitamin C. Not the lab kind.',
    bg: '#F5F0FF',
    accent: '#7314A1',
    emoji: '🍇',
    img: '/images/products/fruit-snacks.webp',
    flavors: ['Cherry', 'Peach', 'Strawberry', 'Banana'],
  },
  {
    name: 'Gummy Bears',
    tagline: 'Organic & allergen friendly',
    desc: 'Classic gummy bears certified organic. Pomegranate flavor. Colored by plants, not petroleum.',
    bg: '#EFF8E6',
    accent: '#4a9100',
    emoji: '🐻',
    img: '/images/products/gummy-bears.webp',
    flavors: ['Pomegranate'],
  },
  {
    name: 'Sour Beans',
    tagline: 'Your new sour obsession',
    desc: 'Apple, Peach, Mango, Cherry. Organic sour jelly beans coated in pure sour sugar. Dangerously good.',
    bg: '#F0FAE6',
    accent: '#6a9328',
    emoji: '🫘',
    img: '/images/products/sour-beans.webp',
    flavors: ['Apple', 'Peach', 'Mango', 'Cherry'],
  },
  {
    name: 'Giggles',
    tagline: 'Perfect for little ones',
    desc: 'Strawberry, Orange, Lemon, Green Apple. Bite-sized, organic, allergen-friendly. The ultimate lunchbox snack.',
    bg: '#FFF0F8',
    accent: '#C45BAE',
    emoji: '😄',
    img: '/images/products/giggles.webp',
    flavors: ['Strawberry', 'Orange', 'Lemon', 'Green Apple'],
  },
  {
    name: 'Vitamin C Pops',
    tagline: '100% daily Vitamin C per pop',
    desc: 'Strawberry smash, Very very cherry, Razzmatazz berry. The lollipop that actually does something.',
    bg: '#FFF5E6',
    accent: '#FF7803',
    emoji: '🍬',
    img: '/images/products/vitamin-lollipops.webp',
    flavors: ['Strawberry Smash', 'Very Very Cherry', 'Razzmatazz Berry'],
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

const imgVariants = {
  hidden: { opacity: 0, scale: 0.92, x: 24 },
  show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

function ProductRow({ product, index }: { product: Product; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={rowVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="rounded-3xl overflow-hidden"
      style={{ background: product.bg }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-0`}>

        {/* Copy */}
        <div className="flex-1 p-10 lg:p-16">
          <p
            className="text-xs font-black uppercase tracking-widest mb-3"
            style={{ color: product.accent }}
          >
            {product.tagline}
          </p>
          <h3
            className="font-black mb-4"
            style={{
              fontFamily: "'ClashDisplay', 'Nunito', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-base mb-8 max-w-sm"
            style={{ color: 'rgba(0,0,0,0.55)', lineHeight: 1.65 }}
          >
            {product.desc}
          </p>

          {/* Flavor pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.flavors.map((f) => (
              <span
                key={f}
                className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.8)', color: 'rgba(0,0,0,0.6)' }}
              >
                {f}
              </span>
            ))}
          </div>

          <a
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-black"
            style={{ color: product.accent }}
          >
            View product
            <ArrowRight size={14} weight="bold" />
          </a>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center p-10 lg:p-16">
          <motion.div variants={imgVariants}>
            <TiltCard intensity={10} scale={1.05}>
              <img
                src={product.img}
                alt={product.name}
                className="w-48 h-48 md:w-64 md:h-64 object-contain"
                decoding="async"
                style={{ transform: 'translateZ(24px)', filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.16))' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const next = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (next) next.style.display = 'block';
                }}
              />
              <div className="text-8xl text-center hidden" style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.12))' }}>
                {product.emoji}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16"
          >
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--color-teal)' }}>
              Our candy categories
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2
                className="font-black"
                style={{
                  fontFamily: "'ClashDisplay', 'Nunito', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                }}
              >
                it's delicious.
              </h2>
              <a href="/products" className="btn-secondary text-sm self-start md:self-auto">
                View all products →
              </a>
            </div>
          </motion.div>

          {/* Alternating rows */}
          <div className="flex flex-col gap-6">
            {products.map((product, i) => (
              <ProductRow key={product.name} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
