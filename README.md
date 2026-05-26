# Digital Barometer — frontend

Веб-интерфейс сервиса «Цифровой барометр» (анализ медиа-упоминаний по теме).
Стек: **Vite + React 18 + TypeScript + Tailwind CSS + Recharts**.

Бекенд: `../backend` (FastAPI), API эндпоинты:
`GET /topics`, `POST /topics`, `PATCH /topics/{id}`,
`GET /sources`, `POST /analysis`, `GET /analysis/{id}`, `GET /analysis/{id}/charts`,
`GET /health`.

## Локальный запуск

```bash
cp .env.example .env
npm install
npm run dev        # http://localhost:5173, проксирует /api → VITE_API_PROXY_TARGET
```

Переменные окружения:

| Var | Назначение | Default |
| --- | --- | --- |
| `VITE_API_URL` | base URL клиента (на проде — `/api`, обслуживается reverse-proxy) | `/api` |
| `VITE_API_PROXY_TARGET` | upstream для dev-прокси Vite | `http://localhost:8000` |

## Скрипты

```bash
npm run dev         # дев-сервер
npm run typecheck   # tsc --noEmit
npm run build       # сборка в dist/
npm run preview     # локально посмотреть production build
```

## Docker

Multi-stage сборка (node → nginx). API ожидается за тем же origin под префиксом
`/api` (Traefik / другой reverse-proxy маршрутизирует на backend).

```bash
docker build --build-arg VITE_API_URL=/api -t barometer-web .
docker run --rm -p 8081:80 barometer-web
# http://localhost:8081
```

## Docker Compose

`docker-compose.yml` поднимает образ с traefik-метками (websecure, cert resolver
`barometer`). Требует внешнюю сеть `web_network` и переменные:
`DOCKER_IMAGE_NAME`, `WEB_PUBLIC_HOST`, опционально `VITE_API_URL`.

## CI/CD (GitLab)

`.gitlab-ci.yml` повторяет конвенцию backend:
1. `test_frontend` — `npm ci` + `typecheck` + `build`.
2. `build_image` — `docker build` + push в `$CI_REGISTRY_IMAGE`
   (только ветки `main`, `stage`).
3. `deploy_stage` / `deploy_prod` — SSH на целевой хост, `scp` compose + env,
   `docker compose pull web && docker compose up -d`.

Требуемые CI-переменные:
`SSH_PRIVATE_KEY_STAGE`, `SSH_HOST_STAGE`, `SSH_PORT_STAGE`, `SSH_USER_STAGE`, `STAGE_ENV_FILE`,
`SSH_PRIVATE_KEY`, `SSH_HOST_PROD`, `SSH_PORT_PROD`, `SSH_USER_PROD`, `PROD_ENV_FILE`,
`BASE_DEPLOY_PATH`.
