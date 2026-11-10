Auth Service

Questo servizio si occupa dell’identità dell’utente e dell’autenticazione.

Ruoli principali:
- Login con Google
- Gestione della sessione
- Verifica dello stato autenticato
- Logout dell’utente
- Redirect verso il frontend dopo il login

Flusso base:
Browser
  ↓
Gateway (:4000)
  ↓
Auth Service (:3001)
  ↓
Google
  ↓
Auth Service
  ↓
Frontend / servizio principale

Obiettivo:
1. autenticare l’utente
2. controllare se è loggato
3. creare e gestire la sessione
4. mantenere la parte UI separata dal backend di autenticazione
