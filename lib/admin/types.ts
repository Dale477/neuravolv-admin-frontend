export type AdminIdentity = {
  user_id: string;
  platform_admin: boolean;
  platform_admin_role: string | null;
  permissions: string[];
  authority: string | null;
  auth_mode: string | null;
  membership_id: string | null;
};

export type AdminApiError = {
  status: number;
  code: string;
  message: string;
  requestId: string;
};
