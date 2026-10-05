import type {
  ReactNode,
} from "react";

export function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: ReactNode;
  helper?: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/35">
        {label}
      </p>

      <div className="mt-4 text-3xl font-semibold tracking-tight text-white/90">
        {value}
      </div>

      {helper ? (
        <div className="mt-2 text-xs leading-5 text-white/35">
          {helper}
        </div>
      ) : null}
    </section>
  );
}

export function StatusBadge({
  value,
}: {
  value:
    | string
    | boolean
    | null
    | undefined;
}) {
  const label =
    typeof value === "boolean"
      ? value
        ? "Yes"
        : "No"
      : String(
          value ?? "Unknown",
        );

  return (
    <span className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/60">
      {label}
    </span>
  );
}

export function DataError({
  message,
  requestId,
}: {
  message: string;
  requestId?: string | null;
}) {
  return (
    <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-4">
      <p className="text-sm text-amber-100/80">
        {message}
      </p>

      {requestId ? (
        <p className="mt-1 font-mono text-[10px] text-white/25">
          Request {requestId}
        </p>
      ) : null}
    </div>
  );
}

export function EmptyState({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-10 text-center text-sm text-white/30">
      {children}
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/[0.08] bg-white/[0.02]">
      <div className="border-b border-white/[0.06] px-5 py-4">
        <h2 className="text-sm font-medium text-white/80">
          {title}
        </h2>

        {description ? (
          <p className="mt-1 text-xs leading-5 text-white/35">
            {description}
          </p>
        ) : null}
      </div>

      <div className="p-5">
        {children}
      </div>
    </section>
  );
}

export function formatNumber(
  value:
    | number
    | null
    | undefined,
): string {
  if (
    value === null
    || value === undefined
    || !Number.isFinite(value)
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-US",
  ).format(value);
}

export function formatUsd(
  value:
    | number
    | null
    | undefined,
): string {
  if (
    value === null
    || value === undefined
    || !Number.isFinite(value)
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    },
  ).format(value);
}

export function safeText(
  value: unknown,
): string {
  if (
    value === null
    || value === undefined
    || value === ""
  ) {
    return "—";
  }

  if (
    typeof value === "string"
    || typeof value === "number"
    || typeof value === "boolean"
  ) {
    return String(value);
  }

  return "—";
}
