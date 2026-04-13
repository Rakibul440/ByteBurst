import axios from 'axios';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: MailOptions) => {
  try {
    const result = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'ByteBurst', email: process.env.MAIL_USER },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY!,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Mail sent:', result.data);
    return result.data;
  } catch (err) {
    console.error('Mail error:', err);
    throw err;
  }
};