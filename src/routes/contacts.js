import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { authenticate } from '../middlwares/authenticate.js';

import {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  patchContactsController,
  deleteContactController,
} from '../controllers/contacts.js';

import {
  contactAddSchema,
  contactUdateSchema,
} from '../validation/contacts.js';
import { upload } from '../middlwares/multer.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactsController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(contactUdateSchema),
  ctrlWrapper(patchContactsController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
