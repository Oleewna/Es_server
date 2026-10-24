identity service. Ruoli:

Login Google
Logout
JWT
Token Validation
Identity.

Dal punto di vista pratico deve fare questo:
1. Autenticare
2. Dire se un utente è autenticato
3. Generare un token/sessione


struttura:
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
Gateway
   ↓
Service (:3000)
   ↓
Pagine Web
