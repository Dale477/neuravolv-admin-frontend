"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";

import type { AdminIdentity } from "@/lib/admin/types";

import { AdminSignOut } from "@/components/auth/AdminSignOut";

export function AdminAccessPanel({
  identity,
}: {
  identity: AdminIdentity;
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-left transition hover:border-white/[0.14] hover:bg-white/[0.045]"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-400/10">
          <ShieldCheck
            className="h-4 w-4 text-emerald-300"
            strokeWidth={1.8}
          />
        </div>

        <div className="hidden min-w-0 sm:block">
          <div className="truncate text-xs font-medium text-white/85">
            {identity.platform_admin_role ?? "Platform Admin"}
          </div>

          <div className="mt-0.5 text-[11px] text-white/35">
            {identity.permissions.length} permissions
          </div>
        </div>

        {open ? (
          <ChevronUp className="h-3.5 w-3.5 text-white/35" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-white/35" />
        )}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-[360px] max-w-[calc(100vw-2rem)] rounded-xl border border-white/[0.1] bg-[#101319] p-4 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">
                Platform Admin Access
              </p>

              <p className="mt-1 text-[11px] text-white/35">
                Backend-authorized identity
              </p>
            </div>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-medium text-emerald-200">
              Authorized
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <dt className="text-white/35">Role</dt>
              <dd className="mt-1 text-white/75">
                {identity.platform_admin_role ?? "—"}
              </dd>
            </div>

            <div>
              <dt className="text-white/35">Permissions</dt>
              <dd className="mt-1 text-white/75">
                {identity.permissions.length}
              </dd>
            </div>

            <div>
              <dt className="text-white/35">Authority</dt>
              <dd className="mt-1 break-all text-white/75">
                {identity.authority ?? "—"}
              </dd>
            </div>

            <div>
              <dt className="text-white/35">Auth mode</dt>
              <dd className="mt-1 text-white/75">
                {identity.auth_mode ?? "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/30">
              Effective permissions
            </p>

            <div className="max-h-48 overflow-y-auto rounded-lg border border-white/[0.06] bg-black/20 p-3">
              <div className="space-y-1">
                {identity.permissions.map((permission) => (
                  <div
                    key={permission}
                    className="font-mono text-[11px] text-white/55"
                  >
                    {permission}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <AdminSignOut />
          </div>
        </div>
      ) : null}
    </div>
  );
}
