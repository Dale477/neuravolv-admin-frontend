import {
  Activity,
  CircleDollarSign,
  HeartPulse,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  AdminSurfaceNotice,
} from "@/components/admin/shell/AdminSurfaceNotice";

const cards = [
  {
    label: "Users",
    value: "—",
    helper: "Awaiting live dashboard data",
    icon: Users,
  },
  {
    label: "Usage",
    value: "—",
    helper: "Awaiting live dashboard data",
    icon: Activity,
  },
  {
    label: "Cost",
    value: "—",
    helper: "Awaiting canonical accounting data",
    icon: CircleDollarSign,
  },
  {
    label: "Platform health",
    value: "—",
    helper: "Awaiting health endpoint integration",
    icon: HeartPulse,
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Operations"
        title="Platform Overview"
        description="Operational status, platform activity, usage, cost, and administrative events across Neuravolv."
        state="operational"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <section
              key={card.label}
              className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-white/40">
                  {card.label}
                </p>

                <Icon
                  className="h-4 w-4 text-white/25"
                  strokeWidth={1.7}
                />
              </div>

              <p className="mt-5 text-3xl font-semibold tracking-tight text-white/85">
                {card.value}
              </p>

              <p className="mt-2 text-xs text-white/30">
                {card.helper}
              </p>
            </section>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <section className="min-h-[260px] rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-white/30" />

            <h2 className="text-sm font-medium text-white/75">
              Platform Health
            </h2>
          </div>

          <div className="mt-10 flex h-32 items-center justify-center rounded-lg border border-dashed border-white/[0.08] text-sm text-white/25">
            Live health integration follows in Gate C2
          </div>
        </section>

        <section className="min-h-[260px] rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white/30" />

            <h2 className="text-sm font-medium text-white/75">
              Administrative Activity
            </h2>
          </div>

          <div className="mt-10 flex h-32 items-center justify-center rounded-lg border border-dashed border-white/[0.08] text-sm text-white/25">
            Live audit integration follows in Gate C2
          </div>
        </section>
      </div>

      <AdminSurfaceNotice state="operational" />
    </div>
  );
}
