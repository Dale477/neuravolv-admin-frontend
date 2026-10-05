import type { ReactNode } from "react";

import {
  adminSurfaceStateLabel,
  type AdminSurfaceState,
} from "@/lib/admin/navigation";

function stateClass(
  state: AdminSurfaceState,
) {
  switch (state) {
    case "operational":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
    case "partial":
      return "border-amber-400/20 bg-amber-400/10 text-amber-200";
    case "backend_required":
      return "border-white/10 bg-white/[0.04] text-white/45";
  }
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  state,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  state: AdminSurfaceState;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-5">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
            {eyebrow}
          </p>
        ) : null}

        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">
            {title}
          </h1>

          <span
            className={[
              "rounded-full border px-2.5 py-1 text-[10px] font-medium",
              stateClass(state),
            ].join(" ")}
          >
            {adminSurfaceStateLabel(state)}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-white/45">
          {description}
        </p>
      </div>

      {actions ? (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
