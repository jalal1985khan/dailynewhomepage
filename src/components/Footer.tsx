'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/constants';
import { Shield, Rss, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <img
                src="/logo.png"
                alt="YugSatya News Publication"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ lineHeight: 1.6, fontSize: '0.86rem', maxWidth: '320px', marginBottom: '16px' }}>
              YugSatya is an independent global news publication dedicated to verified public interest reporting, forensic macroeconomic analysis, and technological intelligence.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-faint)' }}>
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Trust Project Verified Partner • ISO/IEC 27001 Protocol</span>
            </div>
          </div>

          {/* Editorial Sections */}
          <div>
            <h4 className="footer-col-title">Editorial Sections</h4>
            <ul className="footer-links-list">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a href={`#${cat.id}`} onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ethics & Governance */}
          <div>
            <h4 className="footer-col-title">Standards & Ethics</h4>
            <ul className="footer-links-list">
              <li><a href="#" onClick={(e) => e.preventDefault()}>Editorial Guidelines</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Corrections & Retractions</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Anonymous Whistleblower Drop</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Syndication Rights & Wire API</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy & Disclosures</a></li>
            </ul>
          </div>

          {/* Organization & Wire */}
          <div>
            <h4 className="footer-col-title">Global Bureaus</h4>
            <ul className="footer-links-list" style={{ fontSize: '0.82rem' }}>
              <li><strong>New Delhi:</strong> Media House, Barakhamba Rd</li>
              <li><strong>London:</strong> Fleet Street Press Centre</li>
              <li><strong>New York:</strong> One World Trade Center</li>
              <li style={{ marginTop: '10px' }}>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-red)' }}
                >
                  <Rss className="w-3 h-3" />
                  <span>XML Sitemap & News Feed</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} YugSatya Media Network Inc. All rights reserved. Content may not be republished without written consent.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.8rem',
            }}
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
