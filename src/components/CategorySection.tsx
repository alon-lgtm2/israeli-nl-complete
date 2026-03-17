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
      <div className="flex items-center justify-between mb-4 border-b-2 pb-2" style={{ borderColor: category.color }}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </h2>
        <Link
          href={`/category/${category.id}`}
          className="text-sm font-medium hover:underline"
          style={{ color: category.color }}
        >
          עוד ב{category.label} ←
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} size="medium" />
        ))}
      </div>
    </section>
  );
}
