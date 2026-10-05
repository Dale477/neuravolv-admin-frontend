import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  DataError,
  EmptyState,
  Panel,
  safeText,
} from "@/components/admin/operations/OperationalUI";

import {
  getAudit,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const audit =
    await getAudit(100);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Governance"
        title="Audit Log"
        description="Canonical append-only administrative evidence with sensitive fields sanitized by the backend."
        state="operational"
      />

      {audit.data ? (
        <Panel
          title="Administrative Events"
          description={`Showing ${audit.data.items.length} event(s) from offset ${audit.data.offset}.`}
        >
          {audit.data.items.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[11px] uppercase tracking-[0.12em] text-white/30">
                    <th className="pb-3 pr-4 font-medium">
                      Time
                    </th>
                    <th className="pb-3 pr-4 font-medium">
                      Action
                    </th>
                    <th className="pb-3 pr-4 font-medium">
                      Target
                    </th>
                    <th className="pb-3 pr-4 font-medium">
                      Admin
                    </th>
                    <th className="pb-3 font-medium">
                      Result
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {audit.data.items.map(
                    (item, index) => (
                      <tr
                        key={
                          String(
                            item.id
                            ?? index
                          )
                        }
                        className="border-b border-white/[0.05] text-sm text-white/60 last:border-0"
                      >
                        <td className="py-3 pr-4 text-xs text-white/35">
                          {safeText(
                            item.created_at
                            ?? item.timestamp,
                          )}
                        </td>

                        <td className="py-3 pr-4 text-white/75">
                          {safeText(
                            item.action,
                          )}
                        </td>

                        <td className="py-3 pr-4">
                          {safeText(
                            item.target
                            ?? item.target_id,
                          )}
                        </td>

                        <td className="py-3 pr-4">
                          {safeText(
                            item.admin_user_id,
                          )}
                        </td>

                        <td className="py-3">
                          {safeText(
                            item.result
                            ?? item.status,
                          )}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState>
              No administrative events were returned.
            </EmptyState>
          )}
        </Panel>
      ) : (
        <DataError
          message={
            audit.error
            ?? "Audit data unavailable."
          }
          requestId={
            audit.requestId
          }
        />
      )}
    </div>
  );
}
