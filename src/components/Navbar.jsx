// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, Link } from "react-router-dom";

// import { FaUserCircle } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../features/auth/authSlice";
// import { fetchProfileById } from "../features/Users/userAction";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import { HiOutlineLogout } from "react-icons/hi";
// const backendURL = import.meta.env.VITE_BACKEND_URL;

// const Navbar = () => {
//   const userDropdownRef = useRef(null);
//   const menuRef = useRef(null); // Added this ref for the menu
//   const [userOpen, setUserOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState(null);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const handleLinkClick = () => {
//     if (isMenuOpen) setIsMenuOpen(false);
//     setUserOpen(false);
//   };
//   const toggleUserFile = () => setUserOpen(!userOpen);

//   const handleClickOutside = (event) => {
//     if (
//       menuRef.current &&
//       !menuRef.current.contains(event.target) &&
//       !userDropdownRef.current.contains(event.target)
//     ) {
//       setIsMenuOpen(false);
//       setUserOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 rtl:space-x-reverse"
//         >
//           <img
//             src="https://flowbite.com/docs/images/logo.svg"
//             className="h-8"
//             alt="Flowbite Logo"
//           />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//             Credulen
//           </span>
//         </Link>

//         <span className="md:order-2 flex space-x-3 items-center mid:hidden align-middle text-center">
//           <DropdownItems />
//         </span>
//         {/* here */}

//         <button
//           onClick={toggleMenu}
//           data-collapse-toggle="navbar-sticky"
//           type="button"
//           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//           aria-controls="navbar-sticky"
//           aria-expanded={isMenuOpen}
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg
//             className={`w-5 h-5 transform transition-transform duration-300 ${
//               isMenuOpen ? "rotate-90" : ""
//             }`}
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>

//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } w-full md:flex md:w-auto md:order-1 transition-all duration-500 ease-in-out`}
//           id="navbar-sticky"
//           ref={menuRef}
//         >
//           <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <NavLink
//                 onClick={handleLinkClick}
//                 to="/"
//                 className={({ isActive }) =>
//                   ` block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
//                     isActive
//                       ? "text-btColour  mid:bg-btColour mid:text-white"
//                       : "text-black"
//                   }`
//                 }
//                 end
//               >
//                 Home
//               </NavLink>
//             </li>

//             <NavLink
//               onClick={handleLinkClick}
//               to="/blog"
//               className={({ isActive }) =>
//                 ` block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
//                   isActive
//                     ? "text-btColour  mid:bg-btColour mid:text-white"
//                     : "text-black"
//                 }`
//               }
//               end
//             >
//               Blog
//             </NavLink>

//             <div className="relative" ref={userDropdownRef}>
//               <div className="flex" onClick={toggleUserFile}>
//                 <span className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 cursor-pointer ">
//                   Events
//                 </span>
//                 <span className="mt-2 mid:mt-4">
//                   <svg
//                     className={`w-2.5 h-2.5 ms-3 ${
//                       userOpen ? "transform rotate-180" : ""
//                     }`}
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 10 6"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m1 1 4 4 4-4"
//                     />
//                   </svg>
//                 </span>
//               </div>

//               {userOpen && (
//                 <div
//                   id="dropdownInformation"
//                   className="absolute z-10 right-[-3rem] mid:left-0 text-black divide-y divide-black rounded-sm shadow w-44 mt-1 bg-NavCl border bg-gray-50 text-center"
//                 >
//                   <ul
//                     className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                     aria-labelledby="dropdownLargeButton"
//                   >
//                     <NavLink
//                       onClick={handleLinkClick}
//                       to="/webinars"
//                       className={({ isActive }) =>
//                         ` block py-2 px-3 mb-2 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
//                           isActive
//                             ? "text-btColour  mid:bg-btColour mid:text-white"
//                             : "text-black"
//                         }`
//                       }
//                       end
//                     >
//                       Webinars
//                     </NavLink>

//                     <li>
//                       <NavLink
//                         onClick={handleLinkClick}
//                         to="/conferences"
//                         className={({ isActive }) =>
//                           ` block px-4 py-2   rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
//                             isActive
//                               ? "text-btColour  mid:bg-btColour mid:text-white"
//                               : "text-black"
//                           }`
//                         }
//                         end
//                       >
//                         Conferences
//                       </NavLink>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//             <li>
//               <NavLink
//                 onClick={handleLinkClick}
//                 to="/Solutions"
//                 className={({ isActive }) =>
//                   ` block py-2 px-3 mb-2 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
//                     isActive
//                       ? "text-btColour  mid:bg-btColour mid:text-white"
//                       : "text-black"
//                   }`
//                 }
//                 end
//               >
//                 Solutions
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 onClick={handleLinkClick}
//                 to="/contactus"
//                 className={({ isActive }) =>
//                   ` block py-2 px-3 mb-2 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
//                     isActive
//                       ? "text-btColour  mid:bg-btColour mid:text-white"
//                       : "text-black"
//                   }`
//                 }
//                 end
//               >
//                 Contact Us
//               </NavLink>
//             </li>
//             <li>
//               <span className="md:order-2 flex space-x-3 items-center md:hidden align-middle text-center">
//                 <DropdownItems />
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// export function DropdownItems(handleLinkClick) {
//   const userDropdownRef = useRef(null);
//   const menuRef = useRef(null);
//   const [userOpen, setUserOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { profile, loading, success, error } = useSelector(
//     (state) => state.profiles
//   );
//   const userId = userInfo?.user._id;
//   const dashboardPath =
//     userInfo?.user?.role === "admin"
//       ? "/DashBoard/Admin_Dashboard"
//       : "/DashBoard/profile";

//   // Fetch profile on component mount
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchProfileById(userId));
//     }
//   }, [dispatch, userId]);

//   const toggleUserFile = () => setUserOpen(!userOpen);

//   const handleClickOutside = (event) => {
//     if (
//       menuRef.current &&
//       !menuRef.current.contains(event.target) &&
//       !userDropdownRef.current.contains(event.target)
//     ) {
//       setIsMenuOpen(false);
//       setUserOpen(false);
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser())
//       .then(() => {
//         window.location.reload(); // Force full page reload after logout
//       })
//       .catch((error) => {
//         setSnackbarMessage("Logout failed!");
//         setSnackbarSeverity("error");
//         setOpenSnackbar(true);
//       });
//   };

//   return (
//     <div ref={menuRef}>
//       {userInfo ? (
//         <div className="relative" ref={userDropdownRef}>
//           <button
//             onClick={toggleUserFile}
//             className="focus:ring- focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
//             type="button"
//           >
//             <span className="mb-2">
//               {profile?.image ? (
//                 <img
//                   src={`${backendURL}/uploads/${profile?.image}`}
//                   alt={`${userInfo.username}`}
//                   className="w-7 h-7 rounded-full object-cover mr-4"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/fallback-image.png";
//                   }}
//                 />
//               ) : (
//                 <FaUserCircle className="w-7 h-7 text-gray-400 mr-4 cursor-pointer" />
//               )}
//             </span>
//             <svg
//               className={`w-2.5 h-2.5 ms-3 ${
//                 userOpen ? "transform rotate-180" : ""
//               }`}
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 10 6"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 4 4 4-4"
//               />
//             </svg>
//           </button>

//           {userOpen && (
//             <div
//               id="dropdownInformation"
//               className="absolute z-10 right-1  mid:left-[6rem] mid:top-[-2rem] text-black divide-y divide-black rounded-lg shadow w-44 mt-1 bg-NavClr"
//             >
//               <div className="px-4 py-3 text-sm text-black">
//                 <div className="font-medium truncate">
//                   {userInfo && userInfo?.user.email
//                     ? userInfo?.user.email
//                     : "User email not available"}
//                 </div>
//               </div>
//               <ul className="py-2 text-sm text-gray-700">
//                 <li>
//                   <NavLink
//                     to={dashboardPath}
//                     className="block px-4 py-2 text-black rounded hover:text-btColour md:dark:hover:bg-transparent font-semibold"
//                     onClick={handleLinkClick}
//                   >
//                     DashBoard
//                   </NavLink>
//                 </li>
//                 <li>
//                   <button
//                     className="block px-4 py-2 text-black rounded hover:text-btColour md:dark:hover:bg-transparent font-semibold"
//                     onClick={handleLogout}
//                   >
//                     <div className="flex items-center space-x-2 justify-center">
//                       <span>Logout</span>
//                       <HiOutlineLogout className="text-black w-4 h-4" />
//                     </div>
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       ) : (
//         <>
//           <Link
//             to="/signup"
//             type="button"
//             className="text-white bg-gradient-to-r from-cyan-500 to-btColour hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//           >
//             Sign Up
//           </Link>

//           <Link
//             to="/login"
//             className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-btColour group-hover:from-cyan-500 group-hover:to-btColour hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
//           >
//             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//               Login
//             </span>
//           </Link>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { fetchProfileById } from "../features/Users/userAction";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const userDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLinkClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    setUserOpen(false);
  };
  const toggleUserFile = () => setUserOpen(!userOpen);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !userDropdownRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
      setUserOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = `fixed w-full z-20 top-0 start-0 transition-all duration-300 ease-in-out ${
    isScrolled || location.pathname !== "/"
      ? "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600"
      : "bg-transparent text-white"
  }`;
  const scrlwhite = ` ${
    isScrolled || location.pathname !== "/" ? "text-black" : " !text-white "
  }`;

  return (
    <>
      <nav className={navbarClass}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Credulen
            </span>
          </Link>

          <span className="md:order-2 flex space-x-3 items-center mid:hidden align-middle text-center">
            <DropdownItems />
          </span>
          {/* here */}

          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${scrlwhite}`}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1 transition-all duration-500 ease-in-out`}
            id="navbar-sticky"
            ref={menuRef}
          >
            <ul
              className={`flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ${scrlwhite}`}
            >
              <li>
                <NavLink
                  onClick={handleLinkClick}
                  to="/"
                  className={({ isActive }) =>
                    ` block py-2 px-3  rounded hover:bg-gray-10 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                      isActive
                        ? " mid:bg-btColour mid:text-white"
                        : ` ${scrlwhite}`
                    }`
                  }
                  end
                >
                  Home
                </NavLink>
              </li>

              <NavLink
                onClick={handleLinkClick}
                to="/blog"
                className={({ isActive }) =>
                  ` block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                    isActive
                      ? "text-btColour   mid:text-white "
                      : ` ${""} hover:text-btColour`
                  }`
                }
                end
              >
                Blog
              </NavLink>

              <div className="relative" ref={userDropdownRef}>
                <div className="flex" onClick={toggleUserFile}>
                  <span className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 cursor-pointer ">
                    Events
                  </span>
                  <span className="mt-2 mid:mt-4">
                    <svg
                      className={`w-2.5 h-2.5 ms-3 ${
                        userOpen ? "transform rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </span>
                </div>

                {userOpen && (
                  <div
                    id="dropdownInformation"
                    className="absolute z-10 right-[-3rem] mid:left-0 text-black divide-y divide-black rounded-sm shadow w-44 mt-1 bg-NavCl border bg-gray-50 text-center"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <NavLink
                        onClick={handleLinkClick}
                        to="/webinars"
                        className={({ isActive }) =>
                          ` block py-2 px-3 mb-2 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                            isActive
                              ? "text-btColour  mid:bg-btColour mid:text-white"
                              : "text-black"
                          }`
                        }
                        end
                      >
                        Webinars
                      </NavLink>

                      <li>
                        <NavLink
                          onClick={handleLinkClick}
                          to="/conferences"
                          className={({ isActive }) =>
                            ` block px-4 py-2   rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                              isActive
                                ? "text-btColour  mid:bg-btColour mid:text-white"
                                : "text-black"
                            }`
                          }
                          end
                        >
                          Conferences
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <li>
                <NavLink
                  onClick={handleLinkClick}
                  to="/Solutions"
                  className={({ isActive }) =>
                    ` block py-2 px-3 mb-2 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                      isActive
                        ? "text-btColour  mid:bg-btColour mid:text-white"
                        : ""
                    }`
                  }
                  end
                >
                  Solutions
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={handleLinkClick}
                  to="/contactus"
                  className={({ isActive }) =>
                    ` block py-2 px-3 mb-2 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                      isActive
                        ? "text-btColour  mid:bg-btColour mid:text-white"
                        : ""
                    }`
                  }
                  end
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <span className="md:order-2 flex space-x-3 items-center md:hidden align-middle text-center">
                  <DropdownItems />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;

export function DropdownItems(handleLinkClick) {
  const userDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!userInfo);
  }, [userInfo]);

  const { profile, loading, success, error } = useSelector(
    (state) => state.profiles
  );
  const userId = userInfo?.user?._id;
  const dashboardPath =
    userInfo?.user?.role === "admin"
      ? "/DashBoard/Admin_Dashboard"
      : "/DashBoard/profile";

  // Fetch profile on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileById(userId));
    }
  }, [dispatch, userId]);

  const toggleUserFile = () => setUserOpen(!userOpen);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !userDropdownRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
      setUserOpen(false);
    }
  };

  useEffect(() => {
    // Check if user is logged in (e.g., by checking for a token in localStorage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      setSnackbarMessage("Logged out successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      window.location.reload();
      navigate("/");
    } catch (error) {
      setSnackbarMessage("Logout failed!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Logout error:", error);
    }
  };

  return (
    <div ref={menuRef}>
      {userInfo ? (
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={toggleUserFile}
            className="focus:ring- focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            type="button"
          >
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
            <svg
              className={`w-2.5 h-2.5 ms-3 ${
                userOpen ? "transform rotate-180" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {userOpen && (
            <div
              id="dropdownInformation"
              className="absolute z-10 right-1  mid:left-[6rem] mid:top-[-2rem] text-black divide-y divide-black rounded-lg shadow w-44 mt-1 bg-NavClr"
            >
              <div className="px-4 py-3 text-sm text-black">
                <div className="font-medium truncate">
                  {userInfo && userInfo?.user?.email
                    ? userInfo?.user.email
                    : "User email not available"}
                </div>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <NavLink
                    to={dashboardPath}
                    className="block px-4 py-2 text-black rounded hover:text-btColour md:dark:hover:bg-transparent font-semibold"
                    onClick={handleLinkClick}
                  >
                    DashBoard
                  </NavLink>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-black rounded hover:text-btColour md:dark:hover:bg-transparent font-semibold"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center space-x-2 justify-center">
                      <span>Logout</span>
                      <HiOutlineLogout className="text-black w-4 h-4" />
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            to="/signup"
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-btColour hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-btColour group-hover:from-cyan-500 group-hover:to-btColour hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </Link>
        </>
      )}
    </div>
  );
}
