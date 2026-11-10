# ES Server

This project is a small full-stack application that combines a static frontend, a Node.js backend, a gateway, a Google OAuth auth service, and a Python-based FBI Wanted service. It is designed as a lightweight microservice prototype for serving pages, handling weather lookups, and exposing a public-facing wanted API.

## Project structure

```text
Es_server/
├── README.md
├── run.bat
├── install_module.bat
├── frontend/
│   └── public/
│       ├── about.html
│       ├── fbi.html
│       ├── index.html
│       ├── weather.html
│       ├── components/
│       ├── css/
│       └── js/
├── backend/
│   ├── service/
│   │   ├── config/
│   │   ├── src/
│   │   ├── package.json
│   │   └── .env
│   ├── gateway/
│   │   ├── config/
│   │   ├── proxies/
│   │   ├── src/
│   │   ├── package.json
│   │   └── .env
│   ├── auth-service/
│   │   ├── config/
│   │   ├── src/
│   │   ├── package.json
│   │   └── .env
│   └── fbi-service/
│       ├── server.py
│       ├── utils/
│       └── requirements.txt (if added locally)
└── .gitignore
```

## Services and responsibilities

### 1) Main service (`backend/service`)
This Node.js app serves the frontend static assets and exposes the main application routes.

Important endpoints:
- `GET /` — home page
- `GET /about` — about page
- `GET /weather` — weather page
- `POST /weather` — weather lookup route
- `GET /api/v1/wanted/today` — forwards to the FBI service

The service also validates city input before calling an external weather API, normalizes the result, and returns JSON for the frontend UI.

### 2) Gateway (`backend/gateway`)
The gateway exposes a versioned API surface and routes requests to the correct upstream service.

Typical routes:
- `http://localhost:4000/api/v1/...`
- proxied to the main service by default
- `http://localhost:4000/api/v1/auth/...` for auth-related routes
- `http://localhost:4000/api/v1/wanted/...` for wanted data

### 3) Auth service (`backend/auth-service`)
This Express app provides Google OAuth login flow and session handling.

Typical endpoints:
- `GET /google` — starts Google login
- `GET /google/callback` — callback after login
- `GET /me` — returns current auth state
- `GET /logout` — destroys session and redirects

The service is intended to be used with Google credentials in the environment configuration.

### 4) FBI Wanted service (`backend/fbi-service`)
This Python service pulls public FBI wanted data from the FBI API and exposes a simplified endpoint for the frontend.

Endpoint:
- `http://localhost:3002/api/wanted/today`

The main service forwards that request via `GET /api/v1/wanted/today`.

## Quick start

The easiest way to start the app on Windows is the provided script:

```bat
run.bat
```

This script does the following:
- stops any existing listeners on ports 3000, 3001, 3002, and 4000
- installs dependencies and starts:
  - auth service on port 3001
  - main service on port 3000
  - FBI wanted service on port 3002
  - gateway on port 4000

## Manual startup

### 1) Install dependencies

```bash
cd backend/service
npm install

cd ../gateway
npm install

cd ../auth-service
npm install
```

For the Python service:

```bash
cd ../fbi-service
python -m pip install -r requirements.txt
```

If a requirements file is not present, install the needed Python packages manually for the service.

### 2) Configure environment variables

Create `.env` files in the three Node.js folders as needed.

#### `backend/service/.env`

```env
PORT=3000
WEATHER_API_KEY=your_weather_api_key_here
```

#### `backend/gateway/.env`

```env
GATEWAY_PORT=4000
SERVICE_URL=http://localhost:3000
AUTH_SERVICE_URL=http://localhost:3001
FBI_SERVICE_URL=http://localhost:3002
```

#### `backend/auth-service/.env`

```env
AUTH_PORT=3001
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
```

#### `backend/fbi-service/.env` (optional)

```env
WANTED_PORT=3002
```

### 3) Start the services

#### Main service

```bash
cd backend/service
node src/server.js
```

#### Gateway

```bash
cd backend/gateway
node src/gateway.js
```

#### Auth service

```bash
cd backend/auth-service
node src/authserver.js
```

#### FBI service

```bash
cd backend/fbi-service
python server.py
```

## Local URLs

After startup, the app is available at:

- Frontend: http://localhost:3000
- Gateway: http://localhost:4000/api/v1/
- Auth service: http://localhost:3001
- FBI wanted service: http://localhost:3002
- FBI wanted JSON endpoint: http://localhost:3002/api/wanted/today

## Notes

- The frontend static assets live under `frontend/public` and are served by the main backend service.
- The weather flow is a prototype and depends on a valid external weather API key.
- The authentication flow is a Google OAuth prototype and requires valid Google credentials in the auth service environment.
- The FBI wanted service is separate from the main backend and returns a daily featured wanted person.
- This repository is intended as a learning/demo project and is not a production-ready deployment setup.

## Demo credentials

The main login route in the service is a simple demo check and accepts:
- username: `admin`
- password: `1234`

These values are for local testing only.
