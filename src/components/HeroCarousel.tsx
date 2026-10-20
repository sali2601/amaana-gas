import { useCallback, useEffect, useRef, useState } from "react";
import "./hero-carousel.css";
import front from "@/assets/amaana-tricycle-front.jpg";
import closeup from "@/assets/amaana-rider-closeup.jpg";
import back from "@/assets/amaana-tricycle-back.jpg";
import rider1 from "@/assets/amaana-rider-1.jpg";
import rider2 from "@/assets/amaana-rider-2.jpg";

const slides = [
  { src: front, alt: "Amaana Gas delivery tricycle with its rider, ready for deliveries in Koforidua" },
  { src: closeup, alt: "Amaana Gas rider in a safety vest and company cap" },
  { src: back, alt: "Rear of the Amaana Gas tricycle showing services and contact numbers" },
  { src: rider1, alt: "Amaana Gas rider seated on the delivery tricycle" },
  { src: rider2, alt: "Amaana Gas delivery rider in front of the company banner" },
];

const INTERVAL = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <div
      className="amc"
      role="region"
      aria-roledescription="carousel"
      aria-label="Amaana Gas photos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="amc-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <figure
            className="amc-slide"
            key={s.alt}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            <img src={s.src} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
          </figure>
        ))}
      </div>

      <button type="button" className="amc-arrow amc-prev" onClick={() => go(index - 1)} aria-label="Previous photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" className="amc-arrow amc-next" onClick={() => go(index + 1)} aria-label="Next photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="amc-dots">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            className={i === index ? "is-active" : ""}
            onClick={() => go(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
          >
            {i === index && !paused && (
              <span key={index} className="amc-fill" style={{ animationDuration: `${INTERVAL}ms` }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
