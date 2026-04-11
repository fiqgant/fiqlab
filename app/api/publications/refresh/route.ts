import { NextResponse } from "next/server";
import { fetchScholarData, saveScholarCache } from "@/lib/scholar";

export const dynamic = "force-dynamic";

export async function POST() {
  const apiKey = process.env.SERPAPI_KEY;
  const authorId = process.env.GOOGLE_SCHOLAR_AUTHOR_ID;

  if (!apiKey || !authorId) {
    return NextResponse.json(
      { success: false, message: "Missing SERPAPI_KEY or GOOGLE_SCHOLAR_AUTHOR_ID." },
      { status: 500 }
    );
  }

  try {
    const data = await fetchScholarData(authorId, apiKey);
    await saveScholarCache(data);

    return NextResponse.json({
      success: true,
      count: data.articles.length,
      lastUpdated: data.lastUpdated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to refresh publications.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
