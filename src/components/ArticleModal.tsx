'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types/news';
import {
  X,
  Printer,
  Share2,
  Copy,
  Check,
  Calendar,
  User,
  Clock,
  Headphones,
  ExternalLink,
  BookOpen,
  Volume2,
} from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0: Small, 1: Normal, 2: Large
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const fontSizes = ['1.02rem', '1.15rem', '1.3rem'];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(article.url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Generate multi-paragraph editorial article body
  const paragraphs = [
    `In an in-depth investigation reported by ${article.source.name}, "${article.title}" marks a critical turning point across global markets and policy institutions. As governments, enterprise architects, and research councils reassess strategic dependencies, analysts note that the speed of execution will dictate organizational resilience for the next decade.`,
    article.description || `The operational details reveal sustained cross-sector realignment. Independent observers point to early performance benchmarks indicating high compliance, though long-term regulatory questions remain under active debate. With sovereign directives aligning closely with technological autonomy, public interest groups are demanding transparent oversight mechanisms.`,
    `Furthermore, historical indicators illustrate that similar systemic transformations often initiate cascading effects across ancillary supply chains and capital distribution. "We are seeing a definitive transition from reactive emergency measures to structural sovereign capability," commented an advisory committee chair involved in the proceedings.`,
    `Looking forward, stakeholders from both public and private sectors are preparing formal whitepapers and implementation guidelines. Continued forensic reporting will be essential as verified metrics emerge over the coming financial quarters.`
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-article-title"
    >
      <div
        className="reader-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reader Toolbar */}
        <div className="reader-toolbar">
          <button
            onClick={onClose}
            className="reader-close-btn"
            aria-label="Close reading view"
          >
            <X className="w-4 h-4" />
            <span>Close (Esc)</span>
          </button>

          <div className="reader-actions">
            {/* Font Size Adjuster */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                background: 'var(--bg-surface-elevated)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid var(--border-rule)',
                fontSize: '0.75rem',
              }}
            >
              <button
                onClick={() => setFontSizeLevel(0)}
                style={{
                  padding: '2px 6px',
                  fontWeight: fontSizeLevel === 0 ? 800 : 400,
                  color: fontSizeLevel === 0 ? 'var(--accent-red)' : 'var(--text-muted)',
                }}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeLevel(1)}
                style={{
                  padding: '2px 6px',
                  fontWeight: fontSizeLevel === 1 ? 800 : 400,
                  color: fontSizeLevel === 1 ? 'var(--accent-red)' : 'var(--text-muted)',
                }}
                title="Standard text"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeLevel(2)}
                style={{
                  padding: '2px 6px',
                  fontWeight: fontSizeLevel === 2 ? 800 : 400,
                  color: fontSizeLevel === 2 ? 'var(--accent-red)' : 'var(--text-muted)',
                }}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Print Story */}
            <button
              onClick={handlePrint}
              className="reader-icon-btn"
              title="Print Dispatch"
              aria-label="Print Dispatch"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Copy / Share Link */}
            <button
              onClick={handleCopyLink}
              className="reader-icon-btn"
              title={copied ? 'Link Copied!' : 'Copy Dispatch Link'}
              aria-label="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Reader Content Body */}
        <div className="reader-content-body">
          <div className="reader-kicker">
            {article.source.name} • Special Report • {article.category?.toUpperCase() || 'WIRE'}
          </div>

          <h1 id="reader-article-title" className="reader-headline">
            {article.title}
          </h1>

          <div className="reader-meta-row">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User className="w-4 h-4 text-red-600" />
              <strong>{article.author || article.source.name}</strong>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock className="w-4 h-4" />
              {article.readTime || '4 min read'}
            </span>

            {/* Audio Listen Simulation */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: isPlayingAudio ? 'var(--accent-red)' : 'var(--bg-surface-elevated)',
                color: isPlayingAudio ? '#ffffff' : 'var(--text-main)',
                fontSize: '0.78rem',
                fontWeight: 600,
                border: '1px solid var(--border-rule)',
              }}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Pause Narration' : 'Listen (4:12)'}</span>
            </button>
          </div>

          {/* Banner Image */}
          <img
            src={
              article.urlToImage ||
              'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'
            }
            alt={article.title}
            className="reader-hero-image"
          />

          {/* Article Editorial Text */}
          <div
            className="reader-article-text"
            style={{ fontSize: fontSizes[fontSizeLevel] }}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Author Bio Box */}
          <div
            style={{
              marginTop: '36px',
              padding: '20px',
              borderRadius: '6px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-rule)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--text-main)',
                color: 'var(--bg-canvas)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem',
                flexShrink: 0,
              }}
            >
              {(article.author || 'Y').charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                Reported by {article.author || article.source.name}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Senior Bureau Correspondent specializing in strategic investigations, economic telemetry, and institutional governance.
              </p>
            </div>
          </div>

          {/* Source Attribution & Link */}
          <div className="reader-source-attribution">
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                Syndicated Source Attribution
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Originally transmitted via {article.source.name}. All verified editorial rights reserved.
              </p>
            </div>

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  background: 'var(--text-main)',
                  color: 'var(--bg-canvas)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                <span>View Wire Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
