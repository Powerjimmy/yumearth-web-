import { useState, useEffect } from 'react';
import { motion, useInView, LazyMotion, domAnimation } from 'framer-motion';
import { useRef } from 'react';

// ── data ─────────────────────────────────────────────────────────────────────
const EUROPE = [
  'Albania','Azerbaijan','Belgium','Bulgaria','Cyprus','Czech Republic',
  'Denmark','Estonia','Finland','France','Georgia','Greece','Hungary',
  'Iceland','Ireland','Kazakhstan','Kosovo','Kyrgyzstan','Latvia',
  'Lithuania','Moldova','Poland','Romania','Russia','Serbia','Slovakia',
  'Spain','Switzerland','Ukraine','Uzbekistan',
];
const MENA = [
  'Bahrain','India','Israel','Ivory Coast','Jordan','Kuwait','Lebanon',
  'Morocco','Oman','Qatar','Saudi Arabia','UAE','Vietnam','South Africa',
];

const SEP = ' ✦ ';

// Animated counter — counts up from 0 with ease-out cubic
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// Marquee row — pure CSS
function MarqueeRow({ items, reverse = false, speed = 40 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const text = [...items, ...items].join(SEP) + SEP;
  const dur = `${speed}s`;
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div style={{
        display: 'flex', width: 'max-content', whiteSpace: 'nowrap',
        animation: `dist-marquee ${dur} linear infinite ${reverse ? 'reverse' : ''}`,
        willChange: 'transform',
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: "'Satoshi','Nunito',sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          {text}{text}
        </span>
      </div>
    </div>
  );
}

export default function DistributionShowcase() {
  const stats = [
    { num: 44,  suffix: '',  label: 'Countries' },
    { num: 30,  suffix: '',  label: 'Europe & Central Asia' },
    { num: 14,  suffix: '+', label: 'MENA & Other Regions' },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <style>{`
        @keyframes dist-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <section style={{ background: 'var(--color-dark)', position: 'relative', overflow: 'hidden', padding: '6rem 0' }}>

        {/* Decorative product floaters — very subtle */}
        <img src="/images/img/bolsa-lollipop-14.webp" alt=""
          aria-hidden="true"
          style={{ position: 'absolute', left: '-4%', top: '50%', transform: 'translateY(-50%) rotate(-12deg)',
            width: 320, opacity: 0.08, pointerEvents: 'none', userSelect: 'none',
            filter: 'blur(1px) drop-shadow(0 0 40px rgba(0,178,191,0.3))' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <img src="/images/img/bolsa-gummy-bears.png" alt=""
          aria-hidden="true"
          style={{ position: 'absolute', right: '-3%', top: '50%', transform: 'translateY(-50%) rotate(10deg)',
            width: 280, opacity: 0.08, pointerEvents: 'none', userSelect: 'none',
            filter: 'blur(1px) drop-shadow(0 0 40px rgba(150,201,61,0.3))' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        {/* Radial glow center */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,178,191,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <span style={{
              display: 'inline-block', fontSize: '0.7rem', fontWeight: 700,
              fontFamily: "'Satoshi','Nunito',sans-serif",
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--color-teal)', background: 'rgba(0,178,191,0.15)',
              padding: '0.35rem 1rem', borderRadius: '9999px', marginBottom: '1.5rem',
            }}>
              EU · EMEA Master Distribution
            </span>

            <h2 style={{
              fontFamily: "'ClashDisplay','Nunito',sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'white',
              marginBottom: '1.25rem',
            }}>
              reaching<br />
              <span style={{ color: 'var(--color-teal)' }}>the world.</span>
            </h2>

            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', fontFamily: "'Satoshi','Nunito',sans-serif", fontWeight: 500, lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
              44 countries. Two regions. One mission — organic candy everywhere.
            </p>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', marginBottom: '4rem', background: 'rgba(255,255,255,0.08)', borderRadius: '1.5rem', overflow: 'hidden' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }}
                style={{ padding: '2.5rem 2rem', textAlign: 'center', background: 'rgba(16,58,60,0.6)', backdropFilter: 'blur(8px)' }}
              >
                <div style={{
                  fontFamily: "'ClashDisplay','Nunito',sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-teal)',
                  marginBottom: '0.5rem',
                }}>
                  <Counter target={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: "'Satoshi','Nunito',sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Country marquees */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {/* Europe — scrolls left */}
            <MarqueeRow items={EUROPE} reverse={false} speed={45} />
            {/* MENA — scrolls right */}
            <MarqueeRow items={MENA} reverse={true} speed={35} />
          </motion.div>

        </div>
      </section>
    </LazyMotion>
  );
}
