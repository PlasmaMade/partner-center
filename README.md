# PlasmaMade Partner Center

Production-ready Partner Center frontend with a shared sync API for account requests, admin state, partner data, support tickets, designs, CMS edits, portal settings and the admin PlasmaMade Builder.

## Run Locally

```powershell
npm start
```

Open `http://127.0.0.1:8787`.

## Shared Online Data

GitHub Pages can host the static frontend, but it cannot run a backend or database. Shared data across all accounts and browsers requires the included Node API:

- `GET /api/sync` pulls central state.
- `POST /api/sync` handles `login`, `accountRequest` and authenticated `saveState`.
- `POST /api/ai-coder` powers the admin PlasmaMade Builder with server-side OpenAI credentials.
- Data is stored in Neon/Postgres when `DATABASE_URL` is set.
- Without `DATABASE_URL`, local testing stores data in `server/data/state.json`.
- Admin sessions use signed tokens; set `PM_SYNC_SECRET` before production.
- The PlasmaMade Builder requires an admin session token and `OPENAI_API_KEY` on the server. Without a key, the frontend falls back to safe local proposals with the same builder modes and action-plan UI.

Copy `.env.example` to `.env` on the server and set:

```env
PM_SYNC_SECRET=replace-with-a-long-random-secret
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
PM_ALLOWED_ORIGINS=https://plasmamade.github.io,https://plasmamade.com,https://www.plasmamade.com
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
OPENAI_REASONING_EFFORT=medium
```

By default, browser deployments use the shared Render sync endpoint so static mirrors read and write the same central state. Local development and the Render API host use same-origin `/api/sync`.

When GitHub Pages remains the frontend host, or when a separate server should be forced, configure the external API URL in `assets/js/sync-config.js`, or set it per browser once:

```text
https://plasmamade.github.io/partner-center/?syncEndpoint=https://your-api-domain.com/api/sync
```

When the endpoint is set, the portal stops behaving as a local-only GitHub Pages site and uses the central API for login, account requests and data changes.

Production note: on GitHub Pages, account requests are blocked until a sync endpoint is configured. This prevents requests from being saved only in one browser while admins in another browser see nothing.

## Free Neon + Render Setup

The Neon REST URL is not the Partner Center API URL. The live setup is:

```text
GitHub Pages frontend -> Render Node API -> Neon database
```

Use Neon for the database and Render for the Node API.

1. Create or open a Neon project.
2. Copy the pooled PostgreSQL connection string from Neon. It starts with `postgresql://` and is the value for `DATABASE_URL`.
3. Create a free Render Web Service from this GitHub repository.
4. Use these Render settings:

```text
Build Command: npm install
Start Command: npm start
Plan: Free
```

5. Add these Render environment variables:

```env
DATABASE_URL=postgresql://...from-neon...
PM_SYNC_SECRET=make-this-a-long-random-secret
PM_ALLOWED_ORIGINS=https://plasmamade.github.io,https://plasmamade.com,https://www.plasmamade.com
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
OPENAI_REASONING_EFFORT=medium
NODE_ENV=production
```

6. After Render deploys, open:

```text
https://your-render-service.onrender.com/api/health
```

The response should include:

```json
{"ok":true,"storage":"postgres"}
```

7. Connect GitHub Pages by setting the endpoint in `assets/js/sync-config.js`:

```js
var DEFAULT_ENDPOINT = "https://your-render-service.onrender.com/api/sync";
```

After that, login, account requests, admin notifications and portal changes all go through the same central API and database.

Useful Neon docs:

- Neon init: https://neon.com/docs/reference/cli-init
- Neon project commands: https://neon.com/docs/reference/cli-projects
- Neon connection string command: https://neon.com/docs/reference/cli-connection-string
