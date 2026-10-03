import { NextRequest, NextResponse } from 'next/server';
import { CURATED_NEWS_BY_CATEGORY } from '@/lib/constants';
import { Article } from '@/types/news';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = (searchParams.get('category') || 'general').toLowerCase();
  const query = searchParams.get('q') || '';
  const country =
    searchParams.get('country') ||
    process.env.NEWS_COUNTRY ||
    process.env.NEXT_PUBLIC_NEWS_COUNTRY ||
    process.env.VITE_NEWS_COUNTRY ||
    'us';

  const apiKey =
    process.env.NEWS_API_KEY ||
    process.env.NEXT_PUBLIC_NEWS_API_KEY ||
    process.env.VITE_NEWS_API_KEY ||
    '';

  const baseUrl =
    process.env.NEWS_BASE_URL ||
    process.env.NEXT_PUBLIC_NEWS_BASE_URL ||
    process.env.VITE_NEWS_BASE_URL ||
    'https://newsapi.org/v2';

  // Helper to filter fallback articles
  const getFallbackArticles = (cat: string, q: string): Article[] => {
    let list: Article[] = [];
    if (cat === 'all' || cat === 'general') {
      // Aggregate across all categories for general
      list = Object.values(CURATED_NEWS_BY_CATEGORY).flat();
      // Remove duplicates by title
      const seen = new Set<string>();
      list = list.filter((item) => {
        if (seen.has(item.title)) return false;
        seen.add(item.title);
        return true;
      });
    } else if (CURATED_NEWS_BY_CATEGORY[cat]) {
      list = CURATED_NEWS_BY_CATEGORY[cat];
    } else {
      list = CURATED_NEWS_BY_CATEGORY['general'] || [];
    }

    if (q.trim()) {
      const lowerQ = q.toLowerCase();
      const filtered = list.filter(
        (a) =>
          a.title.toLowerCase().includes(lowerQ) ||
          a.description.toLowerCase().includes(lowerQ) ||
          a.author?.toLowerCase().includes(lowerQ) ||
          a.source.name.toLowerCase().includes(lowerQ)
      );
      if (filtered.length > 0) return filtered;
    }

    return list;
  };

  // If no API key is provided, return rich curated fallback data
  if (!apiKey) {
    const articles = getFallbackArticles(category, query);
    return NextResponse.json({
      status: 'ok',
      totalResults: articles.length,
      articles,
      sourceType: 'fallback',
      message: 'Serving curated editorial feed (Set NEWS_API_KEY to activate external NewsAPI live proxy).'
    });
  }

  try {
    let targetUrl = '';
    if (query.trim()) {
      targetUrl = `${baseUrl}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=30&apiKey=${apiKey}`;
    } else {
      // NewsAPI category mapping
      const validNewsApiCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
      const apiCategory = validNewsApiCategories.includes(category) ? category : 'general';
      targetUrl = `${baseUrl}/top-headlines?category=${apiCategory}&country=${country}&pageSize=30&apiKey=${apiKey}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      next: { revalidate: 300 } // 5 minute cache in Next.js
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.warn('NewsAPI returned error status:', res.status, errorData);
      const fallback = getFallbackArticles(category, query);
      return NextResponse.json({
        status: 'ok',
        totalResults: fallback.length,
        articles: fallback,
        sourceType: 'fallback',
        errorNotice: `NewsAPI returned status ${res.status}. Falling back to curated editorial wire.`
      });
    }

    const data = await res.json();

    if (data.status === 'ok' && Array.isArray(data.articles)) {
      // Clean and sanitize articles
      const validArticles: Article[] = data.articles
        .filter((a: any) => a.title && a.title !== '[Removed]' && !a.title.includes('404'))
        .map((a: any, idx: number) => ({
          id: `newsapi-${idx}-${Date.now()}`,
          title: a.title,
          description: a.description || 'Full coverage available in editorial viewer.',
          content: a.content || a.description || '',
          url: a.url,
          urlToImage: a.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
          publishedAt: a.publishedAt || new Date().toISOString(),
          source: { name: a.source?.name || 'Syndicated Wire' },
          author: a.author || a.source?.name || 'Editorial Staff',
          category: category,
          readTime: `${Math.max(3, Math.min(8, Math.round((a.title.length + (a.description?.length || 0)) / 100)))} min read`
        }));

      if (validArticles.length > 0) {
        return NextResponse.json({
          status: 'ok',
          totalResults: validArticles.length,
          articles: validArticles,
          sourceType: 'live'
        }, {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
          }
        });
      }
    }

    // If zero articles returned, fallback
    const fallback = getFallbackArticles(category, query);
    return NextResponse.json({
      status: 'ok',
      totalResults: fallback.length,
      articles: fallback,
      sourceType: 'fallback'
    });

  } catch (err: any) {
    console.error('Error in News Route Handler:', err?.message);
    const fallback = getFallbackArticles(category, query);
    return NextResponse.json({
      status: 'ok',
      totalResults: fallback.length,
      articles: fallback,
      sourceType: 'fallback',
      errorNotice: 'Network error contacting live wire. Curated offline archive rendered.'
    });
  }
}
