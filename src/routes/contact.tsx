import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, Globe } from "lucide-react";
import { PageHero } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SITE, waLink } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Amaanallah Gas — Koforidua LPG Services" },
      {
        name: "description",
        content:
          "Call 0201506061, WhatsApp 0594120503 or email amaanallahresources@gmail.com to order LPG or book a gas service in Koforidua and Akim-Taco.",
      },
      { property: "og:title", content: "Contact Amaanallah Gas" },
      {
        property: "og:description",
        content: "Phone, WhatsApp, email and location details for Amaanallah Gas.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      phone: form.phone || null,
      email: form.email || null,
      subject: form.subject || null,
      message: form.message,
    });
    setSaving(false);
    if (error) {
      toast.error("Could not send your message", { description: error.message });
      return;
    }
    toast.success("Message sent", {
      description: "Thank you. We will get back to you shortly.",
    });
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Amaanallah Gas"
        description="Call, WhatsApp or send us a message. We respond quickly to orders, service requests and safety concerns."
      />

      <section className="container-page grid gap-10 py-16 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            {
              icon: Phone,
              label: "Phone",
              value: SITE.phone,
              href: `tel:${SITE.phone}`,
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: SITE.whatsapp,
              href: waLink("Hello Amaanallah Gas, I would like to make an enquiry."),
            },
            {
              icon: Mail,
              label: "Email",
              value: SITE.email,
              href: `mailto:${SITE.email}`,
            },
            {
              icon: Globe,
              label: "Website",
              value: SITE.domain,
              href: `https://${SITE.domain}`,
            },
            { icon: MapPin, label: "Location", value: SITE.location },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="break-all font-medium hover:text-primary"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-medium">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-xl border border-border bg-card p-7 shadow-card"
        >
          <h2 className="text-2xl font-bold uppercase">Send a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="c-name">Name</Label>
              <Input
                id="c-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-phone">Phone</Label>
              <Input
                id="c-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-email">Email</Label>
            <Input
              id="c-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-subject">Subject</Label>
            <Input
              id="c-subject"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-message">Message</Label>
            <Textarea
              id="c-message"
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={saving}>
            {saving ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </section>
    </>
  );
}
