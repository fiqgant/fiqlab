import { NextResponse } from "next/server";
import { readScholarCache } from "@/lib/scholar";

export const dynamic = "force-dynamic";

export async function GET() {
  const cache = await readScholarCache();

  if (!cache) {
    return NextResponse.json({
      articles: [],
      profile: null,
      lastUpdated: null,
    });
  }

  return NextResponse.json(cache);
}
