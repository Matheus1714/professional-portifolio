import type { APIContext } from "astro";
import { createTransport } from "nodemailer";
import { basic } from "@/config/cv.json";

// export const prerender = false;

export async function POST(context: APIContext) {
  const { request } = context;

  if (request.headers.get('Content-Type')?.includes('application/json')) {
    const body = await request.json();

    const transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: import.meta.env.PUBLIC_ADMIN_EMAIL,
        pass: import.meta.env.PUBLIC_ADMIN_PASSWORD,
      },
    });

    await transporter.sendMail({
      ...body,
      to: basic.email,
      cc: body.from,
    });
  
    return new Response(JSON.stringify(body), {
      status: 200,
    });
  }

  return new Response(null, { status: 400 });
}
