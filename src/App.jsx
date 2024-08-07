import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Conferences from "./pages/Conference";
import Webinar from "./pages/Webinars";
import Solutions from "./pages/Solution";
import Contact from "./pages/Contactus";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/webinars" element={<Webinar />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
