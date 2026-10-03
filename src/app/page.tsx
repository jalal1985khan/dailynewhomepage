'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import MarketBar from '@/components/MarketBar';
import BreakingTicker from '@/components/BreakingTicker';
import HeroLead from '@/components/HeroLead';
import TopStoriesSidebar from '@/components/TopStoriesSidebar';
import OpinionColumn from '@/components/OpinionColumn';
import NewsGrid from '@/components/NewsGrid';
import SearchModal from '@/components/SearchModal';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { Article } from '@/types/news';
import { CATEGORIES, CURATED_NEWS_BY_CATEGORY } from '@/lib/constants';
import { slugify } from '@/lib/utils';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [feedStatus, setFeedStatus] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch news from API route (proxies NewsAPI with curated fallback)
  const loadNews = useCallback(async (cat: string, q: string, silent = false) => {
    if (!silent) setIsLoading(true);
    setFeedStatus('');

    try {
      const params = new URLSearchParams();
      if (cat) params.set('category', cat);
      if (q) params.set('q', q);

      const res = await fetch(`/api/news?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      if (data && Array.isArray(data.articles) && data.articles.length > 0) {
        setArticles(data.articles);
        setLastUpdated(new Date());
        if (data.sourceType === 'fallback') {
          setFeedStatus('Editorial Archive Feed');
        } else {
          setFeedStatus('Live Syndicated Wire');
        }
      } else {
        // Fallback directly if empty
        const fallback = CURATED_NEWS_BY_CATEGORY[cat] || CURATED_NEWS_BY_CATEGORY['general'];
        setArticles(fallback);
        setLastUpdated(new Date());
      }
    } catch (err: any) {
      console.warn('News fetch notice:', err?.message);
      const fallback = CURATED_NEWS_BY_CATEGORY[cat] || CURATED_NEWS_BY_CATEGORY['general'];
      setArticles(fallback);
      setLastUpdated(new Date());
      setFeedStatus('Operating on cached wire.');
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews(activeCategory, searchQuery);

    // Auto-refresh news every 5 minutes in background
    const interval = setInterval(() => {
      loadNews(activeCategory, searchQuery, true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [activeCategory, searchQuery, loadNews]);

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setSearchQuery('');
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('general');
  };

  const handleSelectArticle = (art: Article) => {
    const slug = slugify(art.title);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(`current_article_${slug}`, JSON.stringify(art));
        sessionStorage.setItem('last_selected_article', JSON.stringify(art));
      } catch (e) {
        console.warn('Storage write notice:', e);
      }
    }
    router.push(`/article/${slug}`);
  };

  const handleBreakingStoryClick = (headline: string) => {
    const matching = articles.find((a) => a.title.toLowerCase().includes(headline.toLowerCase().slice(0, 30)));
    if (matching) {
      handleSelectArticle(matching);
    } else if (articles[0]) {
      handleSelectArticle(articles[0]);
    }
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const leadArticle = articles.length > 0 ? articles[0] : null;
  const secondaryArticles = articles.length > 1 ? articles.slice(1, 5) : [];
  const feedArticles = searchQuery ? articles : articles.slice(1);

  // Dynamic NewsArticle JSON-LD for the primary headline
  const primaryArticleJsonLd = leadArticle
    ? {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: leadArticle.title,
      description: leadArticle.description,
      image: [leadArticle.urlToImage || 'https://www.yugsatya.com/logo.png'],
      datePublished: leadArticle.publishedAt,
      dateModified: leadArticle.publishedAt,
      author: [
        {
          '@type': 'Person',
          name: leadArticle.author || leadArticle.source.name,
        },
      ],
      publisher: {
        '@type': 'Organization',
        name: 'YugSatya News',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.yugsatya.com/logo.png',
        },
      },
    }
    : null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {primaryArticleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(primaryArticleJsonLd) }}
        />
      )}

      {/* 1. Header with preserved logo, masthead, & category navigation */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. Global Markets Bar */}
      <MarketBar />

      {/* 3. Live Breaking News Ticker */}
      <BreakingTicker onStoryClick={handleBreakingStoryClick} />

      {/* Main Content Landmark */}
      <main id="main-content" className="container" style={{ flex: 1, paddingTop: '24px' }}>

        {/* Active Query / Notice Strip */}
        {searchQuery && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: '6px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-rule)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ fontSize: '0.9rem' }}>
              Showing filtered results for: <strong style={{ color: 'var(--accent-red)' }}>"{searchQuery}"</strong>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textDecoration: 'underline',
              }}
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Loading State Spinner */}
        {isLoading ? (
          <div
            style={{
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <RefreshCw className="w-8 h-8 text-red-600 animate-spin" />
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              Transmitting verified dispatches across global wires...
            </p>
          </div>
        ) : (
          <>
            {/* Live Wire Sync Status Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                marginBottom: '20px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-rule)',
                borderRadius: '6px',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pulse-dot" style={{ width: '7px', height: '7px' }}></span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)', letterSpacing: '0.04em' }}>
                  {feedStatus || 'LIVE SYNDICATED WIRE'}
                </span>
                <span>•</span>
                <span>
                  {lastUpdated
                    ? `Last updated at ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    : 'Synchronizing...'}
                </span>
                <span style={{ color: 'var(--text-faint)' }}>
                  (Auto-syncs every 5 mins)
                </span>
              </div>

              <button
                onClick={() => loadNews(activeCategory, searchQuery)}
                disabled={isLoading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: 'var(--accent-red)',
                  fontWeight: 700,
                  fontSize: '0.76rem',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-rule)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                title="Fetch latest dispatches from wire"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Now</span>
              </button>
            </div>

            {/* 4. Three-Column Main Editorial Front Page Grid (Only when not searching) */}
            {!searchQuery && leadArticle && (
              <div className="editorial-grid">
                {/* Column 1: The Lead Cover Story */}
                <HeroLead
                  article={leadArticle}
                  onSelect={handleSelectArticle}
                />

                {/* Column 2: Top Stories / The Wire */}
                <TopStoriesSidebar
                  articles={secondaryArticles.length > 0 ? secondaryArticles : [leadArticle]}
                  onSelect={handleSelectArticle}
                />

                {/* Column 3: Opinion Columnists & Analysis */}
                <OpinionColumn
                  onSelectOpinionArticle={handleSelectArticle}
                />
              </div>
            )}

            {/* 5. Category Magazine Feed Grid */}
            <NewsGrid
              articles={feedArticles}
              categoryTitle={activeCategoryObj.label}
              onSelect={handleSelectArticle}
              activeQuery={searchQuery}
            />

            {/* 6. Executive Morning Newsletter Strip */}
            <Newsletter />
          </>
        )}
      </main>

      {/* 7. Comprehensive Newspaper Editorial Footer */}
      <Footer />

      {/* 8. Search Wire Modal Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearchSubmit={handleSearchSubmit}
        articles={articles}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
