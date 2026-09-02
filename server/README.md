# UFLY mock database

A small local mock database and API for the UFLY travel-site frontend. The data is stored in `data/ufly-db.json`, which starts with fake destinations and flights.

## Start it

1. Install Node.js 18 or newer.
2. In this folder, run `npm install`.
3. Run `npm run mock`.

The API will be available at `http://localhost:3000`.

## Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Confirm the API is running |
| GET | `/api/destinations` | List the featured destinations |
| GET | `/api/destinations/paris` | Get one destination |
| GET | `/api/flights` | List sample flights |
| GET | `/api/flights?from=Bucharest&to=Paris` | Search flights |
| GET | `/api/users` | List sample users |
| GET | `/api/users/USR-001` | Get one user |
| GET | `/api/bookings` | List locally saved mock bookings |
| POST | `/api/bookings` | Create and save a mock booking request |

Example booking request body:

```json
{
  "flightId": "UF101",
  "userId": "USR-001"
}
```

Booking requests are fake but saved to the local JSON database for testing. Reset them by changing the `bookings` list in `data/ufly-db.json` back to `[]`.
