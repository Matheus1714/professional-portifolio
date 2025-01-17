import nodemailer from "nodemailer";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export function sendEmail(
  mailOptions: MailOptions,
) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  });

  transporter.sendMail(mailOptions);
}


