import type { BlogPost, BlogPostsResponse, FetchBlogPostsParams } from "../types/blog";
import type { ApiPost } from "../types/api";
import axios from "axios";
import { apiClient } from "../lib/apiClient";
import { formatDate } from "../utils/dateUtils";
import { fetchCategories } from "./categoriesApi";
import type { CategoryItem } from "./categoriesApi";

/** โครงสร้าง response จาก stack-layer-server GET /posts */
interface ApiPostsResponse {
  data: {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    posts: ApiPost[];
    nextPage: number | null;
  };
}

/** แปลง post จาก API เป็น BlogPost (ใช้ชื่อ category จากรายการ categories) */
const mapApiPostToBlogPost = (
  post: ApiPost,
  categories: CategoryItem[]
): BlogPost => {
  const categoryName =
    categories.find((c) => c.id === post.category_id)?.name ?? "General";
  return {
    id: post.id,
    image: post.image,
    category: categoryName,
    category_id: post.category_id,
    title: post.title,
    description: post.description,
    author: "Thompson P.",
    date: formatDate(post.date),
    likes: post.likes_count ?? 0,
    content: post.content,
    ...(typeof post.is_liked === "boolean" && { is_liked: post.is_liked }),
  };
};

/** ดึงบทความจาก API stack-layer-server (ใช้ categories จาก API สำหรับชื่อและ filter) */
export const fetchBlogPosts = async (
  params?: FetchBlogPostsParams
): Promise<BlogPostsResponse> => {
  try {
    const categories = await fetchCategories();
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }
    const categoryName = params?.category;
    if (categoryName && categoryName !== "All" && categoryName !== "Highlight") {
      const category = categories.find(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (category) {
        queryParams.append("category", category.id.toString());
      }
    }
    if (params?.keyword && params.keyword.trim() !== "") {
      queryParams.append("keyword", params.keyword.trim());
    }

    const url = `/posts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await apiClient.get<ApiPostsResponse>(url);

    const apiData = response.data.data;
    const formattedPosts = apiData.posts.map((post) =>
      mapApiPostToBlogPost(post, categories)
    );

    return {
      totalPosts: apiData.totalPosts,
      totalPages: apiData.totalPages,
      currentPage: apiData.currentPage,
      limit: apiData.limit,
      posts: formattedPosts,
      nextPage: apiData.nextPage,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

/** โครงสร้าง response จาก stack-layer-server GET /posts/:id */
interface ApiPostResponse {
  data: ApiPost | null;
}

/** ดึงบทความเดียวจาก API ตาม ID (ใช้ชื่อ category จาก API) */
export const fetchPostById = async (postId: string): Promise<BlogPost | null> => {
  try {
    const [categories, response] = await Promise.all([
      fetchCategories(),
      apiClient.get<ApiPostResponse>(`/posts/${postId}`),
    ]);

    const post = response.data.data;
    if (!post) {
      return null;
    }

    return mapApiPostToBlogPost(post, categories);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};
