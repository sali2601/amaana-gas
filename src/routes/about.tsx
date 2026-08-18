import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Amaanallah Gas — Trusted LPG Service Provider" },
      {
        name: "description",
        content:
          "Amaanallah Gas supplies safe, reliable LPG and gas safety services to households, schools, restaurants and hotels in Ghana's Eastern Region.",
      },
      { property: "og:title", content: "About Amaanallah Gas" },
      {
        property: "og:description",
        content: "Our mission, vision and values as an LPG delivery and gas safety company.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  { title: "Safety", body: "No shortcuts. Every job is done to LPG safety standards." },
  { title: "Reliability", body: "We show up, on time, with the gas and parts you need." },
  { title: "Quality", body: "Approved cylinders, regulators, hoses and appliances only." },
  { title: "Customer Service", body: "Clear communication from request to completion." },
  { title: "Professionalism", body: "Trained, uniformed technicians who respect your space." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        description="Amaanallah Gas is an LPG service company providing safe and convenient LPG solutions to households and commercial customers."
      />

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Our Story" />
            <p className="mt-4 text-muted-foreground">
              We started with a simple belief: gas should be easy to get and safe to use. Today
              Amaanallah Gas delivers LPG to homes, schools, restaurants and hotels, installs
              cylinders and safety cages, tests for leaks and services gas appliances.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our technicians are trained on LPG handling and safety, and we only supply approved
              equipment. Whether you cook for a family of four or a hotel kitchen, we keep your gas
              supply running safely.
            </p>
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg font-bold uppercase text-primary">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">
                To provide safe, reliable and convenient LPG solutions to homes and businesses.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg font-bold uppercase text-primary">Our Vision</h3>
              <p className="mt-2 text-muted-foreground">
                To become a trusted LPG service provider known for safety, reliability and quality
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Our Values" title="What we stand for" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold uppercase">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/services/request">Request a Service</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
