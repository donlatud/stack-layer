import { apiClient } from "../lib/apiClient";

/** Response from POST/DELETE /posts/:postId/like */
export interface LikeResponse {
  likes_count: number;
  is_liked: boolean;
}

/** Add like (ต้องล็อกอิน). คืน likes_count และ is_liked หลัง like */
export const addLike = async (postId: string): Promise<LikeResponse> => {
  const response = await apiClient.post<{ data: LikeResponse }>(
    `/posts/${postId}/like`
  );
  return response.data.data;
};

/** Remove like (ต้องล็อกอิน). คืน likes_count และ is_liked หลัง unlike */
export const removeLike = async (postId: string): Promise<LikeResponse> => {
  const response = await apiClient.delete<{ data: LikeResponse }>(
    `/posts/${postId}/like`
  );
  return response.data.data;
};
