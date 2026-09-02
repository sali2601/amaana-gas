import { Link } from "@tanstack/react-router";
import { SITE, waLink } from "@/lib/site";

const iconDataUri = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const contactIcons = {
  phone: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.76 19.76 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72l.47 2.5a2 2 0 0 1-1.12 2.15L8 9.8a16.1 16.1 0 0 0 6.2 6.2l1.43-1.41a2 2 0 0 1 2.15-1.12l2.5.47A2 2 0 0 1 22 16.92Z"/>
    </svg>
  `),
  whatsapp: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 11.5A8.5 8.5 0 1 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5Z"/>
      <path d="M9.5 9.06c.22-.53.56-.55 1.05-.57.2-.01.41 0 .63.01.42.03.5.26.62.62.16.52.2.88.48 1.08.19.13.51.3 1.08.51.11.04.24.14.26.31.03.27-.24.67-.5.96-.36.41-.79.84-1.05 1.13-.36.41-.38.66-.16 1.09.23.46.9 1.14 1.32 1.44.42.3.77.43 1.1.58.66.29 1.18.34 1.48-.14.2-.31.2-.93.15-1.18-.06-.32-.23-.71-.38-.98-.15-.27-.38-.28-.73-.15-.2.07-.49.21-.79.31-.28.08-.69.01-.97-.26-.27-.25-.5-.64-.76-1.04-.25-.39-.57-.39-.96-.32-.39.06-.69.16-.95.29-.25.12-.62.48-.78.75-.18.31-.34.68-.4 1.04-.06.35-.25.73-.42 1.1"/>
    </svg>
  `),
  mail: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m4 7 8 6 8-6"/>
    </svg>
  `),
  location: iconDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21s-6-5.23-6-11a6 6 0 0 1 12 0c0 5.77-6 11-6 11Z"/>
      <circle cx="12" cy="10" r="2.5"/>
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
                WhatsApp {SITE.whatsapp}
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
