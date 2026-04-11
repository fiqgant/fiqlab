import fs from "fs/promises";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "data", "scholar-cache.json");

export interface ScholarArticle {
  title: string;
  authors: string;
  publication: string;
  year: string;
  citedBy: number;
  link: string;
  citationId: string;
}

export interface ScholarProfile {
  name: string;
  affiliations: string;
  interests: string[];
  thumbnail: string;
  citedBy: {
    all: number;
    recent: number;
  };
  hIndex: {
    all: number;
    recent: number;
  };
  i10Index: {
    all: number;
    recent: number;
  };
}

export interface ScholarCache {
  lastUpdated: string;
  profile: ScholarProfile;
  articles: ScholarArticle[];
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function toStringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toNumberValue(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = value.replace(/,/g, "").trim();
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function getMetricEntry(row: unknown, preferredKey: string): JsonRecord | null {
  if (!isRecord(row)) return null;

  const preferred = row[preferredKey];
  if (isRecord(preferred)) return preferred;

  for (const value of Object.values(row)) {
    if (isRecord(value)) return value;
  }

  return null;
}

function getMetricValues(row: unknown, preferredKey: string) {
  const entry = getMetricEntry(row, preferredKey);

  return {
    all: toNumberValue(entry?.all),
    recent: toNumberValue(entry?.since_2020 ?? entry?.since_2019 ?? entry?.since2020 ?? entry?.since2019),
  };
}

export async function fetchScholarData(authorId: string, apiKey: string): Promise<ScholarCache> {
  const allArticles: ScholarArticle[] = [];
  let start = 0;
  const pageSize = 100;
  let profile: ScholarProfile | null = null;

  while (true) {
    const params = new URLSearchParams({
      engine: "google_scholar_author",
      author_id: authorId,
      api_key: apiKey,
      start: start.toString(),
      num: pageSize.toString(),
    });

    const response = await fetch(`https://serpapi.com/search?${params}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`);
    }

    const data: unknown = await response.json();
    if (!isRecord(data)) {
      throw new Error("SerpAPI returned an invalid response.");
    }

    const errorMessage = data.error;
    if (typeof errorMessage === "string" && errorMessage.length > 0) {
      throw new Error(`SerpAPI: ${errorMessage}`);
    }

    if (!profile && isRecord(data.author)) {
      const interests = Array.isArray(data.author.interests)
        ? data.author.interests
            .filter(isRecord)
            .map((interest) => toStringValue(interest.title))
            .filter(Boolean)
        : [];

      const citedByTable = isRecord(data.cited_by) && Array.isArray(data.cited_by.table)
        ? data.cited_by.table
        : [];

      profile = {
        name: toStringValue(data.author.name),
        affiliations: toStringValue(data.author.affiliations),
        interests,
        thumbnail: toStringValue(data.author.thumbnail),
        citedBy: getMetricValues(citedByTable[0], "citations"),
        hIndex: getMetricValues(citedByTable[1], "h_index"),
        i10Index: getMetricValues(citedByTable[2], "i10_index"),
      };
    }

    const articles = Array.isArray(data.articles)
      ? data.articles.filter(isRecord).map((article) => {
          const citedBy = isRecord(article.cited_by) ? article.cited_by : null;

          return {
            title: toStringValue(article.title),
            authors: toStringValue(article.authors),
            publication: toStringValue(article.publication),
            year: toStringValue(article.year),
            citedBy: toNumberValue(citedBy?.value),
            link: toStringValue(article.link),
            citationId: toStringValue(article.citation_id),
          } satisfies ScholarArticle;
        })
      : [];

    allArticles.push(...articles);

    const pagination = isRecord(data.serpapi_pagination) ? data.serpapi_pagination : null;
    if (!pagination?.next || articles.length === 0) {
      break;
    }

    start += pageSize;
  }

  if (!profile) {
    throw new Error("Scholar profile data was not found in the SerpAPI response.");
  }

  return {
    lastUpdated: new Date().toISOString(),
    profile,
    articles: allArticles,
  };
}

export async function saveScholarCache(data: ScholarCache): Promise<void> {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function readScholarCache(): Promise<ScholarCache | null> {
  try {
    const raw = await fs.readFile(CACHE_PATH, "utf-8");
    return JSON.parse(raw) as ScholarCache;
  } catch {
    return null;
  }
}
