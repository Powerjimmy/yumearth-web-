import { useState } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

// SVG viewBox="0 0 100 50" — equirectangular
// x = (lon + 180) / 360 * 100
// y = (90 - lat) / 180 * 50

interface Dot { name: string; x: number; y: number; region: 'europe' | 'mena'; }

const DOTS: Dot[] = [
  { name: 'Albania',        x: 55.6, y: 13.6, region: 'europe' },
  { name: 'Azerbaijan',     x: 63.2, y: 13.9, region: 'europe' },
  { name: 'Belgium',        x: 51.2, y: 11.0, region: 'europe' },
  { name: 'Bulgaria',       x: 57.1, y: 13.1, region: 'europe' },
  { name: 'Cyprus',         x: 59.3, y: 15.3, region: 'europe' },
  { name: 'Czech Republic', x: 54.3, y: 11.2, region: 'europe' },
  { name: 'Denmark',        x: 52.6, y:  9.4, region: 'europe' },
  { name: 'Estonia',        x: 57.0, y:  8.7, region: 'europe' },
  { name: 'Finland',        x: 57.2, y:  7.8, region: 'europe' },
  { name: 'France',         x: 50.6, y: 12.2, region: 'europe' },
  { name: 'Georgia',        x: 62.0, y: 13.2, region: 'europe' },
  { name: 'Greece',         x: 56.1, y: 14.2, region: 'europe' },
  { name: 'Hungary',        x: 55.4, y: 11.9, region: 'europe' },
  { name: 'Iceland',        x: 44.7, y:  7.0, region: 'europe' },
  { name: 'Ireland',        x: 47.7, y: 10.2, region: 'europe' },
  { name: 'Kazakhstan',     x: 68.6, y: 11.7, region: 'europe' },
  { name: 'Kosovo',         x: 55.8, y: 13.2, region: 'europe' },
  { name: 'Kyrgyzstan',     x: 70.8, y: 13.6, region: 'europe' },
  { name: 'Latvia',         x: 57.1, y:  9.2, region: 'europe' },
  { name: 'Lithuania',      x: 56.6, y:  9.7, region: 'europe' },
  { name: 'Moldova',        x: 58.4, y: 11.8, region: 'europe' },
  { name: 'Poland',         x: 55.3, y: 10.6, region: 'europe' },
  { name: 'Romania',        x: 56.9, y: 12.2, region: 'europe' },
  { name: 'Russia',         x: 79.3, y:  7.9, region: 'europe' },
  { name: 'Serbia',         x: 55.8, y: 12.8, region: 'europe' },
  { name: 'Slovakia',       x: 55.5, y: 11.5, region: 'europe' },
  { name: 'Spain',          x: 49.0, y: 13.8, region: 'europe' },
  { name: 'Switzerland',    x: 52.3, y: 12.0, region: 'europe' },
  { name: 'Ukraine',        x: 58.7, y: 11.6, region: 'europe' },
  { name: 'Uzbekistan',     x: 68.2, y: 13.5, region: 'europe' },
  { name: 'Bahrain',        x: 64.0, y: 17.8, region: 'mena' },
  { name: 'India',          x: 71.9, y: 19.3, region: 'mena' },
  { name: 'Israel',         x: 59.7, y: 16.4, region: 'mena' },
  { name: 'Ivory Coast',    x: 48.7, y: 22.9, region: 'mena' },
  { name: 'Jordan',         x: 60.1, y: 16.5, region: 'mena' },
  { name: 'Kuwait',         x: 63.2, y: 16.9, region: 'mena' },
  { name: 'Lebanon',        x: 60.0, y: 15.6, region: 'mena' },
  { name: 'Morocco',        x: 47.5, y: 16.2, region: 'mena' },
  { name: 'Oman',           x: 65.5, y: 19.0, region: 'mena' },
  { name: 'Qatar',          x: 64.2, y: 18.0, region: 'mena' },
  { name: 'Saudi Arabia',   x: 62.5, y: 18.4, region: 'mena' },
  { name: 'UAE',            x: 65.0, y: 18.5, region: 'mena' },
  { name: 'Vietnam',        x: 80.1, y: 21.1, region: 'mena' },
  { name: 'South Africa',   x: 56.4, y: 33.5, region: 'mena' },
];

// ── Continent land-mass paths (significantly improved detail) ────────────────
const LAND = [
  // Greenland
  { id: 'gl', d: 'M 30,2 L 34,1 L 39,2 L 40,5 L 38,7 L 33,8 L 29,6 Z' },
  // Iceland
  { id: 'ic', d: 'M 43,6 L 47,5 L 48,7 L 45,9 L 43,8 Z' },
  // UK (simplified)
  { id: 'uk', d: 'M 47,10 L 49,9 L 52,9 L 52,12 L 50,13 L 47,12 Z' },
  // North America
  { id: 'na', d: 'M 8,6 L 11,4 L 15,3 L 19,3 L 22,4 L 26,6 L 29,8 L 30,11 L 28,14 L 27,16 L 25,19 L 23,23 L 21,27 L 19,30 L 18,33 L 16,32 L 14,28 L 11,23 L 9,18 L 7,12 Z' },
  // South America
  { id: 'sa', d: 'M 20,27 L 24,26 L 29,28 L 33,31 L 34,36 L 31,43 L 28,48 L 25,48 L 22,44 L 20,40 L 19,35 Z' },
  // Europe + Scandinavia (more detail)
  { id: 'eu', d: 'M 47,15 L 47,13 L 48,11 L 49,10 L 50,9 L 51,8 L 52,7 L 51,5 L 53,4 L 55,4 L 57,4 L 59,5 L 58,7 L 60,7 L 63,7 L 65,7 L 66,8 L 65,10 L 63,10 L 62,12 L 63,14 L 62,16 L 60,17 L 58,17 L 57,16 L 56,18 L 55,20 L 53,20 L 51,19 L 50,18 L 48,17 Z' },
  // Italy peninsula
  { id: 'it', d: 'M 52,15 L 55,14 L 57,16 L 57,19 L 55,21 L 53,18 Z' },
  // Iberian peninsula extra detail
  { id: 'ib', d: 'M 47,14 L 50,13 L 51,15 L 50,17 L 48,17 L 46,16 Z' },
  // Russia + Central Asia (large)
  { id: 'ru', d: 'M 61,7 L 67,6 L 74,5 L 82,5 L 90,6 L 96,7 L 98,9 L 95,11 L 90,13 L 83,13 L 78,14 L 74,14 L 70,15 L 68,14 L 65,13 L 63,11 L 62,9 Z' },
  // Middle East + Arabian Peninsula
  { id: 'me', d: 'M 57,14 L 63,13 L 67,13 L 71,14 L 72,17 L 70,22 L 66,24 L 62,24 L 59,22 L 57,19 Z' },
  // Indian subcontinent
  { id: 'in', d: 'M 65,15 L 73,15 L 77,17 L 79,21 L 77,26 L 73,28 L 69,27 L 66,23 L 65,19 Z' },
  // Africa
  { id: 'af', d: 'M 45,15 L 50,15 L 55,14 L 60,14 L 64,15 L 68,16 L 70,19 L 69,23 L 66,26 L 64,30 L 63,37 L 61,43 L 57,49 L 53,49 L 49,46 L 46,41 L 43,34 L 43,26 L 44,19 Z' },
  // SE Asia
  { id: 'sea', d: 'M 80,21 L 86,20 L 92,21 L 94,24 L 89,26 L 83,25 L 80,23 Z' },
  // Australia
  { id: 'au', d: 'M 79,32 L 86,31 L 93,33 L 94,38 L 91,43 L 85,46 L 80,44 L 77,40 L 77,36 Z' },
  // Japan
  { id: 'jp', d: 'M 88,13 L 91,12 L 92,14 L 90,16 L 88,15 Z' },
];

// ── Distribution zone glow overlays ─────────────────────────────────────────
// Looser shapes — atmospheric highlights, not strict country borders
const EU_GLOW  = 'M 43,6 L 47,7 L 49,9 L 50,9 L 51,8 L 53,4 L 57,4 L 60,5 L 62,6 L 65,7 L 68,8 L 72,8 L 74,10 L 74,14 L 70,15 L 67,14 L 63,14 L 62,16 L 60,17 L 56,18 L 55,20 L 53,20 L 51,19 L 50,18 L 48,17 L 47,15 L 47,13 L 48,11 L 46,9 L 44,8 Z';
const MENA_GLOW = 'M 45,15 L 50,15 L 55,14 L 63,13 L 67,13 L 74,14 L 74,17 L 71,22 L 67,24 L 63,24 L 58,22 L 55,22 L 52,25 L 49,26 L 47,24 L 45,20 Z';
// Outliers: India, Vietnam, South Africa — individual dot-glow handled separately

export default function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredDot = hovered ? DOTS.find(d => d.name === hovered) : null;

  return (
    <LazyMotion features={domAnimation}>
      <style>{`
        @keyframes wm-ping {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(3.5); opacity: 0;   }
          100% { transform: scale(3.5); opacity: 0;   }
        }
        @keyframes wm-scan {
          0%   { transform: translateY(0);  opacity: 0; }
          5%   { opacity: 0.4; }
          95%  { opacity: 0.4; }
          100% { transform: translateY(50px); opacity: 0; }
        }
        @keyframes wm-zone-pulse {
          0%,100% { opacity: 0.18; }
          50%     { opacity: 0.32; }
        }
        @keyframes wm-flicker {
          0%,100% { opacity: 1; }
          92%     { opacity: 1; }
          93%     { opacity: 0.6; }
          94%     { opacity: 1; }
          96%     { opacity: 0.8; }
          97%     { opacity: 1; }
        }
        .wm-ping {
          transform-box: fill-box;
          transform-origin: center;
          animation: wm-ping 2.8s cubic-bezier(0,0,0.2,1) infinite;
        }
        .wm-zone-eu  { animation: wm-zone-pulse 4s ease-in-out infinite; }
        .wm-zone-mena{ animation: wm-zone-pulse 4s ease-in-out infinite 1.5s; }
      `}</style>

      <motion.div
        className="relative rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <svg
          viewBox="0 0 100 50"
          style={{ width: '100%', display: 'block' }}
          aria-label="World map showing YumEarth distribution"
        >
          <defs>
            {/* Dark ocean gradient */}
            <radialGradient id="wm-ocean" cx="52%" cy="45%" r="65%">
              <stop offset="0%"   stopColor="#0d2535" />
              <stop offset="100%" stopColor="#060f18" />
            </radialGradient>

            {/* Glow filter — teal */}
            <filter id="wm-glow-teal" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glow filter — green */}
            <filter id="wm-glow-green" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Scanline gradient */}
            <linearGradient id="wm-scanline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(0,178,191,0)" />
              <stop offset="50%"  stopColor="rgba(0,178,191,0.6)" />
              <stop offset="100%" stopColor="rgba(0,178,191,0)" />
            </linearGradient>

            {/* Edge vignette */}
            <radialGradient id="wm-vignette" cx="50%" cy="50%" r="50%">
              <stop offset="60%"  stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
            </radialGradient>
          </defs>

          {/* Ocean */}
          <rect width="100" height="50" fill="url(#wm-ocean)" />

          {/* Subtle lat/lon grid */}
          {[-60,-30,0,30,60].map(lat => (
            <line key={`lat${lat}`} x1="0" x2="100"
              y1={(90-lat)/180*50} y2={(90-lat)/180*50}
              stroke="rgba(0,178,191,0.06)" strokeWidth="0.12" />
          ))}
          {[-120,-60,0,60,120].map(lon => (
            <line key={`lon${lon}`}
              x1={(lon+180)/360*100} x2={(lon+180)/360*100}
              y1="0" y2="50"
              stroke="rgba(0,178,191,0.06)" strokeWidth="0.12" />
          ))}

          {/* Land masses — dim base layer */}
          {LAND.map(c => (
            <path key={c.id} d={c.d}
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="0.18"
              strokeLinejoin="round"
            />
          ))}

          {/* Distribution zone glow — Europe */}
          <path d={EU_GLOW}
            className="wm-zone-eu"
            fill="rgba(0,178,191,0.18)"
            stroke="rgba(0,178,191,0.5)"
            strokeWidth="0.25"
            strokeLinejoin="round"
            filter="url(#wm-glow-teal)"
          />

          {/* Distribution zone glow — MENA */}
          <path d={MENA_GLOW}
            className="wm-zone-mena"
            fill="rgba(150,201,61,0.15)"
            stroke="rgba(150,201,61,0.45)"
            strokeWidth="0.25"
            strokeLinejoin="round"
            filter="url(#wm-glow-green)"
          />

          {/* Scanline sweep */}
          <rect
            x="0" y="0" width="100" height="1.2"
            fill="url(#wm-scanline)"
            style={{ animation: 'wm-scan 6s linear infinite' }}
          />

          {/* Vignette overlay */}
          <rect width="100" height="50" fill="url(#wm-vignette)" />

          {/* Country dots */}
          {DOTS.map((dot, i) => {
            const color  = dot.region === 'europe' ? '#00B2BF' : '#96C93D';
            const isH    = hovered === dot.name;
            const delay  = `${((i * 0.21) % 2.8).toFixed(2)}s`;
            return (
              <g key={dot.name}
                onMouseEnter={() => setHovered(dot.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'default' }}
              >
                {/* Outer ping ring */}
                <circle className="wm-ping" cx={dot.x} cy={dot.y} r="0.42"
                  fill={color} opacity="0.9"
                  style={{ animationDelay: delay }}
                />
                {/* Core dot */}
                <circle cx={dot.x} cy={dot.y} r={isH ? 0.75 : 0.42}
                  fill={isH ? '#ffffff' : color}
                  style={{ transition: 'r 120ms ease-out' }}
                />
                {/* Glow halo on hover */}
                {isH && (
                  <circle cx={dot.x} cy={dot.y} r="1.2"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.3"
                    opacity="0.5"
                  />
                )}
              </g>
            );
          })}

          {/* Hover tooltip */}
          {hoveredDot && (() => {
            const color = hoveredDot.region === 'europe' ? '#00B2BF' : '#96C93D';
            const w     = hoveredDot.name.length * 1.05 + 2.4;
            const lx    = Math.min(Math.max(hoveredDot.x - w / 2, 0.5), 99.5 - w);
            const above = hoveredDot.y > 6;
            const ly    = above ? hoveredDot.y - 4.5 : hoveredDot.y + 2.2;
            return (
              <g style={{ pointerEvents: 'none' }}>
                {/* Connector line */}
                <line
                  x1={hoveredDot.x} y1={hoveredDot.y}
                  x2={hoveredDot.x} y2={above ? hoveredDot.y - 2.2 : hoveredDot.y + 1.8}
                  stroke={color} strokeWidth="0.15" opacity="0.6"
                />
                {/* Pill background */}
                <rect x={lx} y={ly - 1.8} width={w} height="2.4"
                  rx="0.6"
                  fill="rgba(6,15,24,0.92)"
                  stroke={color}
                  strokeWidth="0.15"
                  strokeOpacity="0.6"
                />
                <text x={lx + 1.2} y={ly - 0.22}
                  fontSize="1.3" fill="white"
                  fontFamily="Satoshi,sans-serif" fontWeight="700">
                  {hoveredDot.name}
                </text>
              </g>
            );
          })()}

          {/* Region labels — HUD style */}
          <text x="52" y="48.5" fontSize="1.1"
            fill="rgba(0,178,191,0.5)" fontFamily="Satoshi,sans-serif"
            fontWeight="700" letterSpacing="0.15" textAnchor="middle"
            style={{ textTransform: 'uppercase', animation: 'wm-flicker 8s ease-in-out infinite' }}>
            EUROPE &amp; CENTRAL ASIA
          </text>

          {/* Corner HUD brackets */}
          {/* Top-left */}
          <path d="M 1,1.5 L 1,0.5 L 2,0.5" fill="none" stroke="rgba(0,178,191,0.35)" strokeWidth="0.25" />
          {/* Top-right */}
          <path d="M 98,1.5 L 98,0.5 L 97,0.5" fill="none" stroke="rgba(0,178,191,0.35)" strokeWidth="0.25" />
          {/* Bottom-left */}
          <path d="M 1,48.5 L 1,49.5 L 2,49.5" fill="none" stroke="rgba(0,178,191,0.35)" strokeWidth="0.25" />
          {/* Bottom-right */}
          <path d="M 98,48.5 L 98,49.5 L 97,49.5" fill="none" stroke="rgba(0,178,191,0.35)" strokeWidth="0.25" />
        </svg>

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: 10, right: 14,
          display: 'flex', gap: 14, alignItems: 'center',
        }}>
          {[
            { color: '#00B2BF', label: 'Europe & Central Asia' },
            { color: '#96C93D', label: 'MENA & Other' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0,
                boxShadow: `0 0 6px ${color}` }} />
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)', fontFamily: 'Satoshi,sans-serif',
                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </LazyMotion>
  );
}
