import { useState, useCallback, useEffect } from "react";
import { fetchNotifications } from "../data/notificationsApi";
import type { NotificationItem } from "../data/notificationsApi";

export interface UseNotificationsOptions {
  /** จำนวนรายการที่ดึง (default 20) */
  limit?: number;
  /** โหลดทันทีเมื่อ mount (default false) */
  autoLoad?: boolean;
}

export interface UseNotificationsReturn {
  notifications: NotificationItem[];
  isLoading: boolean;
  error: string | null;
  /** โหลด/โหลดใหม่ (alias: refetch เพื่อความสม่ำเสมอกับ useFetchList) */
  loadNotifications: () => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Hook สำหรับโหลด notifications (comments, likes, published)
 * ใช้ใน MemberNavBar (โหลดเมื่อเปิด dropdown), AdminNotificationPage (โหลดเมื่อ mount)
 */
export function useNotifications(
  options: UseNotificationsOptions = {}
): UseNotificationsReturn {
  const { limit = 20, autoLoad = false } = options;
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNotifications(limit);
      setNotifications(data);
    } catch {
      setNotifications([]);
      setError("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    if (autoLoad) {
      loadNotifications();
    }
  }, [autoLoad, loadNotifications]);

  return {
    notifications,
    isLoading,
    error,
    loadNotifications,
    refetch: loadNotifications,
  };
}
