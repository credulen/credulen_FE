import React, { useState, useEffect } from "react";

import { HiOutlineLogout } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { CiViewList } from "react-icons/ci";
import { LuFileTerminal } from "react-icons/lu";
import { TbUnlink } from "react-icons/tb";
import { LuBookTemplate } from "react-icons/lu";
import { MdPlaylistAdd } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import classNames from "classnames";
// import logo from "../../assets/images/logo3.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const active = true;
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="lg:flex lg:flex-col lg:min-w-[15rem] md:bg-purple lg:p-3  text-xs  text-white mod:absolute  h-screen overflow-y-auto">
      <div className="md:flex hidden lg:gap-0.5 lg:py-3  justify-between  h-20 px-2 2xl:px-16  flex-col flex-1 ">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center my-4">
            {/* <img src={logo} alt="logo" className="w-[3rem] h-[4rem] bg-whit" /> */}
            <span className="text-4xl mx-2 mb-5"> Credulen</span>
          </div>

          {/* Links */}
          <div className="">
            <Link
              to="/DashBoard/profile"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/profile" ? "#ffffff66 " : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/profile")}
            >
              <IoPerson className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Profile</span>
            </Link>
            <Link
              to="/DashBoard/Activities"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/Activities" ? "#ffffff66 " : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/Activities")}
            >
              <CiViewList className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Activity Log</span>
            </Link>
            <Link
              to="/DashBoard/Notifications"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/Notifications" ? "#ffffff66 " : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/Notifications")}
            >
              <IoMdNotificationsOutline className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Notifications</span>
            </Link>
          </div>
          {/* Links */}
        </div>
        <hr className="border-t border-gray-200 my-4" />
        <div className="mt-auto">
          <div
            style={{
              color: "white",
              backgroundColor: "#ffffff ",
            }}
            className="my-5 flex gap-3 rounded-md p-2 cursor-pointer"
            onClick={handleLogout}
          >
            <HiOutlineLogout className="text-red-500 w-6 h-6" />
            <span className="text-[16px] my-auto text-red-500">Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
