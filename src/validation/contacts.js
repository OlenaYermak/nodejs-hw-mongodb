import Joi from 'joi';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phonenumber should be a string',
    'string.min': 'Phonenumber should have at least 3 characters',
    'string.max': 'Phonenumber should have at most 20 characters',
    'any.required': 'Phonenumber is required',
  }),
  email: Joi.string().min(3).max(20).email().message({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least 3 characters',
    'string.max': 'Email should have at most 20 characters',
  }),
  isFavorite: Joi.boolean().messages({
    'boolean.base': 'Is Favorite should be a boolean value.',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a string',
    'any.only':
      'Contact type must be one of the following values: work, home, personal.',
  }),
});

export const contactUdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phonenumber should be a string',
    'string.min': 'Phonenumber should have at least 3 characters',
    'string.max': 'Phonenumber should have at most 20 characters',
  }),
  email: Joi.string().min(3).max(20).email().message({
    'string.base': 'Email should be a string',
    'string.min': 'Email should have at least 3 characters',
    'string.max': 'Email should have at most 20 characters',
  }),
  isFavorite: Joi.boolean().messages({
    'boolean.base': 'Is Favorite should be a boolean value.',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a string',
    'any.only':
      'Contact type must be one of the following values: work, home, personal.',
  }),
});
