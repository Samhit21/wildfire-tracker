# Wildfire Monitor

A full-stack wildfire monitoring application built with React and TypeScript.

The project will eventually display wildfire activity using NASA FIRMS data. Milestone 1 establishes the frontend, backend, and basic API tests. Wildfire data integration will be added in a future milestone.

## Current tech stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Backend testing: Vitest

## Project structure

```text
wildfire-tracker/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 24 LTS and npm
- Git
- Visual Studio Code recommended

## Run locally

Run the frontend and backend in separate terminals.

### Frontend

From the project root:

```bash
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

The page displays **Wildfire Monitor**.

### Backend

From the project root:

```bash
cd backend
npm ci
```

For first-time setup, copy `backend/.env.example` to `backend/.env` and adjust the values as needed. Keep an existing `.env` file and never commit it.

Start the development server:

```bash
npm run dev
```

With the default port configuration, check:

```text
http://localhost:3001/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## Validation

### Frontend

Run inside `frontend`:

```bash
npm run lint
npm run build
```

The build includes TypeScript checking.

### Backend

Run inside `backend`:

```bash
npm test
npm run typecheck
npm run build
```

The backend tests cover:

- Successful health response
- JSON 404 response for unknown routes
- JSON 400 response for malformed request bodies

## Future milestones

NASA FIRMS integration, PostgreSQL, interactive maps, Docker, and CI are planned for later milestones. They are not implemented yet.