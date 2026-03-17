import { getFeaturedArticle, getBreakingNews, getLatestArticles, getArticlesByCategory } from '@/lib/data';
import { getCategoryById } from '@/lib/categories';
import BreakingNews from '@/components/BreakingNews';
import ArticleCard from '@/components/ArticleCard';
import CategorySection from '@/components/CategorySection';
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  const featured = getFeaturedArticle();
  const breaking = getBreakingNews();
  const latest = getLatestArticles(10);

  const netherlandsIsrael = getArticlesByCategory('netherlands-israel');
  const community = getArticlesByCategory('community');
  const municipal = getArticlesByCategory('municipal');
  const culture = getArticlesByCategory('culture');
  const politics = getArticlesByCategory('politics');
  const housing = getArticlesByCategory('housing');

  const categoryNI = getCategoryById('netherlands-israel')!;
  const categoryCommunity = getCategoryById('community')!;
  const categoryMunicipal = getCategoryById('municipal')!;
  const categoryCulture = getCategoryById('culture')!;

  const secondary = latest.filter((a) => !a.isFeatured).slice(0, 4);

  return (
    <>
      <BreakingNews articles={breaking} />

      <div className="max-w-[1280px] mx-auto px-4 py-6">
        {/* Hero Section */}
        {featured && (
          <section className="mb-8">
            <ArticleCard article={featured} size="large" />
          </section>
        )}

        {/* Secondary Stories */}
        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondary.map((article) => (
              <ArticleCard key={article.slug} article={article} size="medium" />
            ))}
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {netherlandsIsrael.length > 0 && (
              <CategorySection category={categoryNI} articles={netherlandsIsrael} />
            )}
            {community.length > 0 && (
              <CategorySection category={categoryCommunity} articles={community} />
            )}
            {municipal.length > 0 && (
              <CategorySection category={categoryMunicipal} articles={municipal} />
            )}
            {culture.length > 0 && (
              <CategorySection category={categoryCulture} articles={culture} />
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 shrink-0">
            <Sidebar articles={[...politics, ...housing, ...netherlandsIsrael].slice(0, 10)} />
          </div>
        </div>
      </div>
    </>
  );
}
