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
        title="Outcome Studios"
        description="Platform administration for professional Outcome Studios and production workloads."
        state="backend_required"
      />

      <AdminSurfaceNotice
        state="backend_required"
      />
    </div>
  );
}
