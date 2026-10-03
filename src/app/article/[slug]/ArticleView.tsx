'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import MarketBar from '@/components/MarketBar';
import BreakingTicker from '@/components/BreakingTicker';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Article } from '@/types/news';
import { slugify, getAllCuratedArticles } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Volume2,
  Printer,
  Copy,
  Check,
  Share2,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface ArticleViewProps {
  slug: string;
  initialArticle: Article | null;
}

export default function ArticleView({ slug, initialArticle }: ArticleViewProps) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(initialArticle);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0: Small, 1: Normal, 2: Large
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // 1. Try to recover from sessionStorage if not found on server
    if (!article && typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(`current_article_${slug}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          setArticle(parsed);
          return;
        }

        const last = sessionStorage.getItem('last_selected_article');
        if (last) {
          const parsed = JSON.parse(last);
          if (slugify(parsed.title) === slug) {
            setArticle(parsed);
            return;
          }
        }
      } catch (e) {
        console.warn('Storage read notice:', e);
      }

      // If still not found, construct a graceful fallback from slug
      const titleFromSlug = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const fallback: Article = {
        title: titleFromSlug,
        description: `Verified dispatch and investigative coverage regarding ${titleFromSlug}. Full editorial documentation and updates.`,
        content: `Comprehensive analysis and developments regarding "${titleFromSlug}".`,
        url: 'https://yugsatya.com',
        urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date().toISOString(),
        source: { name: 'YugSatya Global Wire' },
        author: 'Editorial Desk',
        category: 'general',
        readTime: '4 min read',
      };
      setArticle(fallback);
    }
  }, [slug, article]);

  // Load related articles
  useEffect(() => {
    const all = getAllCuratedArticles();
    const filtered = all.filter((a) => slugify(a.title) !== slug).slice(0, 3);
    setRelatedArticles(filtered);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const fontSizes = ['1.04rem', '1.18rem', '1.34rem'];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCategorySelect = (catId: string) => {
    router.push(`/?category=${catId}`);
  };

  const handleSearchSubmit = (query: string) => {
    router.push(`/?q=${encodeURIComponent(query)}`);
  };

  const navigateToArticle = (target: Article) => {
    const targetSlug = slugify(target.title);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`current_article_${targetSlug}`, JSON.stringify(target));
      sessionStorage.setItem('last_selected_article', JSON.stringify(target));
    }
    router.push(`/article/${targetSlug}`);
  };

  if (!article) return null;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const paragraphs = [
    `In a significant development reported by ${article.source.name}, "${article.title}" marks a critical turning point across global markets and policy institutions. As governments, enterprise architects, and research councils reassess strategic dependencies, analysts note that the speed of execution will dictate organizational resilience for the next decade.`,
    article.description || `The operational details reveal sustained cross-sector realignment. Independent observers point to early performance benchmarks indicating high compliance, though long-term regulatory questions remain under active debate. With sovereign directives aligning closely with technological autonomy, public interest groups are demanding transparent oversight mechanisms.`,
    `Furthermore, historical indicators illustrate that similar systemic transformations often initiate cascading effects across ancillary supply chains and capital distribution. "We are seeing a definitive transition from reactive emergency measures to structural sovereign capability," commented an advisory committee chair involved in the proceedings.`,
    `Looking forward, stakeholders from both public and private sectors are preparing formal whitepapers and implementation guidelines. Continued forensic reporting will be essential as verified metrics emerge over the coming financial quarters.`
  ];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://yugsatya.com';
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  // JSON-LD NewsArticle structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: [article.urlToImage || 'https://yugsatya.com/logo.png'],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [
      {
        '@type': 'Person',
        name: article.author || article.source.name,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'YugSatya News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yugsatya.com/logo.png',
      },
    },
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <Header
        activeCategory={article.category || 'general'}
        onSelectCategory={handleCategorySelect}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Markets Bar & Breaking Ticker */}
      <MarketBar />
      <BreakingTicker onStoryClick={(headline) => handleSearchSubmit(headline)} />

      {/* Main Dedicated Article Content */}
      <main id="main-content" className="container" style={{ flex: 1, padding: '24px 20px 48px' }}>

        {/* Navigation Breadcrumb Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '28px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-rule)',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              padding: '6px 12px',
              borderRadius: '4px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-rule)',
            }}
          >
            <ArrowLeft className="w-4 h-4 text-red-600" />
            <span>Back to News Wire</span>
          </Link>

          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-faint)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Wire Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ textTransform: 'capitalize' }}>{article.category || 'Dispatches'}</span>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: 'var(--text-main)', fontWeight: 600, maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {article.title}
            </span>
          </nav>
        </div>

        {/* Dedicated Article Sheet Layout */}
        <article className="article-page-sheet" style={{ maxWidth: '840px', margin: '0 auto' }}>

          {/* Kicker */}
          <div className="reader-kicker" style={{ marginBottom: '14px' }}>
            {article.source.name} • SPECIAL INVESTIGATION • {(article.category || 'WIRE').toUpperCase()}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              fontWeight: 700,
              lineHeight: 1.16,
              color: 'var(--text-main)',
              marginBottom: '20px',
            }}
          >
            {article.title}
          </h1>

          {/* Byline & Meta Strip */}
          <div className="reader-meta-row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingBottom: '16px', marginBottom: '24px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User className="w-4 h-4 text-red-600" />
              <strong>By {article.author || article.source.name}</strong>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar className="w-4 h-4" />
              <time dateTime={article.publishedAt}>{formattedDate}</time>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock className="w-4 h-4" />
              {article.readTime || '4 min read'}
            </span>

            {/* Audio Listen */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
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

          {/* Article Interactive Reading Controls Toolbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderRadius: '6px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-rule)',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {/* Font Adjuster */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontWeight: 600 }}>
                Type Size:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-rule)' }}>
                <button onClick={() => setFontSizeLevel(0)} style={{ padding: '2px 6px', fontWeight: fontSizeLevel === 0 ? 800 : 400, color: fontSizeLevel === 0 ? 'var(--accent-red)' : 'var(--text-muted)' }}>A-</button>
                <button onClick={() => setFontSizeLevel(1)} style={{ padding: '2px 6px', fontWeight: fontSizeLevel === 1 ? 800 : 400, color: fontSizeLevel === 1 ? 'var(--accent-red)' : 'var(--text-muted)' }}>A</button>
                <button onClick={() => setFontSizeLevel(2)} style={{ padding: '2px 6px', fontWeight: fontSizeLevel === 2 ? 800 : 400, color: fontSizeLevel === 2 ? 'var(--accent-red)' : 'var(--text-muted)' }}>A+</button>
              </div>
            </div>

            {/* Actions: Print & Share */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handlePrint}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-rule)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                }}
                title="Print story"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={handleCopyLink}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-rule)',
                  fontSize: '0.78rem',
                  color: copied ? '#10b981' : 'var(--text-muted)',
                }}
                title="Copy direct article URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share Link'}</span>
              </button>

              <a
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-rule)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span>X / Twitter</span>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div style={{ marginBottom: '28px', borderRadius: '6px', overflow: 'hidden', background: 'var(--bg-surface-subtle)' }}>
            <img
              src={
                article.urlToImage ||
                'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'
              }
              alt={article.title}
              style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
            />
            <div style={{ padding: '8px 12px', fontSize: '0.74rem', color: 'var(--text-faint)', borderTop: '1px solid var(--border-rule)' }}>
              Editorial Telemetry Wire • Photographed for {article.source.name}
            </div>
          </div>

          {/* Article Text Paragraphs */}
          <div
            className="reader-article-text"
            style={{ fontSize: fontSizes[fontSizeLevel] }}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Author Box */}
          <div
            style={{
              marginTop: '44px',
              padding: '24px',
              borderRadius: '6px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-rule)',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--text-main)',
                color: 'var(--bg-canvas)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.3rem',
                flexShrink: 0,
              }}
            >
              {(article.author || 'Y').charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.96rem' }}>
                Reported by {article.author || article.source.name}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                Bureau Chief & Senior Investigative Correspondent. Coverage focuses on sovereign macroeconomics, institutional compliance, and frontier intelligence.
              </p>
            </div>
          </div>

          {/* Syndication & External Source Attribution */}
          <div className="reader-source-attribution" style={{ marginTop: '24px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                Original Wire Syndication Notice
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Broadcast and verified via {article.source.name}. Protected under international copyright and syndicated wire agreements.
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
                <span>View Original Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </article>

        {/* Related Stories Section */}
        {relatedArticles.length > 0 && (
          <section style={{ marginTop: '64px', paddingTop: '36px', borderTop: '2px solid var(--text-main)' }}>
            <div className="section-header-rule">
              <h3 className="section-header-title">More From The YugSatya Wire</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 700 }}>
                EXPLORE
              </span>
            </div>

            <div className="feed-grid" style={{ marginTop: '20px' }}>
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id || rel.title}
                  className="article-card"
                  onClick={() => navigateToArticle(rel)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => e.key === 'Enter' && navigateToArticle(rel)}
                >
                  <div className="card-img-wrap">
                    <img
                      src={rel.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.title}
                      loading="lazy"
                    />
                    <span className="card-category-badge">{rel.source.name}</span>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title" style={{ fontSize: '1.05rem' }}>{rel.title}</h4>
                    <p className="card-desc">{rel.description}</p>
                    <div className="card-footer">
                      <span>{rel.readTime || '3 min read'}</span>
                      <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>Read Dispatch →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Banner */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearchSubmit={handleSearchSubmit}
        articles={relatedArticles}
        onSelectArticle={(art) => navigateToArticle(art)}
      />
    </div>
  );
}
