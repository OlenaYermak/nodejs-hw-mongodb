import express from 'express';
import { getAllContacts, getContactById } from '../services/contacts.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: '200',
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

router.get('/:contactId', async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.json({
      status: '200',
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data: contact,
    });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

export default router;
