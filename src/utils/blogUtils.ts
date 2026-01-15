import type { BlogPost, FetchBlogPostsParams } from "../types/blog";
import { SPECIAL_CATEGORIES, POSTS_PER_PAGE } from "../constants/pagination";

/**
 * Builds API parameters for fetching blog posts
 * @param page - Page number
 * @param category - Selected category
 * @param keyword - Search keyword (optional)
 * @returns API parameters object
 */
export const buildApiParams = (
  page: number,
  category: string,
  keyword?: string
): FetchBlogPostsParams => {
  const params: FetchBlogPostsParams = {
    page,
    limit: POSTS_PER_PAGE,
  };

  // Add category parameter if not a special category
  if (!SPECIAL_CATEGORIES.includes(category as typeof SPECIAL_CATEGORIES[number])) {
    params.category = category;
  }

  // Add keyword parameter if provided
  if (keyword?.trim()) {
    params.keyword = keyword.trim();
  }

  return params;
};

/**
 * Filters posts by search query (searches in title and description)
 * @param posts - Array of blog posts
 * @param searchQuery - Search query string
 * @returns Filtered array of blog posts
 */
export const filterPostsBySearch = (
  posts: BlogPost[],
  searchQuery: string
): BlogPost[] => {
  if (!searchQuery.trim()) return posts;

  const query = searchQuery.toLowerCase().trim();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
  );
};

/**
 * Checks if there are more posts to load
 * @param response - API response
 * @returns Boolean indicating if there are more posts
 */
export const checkHasMore = (response: {
  nextPage: number | null;
  currentPage: number;
  totalPages: number;
  posts: BlogPost[];
  limit: number;
}): boolean => {
  return (
    response.nextPage !== null &&
    response.currentPage < response.totalPages &&
    response.posts.length >= response.limit
  );
};
