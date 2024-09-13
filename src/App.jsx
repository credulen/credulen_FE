import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Conferences from "./pages/Conference";
import Webinar from "./pages/Webinars";
import Solutions from "./pages/Solution";
import Contact from "./pages/Contactus";
import RegisterAdmin from "../src/pages/RegisterAdmin";
import Signup from "../src/pages/RegisterUser";

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
// Admin
import AdminLayout from "./components/Dashboard_Admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashBoardPages/AdminDashboard";
import AdminProfile from "./pages/AdminDashBoardPages/AdminProfile";
import AdminUsersLists from "./pages/AdminDashBoardPages/AdminUsersLists";
import Authors from "./pages/AdminDashBoardPages/DashBoardActivities";
import Posts from "./pages/AdminDashBoardPages/Posts";
import CreatePosts from "./pages/AdminDashBoardPages/CreatePosts";
import CreateAuthor from "./pages/AdminDashBoardPages/CreateAuthor";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post/:slug" element={<Post />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/webinars" element={<Webinar />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />
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
        {/* Protected Admin Dashbord routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/DashBoard/Admin_Dashboard"
              element={<AdminDashboard />}
            />
            <Route path="/DashBoard/AdminProfile" element={<AdminProfile />} />
            <Route path="/DashBoard/Users" element={<AdminUsersLists />} />
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
          </Route>
        </Route>
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
