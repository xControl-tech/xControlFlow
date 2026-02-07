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

## Download & Run (Terminal)

```bash
git clone <repo-url> xControlFlow
cd xControlFlow
npm install
npm --prefix backend install
npm --prefix frontend install
```

```bash
npm run dev
```

Open the UI at `http://localhost:5173` and the API at `http://localhost:4000/api/health`.

### WSL (Ubuntu) Notes

If you see an error like `ENOENT ... \\wsl.localhost\\Ubuntu-22.04\\home\\...\\package.json`, npm is being run from **Windows** instead of inside your WSL shell. Fix it by:

1. Open **Ubuntu (WSL)** and run all commands from there.
2. Ensure the repo lives inside your WSL filesystem (e.g. `/home/<user>/xControlFlow`) and not in a Windows-mounted path.

```bash
pwd
# should look like: /home/<user>/xControlFlow
ls package.json
```

Then re-run:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
npm run dev
```

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

## Device & Component Type Review (Planned)

Before implementing full schema-driven editing, we need a deep review of each supported **device type** and **component type** to confirm:

- Required vs optional fields.
- Parameter names, data types, and default values.
- Status-file mappings and how state is read/written.
- Event/action wiring and expected command templates.

This review will be used to populate a type registry that drives the inspector UI and validation rules.

## Upload Existing Configs & Stylesheets (Planned)

The app will support uploading an existing `settings.yaml` (or `settings.yml`) to:

- Parse the config into a graph representation.
- Render a live preview using a default stylesheet or an uploaded stylesheet.
- Preserve unknown fields for round-trip safety.

Implementation will add API and UI flows for file upload, config parsing, and stylesheet selection.
