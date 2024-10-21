// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import NewsletterSignup from "../components/tools/NewsletterSignup";
// import { motion, AnimatePresence } from "framer-motion";
// import moment from "moment";
// const backendURL = import.meta.env.VITE_BACKEND_URL;
// import {
//   Clock,
//   BookOpen,
//   Lightbulb,
//   ArrowRight,
//   Book,
//   Award,
//   Target,
//   Compass,
//   Rocket,
//   Star,
// } from "lucide-react";

// const heroImages = [
//   "/src/assets/heroImage.jpg",
//   "/src/assets/heroImage2.jpg",
//   // "/src/assets/hero3.jpg",
// ];
// const IntelligentHomepage = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 10000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     fetchPosts();
//     fetchWebinars();
//   }, []);

//   const fetchPosts = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${backendURL}/api/getPosts`);
//       const data = await response.json();
//       console.log(data);
//       // Sort posts by date (assuming each post has a 'date' field) and take the last 5
//       const sortedPosts = (data.posts || []).sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setPosts(sortedPosts.slice(0, 5));
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchWebinars = async () => {
//     try {
//       const response = await fetch(`${backendURL}/api/getEvents`);
//       const data = await response.json();

//       const webinars = Array.isArray(data.events)
//         ? data.events.filter((event) => event.eventType === "webinar")
//         : [];

//       const currentDate = new Date();
//       const upcoming = webinars.filter(
//         (event) => new Date(event.date) > currentDate
//       );
//       const past = webinars.filter(
//         (event) => new Date(event.date) <= currentDate
//       );

//       setUpcomingEvents(upcoming);
//       setPastEvents(past);
//     } catch (error) {
//       console.error("Error fetching webinars:", error);
//       setUpcomingEvents([]);
//       setPastEvents([]);
//     }
//   };

//   return (
//     <>
//       <div className="relative h-screen mx-auto text-white overflow-hidden !w-full">
//         {/* Sliding background images */}
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={currentImageIndex}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: `url(${heroImages[currentImageIndex]})`,
//               filter: "brightness(50%)",
//             }}
//           />
//         </AnimatePresence>

//         {/* Content container */}
//         <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
//           <motion.h1
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
//           >
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//             >
//               Unlock
//             </motion.span>{" "}
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.7 }}
//             >
//               Intelligence
//             </motion.span>{" "}
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.9 }}
//             >
//               And
//             </motion.span>
//             <br />
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 1.1 }}
//             >
//               Create
//             </motion.span>{" "}
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 1.3 }}
//             >
//               Value
//             </motion.span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.7 }}
//             className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl"
//           >
//             Project-based training and Scenario-based Innovation Consultingto
//             master the skills & value creation in a rapidly changing world
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 2 }}
//             className="flex space-x-4"
//           >
//             <Link to={"/"}>
//               <button
//                 className="bg-white text-black px-6 py-3 rounded-lg font-bold
//              transition-colors flex items-center justify-center hover:border-2 hover:border-white hover:bg-black hover:text-white  duration-300"
//               >
//                 Explore Our Service
//               </button>
//             </Link>
//             <Link to={"/contactus"}>
//               <button
//                 className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold
//              transition-colors flex items-center justify-center hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600  duration-300"
//               >
//                 Contact US
//               </button>
//             </Link>
//           </motion.div>
//         </div>
//       </div>

//       <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 p-6">
//         <motion.main
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-6xl mx-auto"
//         >
//           {/* ????????? */}
//           <div className="bg-gray-90 text-white py-16">
//             <div className="max-w-6xl mx-auto px-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="grid md:grid-cols-2 gap-8"
//               >
//                 <SkillCard
//                   icon={<Book className="w-12 h-12 text-blue-400" />}
//                   title="Skill-up with our expert-led project-based courses"
//                   description="Web3 & Web3 based Data Science, Data Engineering and Generative AI to increase your earning power."
//                 />
//                 <SkillCard
//                   icon={<Lightbulb className="w-12 h-12 text-yellow-400" />}
//                   title="Be at the cutting-edge of value creation"
//                   description="For your organization through our consulting services in Data, Blockchain, and AI integration and strategy."
//                 />
//               </motion.div>
//             </div>
//           </div>
//           {/* ????????? */}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             // className="bg-blue-900 p-6 rounded-lg mb-8"
//             className=" inset-0 bg-[url('/src/assets/insight.jp')]  bg-cover bg-center  opacity-10  "
//           >
//             <div className="bg-blac py-16">
//               <div className="max-w-6xl mx-auto px-4">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                   className="grid md:grid-cols-2 gap-8 "
//                 >
//                   <TeaserSection
//                     title="Read our latest insights"
//                     items={posts}
//                     posts={posts} // Add this line
//                     icon={<BookOpen className="w-6 h-6 text-blue-500" />}
//                     viewAllPath="/blog"
//                     contentType="post"
//                   />
//                   <TeaserSection
//                     title="Join our upcoming webinars"
//                     posts={upcomingEvents}
//                     icon={<Clock className="w-6 h-6 text-green-500" />}
//                     viewAllPath="/webinars"
//                     contentType="event"
//                   />
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           <div className="bg-gray-10   py-16 flex justify-center items-center min-h-screen ">
//             <div className="max-w-6xl mx-auto px-4 text-center lg:max-w-4xl">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mx-auto gap-8"
//               >
//                 <MissionCard
//                   className="text-center mx-auto flex flex-col items-center " // Added flexbox here
//                   icon={<Rocket className="w-12 h-12 text-blue-400 mb-4" />}
//                   title="Our Mission"
//                   content="At Credulen, our mission is to empower individuals and organizations to harness emerging technologies as tools to unlock creativity, supercharge productivity, and enhance human authenticity like never before."
//                 />
//                 <MissionCard
//                   icon={<Star className="w-12 h-12 text-yellow-400" />}
//                   title="Our Approach"
//                   content="We deliver value through a combination of hands-on training and strategic consulting, designed to address the unique challenges of our rapidly evolving world."
//                 />
//               </motion.div>
//             </div>
//           </div>

//           <NewsletterSignup />
//         </motion.main>
//       </div>
//     </>
//   );
// };

// export default IntelligentHomepage;

// const SkillCard = ({ icon, title, description }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//     >
//       <div className="flex items-center mb-4">
//         {icon}
//         <h2 className="text-xl font-bold ml-4">{title}</h2>
//       </div>
//       <p className="text-gray-300 mb-6">{description}</p>
//       <motion.button
//         whileHover={{ x: 5 }}
//         className="flex items-center text-blue-200 font-semibold"
//       >
//         Learn More <ArrowRight className="w-5 h-5 ml-2" />
//       </motion.button>
//     </motion.div>
//   );
// };

// const TeaserSection = ({ title, icon, posts, viewAllPath, contentType }) => {
//   const navigate = useNavigate();

//   const handleViewAll = () => {
//     navigate(viewAllPath);
//   };

//   const getItemLink = (item) => {
//     switch (contentType) {
//       case "blog":
//         return `/blog/${item.slug}`;
//       case "webinar":
//         return `/webinar/${item.slug}`;
//       default:
//         return `/${contentType}/${item.slug}`;
//     }
//   };

//   return (
//     <div className="bg-white shadow-blue-300 p-8 rounded-lg shadow-lg">
//       <h2 className="text-2xl text-teal-700 font-bold mb-6 flex items-center">
//         {icon}
//         <span className="ml-2">{title}</span>
//       </h2>
//       <ul className="space-y-4">
//         {posts.map((item) => (
//           <motion.li
//             key={item.id}
//             whileHover={{ x: 5 }}
//             className="border-b border-gray-200 pb-2"
//           >
//             <Link
//               to={getItemLink(item)}
//               className="text-teal-700 hover:text-gray-600 transition-colors duration-300"
//             >
//               <h3 className="font-semibold">{item.title}</h3>
//               <p className="text-sm text-gray-500">
//                 {moment(item.createdAt).format("MMMM D, YYYY")}
//               </p>
//             </Link>
//           </motion.li>
//         ))}
//       </ul>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         className="mt-6 bg-teal-600 text-white px-3 py-1 rounded-md font-semibold hover:border-2 hover:border-teal-700 hover:bg-white hover:text-teal-700 transition-colors duration-300"
//         onClick={handleViewAll}
//       >
//         View All
//       </motion.button>
//     </div>
//   );
// };

// // Mission/vision
// const MissionCard = ({ icon, title, content }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="text-customBlack p-8 rounded-lg  hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center"
//     >
//       {/* Icon and Title */}
//       <div className="flex flex-col items-center mb-4 text-customBlack">
//         {icon}
//         <h2 className="text-2xl font-bold mt-4">{title}</h2>
//       </div>

//       {/* Content */}
//       <p className=" leading-relaxed text-customBlackk">{content}</p>
//     </motion.div>
//   );
// };

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NewsletterSignup from "../components/tools/NewsletterSignup";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";
import {
  Clock,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Book,
  Award,
  Target,
  Compass,
  Rocket,
  Star,
} from "lucide-react";

// Import images directly
import heroImage1 from "../assets/heroImage.jpg";
import heroImage2 from "../assets/heroImage2.jpg";
import insightBg from "../assets/insight.jpg";

const heroImages = [heroImage1, heroImage2];

const IntelligentHomepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchWebinars();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/getPosts`);
      const data = await response.json();
      console.log(data);
      // Sort posts by date and take the last 5
      const sortedPosts = (data.posts || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts.slice(0, 5));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWebinars = async () => {
    try {
      const response = await fetch(`${backendURL}/api/getEvents`);
      const data = await response.json();

      const webinars = Array.isArray(data.events)
        ? data.events.filter((event) => event.eventType === "webinar")
        : [];

      const currentDate = new Date();
      const upcoming = webinars.filter(
        (event) => new Date(event.date) > currentDate
      );
      const past = webinars.filter(
        (event) => new Date(event.date) <= currentDate
      );

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error) {
      console.error("Error fetching webinars:", error);
      setUpcomingEvents([]);
      setPastEvents([]);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen mx-auto text-white overflow-hidden !w-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]})`,
              filter: "brightness(50%)",
            }}
          />
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Unlock
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Intelligence
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              And
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Create
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              Value
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl"
          >
            Project-based training and Scenario-based Innovation Consulting to
            master the skills & value creation in a rapidly changing world
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex space-x-4"
          >
            <Link to={"/"}>
              <button
                className="bg-white text-black px-6 py-3 rounded-lg font-bold  
                transition-colors flex items-center justify-center hover:border-2 hover:border-white hover:bg-black hover:text-white duration-300"
              >
                Explore Our Service
              </button>
            </Link>
            <Link to={"/contactus"}>
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold  
                transition-colors flex items-center justify-center hover:border-2 hover:border-red-600 hover:bg-white hover:text-red-600 duration-300"
              >
                Contact US...
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 p-6">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Skills Section */}
          <div className="bg-gray-90 text-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <SkillCard
                  icon={<Book className="w-12 h-12 text-blue-400" />}
                  title="Skill-up with our expert-led project-based courses"
                  description="Web3 & Web3 based Data Science, Data Engineering and Generative AI to increase your earning power."
                />
                <SkillCard
                  icon={<Lightbulb className="w-12 h-12 text-yellow-400" />}
                  title="Be at the cutting-edge of value creation"
                  description="For your organization through our consulting services in Data, Blockchain, and AI integration and strategy."
                />
              </motion.div>
            </div>
          </div>

          {/* Insights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage: `url(${insightBg})`,
              }}
            />

            {/* Content */}
            <div className="relative bg-transparent py-16">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <TeaserSection
                    title="Read our latest insights"
                    items={posts}
                    posts={posts}
                    icon={<BookOpen className="w-6 h-6 text-blue-500" />}
                    viewAllPath="/blog"
                    contentType="post"
                  />
                  <TeaserSection
                    title="Join our upcoming webinars"
                    posts={upcomingEvents}
                    icon={<Clock className="w-6 h-6 text-green-500" />}
                    viewAllPath="/webinars"
                    contentType="event"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Mission Section */}
          <div className="bg-gray-10 py-16 flex justify-center items-center min-h-screen">
            <div className="max-w-6xl mx-auto px-4 text-center lg:max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mx-auto gap-8"
              >
                <MissionCard
                  className="text-center mx-auto flex flex-col items-center"
                  icon={<Rocket className="w-12 h-12 text-blue-400 mb-4" />}
                  title="Our Mission"
                  content="At Credulen, our mission is to empower individuals and organizations to harness emerging technologies as tools to unlock creativity, supercharge productivity, and enhance human authenticity like never before."
                />
                <MissionCard
                  icon={<Star className="w-12 h-12 text-yellow-400" />}
                  title="Our Approach"
                  content="We deliver value through a combination of hands-on training and strategic consulting, designed to address the unique challenges of our rapidly evolving world."
                />
              </motion.div>
            </div>
          </div>

          {/* Newsletter Section */}
          <NewsletterSignup />
        </motion.main>
      </div>
    </>
  );
};

// SkillCard Component
const SkillCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-bold ml-4">{title}</h2>
      </div>
      <p className="text-gray-300 mb-6">{description}</p>
      <motion.button
        whileHover={{ x: 5 }}
        className="flex items-center text-blue-200 font-semibold"
      >
        Learn More <ArrowRight className="w-5 h-5 ml-2" />
      </motion.button>
    </motion.div>
  );
};

// TeaserSection Component
const TeaserSection = ({ title, icon, posts, viewAllPath, contentType }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate(viewAllPath);
  };

  const getItemLink = (item) => {
    switch (contentType) {
      case "blog":
        return `/blog/${item.slug}`;
      case "webinar":
        return `/webinar/${item.slug}`;
      default:
        return `/${contentType}/${item.slug}`;
    }
  };

  return (
    <div className="bg-white shadow-blue-300 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl text-teal-700 font-bold mb-6 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      <ul className="space-y-4">
        {posts.map((item) => (
          <motion.li
            key={item.id}
            whileHover={{ x: 5 }}
            className="border-b border-gray-200 pb-2"
          >
            <Link
              to={getItemLink(item)}
              className="text-teal-700 hover:text-gray-600 transition-colors duration-300"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {moment(item.createdAt).format("MMMM D, YYYY")}
              </p>
            </Link>
          </motion.li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-6 bg-teal-600 text-white px-3 py-1 rounded-md font-semibold hover:border-2 hover:border-teal-700 hover:bg-white hover:text-teal-700 transition-colors duration-300"
        onClick={handleViewAll}
      >
        View All
      </motion.button>
    </div>
  );
};

// MissionCard Component
const MissionCard = ({ icon, title, content, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`text-customBlack p-8 rounded-lg hover:shadow-sm transition-all duration-300 flex flex-col items-center text-center ${className}`}
    >
      <div className="flex flex-col items-center mb-4 text-customBlack">
        {icon}
        <h2 className="text-2xl font-bold mt-4">{title}</h2>
      </div>
      <p className="leading-relaxed text-customBlack">{content}</p>
    </motion.div>
  );
};

export default IntelligentHomepage;
