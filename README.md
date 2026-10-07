# School Client — Commercial Online Integration Plan

The Electron school client remains **offline-first**. Internet is used only for controlled central services such as activation, license verification, feature authorization, and update checks.

## Central endpoints

- `POST /api/client/activate`
- `POST /api/client/check-update`

Both endpoints require the server's separate `CLIENT_API_SECRET` header. The Super Admin token must never be embedded in the school application.

## Required production behavior

1. First-run activation obtains the school's central identity.
2. The client stores a local signed/cacheable authorization result.
3. Normal school operations continue when Internet is unavailable.
4. Periodic online checks refresh license/subscription/feature/update information.
5. Suspended/cancelled schools are blocked from central authorization, subject to the final offline grace-period policy.
6. Update packages must be cryptographically verified before installation.
7. Create a local database backup before updates.
8. Record successful, failed, and rolled-back updates.

The existing application source remains the baseline; the online layer should be added through Electron's main/preload architecture rather than making the renderer depend directly on Internet access.
