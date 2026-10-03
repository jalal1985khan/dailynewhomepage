import { Article } from '@/types/news';
import { CURATED_NEWS_BY_CATEGORY } from './constants';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 100);
}

export function getAllCuratedArticles(): Article[] {
  const all = Object.values(CURATED_NEWS_BY_CATEGORY).flat();
  const seen = new Set<string>();
  return all.filter((item) => {
    if (seen.has(item.title)) return false;
    seen.add(item.title);
    return true;
  });
}

export function findArticleBySlug(slug: string, extraArticles: Article[] = []): Article | null {
  const combined = [...extraArticles, ...getAllCuratedArticles()];
  const normalizedSlug = slug.toLowerCase();

  // Try exact slug match on title
  const exact = combined.find((a) => slugify(a.title) === normalizedSlug);
  if (exact) return exact;

  // Try partial match
  const partial = combined.find((a) => {
    const aSlug = slugify(a.title);
    return aSlug.includes(normalizedSlug) || normalizedSlug.includes(aSlug);
  });
  if (partial) return partial;

  // Try matching words
  const words = normalizedSlug.split('-').filter((w) => w.length > 3);
  if (words.length > 0) {
    const wordMatch = combined.find((a) => {
      const lower = a.title.toLowerCase();
      return words.filter((w) => lower.includes(w)).length >= Math.min(2, words.length);
    });
    if (wordMatch) return wordMatch;
  }

  return null;
}
