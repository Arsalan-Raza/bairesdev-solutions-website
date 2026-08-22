import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const maxDuration = 60;

const IMAGE_PROMPTS: Record<string, string> = {
  zoho: "CRM dashboard with sales pipeline charts and workflow automation interface on a modern desktop monitor. Clean blue and white color scheme, professional office environment. No text, no people, no faces. Photorealistic digital render.",
  shopify: "Modern e-commerce product page on a laptop screen with clean minimalist storefront design and shopping cart UI. Neutral background, professional lighting. No text, no people, no faces. Photorealistic digital render.",
  ghl: "Digital marketing funnel visualization with lead capture form and automation workflow diagram on a dark SaaS dashboard. Purple accent colors. No text, no people, no faces. Photorealistic digital render.",
  wordpress: "Website development workspace with code editor and CMS admin interface on dual monitors. Clean modern desk setup, neutral tones. No text, no people, no faces. Photorealistic digital render.",
  ai: "Abstract artificial intelligence concept with glowing neural network connections and data streams on a deep blue and cyan gradient background. No text, no people, no faces. Photorealistic digital render.",
  uiux: "UI/UX design mockup displayed on tablet and smartphone side by side showing clean wireframe components. Minimal white background. No text, no people, no faces. Photorealistic digital render.",
  web: "Responsive web application displayed on desktop, tablet, and mobile simultaneously. Clean interface, soft shadow, white background. No text, no people, no faces. Photorealistic digital render.",
  ecommerce: "Online shopping cart and checkout interface on a clean e-commerce website with product grid in the background. Soft neutral tones. No text, no people, no faces. Photorealistic digital render.",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function generateAndUpload(
  payload: Awaited<ReturnType<typeof getPayload>>,
  apiKey: string,
  title: string,
  categorySlug: string
): Promise<string | null> {
  try {
    const basePrompt = IMAGE_PROMPTS[categorySlug] || IMAGE_PROMPTS["web"];
    const prompt = `Professional blog header image for the topic "${title}". ${basePrompt}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: "16:9",
            safetySetting: "block_only_high",
            personGeneration: "dont_allow",
          },
        }),
      }
    );

    if (!res.ok) {
      console.error("Imagen error for", title, await res.text());
      return null;
    }

    const data = await res.json();
    const base64 = data?.predictions?.[0]?.bytesBase64Encoded;
    if (!base64) return null;

    const imageBuffer = Buffer.from(base64, "base64");
    const slug = slugify(title);

    const media = await payload.create({
      collection: "media",
      data: { alt: `Cover image for: ${title}` },
      file: {
        data: imageBuffer,
        mimetype: "image/png",
        name: `${slug}-cover.png`,
        size: imageBuffer.length,
      },
    });

    return media.id as string;
  } catch (err) {
    console.error("generateAndUpload failed:", err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  try {
    const payload = await getPayload({ config });

    // Find all published posts with no coverImage
    const result = await payload.find({
      collection: "posts",
      where: {
        and: [
          { status: { equals: "published" } },
          { coverImage: { exists: false } },
        ],
      },
      depth: 1,
      limit: 10,
    });

    const updated: { id: string | number; title: string; imageGenerated: boolean }[] = [];

    for (const post of result.docs) {
      const categorySlug =
        typeof post.category === "object" && post.category?.slug
          ? post.category.slug
          : "web";

      const mediaId = await generateAndUpload(
        payload,
        process.env.GEMINI_API_KEY!,
        post.title,
        categorySlug
      );

      if (mediaId) {
        await payload.update({
          collection: "posts",
          id: post.id,
          data: { coverImage: mediaId },
        });
      }

      updated.push({ id: post.id, title: post.title, imageGenerated: !!mediaId });
    }

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("Backfill error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
