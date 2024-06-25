import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  patchContactsController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/', ctrlWrapper(addContactsController));

router.patch('/:contactId', ctrlWrapper(patchContactsController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
