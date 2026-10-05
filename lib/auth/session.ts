import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthenticatedAdminSession = {
  userId: string;
  accessToken: string;
};

export class AdminSessionError extends Error {
  readonly code:
    | "admin_authentication_required"
    | "admin_session_token_missing";

  constructor(
    code:
      | "admin_authentication_required"
      | "admin_session_token_missing",
  ) {
    super(code);
    this.name = "AdminSessionError";
    this.code = code;
  }
}

export async function requireAuthenticatedSession():
  Promise<AuthenticatedAdminSession> {
  const supabase =
    await createSupabaseServerClient();

  /*
   * getUser() validates the identity with Supabase Auth.
   * Do not authorize from cookie contents alone.
   */
  const {
    data: userData,
    error: userError,
  } = await supabase.auth.getUser();

  if (
    userError ||
    !userData.user?.id
  ) {
    throw new AdminSessionError(
      "admin_authentication_required",
    );
  }

  /*
   * getSession() is used only after getUser() validates identity.
   * Its bearer is forwarded server-to-server to Neuravolv.
   */
  const {
    data: sessionData,
    error: sessionError,
  } = await supabase.auth.getSession();

  const accessToken =
    sessionData.session?.access_token?.trim();

  if (
    sessionError ||
    !accessToken
  ) {
    throw new AdminSessionError(
      "admin_session_token_missing",
    );
  }

  return {
    userId: userData.user.id,
    accessToken,
  };
}
