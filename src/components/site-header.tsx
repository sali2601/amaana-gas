import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/delivery", label: "LPG Delivery" },
  { to: "/safety", label: "Safety" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src="/flameforge-logo.jpg"
            alt="Flameforge logo"
            width={36}
            height={36}
            className="size-9 rounded-lg object-contain"
          />
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            Amaanallah <span className="text-primary">Gas</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-primary-soft text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <Phone className="size-4" /> {SITE.phone}
          </a>
          <Button asChild>
            <Link to="/services/request">Request Service</Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3">
              <Link to="/services/request" onClick={() => setOpen(false)}>
                Request Service
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
