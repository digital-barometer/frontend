<div align="center">

![Digital Barometer](docs/assets/logo.svg){width=96 height=96}

# Digital Barometer · frontend

**Веб-интерфейс сервиса «Цифровой барометр»: темы, источники и графики анализа.**

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-009639?style=flat-square&logo=nginx&logoColor=white)

</div>

---

Это один из трёх репозиториев системы — общий обзор в
[профиле группы](https://gitlab.com/digital-barometer):

| | Репозиторий | Назначение |
| :---: | --- | --- |
| 🧠 | [**backend**](https://gitlab.com/digital-barometer/backend) | REST API, сбор данных, LLM-анализ |
| 📊 | **frontend** (этот) | Веб-интерфейс: темы, источники, графики |
| 🛠️ | [**infra**](https://gitlab.com/digital-barometer/infra) | Traefik и PostgreSQL |

Графики строятся на Recharts. Интерфейс работает с API
[backend](https://gitlab.com/digital-barometer/backend): `/topics`,
`/sources`, `/analysis`, `/analysis/{id}/charts`, `/health`.

## Локальный запуск

```bash
cp .env.example .env
npm install
npm run dev
```

Dev-сервер поднимается на `http://localhost:5173` и проксирует `/api` на
`VITE_API_PROXY_TARGET`.

### Переменные окружения

| Переменная | Назначение | По умолчанию |
| --- | --- | --- |
| `VITE_API_URL` | Базовый URL API для клиента (в production — `/api` через reverse proxy) | `/api` |
| `VITE_API_PROXY_TARGET` | Куда dev-сервер Vite проксирует запросы | `http://localhost:8000` |

## Скрипты

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Dev-сервер |
| `npm run typecheck` | Проверка типов (`tsc -b --noEmit`) |
| `npm run lint` | ESLint |
| `npm run build` | Сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки на `http://localhost:4173` |

## Docker

Многоэтапная сборка (node → nginx). API ожидается на том же домене под
префиксом `/api` — его проксирует Traefik или другой reverse proxy.

```bash
docker build --build-arg VITE_API_URL=/api -t barometer-web .
docker run --rm -p 8081:80 barometer-web
# http://localhost:8081
```

### Docker Compose

`docker-compose.yml` запускает образ с лейблами Traefik (entrypoint
`websecure`, cert resolver `barometer`). Нужна внешняя сеть `web_network`
из [infra](https://gitlab.com/digital-barometer/infra) и переменные
`DOCKER_IMAGE_NAME`, `WEB_PUBLIC_HOST`, опционально `VITE_API_URL`.

## CI/CD

Пайплайн в `.gitlab-ci.yml` устроен так же, как в backend:

1. **`test_frontend`** — `npm ci`, `typecheck`, `build`.
2. **`build_image`** — `docker build` и push в `$CI_REGISTRY_IMAGE`.
   Только для веток `main` и `stage`.
3. **`deploy_stage` / `deploy_prod`** — по SSH на целевой хост: `scp`
   compose-файла и env, `docker compose pull web && docker compose up -d`.

<details>
<summary>Переменные CI</summary>

| Окружение | Переменные |
| --- | --- |
| staging | `SSH_PRIVATE_KEY_STAGE`, `SSH_HOST_STAGE`, `SSH_PORT_STAGE`, `SSH_USER_STAGE`, `STAGE_ENV_FILE` |
| production | `SSH_PRIVATE_KEY`, `SSH_HOST_PROD`, `SSH_PORT_PROD`, `SSH_USER_PROD`, `PROD_ENV_FILE` |
| общие | `BASE_DEPLOY_PATH` |

</details>
