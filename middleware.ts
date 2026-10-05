import {
  createServerClient,
} from "@supabase/ssr";

import {
  NextResponse,
  type NextRequest,
} from "next/server";


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

function env(
  name:
    | "NEXT_PUBLIC_SUPABASE_URL"
    | "NEXT_PUBLIC_SUPABASE_ANON_KEY",
) {
  return process.env[name]?.trim();
}

export async function middleware(
  request: NextRequest,
) {
  const supabaseUrl =
    env(
      "NEXT_PUBLIC_SUPABASE_URL",
    );

  const supabaseAnonKey =
    env(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );

  /*
   * Allow the application to build without production secrets.
   * Runtime authentication remains unavailable until configured.
   */
  if (
    !supabaseUrl ||
    !supabaseAnonKey
  ) {
    return NextResponse.next();
  }

  let response =
    NextResponse.next({
      request,
    });

  const supabase =
    createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },

          setAll(cookiesToSet: CookieToSet[]) {
            for (const {
              name,
              value,
            } of cookiesToSet) {
              request.cookies.set(
                name,
                value,
              );
            }

            response =
              NextResponse.next({
                request,
              });

            for (const {
              name,
              value,
              options,
            } of cookiesToSet) {
              response.cookies.set(
                name,
                value,
                options,
              );
            }
          },
        },
      },
    );

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  const path =
    request.nextUrl.pathname;

  const isLogin =
    path === "/login";

  const isAdminApi =
    path.startsWith(
      "/api/admin/",
    );

  if (
    !user &&
    !isLogin &&
    !isAdminApi
  ) {
    const url =
      request.nextUrl.clone();

    url.pathname = "/login";
    url.search = "";

    return NextResponse.redirect(
      url,
    );
  }

  if (
    user &&
    isLogin
  ) {
    const url =
      request.nextUrl.clone();

    url.pathname = "/";
    url.search = "";

    return NextResponse.redirect(
      url,
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
