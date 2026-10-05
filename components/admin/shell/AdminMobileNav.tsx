"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
} from "lucide-react";

import {
  adminNavigation,
} from "@/lib/admin/navigation";

export function AdminMobileNav() {
  const [open, setOpen] =
    useState(false);

  const pathname =
    usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-white/[0.08] p-2 text-white/60"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] bg-[#080a0e]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Neuravolv
              </p>

              <p className="mt-1 text-base font-semibold text-white">
                Administration
              </p>
            </div>

            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-white/[0.08] p-2 text-white/60"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="h-[calc(100vh-78px)] overflow-y-auto p-4">
            <div className="space-y-1">
              {adminNavigation.map((item) => {
                const Icon =
                  item.icon;

                const active =
                  pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-sm",
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/55",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
