'use client';

import React from 'react';
import { Article } from '@/types/news';
import { Clock } from 'lucide-react';

interface TopStoriesSidebarProps {
  articles: Article[];
  onSelect: (article: Article) => void;
}

export default function TopStoriesSidebar({
  articles,
  onSelect,
}: TopStoriesSidebarProps) {
  return (
    <aside className="top-stories-col" aria-label="Top Developments">
      <div className="section-header-rule">
        <span className="section-header-title">The Wire • Top Briefings</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontWeight: 700 }}>
          LIVE FEED
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {articles.slice(0, 4).map((art, index) => {
          const dateStr = new Date(art.publishedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={art.id || index}
              className="top-story-item"
              onClick={() => onSelect(art)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(art)}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.72rem',
                    color: 'var(--text-faint)',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ fontWeight: 800, color: 'var(--accent-red)' }}>
                    0{index + 1}
                  </span>
                  <span>•</span>
                  <span>{art.source.name}</span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <Clock className="w-3 h-3" />
                    {dateStr}
                  </span>
                </div>

                <h3 className="top-story-title">{art.title}</h3>
              </div>

              <div className="top-story-thumb">
                <img
                  src={
                    art.urlToImage ||
                    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80'
                  }
                  alt={art.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
