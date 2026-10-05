import { createBrowserClient } from "@supabase/ssr";

function requirePublicEnv(
  name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY",
): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name}_missing`);
  }

  return value;
}

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    requirePublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requirePublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}
