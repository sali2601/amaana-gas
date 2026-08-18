import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { SITE, waLink } from "@/lib/site";
import { makeRequestId } from "@/lib/request-id";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Order LPG Delivery — Amaanallah Gas" },
      {
        name: "description",
        content:
          "Request LPG delivery in four quick steps: your details, delivery location, cylinder size and quantity, and your preferred delivery time.",
      },
      { property: "og:title", content: "Order LPG Delivery — Amaanallah Gas" },
      {
        property: "og:description",
        content: "Doorstep LPG delivery for homes, schools, restaurants and hotels.",
      },
    ],
  }),
  component: Delivery,
});

const CYLINDER_SIZES = ["3kg", "6kg", "12.5kg", "14.5kg", "25kg", "50kg", "Bulk / commercial"];
const CUSTOMER_TYPES = ["Home", "School", "Restaurant", "Hotel", "Other"];
const STEPS = ["Customer", "Location", "LPG", "Delivery"];

function Delivery() {
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    customerType: "Home",
    region: "Eastern",
    city: "",
    area: "",
    address: "",
    cylinderSize: "14.5kg",
    quantity: "1",
    date: "",
    time: "",
    instructions: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const [saving, setSaving] = useState(false);

  const next = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    const id = makeRequestId();
    setSaving(true);
    const { error } = await supabase.from("orders").insert({
      reference: id,
      customer_name: form.name,
      phone: form.phone,
      address: `${form.address}, ${form.area}, ${form.city}, ${form.region}`,
      landmark: form.customerType,
      cylinder_size: form.cylinderSize,
      quantity: Number(form.quantity) || 1,
      service_type: "delivery",
      delivery_date: form.date || null,
      delivery_time: form.time || null,
      notes: form.instructions || null,
    });
    setSaving(false);
    if (error) {
      toast.error("Could not submit your order", { description: error.message });
      return;
    }
    setOrderId(id);
    toast.success("LPG delivery request received", { description: `Order ${id}` });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (orderId) {
    const summary = `LPG order ${orderId}
Name: ${form.name}
Phone: ${form.phone}
Customer type: ${form.customerType}
Cylinder: ${form.cylinderSize} x ${form.quantity}
Address: ${form.address}, ${form.area}, ${form.city}, ${form.region}
Preferred: ${form.date} ${form.time}`;
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <CheckCircle2 className="mx-auto size-12 text-primary" />
          <h1 className="mt-4 text-2xl font-bold uppercase">Order received</h1>
          <p className="mt-3 text-muted-foreground">
            Your LPG delivery request has been received. We will call {form.phone} to confirm your
            delivery.
          </p>
          <p className="mt-5 rounded-lg bg-primary-soft px-4 py-3 font-display text-lg font-bold text-primary">
            Order ID: {orderId}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Payment on delivery: cash, Mobile Money or bank transfer.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={waLink(summary)} target="_blank" rel="noreferrer">
                Send order on WhatsApp
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
        eyebrow="LPG Delivery"
        title="Order LPG"
        description="Four short steps and your cylinder is on the way. Delivery to homes, schools, restaurants and hotels."
      />

      <section className="container-page py-14">
        <div className="mx-auto max-w-2xl">
          <ol className="flex items-center justify-between gap-2">
            {STEPS.map((label, index) => (
              <li key={label} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className={
                    index <= step
                      ? "flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                      : "flex size-9 items-center justify-center rounded-full border border-border text-sm font-bold text-muted-foreground"
                  }
                >
                  {index + 1}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </li>
            ))}
          </ol>

          <form
            onSubmit={next}
            className="mt-8 space-y-5 rounded-xl border border-border bg-card p-7 shadow-card"
          >
            {step === 0 && (
              <>
                <h2 className="text-xl font-bold uppercase">Customer information</h2>
                <div className="space-y-2">
                  <Label htmlFor="d-name">Full name</Label>
                  <Input
                    id="d-name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-phone">Phone number</Label>
                  <Input
                    id="d-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Customer type</Label>
                  <Select
                    value={form.customerType}
                    onValueChange={(v) => update("customerType", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CUSTOMER_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold uppercase">Delivery location</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="d-region">Region</Label>
                    <Input
                      id="d-region"
                      required
                      value={form.region}
                      onChange={(e) => update("region", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="d-city">City / town</Label>
                    <Input
                      id="d-city"
                      required
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-area">Area</Label>
                  <Input
                    id="d-area"
                    required
                    value={form.area}
                    onChange={(e) => update("area", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-address">Address / landmark</Label>
                  <Textarea
                    id="d-address"
                    rows={3}
                    required
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="House number, street, nearest landmark"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold uppercase">LPG requirement</h2>
                <div className="space-y-2">
                  <Label>Cylinder size</Label>
                  <Select
                    value={form.cylinderSize}
                    onValueChange={(v) => update("cylinderSize", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CYLINDER_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-qty">Quantity</Label>
                  <Input
                    id="d-qty"
                    type="number"
                    min={1}
                    required
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-bold uppercase">Delivery preference</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="d-date">Preferred date</Label>
                    <Input
                      id="d-date"
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="d-time">Preferred time</Label>
                    <Input
                      id="d-time"
                      type="time"
                      required
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-notes">Delivery instructions</Label>
                  <Textarea
                    id="d-notes"
                    rows={3}
                    value={form.instructions}
                    onChange={(e) => update("instructions", e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <ArrowLeft /> Back
              </Button>
              <Button type="submit" disabled={saving}>
                {step === STEPS.length - 1 ? (saving ? "Submitting…" : "Submit Order") : "Continue"}
                {step === STEPS.length - 1 ? null : <ArrowRight />}
              </Button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Prefer to talk? Call{" "}
            <a href={`tel:${SITE.phone}`} className="font-medium text-primary">
              {SITE.phone}
            </a>{" "}
            or WhatsApp {SITE.whatsapp}.
          </p>
        </div>
      </section>
    </>
  );
}
