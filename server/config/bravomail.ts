// mailer.js
import * as Brevo from '@getbrevo/brevo';

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

export const sendEmail = async ({ to, subject, html }) => {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { name: 'ByteBurst', email: process.env.MAIL_USER };
  sendSmtpEmail.to = [{ email: to }];

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Mail sent:', result);
    return result;
  } catch (err) {
    console.error('Mail error:', err);
    throw err;
  }
};