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

  const navbarClass = `fixed w-full z-20 top-0 start-0 transition-all duration-300 ease-in-out ${
    isScrolled || location.pathname !== "/"
      ? "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600"
      : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600  "
  }`;

  return (
    <div
      className={`transition-all duration-300 ${bannerVisible ? "mb-16" : ""}`}
    >
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
            } w-full md:flex md :w-auto md:order-1 transition-all duration-500 ease-in-out`}
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
    </div>
  );
};

export default Navbar;
