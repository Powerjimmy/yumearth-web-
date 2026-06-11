import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VIDEO_SRC = '/videos/video-src.mp4';

export default function VideoShowcase() {
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay muted when section enters viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => setStarted(true)).catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    video.play().catch(() => {});
  };

  return (
    
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
              muted
              loop
              preload="metadata"
            />

            {/* Unmute button — shown after autoplay starts */}
            {started && muted && (
              <motion.button
                className="absolute bottom-5 right-5 flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'background 150ms ease-out' }}
                onClick={handleUnmute}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                aria-label="Unmute video"
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.55)')}
                whileTap={{ scale: 0.97 }}
              >
                {/* Muted speaker icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Unmute
              </motion.button>
            )}

            {/* Initial overlay — before autoplay fires */}
            {!started && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.35)' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M6 4l14 8-14 8V4z"/>
                  </svg>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </section>
    
  );
}
