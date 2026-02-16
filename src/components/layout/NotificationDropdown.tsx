import { useNavigate } from "react-router-dom";
import type { NotificationItem } from "../../data/notificationsApi";
import { cn } from "@/lib/utils";

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  isLoading?: boolean;
  onViewAllClick?: () => void;
  /** เรียกเมื่อกด notification item (เช่น ปิดเมนูมือถือ) */
  onNotificationClick?: () => void;
  /** mobile = แสดงในเมนูมือถือ (ไม่มี card shadow) */
  variant?: "desktop" | "mobile";
  className?: string;
}

const getActionText = (n: NotificationItem) => {
  if (n.type === "comment") return "Commented on";
  if (n.type === "like") return "Liked your article";
  if (n.type === "published") return "Published new article";
  return n.action;
};

const NotificationDropdown = ({
  notifications,
  isLoading = false,
  onViewAllClick,
  onNotificationClick,
  variant = "desktop",
  className = "",
}: NotificationDropdownProps) => {
  const navigate = useNavigate();
  const isMobile = variant === "mobile";

  const handleItemClick = (postId: number) => {
    onNotificationClick?.();
    navigate(`/member/post/${postId}`);
  };

  return (
    <div
      className={cn(
        "flex flex-col min-w-[280px] max-w-[360px]",
        isMobile
          ? "bg-transparent shadow-none"
          : "bg-white rounded-[8px] shadow-lg shadow-brown-300/20 border border-brown-200 py-[8px]",
        className
      )}
    >
      {isLoading ? (
        <div className="px-[16px] py-[24px] text-center">
          <span className="text-body-2 text-brown-500">Loading...</span>
        </div>
      ) : notifications.length === 0 ? (
        <div className="px-[16px] py-[24px] text-center">
          <span className="text-body-2 text-brown-500">No notifications</span>
        </div>
      ) : (
        <>
          {/* แสดง 3 รายการ จำกัดความสูง ส่วนที่เหลือ scroll, แต่ละรายการ max 3 บรรทัด (2 บรรทัดเนื้อหา + 1 บรรทัดเวลา) */}
          <ul
            className={cn(
              "flex flex-col overflow-y-auto",
              isMobile ? "gap-[12px] max-h-[calc(3*84px)]" : "max-h-[calc(3*80px)]"
            )}
          >
            {notifications.map((n) => (
              <li key={n.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleItemClick(n.postId)}
                  className={cn(
                    "w-full flex items-start gap-[12px] text-left transition-colors",
                    isMobile
                      ? "px-[12px] py-[8px] rounded-[8px] hover:bg-brown-200"
                      : "px-[16px] py-[12px] hover:bg-brown-50"
                  )}
                >
                  <div className="w-[40px] h-[40px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
                    {n.userAvatar ? (
                      <img
                        src={n.userAvatar}
                        alt={n.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-body-1 text-brown-600 font-medium">
                        {n.userName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-body-1 text-brown-600 line-clamp-2">
                      <span className="font-semibold">{n.userName}</span>{" "}
                      {getActionText(n)}
                      {n.articleTitle && (
                        <>
                          {" "}
                          <span className="font-normal">{n.articleTitle}</span>
                        </>
                      )}
                      .
                    </p>
                    <p className="text-body-2 text-brand-orange mt-[2px]">{n.timestampLabel}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          {onViewAllClick && notifications.length > 0 && (
            <button
              type="button"
              onClick={onViewAllClick}
              className="mt-[8px] px-[16px] py-[8px] text-body-2 text-brand-orange hover:underline text-center w-full"
            >
              View all notifications
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
