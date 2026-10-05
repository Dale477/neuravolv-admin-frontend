import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  DataError,
  MetricCard,
  Panel,
  StatusBadge,
  formatNumber,
  formatUsd,
  safeText,
} from "@/components/admin/operations/OperationalUI";

import {
  getAccountingSummary,
  getAudit,
  getHealth,
  getUsers,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const [
    health,
    users,
    accounting,
    audit,
  ] = await Promise.all([
    getHealth(),
    getUsers(),
    getAccountingSummary(),
    getAudit(8),
  ]);

  const userCount =
    users.data?.count
    ?? users.data?.users?.length
    ?? null;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Operations"
        title="Platform Overview"
        description="Live administrative status, user activity, canonical accounting, and audit evidence."
        state="operational"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Users"
          value={formatNumber(userCount)}
          helper="Authoritative Admin user listing"
        />

        <MetricCard
          label="Usage events"
          value={formatNumber(
            accounting.data?.usage_events,
          )}
          helper="Canonical accounting events in the current reporting scope"
        />

        <MetricCard
          label="Direct cost"
          value={formatUsd(
            accounting.data?.direct_cost_usd,
          )}
          helper={
            accounting.data?.unpriced_components
              ? `${accounting.data.unpriced_components} component(s) remain unpriced`
              : "Canonical cost accounting"
          }
        />

        <MetricCard
          label="Platform health"
          value={
            health.data?.status
              ?? "Unavailable"
          }
          helper={
            health.data
              ? `Coverage: ${health.data.coverage}`
              : health.error
          }
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        <Panel
          title="Platform Health"
          description="Admin-safe probes only. Not-probed subsystems are not represented as healthy."
        >
          {health.data ? (
            <div className="space-y-3">
              {Object.entries(
                health.data.checks,
              ).map(
                ([name, check]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm text-white/70">
                        {name}
                      </p>

                      {check.reason ? (
                        <p className="mt-1 text-xs text-white/30">
                          {check.reason}
                        </p>
                      ) : null}
                    </div>

                    <StatusBadge
                      value={
                        check.status
                        ?? "unknown"
                      }
                    />
                  </div>
                ),
              )}
            </div>
          ) : (
            <DataError
              message={
                health.error
                ?? "Platform health unavailable."
              }
              requestId={
                health.requestId
              }
            />
          )}
        </Panel>

        <Panel
          title="Recent Administrative Activity"
          description="Canonical append-only Platform Admin audit evidence."
        >
          {audit.data ? (
            <div className="space-y-3">
              {audit.data.items
                .slice(0, 8)
                .map(
                  (item, index) => (
                    <div
                      key={
                        String(
                          item.id
                          ?? index
                        )
                      }
                      className="border-b border-white/[0.05] pb-3 last:border-0"
                    >
                      <p className="text-sm text-white/70">
                        {safeText(
                          item.action,
                        )}
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        {safeText(
                          item.target
                          ?? item.target_id
                          ?? item.resource,
                        )}
                      </p>
                    </div>
                  ),
                )}
            </div>
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
        </Panel>
      </div>
    </div>
  );
}
