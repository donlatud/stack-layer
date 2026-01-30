import type { BlogPostsResponse, FetchBlogPostsParams } from "../types/blog";
import axios from "axios";

const API_BASE_URL = "https://blog-post-project-api.vercel.app";

/** แปลง ISO date เป็น "11 September 2024" */
export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

/** ดึงบทความจาก API (รองรับ page, limit, category, keyword) และ format วันที่ */
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
      queryParams.append("category", params.category);
    }
    if (params?.keyword && params.keyword.trim() !== "") {
      queryParams.append("keyword", params.keyword.trim());
    }

    const url = `${API_BASE_URL}/posts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await axios.get<BlogPostsResponse>(url);
    
    // Format dates in the response
    const formattedPosts = response.data.posts.map((post) => ({
      ...post,
      date: formatDate(post.date),
    }));

    return {
      ...response.data,
      posts: formattedPosts,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};
