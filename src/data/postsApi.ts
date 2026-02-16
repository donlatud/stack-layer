import { apiClient } from "../lib/apiClient";
import { CATEGORY_ID_TO_NAME, CATEGORY_NAME_TO_ID, STATUS_ID_TO_NAME } from "../constants/categories";

/** โครงสร้าง post จาก API สำหรับ Admin list */
export interface AdminPostItem {
  id: number;
  title: string;
  category: string;
  status: string;
}

/** โครงสร้าง post จาก API (stack-layer-server) */
interface ApiPost {
  id: number;
  image: string;
  category_id: number;
  title: string;
  description: string;
  date: string;
  content: string;
  status_id: number;
  likes_count?: number;
}

/** body สำหรับ create/update post */
export interface CreatePostBody {
  title: string;
  image: string;
  category_id: number;
  description: string;
  content: string;
  status_id: number;
}

/** ดึงรายการบทความสำหรับ Admin (limit สูงเพื่อโชว์ทั้งหมด) */
export const fetchAdminPosts = async (): Promise<AdminPostItem[]> => {
  const response = await apiClient.get<{ data: { posts: ApiPost[] } }>(
    "/posts?page=1&limit=100"
  );
  const posts = response.data.data.posts;

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    category: CATEGORY_ID_TO_NAME[post.category_id] ?? "General",
    status: STATUS_ID_TO_NAME[post.status_id] ?? "Draft",
  }));
};

/** สร้างบทความใหม่ (JSON body) */
export const createPost = async (body: CreatePostBody): Promise<void> => {
  await apiClient.post("/posts", body);
};

/** สร้างบทความใหม่ด้วยไฟล์รูป (multipart/form-data) — backend อัปโหลดไป Supabase */
export const createPostWithFile = async (formData: FormData): Promise<void> => {
  await apiClient.post("/posts", formData);
};

/** แก้ไขบทความ (JSON body) */
export const updatePost = async (postId: string, body: CreatePostBody): Promise<void> => {
  await apiClient.put(`/posts/${postId}`, body);
};

/** แก้ไขบทความด้วยไฟล์รูป (multipart/form-data) — backend อัปโหลดไป Supabase */
export const updatePostWithFile = async (postId: string, formData: FormData): Promise<void> => {
  await apiClient.put(`/posts/${postId}`, formData);
};

/** ลบบทความ */
export const deletePost = async (postId: string): Promise<void> => {
  await apiClient.delete(`/posts/${postId}`);
};

/** รูป placeholder เมื่อยังไม่มี URL */
export const PLACEHOLDER_IMAGE = "https://placehold.co/800x400?text=Thumbnail";

/**
 * แปลง form values เป็น CreatePostBody
 * @param categoryOrId - ชื่อหมวดหมู่ (string) หรือ category_id (number) จาก API
 */
export const toCreatePostBody = (
  title: string,
  imageUrl: string,
  categoryOrId: string | number,
  description: string,
  content: string,
  statusId: number
): CreatePostBody => {
  const categoryId =
    typeof categoryOrId === "number"
      ? categoryOrId
      : CATEGORY_NAME_TO_ID[categoryOrId];
  if (categoryId == null) {
    throw new Error(`Invalid category: ${categoryOrId}`);
  }
  return {
    title,
    image: imageUrl,
    category_id: categoryId,
    description,
    content,
    status_id: statusId,
  };
};
