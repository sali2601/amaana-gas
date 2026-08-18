import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type JobStatus = Database["public"]["Enums"]["job_status"];

const STATUSES: JobStatus[] = [
  "pending",
  "confirmed",
  "assigned",
  "in_progress",
  "completed",
  "cancelled",
];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard — Amaanallah Gas" },
      {
        name: "description",
        content:
          "Manage LPG delivery orders, service bookings and customer messages for Amaanallah Gas.",
      },
      { property: "og:title", content: "Operations Dashboard — Amaanallah Gas" },
      {
        property: "og:description",
        content: "Internal dashboard for Amaanallah Gas orders and service requests.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDashboard,
});

const TABS = [
  { id: "orders", label: "LPG Orders" },
  { id: "requests", label: "Service Requests" },
  { id: "messages", label: "Messages" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<TabId>("orders");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  const access = useQuery({
    queryKey: ["access", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId!);
      if (error) throw error;
      return data.map((r) => r.role);
    },
  });

  const isStaff = (access.data ?? []).some((r) => r === "admin" || r === "staff");

  const orders = useQuery({
    queryKey: ["orders"],
    enabled: isStaff,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const requests = useQuery({
    queryKey: ["service_requests"],
    enabled: isStaff,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const messages = useQuery({
    queryKey: ["contact_messages"],
    enabled: isStaff,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const staff = useQuery({
    queryKey: ["staff"],
    enabled: isStaff,
    queryFn: async () => {
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("role", ["admin", "staff"]);
      if (rolesError) throw rolesError;
      const ids = roles.map((r) => r.user_id);
      if (ids.length === 0) return [] as { id: string; name: string }[];
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", ids);
      if (error) throw error;
      return profiles.map((p) => ({ id: p.id, name: p.full_name || "Team member" }));
    },
  });

  const updateRow = useMutation({
    mutationFn: async (args: {
      table: "orders" | "service_requests";
      id: string;
      values: { status?: JobStatus; assigned_to?: string | null };
    }) => {
      const { error } = await supabase.from(args.table).update(args.values).eq("id", args.id);
      if (error) throw error;
    },
    onSuccess: (_data, args) => {
      toast.success("Updated");
      queryClient.invalidateQueries({
        queryKey: [args.table === "orders" ? "orders" : "service_requests"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const toggleHandled = useMutation({
    mutationFn: async (args: { id: string; handled: boolean }) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ handled: args.handled })
        .eq("id", args.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_messages"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const stats = useMemo(
    () => [
      { label: "Orders", value: orders.data?.length ?? 0 },
      { label: "Service requests", value: requests.data?.length ?? 0 },
      {
        label: "Open jobs",
        value:
          (orders.data ?? []).filter((o) => o.status !== "completed" && o.status !== "cancelled")
            .length +
          (requests.data ?? []).filter((r) => r.status !== "completed" && r.status !== "cancelled")
            .length,
      },
      { label: "Messages", value: messages.data?.length ?? 0 },
    ],
    [orders.data, requests.data, messages.data],
  );

  if (access.isLoading) {
    return <p className="container-page py-20 text-center text-muted-foreground">Loading…</p>;
  }

  if (!isStaff) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <h1 className="text-2xl font-bold uppercase">No access</h1>
          <p className="mt-3 text-muted-foreground">
            This account is not yet approved as staff. Ask an administrator to grant you access.
          </p>
          <Button className="mt-6" variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Dashboard</p>
          <h1 className="font-display text-3xl font-bold uppercase">Operations</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              orders.refetch();
              requests.refetch();
              messages.refetch();
            }}
          >
            <RefreshCw /> Refresh
          </Button>
          <Button variant="ghost" onClick={signOut}>
            <LogOut /> Sign out
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={
              tab === item.id
                ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                : "rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {tab === "orders" &&
          (orders.data ?? []).map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{order.reference}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_name} · {order.phone}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-muted-foreground">Cylinder:</span> {order.cylinder_size} ×{" "}
                  {order.quantity}
                </p>
                <p>
                  <span className="text-muted-foreground">Delivery:</span>{" "}
                  {order.delivery_date ?? "—"} {order.delivery_time ?? ""}
                </p>
                <p className="sm:col-span-2">
                  <span className="text-muted-foreground">Address:</span> {order.address}
                  {order.landmark ? ` (${order.landmark})` : ""}
                </p>
                {order.notes && (
                  <p className="sm:col-span-2">
                    <span className="text-muted-foreground">Notes:</span> {order.notes}
                  </p>
                )}
              </dl>
              <RowControls
                status={order.status}
                assignedTo={order.assigned_to}
                staff={staff.data ?? []}
                onStatus={(status) =>
                  updateRow.mutate({ table: "orders", id: order.id, values: { status } })
                }
                onAssign={(assigned) =>
                  updateRow.mutate({
                    table: "orders",
                    id: order.id,
                    values: { assigned_to: assigned },
                  })
                }
              />
            </article>
          ))}

        {tab === "requests" &&
          (requests.data ?? []).map((request) => (
            <article
              key={request.id}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{request.reference}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.customer_name} · {request.phone}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(request.created_at).toLocaleString()}
                </p>
              </div>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-muted-foreground">Service:</span> {request.service_slug}
                </p>
                <p>
                  <span className="text-muted-foreground">Preferred:</span>{" "}
                  {request.preferred_date ?? "—"}
                </p>
                <p className="sm:col-span-2">
                  <span className="text-muted-foreground">Location:</span> {request.address ?? "—"}
                </p>
                {request.description && (
                  <p className="sm:col-span-2">
                    <span className="text-muted-foreground">Details:</span> {request.description}
                  </p>
                )}
              </dl>
              <RowControls
                status={request.status}
                assignedTo={request.assigned_to}
                staff={staff.data ?? []}
                onStatus={(status) =>
                  updateRow.mutate({ table: "service_requests", id: request.id, values: { status } })
                }
                onAssign={(assigned) =>
                  updateRow.mutate({
                    table: "service_requests",
                    id: request.id,
                    values: { assigned_to: assigned },
                  })
                }
              />
            </article>
          ))}

        {tab === "messages" &&
          (messages.data ?? []).map((message) => (
            <article
              key={message.id}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{message.subject ?? "Message"}</p>
                  <p className="text-sm text-muted-foreground">
                    {message.name} · {message.phone ?? message.email ?? "—"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
              <p className="mt-3 text-sm">{message.message}</p>
              <Button
                className="mt-4"
                size="sm"
                variant={message.handled ? "outline" : "default"}
                onClick={() =>
                  toggleHandled.mutate({ id: message.id, handled: !message.handled })
                }
              >
                {message.handled ? "Mark as open" : "Mark as handled"}
              </Button>
            </article>
          ))}

        {tab === "orders" && (orders.data ?? []).length === 0 && <Empty label="orders" />}
        {tab === "requests" && (requests.data ?? []).length === 0 && (
          <Empty label="service requests" />
        )}
        {tab === "messages" && (messages.data ?? []).length === 0 && <Empty label="messages" />}
      </div>
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
      No {label} yet.
    </p>
  );
}

function RowControls({
  status,
  assignedTo,
  staff,
  onStatus,
  onAssign,
}: {
  status: JobStatus;
  assignedTo: string | null;
  staff: { id: string; name: string }[];
  onStatus: (status: JobStatus) => void;
  onAssign: (assigned: string | null) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <div className="w-44">
        <Select value={status} onValueChange={(v) => onStatus(v as JobStatus)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((option) => (
              <SelectItem key={option} value={option}>
                {option.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-52">
        <Select
          value={assignedTo ?? "unassigned"}
          onValueChange={(v) => onAssign(v === "unassigned" ? null : v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Assign staff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {staff.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
