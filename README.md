# xControl Visual Configurator

Starter workspace for the xControl Visual Configurator (React Flow + Node.js + PM2).

## Workspace Layout

- `backend/`: Express API for loading, validating, and exporting xControl config YAML.
- `frontend/`: React + React Flow UI scaffold (graph + inspector + preview panels).
- `ecosystem.config.js`: PM2 process definitions.

## Quick Start

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

```bash
npm run dev
```

The backend defaults to `backend/data/settings.yaml`. Override with `XCONTROL_CONFIG_PATH`.

## API Endpoints

- `GET /api/health`
- `GET /api/config`
- `POST /api/config/validate`
- `POST /api/config/save`
- `POST /api/config/export`
