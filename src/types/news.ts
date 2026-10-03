export interface ArticleSource {
  id?: string | null;
  name: string;
}

export interface Article {
  id?: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  source: ArticleSource;
  author?: string | null;
  category?: string;
  readTime?: string;
  isBreaking?: boolean;
  isExclusive?: boolean;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  sourceType?: 'live' | 'cache' | 'fallback';
}

export interface CategoryOption {
  id: string;
  label: string;
  slug: string;
  description: string;
  badge?: string;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}
