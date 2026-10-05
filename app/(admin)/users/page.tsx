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
        title="Users"
        description="Manage user accounts, limits, suspension state, and administrative user operations."
        state="operational"
      />

      <AdminSurfaceNotice
        state="operational"
      />
    </div>
  );
}
