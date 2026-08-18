import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img
              src="/flameforge-logo.jpg"
              alt="Flameforge logo"
              width={36}
              height={36}
              className="size-9 rounded-lg object-contain"
            />
            <span className="font-display text-xl font-bold uppercase">Amaanallah Gas</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Safe, reliable and convenient LPG delivery, installation, leakage testing and gas
            appliance services for homes, schools, restaurants and hotels.
          </p>
          <p className="mt-4 text-sm font-medium text-primary">{SITE.domain}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/services" className="hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-foreground">
                Products
              </Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:text-foreground">
                Order LPG
              </Link>
            </li>
            <li>
              <Link to="/safety" className="hover:text-foreground">
                LPG Safety
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" />
              <a href={`tel:${SITE.phone}`} className="hover:text-foreground">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4 text-primary" />
              <a
                href={waLink("Hello Amaanallah Gas, I would like to make an enquiry.")}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                WhatsApp {SITE.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-foreground">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{SITE.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <p className="container-page text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Amaanallah Gas. Safe Gas. Safe Home. Safe Business.
        </p>
      </div>
    </footer>
  );
}
