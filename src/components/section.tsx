import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero-gradient text-primary-foreground">
      <div className="container-page py-16 md:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold uppercase md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base opacity-90">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-bold uppercase md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}
