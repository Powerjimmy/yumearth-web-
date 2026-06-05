import { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, LazyMotion, domAnimation } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const ConfettiBurst = lazy(() => import('./ConfettiBurst'));


const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] } },
};

export default function HeroReact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative flex items-start overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0,178,191,0.10) 0%, rgba(150,201,61,0.07) 35%, rgba(253,252,248,1) 85%)',
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* ── Left: copy ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ y: textY }}>
            <motion.div variants={fadeUp}>
              <span
                className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-8"
                style={{ background: 'rgba(0,178,191,0.12)', color: 'var(--color-teal)' }}
              >
                🇪🇺 EMEA Master Distribution
              </span>
            </motion.div>

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
              Natural candies with real ingredients. No artificial dyes. No artificial flavors. Just the good stuff. Non-GMO, gluten free, vegan and kosher.
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
                  style={{ borderColor: 'var(--color-teal)', color: 'white', background: 'var(--color-teal)' } as React.CSSProperties}
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
            {/* Simple flex row: 3 bags side by side, vertically aligned at bottom */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', padding: '0 8px', position: 'relative' }}>

              {/* Floater soft-candy — above left bag (fruit snacks) */}
              <motion.img
                src="/images/img/soft-candy.png" alt=""
                style={{ position: 'absolute', left: '10%', top: '-8px',
                  width: 34, objectFit: 'contain', zIndex: 35,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.18))' }}
                animate={{ y: [0, 5, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Floater lollipop-ok — above center bag, shifted right */}
              <motion.img
                src="/images/img/lollipop-ok.png" alt=""
                style={{ position: 'absolute', right: '22%', top: '-10px',
                  width: 36, objectFit: 'contain', zIndex: 35,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.20))' }}
                animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Floater gummy-bears — above right bag */}
              <motion.img
                src="/images/img/gummy-bears.png" alt=""
                style={{ position: 'absolute', right: '8%', top: '-8px',
                  width: 28, objectFit: 'contain', zIndex: 35,
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.18))' }}
                animate={{ y: [-4, 0, -4], rotate: [0, 5, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Bag left: fruit snacks */}
              <motion.img
                src="/images/img/bolsa-fruit-sancks.png" alt="Fruit Snacks"
                style={{ width: '28%', maxWidth: 110, objectFit: 'contain', flexShrink: 0,
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))', opacity: 0.9, zIndex: 10 }}
                animate={{ y: [4, 0, 4] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Bag center: lollipops — tallest, sticks out above */}
              <motion.img
                src="/images/img/bolsa-lollipop-14.png" alt="YumEarth Lollipops"
                style={{ width: '40%', maxWidth: 160, objectFit: 'contain', flexShrink: 0,
                  filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.22))', zIndex: 20,
                  marginBottom: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Bag right: gummy bears */}
              <motion.img
                src="/images/img/bolsa-gummy-bears.png" alt="Gummy Bears"
                style={{ width: '26%', maxWidth: 100, objectFit: 'contain', flexShrink: 0,
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.13))', opacity: 0.85, zIndex: 10 }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

            </div>
          </motion.div>

          {/* ── Right: stacked bags (desktop only) ── */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ height: '500px' }}
          >
            {/* Badge: #1 Organic — centered top */}
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

            {/* Floater: lollipop-wrapper — far right top */}
            <motion.img
              src="/images/img/lollipop-wrapper.png" alt=""
              style={{ position: 'absolute', right: '-3%', top: '6%', width: 60, zIndex: 30,
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))' }}
              animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Floater: soft-candy — top left */}
            <motion.img
              src="/images/img/soft-candy.png" alt=""
              style={{ position: 'absolute', left: '5%', top: '15%', width: 64, zIndex: 30,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))' }}
              animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Floater: lollipop-ok — top center-right */}
            <motion.img
              src="/images/img/lollipop-ok.png" alt=""
              style={{ position: 'absolute', right: '18%', top: '5%', width: 56, zIndex: 35,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.20))' }}
              animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />


            {/* Bag back-left: fruit snacks */}
            <motion.img
              src="/images/img/bolsa-fruit-sancks.png" alt=""
              style={{
                position: 'absolute', left: '2%', top: '50%', translateY: '-50%',
                width: '155px', opacity: 0.85,
                filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.15))', zIndex: 10,
              }}
              animate={{ y: [8, 0, 8] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Bag front-center: lollipops */}
            <motion.img
              src="/images/img/bolsa-lollipop-14.png" alt="YumEarth Lollipops"
              style={{
                position: 'absolute', left: '50%', top: '50%',
                translateX: '-50%', translateY: '-50%',
                width: '270px',
                filter: 'drop-shadow(0 28px 52px rgba(0,0,0,0.22))', zIndex: 20,
              }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Bag back-right: gummy bears — lowered to align with floaters */}
            <motion.img
              src="/images/img/bolsa-gummy-bears.png" alt=""
              style={{
                position: 'absolute', right: '0%', top: '62%', translateY: '-50%',
                width: '140px', opacity: 0.78,
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.13))', zIndex: 10,
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Floater: gummy-bears — bottom right x2 */}
            <motion.img
              src="/images/img/gummy-bears.png" alt=""
              style={{ position: 'absolute', right: '2%', bottom: '15%', width: 58, zIndex: 35,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))' }}
              animate={{ y: [0, -7, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 3.7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <motion.img
              src="/images/img/gummy-bears.png" alt=""
              style={{ position: 'absolute', right: '8%', bottom: '8%', width: 48, zIndex: 35,
                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.15))' }}
              animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />

            {/* Badge: Ships to — bottom center */}
            <motion.div
              className="absolute bottom-4 left-1/2 bg-white rounded-2xl shadow-xl px-5 py-3 z-30 text-center"
              style={{ translateX: '-50%' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--color-green)' }}>Ships to</p>
              <p className="text-sm font-black" style={{ color: 'var(--color-ink)' }}>30+ Countries 🇪🇺</p>
            </motion.div>
          </motion.div>
        </div>

      </section>
    </LazyMotion>
  );
}
