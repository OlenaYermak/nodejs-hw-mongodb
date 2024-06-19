import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import env from './utils/env.js';
import contactsRouter from './routes/contacts.js';

import Contact from './db/models/Contacts.js';

dotenv.config();

export function setupServer() {
  const app = express();
  const PORT = env('PORT', '3000');

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/api/contacts', async (req, res) => {
    const result = await Contact.find();
    console.log('Contacts found:', result);
    res.json(result);
  });

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(3000, () => console.log(`Server is running on port ${PORT}`));
}
