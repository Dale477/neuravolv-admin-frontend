import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  DataError,
  EmptyState,
  MetricCard,
  Panel,
  safeText,
} from "@/components/admin/operations/OperationalUI";

import {
  getAccountingSummary,
  getPlans,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [
    plans,
    accounting,
  ] = await Promise.all([
    getPlans(),
    getAccountingSummary(),
  ]);

  const items =
    plans.data?.plans
    ?? plans.data?.items
    ?? [];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Commercial Operations"
        title="Plans & Billing"
        description="Current plan records and canonical billing economics. Plan mutations are not enabled in this read-only gate."
        state="operational"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Plans returned"
          value={
            plans.data?.count
            ?? items.length
          }
        />

        <MetricCard
          label="Revenue"
          value={
            accounting.data?.revenue_usd
            === null
            || accounting.data?.revenue_usd
            === undefined
              ? "—"
              : new Intl.NumberFormat(
                  "en-US",
                  {
                    style:
                      "currency",
                    currency:
                      "USD",
                  },
                ).format(
                  accounting.data.revenue_usd,
                )
          }
        />

        <MetricCard
          label="Pricing coverage"
          value={
            accounting.data?.pricing_coverage_pct
            === null
            || accounting.data?.pricing_coverage_pct
            === undefined
              ? "—"
              : `${accounting.data.pricing_coverage_pct}%`
          }
        />
      </div>

      {plans.data ? (
        <Panel
          title="Plans"
          description="Rendered defensively from the current Admin plan authority without inventing fields."
        >
          {items.length ? (
            <div className="space-y-3">
              {items.map(
                (plan, index) => {
                  const id =
                    plan.id
                    ?? plan.slug
                    ?? plan.plan_slug
                    ?? index;

                  const name =
                    plan.name
                    ?? plan.slug
                    ?? plan.plan_slug
                    ?? plan.id;

                  return (
                    <div
                      key={String(id)}
                      className="rounded-lg border border-white/[0.06] px-4 py-3"
                    >
                      <p className="text-sm font-medium text-white/75">
                        {safeText(
                          name,
                        )}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/35">
                        {"status" in plan ? (
                          <span>
                            Status:{" "}
                            {safeText(
                              plan.status,
                            )}
                          </span>
                        ) : null}

                        {"price" in plan ? (
                          <span>
                            Price:{" "}
                            {safeText(
                              plan.price,
                            )}
                          </span>
                        ) : null}

                        {"price_usd" in plan ? (
                          <span>
                            Price USD:{" "}
                            {safeText(
                              plan.price_usd,
                            )}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <EmptyState>
              No plan records were returned.
            </EmptyState>
          )}
        </Panel>
      ) : (
        <DataError
          message={
            plans.error
            ?? "Plan data unavailable."
          }
          requestId={
            plans.requestId
          }
        />
      )}

      {accounting.error ? (
        <DataError
          message={
            accounting.error
          }
          requestId={
            accounting.requestId
          }
        />
      ) : null}
    </div>
  );
}
