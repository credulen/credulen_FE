import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import NewsletterSignup from "../components/tools/NewsletterSignup";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import HeroBg from "../assets/heroBg.png";
import HeroRightImage from "../assets/rightHero.png";
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
import "../index.css";

const heroImages = [heroImage1, heroImage2];

const IntelligentHomepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
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
  }, []);

  const fetchWebinars = useCallback(async () => {
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

      setUpcomingEvents(upcoming.slice(0, 5));
      setPastEvents(past.slice(0, 5));
    } catch (error) {
      console.error("Error fetching webinars:", error);
      setUpcomingEvents([]);
      setPastEvents([]);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchWebinars();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);
  const memoizedUpcomingEvents = useMemo(
    () => upcomingEvents,
    [upcomingEvents]
  );
  const memoizedPastEvents = useMemo(() => pastEvents, [pastEvents]);

  return (
    <>
      {/* Hero Section  Start*/}
      <div className="relative min-h-screen w-full overflow-hidden bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="w-full h-full bg-center bg-no-repeat bg-[length:95%]" />
        </div>

        {/* Main Content Container */}
        <div className="relative container mx-auto px-4 lg:px-8  lg:pt-0 min-h-screen">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}

            <div className="space-y-6 pt-8 lg:pt-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-teal-800"
              >
                Data, AI & Blockchain.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-co sm:flex-row items-start gap-2 sm:gap-4"
              >
                {/* Course Title */}
                <div className="relative">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2 ">
                    Courses &
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-24">
                    <svg viewBox="0 0 172 12" className="w-full">
                      <path
                        d="M1 5.5C32 5.5 32 1 62 1C92 1 92 10 122 10C152 10 152 5.5 171 5.5"
                        stroke="#EC4899"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Digital Solutions Title */}
                <div className="relative">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                    Digital Solutions
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-44">
                    <svg viewBox="0 0 172 12" className="w-full">
                      <path
                        d="M1 5.5C32 5.5 32 1 62 1C92 1 92 10 122 10C152 10 152 5.5 171 5.5"
                        stroke="#FCD34D"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-600 max-w-xl text-base md:text-lg"
              >
                Project-based training and Scenario-based Innovation Consulting
                to master the skills & value creation in a rapidly changing
                world
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/solutions/training_School">
                  <button className="relative px-6 md:px-8 py-2 md:py-3 bg-yellow-400 text-white rounded-full font-semibold hover:bg-yellow-500 transition-colors group">
                    <span className="relative z-0">Courses</span>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                  </button>
                </Link>
                <Link to="/solutions/consulting_Services">
                  <button className="relative px-6 md:px-8 py-2 md:py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors group">
                    <span className="relative z-0">Solutions</span>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                  </button>
                </Link>
              </motion.div>

              {/* Watch Previous Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-sm md:text-base"
              >
                <Link target="blank" to="https://www.youtube.com/@credulen">
                  <span className="text-gray-600 hover:text-teal-900 transform hover:scale-105 transition-all duration-300">
                    Watch Our Previous Masterclasses here
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  className="relative"
                >
                  <img
                    src={HeroRightImage}
                    alt="Credulen International Students"
                    className="w-full h-auto object-contain max-w-full"
                  />

                  {/* Stats Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 1.1 }}
                    className="absolute -bottom-4 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 mx-4 rounded-lg shadow-lg"
                  >
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-800">
                          1000+
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          Students Impacted
                        </div>
                      </div>
                      <div className="border-x border-pink-300">
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400">
                          7+
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          Courses
                        </div>
                      </div>
                      <div>
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-500">
                          5+
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          Solutions
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Hero Section  ends*/}
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 px-6">
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
                  linkTo="/solutions/training_School"
                />
                <SkillCard
                  icon={<Lightbulb className="w-12 h-12 text-yellow-400" />}
                  title="Be at the cutting-edge of value creation"
                  description="For your organization through our consulting services in Data, Blockchain, and AI integration and strategy."
                  linkTo="/solutions/consulting_Services"
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

const SkillCard = ({ icon, title, description, linkTo }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(linkTo);
  };

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
        className="flex items-center text-blue-200 hover:text-blue-500 font-semibold"
        onClick={handleLearnMore}
      >
        Learn More <ArrowRight className="w-5 h-5 ml-2 hover:text-blue-500" />
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
                {moment(item.date).format("MMMM D, YYYY")}
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
