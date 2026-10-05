export default function AdminRootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-10 shadow-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          Neuravolv
        </p>

        <h1 className="text-4xl font-semibold tracking-tight">
          Administrative Control Plane
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
          Dedicated platform administration for Neuravolv operations,
          governance, monitoring, usage, cost, models, providers, and
          production controls.
        </p>

        <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
          Foundation initialized. Authentication and backend authority are
          not yet connected.
        </div>
      </section>
    </main>
  );
}
