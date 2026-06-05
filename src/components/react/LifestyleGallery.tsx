import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LazyMotion, domAnimation } from 'framer-motion';

interface IgPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

// Fallback static photos — used if Instagram API fails
const FALLBACK_PHOTOS = [
  {
    src: 'https://picsum.photos/seed/yum1/600/800',
    alt: 'Kids enjoying YumEarth candy',
    caption: '#besteverlollipop',
    tall: true,
    bg: '#FFF0F2',
    href: 'https://www.instagram.com/yumearth.eu/',
  },
  {
    src: 'https://picsum.photos/seed/yum2/600/450',
    alt: 'YumEarth Fruit Snacks on table',
    caption: '100% Daily Vitamin C',
    tall: false,
    bg: '#F0EAFF',
    href: 'https://www.instagram.com/yumearth.eu/',
  },
  {
    src: 'https://picsum.photos/seed/yum3/600/450',
    alt: 'Organic lollipop closeup',
    caption: 'Real fruit. Real flavor.',
    tall: false,
    bg: '#FFF0F2',
    href: 'https://www.instagram.com/yumearth.eu/',
  },
  {
    src: 'https://picsum.photos/seed/yum4/600/800',
    alt: 'YumEarth Gummy Bears',
    caption: 'Organic & allergen friendly',
    tall: true,
    bg: '#EFF8E6',
    href: 'https://www.instagram.com/yumearth.eu/',
  },
  {
    src: 'https://picsum.photos/seed/yum5/600/450',
    alt: 'Giggles for little ones',
    caption: 'Perfect for little ones',
    tall: false,
    bg: '#FFE8F0',
    href: 'https://www.instagram.com/yumearth.eu/',
  },
  {
    src: 'https://picsum.photos/seed/yum6/600/450',
    alt: 'Sour Beans snack',
    caption: 'Your new sour obsession',
    tall: false,
    bg: '#EAF8EE',
    href: 'https://www.instagram.com/yumearth.eu/',
  },
];

const BG_CYCLE = ['#FFF0F2', '#F0EAFF', '#EFF8E6', '#FFE8F0', '#EAF8EE', '#FFF8EC'];

function igPostToPhoto(post: IgPost, i: number) {
  const src =
    post.media_type === 'VIDEO'
      ? post.thumbnail_url ?? ''
      : post.media_url ?? '';
  return {
    src,
    alt: 'YumEarth on Instagram',
    caption: new Date(post.timestamp).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
    tall: i % 2 === 0,
    bg: BG_CYCLE[i % BG_CYCLE.length],
    href: post.permalink,
  };
}

export default function LifestyleGallery() {
  const [photos, setPhotos] = useState(FALLBACK_PHOTOS);

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((data) => {
        if (data.error || !Array.isArray(data.data) || data.data.length === 0) return;
        const mapped = data.data
          .filter((p: IgPost) => p.media_type === 'VIDEO' ? !!p.thumbnail_url : !!p.media_url)
          .slice(0, 6)
          .map(igPostToPhoto);
        if (mapped.length > 0) setPhotos(mapped);
      })
      .catch(() => {
        // keep fallback
      });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
                Sweet Gallery
              </p>
              <h2 className="font-black"
                style={{ fontFamily: "'ClashDisplay','Nunito',sans-serif", fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                the full range.
              </h2>
            </div>
            <a
              href="https://www.instagram.com/yumearth.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm self-start md:self-auto"
            >
              @yumearth.eu →
            </a>
          </motion.div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.a
                key={i}
                href={photo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-inside-avoid rounded-2xl overflow-hidden relative group block"
                style={{ background: photo.bg }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: i * 0.07 }}
              >
                <div
                  style={{ aspectRatio: photo.tall ? '3/4' : '4/3', overflow: 'hidden' }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Caption overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
                >
                  <p className="text-xs font-black text-white uppercase tracking-widest">{photo.caption}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/products" className="btn-primary text-sm">View all products →</a>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
