import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={waLink("Hello Amaanallah Gas, I would like to order LPG / request a service.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Amaanallah Gas on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
