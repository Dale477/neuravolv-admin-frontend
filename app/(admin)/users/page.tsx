import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  DataError,
  EmptyState,
  MetricCard,
  Panel,
  StatusBadge,
  safeText,
} from "@/components/admin/operations/OperationalUI";

import {
  getUsers,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const users =
    await getUsers();

  const items =
    users.data?.users
    ?? [];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Identity & Access"
        title="Users"
        description="Read current administrative user records. Governed mutations remain disabled in this read-only integration gate."
        state="operational"
      />

      {users.data ? (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard
              label="Users returned"
              value={
                users.data.count
                ?? items.length
              }
            />

            <MetricCard
              label="Active"
              value={
                items.filter(
                  (user) =>
                    user.status
                    === "active",
                ).length
              }
            />

            <MetricCard
              label="Suspended"
              value={
                items.filter(
                  (user) =>
                    user.status
                    === "suspended",
                ).length
              }
            />
          </div>

          <Panel
            title="User Directory"
          >
            {items.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[11px] uppercase tracking-[0.12em] text-white/30">
                      <th className="pb-3 pr-4 font-medium">
                        User
                      </th>
                      <th className="pb-3 pr-4 font-medium">
                        Plan
                      </th>
                      <th className="pb-3 pr-4 font-medium">
                        Role
                      </th>
                      <th className="pb-3 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map(
                      (user, index) => (
                        <tr
                          key={
                            String(
                              user.id
                              ?? index
                            )
                          }
                          className="border-b border-white/[0.05] text-sm text-white/60 last:border-0"
                        >
                          <td className="py-3 pr-4">
                            <p className="text-white/75">
                              {safeText(
                                user.email,
                              )}
                            </p>

                            <p className="mt-1 font-mono text-[10px] text-white/25">
                              {safeText(
                                user.id,
                              )}
                            </p>
                          </td>

                          <td className="py-3 pr-4">
                            {safeText(
                              user.plan
                              ?? user.tier,
                            )}
                          </td>

                          <td className="py-3 pr-4">
                            {safeText(
                              user.role,
                            )}
                          </td>

                          <td className="py-3">
                            <StatusBadge
                              value={
                                user.status
                              }
                            />
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState>
                No users were returned by the Admin authority.
              </EmptyState>
            )}
          </Panel>
        </>
      ) : (
        <DataError
          message={
            users.error
            ?? "User data unavailable."
          }
          requestId={
            users.requestId
          }
        />
      )}
    </div>
  );
}
