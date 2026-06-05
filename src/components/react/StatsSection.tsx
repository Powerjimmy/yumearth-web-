import { useEffect, useRef, useState } from 'react';
import { motion, useInView, LazyMotion, domAnimation } from 'framer-motion';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = to / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 1, suffix: '', prefix: '#', label: 'organic candy brand', color: 'var(--color-teal)' },
  { value: 0, suffix: '', prefix: '', label: 'artificial colors', color: 'var(--color-green)' },
  { value: 30, suffix: '+', prefix: '', label: 'countries distributed', color: 'var(--color-magenta)' },
  { value: 6, suffix: '', prefix: '', label: 'product lines', color: 'var(--color-teal)' },
];

export default function StatsSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-28" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--color-teal)' }}>
                Good Story
              </p>
              <h2
                className="font-black mb-8"
                style={{
                  fontFamily: "'ClashDisplay', 'Nunito', sans-serif",
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                }}
              >
                supported<br />
                <span style={{ color: 'var(--color-teal)' }}>with pride.</span>
              </h2>
              <p className="text-xl mb-8 max-w-md" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.65, fontWeight: 500 }}>
                Organic, simple, natural candies made with much love and few (if any) allergens.
              </p>
              <p className="text-base mb-10" style={{ color: 'var(--color-ink-muted)', lineHeight: 1.65 }}>
                YumEarth is the #1 organic candy brand. No artificial dyes. No artificial flavors. Just real ingredients that parents trust and kids actually want to eat.
              </p>
              <a href="/about" className="btn-primary">About us →</a>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}
                  className="p-8 rounded-3xl"
                  style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="text-5xl font-black mb-2 tabular-nums"
                    style={{ color: s.color, fontFamily: "'ClashDisplay', 'Nunito', sans-serif" }}
                  >
                    {s.prefix}<Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm font-bold" style={{ color: 'var(--color-ink-muted)' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
