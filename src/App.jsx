import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Conferences from "./pages/Conference";
import Webinar from "./pages/Webinars";
import Solutions from "./pages/Solution";
import Contact from "./pages/Contactus";
import RegisterAdmin from "../src/pages/RegisterAdmin";
import Signup from "../src/pages/RegisterUser";
import ForgotPassword from "../src/pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword.jsx";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Layout from "./components/UsersDashboard/Layout";
import HomeDashBoard from "./pages/UsersDashBoardPages/DashBoardProfile";
import DashBoardActivities from "./pages/UsersDashBoardPages/DashBoardActivities";
import DashBoardNotifications from "./pages/UsersDashBoardPages/DashBoardNotifications";
import Post from "./pages/Post";
import SolutionForm from "./pages/SolutionForm";
// Admin

import AdminLayout from "./components/Dashboard_Admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashBoardPages/AdminDashboard";
import AdminProfile from "./pages/AdminDashBoardPages/AdminProfile";
import AdminUsersLists from "./pages/AdminDashBoardPages/AdminUsersLists";
import Authors from "./pages/AdminDashBoardPages/DashBoardActivities";
import Posts from "./pages/AdminDashBoardPages/Posts";
import CreatePosts from "./pages/AdminDashBoardPages/CreatePosts";
import CreateAuthor from "./pages/AdminDashBoardPages/CreateAuthor";
import AdminEventLists from "./pages/AdminDashBoardPages/AdminEventLists";
import CreateEvents from "./pages/AdminDashBoardPages/CreateEvents";
import Speakers from "./pages/AdminDashBoardPages/SpeakerList";
import CreateSpeaker from "./pages/AdminDashBoardPages/CreateSpeaker";
import SingleEventPost from "./pages/SingleEventPost";
import AdminSolutionList from "./pages/AdminDashBoardPages/AdminSolutionList";
import CreateSolutions from "./pages/AdminDashBoardPages/CreateSolutions";
import RegisteredSolutionsList from "./pages/AdminDashBoardPages/RegisteredSolutionsList";
import AdminCommentLists from "./pages/AdminDashBoardPages/AdminCommentLists";

const AppContent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/DashBoard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post/:slug" element={<Post />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/event/:slug" element={<SingleEventPost />} />
        <Route path="/webinars" element={<Webinar />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/SolutionForm/:slug?" element={<SolutionForm />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Protected users routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/DashBoard/profile" element={<HomeDashBoard />} />
            <Route
              path="/DashBoard/Activities"
              element={<DashBoardActivities />}
            />
            <Route
              path="/DashBoard/Notifications"
              element={<DashBoardNotifications />}
            />
          </Route>
        </Route>
        {/* Protected Admin Dashboard routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/DashBoard/Admin_Dashboard"
              element={<AdminDashboard />}
            />
            <Route path="/DashBoard/AdminProfile" element={<AdminProfile />} />
            <Route path="/DashBoard/Admin/SpeakerList" element={<Speakers />} />
            <Route
              path="/DashBoard/Admin/CreateSpeaker/:speakerId?"
              element={<CreateSpeaker />}
            />
            <Route path="/DashBoard/Users" element={<AdminUsersLists />} />
            <Route
              path="/DashBoard/Admin/Comments"
              element={<AdminCommentLists />}
            />
            <Route path="/DashBoard/Admin/Authors" element={<Authors />} />
            <Route path="/DashBoard/Admin/Posts" element={<Posts />} />
            <Route
              path="/DashBoard/Admin/CreatePosts/:postId?"
              element={<CreatePosts />}
            />
            <Route
              path="/DashBoard/Admin/CreateAuthor/:authorId?"
              element={<CreateAuthor />}
            />
            <Route
              path="/DashBoard/Admin/Events"
              element={<AdminEventLists />}
            />
            <Route
              path="/DashBoard/Admin/CreateEvents/:eventId?"
              element={<CreateEvents />}
            />
            <Route
              path="/DashBoard/Admin/Solutions/"
              element={<AdminSolutionList />}
            />
            <Route
              path="/DashBoard/Admin/CreateSolutions/:slug?"
              element={<CreateSolutions />}
            />
            <Route
              path="/DashBoard/Admin/RegisteredSolutionsList"
              element={<RegisteredSolutionsList />}
            />
          </Route>
        </Route>
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
