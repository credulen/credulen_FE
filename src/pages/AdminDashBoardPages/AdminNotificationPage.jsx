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
import Spinner from "../../components/tools/Spinner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const NotificationIcon = ({ type }) => {
  const iconProps = { size: 20, className: "shrink-0" };
  switch (type) {
    case "success":
      return <CheckCircle {...iconProps} className="text-secondary-500" />;
    case "error":
      return <XCircle {...iconProps} className="text-primary-500" />;
    case "warning":
      return <AlertTriangle {...iconProps} className="text-yellow-500" />;
    default:
      return <Info {...iconProps} className="text-primary-500" />;
  }
};

const AdminNotificationPage = () => {
  const { notifications, unreadCount, loading, error, refresh } =
    useNotifications("admin"); // Override role to "admin"
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  };

  const markAsRead = async (id) => {
    try {
      const { data } = await axios.put(
        `${backendURL}/api/notifications/admin/${id}/read`,
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
        `${backendURL}/api/notifications/admin/mark-all-read`,
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
        `${backendURL}/api/notifications/admin/${selectedNotification._id}`,
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
    return <Spinner />;
  }

  if (error) {
    return <div className="text-primary-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-primary-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-primary-500">
            Admin Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-sm">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-primary-500 rounded hover:bg-primary-600">
            <Check size={16} />
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-primary-500 py-12">
          <Bell size={40} className="mx-auto mb-4 text-primary-200" />
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex items-start gap-4 p-4 rounded-lg border-l-4 transition-shadow ${
                notification.isRead
                  ? "bg-neutral-50 border border-neutral-200 border-l-neutral-500"
                  : "bg-primary-50 border border-primary-200 border-l-4 border-l-primary-500 shadow-sm"
              } hover:shadow-md`}>
              <NotificationIcon type={notification.type} />

              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    notification.isRead
                      ? "text-neutral-900"
                      : "text-primary-900"
                  }`}>
                  {notification.title}
                </h3>
                <p
                  className={`mt-1 ${
                    notification.isRead
                      ? "text-neutral-500"
                      : "text-primary-500"
                  }`}>
                  {notification.message}
                </p>

                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-neutral-500">
                    {moment(notification.createdAt).fromNow()}
                  </span>

                  {notification.type === "info" && (
                    <span className="text-xs bg-secondary-50 text-secondary-900 px-2 py-1 rounded">
                      Payment Event
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification._id)}
                    className="p-2 text-primary-500 hover:bg-primary-50 rounded"
                    title="Mark as read">
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(notification)}
                  className="p-2 text-error-500 hover:bg-error-50 rounded"
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
          <div className="bg-white p-6 rounded-lg max-w-md w-full border border-neutral-200">
            <h3 className="text-lg font-semibold mb-2 text-error-600">
              Delete Notification
            </h3>
            <AlertDescription className="text-neutral-500">
              Are you sure you want to delete this notification? This action
              cannot be undone.
            </AlertDescription>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeDeleteAlert}
                className="px-4 py-2 rounded bg-neutral-50 hover:bg-neutral-200 text-neutral-900 font-medium">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-error-500 hover:bg-error-600 text-white font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationPage;
