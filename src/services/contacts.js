import Contact from '../db/models/Contacts.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
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
