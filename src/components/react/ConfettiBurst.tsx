import { useCallback, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href: string;
}

export default function ConfettiBurst({ children, className, style, href }: Props) {
  const lastFired = useRef(0);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastFired.current < 2500) {
      window.location.href = href;
      return;
    }
    lastFired.current = now;

    // Lazy-load canvas-confetti only when clicked
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#00B2BF', '#96C93D', '#C45BAE', '#FF7803', '#D7002D', '#FDFCF8'],
      scalar: 0.9,
      gravity: 1.1,
    });

    setTimeout(() => { window.location.href = href; }, 500);
  }, [href]);

  return (
    <a href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  );
}
