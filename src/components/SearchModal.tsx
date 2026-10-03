'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { Article } from '@/types/news';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchSubmit: (query: string) => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  onSearchSubmit,
  articles,
  onSelectArticle,
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = searchTerm.trim()
    ? articles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.source.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchSubmit(searchTerm.trim());
      onClose();
    }
  };

  return (
    <div
      className="search-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search wire articles"
    >
      <div className="search-box-wrap" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleFormSubmit} className="search-input-inner">
          <Search className="w-6 h-6 text-red-600" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search news database, topics, countries, or journalists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search query"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{ color: 'var(--text-faint)' }}
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="reader-close-btn"
            style={{ marginLeft: '8px' }}
          >
            Esc
          </button>
        </form>

        {/* Quick Suggestion Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontWeight: 600 }}>
            Trending Topics:
          </span>
          {['Quantum Computing', 'HVDC Grids', 'Semiconductors', 'Space Telescope', 'Nearshoring'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchTerm(tag);
                onSearchSubmit(tag);
                onClose();
              }}
              style={{
                fontSize: '0.74rem',
                padding: '3px 8px',
                borderRadius: '4px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-rule)',
                color: 'var(--text-main)',
              }}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Live Filter Results Preview */}
        {searchTerm.trim() && (
          <div style={{ marginTop: '20px', maxHeight: '380px', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-faint)', marginBottom: '10px' }}>
              Found {filtered.length} instant matching dispatches:
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                Press Enter to perform a global deep wire query for "{searchTerm}"
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filtered.slice(0, 5).map((item) => (
                  <div
                    key={item.id || item.title}
                    onClick={() => {
                      onSelectArticle(item);
                      onClose();
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '4px',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-rule)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--accent-red)', fontWeight: 700 }}>
                        {item.source.name}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', fontWeight: 600 }}>
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-red-600 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
