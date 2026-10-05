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

export type AdminHealthCheck = {
  status?: string;
  reachable?: boolean;
  authority_reachable?: boolean;
  readiness?: unknown;
  reason?: string;
  error_class?: string;
};

export type AdminHealthSnapshot = {
  status: string;
  coverage: string;
  checked_at: string;
  checks: Record<string, AdminHealthCheck>;
  unavailable: string[];
};

export type AdminAuditItem = Record<string, unknown>;

export type AdminAuditResponse = {
  items: AdminAuditItem[];
  limit: number;
  offset: number;
  next_offset: number | null;
  start: string | null;
  end: string | null;
};

export type AdminAccountingScope = {
  user_id?: string | null;
  organization_id?: string | null;
  project_id?: string | null;
};

export type AdminAccountingSummary = {
  start?: string | null;
  end?: string | null;
  scope?: AdminAccountingScope;
  usage_events?: number | null;
  priceable_components?: number | null;
  priced_components?: number | null;
  unpriced_components?: number | null;
  pricing_coverage_pct?: number | null;
  direct_cost_usd?: number | null;
  infrastructure_cost_usd?: number | null;
  revenue_usd?: number | null;
  contribution_margin_usd?: number | null;
  contribution_margin_pct?: number | null;
  platform_margin_usd?: number | null;
  platform_margin_pct?: number | null;
  shared_infrastructure_attributed?: boolean | null;
  [key: string]: unknown;
};

export type AdminUser = {
  id?: string;
  email?: string;
  plan?: string;
  tier?: string;
  role?: string;
  status?: string;
  created_at?: string;
  [key: string]: unknown;
};

export type AdminUsersResponse = {
  success?: boolean;
  users?: AdminUser[];
  count?: number;
  error?: string;
};

export type AdminRuntimeControl = {
  blocked?: boolean;
  reason?: string | null;
  revision?: number | null;
  updated_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  control_mode?: string | null;
  runtime_cutover_effective?: boolean;
};

export type AdminModelInventoryItem = {
  model_id: string;
  provider: string;
  tier?: string | null;
  modes?: string[];
  plan_min?: string | null;
  lifecycle_status?: string | null;
  lifecycle_routable?: boolean;
  deployment_allowlisted?: boolean;
  provider_ready?: boolean;
  technical_prerequisites_met?: boolean;
  readiness_reasons?: string[];
  routing_class?: string | null;
  context_window?: number | null;
  max_output_tokens?: number | null;
  admin_control?: AdminRuntimeControl | null;
};

export type AdminModelInventory = {
  authority: string;
  deployment_authority: string;
  provider_agnostic: boolean;
  provider_calls_performed: boolean;
  count: number;
  items: AdminModelInventoryItem[];
  orphan_controls?: Array<
    AdminRuntimeControl & {
      resource_key?: string;
    }
  >;
};

export type AdminProviderInventoryItem = {
  provider: string;
  registry_present: boolean;
  model_count: number;
  deployment_allowlisted_models: number;
  provider_ready_models: number;
  technical_prerequisites_met_models: number;
  modes: string[];
  models: Array<string | undefined>;
  admin_control?: AdminRuntimeControl | null;
};

export type AdminProviderInventory = {
  authority: string;
  provider_agnostic: boolean;
  provider_calls_performed: boolean;
  count: number;
  items: AdminProviderInventoryItem[];
};

export type AdminSearchProvider = {
  name?: string;
  position?: number;
  configured?: boolean;
  module_available?: boolean;
  available?: boolean;
  [key: string]: unknown;
};

export type AdminSearchShadowState = {
  control_mode?: string;
  runtime_authority?: string;
  runtime_cutover_requested?: boolean;
  runtime_cutover_effective?: boolean;
  shadow_order?: string[];
  shadow_resolved_provider?: string | null;
  providers?: AdminSearchProvider[];
  sources?: Record<string, unknown>;
};

export type AdminSearchControl = {
  control_key?: string;
  provider_order?: string[];
  enabled_providers?: string[];
  allow_fallback?: boolean;
  revision?: number;
  updated_by?: string | null;
  updated_at?: string | null;
  runtime_cutover_effective?: boolean;
};

export type AdminPlan = Record<string, unknown>;

export type AdminPlansResponse = {
  success?: boolean;
  plans?: AdminPlan[];
  items?: AdminPlan[];
  count?: number;
  error?: string;
};
