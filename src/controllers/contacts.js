import {
  getAllContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactFilterParams from '../utils/parseContactFilterParams.js';

import { contactFieldList } from '../constants/contactsConstants.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, contactFieldList);
  const filter = { ...parseContactFilterParams(req.query), userId };

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  if (
    !mongoose.Types.ObjectId.isValid(contactId) ||
    !(await getContact(contactId))
  ) {
    throw createHttpError(
      404,
      res.status(404).json({
        status: 404,
        message: `Contact with ID ${contactId} not found`,
        data: { message: 'Contact not found' },
      }),
    );
  }

  const contact = await getContact({ contactId, userId });

  res.json({
    status: 200,
    data: contact,
    message: `Contact with id=${contactId} find success`,
  });
};

export const addContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(
      404,
      res.status(404).json({
        status: 404,
        message: `Contact with ID ${contactId} not found`,
        data: { message: 'Contact not found' },
      }),
    );
  }

  const result = await updateContact(contactId, userId, req.body);

  if (!result) {
    throw createHttpError(
      404,
      res.status(404).json({
        status: 404,
        message: `Contact with ID ${contactId} not found`,
        data: { message: 'Contact not found' },
      }),
    );
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.data,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(contactId, userId)) {
    throw createHttpError(
      404,
      res.status(404).json({
        status: 404,
        message: `Contact with ID ${contactId} not found`,
        data: { message: 'Contact not found' },
      }),
    );
  }

  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError(
      404,
      res.status(404).json({
        status: 404,
        message: `Contact with ID ${contactId} not found`,
        data: { message: 'Contact not found' },
      }),
    );
  }

  res.status(204).send();
};
