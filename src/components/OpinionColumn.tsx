'use client';

import React from 'react';
import { EDITORIAL_OPINIONS } from '@/lib/constants';
import { Article } from '@/types/news';

interface OpinionColumnProps {
  onSelectOpinionArticle: (article: Article) => void;
}

export default function OpinionColumn({ onSelectOpinionArticle }: OpinionColumnProps) {
  const handleOpinionClick = (op: typeof EDITORIAL_OPINIONS[0]) => {
    const article: Article = {
      id: op.id,
      title: op.title,
      description: `Analysis and commentary by ${op.author} (${op.role}) on tectonic technological and macroeconomic shifts shaping sovereign policy.`,
      content: `In this comprehensive essay, ${op.author} investigates why recent technological realignments are establishing new sovereign spheres of influence.\n\n"The traditional consensus around globalized supply dependencies has dissolved," writes ${op.author}. "Nations are racing to secure independent computing infrastructure, clean energy storage, and sovereign AI reasoning stacks. Those who rely exclusively on offshore pipelines will find their fiscal sovereignty compromised within the decade."\n\nTo navigate this landscape, institutional leaders must reconsider long-term risk models and prioritize resilient localized capital.`,
      url: `https://yugsatya.com/opinion/${op.id}`,
      urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date().toISOString(),
      source: { name: 'YugSatya Editorial Desk' },
      author: op.author,
      category: 'opinion',
      readTime: op.readTime,
    };
    onSelectOpinionArticle(article);
  };

  return (
    <aside className="opinion-col" aria-label="Opinion & Commentary">
      <div className="section-header-rule">
        <span className="section-header-title">Voices • Analysis & Essay</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
          COLUMNS
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {EDITORIAL_OPINIONS.map((op) => (
          <div
            key={op.id}
            className="opinion-item"
            onClick={() => handleOpinionClick(op)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleOpinionClick(op)}
          >
            <img
              src={op.avatar}
              alt={op.author}
              className="opinion-avatar"
              loading="lazy"
            />
            <div>
              <div className="opinion-author-name">{op.author}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: '4px' }}>
                {op.role} • {op.readTime}
              </div>
              <h4 className="opinion-title">
                "{op.title}"
              </h4>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
