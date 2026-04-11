import { NextResponse } from "next/server";
import { fetchGitHubData, saveGitHubCache } from "@/lib/github";

export async function POST() {
  try {
    const username = process.env.GITHUB_USERNAME;

    if (!username) {
      return NextResponse.json(
        { message: "GITHUB_USERNAME is not configured" },
        { status: 500 },
      );
    }

    const data = await fetchGitHubData(username);
    await saveGitHubCache(data);

    return NextResponse.json({
      success: true,
      count: data.repos.length,
      lastUpdated: data.lastUpdated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to sync GitHub data";

    return NextResponse.json({ message }, { status: 500 });
  }
}
