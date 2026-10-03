import { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yugsatya.com';
  const currentDate = new Date().toISOString();

  const categoryEntries = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/?category=${cat.id}`,
    lastModified: currentDate,
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'always' as const,
      priority: 1.0,
    },
    ...categoryEntries,
  ];
}
