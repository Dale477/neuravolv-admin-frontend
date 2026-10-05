# Neuravolv Administrative Control Plane

## Canonical application

Repository:

`/workspaces/neuravolv-admin-frontend`

Production domain:

`https://admin.neuravolv.ai`

This application is independent from the Neuravolv customer frontend.

## Authority model

The frontend is not the policy engine.

Canonical authorization remains:

Supabase authenticated identity
→ Neuravolv backend
→ Platform Admin membership
→ Platform Admin role
→ canonical permission
→ governed operation

## Backend

Server-side BFF target:

`https://api.neuravolv.ai/api/admin/*`

Do not expose privileged backend credentials to the browser.

Do not use `nvk_*` Enterprise API keys for Platform Admin access.

Do not use `MASTER_KEY`.

## Bootstrap authority

Canonical backend endpoints:

- `GET /api/admin/me`
- `GET /api/admin/audit`
- `GET /api/admin/health`

## Isolation

The Neuravolv customer frontend must not:

- host this application
- expose an Admin navigation link
- participate in Platform Admin authentication
- contain Platform Admin policy logic

Admin Portal availability must not affect customer runtime availability.

## Protected production systems

Do not alter from the Admin frontend:

- Main Chat routing
- SSE contracts
- Core routing
- model fallback logic
- Worker execution semantics
- Workforce execution semantics
- Enterprise execution semantics
- Video Studio execution
- NeuraSearch autonomy
- Stripe authority
- accounting writers

Admin APIs may observe or govern explicitly supported state only.

## Admin authentication bootstrap

The dedicated Admin application authenticates users with the same
Supabase Auth authority used by Neuravolv identity, but Platform Admin
authorization is never inferred by the frontend.

Flow:

`Supabase Auth -> authenticated session -> server-only BFF -> bearer token -> /api/admin/me -> Platform Admin authority`

The browser never sends a privileged backend secret.

The backend remains authoritative for:

- Platform Admin membership
- active/inactive status
- Platform Admin role
- effective permissions
- strict/compat Admin authorization mode

A successful Supabase login alone is not Platform Admin authorization.

The local Admin BFF must preserve or generate `X-Request-ID`.

Mutating BFF operations must never be automatically retried.
