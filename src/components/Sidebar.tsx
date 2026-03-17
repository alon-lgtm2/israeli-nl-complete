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
      {/* Most Read */}
      <div className="bg-white rounded-xl border border-[var(--color-border-light)] p-4">
        <h3 className="text-lg font-bold mb-3 pb-2 border-b-2 border-[var(--color-accent)]">
          הנקראים ביותר
        </h3>
        <ol className="space-y-0">
          {articles.slice(0, 5).map((article, index) => (
            <li key={article.slug} className="border-b border-[var(--color-border-light)] last:border-0">
              <Link href={`/article/${article.slug}`} className="flex gap-3 py-3 group">
                <span className="text-2xl font-black text-[var(--color-accent)] opacity-60 w-8 shrink-0 text-center">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold leading-snug group-hover:text-[var(--color-primary-light)] transition-colors line-clamp-2">
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
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] text-white rounded-xl p-4">
        <h3 className="font-bold mb-2">🌤️ מזג האוויר</h3>
        <div className="text-center py-3">
          <div className="text-4xl mb-1">12°C</div>
          <div className="text-sm opacity-80">אמסטרדם</div>
          <div className="text-xs opacity-60 mt-1">מעונן חלקית</div>
        </div>
      </div>

      {/* City Quick Links */}
      <div className="bg-white rounded-xl border border-[var(--color-border-light)] p-4">
        <h3 className="text-lg font-bold mb-3 pb-2 border-b-2 border-[var(--color-primary)]">
          חדשות לפי עיר
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {cityLinks.map((city) => (
            <Link
              key={city.id}
              href={`/city/${city.id}`}
              className="text-sm py-2 px-3 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors text-center"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
