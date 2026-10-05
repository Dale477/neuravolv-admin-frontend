"use client";

import { useRouter } from "next/navigation";

import {
  createSupabaseBrowserClient,
} from "@/lib/supabase/client";

export function AdminSignOut() {
  const router = useRouter();

  async function signOut() {
    try {
      const supabase =
        createSupabaseBrowserClient();

      await supabase.auth.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-white/20 hover:text-white"
    >
      Sign out
    </button>
  );
}
