import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { buildConnection, HttpTransportType } from "../api/signalrConnection";
import { useAuth } from "../store/AuthContext";
import { useTranslation } from "react-i18next";

export const useNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!user?.token) {
      console.warn("No user token, skipping SignalR connection");
      return;
    }

    // Try LongPolling first (uses Authorization header rather than query)
    let connection = buildConnection(user.token, {
      transport: HttpTransportType.LongPolling,
    });

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");

        // Listen for notifications
        connection.on("notify", (message) => {
          try {
            // Normalize payload
            const notification =
              typeof message === "string" ? JSON.parse(message) : message;

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
      .catch(async (err) => {
        console.error("SignalR Connection Error: ", err);
        // Fallbacks: negotiation default, then WebSockets
        try {
          connection = buildConnection(user.token);
          await connection.start();
        } catch (e1) {
          try {
            connection = buildConnection(user.token, {
              transport: HttpTransportType.WebSockets,
            });
            await connection.start();
          } catch (e2) {
            console.error("SignalR Fallbacks failed:", e1, e2);
            messageApi.error(t("notifications.connectionError"));
          }
        }
      });

    return () => {
      try {
        connection.stop();
      } catch {}
    };
  }, [user?.token, user?.userId, queryClient, messageApi, t]);

  return { contextHolder };
};
