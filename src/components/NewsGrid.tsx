'use client';

import React from 'react';
import { Article } from '@/types/news';
import { Clock, User, ArrowUpRight } from 'lucide-react';

interface NewsGridProps {
  articles: Article[];
  categoryTitle: string;
  onSelect: (article: Article) => void;
  activeQuery?: string;
}

export default function NewsGrid({
  articles,
  categoryTitle,
  onSelect,
  activeQuery,
}: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--bg-surface)',
          borderRadius: '8px',
          border: '1px solid var(--border-rule)',
        }}
      >
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '8px' }}>
          No Matching Articles Found
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {activeQuery
            ? `No dispatches matched your query "${activeQuery}". Try expanding your keywords or selecting another category.`
            : 'No dispatches currently available in this section.'}
        </p>
      </div>
    );
  }

  return (
    <section className="feed-section" aria-label="News Feed">
      <div className="section-header-rule">
        <h2 className="section-header-title">
          {activeQuery ? `Search Results: "${activeQuery}"` : `${categoryTitle} Dispatches`}
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontWeight: 600 }}>
          {articles.length} Stories Available
        </span>
      </div>

      <div className="feed-grid">
        {articles.map((art, index) => {
          const dateStr = new Date(art.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });

          return (
            <article
              key={art.id || index}
              className="article-card"
              onClick={() => onSelect(art)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && onSelect(art)}
            >
              <div className="card-img-wrap">
                <img
                  src={
                    art.urlToImage ||
                    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={art.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span className="card-category-badge">
                  {art.source.name}
                </span>
              </div>

              <div className="card-body">
                <div className="card-source-date">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Clock className="w-3 h-3" />
                    <time dateTime={art.publishedAt}>{dateStr}</time>
                  </span>
                  <span>•</span>
                  <span>{art.readTime || '3 min read'}</span>
                </div>

                <h3 className="card-title">{art.title}</h3>

                <p className="card-desc">{art.description}</p>

                <div className="card-footer">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <User className="w-3 h-3 text-red-600" />
                    {art.author || art.source.name}
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px',
                      color: 'var(--accent-red)',
                      fontWeight: 600,
                    }}
                  >
                    Read
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
