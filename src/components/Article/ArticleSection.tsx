import { useMemo, useState } from "react";
import ArticleHeader from "./header/ArticleHeader";
import ArticleSearchBar from "./search/ArticleSearchBar";
import ArticleCategoryFilter from "./filters/ArticleCategoryFilter";
import ArticleFilterButtons from "./filters/ArticleFilterButtons";
import ArticleGrid from "./grid/ArticleGrid";
import { blogPosts } from "../../data/blogPosts";
import { CATEGORIES } from "../../constants/categories";

const ArticleSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(
    () =>
      blogPosts.filter((post) => {
        // ถ้ามี search query → search จากทั้งหมด (ไม่สน category)
        if (searchQuery.trim() !== "") {
          return (
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // ถ้าไม่มี search query → filter ด้วย category ตามเดิม
        return (
          selectedCategory === CATEGORIES[0] ||
          post.category === selectedCategory
        );
      }),
    [selectedCategory, searchQuery]
  );

  return (
    <section className="w-full pt-[40px] pb-[40px] lg:pt-[60px] lg:pr-[120px] lg:pb-[60px] lg:pl-[120px]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-[24px] lg:gap-[32px]">
        {/* Header */}
        <ArticleHeader />
        {/* Mobile Layout: Search and Category Filter stacked */}
        <div className="flex flex-col gap-[16px] p-[16px] bg-brown-200 lg:hidden">
          <ArticleSearchBar value={searchQuery} onChange={setSearchQuery} />
          <ArticleCategoryFilter
            selectedCategory={selectedCategory}
            onChangeCategory={setSelectedCategory}
          />
        </div>
        {/* Desktop Layout: Filter Buttons and Search Bar in row */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:rounded-[16px] lg:bg-brown-200 lg:px-[24px] lg:py-[16px]">
          <ArticleFilterButtons
            selectedCategory={selectedCategory}
            onChangeCategory={setSelectedCategory}
          />
          <div className="flex-1 max-w-[360px]">
            <ArticleSearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
        {/* Grid */}
        <ArticleGrid posts={filteredPosts} />
      </div>
    </section>
  );
};

export default ArticleSection;
