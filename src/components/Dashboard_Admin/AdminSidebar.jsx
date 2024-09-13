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
import { VscDashboard } from "react-icons/vsc";
import { FaUsersGear } from "react-icons/fa6";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import classNames from "classnames";
// import logo from "../../assets/images/logo3.png";

const AdminSidebar = () => {
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
    <div className="lg:flex lg:flex-col lg:min-w-[15rem] md:bg-purple lg:p-3 text-xs text-white mod:absolute h-screen overflow-y-auto overflow-x-hidden">
      <div className="md:flex hidden lg:gap-0.5 lg:py-3  justify-between  h-20 px-2 2xl:px-16  flex-col flex-1 ">
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col ml-3  my-2">
            {/* <img src={logo} alt="logo" className="w-[3rem] h-[4rem] bg-whit" /> */}
            <span className="text-4xl mb-2">Credulen</span>
            <span className="text-sm underline mb-10">Administrator</span>
          </div>

          {/* Links */}
          <div className="">
            <Link
              to="/DashBoard/Admin_Dashboard"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/Admin_Dashboard"
                    ? "#ffffff66 "
                    : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/Admin_Dashboard")}
            >
              <VscDashboard className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Dashboard</span>
            </Link>

            <Link
              to="/DashBoard/AdminProfile"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/AdminProfile" ? "#ffffff66 " : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/AdminProfile")}
            >
              <IoPerson className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Profile</span>
            </Link>
            <Link
              to="/DashBoard/Users"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/Users" ? "#ffffff66 " : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/Users")}
            >
              <FaUsersGear className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Users</span>
            </Link>

            <Link
              to="/DashBoard/Admin/Posts"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/Admin/Posts" ? "#ffffff66 " : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/Admin/Posts")}
            >
              <CiViewList className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Posts</span>
            </Link>
            <Link
              to="/DashBoard/Admin/Authors"
              style={{
                color: "white",
                backgroundColor:
                  activeLink === "/DashBoard/Admin/Authors" ? "#ffffff66 " : "",
              }}
              className="mb-3 flex gap-3 rounded-md p-2"
              onClick={() => handleLinkClick("/DashBoard/Admin/Authors")}
            >
              <CiViewList className="text-white w-6 h-6" />
              <span className="text-[16px] my-auto">Authors</span>
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

export default AdminSidebar;
