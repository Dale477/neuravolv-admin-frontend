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
