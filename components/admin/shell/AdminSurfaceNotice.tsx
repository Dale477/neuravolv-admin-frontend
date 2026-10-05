import {
  CircleAlert,
  CircleCheck,
  Construction,
} from "lucide-react";

import type { AdminSurfaceState } from "@/lib/admin/navigation";

export function AdminSurfaceNotice({
  state,
  children,
}: {
  state: AdminSurfaceState;
  children?: React.ReactNode;
}) {
  if (state === "operational") {
    return (
      <section className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.035] p-5">
        <div className="flex gap-3">
          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />

          <div>
            <p className="text-sm font-medium text-white/80">
              Backend authority available
            </p>

            <p className="mt-1 text-sm leading-6 text-white/40">
              This surface has existing Platform Admin backend authority and
              will be connected in the next integration gate.
            </p>

            {children}
          </div>
        </div>
      </section>
    );
  }

  if (state === "partial") {
    return (
      <section className="rounded-xl border border-amber-400/15 bg-amber-400/[0.035] p-5">
        <div className="flex gap-3">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />

          <div>
            <p className="text-sm font-medium text-white/80">
              Partial administrative authority
            </p>

            <p className="mt-1 text-sm leading-6 text-white/40">
              Some backend capability exists, but this surface is not yet
              complete enough for full platform administration.
            </p>

            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex gap-3">
        <Construction className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />

        <div>
          <p className="text-sm font-medium text-white/70">
            Backend administrative authority required
          </p>

          <p className="mt-1 text-sm leading-6 text-white/35">
            This surface is intentionally non-operational until a governed
            Platform Admin backend authority exists. No fake controls are
            exposed.
          </p>

          {children}
        </div>
      </div>
    </section>
  );
}
