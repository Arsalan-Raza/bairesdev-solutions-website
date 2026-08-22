import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPayload } from "payload";
import config from "@payload-config";
import { markdownToLexical } from "@/lib/markdownToLexical";

export const maxDuration = 60;

// ─── Topics (30-day rotation) ─────────────────────────────────────────────────
const TOPICS = [
  // Zoho
  "how Zoho CRM transforms sales pipeline visibility for growing businesses",
  "Zoho One vs individual Zoho apps — which setup is right for your business",
  "building AI call agents inside Zoho CRM to automate lead follow-up",
  "Zoho CRM automation workflows that save your sales team 10 hours a week",
  "migrating from Salesforce to Zoho CRM — what to expect and how to do it right",
  "Zoho Desk and CRM integration: giving support teams a full customer view",
  // Shopify
  "how to build a Shopify B2B store that wholesale buyers actually want to use",
  "Shopify Plus vs standard Shopify — when the upgrade is worth it",
  "Shopify theme customisation without breaking the upgrade path",
  "building a Shopify app from scratch — what most tutorials skip",
  "Shopify B2B wholesale: setting up tiered pricing and net payment terms",
  "common Shopify conversion killers and how to fix them before they cost you sales",
  "headless Shopify — the real trade-offs before you commit to the architecture",
  // GoHighLevel
  "GoHighLevel vs HubSpot for service businesses — an honest comparison",
  "building a lead capture funnel in GoHighLevel that actually converts",
  "GoHighLevel AI voice agents: automating appointment booking end to end",
  "GHL workflows for follow-up sequences that close without being spammy",
  "how to build a GoHighLevel website that ranks and converts",
  // WordPress
  "WordPress performance in 2026 — what still matters and what is noise",
  "building a WordPress membership site that scales past 10,000 users",
  "WooCommerce vs Shopify — choosing the right platform for your store",
  "WordPress security fundamentals every site owner should implement today",
  "custom WordPress theme development: when to build vs buy a premium theme",
  // UI/UX
  "the UI mistakes that kill conversion on landing pages — and how to fix them",
  "designing mobile-first interfaces that do not sacrifice desktop quality",
  "how to build a design system that developers will actually use",
  "UX research on a budget: five methods that give real answers fast",
  // AI & Automation
  "practical AI automation for small businesses — where to start and what to skip",
  "how to use AI to write better product descriptions for your Shopify store",
  "integrating AI chatbots with your CRM for 24/7 lead qualification",
];

// ─── Category mapping ─────────────────────────────────────────────────────────
const CATEGORY_MAP: Record<string, string> = {
  zoho: "Zoho & CRM",
  shopify: "Shopify & Commerce",
  ghl: "GoHighLevel",
  wordpress: "WordPress",
  ai: "Applied AI",
  uiux: "UI/UX Design",
  web: "Web Engineering",
  ecommerce: "E-Commerce",
};

// ─── Image prompts per category ───────────────────────────────────────────────
const IMAGE_PROMPTS: Record<string, string> = {
  zoho: "CRM dashboard with sales pipeline charts and workflow automation interface on a modern desktop monitor. Clean blue and white color scheme, professional office environment. No text, no people, no faces. Photorealistic digital render.",
  shopify: "Modern e-commerce product page on a laptop screen with clean minimalist storefront design and shopping cart UI. Neutral background, professional lighting. No text, no people, no faces. Photorealistic digital render.",
  ghl: "Digital marketing funnel visualization with lead capture form and automation workflow diagram on a dark SaaS dashboard. Purple accent colors. No text, no people, no faces. Photorealistic digital render.",
  wordpress: "Website development workspace with code editor and CMS admin interface on dual monitors. Clean modern desk setup, neutral tones. No text, no people, no faces. Photorealistic digital render.",
  ai: "Abstract artificial intelligence concept with glowing neural network connections and data streams on a deep blue and cyan gradient background. No text, no people, no faces. Photorealistic digital render.",
  uiux: "UI/UX design mockup displayed on tablet and smartphone side by side showing clean wireframe components and design system swatches. Minimal white background. No text, no people, no faces. Photorealistic digital render.",
  web: "Responsive web application displayed on desktop, tablet, and mobile simultaneously. Clean interface, soft shadow, white background. No text, no people, no faces. Photorealistic digital render.",
  ecommerce: "Online shopping cart and checkout interface on a clean e-commerce website with product grid visible in the background. Soft neutral tones. No text, no people, no faces. Photorealistic digital render.",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function getOrCreateAuthor(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({ collection: "authors", limit: 1 });
  if (existing.docs.length > 0) return existing.docs[0].id;
  const author = await payload.create({
    collection: "authors",
    data: {
      name: "BairesDev Solutions Editorial",
      title: "Engineering & Strategy Team",
      bio: "Insights from the engineers and specialists inside every engagement.",
    },
  });
  return author.id;
}

async function getOrCreateCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  categorySlug: string,
  categoryName: string
) {
  const existing = await payload.find({
    collection: "categories",
    where: { slug: { equals: categorySlug } },
    limit: 1,
  });
  if (existing.docs.length > 0) return existing.docs[0].id;
  const cat = await payload.create({
    collection: "categories",
    data: { name: categoryName, slug: categorySlug },
  });
  return cat.id;
}

// ─── Gemini Imagen 3 image generation ────────────────────────────────────────
async function generateCoverImage(
  apiKey: string,
  title: string,
  category: string
): Promise<Buffer | null> {
  try {
    const basePrompt = IMAGE_PROMPTS[category] || IMAGE_PROMPTS["web"];
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
      console.error("Imagen API error:", await res.text());
      return null;
    }

    const data = await res.json();
    const base64 = data?.predictions?.[0]?.bytesBase64Encoded;
    if (!base64) return null;

    return Buffer.from(base64, "base64");
  } catch (err) {
    console.error("Image generation failed:", err);
    return null;
  }
}

// ─── Upload image buffer to Payload media (stored in Vercel Blob) ─────────────
async function uploadCoverImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imageBuffer: Buffer,
  title: string,
  slug: string
): Promise<string | null> {
  try {
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
    console.error("Media upload failed:", err);
    return null;
  }
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const topic = TOPICS[dayOfYear % TOPICS.length];

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an expert content writer at BairesDev Solutions, a digital agency specialising in Zoho, Shopify, GoHighLevel, WordPress, UI/UX design, and AI automation.

Write a high-quality blog post for business owners and entrepreneurs about: "${topic}"

CONTENT RULES:
- 1,000–1,200 words total
- Open with a hook (problem, stat, or bold claim) — NOT "In today's world..."
- Structure: Hook → Problem → 3-5 ## sections with practical steps → Common Mistakes section → Bottom Line + CTA
- Include specific tool names, real feature names, and at least one concrete example
- Include at least one number or stat (estimated is fine)
- End with a soft CTA to contact BairesDev Solutions
- Write for business owners, not developers — plain English, no jargon without explanation
- Be direct, specific, and honest — no fluff or padding

SEO RULES:
- metaTitle: 50–60 chars, keyword near the front
- metaDescription: 140–155 chars, includes primary keyword, compelling reason to click
- Primary keyword must appear in the title, first paragraph, at least one heading, and meta fields

Respond ONLY with a valid JSON object — no markdown fences, no extra text:
{
  "title": "compelling title (50-80 chars, keyword near front)",
  "slug": "url-friendly-slug",
  "excerpt": "2-3 sentence summary, 140-200 chars, includes primary keyword",
  "category": "one of: zoho | shopify | ghl | wordpress | ai | uiux | web | ecommerce",
  "readTime": "X min",
  "metaTitle": "SEO meta title, 50-60 chars",
  "metaDescription": "SEO meta description, 140-155 chars",
  "content": "full post in Markdown — ## and ### headings, paragraphs, - bullet lists, **bold** for key terms. 1000-1200 words."
}`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();
    const jsonText = rawText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const postData = JSON.parse(jsonText);

    const slug = slugify(postData.slug || postData.title);

    // Generate cover image and upload in parallel with Payload setup
    const [imageBuffer, payload] = await Promise.all([
      generateCoverImage(process.env.GEMINI_API_KEY, postData.title, postData.category),
      getPayload({ config }),
    ]);

    const [authorId, categoryId] = await Promise.all([
      getOrCreateAuthor(payload),
      getOrCreateCategory(payload, postData.category, CATEGORY_MAP[postData.category] || "Engineering"),
    ]);

    // Upload image if generated
    let coverImageId: string | null = null;
    if (imageBuffer) {
      coverImageId = await uploadCoverImage(payload, imageBuffer, postData.title, slug);
    }

    const lexicalContent = markdownToLexical(postData.content);

    const post = await payload.create({
      collection: "posts",
      data: {
        title: postData.title,
        slug,
        excerpt: postData.excerpt,
        content: lexicalContent,
        author: authorId,
        category: categoryId,
        readTime: postData.readTime,
        ...(coverImageId ? { coverImage: coverImageId } : {}),
        seo: {
          metaTitle: postData.metaTitle || postData.title,
          metaDescription: postData.metaDescription || postData.excerpt,
        },
        status: "published",
        publishedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      post: { id: post.id, title: post.title, slug: post.slug },
      imageGenerated: !!coverImageId,
    });
  } catch (err) {
    console.error("Blog generation error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
