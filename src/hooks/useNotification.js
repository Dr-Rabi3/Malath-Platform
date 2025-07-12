import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import connection from "../api/signalrConnection";
import { useAuth } from "../store/AuthContext";
import { useTranslation } from "react-i18next";

export const useNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!user?.token) {
      console.log("No user token, skipping SignalR connection");
      return;
    }

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");

        // Listen for notifications
        connection.on("notify", (notificationData) => {
          try {
            const notification =
              typeof notificationData === "string"
                ? JSON.parse(notificationData)
                : notificationData;

            console.log("Notification received:", notification);

            // Check if this notification is for the current user
            if (notification.recieverId === user?.userId) {
              // Show a toast notification
              messageApi.success({
                content:
                  notification.title || t("notifications.newNotification"),
                duration: 5,
                key: `notification-${notification.id}`,
              });

              // Invalidate and refetch notifications to update the UI
              queryClient.invalidateQueries(["notifications"]);
            }
          } catch (error) {
            console.error("Error parsing notification data:", error);
          }
        });

        // Listen for connection status
        connection.onreconnecting(() => {
          console.log("SignalR reconnecting...");
        });

        connection.onreconnected(() => {
          console.log("SignalR reconnected");
        });

        connection.onclose(() => {
          console.log("SignalR connection closed");
        });
      })
      .catch((err) => {
        console.error("SignalR Connection Error: ", err);
        messageApi.error(t("notifications.connectionError"));
      });

    return () => {
      if (connection.state === "Connected") {
        connection.stop();
      }
    };
  }, [user?.token, user?.userId, queryClient, messageApi, t]);

  return { contextHolder };
};
