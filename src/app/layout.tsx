import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfbf9' },
    { media: '(prefers-color-scheme: dark)', color: '#090a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.yugsatya.com'),
  title: {
    default: 'YugSatya | Global News Publication & Investigative Journalism',
    template: '%s | YugSatya News',
  },
  description:
    'YugSatya is an independent global news publication providing verified 24/7 breaking news, macroeconomic analysis, frontier technology reporting, and in-depth investigations.',
  applicationName: 'YugSatya News',
  authors: [{ name: 'YugSatya Editorial Board', url: 'https://www.yugsatya.com' }],
  generator: 'Next.js',
  keywords: [
    'news',
    'breaking news',
    'world news',
    'investigative journalism',
    'technology news',
    'global economy',
    'markets',
    'science',
    'YugSatya',
    'independent news publication',
    'geopolitics',
    'business news',
    'editorial commentary',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'YugSatya Media Network',
  publisher: 'YugSatya News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.yugsatya.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.yugsatya.com',
    siteName: 'YugSatya News',
    title: 'YugSatya | Global News Publication & Investigative Journalism',
    description:
      'Verified global and local live news feeds, forensic economic telemetry, and investigative reporting across technology, science, and world affairs.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'YugSatya News Publication Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YugSatya | Global News Publication & Investigative Journalism',
    description:
      'Verified global and local live news feeds, forensic economic telemetry, and investigative reporting.',
    site: '@YugSatya',
    creator: '@YugSatya',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.png',
  },
  manifest: '/manifest.webmanifest',
  category: 'news',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org Structured Data for NewsMediaOrganization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'YugSatya News',
    legalName: 'YugSatya Media Network Inc.',
    url: 'https://www.yugsatya.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.yugsatya.com/logo.png',
      width: 600,
      height: 120,
    },
    sameAs: [
      'https://twitter.com/YugSatya',
      'https://facebook.com/YugSatyaNews',
      'https://linkedin.com/company/yugsatya',
    ],
    publishingPrinciples: 'https://www.yugsatya.com/standards',
    ethicsPolicy: 'https://www.yugsatya.com/ethics',
    correctionsPolicy: 'https://www.yugsatya.com/corrections',
    diversityPolicy: 'https://www.yugsatya.com/diversity',
    foundingDate: '2024',
    knowsAbout: [
      'Breaking News',
      'Macroeconomics',
      'Artificial Intelligence',
      'Geopolitics',
      'Quantum Computing',
      'Global Trade',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main news content
        </a>
        {children}
      </body>
    </html>
  );
}
