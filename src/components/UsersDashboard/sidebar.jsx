import React, { useState, useEffect, useRef } from "react";
import { HiOutlineLogout, HiMenu, HiX } from "react-icons/hi";
import { VscDashboard } from "react-icons/vsc";
import { IoPerson } from "react-icons/io5";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { fetchProfileById } from "../../features/Users/userAction";
import { FaHistory } from "react-icons/fa";
import { useNotifications } from "../../components/Hooks/UseNotifications";
import { HiOutlineUserCircle, HiOutlineSearch, HiUsers } from "react-icons/hi";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const sidebarRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const { profile, loading, success, error } = useSelector(
    (state) => state.profiles
  );
  const { unreadCount } = useNotifications();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileById(userId));
    }
  }, [dispatch, userId]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarLinks = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/DashBoard/profile", icon: IoPerson, label: "Profile" },
    ...(userInfo?.role === "agent"
      ? [
          {
            path: "/DashBoard/referals",
            icon: HiUsers,
            label: "My Referals",
          },
        ]
      : []),
    {
      path: "/DashBoard/Activities",
      icon: FaHistory,
      label: "Activity Log",
    },
    {
      path: "/DashBoard/Notifications",
      icon: IoMdNotificationsOutline,
      label: "Notifications",
      showBadge: true,
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-md p-4 flex items-center justify-between ${
          isSmallScreen ? "" : "hidden"
        } border-b border-primary-200`}>
        <div className="flex items-center">
          <span className="mb-2">
            {profile?.data?.image ? (
              <img
                src={`${profile?.data?.image}`}
                alt={`${userInfo.username}`}
                className="w-7 h-7 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.png";
                }}
              />
            ) : (
              <FaUserCircle className="w-7 h-7 text-primary-500 mr-4 cursor-pointer" />
            )}
          </span>
          <span className="mb-1 mr-2 font-medium text-xs text-primary-900">
            {profile?.data?.username || "Guest"}
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-primary-600 p-2 rounded-md focus:outline-none hover:bg-primary-50 transition-colors duration-200">
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-900 text-white transition-all duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          ${isSmallScreen ? "top-16" : "top-0"}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-primary-800">
            <h1 className="text-2xl font-bold mb-1 text-white">Credulen</h1>
            <p className="text-sm text-primary-200 mb-6">
              {userInfo.role === "agent" ? "Agent DashBoard" : "User DashBoard"}
            </p>
            {!isSmallScreen && (
              <div className="flex items-center">
                <span className="mb-2">
                  {profile?.data?.image ? (
                    <img
                      src={`${profile?.data?.image}`}
                      alt={`${userInfo.username}`}
                      className="w-7 h-7 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback-image.png";
                      }}
                    />
                  ) : (
                    <FaUserCircle className="w-7 h-7 text-primary-200 mr-4 cursor-pointer" />
                  )}
                </span>
                <span className="mb-1 mr-2 font-extralight text-xs text-primary-200">
                  {profile?.data?.username || "Guest"}
                </span>
              </div>
            )}
          </div>

          <nav className="flex-grow overflow-y-auto">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => isSmallScreen && setIsOpen(false)}
                className={`flex items-center justify-between px-5 py-3 text-sm transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-primary-500 text-white"
                    : "hover:bg-primary-500 hover:text-secondary-500"
                }`}>
                <div className="flex items-center">
                  <link.icon className="w-5 h-5 mr-3" />
                  <span className="hover:text-secondary-600 hover:scale-105 transition-all duration-300 ease-out">
                    {link.label}
                  </span>
                </div>
                {link.showBadge && unreadCount > 0 && (
                  <span className="bg-secondary-500 text-primary-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t border-primary-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-1 py-1 pl- text-sm bg-primary-800 hover:bg-secondary-500 hover:text-primary-900 text-white rounded-md hover:font-bold transition-all duration-200">
              <HiOutlineLogout className="w-5 h-5 mr-3" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          isOpen && !isSmallScreen ? "ml-64" : "ml-0"
        }`}></div>
    </>
  );
};

export default Sidebar;
