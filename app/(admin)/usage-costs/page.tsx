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
} from "@/components/admin/operations/OperationalUI";

import {
  getAccountingSummary,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const summary =
    await getAccountingSummary();

  const data =
    summary.data;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Economics"
        title="Usage & Costs"
        description="Canonical usage, pricing coverage, cost, revenue, and margin. Missing rates remain explicitly unpriced."
        state="operational"
      />

      {data ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Usage events"
              value={
                formatNumber(
                  data.usage_events,
                )
              }
            />

            <MetricCard
              label="Direct cost"
              value={
                formatUsd(
                  data.direct_cost_usd,
                )
              }
            />

            <MetricCard
              label="Revenue"
              value={
                formatUsd(
                  data.revenue_usd,
                )
              }
            />

            <MetricCard
              label="Contribution margin"
              value={
                formatUsd(
                  data.contribution_margin_usd,
                )
              }
              helper={
                data.contribution_margin_pct
                === null
                || data.contribution_margin_pct
                === undefined
                  ? "Margin percentage unavailable"
                  : `${data.contribution_margin_pct}%`
              }
            />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <Panel
              title="Pricing Coverage"
              description="Unpriced usage is never silently treated as zero cost."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard
                  label="Priceable"
                  value={
                    formatNumber(
                      data.priceable_components,
                    )
                  }
                />

                <MetricCard
                  label="Priced"
                  value={
                    formatNumber(
                      data.priced_components,
                    )
                  }
                />

                <MetricCard
                  label="Unpriced"
                  value={
                    formatNumber(
                      data.unpriced_components,
                    )
                  }
                />

                <MetricCard
                  label="Coverage"
                  value={
                    data.pricing_coverage_pct
                    === null
                    || data.pricing_coverage_pct
                    === undefined
                      ? "—"
                      : `${data.pricing_coverage_pct}%`
                  }
                />
              </div>
            </Panel>

            <Panel
              title="Platform Economics"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/45">
                    Infrastructure cost
                  </span>
                  <span className="text-sm text-white/75">
                    {formatUsd(
                      data.infrastructure_cost_usd,
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/45">
                    Platform margin
                  </span>
                  <span className="text-sm text-white/75">
                    {formatUsd(
                      data.platform_margin_usd,
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/45">
                    Shared infrastructure attributed
                  </span>
                  <StatusBadge
                    value={
                      data.shared_infrastructure_attributed
                    }
                  />
                </div>
              </div>
            </Panel>
          </div>
        </>
      ) : (
        <DataError
          message={
            summary.error
            ?? "Accounting summary unavailable."
          }
          requestId={
            summary.requestId
          }
        />
      )}
    </div>
  );
}
