# Es_server

Es_server is a small web application built with Node.js and Express. It serves a static website with home, about, sign-in, login, and weather pages. The backend provides page routes, a demonstration login endpoint, and a weather endpoint intended to retrieve and format current conditions for a city.

## Project structure

```text
backend/service/
	src/
		server.js                 Express app setup and startup
		routes/                   Page, authentication, and weather endpoints
		controllers/              Login and weather request logic
		utils/                    Weather API, validation, formatting, and logging helpers
frontend/public/
	*.html                      Website pages
	components/                 Shared navbar and footer markup
	css/                        Page and component styles
	js/                         Browser-side behavior, including weather requests
```

## How it works

- Express serves the files in `frontend/public` and maps page URLs such as `/`, `/about`, `/login`, and `/weather` to their HTML pages.
- The login form posts to `/login`. Authentication is currently a demonstration check using hard-coded credentials (`admin` / `1234`), not production authentication.
- The weather page posts a city to `/weather`; the backend validates the input and is structured to request weather data, normalize it, and return JSON for display in the page.

## Run locally

Install the backend dependencies, then start the server from `backend/service`:

```sh
npm install
node src/server.js
```

Open <http://localhost:3000> in a browser. The weather API integration currently needs configuration/code fixes before weather lookups will work reliably.
