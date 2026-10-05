import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  AdminBackendError,
  adminGet,
} from "@/lib/admin/backend";

import {
  AdminSessionError,
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const UNSAFE_RESPONSE_KEYS = new Set([
  "trace",
  "traceback",
  "stack",
  "stack_trace",
  "exception",
]);

function sanitizeAdminResponse(
  value: unknown,
): unknown {
  if (Array.isArray(value)) {
    return value.map(
      sanitizeAdminResponse,
    );
  }

  if (
    value
    && typeof value === "object"
  ) {
    return Object.fromEntries(
      Object.entries(
        value as Record<
          string,
          unknown
        >,
      )
        .filter(
          ([key]) =>
            !UNSAFE_RESPONSE_KEYS.has(
              key.toLowerCase(),
            ),
        )
        .map(
          ([key, child]) => [
            key,
            sanitizeAdminResponse(
              child,
            ),
          ],
        ),
    );
  }

  return value;
}

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      path: string[];
    }>;
  },
) {
  const {
    path,
  } = await context.params;

  if (
    !Array.isArray(path)
    || path.length === 0
    || path.some(
      (part) =>
        !part
        || part === "."
        || part === "..",
    )
  ) {
    return NextResponse.json(
      {
        error: {
          code:
            "admin_bff_path_invalid",
          message:
            "Administrative path is invalid.",
        },
      },
      {
        status: 400,
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const incomingRequestId =
    request.headers
      .get("x-request-id")
      ?.trim();

  const query =
    request.nextUrl.search;

  const backendPath =
    `/api/admin/${path.join("/")}${query}`;

  try {
    const {
      data,
      requestId,
    } = await adminGet<unknown>(
      backendPath,
      {
        requestId:
          incomingRequestId,
      },
    );

    return NextResponse.json(
      sanitizeAdminResponse(
        data,
      ),
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
