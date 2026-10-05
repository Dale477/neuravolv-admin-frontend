import type {
  AdminIdentity,
} from "@/lib/admin/types";

type Props = {
  identity: AdminIdentity;
};

export function AdminIdentityCard({
  identity,
}: Props) {
  return (
    <section className="rounded-xl border border-white/10 bg-black/20 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/40">
            Platform authority
          </p>

          <h2 className="mt-1 text-lg font-semibold">
            {identity.platform_admin_role ??
              "Platform Admin"}
          </h2>
        </div>

        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
          Authorized
        </span>
      </div>

      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-white/40">
            Authority
          </dt>
          <dd className="mt-1 text-white/80">
            {identity.authority ??
              "Unknown"}
          </dd>
        </div>

        <div>
          <dt className="text-white/40">
            Auth mode
          </dt>
          <dd className="mt-1 text-white/80">
            {identity.auth_mode ??
              "Unknown"}
          </dd>
        </div>

        <div className="sm:col-span-2">
          <dt className="text-white/40">
            Effective permissions
          </dt>

          <dd className="mt-2 flex flex-wrap gap-2">
            {identity.permissions.length ? (
              identity.permissions.map(
                (permission) => (
                  <span
                    key={permission}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/60"
                  >
                    {permission}
                  </span>
                ),
              )
            ) : (
              <span className="text-white/40">
                No feature permissions assigned.
              </span>
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
