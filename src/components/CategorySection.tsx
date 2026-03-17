import Link from 'next/link';
import { Article } from '@/types';
import { Category } from '@/types';
import ArticleCard from './ArticleCard';

interface CategorySectionProps {
  category: Category;
  articles: Article[];
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 pb-2 border-b-3" style={{ borderColor: category.color }}>
        <h2 className="text-xl font-extrabold flex items-center gap-2 text-[var(--color-text)]">
          <span className="text-2xl">{category.icon}</span>
          <span>{category.label}</span>
        </h2>
        <Link
          href={`/category/${category.id}`}
          className="text-sm font-bold hover:underline flex items-center gap-1"
          style={{ color: category.color }}
        >
          כל הכתבות
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} size="medium" />
        ))}
      </div>
    </section>
  );
}
