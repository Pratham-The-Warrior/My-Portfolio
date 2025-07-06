/* i have used resend to get contact form data directly to my email */

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const EMAIL_SENDER = process.env.EMAIL_SENDER;
    const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;

    if (!EMAIL_SENDER || !EMAIL_RECIPIENT) {
      throw new Error("Missing required email environment variables.");
    }

    await resend.emails.send({
      from: EMAIL_SENDER,
      to: EMAIL_RECIPIENT,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
      replyTo: email,
    });

    try {
      const confirmation = await resend.emails.send({
        from: EMAIL_SENDER,
        to: email,
        subject: `Thanks for contacting Pratham – Message Received`,
        html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for reaching out! I've received your message and will get back to you soon.</p>
      <p><strong>Your Message:</strong></p>
      <blockquote>${message}</blockquote>
      <p>Best regards,<br/>Pratham<br/>Computer Engineer & System Architect</p>
    `,
      });

      console.log("Confirmation email result:", confirmation);
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
    }

    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}

/* data from join project */
