import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPayload } from "payload";
import config from "@payload-config";
import { markdownToLexical } from "@/lib/markdownToLexical";

export const maxDuration = 60;

const TOPICS = [
  "modernising legacy enterprise systems without stopping feature delivery",
  "building production-grade AI agents that are reliable enough to trust",
  "why most mobile apps fail at offline-first and how to fix it",
  "the hidden cost of bad CRM data and how to build a single customer record",
  "checkout architecture for e-commerce at scale — idempotency, sagas, and failure modes",
  "engineering team structures that actually ship: squads, guilds, and when to break the rules",
  "LLM evaluation frameworks: how to know if your AI feature is working",
  "micro-frontend architecture — when it helps and when it is overkill",
  "observability for distributed systems: what to measure and what to ignore",
  "building accessible digital products that do not compromise on design",
];

const CATEGORY_MAP: Record<string, string> = {
  web: "Web Engineering",
  mobile: "Mobile",
  ai: "Applied AI",
  ecommerce: "Commerce",
  crm: "Data",
  marketing: "Leadership",
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are a senior engineer and writer at BairesDev Solutions, a premium software engineering firm serving global enterprises.

Write a practical, opinionated engineering blog post about: "${topic}"

Respond ONLY with a valid JSON object — no markdown code fences, no extra text, just the raw JSON:
{
  "title": "compelling title (max 80 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "2-3 sentence summary that is specific and honest (max 200 chars)",
  "category": "one of: web | mobile | ai | ecommerce | crm | marketing",
  "readTime": "X min",
  "content": "the full post in Markdown with ## and ### headings, paragraphs, and - bullet lists. 600-900 words. Be direct, technical, and specific. No fluff."
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
