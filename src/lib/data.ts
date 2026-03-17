import { Article, Persona, Municipality } from '@/types';
import articlesData from '../../content/articles/articles.json';
import personasData from '../../content/personas/personas.json';
import municipalitiesData from '../../content/municipalities/municipalities.json';

export const articles: Article[] = articlesData as Article[];
export const personas: Persona[] = personasData as Persona[];
export const municipalities: Municipality[] = municipalitiesData as Municipality[];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles
    .filter((a) => a.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticlesByMunicipality(municipality: string): Article[] {
  return articles
    .filter((a) => a.municipality === municipality)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.isFeatured);
}

export function getBreakingNews(): Article[] {
  return articles.filter((a) => a.isBreaking);
}

export function getLatestArticles(count: number = 10): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getPersonaByName(name: string): Persona | undefined {
  return personas.find((p) => p.hebrewName === name);
}

export function getMunicipalityById(id: string): Municipality | undefined {
  return municipalities.find((m) => m.id === id);
}

export function getRelatedArticles(article: Article, count: number = 4): Article[] {
  return articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function formatHebrewDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  return `${date.getDate()} ב${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
