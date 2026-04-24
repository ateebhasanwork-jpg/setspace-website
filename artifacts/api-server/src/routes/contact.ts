import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, project } = req.body as {
    name?: string;
    email?: string;
    project?: string;
  };

  if (!name || !email || !project) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const smtpHost = process.env["SMTP_HOST"];
  const smtpPort = Number(process.env["SMTP_PORT"] ?? "587");
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const toEmail  = process.env["CONTACT_EMAIL"] ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("SMTP env vars not configured — logging submission only");
    console.log("New contact form submission:", { name, email, project });
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
      from: `"Setspace Website" <${smtpUser}>`,
      to: toEmail,
      subject: `New Project Inquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
          <h2 style="color:#a78bfa;margin-top:0;">New Project Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="padding:8px 0;color:#fff;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#a78bfa;">${email}</a></td></tr>
          </table>
          <div style="margin-top:20px;">
            <div style="color:#888;margin-bottom:8px;">Project Details</div>
            <div style="background:#1a1a1a;padding:16px;border-radius:8px;color:#ccc;line-height:1.6;">${project.replace(/\n/g, "<br>")}</div>
          </div>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #333;color:#555;font-size:12px;">
            Sent from setspace.agency contact form
          </div>
        </div>
      `,
      replyTo: email,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
