// // components/UserNotificationPage.jsx
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import moment from "moment";
// import {
//   Bell,
//   Check,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Info,
//   AlertTriangle,
// } from "lucide-react";
// import { Alert, AlertDescription } from "../../components/tools/Alert";
// import { useNotifications } from "../../components/Hooks/UseNotifications";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const NotificationIcon = ({ type }) => {
//   const iconProps = { size: 20, className: "shrink-0" };
//   switch (type) {
//     case "success":
//       return <CheckCircle {...iconProps} className="text-green-500" />;
//     case "error":
//       return <XCircle {...iconProps} className="text-red-500" />;
//     case "warning":
//       return <AlertTriangle {...iconProps} className="text-yellow-500" />;
//     default:
//       return <Info {...iconProps} className="text-blue-500" />;
//   }
// };

// const UserNotificationPage = () => {
//   const {
//     notifications: initialNotifications,
//     unreadCount,
//     refresh,
//   } = useNotifications();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDeleteAlert, setShowDeleteAlert] = useState(false);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const { userInfo } = useSelector((state) => state.auth);

//   const axiosConfig = {
//     headers: { Authorization: `Bearer ${userInfo.token}` },
//   };

//   useEffect(() => {
//     setNotifications(initialNotifications);
//     setLoading(false);
//   }, [initialNotifications]);
//   const fetchNotifications = async () => {
//     try {
//       const { data } = await axios.get(
//         `${backendURL}/api/notifications/user`,
//         axiosConfig
//       );
//       setNotifications(data.data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch notifications");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const markAsRead = async (id) => {
//     try {
//       const { data } = await axios.put(
//         `${backendURL}/api/notifications/user/${id}/read`,
//         {},
//         axiosConfig
//       );
//       setNotifications((prev) =>
//         prev.map((notif) => (notif._id === id ? data.data : notif))
//       );
//     } catch (err) {
//       console.error("Error marking as read:", err);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await axios.put(
//         `${backendURL}/api/notifications/user/mark-all-read`,
//         {},
//         axiosConfig
//       );
//       setNotifications((prev) =>
//         prev.map((notif) => ({ ...notif, isRead: true }))
//       );
//     } catch (err) {
//       console.error("Error marking all as read:", err);
//     }
//   };

//   const handleDeleteClick = (notification) => {
//     setSelectedNotification(notification);
//     setShowDeleteAlert(true);
//   };

//   const confirmDelete = async () => {
//     if (!selectedNotification) return;
//     try {
//       await axios.delete(
//         `${backendURL}/api/notifications/user/${selectedNotification._id}`,
//         axiosConfig
//       );
//       setNotifications((prev) =>
//         prev.filter((notif) => notif._id !== selectedNotification._id)
//       );
//       setShowDeleteAlert(false);
//       setSelectedNotification(null);
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   const closeDeleteAlert = () => {
//     setShowDeleteAlert(false);
//     setSelectedNotification(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center p-4">{error}</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3">
//           <Bell className="w-6 h-6 text-blue-500" />
//           <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
//           {notifications.filter((n) => !n.isRead).length > 0 && (
//             <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
//               {notifications.filter((n) => !n.isRead).length}
//             </span>
//           )}
//         </div>
//         {notifications.some((n) => !n.isRead) && (
//           <button
//             onClick={markAllAsRead}
//             className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
//             <Check size={16} />
//             Mark All as Read
//           </button>
//         )}
//       </div>

//       {notifications.length === 0 ? (
//         <div className="text-center text-gray-500 py-12">
//           <Bell size={40} className="mx-auto mb-4 text-gray-400" />
//           <p>No notifications yet</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {notifications.map((notification) => (
//             <div
//               key={notification._id}
//               className={`flex items-start gap-4 p-4 rounded-lg border ${
//                 notification.isRead ? "bg-gray-50" : "bg-blue-50"
//               } hover:shadow-md transition-shadow`}>
//               <NotificationIcon type={notification.type} />
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-800">
//                   {notification.title}
//                 </h3>
//                 <p className="text-gray-600 mt-1">{notification.message}</p>
//                 <span className="text-sm text-gray-500">
//                   {moment(notification.createdAt).fromNow()}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 {!notification.isRead && (
//                   <button
//                     onClick={() => markAsRead(notification._id)}
//                     className="p-2 text-blue-500 hover:bg-blue-100 rounded"
//                     title="Mark as read">
//                     <Check size={16} />
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleDeleteClick(notification)}
//                   className="p-2 text-red-500 hover:bg-red-100 rounded"
//                   title="Delete">
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteAlert && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-md w-full">
//             <h3 className="text-lg font-semibold mb-2 text-red-600">
//               Delete Notification
//             </h3>
//             <AlertDescription className="text-gray-700">
//               Are you sure you want to delete this notification? This action
//               cannot be undone.
//             </AlertDescription>
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 onClick={closeDeleteAlert}
//                 className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium">
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserNotificationPage;
// components/UserNotificationPage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
  Bell,
  Check,
  Trash2,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { AlertDescription } from "../../components/tools/Alert";
import { useNotifications } from "../../components/Hooks/UseNotifications";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const NotificationIcon = ({ type }) => {
  const iconProps = { size: 20, className: "shrink-0" };
  switch (type) {
    case "success":
      return <CheckCircle {...iconProps} className="text-green-500" />;
    case "error":
      return <XCircle {...iconProps} className="text-red-500" />;
    case "warning":
      return <AlertTriangle {...iconProps} className="text-yellow-500" />;
    default:
      return <Info {...iconProps} className="text-blue-500" />;
  }
};

const UserNotificationPage = () => {
  const { notifications, unreadCount, loading, error, refresh } =
    useNotifications(); // No role override, defaults to user role
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  };

  const markAsRead = async (id) => {
    try {
      const { data } = await axios.put(
        `${backendURL}/api/notifications/user/${id}/read`,
        {},
        axiosConfig
      );
      refresh(); // Refresh notifications after marking as read
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${backendURL}/api/notifications/user/mark-all-read`,
        {},
        axiosConfig
      );
      refresh(); // Refresh notifications after marking all as read
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const handleDeleteClick = (notification) => {
    setSelectedNotification(notification);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (!selectedNotification) return;
    try {
      await axios.delete(
        `${backendURL}/api/notifications/user/${selectedNotification._id}`,
        axiosConfig
      );
      setShowDeleteAlert(false);
      setSelectedNotification(null);
      refresh(); // Refresh notifications after deletion
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false);
    setSelectedNotification(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
            <Check size={16} />
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <Bell size={40} className="mx-auto mb-4 text-gray-400" />
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-start gap-4 p-4 rounded-lg border ${
                notification.isRead ? "bg-gray-50" : "bg-blue-50"
              } hover:shadow-md transition-shadow`}>
              <NotificationIcon type={notification.type} />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {notification.title}
                </h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                <span className="text-sm text-gray-500">
                  {moment(notification.createdAt).fromNow()}
                </span>
              </div>
              <div className="flex gap-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                    title="Mark as read">
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(notification)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded"
                  title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full border border-red-200 bg-red-50">
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Delete Notification
            </h3>
            <AlertDescription className="text-gray-700">
              Are you sure you want to delete this notification? This action
              cannot be undone.
            </AlertDescription>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeDeleteAlert}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNotificationPage;
