import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    contactType: {
      type: String,
      required: false,
      enum: ['personal', 'home', 'other'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Contact = model('Contact', contactsSchema);

export default Contact;
