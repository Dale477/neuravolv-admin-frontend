import { AdminLoginForm } from "@/components/auth/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
          Neuravolv
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Administration
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Authorized Neuravolv Platform Administrators only.
        </p>

        <AdminLoginForm />

        <p className="mt-6 text-xs leading-5 text-white/30">
          Platform Admin authorization is verified by the Neuravolv backend after authentication.
        </p>
      </section>
    </main>
  );
}
