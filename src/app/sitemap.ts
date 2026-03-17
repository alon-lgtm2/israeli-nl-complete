import { MetadataRoute } from 'next';
import { articles } from '@/lib/data';
import { categories } from '@/lib/categories';
import municipalities from '../../content/municipalities/municipalities.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://israelis.nl';

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.date),
    changeFrequency: 'weekly' as const,
    priority: article.isFeatured ? 1.0 : 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const cityUrls = municipalities.map((m) => ({
    url: `${baseUrl}/city/${m.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...articleUrls,
    ...categoryUrls,
    ...cityUrls,
  ];
}
