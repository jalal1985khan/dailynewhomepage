# YugSatya News Publication

An independent global news publication and investigative journalism platform built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**.

Featuring real-time wire syndication via NewsAPI, dynamic article pages, complete SEO metadata (OpenGraph, Twitter Cards, Schema.org JSON-LD), global market barometers, breaking news bulletins, and a responsive editorial design inspired by leading international publications (The New York Times, Financial Times).

---

## Features

- **Next.js 16 App Router & Turbopack**: High-performance server-rendered and client-hydrated pages.
- **Dedicated Article Routes (`/article/[slug]`)**:
  - Individual dynamic article pages with clean, human-readable URLs.
  - Interactive reader toolbar: font sizing adjustments (`A-` / `A` / `A+`), browser print dialog, audio narration player simulation, and social sharing.
  - Dedicated author bylines, editorial dispatches, and related stories.
- **Robust NewsAPI Proxy Route (`/api/news`)**:
  - Secure server-side NewsAPI integration with caching (`revalidate: 300`).
  - Rate-limit protection and seamless fallback to curated editorial archives when offline or without an API key.
- **Comprehensive Technical SEO**:
  - Dynamic OpenGraph and Twitter cards for all stories and sections.
  - Automatic `sitemap.xml`, `robots.txt`, and Web App Manifest (`manifest.webmanifest`).
  - Schema.org structured data (`NewsMediaOrganization`, `NewsArticle`, `WebSite`).
- **Responsive Newspaper Layout**:
  - Classic editorial masthead with publication motto, edition info, and preserved publication logo.
  - Three-column editorial front page: Lead Cover Story, Top Stories sidebar, and Opinion & Essay columns.
  - Live breaking news ticker and financial markets ticker.
  - Fast search modal with instant live wire filtering and trending topic tags.
  - Dark / Light editorial theme modes with persistent user preferences.
  - Fully mobile-responsive across all screen resolutions (smart overflow, touch-momentum category scroller).

---

## Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jalal1985khan/dailynewhomepage.git
   cd dailynewhomepage
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your [NewsAPI.org](https://newsapi.org) API key:
   ```env
   NEWS_API_KEY=your_news_api_key_here
   NEWS_BASE_URL=https://newsapi.org/v2
   NEWS_COUNTRY=us
   ```
   *(Note: The app will automatically run on curated editorial stories if no API key is specified).*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To create an optimized production build:

```bash
npm run build
npm start
```

---

## Project Structure

```
├── public/
│   ├── favicon.svg             # Publication favicon
│   ├── logo.png                # Original YugSatya news logo
│   └── icons/                  # PWA and app manifest icons
├── src/
│   ├── app/
│   │   ├── api/news/route.ts   # NewsAPI server proxy & caching
│   │   ├── article/[slug]/     # Dynamic article routes & reader view
│   │   ├── globals.css         # Typography, layout, and theme tokens
│   │   ├── layout.tsx          # Root layout & global Schema.org metadata
│   │   ├── manifest.ts         # Web App Manifest
│   │   ├── page.tsx            # Main editorial front page
│   │   ├── robots.ts           # Robots.txt generator
│   │   └── sitemap.ts          # XML Sitemap generator
│   ├── components/             # Reusable UI components
│   │   ├── ArticleModal.tsx
│   │   ├── BreakingTicker.tsx  # Live breaking news bulletin
│   │   ├── Footer.tsx          # Editorial publication footer
│   │   ├── Header.tsx          # Masthead, navigation & theme switcher
│   │   ├── HeroLead.tsx        # Front-page cover lead article
│   │   ├── MarketBar.tsx       # Financial indices strip
│   │   ├── NewsGrid.tsx        # Section dispatch grid
│   │   ├── Newsletter.tsx      # Morning briefing signup
│   │   ├── OpinionColumn.tsx   # Voices & analysis essays
│   │   ├── SearchModal.tsx     # Instant wire search overlay
│   │   └── TopStoriesSidebar.tsx # Fast dispatches sidebar
│   ├── lib/
│   │   ├── constants.ts        # Categories, markets, & curated archives
│   │   └── utils.ts            # Slugify & article search helpers
│   └── types/
│       └── news.ts             # TypeScript definitions
└── tsconfig.json
```

---

## License

MIT
