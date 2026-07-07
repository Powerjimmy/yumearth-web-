import { useRef, lazy, Suspense, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const ConfettiBurst = lazy(() => import('./ConfettiBurst'));

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 1, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

// CSS keyframes for float animations — GPU composited, off main thread
const FLOAT_STYLES = `
  @keyframes hf1  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(5px) rotate(-5deg)} }
  @keyframes hf2  { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-6px) rotate(4deg)} }
  @keyframes hf3  { 0%,100%{transform:translateY(-4px) rotate(0deg)} 50%{transform:translateY(0) rotate(5deg)} }
  @keyframes hf4  { 0%,100%{transform:translateY(4px)} 50%{transform:translateY(0)} }
  @keyframes hf5  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes hf6  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  @keyframes hf7  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
  @keyframes hf8  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(8px) rotate(-5deg)} }
  @keyframes hf9  { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-12px) rotate(5deg)} }
  @keyframes hf10 { 0%,100%{transform:translateY(8px)} 50%{transform:translateY(0)} }
  @keyframes hf11 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes hf12 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
  @keyframes hf13 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-7px) rotate(6deg)} }
  @keyframes hf14 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(6px) rotate(-5deg)} }
`;

export default function HeroReact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <>
      <style>{FLOAT_STYLES}</style>
      <section
        ref={sectionRef}
        className="relative flex items-start overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0,178,191,0.10) 0%, rgba(150,201,61,0.07) 35%, rgba(253,252,248,1) 85%)',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-4 lg:pb-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* ── Left: copy ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ y: textY }}>
            <motion.h1
              variants={fadeUp}
              className="font-black mb-6"
              style={{
                fontFamily: "'ClashDisplay','Nunito',sans-serif",
                fontSize: 'clamp(4rem,9vw,7.5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
              }}
            >
              organic.<br />
              <span style={{ color: 'var(--color-teal)' }}>simple.</span><br />
              <span style={{ color: 'var(--color-green)' }}>delicious.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl mb-8 max-w-md"
              style={{ color: 'var(--color-ink-muted)', lineHeight: 1.65, fontWeight: 500 }}
            >
              Tasty candies with organic ingredients. No artificial dyes. No artificial flavours. Vegan certified &amp; allergen friendly. Non-GMO, gluten free.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Suspense fallback={
                <a
                  href="/distribution"
                  className="inline-flex items-center gap-2 text-base font-black px-6 py-3 rounded-full border-2 transition-all duration-200"
                  style={{ borderColor: 'var(--color-teal)', color: 'white', background: 'var(--color-teal)' }}
                >
                  Become a distributor <ArrowRight size={16} weight="bold" />
                </a>
              }>
                <ConfettiBurst
                  href="/distribution"
                  className="inline-flex items-center gap-2 text-base font-black px-6 py-3 rounded-full border-2 transition-all duration-200"
                  style={{ borderColor: 'var(--color-teal)', color: 'white', background: 'var(--color-teal)' } as CSSProperties}
                >
                  Become a distributor <ArrowRight size={16} weight="bold" />
                </ConfettiBurst>
              </Suspense>
            </motion.div>
          </motion.div>

          {/* ── Mobile product block ── */}
          <motion.div
            className="lg:hidden w-full"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', padding: '0 8px', position: 'relative' }}>

              {/* Floater soft-candy */}
              <img
                src="/images/img/soft-candy.webp" alt=""
                loading="eager"
                style={{ position: 'absolute', left: '10%', top: '-8px',
                  width: 34, objectFit: 'contain', zIndex: 35,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.18))',
                  animation: 'hf1 4.2s ease-in-out infinite 0.8s' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Floater lollipop-ok */}
              <img
                src="/images/img/lollipop-ok.webp" alt=""
                loading="eager"
                style={{ position: 'absolute', right: '22%', top: '-10px',
                  width: 36, objectFit: 'contain', zIndex: 35,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.20))',
                  animation: 'hf2 4.0s ease-in-out infinite 0.6s' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Floater gummy-bears */}
              <img
                src="/images/img/gummy-bears.webp" alt=""
                loading="eager"
                style={{ position: 'absolute', right: '8%', top: '-8px',
                  width: 28, objectFit: 'contain', zIndex: 35,
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))',
                  animation: 'hf3 3.6s ease-in-out infinite 0.4s' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Bag left: fruit snacks */}
              <img
                src="/images/img/bolsa-fruit-sancks.webp" alt="Fruit Snacks"
                loading="eager"
                style={{ width: '28%', maxWidth: 110, objectFit: 'contain', flexShrink: 0,
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))', opacity: 0.9, zIndex: 10,
                  animation: 'hf4 4.8s ease-in-out infinite 0.6s' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Bag center: lollipops */}
              <img
                src="/images/img/bolsa-lollipop-14.webp" alt="YumEarth Lollipops"
                fetchPriority="high"
                loading="eager"
                style={{ width: '40%', maxWidth: 160, objectFit: 'contain', flexShrink: 0,
                  filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.22))', zIndex: 20,
                  marginBottom: 0,
                  animation: 'hf5 4.2s ease-in-out infinite' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Bag right: gummy bears */}
              <img
                src="/images/img/bolsa-gummy-bears.webp" alt="Gummy Bears"
                loading="eager"
                style={{ width: '26%', maxWidth: 100, objectFit: 'contain', flexShrink: 0,
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.13))', opacity: 0.85, zIndex: 10,
                  animation: 'hf6 5s ease-in-out infinite 1.2s' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

            </div>
          </motion.div>

          {/* ── Right: stacked bags (desktop only) ── */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ height: '500px' }}
          >
            {/* Badge: #1 Organic */}
            <motion.div
              className="absolute bg-white rounded-2xl shadow-lg px-4 py-3 z-30 text-center"
              style={{ top: 12, left: '50%', translateX: '-50%' }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--color-teal)' }}>#1 Organic</p>
              <p className="text-sm font-black" style={{ color: 'var(--color-ink)' }}>Candy Brand</p>
            </motion.div>

            {/* Floater: lollipop-wrapper */}
            <img
              src="/images/img/lollipop-wrapper.webp" alt=""
              loading="eager"
              style={{ position: 'absolute', right: '-3%', top: '6%', width: 60, zIndex: 30,
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))',
                animation: 'hf7 3.8s ease-in-out infinite 0.2s' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Floater: soft-candy */}
            <img
              src="/images/img/soft-candy.webp" alt=""
              loading="eager"
              style={{ position: 'absolute', left: '5%', top: '15%', width: 64, zIndex: 30,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))',
                animation: 'hf8 4.2s ease-in-out infinite 0.9s' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Floater: lollipop-ok */}
            <img
              src="/images/img/lollipop-ok.webp" alt=""
              loading="eager"
              style={{ position: 'absolute', right: '18%', top: '5%', width: 56, zIndex: 35,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.20))',
                animation: 'hf9 4.0s ease-in-out infinite 0.6s' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Bag back-left: fruit snacks — wrapper handles positioning, img handles float */}
            <div style={{ position: 'absolute', left: '2%', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
              <img
                src="/images/img/bolsa-fruit-sancks.webp" alt=""
                loading="eager"
                style={{ width: '155px', opacity: 0.85,
                  filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.15))',
                  animation: 'hf10 4.8s ease-in-out infinite 0.6s' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* Bag front-center: lollipops — wrapper handles centering, img handles float */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}>
              <img
                src="/images/img/bolsa-lollipop-14.webp" alt="YumEarth Lollipops"
                fetchPriority="high"
                loading="eager"
                style={{ width: '270px',
                  filter: 'drop-shadow(0 28px 52px rgba(0,0,0,0.22))',
                  animation: 'hf11 4.2s ease-in-out infinite' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* Bag back-right: gummy bears — wrapper handles positioning, img handles float */}
            <div style={{ position: 'absolute', right: '0%', top: '62%', transform: 'translateY(-50%)', zIndex: 10 }}>
              <img
                src="/images/img/bolsa-gummy-bears.webp" alt=""
                loading="eager"
                style={{ width: '140px', opacity: 0.78,
                  filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.13))',
                  animation: 'hf12 5s ease-in-out infinite 1.2s' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* Floater: gummy-bears 1 */}
            <img
              src="/images/img/gummy-bears.webp" alt=""
              loading="eager"
              style={{ position: 'absolute', right: '2%', bottom: '15%', width: 58, zIndex: 35,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))',
                animation: 'hf13 3.7s ease-in-out infinite 0.5s' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Floater: gummy-bears 2 */}
            <img
              src="/images/img/gummy-bears.webp" alt=""
              loading="eager"
              style={{ position: 'absolute', right: '8%', bottom: '8%', width: 48, zIndex: 35,
                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.15))',
                animation: 'hf14 4.3s ease-in-out infinite 1.1s' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Badge: Ships to */}
            <motion.div
              className="absolute bottom-4 left-1/2 bg-white rounded-2xl shadow-xl px-5 py-3 z-30 text-center"
              style={{ translateX: '-50%' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--color-green)' }}>Ships to</p>
              <p className="text-sm font-black" style={{ color: 'var(--color-ink)' }}>40+ Countries in EMEA</p>
            </motion.div>
          </motion.div>
        </div>

      </section>
    </>
  );
}
