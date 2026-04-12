import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "fiqgant@gmail.com";

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `[fiqlab] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
          <h2 style="margin:0 0 4px;font-size:18px;color:#111">New message from fiqlab</h2>
          <p style="margin:0 0 24px;font-size:13px;color:#888">via the contact form</p>

          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr>
              <td style="padding:10px 12px;background:#f5f5f5;font-weight:600;width:90px;border-radius:4px 0 0 4px">Name</td>
              <td style="padding:10px 12px;background:#fafafa;border-radius:0 4px 4px 0">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px">Email</td>
              <td style="padding:10px 12px;background:#fafafa;border-radius:0 4px 4px 0">
                <a href="mailto:${email}" style="color:#3b82f6">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 12px;background:#f5f5f5;font-weight:600;border-radius:4px 0 0 4px">Subject</td>
              <td style="padding:10px 12px;background:#fafafa;border-radius:0 4px 4px 0">${subject}</td>
            </tr>
          </table>

          <div style="margin-top:20px;padding:16px;background:#fafafa;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap;color:#333">
            ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </div>

          <p style="margin-top:24px;font-size:12px;color:#aaa">
            Sent from <a href="https://fiqlab.vercel.app/contact" style="color:#3b82f6">fiqlab.vercel.app/contact</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
