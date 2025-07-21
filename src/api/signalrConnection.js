import * as signalR from "@microsoft/signalr";

let connection = null;

export function createConnection(token) {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_API_BASE_URL}notificationhub`, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
  return connection;
}

export default connection;
