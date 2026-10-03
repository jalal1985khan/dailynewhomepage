'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Moon, Sun, Globe, ShieldCheck, Flame } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

interface HeaderProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  onOpenSearch: () => void;
}

export default function Header({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
}: HeaderProps) {
  const [currentDateStr, setCurrentDateStr] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Format full newspaper date
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDateStr(formatted);

    // Initial theme check
    const savedTheme = localStorage.getItem('yugsatya_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('yugsatya_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header className="site-header" role="banner">
      {/* Top Metadata & Utility Strip */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <Globe className="w-3.5 h-3.5 text-red-600" />
              <strong className="edition-badge">Global Edition</strong>
            </span>
            <span className="top-bar-item" style={{ fontStyle: 'italic' }}>
              {currentDateStr || 'Today\'s Dispatch'}
            </span>
            <span className="top-bar-item" style={{ display: 'none' }}>
              •
            </span>
          </div>

          <div className="top-bar-right">
            <div className="top-bar-item top-bar-protocol" style={{ fontSize: '0.78rem' }}>
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
              <span>Verified Journalism Protocol</span>
            </div>

            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title="Toggle Reading Mode"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3 h-3" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Newspaper Masthead (Logo on Left Side, Text on Right Side) */}
      <div className="main-masthead">
        <div className="container masthead-inner-row">
          {/* Logo on Left Side */}
          <div className="masthead-left-logo">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('general');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="masthead-logo-container"
              aria-label="YugSatya Home"
            >
              <img
                src="/logo.png"
                alt="YugSatya Unified News Publication"
                className="masthead-logo-img"
                width={280}
                height={70}
              />
            </a>
            <div className="masthead-logo-caption">
              Verified Editorial Desk • Global Edition
            </div>
          </div>

          {/* Text on Right Side */}
          <div className="masthead-editorial-meta">
            <span className="masthead-sub-tag">The Journal of Global Record</span>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('general');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'inline-block' }}
            >
              <h2 className="masthead-publication-title">YugSatya International</h2>
            </a>
            <p className="masthead-editorial-motto">
              <span className="motto-accent">VERITAS VINCIT</span> — Independent Investigative Journalism & Global Wire
            </p>
            <div className="masthead-dateline">
              <span>{currentDateStr || 'Today\'s Dispatch'}</span>
              <span className="divider-dot">•</span>
              <span>Vol. CXLII No. 48</span>
              <span className="divider-dot">•</span>
              <span>Universal Time: 24/7 Live Wire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Ribbon (Sticky) */}
      <nav
        className={`nav-ribbon ${scrolled ? 'scrolled' : ''}`}
        aria-label="Publication Sections"
      >
        <div className="container nav-ribbon-inner">
          <div className="category-scroll-container">
            <ul className="category-nav-list" role="menubar">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <li key={cat.id} role="none">
                    <button
                      role="menuitem"
                      onClick={() => {
                        onSelectCategory(cat.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`category-nav-link ${isActive ? 'active' : ''}`}
                    >
                      {cat.label}
                      {cat.badge && (
                        <span
                          style={{
                            marginLeft: '6px',
                            fontSize: '0.62rem',
                            background: 'var(--accent-red)',
                            color: '#fff',
                            padding: '1px 4px',
                            borderRadius: '2px',
                            fontWeight: 800,
                          }}
                        >
                          {cat.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            onClick={onOpenSearch}
            className="nav-search-btn"
            aria-label="Search stories"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="search-btn-label">Search Wire</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
