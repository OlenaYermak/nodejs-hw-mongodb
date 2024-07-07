import Contact from '../db/models/Contacts.js';

import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
  filter,
}) => {
  const skip = (page - 1) * perPage;

  const contactRequest = {};
  if (filter.userId) {
    contactRequest.userId = filter.userId;
  }

  if (filter.contactType) {
    contactRequest.contactType = filter.contactType;
  }
  if (filter.isFavourite !== undefined) {
    contactRequest.isFavourite = filter.isFavourite;
  }

  const data = await Contact.find(contactRequest)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await Contact.find()
    .merge(contactRequest)
    .countDocuments();

  const { totalPages, hasPreviousPage, hasNextPage } = calcPaginationData({
    total: totalItems,
    perPage,
    page,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContact = async (filter) => {
  const contact = await Contact.findOne(filter);
  return contact;
};

export const addContact = (data) => Contact.create(data);

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
    ...options,
  });

  if (!result) {
    return null;
  }

  const isNew = result.lastErrorObject
    ? Boolean(result.lastErrorObject.upserted)
    : false;
  return {
    data: result,
    isNew,
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
