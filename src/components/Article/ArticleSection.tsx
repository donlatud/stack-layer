import { useEffect, useState, useMemo } from "react";
import ArticleHeader from "./header/ArticleHeader";
import ArticleSearchBar from "./search/ArticleSearchBar";
import ArticleCategoryFilter from "./filters/ArticleCategoryFilter";
import ArticleFilterButtons from "./filters/ArticleFilterButtons";
import ArticleGrid from "./grid/ArticleGrid";
import { fetchBlogPosts } from "../../data/blogPosts";
import { CATEGORIES } from "../../constants/categories";
import { DEFAULT_PAGE } from "../../constants/pagination";
import { buildApiParams, filterPostsBySearch, checkHasMore } from "../../utils/blogUtils";
import type { BlogPost } from "../../types/blog";

/**
 * ArticleSection component - Main container for article listing
 * Manages category filter and search query state
 * Fetches blog posts from API based on selected category and search query
 */
const ArticleSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0] // "Highlight"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [apiPosts, setApiPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [hasMore, setHasMore] = useState<boolean>(false);

  /**
   * Filter posts by search query using useMemo for performance
   * Only re-calculates when apiPosts or searchQuery changes
   */
  const filteredPosts = useMemo(() => {
    return filterPostsBySearch(apiPosts, searchQuery);
  }, [apiPosts, searchQuery]);

  /**
   * Fetches blog posts from API when category or search query changes
   * Resets to page 1 when filter changes
   */
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);
      setCurrentPage(DEFAULT_PAGE);

      try {
        const params = buildApiParams(DEFAULT_PAGE, selectedCategory, searchQuery);
        const response = await fetchBlogPosts(params);

        // Store API posts (may include posts matching description/content)
        setApiPosts(response.posts);
        setHasMore(checkHasMore(response));
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("Failed to load posts. Please try again later.");
        setApiPosts([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [selectedCategory, searchQuery]);

  /**
   * Loads more posts (next page) and appends to existing posts
   */
  const loadMorePosts = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = currentPage + 1;
      // Don't send keyword to API for pagination, filter in client-side instead
      const params = buildApiParams(nextPage, selectedCategory);

      const response = await fetchBlogPosts(params);

      // Append new posts to existing ones
      setApiPosts((prevPosts) => [...prevPosts, ...response.posts]);
      setCurrentPage(nextPage);
      setHasMore(checkHasMore(response));
    } catch (err) {
      console.error("Error loading more posts:", err);
      setError("Failed to load more posts. Please try again later.");
    } finally {
      setIsLoadingMore(false);
    }
  };

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
        {isLoading ? (
          <div className="flex justify-center items-center py-[60px]">
            <p className="text-body-1 text-brown-400">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-[60px]">
            <p className="text-body-1 text-brand-red">{error}</p>
          </div>
        ) : (
          <ArticleGrid
            posts={filteredPosts}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={loadMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
