import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  admin: {
    useAsTitle: "filename",
    group: "Library",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
      required: true,
      admin: {
        description: "Describe this image for screen readers and SEO.",
      },
    },
  ],
};
