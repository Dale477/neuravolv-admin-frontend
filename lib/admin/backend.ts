import "server-only";

import { randomUUID } from "node:crypto";

import {
  requireAuthenticatedSession,
} from "@/lib/auth/session";

import type {
  AdminApiError,
  AdminIdentity,
} from "@/lib/admin/types";

function apiBase(): string {
  const value =
    process.env.NEURAVOLV_API_BASE?.trim();

  if (!value) {
    throw new Error(
      "NEURAVOLV_API_BASE_missing",
    );
  }

  return value.replace(/\/+$/, "");
}

function safeMessage(
  status: number,
): string {
  switch (status) {
    case 401:
      return "Authentication required.";
    case 403:
      return "Platform Admin access is not authorized.";
    case 404:
      return "Administrative resource not found.";
    case 409:
      return "Administrative state changed. Refresh and try again.";
    case 422:
      return "Administrative request was invalid.";
    case 429:
      return "Administrative request rate limit reached.";
    case 503:
      return "Administrative authority is temporarily unavailable.";
    default:
      return status >= 500
        ? "Administrative backend request failed."
        : "Administrative request failed.";
  }
}

export class AdminBackendError extends Error {
  readonly status: number;
  readonly requestId: string;
  readonly code: string;

  constructor(
    error: AdminApiError,
  ) {
    super(error.message);

    this.name = "AdminBackendError";
    this.status = error.status;
    this.requestId = error.requestId;
    this.code = error.code;
  }
}

type AdminGetOptions = {
  requestId?: string;
};

export async function adminGet<T>(
  path: string,
  options: AdminGetOptions = {},
): Promise<{
  data: T;
  requestId: string;
}> {
  if (
    !path.startsWith("/api/admin/")
  ) {
    throw new Error(
      "admin_backend_path_invalid",
    );
  }

  const {
    accessToken,
  } = await requireAuthenticatedSession();

  const requestId =
    options.requestId?.trim() ||
    randomUUID();

  const response = await fetch(
    `${apiBase()}${path}`,
    {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${accessToken}`,
        Accept: "application/json",
        "X-Request-ID": requestId,
      },
      cache: "no-store",
      redirect: "manual",
    },
  );

  const raw =
    await response.text();

  if (!response.ok) {
    let backendDetail: string | null =
      null;

    try {
      const parsed =
        JSON.parse(raw) as {
          detail?: unknown;
        };

      if (
        typeof parsed.detail === "string"
      ) {
        backendDetail = parsed.detail;
      }
    } catch {
      // Never expose an arbitrary upstream body.
    }

    throw new AdminBackendError({
      status: response.status,
      code:
        `admin_backend_${response.status}`,
      message:
        backendDetail ??
        safeMessage(response.status),
      requestId,
    });
  }

  let data: T;

  try {
    data = JSON.parse(raw) as T;
  } catch {
    throw new AdminBackendError({
      status: 502,
      code:
        "admin_backend_invalid_json",
      message:
        "Administrative backend returned an invalid response.",
      requestId,
    });
  }

  return {
    data,
    requestId,
  };
}

export async function getAdminIdentity(
  requestId?: string,
) {
  return adminGet<AdminIdentity>(
    "/api/admin/me",
    {
      requestId,
    },
  );
}
