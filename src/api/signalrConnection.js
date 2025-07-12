import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/notificationhub", {
    accessTokenFactory: () => {
      // Return your token here if you’re using JWT Auth
      return localStorage.getItem("access_token") || "";
    },
  })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default connection;
