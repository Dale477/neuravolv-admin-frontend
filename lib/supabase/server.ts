import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";


type CookieToSet = {
  name: string;
  value: string;
  options?: {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    sameSite?: boolean | "lax" | "strict" | "none";
    secure?: boolean;
  };
};

function requirePublicEnv(
  name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY",
): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name}_missing`);
  }

  return value;
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    requirePublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requirePublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet: CookieToSet[]) {
          try {
            for (const {
              name,
              value,
              options,
            } of cookiesToSet) {
              cookieStore.set(
                name,
                value,
                options,
              );
            }
          } catch {
            /*
             * Server Components cannot always mutate cookies.
             * Middleware is responsible for routine session refresh.
             */
          }
        },
      },
    },
  );
}
