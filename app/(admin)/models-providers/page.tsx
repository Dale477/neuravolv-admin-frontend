import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  DataError,
  EmptyState,
  MetricCard,
  Panel,
  StatusBadge,
} from "@/components/admin/operations/OperationalUI";

import {
  getModelInventory,
  getProviderInventory,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [
    models,
    providers,
  ] = await Promise.all([
    getModelInventory(),
    getProviderInventory(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Runtime Governance"
        title="Models & Providers"
        description="Provider-neutral technical inventory and Admin restriction state. Current controls are restrict-only and do not imply routing cutover."
        state="operational"
      />

      <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.035] px-5 py-4 text-xs leading-5 text-amber-100/60">
        Admin model/provider controls are currently restriction policy only.
        This surface does not claim that toggling a control changes live Core routing.
      </div>

      {models.data ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Registered models"
            value={models.data.count}
          />

          <MetricCard
            label="Provider-neutral"
            value={
              models.data.provider_agnostic
                ? "Yes"
                : "No"
            }
          />

          <MetricCard
            label="Provider calls"
            value={
              models.data.provider_calls_performed
                ? "Performed"
                : "None"
            }
          />
        </div>
      ) : (
        <DataError
          message={
            models.error
            ?? "Model inventory unavailable."
          }
          requestId={
            models.requestId
          }
        />
      )}

      {providers.data ? (
        <Panel
          title="Provider Inventory"
          description="Derived from Core model/provider families; no provider list is hardcoded in the Admin frontend."
        >
          {providers.data.items.length ? (
            <div className="divide-y divide-white/[0.06]">
              {providers.data.items.map(
                (provider) => (
                  <div
                    key={provider.provider}
                    className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[1fr_auto_auto_auto]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white/80">
                        {provider.provider}
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        {provider.model_count} registered model(s)
                      </p>
                    </div>

                    <StatusBadge
                      value={`${provider.provider_ready_models} ready`}
                    />

                    <StatusBadge
                      value={
                        provider.admin_control?.blocked
                          ? "Restricted"
                          : "No Admin restriction"
                      }
                    />

                    <StatusBadge
                      value={
                        provider.admin_control
                          ?.runtime_cutover_effective
                          ? "Runtime effective"
                          : "Runtime cutover not proven"
                      }
                    />
                  </div>
                ),
              )}
            </div>
          ) : (
            <EmptyState>
              No providers were returned by Core inventory.
            </EmptyState>
          )}
        </Panel>
      ) : (
        <DataError
          message={
            providers.error
            ?? "Provider inventory unavailable."
          }
          requestId={
            providers.requestId
          }
        />
      )}

      {models.data ? (
        <Panel
          title="Model Inventory"
          description="Registration, lifecycle, deployment allowlist, provider readiness, and Admin restriction are shown separately."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] uppercase tracking-[0.12em] text-white/30">
                  <th className="pb-3 pr-4 font-medium">
                    Model
                  </th>
                  <th className="pb-3 pr-4 font-medium">
                    Provider
                  </th>
                  <th className="pb-3 pr-4 font-medium">
                    Lifecycle
                  </th>
                  <th className="pb-3 pr-4 font-medium">
                    Allowlisted
                  </th>
                  <th className="pb-3 pr-4 font-medium">
                    Ready
                  </th>
                  <th className="pb-3 font-medium">
                    Admin restriction
                  </th>
                </tr>
              </thead>

              <tbody>
                {models.data.items.map(
                  (model) => (
                    <tr
                      key={model.model_id}
                      className="border-b border-white/[0.05] text-sm text-white/60 last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <div className="font-medium text-white/80">
                          {model.model_id}
                        </div>
                        <div className="mt-1 text-xs text-white/30">
                          {model.modes?.join(", ") || "—"}
                        </div>
                      </td>

                      <td className="py-3 pr-4">
                        {model.provider}
                      </td>

                      <td className="py-3 pr-4">
                        <StatusBadge
                          value={
                            model.lifecycle_status
                          }
                        />
                      </td>

                      <td className="py-3 pr-4">
                        <StatusBadge
                          value={
                            model.deployment_allowlisted
                          }
                        />
                      </td>

                      <td className="py-3 pr-4">
                        <StatusBadge
                          value={
                            model.provider_ready
                          }
                        />
                      </td>

                      <td className="py-3">
                        <StatusBadge
                          value={
                            model.admin_control?.blocked
                              ? "Restricted"
                              : "No Admin restriction"
                          }
                        />
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
