import "server-only";

import {
  AdminBackendError,
  adminGet,
} from "@/lib/admin/backend";

import type {
  AdminAccountingSummary,
  AdminAuditResponse,
  AdminHealthSnapshot,
  AdminModelInventory,
  AdminPlansResponse,
  AdminProviderInventory,
  AdminSearchControl,
  AdminSearchShadowState,
  AdminUsersResponse,
} from "@/lib/admin/types";

export type AdminDataResult<T> = {
  data: T | null;
  error: string | null;
  status: number | null;
  requestId: string | null;
};

async function safeGet<T>(
  path: string,
): Promise<AdminDataResult<T>> {
  try {
    const {
      data,
      requestId,
    } = await adminGet<T>(path);

    return {
      data,
      error: null,
      status: 200,
      requestId,
    };
  } catch (error) {
    if (
      error instanceof
      AdminBackendError
    ) {
      return {
        data: null,
        error: error.message,
        status: error.status,
        requestId:
          error.requestId,
      };
    }

    return {
      data: null,
      error:
        "Administrative data is temporarily unavailable.",
      status: 503,
      requestId: null,
    };
  }
}

export const getHealth = () =>
  safeGet<AdminHealthSnapshot>(
    "/api/admin/health",
  );

export const getAudit = (
  limit = 20,
) =>
  safeGet<AdminAuditResponse>(
    `/api/admin/audit?limit=${limit}`,
  );

export const getAccountingSummary = () =>
  safeGet<AdminAccountingSummary>(
    "/api/admin/accounting/summary",
  );

export const getUsers = () =>
  safeGet<AdminUsersResponse>(
    "/api/admin/users",
  );

export const getModelInventory = () =>
  safeGet<AdminModelInventory>(
    "/api/admin/inventory/models",
  );

export const getProviderInventory = () =>
  safeGet<AdminProviderInventory>(
    "/api/admin/inventory/providers",
  );

export const getSearchState = () =>
  safeGet<AdminSearchShadowState>(
    "/api/admin/search/providers",
  );

export const getSearchControl = () =>
  safeGet<AdminSearchControl>(
    "/api/admin/search/providers/control",
  );

export const getPlans = () =>
  safeGet<AdminPlansResponse>(
    "/api/admin/plans/",
  );
