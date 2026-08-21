import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "company", "subject", "createdAt"],
    description: "Contact form submissions from the website.",
    group: "Inbox",
  },
  access: {
    // Only admins can read/update/delete leads — nobody can create via admin (form does it)
    create: () => true,
    read: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "company",
      type: "text",
    },
    {
      name: "subject",
      type: "select",
      options: [
        { label: "Web Engineering", value: "web" },
        { label: "Mobile Product Engineering", value: "mobile" },
        { label: "AI & Machine Learning", value: "ai" },
        { label: "E-commerce Solutions", value: "ecommerce" },
        { label: "CRM Solutions", value: "crm" },
        { label: "Digital Marketing", value: "marketing" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: ["new", "contacted", "qualified", "closed"],
      defaultValue: "new",
      admin: {
        description: "CRM pipeline status for this lead.",
      },
    },
    {
      name: "notes",
      type: "textarea",
      admin: {
        description: "Internal notes about this lead.",
      },
    },
  ],
  timestamps: true,
};
