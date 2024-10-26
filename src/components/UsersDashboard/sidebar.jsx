// import React, { useState, useEffect } from "react";

// import { HiOutlineLogout } from "react-icons/hi";
// import { RxDashboard } from "react-icons/rx";
// import { CiViewList } from "react-icons/ci";
// import { LuFileTerminal } from "react-icons/lu";
// import { TbUnlink } from "react-icons/tb";
// import { LuBookTemplate } from "react-icons/lu";
// import { MdPlaylistAdd } from "react-icons/md";
// import { IoPerson } from "react-icons/io5";
// import { IoMdNotificationsOutline } from "react-icons/io";

// import { useSelector, useDispatch } from "react-redux";

// import { Link, useNavigate } from "react-router-dom";
// import { logoutUser } from "../../features/auth/authSlice";
// import classNames from "classnames";
// // import logo from "../../assets/images/logo3.png";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const [nav, setNav] = useState(false);
//   const active = true;
//   const navigate = useNavigate();

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   const [activeLink, setActiveLink] = useState(null);

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };
//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/");
//   };

//   return (
//     <div className="lg:flex lg:flex-col lg:min-w-[15rem] md:bg-purple lg:p-3  text-xs  text-white mod:absolute  h-screen overflow-y-auto">
//       <div className="md:flex hidden lg:gap-0.5 lg:py-3  justify-between  h-20 px-2 2xl:px-16  flex-col flex-1 ">
//         <div className="flex flex-1 flex-col">
//           <div className="flex items-center my-4">
//             {/* <img src={logo} alt="logo" className="w-[3rem] h-[4rem] bg-whit" /> */}
//             <span className="text-4xl mx-2 mb-5"> Credulen</span>
//           </div>

//           {/* Links */}
//           <div className="">
//             <Link
//               to="/DashBoard/profile"
//               style={{
//                 color: "white",
//                 backgroundColor:
//                   activeLink === "/DashBoard/profile" ? "#ffffff66 " : "",
//               }}
//               className="mb-3 flex gap-3 rounded-md p-2"
//               onClick={() => handleLinkClick("/DashBoard/profile")}
//             >
//               <IoPerson className="text-white w-6 h-6" />
//               <span className="text-[16px] my-auto">Profile</span>
//             </Link>
//             <Link
//               to="/DashBoard/Activities"
//               style={{
//                 color: "white",
//                 backgroundColor:
//                   activeLink === "/DashBoard/Activities" ? "#ffffff66 " : "",
//               }}
//               className="mb-3 flex gap-3 rounded-md p-2"
//               onClick={() => handleLinkClick("/DashBoard/Activities")}
//             >
//               <CiViewList className="text-white w-6 h-6" />
//               <span className="text-[16px] my-auto">Activity Log</span>
//             </Link>
//             <Link
//               to="/DashBoard/Notifications"
//               style={{
//                 color: "white",
//                 backgroundColor:
//                   activeLink === "/DashBoard/Notifications" ? "#ffffff66 " : "",
//               }}
//               className="mb-3 flex gap-3 rounded-md p-2"
//               onClick={() => handleLinkClick("/DashBoard/Notifications")}
//             >
//               <IoMdNotificationsOutline className="text-white w-6 h-6" />
//               <span className="text-[16px] my-auto">Notifications</span>
//             </Link>
//           </div>
//           {/* Links */}
//         </div>
//         <hr className="border-t border-gray-200 my-4" />
//         <div className="mt-auto">
//           <div
//             style={{
//               color: "white",
//               backgroundColor: "#ffffff ",
//             }}
//             className="my-5 flex gap-3 rounded-md p-2 cursor-pointer"
//             onClick={handleLogout}
//           >
//             <HiOutlineLogout className="text-red-500 w-6 h-6" />
//             <span className="text-[16px] my-auto text-red-500">Sign out</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

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
  const user = useSelector((state) => state.auth.user);
  const sidebarRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  const { profile, loading, success, error } = useSelector(
    (state) => state.profiles
  );

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
    {
      path: "/DashBoard/Activities",
      icon: FaHistory,
      label: "Activity Log",
    },

    {
      path: "/DashBoard/Notifications",
      icon: IoMdNotificationsOutline,
      label: "Notifications",
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-md p-4 flex items-center justify-between ${
          isSmallScreen ? "" : "hidden"
        }`}
      >
        <div className="flex items-center">
          <span className="mb-2">
            {profile?.image ? (
              <img
                src={`${backendURL}/uploads/${profile?.image}`}
                alt={`${userInfo.username}`}
                className="w-7 h-7 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.png";
                }}
              />
            ) : (
              <FaUserCircle className="w-7 h-7 text-gray-400 mr-4 cursor-pointer" />
            )}
          </span>
          <span className="mb-1 mr-2 font-medium text-xs">
            {profile?.username || "Guest"}
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-purple-600 p-2 rounded-md focus:outline-none"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64  bg-blue-700 text-white transition-all duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          ${isSmallScreen ? "top-16" : "top-0"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-1">Credulen</h1>
            <p className="text-sm text-purple-300 mb-6">Administrator</p>
            {!isSmallScreen && (
              <div className="flex items-center">
                <span className="mb-2">
                  {profile?.image ? (
                    <img
                      src={`${backendURL}/uploads/${profile?.image}`}
                      alt={`${userInfo.username}`}
                      className="w-7 h-7 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback-image.png";
                      }}
                    />
                  ) : (
                    <FaUserCircle className="w-7 h-7 text-gray-400 mr-4 cursor-pointer" />
                  )}
                </span>
                <span className="mb-1 mr-2 font-extralight text-xs">
                  {profile?.username || "Guest"}
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
                className={`flex items-center px-5 py-3 text-sm ${
                  location.pathname === link.path
                    ? "bg-blue-500"
                    : "hover:bg-blue-600"
                }`}
              >
                <link.icon className="w-5 h-5 mr-3" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-1 py-1 pl- text-sm bg-red-50 hover:text-white text-red-700 rounded-md hover:bg-red-700 transition-colors"
            >
              <HiOutlineLogout className="w-5 h-5 mr-3" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          isOpen && !isSmallScreen ? "ml-64" : "ml-0"
        }`}
      ></div>
    </>
  );
};

export default Sidebar;
