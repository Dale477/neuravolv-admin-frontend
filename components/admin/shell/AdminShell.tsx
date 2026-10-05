import type { ReactNode } from "react";

import type { AdminIdentity } from "@/lib/admin/types";

import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminShell({
  identity,
  children,
}: {
  identity: AdminIdentity;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#080a0e] text-white">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminTopbar
          identity={identity}
        />

        <main className="px-5 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1500px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
