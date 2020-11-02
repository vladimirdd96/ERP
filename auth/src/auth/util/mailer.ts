const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
import * as dotenv from 'dotenv';
dotenv.config();

export const trasporter = nodemailer.createTransport(
  mailgunTransport({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  }),
);
