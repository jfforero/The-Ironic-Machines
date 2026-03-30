# Speech to Emotion

Convert live microphone speech into sentiment and drive the audiovisual behavior of the app.

## Project structure

- `server.js`: Express API (`/emotion`) and static app server.
- `public/index.html`: main web interface.
- `public/recognition.js`: speech recognition + fetch to sentiment API.
- `public/pd/`: Pure Data patches used by WebPd.

## Prerequisites

- Node.js 18+ (recommended) and npm.
- A modern Chromium-based browser (Chrome/Edge) for Web Speech API support.
- Microphone permissions enabled in the browser.
- Optional: Python 3 if you want to serve `public/` with `python -m http.server`.

## Installation

Run from the project root (`What_Stirs_Within`):

```bash
npm install
```

This installs both production dependencies and development tools (including `nodemon`).

## Run options

### Option A (recommended): run everything from Express

This avoids cross-origin setup and is the simplest flow.

1. Start the app server:

```bash
npm run start
```

2. Open:

- [http://localhost:3000](http://localhost:3000)

### Option B: serve frontend with Python + API with Express

Use this only if you explicitly want separate frontend and API servers.

1. Terminal 1 (project root):

```bash
npm run start
```

2. Terminal 2 (`public/` folder):

```bash
python -m http.server 3332
```

3. Open:

- [http://localhost:3332](http://localhost:3332)

## Development mode (debug)

Run the Node inspector + auto-restart:

```bash
npm run start-debug
```

If you get `'nodemon' is not recognized`, run:

```bash
npm install
```

from `What_Stirs_Within/` (not from `public/`).

## Verify API is up

In PowerShell:

```powershell
curl.exe -i "http://localhost:3000/emotion?text=hello%20world"
```

Expected:

- `HTTP/1.1 200 OK`
- JSON body containing at least `score`, `comparative`, and `tokens`.

## Common issues and fixes

### 1) 404 errors for JS/CSS files

Symptoms:

- `jquery-2.1.0.min.js:1 Failed to load resource: 404`
- `webpd-latest.js:1 Failed to load resource: 404`

Cause:

- Frontend served from a different root with wrong asset paths.

Fix:

- Serve from `http://localhost:3000` (recommended), or ensure `public/` is the web root.

### 2) `webPdExamples is not defined`

Cause:

- `assets/examples.js` failed to load (usually from a 404).

Fix:

- Resolve asset 404s first; this error disappears once `examples.js` is loaded.

### 3) CORS error when frontend is on another port

Symptoms:

- `blocked by CORS policy: No 'Access-Control-Allow-Origin' header`

Cause:

- Frontend origin (for example `:3332`) differs from API origin (`:3000`).

Fix:

- Keep `npm run start` running in `What_Stirs_Within/`.
- Reload the frontend after backend restart.
- Prefer Option A (`http://localhost:3000`) to avoid cross-origin complexity.

### 4) `recognition has already started`

Cause:

- Speech recognition was started again while already active.

Fix:

- Click once and wait for the recognition cycle to complete.
- If it gets stuck, refresh the page and retry.

### 5) `/favicon.ico` 404

This is usually harmless and does not affect functionality.

### 6) `ScriptProcessorNode is deprecated` warning

This is an upstream Web Audio warning from legacy WebPd internals. It is non-blocking.

## Usage flow

1. Open the app in browser.
2. Click/tap the page to start speech recognition.
3. Speak a phrase.
4. The app sends text to `/emotion` and updates:
   - sentiment score,
   - on-screen labels,
   - synthesis/PD controls.

## Notes

- If microphone prompts do not appear, check browser site permissions.
- If you change backend code, restart `npm run start` (or use `start-debug` for auto-reload).
- Keep both servers running if using Option B.
