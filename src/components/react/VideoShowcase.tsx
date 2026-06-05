import { useState, useRef } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

const VIDEO_SRC = '/videos/video-src.mp4';

export default function VideoShowcase() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="mb-10 text-center"
          >
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
              It's delicious
            </p>
            <h2 className="font-black"
              style={{ fontFamily: "'ClashDisplay','Nunito',sans-serif", fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              see it in action.
            </h2>
          </motion.div>

          {/* Video player */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: '16/9', background: 'var(--color-dark)' }}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="w-full h-full object-cover"
              playsInline
              preload="none"
              onEnded={() => setPlaying(false)}
              controls={playing}
            />

            {/* Play button overlay */}
            {!playing && (
              <motion.button
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 cursor-pointer"
                style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
                onClick={handlePlay}
                whileHover={{ background: 'rgba(0,0,0,0.20)' }}
                transition={{ duration: 0.2 }}
                aria-label="Play video"
              >
                {/* Play circle */}
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.95)' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Triangle */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 4l14 8-14 8V4z" fill="var(--color-ink)" />
                  </svg>
                </motion.div>

              </motion.button>
            )}
          </motion.div>

        </div>
      </section>
    </LazyMotion>
  );
}
