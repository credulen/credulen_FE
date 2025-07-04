import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TokenExpirationModal } from "./components/tools/TokenExpiration";
import Home from "./pages/Home";
import CampaignPage from "./pages/CampaignPage";
import WebinaCampaign from "./pages/WebinaCampaign";
import PasswordResset from "./pages/PasswordResset";
import Conferences from "./pages/Conference";
import Webinar from "./pages/Webinars";
import TrainingSchool from "./pages/TrainingSchool";
import ConsultingServices from "./pages/ConsultingServices";
import EventVideo from "../src/pages/EventVideo";
import Contact from "./pages/Contactus";
import RegisterAdmin from "../src/pages/RegisterAdmin";
import Signup from "../src/pages/RegisterUser";
import ForgotPassword from "../src/pages/ForgotPassword";
import PageNotFound from "../src/components/tools/PageNotFound";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Layout from "./components/UsersDashboard/Layout";
// user DashBoard
import HomeDashBoard from "./pages/UsersDashBoardPages/DashBoardProfile";
import DashBoardActivities from "./pages/UsersDashBoardPages/DashBoardActivities";
import UserNotificationPage from "./pages/UsersDashBoardPages/UserNotificationPage";
import Post from "./pages/Post";
import SolutionForm from "./pages/SolutionForm";
import SolutionFormCS from "./pages/SolutionFormCS";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import WebinarPaymentConfirmation from "./pages/WebinarPaymentConfirmation";
import PaymentPage from "./pages/PaymentPage";
// Admin

import AdminLayout from "./components/Dashboard_Admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashBoardPages/AdminDashboard";
import AdminProfile from "./pages/AdminDashBoardPages/AdminProfile";
import AdminUsersLists from "./pages/AdminDashBoardPages/AdminUsersLists";
import AutthorList from "./pages/AdminDashBoardPages/AutthorList";
import AdminBlogposts from "./pages/AdminDashBoardPages/AdminBlogposts";
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
import RegisteredEventLists from "./pages/AdminDashBoardPages/RegisteredEventLists";
import FreeMAsterClassList from "./pages/AdminDashBoardPages/FreeMAsterClassList";
import CommunityUserList from "./pages/AdminDashBoardPages/CommunityUserList";
import AdminNotificationPage from "./pages/AdminDashBoardPages/AdminNotificationPage";
import WebinarPaymentList from "./pages/AdminDashBoardPages/WebinarPaymentList";

const AppContent = () => {
  const location = useLocation();
  const isDashboardRoute = [
    "/DashBoard",
    "/Credulen-freeMasterClass-Join2025",
    "/Credulen-Webinar-Register2025",
    "/webinar-payment-success",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/Credulen-freeMasterClass-Join2025"
          element={<CampaignPage />}
        />
        <Route
          path="/Credulen-Webinar-Register2025"
          element={<WebinaCampaign />}
        />

        <Route path="/Post/:slug" element={<Post />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/event/:slug" element={<SingleEventPost />} />
        <Route path="/webinars" element={<Webinar />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/solutions/training_School" element={<TrainingSchool />} />
        <Route
          path="/solutions/consulting_Services"
          element={<ConsultingServices />}
        />
        <Route path="/SolutionForm/:slug?" element={<SolutionForm />} />
        <Route path="/SolutionFormCS/:slug?" element={<SolutionFormCS />} />
        {/* payments */}
        <Route path="/payment-success" element={<PaymentConfirmation />} />
        {/* webinar payment confirmation */}
        <Route
          path="/webinar-payment-success"
          element={<WebinarPaymentConfirmation />}
        />
        <Route path="/payment-failed" element={<PaymentConfirmation />} />
        <Route path="/payment/:slug" element={<PaymentPage />} />
        {/* payments */}

        <Route path="/contactus" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordResset />} />
        <Route path="/eventVideo/:slug?" element={<EventVideo />} />
        {/* Protected USERS routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/DashBoard/profile" element={<HomeDashBoard />} />
            <Route
              path="/DashBoard/Activities"
              element={<DashBoardActivities />}
            />
            <Route
              path="/DashBoard/Notifications"
              element={<UserNotificationPage />}
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
            <Route path="/DashBoard/Admin/Authors" element={<AutthorList />} />
            <Route path="/DashBoard/Admin/Posts" element={<AdminBlogposts />} />
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
              path="/DashBoard/Admin/CreateEvents/:slug?"
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
            <Route
              path="/DashBoard/Admin/RegisteredEventList"
              element={<RegisteredEventLists />}
            />
            <Route
              path="/DashBoard/Admin/CommunityUserList"
              element={<CommunityUserList />}
            />
            <Route
              path="/DashBoard/Admin/NotificationPage"
              element={<AdminNotificationPage />}
            />
            <Route
              path="/DashBoard/Admin/FreeMasterClassregister"
              element={<FreeMAsterClassList />}
            />
            <Route
              path="/DashBoard/Admin/WebinarPaymentList"
              element={<WebinarPaymentList />}
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
      <TokenExpirationModal />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
