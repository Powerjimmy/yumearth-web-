"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"
import { motion, LazyMotion, domAnimation } from "framer-motion"

interface DistributionMarker {
  id: string
  location: [number, number] // [lat, lng]
  name: string
  iso: string   // ISO 3166-1 alpha-2 for flag emoji
  region: "europe" | "mena"
}

// flag emoji from ISO code
function flag(iso: string) {
  return [...iso.toUpperCase()].map(c =>
    String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
  ).join("")
}

const MARKERS: DistributionMarker[] = [
  // Europe & Central Asia
  { id: "albania",     location: [41.15,  20.17], name: "Albania",        iso: "AL", region: "europe" },
  { id: "azerbaijan",  location: [40.14,  47.58], name: "Azerbaijan",     iso: "AZ", region: "europe" },
  { id: "belgium",     location: [50.50,   4.47], name: "Belgium",        iso: "BE", region: "europe" },
  { id: "bulgaria",    location: [42.73,  25.49], name: "Bulgaria",       iso: "BG", region: "europe" },
  { id: "cyprus",      location: [35.13,  33.43], name: "Cyprus",         iso: "CY", region: "europe" },
  { id: "czech",       location: [49.82,  15.47], name: "Czech Republic", iso: "CZ", region: "europe" },
  { id: "denmark",     location: [56.26,   9.50], name: "Denmark",        iso: "DK", region: "europe" },
  { id: "estonia",     location: [58.60,  25.01], name: "Estonia",        iso: "EE", region: "europe" },
  { id: "finland",     location: [61.92,  25.75], name: "Finland",        iso: "FI", region: "europe" },
  { id: "france",      location: [46.23,   2.21], name: "France",         iso: "FR", region: "europe" },
  { id: "georgia",     location: [42.32,  43.36], name: "Georgia",        iso: "GE", region: "europe" },
  { id: "greece",      location: [39.07,  21.82], name: "Greece",         iso: "GR", region: "europe" },
  { id: "hungary",     location: [47.16,  19.50], name: "Hungary",        iso: "HU", region: "europe" },
  { id: "ireland",     location: [53.13,  -8.24], name: "Ireland",        iso: "IE", region: "europe" },
  { id: "iceland",     location: [64.96, -18.49], name: "Iceland",        iso: "IS", region: "europe" },
  { id: "kazakhstan",  location: [48.02,  66.92], name: "Kazakhstan",     iso: "KZ", region: "europe" },
  { id: "kosovo",      location: [42.60,  20.90], name: "Kosovo",         iso: "XK", region: "europe" },
  { id: "kyrgyzstan",  location: [41.20,  74.77], name: "Kyrgyzstan",     iso: "KG", region: "europe" },
  { id: "latvia",      location: [56.88,  24.60], name: "Latvia",         iso: "LV", region: "europe" },
  { id: "lithuania",   location: [55.17,  23.88], name: "Lithuania",      iso: "LT", region: "europe" },
  { id: "moldova",     location: [47.41,  28.37], name: "Moldova",        iso: "MD", region: "europe" },
  { id: "poland",      location: [51.92,  19.15], name: "Poland",         iso: "PL", region: "europe" },
  { id: "romania",     location: [45.94,  24.97], name: "Romania",        iso: "RO", region: "europe" },
  { id: "russia",      location: [55.75,  37.62], name: "Russia",         iso: "RU", region: "europe" },
  { id: "serbia",      location: [44.02,  21.01], name: "Serbia",         iso: "RS", region: "europe" },
  { id: "slovakia",    location: [48.67,  19.70], name: "Slovakia",       iso: "SK", region: "europe" },
  { id: "spain",       location: [40.46,  -3.75], name: "Spain",          iso: "ES", region: "europe" },
  { id: "switzerland", location: [46.82,   8.23], name: "Switzerland",    iso: "CH", region: "europe" },
  { id: "ukraine",     location: [48.38,  31.17], name: "Ukraine",        iso: "UA", region: "europe" },
  { id: "uzbekistan",  location: [41.38,  64.59], name: "Uzbekistan",     iso: "UZ", region: "europe" },
  // MENA & Other
  { id: "bahrain",     location: [26.00,  50.55], name: "Bahrain",        iso: "BH", region: "mena" },
  { id: "india",       location: [20.59,  78.96], name: "India",          iso: "IN", region: "mena" },
  { id: "israel",      location: [31.05,  34.85], name: "Israel",         iso: "IL", region: "mena" },
  { id: "ivorycst",    location: [ 7.54,  -5.55], name: "Ivory Coast",    iso: "CI", region: "mena" },
  { id: "jordan",      location: [30.59,  36.24], name: "Jordan",         iso: "JO", region: "mena" },
  { id: "kuwait",      location: [29.31,  47.48], name: "Kuwait",         iso: "KW", region: "mena" },
  { id: "lebanon",     location: [33.85,  35.86], name: "Lebanon",        iso: "LB", region: "mena" },
  { id: "morocco",     location: [31.79,  -7.09], name: "Morocco",        iso: "MA", region: "mena" },
  { id: "oman",        location: [21.51,  55.92], name: "Oman",           iso: "OM", region: "mena" },
  { id: "qatar",       location: [25.35,  51.18], name: "Qatar",          iso: "QA", region: "mena" },
  { id: "saudi",       location: [23.89,  45.08], name: "Saudi Arabia",   iso: "SA", region: "mena" },
  { id: "uae",         location: [23.42,  53.85], name: "UAE",            iso: "AE", region: "mena" },
  { id: "vietnam",     location: [14.06, 108.28], name: "Vietnam",        iso: "VN", region: "mena" },
  { id: "safrica",     location: [-30.56, 22.94], name: "South Africa",   iso: "ZA", region: "mena" },
]

// Precompute cartesian using COBE's coordinate system:
//   U([lat, lng]) = [-cos(lat)*cos(lng-π), sin(lat), cos(lat)*sin(lng-π)]
//                 = [cos(lat)*cos(lng),    sin(lat), -cos(lat)*sin(lng)]
const MARKER_VECS = MARKERS.map(m => {
  const lat = m.location[0] * Math.PI / 180
  const lng = m.location[1] * Math.PI / 180
  return {
    id: m.id,
    x:  Math.cos(lat) * Math.cos(lng),
    y:  Math.sin(lat),
    z: -Math.cos(lat) * Math.sin(lng),
  }
})

// COBE's rotation matrix A(theta, phi) applied to a point.
// Camera looks from +z; depth > 0 = visible.
function projectMarker(
  vec: { x: number; y: number; z: number },
  phi: number,
  theta: number
): { sx: number; sy: number; depth: number } {
  const cp = Math.cos(phi),  sp = Math.sin(phi)
  const ct = Math.cos(theta), st = Math.sin(theta)

  const x2 =  vec.x * cp              + vec.z * sp
  const y2 =  vec.x * sp * st + vec.y * ct - vec.z * cp * st
  const z2 = -vec.x * sp * ct + vec.y * st + vec.z * cp * ct

  return {
    sx:    50 + x2 * 46,
    sy:    50 - y2 * 46,
    depth: z2,
  }
}

export default function GlobeMap() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const labelRefs    = useRef<Record<string, HTMLButtonElement | null>>({})
  const pointerRef   = useRef<{ x: number; y: number } | null>(null)
  const dragOffset   = useRef({ phi: 0, theta: 0 })
  const phiOffset    = useRef(1.0)   // start centred on Europe
  const thetaOffset  = useRef(0)
  const isPaused     = useRef(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const expandedRef  = useRef<string | null>(null)

  // Keep ref in sync so onRender can read it without re-init
  const setExpandedBoth = (id: string | null) => {
    expandedRef.current = id
    setExpanded(id)
  }

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerRef.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
    e.currentTarget.style.cursor = "grabbing"
    isPaused.current = true
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pointerRef.current) {
      phiOffset.current   += dragOffset.current.phi
      thetaOffset.current += dragOffset.current.theta
      dragOffset.current   = { phi: 0, theta: 0 }
    }
    pointerRef.current = null
    e.currentTarget.style.cursor = "grab"
    isPaused.current = false
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointerRef.current) return
    dragOffset.current = {
      phi:   (e.clientX - pointerRef.current.x) / 300,
      theta: (e.clientY - pointerRef.current.y) / 1000,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let globe: ReturnType<typeof createGlobe> | null = null
    let animId: number
    let phi = 0

    const init = () => {
      const w = canvas.offsetWidth
      if (!w) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width:  w * 2,
        height: w * 2,
        phi:    0,
        theta:  0.2,
        dark:   0,
        diffuse: 1.6,
        mapSamples:    20000,
        mapBrightness: 4,
        baseColor:   [0.78, 0.93, 0.97],
        markerColor: [0.00, 0.55, 0.65],
        glowColor:   [0.82, 0.95, 1.00],
        opacity: 0.92,
        markers: MARKERS.map(m => ({ location: m.location, size: 0.032 })),
      })

      // cobe v2 uses update() — drive rotation with our own RAF loop
      function animate() {
        if (!isPaused.current) phi += 0.004

        const curPhi   = phi + phiOffset.current   + dragOffset.current.phi
        const curTheta = 0.2 + thetaOffset.current + dragOffset.current.theta

        globe!.update({ phi: curPhi, theta: curTheta, width: w * 2, height: w * 2 })

        // Update label positions directly in DOM — no React re-render, 60fps
        for (const vec of MARKER_VECS) {
          const el = labelRefs.current[vec.id]
          if (!el) continue
          const { sx, sy, depth } = projectMarker(vec, curPhi, curTheta)
          const opacity = Math.max(0, Math.min(1, (depth + 0.05) / 0.25))
          const blur    = opacity < 1 ? `blur(${((1 - opacity) * 3).toFixed(1)}px)` : ""
          el.style.left         = `${sx.toFixed(2)}%`
          el.style.top          = `${sy.toFixed(2)}%`
          el.style.opacity      = opacity.toFixed(3)
          el.style.filter       = blur
          el.style.pointerEvents = depth > 0 ? "auto" : "none"
        }

        animId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => { if (canvas) canvas.style.opacity = "1" }, 80)
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver(entries => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init() }
      })
      ro.observe(canvas)
      return () => ro.disconnect()
    }

    return () => { cancelAnimationFrame(animId); globe?.destroy() }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: "linear-gradient(160deg, #f0f9fa 0%, #e8f5f7 45%, #f4fbf5 100%)",
          borderRadius: "1.5rem",
          overflow: "hidden",
          padding: "3.5rem 2rem",
          position: "relative",
          border: "1px solid rgba(0,178,191,0.12)",
        }}
      >
        {/* Radial teal glow */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 55% at 68% 50%, rgba(0,178,191,0.12) 0%, transparent 70%)",
        }} />

        <div
          style={{
            position: "relative", zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            alignItems: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
          className="lg:grid-cols-[1fr_1.2fr]"
        >
          {/* ── Left: copy + stats ── */}
          <div>
            <p style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--color-teal)",
              fontFamily: "'Satoshi','Nunito',sans-serif", marginBottom: "1rem",
            }}>
              EU · EMEA Master Distribution
            </p>

            <h2 style={{
              fontFamily: "'ClashDisplay','Nunito',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
              marginBottom: "1.25rem",
            }}>
              +40 countries.<br />
              <span style={{ color: "var(--color-teal)" }}>one mission.</span>
            </h2>



            {/* Country detail pill */}
            {expanded && (() => {
              const m = MARKERS.find(x => x.id === expanded)
              if (!m) return null
              const color = m.region === "europe" ? "var(--color-teal)" : "var(--color-green)"
              return (
                <motion.div
                  key={expanded}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    marginTop: "1.5rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.75rem",
                    background: "white",
                    border: `1px solid ${color}44`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <p style={{
                    fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color,
                    fontFamily: "'Satoshi','Nunito',sans-serif", marginBottom: "0.2rem",
                  }}>
                    {m.region === "europe" ? "Europe & Central Asia" : "MENA & Other"}
                  </p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-ink)",
                    fontFamily: "'Satoshi','Nunito',sans-serif", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.4rem" }}>{flag(m.iso)}</span> {m.name}
                  </p>
                </motion.div>
              )
            })()}
          </div>

          {/* ── Right: Globe ── */}
          <div
            style={{ position: "relative", aspectRatio: "1", width: "100%", maxWidth: 676, margin: "0 auto" }}
            onClick={() => setExpandedBoth(null)}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                width: "100%", height: "100%",
                cursor: "grab",
                borderRadius: "50%",
                opacity: 0,
                transition: "opacity 1s ease",
                touchAction: "none",
                filter: "drop-shadow(0 8px 40px rgba(0,178,191,0.16))",
              }}
            />

            {/* Flag emoji — positioned by onRender projection, depth-driven opacity */}
            {MARKERS.map((m) => (
              <button
                key={m.id}
                ref={(el) => { labelRefs.current[m.id] = el }}
                title={m.name}
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedBoth(expanded === m.id ? null : m.id)
                }}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  fontSize: "1.15rem",
                  lineHeight: 1,
                  background: "none",
                  border: "none",
                  padding: "3px",
                  cursor: "pointer",
                  zIndex: 10,
                  pointerEvents: "none",
                  filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.4)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1)" }}
              >
                {flag(m.iso)}
              </button>
            ))}
          </div>
        </div>
      </motion.section>
    </LazyMotion>
  )
}
