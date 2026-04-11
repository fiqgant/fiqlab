import { NextResponse } from "next/server";
import { readGitHubCache } from "@/lib/github";

export async function GET() {
  const cache = await readGitHubCache();

  if (!cache) {
    return NextResponse.json({
      repos: [],
      profile: null,
      lastUpdated: null,
    });
  }

  return NextResponse.json(cache);
}
