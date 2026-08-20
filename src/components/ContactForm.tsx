"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "@/app/actions/submitContact";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="bg-muted/30 p-12 lg:p-16 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="h-1 w-16 bg-primary mb-8" />
        <h3 className="font-display text-2xl font-bold text-foreground">Message Received.</h3>
        <p className="mt-4 text-muted-foreground">
          Thank you for reaching out. One of our engineers will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 p-12 lg:p-16">
      <form action={action} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              autoComplete="name"
              className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Company
          </label>
          <input
            id="company"
            type="text"
            name="company"
            autoComplete="organization"
            className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors"
            placeholder="Acme Corp"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Service Interest
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="">Select a service…</option>
            <option value="web">Web Engineering</option>
            <option value="mobile">Mobile Product Engineering</option>
            <option value="ai">AI & Machine Learning</option>
            <option value="ecommerce">E-commerce Solutions</option>
            <option value="crm">CRM Solutions</option>
            <option value="marketing">Digital Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full border-b border-border bg-transparent py-4 outline-none focus:border-primary transition-colors resize-none"
            placeholder="Tell us about your project challenges…"
          />
        </div>

        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-primary py-6 text-sm font-bold tracking-[0.3em] text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "SENDING…" : "SEND MESSAGE"}
        </button>
      </form>
    </div>
  );
}
