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
        title="Digital Workers"
        description="Operational administration of Digital Workers, versions, execution state, and platform usage."
        state="partial"
      />

      <AdminSurfaceNotice
        state="partial"
      />
    </div>
  );
}
