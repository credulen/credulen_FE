export function DropdownItems({ closeDropdown }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profiles);

  const userId = userInfo?._id;
  const dashboardPath =
    userInfo?.role === "admin"
      ? "/DashBoard/Admin_Dashboard"
      : "/DashBoard/profile";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    window.location.reload();
  };

  if (!userInfo) {
    return (
      <div className=" flex items-center gap-3" ref={dropdownRef}>
        <NavLink
          onClick={() => {
            closeDropdown(); // Close dropdown when clicking Login
            setIsOpen(false);
          }}
          to="/login"
          className="text-white bg-gradient-to-r from-cyan-500 to-btColour hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-4 py-2 text-center me-2 mb-2"
        >
          Login
        </NavLink>
      </div>
    );
  }

  return (
    <div className="relative mid:ml-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-200">
          {profile?.image ? (
            <img
              src={`${backendURL}/uploads/${profile.image}`}
              alt={userInfo.username}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/fallback-image.png";
              }}
            />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-400" />
          )}
        </div>

        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute  mid:left-0 right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 transform opacity-100 scale-100 transition-all duration-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userInfo?.email || "User  email not available"}
            </p>
          </div>

          <NavLink
            to={dashboardPath}
            className={({ isActive }) =>
              `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-btColour transition-colors duration-150 ${
                isActive ? "bg-gray-50 text-cyan-600" : ""
              }`
            }
            onClick={() => {
              setIsOpen(false);
              closeDropdown(); // Close the main dropdown when clicking a link
            }}
          >
            Dashboard
          </NavLink>

          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
              closeDropdown(); // Close the main dropdown when logging out
            }}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-btColour transition-colors duration-150 flex justify-center items-center gap-2"
          >
            <span>Logout</span>
            <HiOutlineLogout className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { fetchProfileById } from "../features/Users/userAction";
import { IoPersonCircleOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CredulenLogo2 from "../assets/CredulenLogo2.png";
import CredulenLogo from "../assets/CredulenLogo.png";
import {
  NotificationBanner,
  LayoutWrapper,
} from "../components/NavNotificationBanner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DropdownMenu = ({ title, items, closeDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className=" mid:mb-2  flex items-center cursor-pointer">
        <span className="block py-2 px-3 rounded md:hover:bg-transparent hover:text-btColour md:p-0 transition-all duration-300">
          {title}
        </span>
        <svg
          className={`w-2.5 h-2.5 ms-2 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
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
      </div>

      <div
        className={`absolute z-10 right-[-3rem] mid:left-0 text-black rounded-lg shadow-lg w-44 mt-2 bg-white border transform transition-all duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-1 invisible"
        }`}
      >
        <ul className="py-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="relative group/item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-50 hover:text-btColour transition-colors duration-200 ${
                    isActive ? "text-btColour bg-gray-50" : "text-gray-700"
                  }`
                }
                onClick={() => {
                  setIsOpen(false);
                  closeDropdown(); // Close the main dropdown when clicking a link
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gray-50 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-200 origin-left" />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Navbar = () => {
  const userDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const closeDropdown = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
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
  const fetchBannerStatus = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getBannerStatus`);
      if (!res.ok) {
        throw new Error("Failed to fetch banner status");
      }
      const data = await res.json();
      setBannerVisible(data.isActive);
    } catch (error) {
      console.error("Error fetching banner status:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch banner status",
        severity: "error",
      });
    }
  }, []);
  useEffect(() => {
    fetchBannerStatus();
  }, [fetchBannerStatus]);

  const navbarClass = `fixed w-full z-20 top-0 start-0 transition-all duration-300 ease-in-out ${
    isScrolled || location.pathname !== "/"
      ? "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600"
      : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600  "
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
              src={CredulenLogo2}
              className="w-[11rem] h-[3rem]"
              alt="Flowbite Logo"
            />
          </Link>

          <span className="md:order-2 flex space-x-3 items-center mid:hidden align-middle text-center">
            <DropdownItems closeDropdown={closeDropdown} />
          </span>

          <button
            onClick={toggleMenu}
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200`}
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
              className={`flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 `}
            >
              <li>
                <NavLink
                  onClick={handleLinkClick}
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 mid:mb-2 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                      isActive ? "mid:bg-btColour mid:text-white" : ""
                    }`
                  }
                  end
                >
                  Home
                </NavLink>
              </li>

              <li>
                <DropdownMenu
                  title="Solutions"
                  items={[
                    {
                      label: "Training Schools",
                      path: "/solutions/training_School",
                    },
                    {
                      label: "Consulting Services",
                      path: "/solutions/consulting_Services",
                    },
                  ]}
                  closeDropdown={closeDropdown}
                />
              </li>

              <li>
                <NavLink
                  onClick={handleLinkClick}
                  to="/blog"
                  className={({ isActive }) =>
                    `block mid:mb-2  py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                      isActive
                        ? "text-btColour mid:bg-btColour mid:text-white"
                        : ""
                    }`
                  }
                  end
                >
                  Blog
                </NavLink>
              </li>

              <li>
                <DropdownMenu
                  title="Events"
                  items={[
                    { label: "Webinars", path: "/webinars" },
                    { label: "Conferences", path: "/conferences" },
                  ]}
                  closeDropdown={closeDropdown}
                />
              </li>

              <li>
                <NavLink
                  onClick={handleLinkClick}
                  to="/contactus"
                  className={({ isActive }) =>
                    `block mid:mb-2  py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-btColour md:p-0 ${
                      isActive
                        ? "text-btColour mid:bg-btColour mid:text-white"
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
                  <DropdownItems closeDropdown={closeDropdown} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {bannerVisible && (
        <NotificationBanner
          isVisible={bannerVisible}
          setIsVisible={setBannerVisible}
        />
      )}
      <LayoutWrapper bannerVisible={bannerVisible}></LayoutWrapper>

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
