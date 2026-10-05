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
        title="Digital Workforces"
        description="Operational administration of Workforce definitions, versions, membership, and execution."
        state="backend_required"
      />

      <AdminSurfaceNotice
        state="backend_required"
      />
    </div>
  );
}
