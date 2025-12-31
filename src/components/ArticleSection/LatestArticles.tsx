import ArticleHeader from "./ArticleHeader";
import ArticleSearchBar from "./ArticleSearchBar";
import ArticleCategoryFilter from "./ArticleCategoryFilter";
import ArticleFilterButtons from "./ArticleFilterButtons";

const LatestArticles = () => {
  return (
    <div className="w-[375px] h-[236px] lg:flex lg:flex-col lg:gap-[32px] lg:w-[1200px] lg:h-[144px]">
      {/* Header */}
      <ArticleHeader />
      {/* Mobile Layout: Search and Category Filter stacked */}
      <div className="w-[375px] h-[16px] flex flex-col gap-[16px] bg-brown-200 lg:hidden">
        <ArticleSearchBar />
        <ArticleCategoryFilter />
      </div>
      {/* Desktop Layout: Filter Buttons and Search Bar in row */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:w-[1200px] lg:h-[80px] lg:rounded-[16px] lg:bg-brown-200 lg:px-[24px] lg:py-[16px]">
        <ArticleFilterButtons />
        <div className="flex-1 max-w-[360px]">
          <ArticleSearchBar />
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
