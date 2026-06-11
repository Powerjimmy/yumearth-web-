import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from '@phosphor-icons/react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Mom of 3',
    text: 'Finally, candy I can give my kids without worrying. The lollipops are a huge hit, and I love that they\'re made with real fruit juice.',
    rating: 5,
    initials: 'SM',
    accentColor: 'var(--color-teal)',
  },
  {
    name: 'Marc T.',
    role: 'Conscious parent',
    text: 'As someone with food allergies, finding safe sweets was always a challenge. YumEarth changed everything — delicious and allergen-friendly.',
    rating: 5,
    initials: 'MT',
    accentColor: 'var(--color-green)',
  },
  {
    name: 'Jennifer L.',
    role: 'Verified buyer',
    text: 'The sour beans are seriously addictive. Love that they\'re vegan and gluten-free. My whole family is hooked.',
    rating: 5,
    initials: 'JL',
    accentColor: 'var(--color-magenta)',
  },
  {
    name: 'David K.',
    role: 'Nutritionist',
    text: 'I recommend YumEarth to all my clients looking for a healthier alternative. Real ingredients, incredible flavor.',
    rating: 5,
    initials: 'DK',
    accentColor: 'var(--color-teal)',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const visible = [current, (current + 1) % testimonials.length];

  return (
    
      <section className="py-24" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16 text-center"
          >
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--color-teal)' }}>
              What they say
            </p>
            <h2 className="font-black"
              style={{ fontFamily: "'ClashDisplay','Nunito',sans-serif", fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              fans don't lie.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            {visible.map((idx, pos) => {
              const t = testimonials[idx];
              return (
                <AnimatePresence key={idx} mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className="rounded-3xl p-8"
                    style={{ background: pos === 0 ? 'var(--color-surface)' : 'white', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} weight="fill" style={{ color: 'var(--color-orange)' }} />
                      ))}
                    </div>
                    <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-ink)', lineHeight: 1.7 }}>
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ background: t.accentColor, color: 'var(--color-ink)' }}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-black" style={{ color: 'var(--color-ink)' }}>{t.name}</p>
                        <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </div>

          {/* Nav dots + arrows */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-ink hover:text-white hover:border-ink active:scale-95"
              style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
              aria-label="Previous"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{ background: i === current ? 'var(--color-teal)' : 'rgba(0,0,0,0.15)', width: i === current ? '24px' : '8px' }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-ink hover:text-white hover:border-ink active:scale-95"
              style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
              aria-label="Next"
            >
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </section>
    
  );
}
