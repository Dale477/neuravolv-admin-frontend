import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  DataError,
  MetricCard,
  Panel,
  StatusBadge,
} from "@/components/admin/operations/OperationalUI";

import {
  getHealth,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const health =
    await getHealth();

  const checks =
    health.data
      ? Object.entries(
          health.data.checks,
        )
      : [];

  const unavailable =
    health.data?.unavailable
    ?? [];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Operations"
        title="Platform Health"
        description="Authoritative Admin-safe health probes. Absence of a probe is shown explicitly rather than inferred as healthy."
        state="operational"
      />

      {health.data ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              label="Status"
              value={
                health.data.status
              }
            />

            <MetricCard
              label="Coverage"
              value={
                health.data.coverage
              }
            />

            <MetricCard
              label="Unavailable"
              value={
                unavailable.length
              }
            />
          </div>

          <Panel
            title="Subsystem Checks"
            description={`Checked ${health.data.checked_at}`}
          >
            <div className="divide-y divide-white/[0.06]">
              {checks.map(
                ([name, check]) => (
                  <div
                    key={name}
                    className="flex items-start justify-between gap-6 py-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-white/75">
                        {name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/35">
                        {check.reason
                          ?? check.error_class
                          ?? (
                            check.reachable === true
                              ? "Reachable"
                              : "No additional detail"
                          )}
                      </p>
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
          </Panel>
        </>
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
    </div>
  );
}
