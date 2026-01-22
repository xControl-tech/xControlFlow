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

## Example: Tesira Level Control Reference

The snippet below shows a minimal pattern for referencing a Tesira level control by wiring a device entry and a slider component that maps its `state` to a status-file value. Adjust the device `args` and component `events` to match your Tesira command/driver expectations.

```yaml
devices:
  - id: tesira-1
    type: tesira
    label: Tesira DSP
    args:
      host: 192.168.1.50
      port: 23

groups:
  - id: audio
    label: Audio
    components:
      - id: tesira-level
        type: slider
        label: Program Level
        args:
          min: -100
          max: 0
          step: 1
          state: "$tesira.program.level"
        events:
          change:
            - action: Raw
              params:
                command: "tesira level set program $value"
```
