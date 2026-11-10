# Service

Il service principale è l’applicazione Express che serve il frontend statico, gestisce le pagine web e coordina le chiamate alle API esterne.

## Scopo

- serve i file HTML, CSS e JavaScript presenti in `frontend/public`
- espone le pagine principali dell’applicazione
- gestisce il login demo e la validazione dei dati dell’utente
- valida il nome della città prima di interrogare il servizio meteo
- inoltra la richiesta relativa ai dati FBI tramite il gateway

## Endpoint principali

- `GET /` — home page
- `GET /about` — pagina informativa
- `GET /weather` — pagina meteo
- `GET /fbi` — pagina FBI Wanted
- `POST /login` — login demo
- `POST /weather` — richiesta meteo
- `GET /api/v1/wanted/today` — inoltro verso il servizio FBI

## Struttura

- `config/` — configurazione delle variabili d’ambiente e helper di path
- `src/server.js` — avvio del server Express
- `src/routes/` — definizione delle route HTTP
- `src/controllers/` — logica di business
- `src/utils/` — utility per validazione, normalizzazione e chiamate esterne

## Variabili d’ambiente

Nel file `.env` del servizio vanno inserite almeno:

```env
PORT=3000
WEATHER_API_KEY=la_tua_chiave_openweather
```

## Avvio

```bash
cd backend/service
npm install
node src/server.js
```

## Note

Questo servizio è il cuore dell’applicazione: serve il sito, espone le route principali e gestisce le chiamate ai servizi esterni in modo centralizzato.
