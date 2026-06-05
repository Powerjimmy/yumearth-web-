"use client";
import { useEffect, useRef, useState } from "react";

// Utility — avoids shadcn dependency
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(12, 46, 48)",
  gradientBackgroundEnd = "rgb(5, 20, 22)",
  firstColor = "0, 178, 191",        // --color-teal
  secondColor = "150, 201, 61",      // --color-green
  thirdColor = "196, 91, 174",       // --color-magenta
  fourthColor = "0, 200, 215",       // teal lighter
  fifthColor = "255, 120, 3",        // --color-orange
  pointerColor = "0, 178, 191",      // teal follows cursor
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    // Scope CSS vars to the container instead of body to avoid polluting global styles
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    el.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    el.style.setProperty("--first-color", firstColor);
    el.style.setProperty("--second-color", secondColor);
    el.style.setProperty("--third-color", thirdColor);
    el.style.setProperty("--fourth-color", fourthColor);
    el.style.setProperty("--fifth-color", fifthColor);
    el.style.setProperty("--pointer-color", pointerColor);
    el.style.setProperty("--size", size);
    el.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        "bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Content slot */}
      <div className={cn("relative z-10", className)}>{children}</div>

      {/* Animated gradient blobs */}
      <div
        className={cn(
          "absolute inset-0 blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.9)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:center_center]",
          "animate-gradient-first opacity-100"
        )} />
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-400px)]",
          "animate-gradient-second opacity-100"
        )} />
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%+400px)]",
          "animate-gradient-third opacity-100"
        )} />
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-200px)]",
          "animate-gradient-fourth opacity-70"
        )} />
        <div className={cn(
          "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
          "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]",
          "top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
          "[transform-origin:calc(50%-800px)_calc(50%+800px)]",
          "animate-gradient-fifth opacity-100"
        )} />

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2",
              "opacity-70"
            )}
          />
        )}
      </div>
    </div>
  );
};
