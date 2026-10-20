import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import deliveryFront from "@/assets/delivery-tricycle-front.jpeg";
import deliveryTeam from "@/assets/delivery-team.jpeg";
import deliveryBranding from "@/assets/delivery-tricycle-branding.jpeg";

const SLIDES = [
  {
    image: deliveryFront,
    width: 1152,
    height: 2048,
    title: "LPG delivery at your doorstep",
    alt: "Amaana Gas delivery rider on the company's green branded tricycle",
  },
  {
    image: deliveryTeam,
    width: 567,
    height: 1008,
    title: "Meet your local delivery team",
    alt: "Amaana Gas delivery rider wearing a blue branded cap and reflective shirt",
  },
  {
    image: deliveryBranding,
    width: 574,
    height: 1020,
    title: "Safety and convenience on the move",
    alt: "Rear of the Amaana Gas delivery tricycle displaying its LPG services and contact details",
  },
];

const CONTROL_CLASS =
  "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-foreground";

export function HeroCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    duration: reducedMotion ? 0 : 25,
  });
  const playing = autoplay && !hovered && visible && inView;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setAutoplay(false);
    };
    const updateVisibility = () => setVisible(!document.hidden);

    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.15 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;
    const updateSelected = () => setSelected(api.selectedScrollSnap());
    const stopOnDrag = () => setAutoplay(false);

    updateSelected();
    api.on("select", updateSelected);
    api.on("reInit", updateSelected);
    api.on("pointerDown", stopOnDrag);
    return () => {
      api.off("select", updateSelected);
      api.off("reInit", updateSelected);
      api.off("pointerDown", stopOnDrag);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !playing) return;
    const timeout = window.setTimeout(() => api.scrollNext(), 6000);
    return () => window.clearTimeout(timeout);
  }, [api, playing, selected]);

  function goTo(index: number) {
    setAutoplay(false);
    api?.scrollTo(index);
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Amaana Gas delivery photos"
      className="min-w-0 overflow-hidden rounded-2xl bg-foreground text-primary-foreground shadow-lift"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setAutoplay(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          goTo((selected + (event.key === "ArrowLeft" ? -1 : 1) + SLIDES.length) % SLIDES.length);
        }
      }}
    >
      <div ref={viewportRef} className="overflow-hidden" id="delivery-photo-slides">
        <div
          className="flex touch-pan-y"
          aria-live={playing ? "off" : "polite"}
          aria-atomic="false"
        >
          {SLIDES.map((slide, index) => (
            <div
              key={slide.image}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${SLIDES.length}: ${slide.title}`}
              aria-hidden={selected !== index}
              className="relative aspect-[4/5] min-w-0 shrink-0 grow-0 basis-full overflow-hidden sm:aspect-[5/4]"
            >
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl"
                draggable={false}
              />
              <img
                src={slide.image}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                draggable={false}
                className="relative h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">{SLIDES[selected]?.title}</p>
          <span className="shrink-0 text-xs tabular-nums opacity-70" aria-hidden="true">
            {String(selected + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={CONTROL_CLASS}
              aria-label="Previous photo"
              aria-controls="delivery-photo-slides"
              onClick={() => goTo((selected - 1 + SLIDES.length) % SLIDES.length)}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <div className="flex items-center" role="group" aria-label="Choose a photo">
              {SLIDES.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className="group flex h-11 w-8 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground sm:w-11"
                  aria-label={`Show photo ${index + 1}: ${slide.title}`}
                  aria-current={selected === index ? "true" : undefined}
                  aria-controls="delivery-photo-slides"
                  onClick={() => goTo(index)}
                >
                  <span
                    className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
                      selected === index
                        ? "w-6 bg-primary-foreground"
                        : "w-2 bg-primary-foreground/40 group-hover:bg-primary-foreground/70"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className={CONTROL_CLASS}
              aria-label="Next photo"
              aria-controls="delivery-photo-slides"
              onClick={() => goTo((selected + 1) % SLIDES.length)}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            className={CONTROL_CLASS}
            aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
            aria-controls="delivery-photo-slides"
            onClick={() => setAutoplay((current) => !current)}
          >
            {autoplay ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
