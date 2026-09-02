import express from 'express';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const port = process.env.PORT || 3000;
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const databasePath = join(currentDirectory, 'data', 'ufly-db.json');
const readDatabase = () => JSON.parse(readFileSync(databasePath, 'utf8'));
const saveDatabase = (database) => writeFileSync(databasePath, `${JSON.stringify(database, null, 2)}\n`);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'data/ufly-db.json' }));

app.get('/api/destinations', (req, res) => res.json(readDatabase().destinations));

app.get('/api/destinations/:id', (req, res) => {
  const destination = readDatabase().destinations.find((item) => item.id === req.params.id.toLowerCase());
  if (!destination) return res.status(404).json({ error: 'Destination not found' });
  res.json(destination);
});

app.get('/api/flights', (req, res) => {
  const from = req.query.from?.trim().toLowerCase();
  const to = req.query.to?.trim().toLowerCase();
  const flights = readDatabase().flights.filter(
    (flight) => (!from || flight.from.toLowerCase() === from) && (!to || flight.to.toLowerCase() === to)
  );
  res.json(flights);
});

app.get('/api/users', (req, res) => res.json(readDatabase().users));

app.get('/api/users/:id', (req, res) => {
  const user = readDatabase().users.find((item) => item.id === req.params.id.toUpperCase());
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.get('/api/bookings', (req, res) => res.json(readDatabase().bookings));

app.post('/api/bookings', (req, res) => {
  const { flightId, userId } = req.body;
  if (!flightId || !userId) {
    return res.status(400).json({ error: 'flightId and userId are required' });
  }

  const database = readDatabase();
  if (!database.flights.some((flight) => flight.id === flightId)) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  if (!database.users.some((user) => user.id === userId)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const booking = { id: `BK-${Date.now()}`, userId, flightId, createdAt: new Date().toISOString() };
  database.bookings.push(booking);
  saveDatabase(database);
  res.status(201).json(booking);
});

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.listen(port, () => console.log(`UFLY mock database API running at http://localhost:${port}`));
