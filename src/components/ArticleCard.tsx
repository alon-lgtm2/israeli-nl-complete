import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { getCategoryById } from '@/lib/categories';
import { formatHebrewDate, getMunicipalityById } from '@/lib/data';

interface ArticleCardProps {
  article: Article;
  size?: 'large' | 'medium' | 'small';
}

export default function ArticleCard({ article, size = 'medium' }: ArticleCardProps) {
  const category = getCategoryById(article.category);
  const municipality = article.municipality ? getMunicipalityById(article.municipality) : undefined;

  if (size === 'large') {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <article className="relative rounded-xl overflow-hidden bg-gray-900 aspect-[16/9] md:aspect-[21/9]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
            role="img"
            aria-label={article.imageAlt}
          />
          <div className="absolute bottom-0 right-0 left-0 p-4 md:p-8 z-20">
            {category && (
              <span className="category-tag mb-3" style={{ backgroundColor: category.color }}>
                {category.icon} {category.label}
              </span>
            )}
            <h2 className="text-xl md:text-3xl font-black text-white mb-2 leading-tight">
              {article.title}
            </h2>
            <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-3 max-w-2xl">
              {article.summary}
            </p>
            <div className="flex items-center gap-2 text-gray-300 text-xs">
              <Image
                src={article.personaAvatar}
                alt={article.persona}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>{article.persona}</span>
              <span className="mx-1">|</span>
              <span>{formatHebrewDate(article.date)}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (size === 'small') {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <article className="flex gap-3 py-3 border-b border-[var(--color-border-light)]">
          <div className="flex-1 min-w-0">
            {category && (
              <span className="category-tag mb-1 text-[10px]" style={{ backgroundColor: category.color }}>
                {category.label}
              </span>
            )}
            <h3 className="text-sm font-bold leading-snug group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5 text-[var(--color-text-muted)] text-xs">
              <span>{article.persona}</span>
              <span>·</span>
              <span>{formatHebrewDate(article.date)}</span>
            </div>
          </div>
          <div
            className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
            role="img"
            aria-label={article.imageAlt}
          />
        </article>
      </Link>
    );
  }

  // Medium (default)
  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[var(--color-border-light)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
            role="img"
            aria-label={article.imageAlt}
          />
          {category && (
            <span className="absolute top-3 right-3 category-tag" style={{ backgroundColor: category.color }}>
              {category.icon} {category.label}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
            {article.summary}
          </p>
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs">
            <Image
              src={article.personaAvatar}
              alt={article.persona}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span>{article.persona}</span>
            <span>·</span>
            <span>{formatHebrewDate(article.date)}</span>
            {article.municipality && (
              <>
                <span>·</span>
                <span className="text-[var(--color-primary-light)]">📍 {municipality?.nameHe || article.municipality}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
