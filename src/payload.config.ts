import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./payload/collections/Users";
import { Authors } from "./payload/collections/Authors";
import { Categories } from "./payload/collections/Categories";
import { Posts } from "./payload/collections/Posts";
import { Media } from "./payload/collections/Media";
import { Leads } from "./payload/collections/Leads";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— BairesDev Solutions CMS",
    },
  },

  collections: [Users, Authors, Categories, Posts, Media, Leads],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  secret: process.env.PAYLOAD_SECRET || "change-this-secret-in-production",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  // Enable Next.js cache revalidation when content changes
  onInit: async (payload) => {
    payload.logger.info("Payload CMS initialised");
  },
});
