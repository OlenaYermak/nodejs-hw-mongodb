import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import env from './utils/env.js';
import contactsRouter from './routes/contacts.js';
import authRouter from './routes/auth.js';
import notFoundHandler from './middlwares/notFoundHandler.js';
import errorHandler from './middlwares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from '../src/middlwares/swaggerDocs.js';

import Contact from './db/models/Contacts.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);

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

  app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(3000, () => console.log(`Server is running on port ${PORT}`));
}
