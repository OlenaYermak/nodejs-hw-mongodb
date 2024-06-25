import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import env from './utils/env.js';
import contactsRouter from './routes/contacts.js';
import notFoundHandler from './middlwares/notFoundHandler.js';
import errorHandler from './middlwares/errorHandler.js';

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

  app.use(express.json());

  app.get('/api/contacts', async (req, res) => {
    const result = await Contact.find();
    console.log('Contacts found:', result);
    res.json(result);
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(3000, () => console.log(`Server is running on port ${PORT}`));
}
