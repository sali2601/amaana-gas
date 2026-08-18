import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { SAFETY_TIPS, SITE } from "@/lib/site";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "LPG Safety Tips — Amaanallah Gas" },
      {
        name: "description",
        content:
          "Practical LPG safety tips for homes and businesses: leak checks, cylinder storage, hoses, regulators and what to do if you smell gas.",
      },
      { property: "og:title", content: "LPG Safety Tips — Amaanallah Gas" },
      {
        property: "og:description",
        content: "How to store, use and check LPG safely, plus emergency guidance.",
      },
    ],
  }),
  component: Safety,
});

function Safety() {
  return (
    <>
      <PageHero
        eyebrow="Gas Safety"
        title="LPG Safety Comes First"
        description="Most gas accidents are preventable. Follow these practices at home and at work, and book a professional inspection whenever you are unsure."
      />

      <section className="container-page py-16">
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-6">
          <AlertTriangle className="mt-0.5 size-6 shrink-0 text-destructive" />
          <div>
            <h2 className="text-lg font-bold uppercase">If you suspect a gas leak</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Avoid flames and electrical switches, do not start vehicles or generators nearby, open
              doors and windows if it is safe to do so, move everyone to a safe location and contact
              a qualified professional immediately.
            </p>
            <Button asChild className="mt-4">
              <a href={`tel:${SITE.phone}`}>Call {SITE.phone} now</a>
            </Button>
          </div>
        </div>

        <SectionHeading className="mt-16" eyebrow="Safety Tips" title="Everyday LPG safety" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {SAFETY_TIPS.map((tip) => (
            <div key={tip.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" />
                <h3 className="text-base font-bold">{tip.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{tip.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-hero-gradient px-6 py-10 text-primary-foreground md:px-10">
          <h2 className="text-2xl font-bold uppercase md:text-3xl">
            Book a professional leakage test
          </h2>
          <p className="mt-3 max-w-xl opacity-90">
            Our technicians test your regulator, hose, valves and full setup, then give you a clear
            safety report.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link to="/services/request">Book Leakage Test</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
