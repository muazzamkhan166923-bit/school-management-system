# Commercial Transformation — Online Phase 2

The School Management System remains offline-first. The central service is being prepared to manage schools, licenses, subscriptions, feature permissions, and updates remotely.

## Current phase
The Central Server is PostgreSQL-ready and includes Railway deployment configuration.

## Architecture
School Windows App -> secure Central API -> PostgreSQL

Super Admin -> secure Central API -> PostgreSQL

The school application's local operational database remains local/offline. The central database stores control-plane information such as school identity, license, plan, status, features, update assignments, and audit data.

## Railway
See `central-server/RAILWAY-STEP-2.md` for the exact setup.

Do not place Super Admin or client API secrets in the Windows installer.
