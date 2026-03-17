'use client';

import Link from 'next/link';
import { Article } from '@/types';

interface BreakingNewsProps {
  articles: Article[];
}

export default function BreakingNews({ articles }: BreakingNewsProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-[var(--color-breaking)] text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center">
        <span className="bg-white text-[var(--color-breaking)] font-bold text-xs px-3 py-1.5 shrink-0 my-1">
          מבזקים
        </span>
        <div className="overflow-hidden flex-1 mr-3">
          <div className="flex gap-12 animate-[ticker_30s_linear_infinite] whitespace-nowrap">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="text-sm font-medium hover:underline inline-block"
              >
                {article.title}
              </Link>
            ))}
            {/* Duplicate for seamless loop */}
            {articles.map((article) => (
              <Link
                key={`dup-${article.slug}`}
                href={`/article/${article.slug}`}
                className="text-sm font-medium hover:underline inline-block"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
