import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchNotifications, type NotificationItem } from "../../data/notificationsApi";

/**
 * หน้าการแจ้งเตือน (Admin)
 * แสดงรายการ: comments, likes, published จาก API จริง
 */
const AdminNotificationPage = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNotifications(50);
        setNotifications(data);
      } catch {
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleView = (postId: number) => {
    navigate(`/member/post/${postId}`);
  };

  const getActionText = (n: NotificationItem) => {
    if (n.type === "comment") return "Commented on";
    if (n.type === "like") return "Liked your article";
    if (n.type === "published") return "Published new article";
    return n.action;
  };

  return (
    <AdminLayout activeItem="notification">
      <div className="w-full h-full bg-brown-100 p-[40px]">
        {/* Header */}
        <div className="-mx-[40px] border-b border-gray-200">
          <header className="flex items-center px-[40px] h-[96px]">
            <h1 className="text-headline-3 text-brown-600">Notification</h1>
          </header>
        </div>

        {/* Notification List */}
        <section className="max-w-[1160px] pl-[32px] pt-[20px]">
          {isLoading ? (
            <p className="text-body-2 text-brown-500 py-[24px]">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-body-2 text-brown-500 py-[24px]">No notifications yet.</p>
          ) : (
            notifications.map((notification) => (
              <article
                key={notification.id}
                className="py-[32px] pr-[32px] border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-start gap-[16px]">
                  {/* Avatar */}
                  <div className="w-[48px] h-[48px] rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
                    {notification.userAvatar ? (
                      <img
                        src={notification.userAvatar}
                        alt={notification.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-body-1 text-brown-600 font-medium">
                        {notification.userName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-body-1 text-brown-600 mb-[4px]">
                      <span className="font-semibold">{notification.userName}</span>{" "}
                      <span className="font-semibold">{getActionText(notification)}</span>
                      {notification.articleTitle && (
                        <>
                          {": "}
                          <span className="italic">{notification.articleTitle}</span>
                        </>
                      )}
                    </p>
                    {notification.comment && (
                      <p className="text-body-2 text-brown-500 mb-[8px]">{notification.comment}</p>
                    )}
                    <p className="text-body-2 text-brand-orange">{notification.timestampLabel}</p>
                  </div>

                  {/* View Button */}
                  <button
                    type="button"
                    onClick={() => handleView(notification.postId)}
                    className="ml-[16px] text-body-2 text-brown-600 underline underline-offset-4 hover:text-brand-red transition-colors shrink-0"
                  >
                    View
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationPage;
