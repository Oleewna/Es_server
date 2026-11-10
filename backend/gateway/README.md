# Gateway

Il gateway è il punto unico di accesso alle API del sistema. Le chiamate del frontend passano da qui e vengono instradate verso il servizio corretto.

## Scopo

- centralizza le richieste del client
- nasconde la struttura interna dei servizi
- mantiene un’API versionata tramite `/api/v1`
- separa il frontend dai servizi backend
- prepara il routing verso service, auth-service e FBI service

## Routing previsto

- `/api/v1` — richieste verso il service principale
- `/api/v1/auth` — richieste verso l’auth service
- `/api/v1/wanted` — richieste verso il servizio FBI

## File principali

- `config/env.js` — configurazione delle URL dei servizi
- `proxies/` — proxy per i microservizi
- `src/gateway.js` — avvio del server gateway

## Variabili d’ambiente

```env
GATEWAY_PORT=4000
SERVICE_URL=http://localhost:3000
AUTH_SERVICE_URL=http://localhost:3001
FBI_SERVICE_URL=http://localhost:3002
```

## Avvio

```bash
cd backend/gateway
npm install
node src/gateway.js
```

## Nota

Il gateway è strutturato come livello di smistamento delle richieste e come punto di controllo per l’API del progetto. In questa fase è un componente centrale per la separazione dei servizi e per il futuro allineamento delle chiamate client-server.
