// // hooks/useNotifications.js
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// export const useNotifications = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const fetchNotifications = async () => {
//     try {
//       const { data } = await axios.get(`${backendURL}/api/notifications/user`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       });
//       setNotifications(data.data);
//       setUnreadCount(data.data.filter((n) => !n.isRead).length);
//     } catch (err) {
//       console.error("Failed to fetch notifications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userInfo?.token) {
//       fetchNotifications();
//     }
//   }, [userInfo?.token]);

//   return { notifications, unreadCount, loading, refresh: fetchNotifications };
// };
// hooks/useNotifications.js
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

export const useNotifications = (roleOverride = null) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine the role: use roleOverride if provided, otherwise fall back to userInfo.role
  const userRole = roleOverride || userInfo?.role || "user";
  const isAdmin = userRole === "admin";
  const endpoint = isAdmin ? "admin" : "user";

  const fetchNotifications = async () => {
    if (!userInfo?.token) {
      setError("No authentication token available");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(
        `${backendURL}/api/notifications/${endpoint}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setNotifications(data.data);
      setUnreadCount(data.data.filter((n) => !n.isRead).length);
    } catch (err) {
      console.error(`Failed to fetch ${endpoint} notifications:`, err);
      setError(
        err.response?.data?.message ||
          `Failed to fetch ${endpoint} notifications`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userInfo?.token, endpoint]); // Re-fetch if token or endpoint changes

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refresh: fetchNotifications,
  };
};
