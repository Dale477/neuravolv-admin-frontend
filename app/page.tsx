import {
  redirect,
} from "next/navigation";

import {
  AdminBackendError,
  getAdminIdentity,
} from "@/lib/admin/backend";

import {
  AdminSessionError,
} from "@/lib/auth/session";

import {
  AdminIdentityCard,
} from "@/components/admin/AdminIdentityCard";

import {
  AdminSignOut,
} from "@/components/auth/AdminSignOut";

export const dynamic =
  "force-dynamic";

function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-xl rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200/60">
          Access denied
        </p>

        <h1 className="mt-3 text-2xl font-semibold">
          Platform Admin authorization required
        </h1>

        <p className="mt-4 text-sm leading-6 text-white/50">
          Your authenticated identity does not have active Neuravolv Platform Admin authority.
        </p>

        <div className="mt-6">
          <AdminSignOut />
        </div>
      </section>
    </main>
  );
}

function ServiceUnavailable({
  requestId,
}: {
  requestId?: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-xl rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/60">
          Control plane unavailable
        </p>

        <h1 className="mt-3 text-2xl font-semibold">
          Administrative authority could not be reached
        </h1>

        <p className="mt-4 text-sm leading-6 text-white/50">
          Your session may still be valid. The Neuravolv administrative backend is temporarily unavailable or returned an invalid response.
        </p>

        {requestId ? (
          <p className="mt-5 font-mono text-xs text-white/35">
            Request ID: {requestId}
          </p>
        ) : null}

        <div className="mt-6">
          <AdminSignOut />
        </div>
      </section>
    </main>
  );
}

export default async function AdminRootPage() {
  let identity;

  try {
    const result =
      await getAdminIdentity();

    identity = result.data;
  } catch (error) {
    if (
      error instanceof
      AdminSessionError
    ) {
      redirect("/login");
    }

    if (
      error instanceof
      AdminBackendError
    ) {
      if (error.status === 401) {
        redirect("/login");
      }

      if (error.status === 403) {
        return <AccessDenied />;
      }

      return (
        <ServiceUnavailable
          requestId={
            error.requestId
          }
        />
      );
    }

    return (
      <ServiceUnavailable />
    );
  }

  return (
    <main className="min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
              Neuravolv
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Administrative Control Plane
            </h1>

            <p className="mt-2 text-sm text-white/45">
              Authoritative platform administration and operational governance.
            </p>
          </div>

          <AdminSignOut />
        </header>

        <div className="mt-8">
          <AdminIdentityCard
            identity={identity}
          />
        </div>

        <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-white/40">
            Bootstrap status
          </p>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Authentication, Platform Admin authority, and effective permissions are connected. Operational dashboards are not enabled in this gate.
          </p>
        </section>
      </div>
    </main>
  );
}
