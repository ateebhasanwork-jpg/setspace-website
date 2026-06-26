import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/blueprint", async (req, res) => {
  const { email } = req.body as { email?: string };

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const smtpHost = process.env["SMTP_HOST"];
  const smtpPort = Number(process.env["SMTP_PORT"] ?? "587");
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const toEmail  = process.env["CONTACT_EMAIL"] ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("Blueprint request (SMTP not configured):", email);
    return res.json({ ok: true, note: "logged" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"SetSpace" <${smtpUser}>`,
      to: toEmail,
      subject: `New Framework Request — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;">
          <h2 style="color:#E84B1A;margin-top:0;">New Framework Download Request</h2>
          <p style="color:#888;">Someone requested the Scroll to Client Framework:</p>
          <p><a href="mailto:${email}" style="color:#E84B1A;">${email}</a></p>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #333;color:#555;font-size:12px;">
            Sent from setspace.agency blueprint form
          </div>
        </div>
      `,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Blueprint email error:", err);
    return res.status(500).json({ error: "Failed to send" });
  }
});

export default router;
