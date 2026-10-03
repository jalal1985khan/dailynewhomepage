'use client';

import React, { useState, useEffect } from 'react';
import { BREAKING_TICKER_ITEMS } from '@/lib/constants';
import { BellRing, ChevronRight } from 'lucide-react';

interface BreakingTickerProps {
  onStoryClick?: (headline: string) => void;
}

export default function BreakingTicker({ onStoryClick }: BreakingTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BREAKING_TICKER_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeHeadline = BREAKING_TICKER_ITEMS[currentIndex];

  return (
    <aside className="breaking-bar" aria-label="Breaking Bulletins">
      <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div className="breaking-label">
          <span className="pulse-dot" aria-hidden="true"></span>
          <span>BREAKING WIRE</span>
        </div>

        <div
          className="breaking-headline-text"
          style={{ flex: 1, cursor: onStoryClick ? 'pointer' : 'default' }}
          onClick={() => onStoryClick && onStoryClick(activeHeadline)}
        >
          {activeHeadline}
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % BREAKING_TICKER_ITEMS.length)}
          style={{
            color: 'var(--text-faint)',
            padding: '2px 6px',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
          aria-label="Next breaking bulletin"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
