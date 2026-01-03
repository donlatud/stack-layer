import ArticleHeader from "./header/ArticleHeader";
import ArticleSearchBar from "./search/ArticleSearchBar";
import ArticleCategoryFilter from "./filters/ArticleCategoryFilter";
import ArticleFilterButtons from "./filters/ArticleFilterButtons";
import ArticleGrid from "./grid/ArticleGrid";

const ArticleSection = () => {
  return (
    <section className="w-full pt-[40px] pb-[40px] lg:pt-[60px] lg:pr-[120px] lg:pb-[60px] lg:pl-[120px]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[24px] lg:gap-[32px]">
        {/* Header */}
        <ArticleHeader />
        {/* Mobile Layout: Search and Category Filter stacked */}
        <div className="flex flex-col gap-[16px] p-[16px] bg-brown-200 lg:hidden">
          <ArticleSearchBar />
          <ArticleCategoryFilter />
        </div>
        {/* Desktop Layout: Filter Buttons and Search Bar in row */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:rounded-[16px] lg:bg-brown-200 lg:px-[24px] lg:py-[16px]">
          <ArticleFilterButtons />
          <div className="flex-1 max-w-[360px]">
            <ArticleSearchBar />
          </div>
        </div>
        {/* Grid */}
        <ArticleGrid />
      </div>
    </section>
  );
};

export default ArticleSection;
