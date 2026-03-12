/** โครงสร้างบทความหนึ่งรายการ */
export interface BlogPost {
  id: number;
  image: string;
  category: string;
  /** category_id จาก API ใช้ตอนโหลดบทความเพื่อแก้ไข (match กับ dropdown) */
  category_id?: number;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  content: string;
  /** มีเมื่อดึงจาก API พร้อม auth (GET /posts/:id) */
  is_liked?: boolean;
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

/** query params สำหรับดึงบทความ (page, limit, category, keyword) */
export interface FetchBlogPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}
