import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/data';
import { categories, getCategoryById } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ id: cat.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) return {};

  return {
    title: `${category.label} — חדשות ${category.label}`,
    description: `כל הכתבות בנושא ${category.label} באתר israelis.nl`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  const articles = getArticlesByCategory(id);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <span>{category.label}</span>
        </h1>
        <div className="h-1 w-20 mt-2 rounded" style={{ backgroundColor: category.color }} />
      </div>

      {articles.length === 0 ? (
        <p className="text-[var(--color-text-secondary)] text-center py-12">
          אין כתבות בקטגוריה זו כרגע
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} size="medium" />
          ))}
        </div>
      )}
    </div>
  );
}
