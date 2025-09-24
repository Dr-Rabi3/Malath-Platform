import * as signalR from "@microsoft/signalr";

export const { HttpTransportType, LogLevel } = signalR;

export function buildConnection(token, options = {}) {
  const hubPath =
    options.path || import.meta.env.VITE_SIGNALR_HUB_PATH || "notificationhub";
  const url = `${import.meta.env.VITE_API_BASE_URL}${hubPath}`;

  const withUrlOptions = {
    accessTokenFactory: () => token,
  };

  if (options.transport) {
    withUrlOptions.transport = options.transport;
    // Only skip negotiation when explicitly forcing WebSockets
    if (options.transport === signalR.HttpTransportType.WebSockets) {
      withUrlOptions.skipNegotiation = true;
    }
  }

  return new signalR.HubConnectionBuilder()
    .withUrl(url, withUrlOptions)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
}
