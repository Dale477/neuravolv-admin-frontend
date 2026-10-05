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
        title="Models & Providers"
        description="Govern model access and provider restrictions without altering Core routing semantics."
        state="operational"
      />

      <AdminSurfaceNotice
        state="operational"
      />
    </div>
  );
}
