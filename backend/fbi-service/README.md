# FBI Service

Questo microservizio in Python recupera i dati pubblici della API FBI Wanted e li trasforma in un JSON pronto per essere usato dal frontend.

## Funzione

- chiama l’API esterna FBI Wanted
- filtra i record ancora attivi e non catturati
- seleziona un soggetto in modo deterministico in base alla data
- espone un endpoint locale per il resto dell’applicazione

## Endpoint

- `GET /api/wanted/today` — restituisce un record del giorno in formato JSON

## Come viene usato

Il service principale e il gateway si appoggiano a questo servizio per mostrare i dati senza esporre direttamente l’API esterna al client.

## File principali

- `server.py` — punto di ingresso del servizio
- `utils/converter.py` — conversione dei dati in formato adatto alla risposta web

## Avvio

```bash
cd backend/fbi-service
python server.py
```

## Variabili d’ambiente

```env
WANTED_PORT=3002
```

## Nota

Il servizio usa una richiesta HTTP verso l’API FBI con timeout e filtri di controllo per evitare errori e risposte vuote.
