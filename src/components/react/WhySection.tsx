import { motion } from 'framer-motion';

const statements = [
  {
    number: '01',
    headline: 'Zero artificial colors.',
    body: '',
    accent: 'var(--color-teal)',
    image: '/images/img/Zero-artificial.webp',
  },
  {
    number: '02',
    headline: 'Certified Organic.',
    body: '',
    accent: 'var(--color-green)',
    image: '/images/img/Certified-Organic..webp',
  },
  {
    number: '03',
    headline: 'Kids actually want to eat it.',
    body: '',
    accent: 'var(--color-magenta)',
    image: '/images/img/vegan-glutenfree.webp',
  },
];

export default function WhySection() {
  return (
    <>
      
      <section className="py-24" style={{ background: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>


        {/* Content */}
        <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16"
          >
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--color-teal)' }}>
              Why YumEarth
            </p>
            <h2
              className="font-black max-w-xl"
              style={{
                fontFamily: "'ClashDisplay', 'Nunito', sans-serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              no shortcuts.<br />
              <span style={{ color: 'var(--color-teal)' }}>no compromises.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            {statements.map((s, i) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}
                className="py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 group"
              >
                {/* Number */}
                <span
                  className="text-sm font-black tabular-nums w-8 flex-shrink-0"
                  style={{ color: s.accent }}
                >
                  {s.number}
                </span>

                {/* Headline */}
                <motion.h3
                  className="font-black md:w-64 flex-shrink-0"
                  style={{
                    fontFamily: "'ClashDisplay', 'Nunito', sans-serif",
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                    color: 'var(--color-ink)',
                  }}
                >
                  {s.headline}
                </motion.h3>

                {/* Body */}
                {s.body && (
                  <p
                    className="text-base leading-relaxed flex-1"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {s.body}
                  </p>
                )}

                {/* Image — right side */}
                <div className="flex-shrink-0 flex items-center justify-end md:w-48">
                  <img
                    src={s.image}
                    alt=""
                    style={{ height: 150, width: 'auto', maxWidth: 220, objectFit: 'contain' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </>
  );
}
