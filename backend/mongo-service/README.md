# Mongo Service

This service is the persistence layer of the project. It owns the MongoDB connection and exposes CRUD endpoints for the application data.

## Purpose

The main service and the gateway should not directly access MongoDB. Instead, they call this service as an independent backend component.

This keeps the responsibilities separated:
- main service: business logic and page serving
- gateway: request routing and API versioning
- mongo-service: database storage and retrieval

## Collections

### users
Stores authentication-related information.

Fields:
- name
- email
- source
- createdAt

### weatherSearches
Stores weather queries performed by the user.

Fields:
- city
- country
- description
- temperature
- humidity
- wind
- requestedAt

## Endpoints

### Health

```http
GET /health
```

### Users

```http
GET /api/db/users
POST /api/db/users
```

### Weather history

```http
GET /api/db/weather
POST /api/db/weather
```

## Environment

The service reads the following variable:

```env
PORT=3003
MONGODB_URI=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/es_server
```

## Start

```bash
npm install
node src/server.js
```

## Example flow

1. the weather page posts a city to the main service
2. the main service calls the external weather API
3. the weather result is returned to the frontend
4. the same result is also sent to the Mongo service
5. the Mongo service stores it in the `weatherSearches` collection
6. the weather page loads history from the Mongo service and shows the saved results
