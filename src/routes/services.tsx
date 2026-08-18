import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/section";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "LPG Services — Delivery, Leak Testing, Installation | Amaanallah Gas" },
      {
        name: "description",
        content:
          "Six core services: LPG delivery, gas leakage testing, cylinder and safety cage installation, accessories, appliance maintenance and commercial LPG supply.",
      },
      { property: "og:title", content: "Our LPG Services — Amaanallah Gas" },
      {
        property: "og:description",
        content: "Delivery, leakage testing, installation, accessories, maintenance and commercial LPG.",
      },
    ],
  }),
  component: ServicesLayout,
});

function ServicesLayout() {
  const isChild = useRouterState({
    select: (s) => s.matches.some((m) => m.routeId !== "/services" && m.pathname.startsWith("/services/")),
  });

  if (isChild) return <Outlet />;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Our LPG Services"
        description="Everything from doorstep LPG delivery to safety inspections and appliance servicing, delivered by trained technicians."
      >
        <Button asChild size="lg">
          <Link to="/services/request">Request Service</Link>
        </Button>
      </PageHero>

      <section className="container-page py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 rounded-xl border border-border bg-card p-7 shadow-card"
            >
              <h2 className="text-2xl font-bold uppercase">{service.title}</h2>
              <p className="mt-2 text-muted-foreground">{service.blurb}</p>
              <ul className="mt-5 space-y-2">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.slug === "lpg-delivery" ? (
                  <Button asChild>
                    <Link to="/delivery">Order LPG</Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to="/services/request" search={{ service: service.slug }}>
                      Request this service
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link to="/contact">Ask a question</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
