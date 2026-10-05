import { createBrowserClient } from "@supabase/ssr";

function requireSupabaseUrl(): string {
  const value =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!value) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL_missing",
    );
  }

  return value;
}

function requireSupabaseAnonKey(): string {
  const value =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!value) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY_missing",
    );
  }

  return value;
}

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    requireSupabaseUrl(),
    requireSupabaseAnonKey(),
  );
}
