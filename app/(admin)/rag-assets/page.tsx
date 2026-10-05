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
        title="RAG & Assets"
        description="Monitor operational assets, ingestion, retrieval readiness, storage, and vector infrastructure."
        state="backend_required"
      />

      <AdminSurfaceNotice
        state="backend_required"
      />
    </div>
  );
}
