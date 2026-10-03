'use client';

import React from 'react';
import { Article } from '@/types/news';
import { Clock, User, Headphones, Bookmark, Share2, Sparkles } from 'lucide-react';

interface HeroLeadProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export default function HeroLead({ article, onSelect }: HeroLeadProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className="lead-story" aria-label="Lead Story">
      <div
        className="lead-image-wrap"
        onClick={() => onSelect(article)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(article)}
      >
        <img
          src={
            article.urlToImage ||
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
          }
          alt={article.title}
          loading="eager"
          decoding="async"
        />
        {article.isExclusive && (
          <span
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(18, 20, 23, 0.9)',
              color: '#fbbf24',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            INVESTIGATIVE EXCLUSIVE
          </span>
        )}
      </div>

      <span className="kicker-tag">
        {article.source.name} • Special Report
      </span>

      <h1
        className="lead-title"
        onClick={() => onSelect(article)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(article)}
      >
        {article.title}
      </h1>

      <p className="lead-deck">
        {article.description}
      </p>

      <div className="article-byline">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span className="byline-author" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <User className="w-3.5 h-3.5 text-red-600" />
            By {article.author || article.source.name}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-red)' }}>
            <Headphones className="w-3.5 h-3.5" />
            {article.readTime || '4 min read'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onSelect(article)}
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--accent-red)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            Full Analysis →
          </button>
        </div>
      </div>
    </article>
  );
}
