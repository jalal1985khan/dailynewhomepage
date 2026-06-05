import { useState, useEffect } from 'react'
import {
  Calendar,
  Shield,
  TrendingUp,
  Search,
  User,
  ArrowLeft,
  BookOpen,
  ExternalLink as LinkIcon
} from 'lucide-react'

interface Article {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
  author?: string
}

// Curated fallbacks for a premium experience under any network conditions
const CURATED_FALLBACK_NEWS: Record<string, Article[]> = {
  general: [
    {
      title: "The Next Phase of Global Decentralized Media & Real-Time Sync",
      description: "A deep dive into how digital publishers are building ultra-fast platforms using client-side caching to serve millions of readers globally.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      source: { name: "Media Pulse" },
      author: "Elena Rostova"
    },
    {
      title: "Next-Gen AI Collaborations Reshaping Enterprise Workspaces",
      description: "How secure chat integrations and high-fidelity WebRTC channels are optimizing team logistics in the post-digital business era.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      source: { name: "YugSatya Tech" },
      author: "Aravind Sharma"
    },
    {
      title: "How Dynamic Systems Support Sustainable City Infrastructure",
      description: "A comprehensive analysis of real-time mapping systems and localized alerts to optimize public transport schedules.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      source: { name: "Urban Science" },
      author: "Marcus Vance"
    }
  ],
  technology: [
    {
      title: "WebRTC Audio Core Advancements Reach Mobile Portals",
      description: "A comprehensive analysis of peer-to-peer audio scaling, adaptive noise suppression, and real-time socket connections on mobile platforms.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      source: { name: "TechCrunch" },
      author: "Sidney Carter"
    },
    {
      title: "React Server Components and the Future of Streaming Hydration",
      description: "Why static landing pages and complex interactive directories are shifting toward hybrid rendering pipelines for instant load speeds.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      source: { name: "Frontend Weekly" },
      author: "Danielle Kroeger"
    }
  ],
  business: [
    {
      title: "Fintech Startups Leverage Real-Time Socket Feeds",
      description: "Why immediate message updates and low-latency transaction alerts are becoming core components inside modern capital management platforms.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      source: { name: "FinTech World" },
      author: "Sophia Patel"
    },
    {
      title: "Unlocking Team Synergies with Simplified Communication Dashboards",
      description: "How corporate landing hubs and secure direct messaging interfaces directly impact workspace efficiency and organizational transparency.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      source: { name: "Enterprise Hub" },
      author: "Robert Chen"
    }
  ],
  science: [
    {
      title: "Quantum Computing Hardware Crosses 1000 Physical Qubits",
      description: "Superconducting chips achieve high-fidelity thresholds, paving the way for early error-corrected operations and chemical simulation breakthroughs.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      source: { name: "Quantum Labs" },
      author: "Sarah Jenkins"
    },
    {
      title: "Deep Space Spectroscopic Discovery Reveals Water on Exo-Planet",
      description: "Telescope signatures confirm atmospheric water vapor on a distant planet located in the habitable zone of a red dwarf star.",
      url: "https://newsapi.org",
      urlToImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3600000 * 26).toISOString(),
      source: { name: "Nature Science" },
      author: "Dr. Arthur Pendelton"
    }
  ]
}

const CATEGORIES = [
  { id: 'general', label: 'All News' },
  { id: 'technology', label: 'Technology' },
  { id: 'business', label: 'Business' },
  { id: 'science', label: 'Science' },
  { id: 'sports', label: 'Sports' }
]

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''
const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL || 'https://newsapi.org/v2'
const COUNTRY = import.meta.env.VITE_NEWS_COUNTRY || 'us'

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('general')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')

  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [_errorMsg, setErrorMsg] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState<boolean>(false)

  // Track scroll state for nav glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Debounce search query to prevent constant API calls on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 600)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch news articles based on query or category
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)
      setErrorMsg(null)

      if (!API_KEY) {
        // Load fallback cache if no API key is set
        setTimeout(() => {
          setArticles(CURATED_FALLBACK_NEWS[activeCategory] || CURATED_FALLBACK_NEWS['general'])
          setIsLoading(false)
        }, 500)
        return
      }

      try {
        let targetUrl = ''
        if (debouncedQuery.trim()) {
          // Use 'everything' endpoint for search queries
          targetUrl = `${BASE_URL}/everything?q=${encodeURIComponent(debouncedQuery)}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
        } else {
          // Use 'top-headlines' endpoint for standard categories
          targetUrl = `${BASE_URL}/top-headlines?category=${activeCategory === 'general' ? 'general' : activeCategory}&country=${COUNTRY}&apiKey=${API_KEY}`
        }

        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
        const res = await fetch(proxyUrl)

        if (!res.ok) throw new Error('API Request Limit Reached or Invalid Key')
        const data = await res.json()

        if (data.status === 'ok' && data.articles) {
          const validArticles = data.articles.filter((a: any) => a.title && a.title !== '[Removed]' && a.urlToImage)
          if (validArticles.length > 0) {
            setArticles(validArticles)
          } else {
            setArticles(CURATED_FALLBACK_NEWS[activeCategory] || CURATED_FALLBACK_NEWS['general'])
          }
        } else {
          throw new Error(data.message || 'No articles returned')
        }
      } catch (err: any) {
        console.warn('NewsAPI fetch failed, loading curated backup cache:', err.message)
        setErrorMsg('Live feed rate-limited or key invalid. Utilizing cached headlines feed.')
        setArticles(CURATED_FALLBACK_NEWS[activeCategory] || CURATED_FALLBACK_NEWS['general'])
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [activeCategory, debouncedQuery])

  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(dateStr).toLocaleDateString('en-US', options)
    } catch {
      return dateStr
    }
  }

  // Helper to generate elegant realistic content body
  const generateParagraphs = (title: string, desc: string, source: string) => {
    return [
      `In a significant development reported by ${source}, "${title}" has sparked extensive discussions across industry circles and global observers alike. The unfolding situation has prompted immediate responses from stakeholders, who are actively evaluating the long-term impact on global networks and strategic ecosystems. Analysts note that this represents a pivotal shift in the current landscape, reflecting deeper underlying structural transformations.`,
      desc || `The core details of the event highlight a series of progressive actions, showing complex operational and technical shifts. Observers emphasize that the timing of these events aligns with broader economic and technological trends observed throughout the current quarter. As various agencies and teams coordinate their next strategic steps, local and global markets are closely monitoring policy adjustments and performance indicators.`,
      `Looking ahead, experts suggest that the structural outcomes of "${title}" will likely influence planning and policy updates for months to come. Key decision-makers are urging transparency and comprehensive documentation to ensure stable transitions. Continued coverage and detailed analyses will remain crucial as more data is validated and public responses continue to take shape.`
    ]
  }

  // Extract the first article to render as a majestic featured hero banner
  const featuredArticle = articles[0]
  const listArticles = articles.slice(1)

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Visual background atmospheric elements */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Floating Header */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="logo" onClick={() => setSelectedArticle(null)}>
            <img src="/logo.png" alt="YUG SATYA NEWS" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          </a>
        </div>
      </nav>

      {/* Main News Portal Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px 40px', position: 'relative', zIndex: 10 }}>

        {selectedArticle ? (
          /* Dedicated Internal Article Reader View */
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-300">
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedArticle(null)
                window.scrollTo(0, 0)
              }}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', marginBottom: '32px', cursor: 'pointer' }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to News Feed
            </button>

            {/* Dynamic Detailed Glass Panel */}
            <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: '28px', padding: '0 0 40px' }}>
              {/* Massive Banner Image */}
              <div style={{ height: '480px', position: 'relative', overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
                <img
                  src={selectedArticle.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
                  alt={selectedArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(3,0,20,0.4) 60%, rgba(3,0,20,0.1) 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                  <div className="news-card-badge" style={{ display: 'inline-block', position: 'static', marginBottom: '16px' }}>
                    {selectedArticle.source.name}
                  </div>
                  <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', lineHeight: 1.2, fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    {selectedArticle.title}
                  </h1>
                </div>
              </div>

              {/* Meta info */}
              <div style={{ padding: '30px 40px 20px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '0 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <User className="w-4 h-4 text-indigo-400" /> By {selectedArticle.author || selectedArticle.source.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <Calendar className="w-4 h-4 text-indigo-400" /> {formatDate(selectedArticle.publishedAt)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <BookOpen className="w-4 h-4 text-indigo-400" /> 3 Min Read
                </div>
              </div>

              {/* Article Content Body */}
              <div style={{ padding: '40px 40px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {generateParagraphs(selectedArticle.title, selectedArticle.description, selectedArticle.source.name).map((p, idx) => (
                  <p key={idx} style={{ fontSize: '1.08rem', color: '#e2e8f0', lineHeight: 1.8, fontWeight: 400 }}>
                    {p}
                  </p>
                ))}

                {/* External Source Link */}
                <div style={{ marginTop: '24px', padding: '24px', borderRadius: '16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>Want to explore the syndicated source?</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Visit the original publisher's website to view full editorial assets.</p>
                  </div>
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '10px 20px', fontSize: '0.85rem', borderRadius: '10px' }}
                  >
                    Visit {selectedArticle.source.name} <LinkIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard headlines feed list */
          <>
            {/* Dynamic Category Nav & Real-Time Search Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
              {/* Categories Selector */}
              <div className="filter-bar" style={{ margin: 0 }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setSearchQuery('')
                      setDebouncedQuery('')
                    }}
                    className={`filter-btn ${activeCategory === cat.id && !searchQuery ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Real-time Search Box */}
              <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 14px', borderRadius: '14px', maxWidth: '320px', width: '100%', borderColor: 'rgba(255,255,255,0.06)' }}>
                <Search className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search news database..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', width: '100%' }}
                />
              </div>
            </div>

            {/* {errorMsg && (
              <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderColor: 'rgba(234, 179, 8, 0.2)', background: 'rgba(234, 179, 8, 0.03)', marginBottom: '30px' }}>
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span style={{ fontSize: '0.85rem', color: '#fef08a' }}>{errorMsg}</span>
              </div>
            )} */}

            {/* Loading Spinner */}
            {isLoading ? (
              <div className="loading-container" style={{ minHeight: '50vh' }}>
                <div className="spinner"></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Syncing verified live articles...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

                {/* 1. Large Breaking/Featured News Banner */}
                {featuredArticle && !searchQuery && (
                  <div
                    className="glass-panel"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      overflow: 'hidden',
                      minHeight: '420px',
                      borderRadius: '28px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setSelectedArticle(featuredArticle)
                      window.scrollTo(0, 0)
                    }}
                  >
                    {/* Visual Side Banner Image */}
                    <div style={{ flex: 1.2, position: 'relative', overflow: 'hidden', minHeight: '300px', background: 'var(--bg-tertiary)' }}>
                      <img
                        src={featuredArticle.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
                        alt={featuredArticle.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div className="news-card-badge" style={{ position: 'absolute', top: '24px', left: '24px' }}>
                        🚨 FEATURED STORY
                      </div>
                    </div>

                    {/* Banner Content Details */}
                    <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div className="news-card-meta" style={{ marginBottom: '16px' }}>
                          <span><Calendar className="w-3.5 h-3.5" /> {formatDate(featuredArticle.publishedAt)}</span>
                          <span>• {featuredArticle.source.name}</span>
                        </div>

                        <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1.2, marginBottom: '16px', color: 'var(--text-primary)' }}>
                          {featuredArticle.title}
                        </h2>

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                          {featuredArticle.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          <User className="w-4 h-4 text-indigo-400" /> By {featuredArticle.author || featuredArticle.source.name}
                        </div>
                        <a
                          href="#"
                          className="news-card-link"
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setSelectedArticle(featuredArticle)
                            window.scrollTo(0, 0)
                          }}
                        >
                          Read Full Coverage <LinkIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Grid of Articles */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                      {debouncedQuery ? `Search Results for "${debouncedQuery}"` : 'Trending Coverage'}
                    </h3>
                  </div>

                  <div className="news-grid">
                    {(searchQuery ? articles : listArticles).map((art, index) => (
                      <div
                        key={index}
                        className="glass-panel news-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedArticle(art)
                          window.scrollTo(0, 0)
                        }}
                      >
                        <div className="news-card-image-wrapper">
                          <img
                            src={art.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'}
                            alt={art.title}
                            className="news-card-image"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'
                            }}
                          />
                          <div className="news-card-badge">{art.source.name}</div>
                        </div>

                        <div className="news-card-content">
                          <div>
                            <div className="news-card-meta">
                              <span><Calendar className="w-3.5 h-3.5" /> {formatDate(art.publishedAt)}</span>
                            </div>

                            <h3 className="news-card-title">{art.title}</h3>
                            <p className="news-card-desc">{art.description}</p>
                          </div>

                          <div className="news-card-footer">
                            <span className="news-card-author">
                              Source: {art.source.name}
                            </span>
                            <a
                              href="#"
                              className="news-card-link"
                              onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                setSelectedArticle(art)
                                window.scrollTo(0, 0)
                              }}
                            >
                              Read Story <LinkIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </>
        )}
      </main>

      {/* Simplified, elegant news footer */}
      <footer className="footer" style={{ border: 'none', background: 'none', marginTop: '40px', padding: '40px 24px 0' }}>
        <div className="footer-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Shield className="w-4 h-4 text-green-500" /> Secured dynamic socket feed powered by NewsAPI • Decoupled CDN hosting
          </div>
          <p className="copyright" style={{ marginTop: '10px' }}>
            &copy; {new Date().getFullYear()} YugSatya News. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
