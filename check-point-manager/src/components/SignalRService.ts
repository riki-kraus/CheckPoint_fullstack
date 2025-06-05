// import { useEffect, useRef } from "react";
// import { HubConnectionBuilder, HubConnection, LogLevel } from "@microsoft/signalr";
// interface Notification1 {
//   id: number;
//   title: string;
//   message: string;
//   type: 'info' | 'success' | 'warning' | 'error';
//   timestamp: Date;
//   read: boolean;
//   priority: 'low' | 'medium' | 'high';
// }

// export function useSignalR(onMessage: (message: Notification1) => void, hubUrl: string) {
//   const connectionRef = useRef<HubConnection | null>(null);

//   useEffect(() => {
//     const connection = new HubConnectionBuilder()
//     // .withUrl(hubUrl, {
//     //   withCredentials: true
//     // })
//     .withUrl(hubUrl)
//           .configureLogging(LogLevel.Information)
//       .withAutomaticReconnect()
//       .build();

//     connectionRef.current = connection;

//     connection.start()
//       .then(() => {
//         console.log("SignalR connected");
//       })
//       .catch(err => console.error("SignalR connection error:", err));

//     connection.on("ReceiveNotification", (message: Notification1) => {
//       onMessage(message);
//     });

    
//     // Cleanup
//     return () => {
//       if (connectionRef.current) {
//         connectionRef.current.stop().catch(console.error);
//       }
//     };
//   }, [hubUrl, onMessage]);
// }
import { useEffect, useRef } from "react";
import { HubConnectionBuilder, HubConnection, LogLevel } from "@microsoft/signalr";
import { NotificationService } from "../services/NotificationService";
import { NotificationAdmin } from "../Types";

// interface Notification1 {
//   id: number;
//   title: string;
//   message: string;
//   type: 'info' | 'success' | 'warning' | 'error';
//   timestamp: Date;
//   read: boolean;
//   priority: 'low' | 'medium' | 'high';
// }

export function useSignalR(onMessage: (message: NotificationAdmin) => void, hubUrl: string) {
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    const fetchNotificationsAndSetupConnection = async () => {
      // שליפה ראשונית של כל ההתראות מהשרת
      const data: NotificationAdmin[] = await NotificationService.getAll();
      data.forEach(notification => {
        onMessage(notification);
      });

      // חיבור ל-SignalR
      const connection = new HubConnectionBuilder()
        .withUrl(hubUrl)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      connectionRef.current = connection;

      connection.start()
        .then(() => {
          console.log("✅ SignalR connected");
        })
        .catch(err => console.error("❌ SignalR connection error:", err));

      // האזנה להתראות חדשות
      connection.on("ReceiveNotification", (message: NotificationAdmin) => {
        onMessage(message);
      });
    };

    fetchNotificationsAndSetupConnection();

    // ניקוי חיבור בזמן פירוק
    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(console.error);
      }
    };
  }, [hubUrl, onMessage]);
}
