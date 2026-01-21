import AdminLayout from "../../components/admin/AdminLayout";

/**
 * AdminNotificationPage component - Notification page for admin
 * Desktop-only page with notification list
 */
const AdminNotificationPage = () => {
  // TODO: Replace with actual data from API
  const notifications = [
    {
      id: 1,
      userName: "Jacob Leah",
      action: "Commented on your article",
      articleTitle: "The fascinating world of Corgi: Why We Love Our Furry Friends",
      comment: "I loved this article! It really explains why my soul is so independent, yet loving. The pawing smile was super interesting.",
      timestamp: "a month ago",
    },
    {
      id: 2,
      userName: "Jacob Leah",
      action: "liked your article",
      articleTitle: "The Fascinating World of Corgi: Why We Love Our Furry Friends",
      timestamp: "a month ago",
    },
  ];

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
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className="py-[32px] pr-[32px] border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start gap-[16px]">
                {/* Avatar */}
                <div className="w-[48px] h-[48px] rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                  <span className="text-body-1 text-white font-medium">
                    {notification.userName.charAt(0)}
                  </span>
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-body-1 text-brown-600 mb-[4px]">
                    <span className="font-semibold">{notification.userName}</span>{" "}
                    <span className="font-semibold">{notification.action}</span>
                    {": "}
                    <span className="italic">{notification.articleTitle}</span>
                  </p>
                  {notification.comment && (
                    <p className="text-body-2 text-brown-500 mb-[8px]">{notification.comment}</p>
                  )}
                  <p className="text-body-2 text-brand-orange">{notification.timestamp}</p>
                </div>

                {/* View Button */}
                <button
                  type="button"
                  className="ml-[16px] text-body-2 text-brown-600 underline underline-offset-4 hover:text-brand-red transition-colors shrink-0"
                >
                  View
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationPage;
