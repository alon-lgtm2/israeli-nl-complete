import { getFeaturedArticle, getBreakingNews, getLatestArticles, getArticlesByCategory } from '@/lib/data';
import { getCategoryById } from '@/lib/categories';
import BreakingNews from '@/components/BreakingNews';
import ArticleCard from '@/components/ArticleCard';
import CategorySection from '@/components/CategorySection';
import Sidebar from '@/components/Sidebar';
import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  const featured = getFeaturedArticle();
  const breaking = getBreakingNews();
  const latest = getLatestArticles(16);

  const netherlandsIsrael = getArticlesByCategory('netherlands-israel');
  const community = getArticlesByCategory('community');
  const municipal = getArticlesByCategory('municipal');
  const culture = getArticlesByCategory('culture');
  const politics = getArticlesByCategory('politics');
  const housing = getArticlesByCategory('housing');
  const sport = getArticlesByCategory('sport');

  const categoryNI = getCategoryById('netherlands-israel')!;
  const categoryCommunity = getCategoryById('community')!;
  const categoryMunicipal = getCategoryById('municipal')!;
  const categoryCulture = getCategoryById('culture')!;
  const categorySport = getCategoryById('sport')!;

  const secondary = latest.filter((a) => !a.isFeatured).slice(0, 4);

  return (
    <>
      <BreakingNews articles={breaking} />

      <div className="max-w-[1280px] mx-auto px-4 py-6">
        {/* Hero Section */}
        {featured && (
          <section className="mb-6">
            <ArticleCard article={featured} size="large" />
          </section>
        )}

        {/* Secondary Stories Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

            {/* Newsletter inline */}
            <div className="mb-10" id="newsletter">
              <Newsletter />
            </div>

            {community.length > 0 && (
              <CategorySection category={categoryCommunity} articles={community} />
            )}

            {/* Sports Section */}
            {sport.length > 0 && (
              <CategorySection category={categorySport} articles={sport} />
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
            <Sidebar articles={[...politics, ...housing, ...netherlandsIsrael, ...sport].slice(0, 10)} />
          </div>
        </div>
      </div>
    </>
  );
}
