import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { SITE, waLink } from "@/lib/site";
import { makeRequestId } from "@/lib/request-id";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/services/request")({
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search["service"] === "string" ? { service: search["service"] } : {},

  head: () => ({
    meta: [
      { title: "Request a Gas Service — Amaanallah Gas" },
      {
        name: "description",
        content:
          "Book gas leakage testing, cylinder or safety cage installation, appliance maintenance and more with Amaanallah Gas.",
      },
      { property: "og:title", content: "Request a Gas Service — Amaanallah Gas" },
      {
        property: "og:description",
        content: "Choose your service, date and location and our technician will be in touch.",
      },
    ],
  }),
  component: ServiceRequest,
});

const SERVICE_OPTIONS = [
  { id: "leakage-testing", label: "Leakage testing" },
  { id: "installation", label: "Cylinder installation" },
  { id: "safety-cage", label: "Safety cage installation" },
  { id: "maintenance", label: "Appliance maintenance" },
  { id: "appliance-installation", label: "Gas appliance installation" },
  { id: "other", label: "Other" },
];

const PREMISES = ["Home", "School", "Restaurant", "Hotel", "Other"];

function ServiceRequest() {
  const { service } = Route.useSearch();
  const [selected, setSelected] = useState<string[]>(
    service ? SERVICE_OPTIONS.filter((o) => o.id === service).map((o) => o.id) : [],
  );
  const [premises, setPremises] = useState("Home");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    date: "",
    time: "",
    description: "",
  });
  const [reference, setReference] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selected.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }
    const id = makeRequestId();
    setSaving(true);
    const { error } = await supabase.from("service_requests").insert({
      reference: id,
      customer_name: form.name,
      phone: form.phone,
      address: form.location,
      service_slug: selected.join(", "),
      preferred_date: form.date || null,
      description: [`Premises: ${premises}`, `Preferred time: ${form.time}`, form.description]
        .filter(Boolean)
        .join(" | "),
    });
    setSaving(false);
    if (error) {
      toast.error("Could not submit your request", { description: error.message });
      return;
    }
    setReference(id);
    toast.success("Service request received", { description: `Reference ${id}` });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    const summary = `Service request ${reference}%0AName: ${form.name}%0APhone: ${form.phone}%0AServices: ${selected
      .map((s) => SERVICE_OPTIONS.find((o) => o.id === s)?.label)
      .join(", ")}%0APremises: ${premises}%0ALocation: ${form.location}%0APreferred: ${form.date} ${form.time}`;
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <CheckCircle2 className="mx-auto size-12 text-primary" />
          <h1 className="mt-4 text-2xl font-bold uppercase">Request received</h1>
          <p className="mt-3 text-muted-foreground">
            Your service request has been received. Our team will call you on {form.phone} to
            confirm the appointment.
          </p>
          <p className="mt-5 rounded-lg bg-primary-soft px-4 py-3 font-display text-lg font-bold text-primary">
            Reference: {reference}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={waLink(decodeURIComponent(summary))} target="_blank" rel="noreferrer">
                Send details on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Back home</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Service Booking"
        title="Request a Service"
        description="Tell us what you need and when. A technician will confirm your appointment by phone."
      />
      <section className="container-page py-14">
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-8">
          <fieldset className="rounded-xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-sm font-bold uppercase tracking-wider">
              What service do you need?
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm"
                >
                  <Checkbox
                    checked={selected.includes(option.id)}
                    onCheckedChange={() => toggle(option.id)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-sm font-bold uppercase tracking-wider">
              Your details
            </legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="location">Location / address</Label>
                <Input
                  id="location"
                  required
                  value={form.location}
                  onChange={(e) => set("location")(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Type of premises</Label>
                <div className="flex flex-wrap gap-2">
                  {PREMISES.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setPremises(option)}
                      className={
                        premises === option
                          ? "rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                          : "rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-sm font-bold uppercase tracking-wider">
              Appointment
            </legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => set("date")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred time</Label>
                <Input
                  id="time"
                  type="time"
                  required
                  value={form.time}
                  onChange={(e) => set("time")(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Describe the issue or request</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description")(e.target.value)}
                  placeholder="e.g. Suspected leakage around the regulator"
                />
              </div>
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" size="lg" disabled={saving}>
              {saving ? "Submitting…" : "Submit Request"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Urgent? Call{" "}
              <a href={`tel:${SITE.phone}`} className="font-medium text-primary">
                {SITE.phone}
              </a>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
