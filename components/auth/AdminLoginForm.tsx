"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  createSupabaseBrowserClient,
} from "@/lib/supabase/client";

export function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      const supabase =
        createSupabaseBrowserClient();

      const {
        error: authError,
      } =
        await supabase.auth
          .signInWithPassword({
            email: email.trim(),
            password,
          });

      if (authError) {
        setError(
          "Unable to sign in with those credentials.",
        );
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError(
        "Administrative authentication is unavailable.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mt-8 space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-white/70"
        >
          Administrator email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) =>
            setEmail(
              event.target.value,
            )
          }
          className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/30"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-white/70"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value,
            )
          }
          className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-white/30"
        />
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting
          ? "Signing in…"
          : "Sign in to Administration"}
      </button>
    </form>
  );
}
