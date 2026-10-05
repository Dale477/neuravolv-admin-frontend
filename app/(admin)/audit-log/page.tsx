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
        title="Audit Log"
        description="Review canonical administrative state changes, actors, resources, reasons, and outcomes."
        state="operational"
      />

      <AdminSurfaceNotice
        state="operational"
      />
    </div>
  );
}
