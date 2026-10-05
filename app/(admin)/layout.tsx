import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import {
  AdminBackendError,
  getAdminIdentity,
} from "@/lib/admin/backend";

import {
  AdminSessionError,
} from "@/lib/auth/session";

import {
  AdminAccessDenied,
  AdminServiceUnavailable,
} from "@/components/admin/shell/AdminAccessState";

import {
  AdminShell,
} from "@/components/admin/shell/AdminShell";

export const dynamic =
  "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  try {
    const {
      data: identity,
    } = await getAdminIdentity();

    return (
      <AdminShell
        identity={identity}
      >
        {children}
      </AdminShell>
    );
  } catch (error) {
    if (
      error instanceof AdminSessionError
    ) {
      redirect("/login");
    }

    if (
      error instanceof AdminBackendError
    ) {
      if (error.status === 401) {
        redirect("/login");
      }

      if (error.status === 403) {
        return <AdminAccessDenied />;
      }

      return (
        <AdminServiceUnavailable
          requestId={error.requestId}
        />
      );
    }

    return <AdminServiceUnavailable />;
  }
}
