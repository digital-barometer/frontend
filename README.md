# Digital Barometer — frontend

Web UI for the "Digital Barometer" service (media-mention analysis for a topic).
Stack: **Vite + React 18 + TypeScript + Tailwind CSS + Recharts**.

Backend: `../backend` (FastAPI), API endpoints:
`GET /topics`, `POST /topics`, `PATCH /topics/{id}`,
`GET /sources`, `POST /analysis`, `GET /analysis/{id}`, `GET /analysis/{id}/charts`,
`GET /health`.

## Running locally

```bash
cp .env.example .env
npm install
npm run dev        # http://localhost:5173, proxies /api → VITE_API_PROXY_TARGET
```

Environment variables:

| Var | Purpose | Default |
| --- | --- | --- |
| `VITE_API_URL` | client base URL (in production — `/api`, served by the reverse proxy) | `/api` |
| `VITE_API_PROXY_TARGET` | upstream for the Vite dev-server proxy | `http://localhost:8000` |

## Scripts

```bash
npm run dev         # dev server
npm run typecheck   # tsc --noEmit
npm run build       # build into dist/
npm run preview     # preview the production build locally
```

## Docker

Multi-stage build (node → nginx). The API is expected on the same origin
under the `/api` prefix (Traefik / another reverse proxy routes it to the
backend).

```bash
docker build --build-arg VITE_API_URL=/api -t barometer-web .
docker run --rm -p 8081:80 barometer-web
# http://localhost:8081
```

## Docker Compose

`docker-compose.yml` runs the image with Traefik labels (websecure, cert
resolver `barometer`). Requires the external network `web_network` and the
variables: `DOCKER_IMAGE_NAME`, `WEB_PUBLIC_HOST`, optionally `VITE_API_URL`.

## CI/CD (GitLab)

`.gitlab-ci.yml` follows the same convention as the backend:
1. `test_frontend` — `npm ci` + `typecheck` + `build`.
2. `build_image` — `docker build` + push to `$CI_REGISTRY_IMAGE`
   (`main`, `stage` branches only).
3. `deploy_stage` / `deploy_prod` — SSH into the target host, `scp` compose
   file + env, `docker compose pull web && docker compose up -d`.

Required CI variables:
`SSH_PRIVATE_KEY_STAGE`, `SSH_HOST_STAGE`, `SSH_PORT_STAGE`, `SSH_USER_STAGE`, `STAGE_ENV_FILE`,
`SSH_PRIVATE_KEY`, `SSH_HOST_PROD`, `SSH_PORT_PROD`, `SSH_USER_PROD`, `PROD_ENV_FILE`,
`BASE_DEPLOY_PATH`.
