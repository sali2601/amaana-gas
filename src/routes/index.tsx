import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  ShieldCheck,
  Wrench,
  Package,
  Settings2,
  Building2,
  ArrowRight,
  CheckCircle2,
  Phone,
  AlertTriangle,
} from "lucide-react";
import heroImage from "@/assets/hero-lpg.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section";
import { SERVICES, SAFETY_TIPS, PRODUCTS, SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amaanallah Gas — LPG Delivery & Gas Safety Services in Koforidua" },
      {
        name: "description",
        content:
          "Reliable LPG delivery, cylinder installation, leakage testing and gas appliance maintenance for homes, schools, restaurants and hotels in Ghana.",
      },
      { property: "og:title", content: "Amaanallah Gas — Safe Gas. Safe Home. Safe Business." },
      {
        property: "og:description",
        content:
          "Order LPG or book gas leakage testing, installation and appliance maintenance with Amaanallah Gas.",
      },
    ],
  }),
  component: Home,
});

const ICONS = [Truck, ShieldCheck, Wrench, Package, Settings2, Building2];

function Home() {
  return (
    <>
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container-page grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
              LPG Delivery & Safety Services
            </p>
            <h1 className="mt-4 text-4xl font-bold uppercase leading-[1.05] md:text-6xl">
              Safe Gas.
              <br />
              Safe Home.
              <br />
              Safe Business.
            </h1>
            <p className="mt-5 max-w-lg text-base opacity-90 md:text-lg">
              Reliable LPG delivery, installation, safety testing and gas appliance services for
              homes and businesses across Koforidua and the Eastern Region.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/delivery">Order LPG</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/services/request">Request a Service</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
              {["Trained technicians", "Approved equipment", "Same-day delivery"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4" /> {item}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lift">
            <img
              src={heroImage}
              alt="Amaanallah Gas technician with white, green and blue LPG cylinders beside a delivery tricycle"
              width={1600}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything you need for safe LPG"
          description="From doorstep delivery to leakage testing and appliance maintenance, one team handles it all."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i] ?? Truck;
            return (
              <div
                key={service.slug}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl font-bold uppercase">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.blurb}</p>
                <Link
                  to="/services"
                  hash={service.slug}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Why Amaanallah Gas?" title="Safety. Reliability. Quality." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Safety First",
                body: "Every installation is inspected, every hose and regulator approved, every customer briefed.",
              },
              {
                title: "Reliability",
                body: "Scheduled deliveries and fast response so your kitchen or business never runs dry.",
              },
              {
                title: "Quality Service",
                body: "Professional, courteous technicians and genuine LPG equipment you can trust.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold uppercase">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="LPG Safety Tips"
          title="Use gas the safe way"
          description="Simple habits that protect your family, staff and property."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SAFETY_TIPS.slice(0, 6).map((tip) => (
            <div key={tip.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-base font-bold">{tip.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{tip.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-warning/50 bg-warning/15 p-5">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning-foreground" />
          <p className="text-sm text-warning-foreground">
            If you suspect a gas leak, avoid flames and electrical switches, move to a safe location
            and contact a qualified professional immediately on {SITE.phone}.
          </p>
        </div>
      </section>

      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Products"
            title="Cylinders, accessories & appliances"
            description="Genuine LPG equipment supplied and installed by our technicians."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 6).map((product) => (
              <div key={product.name} className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {product.category}
                </p>
                <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{product.description}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-8" variant="outline">
            <Link to="/products">View all products</Link>
          </Button>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="rounded-2xl bg-hero-gradient px-6 py-12 text-primary-foreground md:px-12">
          <h2 className="text-3xl font-bold uppercase md:text-4xl">Request LPG delivery today</h2>
          <p className="mt-3 max-w-xl opacity-90">
            Tell us your cylinder size, quantity and location. We confirm your order and deliver at
            your preferred time.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/delivery">Order LPG</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={`tel:${SITE.phone}`}>
                <Phone /> Call {SITE.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
