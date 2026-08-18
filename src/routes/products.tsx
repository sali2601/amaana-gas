import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS, waLink } from "@/lib/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "LPG Products & Accessories — Amaanallah Gas" },
      {
        name: "description",
        content:
          "Cylinders, regulators, hoses, safety cages, gas detectors, cookers and commercial burners supplied and installed by Amaanallah Gas.",
      },
      { property: "og:title", content: "LPG Products & Accessories — Amaanallah Gas" },
      {
        property: "og:description",
        content: "Genuine LPG equipment and cooking appliances, available on request.",
      },
    ],
  }),
  component: Products,
});

const CATEGORIES = ["LPG Equipment", "Cooking Appliances", "Safety Equipment"] as const;

function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Gas Accessories & Appliances"
        description="Approved LPG equipment for homes, schools, restaurants and hotels. Request any item and we will confirm price and availability."
      />

      <section className="container-page space-y-14 py-16">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <SectionHeading title={category} />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.filter((p) => p.category === category).map((product) => (
                <div
                  key={product.name}
                  className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-card"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Package className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{product.price}</span>
                    <Badge variant={product.availability === "In stock" ? "default" : "secondary"}>
                      {product.availability}
                    </Badge>
                  </div>
                  <Button asChild className="mt-4" variant="outline">
                    <a
                      href={waLink(`Hello Amaanallah Gas, I would like to request: ${product.name}.`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Request Product
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl bg-hero-gradient px-6 py-10 text-primary-foreground md:px-10">
          <h2 className="text-2xl font-bold uppercase md:text-3xl">Need something not listed?</h2>
          <p className="mt-3 max-w-xl opacity-90">
            We source and install a wide range of LPG equipment. Tell us what you need.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
