# ES Server

This project is a microservice-style web app built to serve a static frontend, handle authentication, expose weather and FBI data, and persist app data in a dedicated MongoDB service.

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
│   ├── mongo-service/
│   │   ├── src/
│   │   ├── package.json
│   │   └── .env
│   └── fbi-service/
│       ├── server.py
│       ├── utils/
│       └── requirements.txt
└── .gitignore
```

## Services and responsibilities

### 1) Main service (`backend/service`)
This Node.js app serves the frontend and exposes the main page routes.

Responsibilities:
- serve the static HTML and JS assets
- expose routes such as `/`, `/about`, `/weather`, `/signin`
- handle the demo login request
- call the weather API and return normalized results
- forward the FBI request through the gateway

### 2) Gateway (`backend/gateway`)
This acts as the single entry point for the frontend.

Responsibilities:
- centralize all HTTP access
- route requests to the correct upstream service
- keep the API versioned under `/api/v1`
- expose the MongoDB service under `/api/v1/db`

### 3) Auth service (`backend/auth-service`)
This service handles Google OAuth and session-based auth.

### 4) Mongo service (`backend/mongo-service`)
This is the dedicated database layer in charge of persisting application data in MongoDB.

Stored data includes:
- users
- weather search history

Routes exposed by this service:
- `GET /api/db/users`
- `POST /api/db/users`
- `GET /api/db/weather`
- `POST /api/db/weather`

### 5) FBI Wanted service (`backend/fbi-service`)
This Python service fetches public data from the FBI API and returns one featured wanted item.

## What is saved in the website

The app now saves meaningful data from the actual website flow:

- login attempts and local users are stored in the `users` collection
- every weather search is saved in the `weatherSearches` collection
- the weather page shows the latest saved searches so the user can see what was persisted

This makes the project work like a real CRUD-based application instead of only a demo front-end.

## Quick start

Run the Windows startup script:

```bat
run.bat
```

The script starts:
- Mongo service on port `3003`
- auth service on port `3001`
- main service on port `3000`
- FBI service on port `3002`
- gateway on port `4000`

## Manual startup

### 1) Install dependencies

```bat
install_module.bat
```

Or manually:

```bash
cd backend/mongo-service
npm install

cd ../gateway
npm install

cd ../auth-service
npm install

cd ../service
npm install
```

Python dependencies for the FBI service:

```bash
cd backend/fbi-service
python -m pip install -r requirements.txt
```

### 2) Configure `.env`

#### `backend/mongo-service/.env`

```env
PORT=3003
MONGODB_URI=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/es_server
```

#### `backend/service/.env`

```env
PORT=3000
WEATHER_API_KEY=your_weather_api_key
```

#### `backend/gateway/.env`

```env
GATEWAY_PORT=4000
SERVICE_URL=http://localhost:3000
AUTH_SERVICE_URL=http://localhost:3001
FBI_SERVICE_URL=http://localhost:3002
DATABASE_SERVICE_URL=http://localhost:3003
```

#### `backend/auth-service/.env`

```env
AUTH_PORT=3001
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
```

### 3) Start the services

```bash
cd backend/mongo-service
node src/server.js

cd ../service
node src/server.js

cd ../gateway
node src/gateway.js

cd ../auth-service
node src/authserver.js

cd ../fbi-service
python server.py
```

## Local URLs

- Frontend: http://localhost:3000
- Gateway: http://localhost:4000/api/v1/
- Mongo DB service: http://localhost:3003
- Auth service: http://localhost:3001
- FBI service: http://localhost:3002
- Weather saved history: http://localhost:3003/api/db/weather

## Notes

- The Mongo service is intentionally separate from the main app service to follow the same architecture as the other microservices.
- The weather page loads and shows the latest saved weather searches from MongoDB.
- The login flow saves a user record in MongoDB when the demo credentials are valid.
- This project is a learning/demo implementation and not a production deployment setup.

## Demo credentials

- username: `admin`
- password: `1234`
