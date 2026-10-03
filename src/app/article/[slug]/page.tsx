import { Metadata } from 'next';
import { findArticleBySlug, slugify } from '@/lib/utils';
import ArticleView from './ArticleView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const article = findArticleBySlug(decodedSlug);

  const title = article ? article.title : decodedSlug.replace(/-/g, ' ');
  const description = article?.description || 'Read the full verified investigative report on YugSatya News.';
  const imageUrl = article?.urlToImage || 'https://www.yugsatya.com/logo.png';
  const canonicalUrl = `https://www.yugsatya.com/article/${encodeURIComponent(slug)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: article?.publishedAt,
      authors: article?.author ? [article.author] : ['YugSatya Editorial Board'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const initialArticle = findArticleBySlug(decodedSlug);

  return <ArticleView slug={decodedSlug} initialArticle={initialArticle} />;
}
