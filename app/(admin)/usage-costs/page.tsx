import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  AdminSurfaceNotice,
} from "@/components/admin/shell/AdminSurfaceNotice";

export default function Page() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Administration"
        title="Usage & Costs"
        description="Review canonical usage, cost, revenue, infrastructure spend, and margin."
        state="operational"
      />

      <AdminSurfaceNotice
        state="operational"
      />
    </div>
  );
}
