import type { AdminIdentity } from "@/lib/admin/types";

import { AdminAccessPanel } from "./AdminAccessPanel";
import { AdminMobileNav } from "./AdminMobileNav";

export function AdminTopbar({
  identity,
}: {
  identity: AdminIdentity;
}) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between border-b border-white/[0.08] bg-[#0b0e13]/95 px-5 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <AdminMobileNav />

        <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/30">
          Neuravolv Platform
        </p>

        <p className="mt-1 text-sm font-medium text-white/70">
          Administrative Control Plane
        </p>
        </div>
      </div>

      <AdminAccessPanel
        identity={identity}
      />
    </header>
  );
}
