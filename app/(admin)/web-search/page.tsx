import {
  AdminPageHeader,
} from "@/components/admin/shell/AdminPageHeader";

import {
  DataError,
  Panel,
  StatusBadge,
  safeText,
} from "@/components/admin/operations/OperationalUI";

import {
  getSearchControl,
  getSearchState,
} from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [
    state,
    control,
  ] = await Promise.all([
    getSearchState(),
    getSearchControl(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Search Operations"
        title="Web / NeuraSearch"
        description="Observed Search state and configured Admin policy are intentionally separated from actual live routing authority."
        state="operational"
      />

      <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.035] px-5 py-4 text-xs leading-5 text-amber-100/60">
        Search Admin control is currently configuration/shadow authority.
        Runtime cutover is not effective, so this page does not imply that configured order or enablement changes live Search routing.
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel
          title="Observed Search State"
          description="Backend shadow/readiness view of the Search subsystem."
        >
          {state.data ? (
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-sm text-white/40">
                  Runtime authority
                </span>
                <span className="text-sm text-white/70">
                  {safeText(
                    state.data.runtime_authority,
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-white/40">
                  Resolved provider
                </span>
                <span className="text-sm text-white/70">
                  {safeText(
                    state.data.shadow_resolved_provider,
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-white/40">
                  Runtime cutover
                </span>
                <StatusBadge
                  value={
                    state.data.runtime_cutover_effective
                  }
                />
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-white/25">
                  Providers
                </p>

                <div className="space-y-2">
                  {(state.data.providers ?? []).map(
                    (provider) => (
                      <div
                        key={
                          String(
                            provider.name,
                          )
                        }
                        className="flex items-center justify-between rounded-lg border border-white/[0.06] px-3 py-2"
                      >
                        <span className="text-sm text-white/65">
                          {safeText(
                            provider.name,
                          )}
                        </span>

                        <StatusBadge
                          value={
                            provider.available
                              ? "Available"
                              : "Unavailable"
                          }
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          ) : (
            <DataError
              message={
                state.error
                ?? "Search state unavailable."
              }
              requestId={
                state.requestId
              }
            />
          )}
        </Panel>

        <Panel
          title="Configured Admin Control"
          description="Persisted control state. This is not currently the live Search routing authority."
        >
          {control.data ? (
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-sm text-white/40">
                  Revision
                </span>
                <span className="text-sm text-white/70">
                  {safeText(
                    control.data.revision,
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-white/40">
                  Fallback allowed
                </span>
                <StatusBadge
                  value={
                    control.data.allow_fallback
                  }
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-white/25">
                  Configured order
                </p>

                <p className="mt-2 text-sm text-white/65">
                  {control.data.provider_order
                    ?.join(" → ")
                    || "No persisted order"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-white/25">
                  Enabled providers
                </p>

                <p className="mt-2 text-sm text-white/65">
                  {control.data.enabled_providers
                    ?.join(", ")
                    || "No persisted enablement"}
                </p>
              </div>
            </div>
          ) : (
            <DataError
              message={
                control.error
                ?? "Search control unavailable."
              }
              requestId={
                control.requestId
              }
            />
          )}
        </Panel>
      </div>
    </div>
  );
}
