/**
 * BlogPost interface - Type definition for blog post data
 * Defines the structure of a blog post object
 */
export interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  content: string;
}

/**
 * API Response interface for blog posts
 */
export interface BlogPostsResponse {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  posts: BlogPost[];
  nextPage: number | null;
}

/**
 * Query parameters for fetching blog posts
 */
export interface FetchBlogPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}
