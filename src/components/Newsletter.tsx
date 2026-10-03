'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-banner" aria-label="Newsletter Subscription">
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.74rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent-red)',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Daily Executive Briefing
        </span>

        <h3 className="newsletter-title">The Morning Dispatch</h3>

        <p className="newsletter-desc">
          Receive our curated editorial analysis, macroeconomic wire briefings, and investigative reports delivered directly to your inbox every morning at 06:00 UTC.
        </p>

        {subscribed ? (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '4px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              fontWeight: 600,
              fontSize: '0.92rem',
            }}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Thank you. Your morning dispatch subscription has been confirmed.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your executive email address..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              aria-label="Email address for news dispatch"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe Free
            </button>
          </form>
        )}

        <div style={{ marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
          No promotional spam. Zero tracking cookies. Unsubscribe at any time with one click.
        </div>
      </div>
    </section>
  );
}
