<div align="center">

<a href="https://gitlab.com/digital-barometer"><img src="https://gitlab.com/uploads/-/system/group/avatar/131474636/logo.png" width="72" alt="Digital Barometer"></a>

# frontend

### Pick a topic, a period, and sources — get the barometer, emotions, trends, and mentions

![React](https://img.shields.io/badge/React_18-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf)
![nginx](https://img.shields.io/badge/nginx-009639?logo=nginx&logoColor=white)

<sub>Part of <a href="https://gitlab.com/digital-barometer"><b>Digital Barometer</b></a></sub>

</div>

---

## Role in the system

A one-page dashboard for the [backend](https://gitlab.com/digital-barometer/backend).
You pick a topic, dates, and sources, run the analysis, and see everything on one
screen. The API is expected at `/api` on the same domain: Vite proxies it in
development, a reverse proxy does it in production.

```mermaid
flowchart LR
  U[browser] --> N((nginx<br>frontend))
  U -->|/api/*| API[backend]
```

## Features

- **Analysis setup** — pick or create a topic, edit keywords, choose dates and sources.
- **Barometer** — a 0–100 gauge with a sentiment label.
- **Charts** — emotions, sentiment by day, mentions over time, Google Trends interest.
- **Insights and mentions** — LLM insights and the mentions with links to the originals.
- **Light and dark theme.**

## Contracts

| Direction | Channel | Name |
| --- | --- | --- |
| Out | HTTP | `GET /sources` · `GET` / `POST /topics` · `PATCH /topics/{id}` |
| Out | HTTP | `POST /analysis` · `GET /analysis/{id}` · `GET /analysis/{id}/charts` |

## Quick start

With Docker and Traefik (needs `web_network` and Traefik from
[infra](https://gitlab.com/digital-barometer/infra)):

```bash
cp .env.example .env    # WEB_PUBLIC_HOST, VITE_API_URL
DOCKER_IMAGE_NAME=barometer-web docker compose up -d --build   # http://localhost:8081
```

For development:

```bash
cp .env.example .env
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build
```

## Structure

```text
frontend/
├── nginx.conf               # SPA fallback, /healthz, caching, security headers
└── src/
    ├── api/                 # API client
    ├── components/
    │   ├── charts/          # BarometerGauge, EmotionsDonut, MentionsLineChart, TrendLineChart, EngagementBarChart
    │   ├── forms/           # TopicPicker, DateRangePicker, SourcesMultiSelect
    │   └── ui/              # Button, Card, Input, Checkbox, Tag
    ├── features/dashboard/  # dashboard page, insights, mentions
    ├── hooks/               # useAnalysisRun, useTheme
    └── utils/
```
