# Persistence Service

Dopo il login nella pagina `index`, il frontend mostra anche il bottone "Data". Quando viene cliccato, il browser richiama `persistance-service`, che risponde con un JSON semplice:

```json
{
  "message": "ciao"
}
```

Il risultato viene mostrato sotto il bottone. In pratica: `index` richiama `persistance-service`, e il service restituisce il file JSON.