# PlasmaMade Partner Center

Production-ready Partner Center frontend with a shared sync API for account requests, admin state, partner data, support tickets, designs, CMS edits and portal settings.

## Run Locally

```powershell
npm start
```

Open `http://127.0.0.1:8787`.

## Shared Online Data

GitHub Pages can host the static frontend, but it cannot run a backend or database. Shared data across all accounts and browsers requires the included Node API:

- `GET /api/sync` pulls central state.
- `POST /api/sync` handles `login`, `accountRequest` and authenticated `saveState`.
- Data is stored in `server/data/state.json` by default.
- Admin sessions use signed tokens; set `PM_SYNC_SECRET` before production.

Copy `.env.example` to `.env` on the server and set:

```env
PM_SYNC_SECRET=replace-with-a-long-random-secret
PM_ALLOWED_ORIGINS=https://plasmamade.github.io,https://plasmamade.com,https://www.plasmamade.com
```

When the frontend is served by this Node server, it automatically uses same-origin `/api/sync`.

When GitHub Pages remains the frontend host, configure the external API URL in `assets/js/sync-config.js`, or set it per browser once:

```text
https://plasmamade.github.io/partner-center/?syncEndpoint=https://your-api-domain.com/api/sync
```

When the endpoint is set, the portal stops behaving as a local-only GitHub Pages site and uses the central API for login, account requests and data changes.

Production note: on GitHub Pages, account requests are blocked until a sync endpoint is configured. This prevents requests from being saved only in one browser while admins in another browser see nothing.
