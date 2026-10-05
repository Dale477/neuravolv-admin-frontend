import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  AdminBackendError,
  getAdminIdentity,
} from "@/lib/admin/backend";

import {
  AdminSessionError,
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
) {
  const incomingRequestId =
    request.headers
      .get("x-request-id")
      ?.trim();

  try {
    const {
      data,
      requestId,
    } = await getAdminIdentity(
      incomingRequestId,
    );

    return NextResponse.json(
      data,
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store",
          "X-Request-ID":
            requestId,
        },
      },
    );
  } catch (error) {
    if (
      error instanceof
      AdminSessionError
    ) {
      return NextResponse.json(
        {
          error: {
            code: error.code,
            message:
              "Administrative authentication is required.",
          },
        },
        {
          status: 401,
          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    if (
      error instanceof
      AdminBackendError
    ) {
      return NextResponse.json(
        {
          error: {
            code: error.code,
            message:
              error.message,
          },
          request_id:
            error.requestId,
        },
        {
          status: error.status,
          headers: {
            "Cache-Control":
              "no-store",
            "X-Request-ID":
              error.requestId,
          },
        },
      );
    }

    return NextResponse.json(
      {
        error: {
          code:
            "admin_service_unavailable",
          message:
            "Administrative control authority is temporarily unavailable.",
        },
      },
      {
        status: 503,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}
