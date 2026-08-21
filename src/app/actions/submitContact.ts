"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
  success?: boolean;
  error?: string;
};

const SUBJECT_LABELS: Record<string, string> = {
  web: "Web Engineering",
  mobile: "Mobile Product Engineering",
  ai: "AI & Machine Learning",
  ecommerce: "E-commerce Solutions",
  crm: "CRM Solutions",
  marketing: "Digital Marketing",
  other: "Other",
};

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: "leads",
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || "",
        subject: (parsed.data.subject as "web" | "mobile" | "ai" | "ecommerce" | "crm" | "marketing" | "other") || "other",
        message: parsed.data.message,
        status: "new",
      },
    });

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const subjectLabel = SUBJECT_LABELS[parsed.data.subject || "other"] || "Other";

      await resend.emails.send({
        from: "BairesDev Solutions <noreply@bairesdevsolution.com>",
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New Lead: ${parsed.data.name} — ${subjectLabel}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a1a1a; padding: 32px; border-left: 4px solid #d97706;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 8px;">New Contact Submission</h1>
              <p style="color: #9ca3af; margin: 0;">BairesDev Solutions — ${new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</p>
            </div>
            <div style="background: #111111; padding: 32px; border: 1px solid #27272a;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #9ca3af; width: 140px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff; font-weight: bold;">${parsed.data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a;"><a href="mailto:${parsed.data.email}" style="color: #d97706; text-decoration: none;">${parsed.data.email}</a></td>
                </tr>
                ${parsed.data.company ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Company</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff;">${parsed.data.company}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Service</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #ffffff;">${subjectLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; color: #d1d5db; line-height: 1.6;">${parsed.data.message.replace(/\n/g, "<br>")}</td>
                </tr>
              </table>
            </div>
            <div style="background: #1a1a1a; padding: 20px 32px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_PROD_URL || "https://www.bairesdevsolution.com"}/admin/collections/leads" style="display: inline-block; background: #d97706; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">View in CMS →</a>
            </div>
          </div>
        `,
      });
    }

    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { error: "Something went wrong. Please try again or email us directly." };
  }
}
