import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticlesByMunicipality, municipalities, getMunicipalityById } from '@/lib/data';
import ArticleCard from '@/components/ArticleCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return municipalities.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const municipality = getMunicipalityById(id);
  if (!municipality) return {};

  return {
    title: `חדשות ${municipality.nameHe}`,
    description: `חדשות ועדכונים מ${municipality.nameHe} (${municipality.nameNl}) לקהילה הישראלית`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { id } = await params;
  const municipality = getMunicipalityById(id);
  if (!municipality) notFound();

  const articles = getArticlesByMunicipality(id);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black">
          📍 חדשות {municipality.nameHe}
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          <bdi dir="ltr">{municipality.nameNl}</bdi> · {municipality.region}
        </p>
        <div className="h-1 w-20 mt-2 rounded bg-[var(--color-primary)]" />
      </div>

      {articles.length === 0 ? (
        <p className="text-[var(--color-text-secondary)] text-center py-12">
          אין כתבות על {municipality.nameHe} כרגע
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
