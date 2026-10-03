import { Article, CategoryOption, MarketIndex } from '@/types/news';

export const CATEGORIES: CategoryOption[] = [
  { id: 'general', label: 'Top Stories', slug: 'general', description: 'Major global headlines and essential investigative reporting' },
  { id: 'world', label: 'World Affairs', slug: 'world', description: 'Geopolitics, diplomatic treaties, and international developments' },
  { id: 'technology', label: 'Tech & AI', slug: 'technology', description: 'Artificial intelligence, quantum hardware, computing and silicon', badge: 'HOT' },
  { id: 'business', label: 'Business & Markets', slug: 'business', description: 'Global macroeconomics, trade, capital ventures, and monetary policy' },
  { id: 'science', label: 'Science & Space', slug: 'science', description: 'Planetary exploration, deep space physics, genomics, and green energy' },
  { id: 'health', label: 'Health & Bio', slug: 'health', description: 'Medical research, clinical breakthroughs, and public health policy' },
  { id: 'sports', label: 'Sports', slug: 'sports', description: 'Global championships, league tournaments, and athletic achievements' },
  { id: 'opinion', label: 'Opinion & Analysis', slug: 'opinion', description: 'Thought leadership, editorial columns, and investigative essays' },
];

export const MARKET_INDICES: MarketIndex[] = [
  { symbol: 'S&P 500', name: 'S&P 500', price: '5,864.67', change: '+0.42%', isPositive: true },
  { symbol: 'NASDAQ', name: 'Nasdaq Composite', price: '18,518.61', change: '+0.83%', isPositive: true },
  { symbol: 'DOW', name: 'Dow Jones', price: '42,313.00', change: '-0.15%', isPositive: false },
  { symbol: 'FTSE 100', name: 'FTSE 100', price: '8,248.84', change: '+0.21%', isPositive: true },
  { symbol: 'BTC/USD', name: 'Bitcoin', price: '$68,420.00', change: '+2.94%', isPositive: true },
  { symbol: 'BRENT', name: 'Crude Oil', price: '$74.29', change: '-0.88%', isPositive: false },
  { symbol: 'GOLD', name: 'Gold Oz', price: '$2,735.10', change: '+0.36%', isPositive: true },
];

export const BREAKING_TICKER_ITEMS: string[] = [
  'GLOBAL SUMMIT: Leaders finalize landmark multilateral accord on cross-border artificial intelligence safety protocols',
  'FINANCIAL MARKETS: Central banks signal synchronized rate adjustments as quarterly inflation indicators stabilize',
  'SPACE EXPLORATION: Deep-space optical telescope identifies complex prebiotic atmospheric signatures on distant exoplanet',
  'CLEAN ENERGY: Next-generation solid-state battery architecture achieves commercial scale manufacturing milestone',
  'GEOPOLITICS: Maritime trade lanes reopen along key straits following maritime safety resolution',
];

export const EDITORIAL_OPINIONS = [
  {
    id: 'op-1',
    author: 'Dr. Aris Thorne',
    role: 'Senior Fellow, Geopolitical Security',
    title: 'The Great Semiconductor Realignment: Why Sovereign Computing Dictates 21st-Century Power',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    readTime: '5 min read'
  },
  {
    id: 'op-2',
    author: 'Elena Rostova',
    role: 'Chief Economics Columnist',
    title: 'De-dollarization Myths vs Realities: The True State of Global Currency Reserves',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    readTime: '4 min read'
  },
  {
    id: 'op-3',
    author: 'Marcus Sterling',
    role: 'Science & Bioethics Correspondent',
    title: 'Synthetic Biology Has Crossed Its Rubicon. Are Regulatory Guardrails Ready?',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    readTime: '6 min read'
  }
];

export const CURATED_NEWS_BY_CATEGORY: Record<string, Article[]> = {
  general: [
    {
      id: 'gen-1',
      title: 'Global Coalition Unveils Framework for Cross-Border Quantum Security & Real-Time Sync',
      description: 'Diplomats and lead cryptographers from 38 nations have ratified a unified treaty mandating post-quantum encryption standards across telecommunications backbones and critical sovereign infrastructure.',
      content: 'In a historic gathering in Geneva, delegates confirmed that all major tier-1 telecommunications operators must integrate post-quantum lattice cryptography by 2028. The accord comes after consecutive breakthroughs in fault-tolerant quantum error mitigation, making legacy RSA algorithms vulnerable earlier than previously projected.\n\nKey architects of the treaty highlighted that financial institutions and energy grids will receive direct federal funding to transition their cryptographic suites. Industry leaders described the transition as the most significant cybersecurity upgrade since the initial commercialization of the internet.',
      url: 'https://yugsatya.com/article/global-quantum-security-framework',
      urlToImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      source: { name: 'YugSatya Global Desk' },
      author: 'Vikramaditya Sen & Sarah Jenkins',
      category: 'general',
      readTime: '5 min read',
      isBreaking: true,
      isExclusive: true
    },
    {
      id: 'gen-2',
      title: 'Autonomous Clean Energy Supergrids Link Four Continents with Ultra-High-Voltage DC',
      description: 'A coalition of energy syndicates has commenced testing on transcontinental subsea HVDC interconnectors designed to shuttle surplus solar and offshore wind power with minimal transmission loss.',
      content: 'The breakthrough interconnection system utilizes superconducting carbon composite conduits to deliver high-capacity electrical current across 3,500 nautical miles. Early telemetry indicates transmission efficiency exceeding 96.8 percent.\n\n"We are entering an epoch where localized renewable intermittency is resolved by planetary-scale diurnal distribution," declared chief project engineer Maria Santos.',
      url: 'https://yugsatya.com/article/clean-energy-supergrids-interconnectors',
      urlToImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      source: { name: 'Energy Intelligence' },
      author: 'Alistair Campbell',
      category: 'general',
      readTime: '4 min read'
    },
    {
      id: 'gen-3',
      title: 'Global Trade Corridors Adopt Autonomous Digital Customs to Settle Bilateral Cargo in Seconds',
      description: 'Major sea ports across Asia and Europe have transitioned to unified zero-knowledge customs processing, slashing vessel port-wait times from four days to under 45 minutes.',
      content: 'Automated manifests powered by verifiable cryptographic proofs are eliminating paper bills of lading. Harbor masters report zero regulatory compliance disputes since the phase-one rollout commenced last month.',
      url: 'https://yugsatya.com/article/digital-customs-maritime-revolution',
      urlToImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
      source: { name: 'Maritime Herald' },
      author: 'Kavita Rao',
      category: 'general',
      readTime: '3 min read'
    },
    {
      id: 'gen-4',
      title: 'Urban Architecture Embraces Passive Geothermal Cooling for High-Density Metropolises',
      description: 'City planning authorities in Tokyo, Paris, and Mumbai mandate subterranean heat exchangers in all new commercial developments to mitigate the urban heat island effect.',
      content: 'By circulating chilled subterranean water through building foundations, structures can reduce mechanical HVAC energy consumption by up to 58 percent while lowering ambient street-level temperatures.',
      url: 'https://yugsatya.com/article/passive-geothermal-architecture',
      urlToImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
      source: { name: 'Urban Design Quarterly' },
      author: 'Kenji Takahashi',
      category: 'general',
      readTime: '4 min read'
    },
    {
      id: 'gen-5',
      title: 'The Great Demographic Shift: How Extended Healthy Lifespans Are Reshaping Pension Models',
      description: 'Actuarial tables undergo historic revisions as preventative biological therapies dramatically reduce chronic age-related disabilities in OECD populations.',
      content: 'With active productive life expectancies climbing steadily, economists urge modernization of mandatory retirement thresholds toward flexible hybrid advisory arrangements.',
      url: 'https://yugsatya.com/article/demographic-shift-pension-modernization',
      urlToImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
      source: { name: 'Demographic Review' },
      author: 'Claire Dufresne',
      category: 'general',
      readTime: '6 min read'
    }
  ],
  technology: [
    {
      id: 'tech-1',
      title: 'Neuromorphic Optical Processors Break Exaflop Barrier at One-Tenth Power Consumption',
      description: 'Semiconductor researchers fabricate 3D photonic silicon circuits capable of running trillion-parameter inference entirely on light-guided waveguides.',
      content: 'By replacing copper interconnects with micro-ring optical resonators, the new architecture bypasses traditional capacitive thermal throttles, heralding desktop-class multi-modal reasoning clusters.',
      url: 'https://yugsatya.com/article/photonic-neuromorphic-computing-breakthrough',
      urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      source: { name: 'Silicon Spectrum' },
      author: 'David Zhang',
      category: 'technology',
      readTime: '4 min read',
      isExclusive: true
    },
    {
      id: 'tech-2',
      title: 'Web Standards Body Finalizes Universal Native Peer-to-Peer Data Fabric Specs',
      description: 'Next-generation browser specifications introduce low-latency edge-native mesh routing, decentralizing heavy real-time video and audio synchronization without central relay bottlenecks.',
      content: 'W3C and IETF working groups have voted to ratify WebTransport 2.0 with integrated QUIC multipath steering, delivering microsecond failover for collaborative web platforms.',
      url: 'https://yugsatya.com/article/universal-p2p-browser-data-fabric',
      urlToImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      source: { name: 'TechPulse Standard' },
      author: 'Siddharth Nair',
      category: 'technology',
      readTime: '3 min read'
    },
    {
      id: 'tech-3',
      title: 'Open Autonomous Agents Reach Production Deployment Across Financial Auditing & Tax',
      description: 'Accounting consortiums deploy verified self-auditing agent swarms that reconcile multi-jurisdictional tax filings and supply chains continuously in real time.',
      content: 'Independent studies reveal a 94 percent reduction in reporting discrepancies, freeing human financial analysts to focus on risk strategy and long-term liquidity planning.',
      url: 'https://yugsatya.com/article/autonomous-agents-audit-revolution',
      urlToImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      source: { name: 'Enterprise Computing' },
      author: 'Rachel Gallagher',
      category: 'technology',
      readTime: '5 min read'
    }
  ],
  business: [
    {
      id: 'biz-1',
      title: 'Sovereign Wealth Funds Rebalance $2.4 Trillion into Deep Tech & Decarbonization Assets',
      description: 'Major state investment funds orchestrate coordinated capital reallocation toward domestic semiconductor fabs, fusion prototypes, and critical mineral processing centers.',
      content: 'The strategic tilt marks an end to passive index concentration in favor of capital-intensive industrial modernization projects capable of weathering geopolitical volatility.',
      url: 'https://yugsatya.com/article/sovereign-wealth-funds-deep-tech-pivot',
      urlToImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
      source: { name: 'Financial Chronicle' },
      author: 'Nathaniel Sterling',
      category: 'business',
      readTime: '5 min read'
    },
    {
      id: 'biz-2',
      title: 'Global Supply Chains Diversify with Nearshoring Hubs Across Central America and South Asia',
      description: 'Multinational manufacturers establish dual-source production ecosystems, mitigating maritime vulnerability and accelerating port-to-market cycles.',
      content: 'Data reveals cross-border direct investments have doubled in industrial corridors offering clean baseload hydro and geothermal power alongside skilled technical labor.',
      url: 'https://yugsatya.com/article/supply-chains-nearshoring-surge',
      urlToImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
      source: { name: 'Global Commerce Digest' },
      author: 'Priya Mahajan',
      category: 'business',
      readTime: '4 min read'
    }
  ],
  science: [
    {
      id: 'sci-1',
      title: 'Orbital Telescope Spectrometry Confirms Atmospheric Biosignatures on Exoplanet K2-18b',
      description: 'Astronomical analysis detects definitive molecular absorption bands for dimethyl sulfide and water vapor in the temperate envelope of a sub-Neptune super-Earth.',
      content: 'The peer-reviewed findings, gathered over 180 observation cycles, represent the strongest non-terrestrial biological indicators ever documented in astrophysics history.',
      url: 'https://yugsatya.com/article/biosignatures-confirmed-exoplanet-k2-18b',
      urlToImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      source: { name: 'Astrophysical Review' },
      author: 'Dr. Arthur Pendelton',
      category: 'science',
      readTime: '5 min read',
      isBreaking: true
    },
    {
      id: 'sci-2',
      title: 'Targeted Epigenetic Reprogramming Demonstrates Systemic Reversal of Cellular Senescence',
      description: 'Translational biologists successfully restore muscular regeneration and cognitive plasticity in non-human primate trials via pulsatile Yamanaka factor activation.',
      content: 'The study avoided teratoma formation by deploying lipid nanoparticle carriers that deliver transient mRNA payloads exclusively to stressed senescent cell clusters.',
      url: 'https://yugsatya.com/article/epigenetic-reprogramming-cellular-reversal',
      urlToImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      source: { name: 'Nature Biology' },
      author: 'Dr. Meera Nambiar',
      category: 'science',
      readTime: '6 min read'
    }
  ],
  world: [
    {
      id: 'wld-1',
      title: 'Multilateral Oceanic Treaty Protects 30% of High Seas with Autonomous Drone Surveillance',
      description: 'Ratified by 92 coastal and inland states, the treaty deploys solar-powered autonomous maritime patrol vessels to enforce marine sanctuary boundaries.',
      content: 'Commercial fishing vessels will transmit real-time acoustic telemetry to international monitoring centers, effectively curbing illegal unmonitored dredging in coral biodiversity zones.',
      url: 'https://yugsatya.com/article/multilateral-oceanic-treaty-sanctuaries',
      urlToImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
      source: { name: 'World Diplomatic Review' },
      author: 'Henrik Vanger',
      category: 'world',
      readTime: '4 min read'
    }
  ],
  health: [
    {
      id: 'hlth-1',
      title: 'Universal Inhaled mRNA Vaccine Confers Sterilizing Immunity Against Respiratory Viruses',
      description: 'Phase III clinical trials demonstrate that mucosal mucosal-targeting sprays trigger localized IgA antibodies, preventing viral transmission before cellular entry.',
      content: 'Public health agencies herald the room-temperature stable formulation as a transformative tool for rapid containment of emerging seasonal pathogens.',
      url: 'https://yugsatya.com/article/universal-mucosal-mrna-vaccine',
      urlToImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      source: { name: 'Lancet Medical Gazette' },
      author: 'Dr. Tariq Al-Mansoor',
      category: 'health',
      readTime: '4 min read'
    }
  ],
  sports: [
    {
      id: 'spt-1',
      title: 'Global Athletics Federation Adopts High-Speed Computer Vision for Millisecond Track Officiating',
      description: 'Next-generation 1000-fps stereoscopic cameras eliminate boundary disputes and false start ambiguities at the World Athletics Championships.',
      content: 'Athletes praised the instant millimeter precision, which reduced protest review delays to under five seconds without disrupting stadium momentum.',
      url: 'https://yugsatya.com/article/computer-vision-athletics-officiating',
      urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 190).toISOString(),
      source: { name: 'Sports Tribune' },
      author: 'Marcus Vance',
      category: 'sports',
      readTime: '3 min read'
    }
  ],
  opinion: [
    {
      id: 'opn-1',
      title: 'The Algorithmization of Truth: Why Independent Investigative Journalism Must Endure',
      description: 'In an era saturated by automated synthesis and content farms, on-the-ground human observation and verified forensic sourcing remain irreplaceable civil pillars.',
      content: 'The digital public sphere was promised as an equalizing town square. Instead, engagement-maximizing algorithms reward outrage amplification over patient truth-seeking. True investigative work requires feet on cobblestones, eyes on unredacted ledgers, and protection for whistleblowers.',
      url: 'https://yugsatya.com/article/algorithmization-of-truth-editorial',
      urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80',
      publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      source: { name: 'YugSatya Editorial Board' },
      author: 'Editorial Board',
      category: 'opinion',
      readTime: '7 min read'
    }
  ]
};
