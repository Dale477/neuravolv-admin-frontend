"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  adminNavigation,
  adminSurfaceStateLabel,
} from "@/lib/admin/navigation";

function stateDotClass(
  state: "operational" | "partial" | "backend_required",
) {
  switch (state) {
    case "operational":
      return "bg-emerald-400";
    case "partial":
      return "bg-amber-400";
    case "backend_required":
      return "bg-white/20";
  }
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[272px] shrink-0 border-r border-white/[0.08] bg-[#090b10] lg:flex lg:flex-col">
      <div className="border-b border-white/[0.08] px-5 py-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          Neuravolv
        </div>

        <div className="mt-2 text-lg font-semibold tracking-tight text-white">
          Administration
        </div>

        <div className="mt-1 text-xs text-white/35">
          Platform Control Plane
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {adminNavigation.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={`${item.label} — ${adminSurfaceStateLabel(item.state)}`}
                className={[
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition",
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-white/55 hover:bg-white/[0.045] hover:text-white/85",
                ].join(" ")}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  strokeWidth={1.7}
                />

                <span className="min-w-0 flex-1 truncate text-sm">
                  {item.label}
                </span>

                <span
                  className={[
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    stateDotClass(item.state),
                  ].join(" ")}
                  aria-label={adminSurfaceStateLabel(item.state)}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/[0.08] px-4 py-4">
        <p className="text-[11px] leading-5 text-white/30">
          Backend authority remains canonical for all administrative actions.
        </p>
      </div>
    </aside>
  );
}
