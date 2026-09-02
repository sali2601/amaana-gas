import { Link } from "@tanstack/react-router";
import { SITE, waLink } from "@/lib/site";

const iconDataUri = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const contactIcons = {
  phone: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#f97316" d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.35 2.3.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A18 18 0 0 1 2 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.18 2.4.54 3.5a1 1 0 0 1-.25 1l-2.2 2.3Z"/>
    </svg>
  `),
  whatsapp: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#25D366" d="M19.11 17.2c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.24-.25-.6-.5-.52-.68-.53-.18-.01-.38-.01-.58-.01-.2 0-.52.07-.79.35-.28.28-1.05 1.03-1.05 2.52 0 1.48 1.08 2.92 1.23 3.12.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.18-1.42-.07-.12-.28-.2-.58-.35Z"/>
      <path fill="#25D366" d="M16 3C9.37 3 4 8.37 4 15c0 2.09.54 4.13 1.56 5.92L4 29l8.26-2.67A12.92 12.92 0 0 0 16 27c6.63 0 12-5.37 12-12S22.63 3 16 3Zm0 21.75c-1.46 0-2.9-.39-4.16-1.13l-.3-.18-4.9 1.58 1.3-4.78-.2-.31a10.74 10.74 0 0 1-1.67-5.5c0-5.97 4.87-10.84 10.84-10.84 5.97 0 10.84 4.87 10.84 10.84 0 5.97-4.87 10.84-10.84 10.84Z"/>
    </svg>
  `),
  mail: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#f97316" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.2 1.5 6.8 5.1 6.8-5.1H6.2Zm13.3 2.1-6.6 4.9a1 1 0 0 1-1.2 0L4.5 10.1v7.4c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5v-7.4Z"/>
    </svg>
  `),
  location: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#f97316" d="M12 2.3a7.2 7.2 0 0 1 7.2 7.2c0 5.1-6 11.3-7.2 12.5C10.8 20.8 4.8 14.6 4.8 9.5A7.2 7.2 0 0 1 12 2.3Zm0 4.2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
    </svg>
  `),
};

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
              <img src={contactIcons.phone} alt="Phone" className="size-4 shrink-0" />
              <a href={`tel:${SITE.phone}`} className="hover:text-foreground">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <img src={contactIcons.whatsapp} alt="WhatsApp" className="size-4 shrink-0" />
              <a
                href={waLink("Hello Amaanallah Gas, I would like to make an enquiry.")}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                 {SITE.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <img src={contactIcons.mail} alt="Email" className="size-4 shrink-0" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-foreground">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <img src={contactIcons.location} alt="Location" className="mt-0.5 size-4 shrink-0" />
              <span>{SITE.location}</span>
            </li>
            <li className="pt-2">
              <div className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80">
                Business Hours
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {SITE.hours.map(({ day, time }) => (
                  <li key={day} className="flex items-center justify-between gap-3">
                    <span>{day}</span>
                    <span className="text-right">{time}</span>
                  </li>
                ))}
              </ul>
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
