# Backend

Il backend del progetto è composto da più servizi che collaborano tra loro per offrire un’esperienza completa: gestione pagine, login, API meteo, dati FBI Wanted e persistenza MongoDB.

## Servizi presenti

### 1. Service
Servizio principale in Node.js.

Responsabilità:
- serve il frontend statico
- espone le pagine HTML
- gestisce il login demo
- elabora le richieste meteo
- inoltra i dati FBI tramite il gateway

### 2. Gateway
Servizio intermedio che centralizza le richieste.

Responsabilità:
- raccogliere le chiamate del client
- instradare le richieste ai servizi corretti
- mantenere un layer di versioning tramite `/api/v1`
- separare il frontend dai servizi interni

### 3. Auth Service
Servizio dedicato all’autenticazione.

Responsabilità:
- login con Google OAuth
- sessione utente
- controllo dello stato autenticato
- logout e redirect

### 4. Mongo Service
Servizio dedicato alla persistenza dati.

Responsabilità:
- collegarsi a MongoDB
- salvare utenti e ricerche meteo
- esporre endpoint CRUD per la lettura e scrittura dei dati

### 5. FBI Service
Servizio in Python.

Responsabilità:
- interrogare l’API pubblica FBI Wanted
- filtrare i dati della giornata
- esporre un JSON con un record selezionato

## Flusso di esecuzione

1. Il browser contatta il frontend servito dal `service`.
2. Le richieste API passano dal `gateway`.
3. Il `gateway` smista verso il servizio corretto.
4. L’`auth-service` gestisce la sessione Google.
5. Il `mongo-service` salva i dati dell’applicazione.
6. Il `fbi-service` restituisce dati pubblici da mostrare nella parte web.

## Porte principali

- `3000` — main service
- `3001` — auth service
- `3002` — FBI service
- `3003` — mongo service
- `4000` — gateway

## Dati salvati nel database

Il sistema salva oggi:
- utenti con nome, email e origine del login
- ricerche meteo con città, temperatura, umidità, vento e descrizione

Questi dati compaiono anche nella pagina di weather come storico delle ricerche salvate.

## Avvio rapido

```bat
run.bat
```

Il file batch avvia i servizi necessari e li collega agli endpoint locali.

## Obiettivo del progetto

Il backend è pensato come esempio di architettura a microservizi per:
- servire pagine web
- autenticare utenti
- salvare dati in MongoDB
- interrogare API esterne
- mostrare dati pubblici in modo strutturato e modulare.
