Gateway

Schema generale di funzionamento:
CLIENT -> GATEWAY -> SERVIZIO CORRETTO -> API ESTERNA

Compiti del gateway:
- routing delle richieste
- centralizzazione delle API
- separazione tra frontend e servizi interni
- versioning delle endpoint tramite /api/v1
- logging e controllo del traffico
- smistamento delle chiamate verso service, auth-service e FBI service

Lo scopo della struttura è mantenere chiari i ruoli:
- frontend: interfaccia utente
- gateway: punto di accesso
- servizi: logica applicativa e integrazione esterna

In questa fase il gateway fa da layer di accesso e perimetro per le chiamate del sistema.