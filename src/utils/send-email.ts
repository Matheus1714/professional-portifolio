import { transporter } from "@/libs/nodemailer";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendEmail(
  mailOptions: MailOptions,
) {
  try{
    await transporter.sendMail({...mailOptions});
  }catch(error) {
    console.error(error);
  }
}
