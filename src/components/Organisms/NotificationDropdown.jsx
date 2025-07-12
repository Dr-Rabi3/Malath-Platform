import { useState, useEffect } from "react";
import { Badge, Dropdown, List, Avatar, Button, message } from "antd";
import { BellOutlined, CheckOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllNotifications, markNotificationAsRead } from "../../api/http";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";

function NotificationDropdown() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch notifications
  const {
    data: allNotifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(user?.token),
    enabled: !!user?.token,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // 10 seconds
  });

  // Filter notifications for current user
  const userNotifications =
    allNotifications?.filter(
      (notification) => notification.recieverId === user?.userId
    ) || [];

  // Calculate unread notifications for current user
  const unreadCount =
    userNotifications?.filter((notification) => !notification.isRead)?.length ||
    0;

  // Handle notification click
  const handleNotificationClick = async (notification) => {
    try {
      // Mark notification as read if it's not already read
      if (!notification.isRead) {
        await markNotificationAsRead(user?.token, [notification.id]);

        // Invalidate and refetch notifications to update the UI
        await queryClient.invalidateQueries(["notifications"]);

        messageApi.success(t("notifications.markedAsRead"));
      }

      // You can add additional logic here to navigate to related content
      console.log("Notification clicked:", notification);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      messageApi.error(t("notifications.errorMarkingAsRead"));
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = userNotifications.filter(
        (notification) => !notification.isRead
      );

      if (unreadNotifications.length === 0) {
        messageApi.info(t("notifications.noUnreadNotifications"));
        return;
      }

      // Get all unread notification IDs
      const unreadNotificationIds = unreadNotifications.map(
        (notification) => notification.id
      );

      // Mark all unread notifications as read in a single API call
      await markNotificationAsRead(user?.token, unreadNotificationIds);

      // Invalidate and refetch notifications to update the UI
      await queryClient.invalidateQueries(["notifications"]);

      messageApi.success(t("notifications.allMarkedAsRead"));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      messageApi.error(t("notifications.errorMarkingAllAsRead"));
    }
  };

  const notificationItems = [
    {
      key: "header",
      label: (
        <div className="flex justify-between items-center p-2 border-b">
          <span className="font-semibold text-gray-900">
            {t("notifications.title")}
          </span>
          {unreadCount > 0 && (
            <Button
              type="link"
              size="small"
              onClick={handleMarkAllAsRead}
              className="text-blue-600 hover:text-blue-700"
            >
              {t("notifications.markAllAsRead")}
            </Button>
          )}
        </div>
      ),
    },
    {
      key: "notifications",
      label: (
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">
                {t("notifications.loading")}
              </p>
            </div>
          ) : error ? (
            <div className="p-4 text-center">
              <p className="text-sm text-red-500">
                {t("notifications.errorLoading")}
              </p>
            </div>
          ) : userNotifications && userNotifications.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={userNotifications}
              renderItem={(notification) => (
                <List.Item
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<BellOutlined />}
                        className={`${
                          !notification.isRead ? "bg-blue-500" : "bg-gray-400"
                        }`}
                      />
                    }
                    title={
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-sm ${
                            !notification.isRead ? "font-semibold" : ""
                          }`}
                        >
                          {notification.title || t("notifications.noTitle")}
                        </span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    }
                    description={
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400">
                          {notification.createdAt
                            ? new Date(notification.createdAt).toLocaleString()
                            : t("notifications.unknownDate")}
                        </p>
                        {notification.userServiceId && (
                          <p className="text-xs text-blue-600">
                            {t("notifications.serviceId")}:{" "}
                            {notification.userServiceId}
                          </p>
                        )}
                        {notification.recieverId && (
                          <p className="text-xs text-gray-500">
                            {t("notifications.receiverId")}:{" "}
                            {notification.recieverId}
                          </p>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <div className="p-4 text-center">
              <BellOutlined className="text-gray-400 text-2xl mb-2" />
              <p className="text-sm text-gray-500">
                {t("notifications.noNotifications")}
              </p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{ items: notificationItems }}
        placement="bottomRight"
        trigger={["click"]}
        open={open}
        onOpenChange={setOpen}
        overlayClassName="notification-dropdown"
      >
        <Badge count={unreadCount} size="small" className="cursor-pointer">
          <Button
            type="text"
            icon={<BellOutlined className="text-lg" />}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
          />
        </Badge>
      </Dropdown>
    </>
  );
}

export default NotificationDropdown;
