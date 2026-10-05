import { AdminSignOut } from "@/components/auth/AdminSignOut";

export function AdminAccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080a0e] px-6">
      <section className="w-full max-w-xl rounded-2xl border border-red-400/20 bg-red-400/[0.05] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300/60">
          Access denied
        </p>

        <h1 className="mt-3 text-2xl font-semibold text-white">
          Platform Admin authorization required
        </h1>

        <p className="mt-4 text-sm leading-6 text-white/55">
          Your Supabase identity is authenticated, but the Neuravolv backend
          did not authorize an active Platform Admin membership.
        </p>

        <div className="mt-7">
          <AdminSignOut />
        </div>
      </section>
    </main>
  );
}

export function AdminServiceUnavailable({
  requestId,
}: {
  requestId?: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080a0e] px-6">
      <section className="w-full max-w-xl rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300/60">
          Control plane unavailable
        </p>

        <h1 className="mt-3 text-2xl font-semibold text-white">
          Administrative authority could not be reached
        </h1>

        <p className="mt-4 text-sm leading-6 text-white/55">
          Your session may still be valid. The Neuravolv administrative
          backend is currently unavailable or returned an invalid response.
        </p>

        {requestId ? (
          <p className="mt-5 font-mono text-xs text-white/35">
            Request ID: {requestId}
          </p>
        ) : null}

        <div className="mt-7">
          <AdminSignOut />
        </div>
      </section>
    </main>
  );
}
