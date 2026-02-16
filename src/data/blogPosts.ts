import type { BlogPost, BlogPostsResponse, FetchBlogPostsParams } from "../types/blog";
import type { ApiPost } from "../types/api";
import axios from "axios";
import { apiClient } from "../lib/apiClient";
import { formatDate } from "../utils/dateUtils";
import { CATEGORY_ID_TO_NAME, CATEGORY_NAME_TO_ID } from "../constants/categories";

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

/** แปลง post จาก API เป็น BlogPost สำหรับใช้ใน client */
const mapApiPostToBlogPost = (post: ApiPost): BlogPost => ({
  id: post.id,
  image: post.image,
  category: CATEGORY_ID_TO_NAME[post.category_id] ?? "General",
  title: post.title,
  description: post.description,
  author: "Thompson P.",
  date: formatDate(post.date),
  likes: post.likes_count ?? 0,
  content: post.content,
  ...(typeof post.is_liked === "boolean" && { is_liked: post.is_liked }),
});

/** ดึงบทความจาก API stack-layer-server (รองรับ page, limit, category, keyword) */
export const fetchBlogPosts = async (
  params?: FetchBlogPostsParams
): Promise<BlogPostsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }
    if (params?.category && params.category !== "All" && params.category !== "Highlight") {
      const categoryId = CATEGORY_NAME_TO_ID[params.category];
      if (categoryId != null) {
        queryParams.append("category", categoryId.toString());
      }
    }
    if (params?.keyword && params.keyword.trim() !== "") {
      queryParams.append("keyword", params.keyword.trim());
    }

    const url = `/posts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await apiClient.get<ApiPostsResponse>(url);

    const apiData = response.data.data;
    const formattedPosts = apiData.posts.map((post) => mapApiPostToBlogPost(post));

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

/** ดึงบทความเดียวจาก API ตาม ID (GET /posts/:postId) */
export const fetchPostById = async (postId: string): Promise<BlogPost | null> => {
  try {
    const response = await apiClient.get<ApiPostResponse>(`/posts/${postId}`);

    const post = response.data.data;
    if (!post) {
      return null;
    }

    return mapApiPostToBlogPost(post);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};
