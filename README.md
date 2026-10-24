# Es_server

Es_server is a small full-stack application built with Node.js and Express. It combines a static frontend, a main backend service, an API gateway, and a dedicated authentication service. The project is currently a demo architecture for routing pages, handling simple login logic, and fetching weather data from an external API.

## Architecture

```text
backend/
  service/
    config/
      env.js              Validates required environment variables
      path.js             Shared helper for frontend/static file paths
    src/
      server.js           Starts the Express app and serves static frontend files
      routes/
        pageroutes.js     GET pages: /, /login, /about, /signin, /weather
        auth.js            POST /login
        weather.js         POST /weather
      controllers/
        authController.js
        weatherController.js
      utils/
        apiClient.js
        validateCity.js
        normalizeWeather.js
        logger.js

  gateway/
    config/
      env.js              Gateway and upstream service configuration
    src/
      gateway.js         Reverse proxy for /api/v1

  auth-service/
    config/
      env.js              Placeholder auth service config file
    src/
      authserver.js       Starts the auth service
      routes/
        authRoutes.js     GET /login, /validate, /logout
      services/
        googleAuthService.js

frontend/
  public/
    index.html
    login.html
    signin.html
    weather.html
    about.html
    components/
    css/
    js/
      weather.js         Calls the gateway weather endpoint
```

## Current features

- Express server serves the static web pages from `frontend/public`.
- Page routes are exposed from the main service at:
  - `/`
  - `/login`
  - `/about`
  - `/signin`
  - `/weather`
- The weather feature validates the city name and calls an external weather API.
- The response is normalized and returned as JSON to the frontend.
- The API gateway exposes proxied routes under `/api/v1`.
- The auth service is separated from the main app and currently exposes demo authentication endpoints.
- The demo login check in the main service accepts:
  - username: `admin`
  - password: `1234`

## Route overview

### Main service

- `POST /login` — demo login endpoint
- `POST /weather` — returns weather data for a city
- `GET /` and other page routes — serve the frontend pages

### Gateway

- `GET/POST /api/v1/*` — proxied to the main service
- `GET/POST /api/v1/auth/*` — proxied to the auth service

### Auth service

- `GET /login` — placeholder login page/route
- `GET /validate` — returns `{ authenticated: false }`
- `GET /logout` — placeholder logout route

## Environment setup

Create `.env` files in the relevant folders if you want to override defaults.

### `backend/service/.env`

```env
PORT=3000
WEATHER_API_KEY=your_weather_api_key_here
```

### `backend/gateway/.env`

```env
GATEWAY_PORT=4000
SERVICE_URL=http://localhost:3000
AUTH_SERVICE_URL=http://localhost:3001
```

### `backend/auth-service/.env`

This folder is prepared for auth-specific variables, although the current service does not yet require a strict env validation file.

## Local run instructions

1. Install the main service dependencies:

```sh
cd backend/service
npm install
```

2. Create the service `.env` file with your `PORT` and `WEATHER_API_KEY`.

3. Start the main service:

```sh
node src/server.js
```

4. Install the gateway dependencies:

```sh
cd ../gateway
npm install
```

5. Start the gateway:

```sh
node src/gateway.js
```

6. Install the auth service dependencies:

```sh
cd ../auth-service
npm install
```

7. Start the auth service:

```sh
node src/authserver.js
```

8. Open the app in the browser:

- Main service UI: http://localhost:3000
- Gateway API: http://localhost:4000/api/v1/weather
- Auth service: http://localhost:3001

## Notes

- The weather form in the frontend currently submits to `/api/v1/weather` through the gateway.
- The auth flow is still in progress and is currently a demo implementation rather than a fully integrated OAuth or session-based system.
- The project is structured as a lightweight microservice-style application and is useful as a learning or prototype setup.
