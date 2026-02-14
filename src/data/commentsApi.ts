import { apiClient } from "../lib/apiClient";
import { formatDateTime } from "./blogPosts";

/** โครงสร้าง comment จาก API */
export interface ApiComment {
  id: number;
  post_id: number;
  user_id: string;
  comment_text: string;
  created_at: string;
  user_name: string;
  user_profile_pic: string | null;
}

/** รูปแบบ comment สำหรับแสดงใน UI (ตรงกับ CommentList / CommentItem) */
export interface CommentItem {
  id: number;
  user_id: string;
  avatar: string;
  name: string;
  date: string;
  content: string;
}

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=0";

function mapApiCommentToItem(row: ApiComment): CommentItem {
  return {
    id: row.id,
    user_id: row.user_id,
    avatar: row.user_profile_pic?.trim() || DEFAULT_AVATAR,
    name: row.user_name || "User",
    date: formatDateTime(row.created_at),
    content: row.comment_text,
  };
}

/** ดึงรายการ comment ของโพสต์ */
export const fetchComments = async (postId: string): Promise<CommentItem[]> => {
  const response = await apiClient.get<{ data: ApiComment[] }>(
    `/posts/${postId}/comments`
  );
  return (response.data.data || []).map(mapApiCommentToItem);
};

/** ส่ง comment ใหม่ (ต้องล็อกอิน). คืน comment ที่สร้างแล้วในรูปแบบ UI */
export const createComment = async (
  postId: string,
  comment_text: string
): Promise<CommentItem> => {
  const response = await apiClient.post<{ data: ApiComment }>(
    `/posts/${postId}/comments`,
    { comment_text: comment_text.trim() }
  );
  return mapApiCommentToItem(response.data.data);
};

/** ลบ comment (เฉพาะเจ้าของ) */
export const deleteComment = async (commentId: number): Promise<void> => {
  await apiClient.delete(`/comments/${commentId}`);
};
