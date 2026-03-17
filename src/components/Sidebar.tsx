import Link from 'next/link';
import { Article } from '@/types';
import { formatHebrewDate } from '@/lib/data';

interface SidebarProps {
  articles: Article[];
}

const cityLinks = [
  { id: 'amsterdam', name: 'אמסטרדם' },
  { id: 'amstelveen', name: 'אמסטלפיין' },
  { id: 'den-haag', name: 'האג' },
  { id: 'rotterdam', name: 'רוטרדם' },
  { id: 'utrecht', name: 'אוטרכט' },
  { id: 'eindhoven', name: 'איינדהובן' },
];

export default function Sidebar({ articles }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Most Read - Zman.co.il inspired */}
      <div className="bg-white rounded-lg border border-[var(--color-border-light)] overflow-hidden">
        <div className="bg-[var(--color-primary)] text-white px-4 py-3">
          <h3 className="font-extrabold text-lg">הנקראים ביותר</h3>
        </div>
        <ol className="space-y-0">
          {articles.slice(0, 5).map((article, index) => (
            <li key={article.slug} className="border-b border-[var(--color-border-light)] last:border-0">
              <Link href={`/article/${article.slug}`} className="flex gap-3 py-3 px-4 group hover:bg-[var(--color-bg-secondary)] transition-colors">
                <span className="text-2xl font-black text-[var(--color-accent)] w-8 shrink-0 text-center">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <span className="text-xs text-[var(--color-text-muted)] mt-1 block">
                    {formatHebrewDate(article.date)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white rounded-lg p-5">
        <h3 className="font-extrabold mb-3 text-lg">מזג האוויר</h3>
        <div className="text-center py-2">
          <div className="text-5xl font-light mb-1">12°C</div>
          <div className="text-base font-medium opacity-90">אמסטרדם</div>
          <div className="text-sm opacity-60 mt-1">מעונן חלקית</div>
        </div>
      </div>

      {/* City Quick Links */}
      <div className="bg-white rounded-lg border border-[var(--color-border-light)] overflow-hidden">
        <div className="bg-[var(--color-primary)] text-white px-4 py-3">
          <h3 className="font-extrabold text-lg">חדשות לפי עיר</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4">
          {cityLinks.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.id}`}
              className="text-sm font-medium py-2 px-3 bg-[var(--color-bg-tertiary)] rounded hover:bg-[var(--color-primary)] hover:text-white transition-colors text-center"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
