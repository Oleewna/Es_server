# Auth Service

Questo servizio gestisce l’autenticazione degli utenti tramite Google OAuth e mantiene la sessione con Passport e Express Session.

## Funzione

- avvia il flusso di login con Google
- salva i dati dell’utente in sessione
- verifica se l’utente è autenticato
- permette il logout
- restituisce lo stato dell’utente al frontend

## Endpoint principali

- `GET /google` — avvio del login Google
- `GET /google/callback` — callback dopo l’autenticazione
- `GET /me` — restituisce lo stato di autenticazione dell’utente
- `GET /logout` — chiude la sessione e reindirizza al frontend

## Tecnologie utilizzate

- Express
- Passport
- express-session
- passport-google-oauth20
- dotenv

## File principali

- `config/passport.js` — configurazione della strategia Google OAuth
- `config/env.js` — lettura delle variabili d’ambiente
- `src/authserver.js` — avvio del server
- `src/routes/authRoutes.js` — definizione delle route di autenticazione

## Variabili d’ambiente

```env
AUTH_PORT=3001
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
```

## Avvio

```bash
cd backend/auth-service
npm install
node src/authserver.js
```

## Nota

Per far funzionare correttamente il login con Google è necessario configurare le credenziali OAuth di Google e assicurarsi che `callbackURL` sia coerente con il dominio e la porta usati dal progetto.
