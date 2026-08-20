"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { z } from "zod";

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

    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { error: "Something went wrong. Please try again or email us directly." };
  }
}
