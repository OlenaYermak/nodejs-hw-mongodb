import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

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

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactsController),
);

router.patch(
  '/:contactId',
  validateBody(contactUdateSchema),
  ctrlWrapper(patchContactsController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
