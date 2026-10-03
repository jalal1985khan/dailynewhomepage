'use client';

import React from 'react';
import { MARKET_INDICES } from '@/lib/constants';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketBar() {
  return (
    <div className="market-strip" aria-label="Global Financial Markets Barometer">
      <div className="container" style={{ overflow: 'hidden' }}>
        <div className="market-strip-track">
          {[...MARKET_INDICES, ...MARKET_INDICES].map((item, idx) => (
            <div key={`${item.symbol}-${idx}`} className="market-item">
              <span className="market-symbol">{item.symbol}</span>
              <span className="market-price">{item.price}</span>
              <span className={`market-change ${item.isPositive ? 'positive' : 'negative'}`}>
                {item.isPositive ? '+' : ''}{item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
