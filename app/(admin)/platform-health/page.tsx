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
        title="Platform Health"
        description="Monitor authoritative administrative health signals and platform readiness."
        state="operational"
      />

      <AdminSurfaceNotice
        state="operational"
      />
    </div>
  );
}
