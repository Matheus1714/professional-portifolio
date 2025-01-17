import { createTransport } from "nodemailer";

/**
 * Create a application with a google password
 * @link{https://myaccount.google.com/apppasswords}
 *
 * Information about it
 * @link{https://support.google.com/mail/thread/205453566/how-to-generate-an-app-password?hl=en}
 */

const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: import.meta.env.ADMIN_EMAIL,
    pass: import.meta.env.ADMIN_PASSWORD,
  },
});

export { transporter };
