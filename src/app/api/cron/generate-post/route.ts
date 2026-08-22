import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPayload } from "payload";
import config from "@payload-config";
import { markdownToLexical } from "@/lib/markdownToLexical";

export const maxDuration = 60;

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
  "AI content workflows that save marketing teams 20 hours a month",
];

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
      bio: "Insights from the engineers and strategists inside the engagements.",
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

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  // Pick a topic based on day of year for variety
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const topic = TOPICS[dayOfYear % TOPICS.length];

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `You are an expert writer at BairesDev Solutions, a digital agency specialising in Zoho, Shopify, GoHighLevel, WordPress, UI/UX design, and AI automation for businesses worldwide.

Write a practical, opinionated blog post about: "${topic}"

The post should be genuinely useful to business owners, marketers, and entrepreneurs — not just developers. Include real-world advice, specific steps, and honest trade-offs.

Respond ONLY with a valid JSON object — no markdown code fences, no extra text, just the raw JSON:
{
  "title": "compelling title (max 80 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "2-3 sentence summary that is specific and honest (max 200 chars)",
  "category": "one of: zoho | shopify | ghl | wordpress | ai | uiux | web | ecommerce",
  "readTime": "X min",
  "content": "the full post in Markdown with ## and ### headings, paragraphs, and - bullet lists. 700-1000 words. Be direct and specific. No fluff. End with a practical takeaway or next step."
}`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();

    // Strip markdown code fences if Gemini wraps the response
    const jsonText = rawText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const postData = JSON.parse(jsonText);

    const payload = await getPayload({ config });

    const [authorId, categoryId] = await Promise.all([
      getOrCreateAuthor(payload),
      getOrCreateCategory(
        payload,
        postData.category,
        CATEGORY_MAP[postData.category] || "Engineering"
      ),
    ]);

    const lexicalContent = markdownToLexical(postData.content);

    const post = await payload.create({
      collection: "posts",
      data: {
        title: postData.title,
        slug: slugify(postData.slug || postData.title),
        excerpt: postData.excerpt,
        content: lexicalContent,
        author: authorId,
        category: categoryId,
        readTime: postData.readTime,
        status: "published",
        publishedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      post: { id: post.id, title: post.title, slug: post.slug },
    });
  } catch (err) {
    console.error("Blog generation error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
