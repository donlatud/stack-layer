import { apiClient } from "../lib/apiClient";

export interface NotificationItem {
  id: string;
  type: "comment" | "like" | "published";
  userName: string;
  userAvatar: string | null;
  action: string;
  articleTitle: string;
  postId: number;
  comment?: string;
  createdAt: string | null;
  timestampLabel: string;
}

export interface NotificationsResponse {
  data: NotificationItem[];
}

/** ดึงรายการ notifications (comments, likes, published) */
export const fetchNotifications = async (limit = 20): Promise<NotificationItem[]> => {
  const response = await apiClient.get<NotificationsResponse>("/notifications", {
    params: { limit },
  });
  return response.data.data ?? [];
};
