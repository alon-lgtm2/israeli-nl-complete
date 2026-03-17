import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { articles, getArticleBySlug, getRelatedArticles, formatHebrewDate, estimateReadingTime } from '@/lib/data';
import { getCategoryById } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';
import ShareButtons from '@/components/ShareButtons';
import { renderMarkdown } from '@/lib/markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      locale: 'he_IL',
      images: [{ url: article.imageUrl, alt: article.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryById(article.category);
  const related = getRelatedArticles(article, 3);
  const readingTime = estimateReadingTime(article.body);
  const articleUrl = `https://israelis.nl/article/${article.slug}`;

  const bodyHtml = renderMarkdown(article.body);

  return (
    <article className="max-w-[800px] mx-auto px-4 py-6">
      <div className="bg-white rounded-lg p-6 md:p-8 border border-[var(--color-border-light)]">
      {/* Category Tag */}
      {category && (
        <Link href={`/category/${category.id}`}>
          <span className="category-tag mb-4 inline-flex" style={{ backgroundColor: category.color }}>
            {category.label}
          </span>
        </Link>
      )}

      {/* Headline */}
      <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4 mt-3 text-[var(--color-primary-dark)]">
        {article.title}
      </h1>

      {/* Summary */}
      <p className="text-lg text-[var(--color-text-secondary)] mb-4 leading-relaxed">
        {article.summary}
      </p>

      {/* Meta line */}
      <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b-2 border-[var(--color-primary)]">
        <div className="flex items-center gap-2">
          <Image
            src={article.personaAvatar}
            alt={article.persona}
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <span className="font-bold text-sm text-[var(--color-primary)]">{article.persona}</span>
            <div className="text-xs text-[var(--color-text-muted)]">
              {formatHebrewDate(article.date)} | {readingTime} דקות קריאה
            </div>
          </div>
        </div>

        <span className="text-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] px-2.5 py-1 rounded-full border border-[var(--color-border)]">
          AI | בפיקוח עורך
        </span>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.imageUrl})` }}
          role="img"
          aria-label={article.imageAlt}
        />
      </div>
      {article.imageCredit && (
        <p className="text-xs text-[var(--color-text-muted)] -mt-4 mb-6">
          צילום: {article.imageCredit}
        </p>
      )}

      {/* Article Body */}
      <div
        className="article-body max-w-[680px]"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      {/* AI Disclosure */}
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 my-8">
        <p className="text-sm text-[var(--color-text-secondary)]">
          <span className="font-bold">🤖 גילוי נאות:</span> {article.aiDisclosure}
        </p>
      </div>

      {/* Sources */}
      {article.sources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3">מקורות</h2>
          <ul className="space-y-2">
            {article.sources.map((source, i) => (
              <li key={i}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-primary-light)] hover:underline flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Share */}
      <div className="border-t border-[var(--color-border)] pt-4 mb-4">
        <ShareButtons title={article.title} url={articleUrl} />
      </div>
      </div>{/* end white card */}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-extrabold mb-4 pb-2 border-b-3 border-[var(--color-primary)]">כתבות נוספות</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} size="medium" />
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            description: article.summary,
            image: article.imageUrl,
            datePublished: article.date,
            dateModified: article.updatedAt || article.date,
            author: {
              '@type': 'Person',
              name: article.persona,
            },
            publisher: {
              '@type': 'Organization',
              name: 'israelis.nl',
            },
          }),
        }}
      />
    </article>
  );
}
