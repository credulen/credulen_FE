  import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
  Clock,
  BookOpen,
  Share2,
} from "lucide-react";

// Import placeholder images (replace with actual assets later)
import heroImage from "../assets/campagnHeroImage.png";
import whyMissImage from "../assets/campaignSecondImage.png";
import masterclassImage from "../assets/campaignthirdImage.png";
import CredulenLogo2 from "../assets/CredulenLogo2.png";

const ShareModal = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href;
  const shareText =
    "🚀 Discover How People Are Making 6 Figures Monthly From Blockchain! Join this FREE Masterclass on Data + AI + Blockchain Analytics. Don't miss out! 💰";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + currentUrl
      )}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-blue-400 hover:bg-blue-500",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
    },
  ];

  const handleSocialShare = (url) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Share This Masterclass
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {shareLinks.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleSocialShare(platform.url)}
              className={`${platform.color} text-white p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-200 transform hover:scale-105`}>
              <platform.icon size={24} />
              <span className="text-sm font-medium">{platform.name}</span>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">Or copy link:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={currentUrl}
              readOnly
              className="flex-1 p-3 border border-gray-300 rounded-lg text-sm bg-gray-50"
            />
            <button
              onClick={handleCopyLink}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                isCopied
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}>
              {isCopied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          {isCopied && (
            <p className="text-green-600 text-sm mt-2">
              Link copied to clipboard!
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onShare }) => (
  <nav className="bg-gradient-to-r from-[#0F0B78] to-[#1A1B5C] text-white p-4  w-full z-40 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex-shrink-0">
        <Link to="/" className="flex items-center">
          <img
            src={CredulenLogo2}
            className="w-32 h-8 sm:w-40 sm:h-10 object-contain"
            alt="Credulen Logo"
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <a
          href="#solutions"
          className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78]  hover:text-[#E2FF02] transition-all duration-200">
          Solutions
        </a>
        <a
          href="#contact"
          className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78]  hover:text-[#E2FF02] transition-all duration-200">
          Contact
        </a>
        <a
          href="#contact"
          className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78]  hover:text-[#E2FF02] transition-all duration-200">
          About
        </a>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onShare}
          className="bg-yellow-300 text-white p-2 rounded-full hover:bg-[#E2962F] transition-colors duration-200 shadow-lg"
          title="Share this page">
          <Share2 size={18} />
        </button>

        <div className="md:hidden">
          <button className="text-white p-2 rounded-full bg-white/10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="b-gradient-to-br from-[#ededef] via-[#1A1B5C] to-[#7faad4] text-white py-16 lg:py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            <span className="text-[#E2FF02]">Data + AI + Blockchain:</span>
            <br />
            <span className="text-[#0F0B78]">
              What Every Innovator Needs to Know
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl mb-8 text-[#0F0B78] leading-relaxed">
            Discover How People Are Making{" "}
            <span className="text-yellow-300 font-semibold">
              6 Figures Monthly
            </span>{" "}
            From Blockchain Even Without Trading Crypto!
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#0F0B78] text-yellow-300 px-8 py-4 rounded-full font-bold text-lg hover:from-[#F4A261] hover:to-[#E2FF02] transition-all duration-300 transform hover:scale-105 shadow-xl">
            <span className="animate-pulse ">🚀 Sign Up Now - FREE!</span>
          </motion.button>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative">
            <img
              src={heroImage}
              alt="Blockchain Analytics Hero"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="bg-[#0F0B78] text-white py-8">
    <div className="container mx-auto px-4 flex justify-around items-center flex-col md:flex-row gap-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-300">1000+</h2>
        <p className="text-sm">Students Impacted</p>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-300">7+</h2>
        <p className="text-sm">Courses</p>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-300">5+</h2>
        <p className="text-sm">Solutions</p>
      </div>
    </div>
  </section>
);

const WhyMissSection = () => (
  <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <img
              src={whyMissImage}
              alt="Professional with Laptop"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0F0B78]">
            Why You Shouldn't Miss This! 🔥
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl mb-8 text-gray-700 leading-relaxed">
            This is not just another crypto hype. This is a{" "}
            <span className="text-yellow-300 font-semibold">
              clear breakdown
            </span>{" "}
            of how Blockchain Analytics is becoming the oil of the digital
            economy, and how smart Nigerians are already positioning themselves
            for{" "}
            <span className="text-[#0F0B78] font-semibold">
              remote jobs, global gigs, and real financial freedom.
            </span>
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white text-[#0F0B78] px-8 py-4 rounded-full font-bold text-lg hover:from-[#F4A261] hover:to-[#E2FF02] transition-all duration-300 transform hover:scale-105 shadow-2xl">
            💡 Learn More Now
          </motion.button>
        </div>
      </div>
    </div>
  </section>
);

const MasterclassSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <img
              src={masterclassImage}
              alt="Masterclass Preview"
              className="w-full h-[16rem] sm:h-[29rem] lg:h-[29rem] object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0B78] mb-8">
            What You'll Learn in This{" "}
            <span className="text-yellow-300">FREE</span> Pre-Recorded
            Masterclass:
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-0">
            {[
              "What Blockchain Analytics is and why it's the most in-demand skill in the Blockchain world.",
              "How companies are paying up to $3,000 per project just to get their Blockchain data analyzed.",
              "The real-life career paths and remote jobs available RIGHT NOW.",
              "Why less than 0.5% of people in the world are even aware of this field (huge opportunity).",
              "How to get started with no prior experience, step by step.",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-3 p-1 bg-gradient-to-r from-[#E2FF02]/10 to-[#F4A261]/10 rounded-xl">
                <span className="text-yellow-300 text-xl font-bold mt-1">
                  ✓
                </span>
                <span className="text-gray-700 text-lg leading-relaxed">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);
const Footer = ({ onShare }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer className="bg-gradient-to-br from-[#ededef] via-[#1A1B5C] to-[#7faad4] text-white  py-12">
      <div className="container mx-auto px-4">
        {/* Upper Section with CTA Button */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 p-6 sm:p-8 rounded-2xl shadow-2xl mb-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E2FF02] mb-4">
            🚀 Ready to Transform Your Future?
          </h3>
          <p className="text-white text-lg sm:text-xl mb-6 leading-relaxed">
            Register now!!! To unlock the power of{" "}
            <span className="font-bold text-[#E2FF02]">
              Blockchain Analytics
            </span>{" "}
            today for free!!!!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#0F0B78] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-lg hover:from-[#F4A261] hover:to-[#E2FF02] transition-all duration-300 transform hover:scale-105 shadow-xl">
              💎 Sign Up/Register Now
            </button>

            <button
              onClick={onShare || handleShare}
              className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              title={isCopied ? "Link copied!" : "Share this page"}>
              <Share2 size={20} />
              <span>{isCopied ? "Link Copied!" : "Share with Friends"}</span>
            </button>
          </div>

          {isCopied && (
            <p className="text-[#E2FF02] text-sm mt-3 animate-pulse">
              ✅ Link copied to clipboard!
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

const CampaignPage = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onShare={handleShare} />
      <main className="flex-grow pt-16">
        <HeroSection />
        <StatsSection />
        <WhyMissSection />
        <MasterclassSection />
      </main>
      <Footer onShare={handleShare} />
      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
    </div>
  );
};

export default CampaignPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";

// Import placeholder images (replace with actual assets later)
import heroImage from "../assets/campagnHeroImage.png";
import whyMissImage from "../assets/campaignSecondImage.png";
import masterclassImage from "../assets/campaignthirdImage.png";
import CredulenLogo2 from "../assets/CredulenLogo2.png";

const Navbar = () => (
  <nav
    className="text-white p- fixe w-full z-50 shadow-sm"
    style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
    <div className="container mx-auto flex justify-between items-center">
      <div className=" p-2">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={CredulenLogo2}
            className="w-[11rem] h-[3rem]"
            alt="Flowbite Logo"
          />
        </Link>
      </div>
      <div className="space-x-6 hidden md:flex">
        <a
          href="#solutions"
          className="text-sm font-medium rounded-full bg-[#0F0B78] p-2 hover:text-[#F4A261] transition-colors duration-200">
          Solutions
        </a>
<a
  href="#contact"
  className="text-sm font-medium rounded-full bg-[#0F0B78] p-2 hover:text-[#F4A261] transition-colors duration-200">
  Contact Us
</a>
        <a
          href="#about"
          className="text-sm font-medium rounded-full bg-[#0F0B78] p-2 hover:text-[#F4A261] transition-colors duration-200">
          About Us
        </a>
      </div>
      <div className="md:hidden">
        <button className="focus:outline-none rounded-full bg-[#1A3C34] p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-0 max-w-6xl mx-auto relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-blue-900 bg-clip-text text-transparent">
            Data + AI + Blockchain: What Every Innovator Needs to Know
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-6 bg-teal-900  bg-clip-text text-transparent">
            Discover How People Are Making 6 Figures Monthly From Blockchain
            Even Without Trading Crypto!
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#0F0B78] px-6 py-3 rounded-full font-semibold transition-all text-[#E2FF02]  hover:text-[#F4A261] duration-300 hover:scale-105 ">
            <span className="animate-pulse"> Sign Up Now</span>
          </motion.button>
        </div>
        <div className="md:w-1/2">
          <img
            src={heroImage}
            alt="Hero Image"
            className="w-full h-auto rounded-lg "
          />
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="bg-[#0F0B78] text-white py-8">
    <div className="container mx-auto px-4 flex justify-around items-center flex-col md:flex-row gap-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-300">1000+</h2>
        <p className="text-sm">Students Impacted</p>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-300">7+</h2>
        <p className="text-sm">Courses</p>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-yellow-300">5+</h2>
        <p className="text-sm">Solutions</p>
      </div>
    </div>
  </section>
);

const WhyMissSection = () => (
  <section className=" container mx-auto py-12 max-w-6xl">
    <div className=" px-4 flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        <img
          src={whyMissImage}
          alt="Person with Laptop"
          className="w-[90%] h-[75vh] rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-4 text-blue-800">
          Why You Shouldn’t Miss This!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-4 text-blue-900">
          This is not just another crypto hype. This is a clear breakdown of how
          Blockchain Analytics is becoming the oil of the digital economy, and
          how smart Nigerians are already positioning themselves for remote
          jobs, global gigs, and real financial freedom.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-yellow-300 text-teal-800 px-4 py-2 rounded-full font-semibold hover:text-teal-500 transition duration-300">
          Learn More
        </motion.button>
      </div>
    </div>
  </section>
);
export const MoreSection = () => (
  <section className="bg-[#0F0B78] text-white py-8"></section>
);
const MasterclassSection = () => (
  <section className="bg-white py-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/2">
        <img
          src={masterclassImage}
          alt="Laptop with Question"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-blue-900 mb-6">
          What You'll Learn in This Free Pre-Recorded Masterclass:
        </motion.h2>
        <ul className="text-lg text-blue-800 space-y-4 max-w-md">
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span> What Blockchain
            Analytics is and why it's the most in-demand skill in the Blockchain
            world.
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span> How companies are
            paying up to $3,000 per project just to get their Blockchain data
            analyzed.
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span> The real-life career
            paths and remote jobs available RIGHT NOW.
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span> Why less than 0.5%
            of people in the world are even aware of this field (huge
            opportunity).
          </li>
          <li className="flex items-start">
            <span className="text-yellow-500 mr-2">✔</span> How to get started
            with no prior experience, step by step.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer className="bg-teal-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Upper Section with CTA Button */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 p-6 rounded-lg shadow-lg mb-8 text-center">
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">
            Ready to Transform Your Future?
          </h3>
          <p className="text-white mb-6">
            Register now!!! To unlock the power of Blockchain Analytics today
            for free!!!!
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-teal-800 px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition duration-300">
            Sign Up/Register Now
          </button>
        </div>
      </div>
    </footer>
  );
};

const CampaignPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <StatsSection />
        <WhyMissSection />
        <MoreSection />
        <MasterclassSection />
      </main>
      <Footer />
    </div>
  );
};

export default CampaignPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BookOpen, Share2 } from "lucide-react";

// Import placeholder images (replace with actual assets later)
import heroImage from "../assets/campagnHeroImage.png";
import whyMissImage from "../assets/campaignSecondImage.png";
import masterclassImage from "../assets/campaignthirdImage.png";
import CredulenLogo2 from "../assets/CredulenLogo2.png";

// Color constants for consistency
const COLORS = {
  primary: "#0F0B78",
  secondary: "#E2FF02",
  accent: "#F4A261",
  darkBg: "#0A063D",
  lightBg: "#F8FAFC",
  textDark: "#1E293B",
  textLight: "#FFFFFF",
};

const Navbar = () => (
  <nav
    className="bg-white p-4 fixed w-full z-50 shadow-sm"
    style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
    <div className="container mx-auto flex justify-between items-center">
      <div className="p-2">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={CredulenLogo2}
            className="w-[11rem] h-[3rem] object-contain"
            alt="Credulen Logo"
          />
        </Link>
      </div>
      <div className="space-x-4 hidden md:flex">
        <a
          href="#solutions"
          className="text-sm font-medium rounded-full px-4 py-2 hover:bg-blue-100 transition-colors duration-200"
          style={{ color: COLORS.primary }}>
          Solutions
        </a>
        <a
          href="#contact"
          className="text-sm font-medium rounded-full px-4 py-2 hover:bg-blue-100 transition-colors duration-200"
          style={{ color: COLORS.primary }}>
          Contact Us
        </a>
        <a
          href="#about"
          className="text-sm font-medium rounded-full px-4 py-2 hover:bg-blue-100 transition-colors duration-200"
          style={{ color: COLORS.primary }}>
          About Us
        </a>
      </div>
      <div className="md:hidden">
        <button className="focus:outline-none rounded-full p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: COLORS.primary }}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

const HeroSection = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Data + AI + Blockchain Masterclass",
          text: "Discover How People Are Making 6 Figures Monthly From Blockchain!",
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  return (
    <section
      className="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-16 md:py-24 relative overflow-hidden"
      style={{ marginTop: "4rem" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{ color: COLORS.secondary }}>
              Data + AI + Blockchain: What Every Innovator Needs to Know
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl mb-6"
              style={{ color: COLORS.textLight }}>
              Discover How People Are Making 6 Figures Monthly From Blockchain
              Even Without Trading Crypto!
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center"
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.secondary,
                }}>
                <span className="animate-pulse">Sign Up Now</span>
              </motion.button>
              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
                <Share2 size={18} />
                {isSharing ? "Link Copied!" : "Share"}
              </motion.button>
            </div>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src={heroImage}
              alt="Hero Image"
              className="w-full h-auto rounded-lg shadow-xl max-h-[400px] object-cover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => (
  <section
    className="py-8 md:py-12"
    style={{ backgroundColor: COLORS.primary }}>
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div className="p-4">
        <h2
          className="text-4xl font-bold mb-2"
          style={{ color: COLORS.secondary }}>
          1000+
        </h2>
        <p className="text-sm" style={{ color: COLORS.textLight }}>
          Students Impacted
        </p>
      </div>
      <div className="p-4">
        <h2
          className="text-4xl font-bold mb-2"
          style={{ color: COLORS.secondary }}>
          7+
        </h2>
        <p className="text-sm" style={{ color: COLORS.textLight }}>
          Courses
        </p>
      </div>
      <div className="p-4">
        <h2
          className="text-4xl font-bold mb-2"
          style={{ color: COLORS.secondary }}>
          5+
        </h2>
        <p className="text-sm" style={{ color: COLORS.textLight }}>
          Solutions
        </p>
      </div>
    </div>
  </section>
);

const WhyMissSection = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Why You Shouldn't Miss This Blockchain Opportunity",
          text: "Discover how Blockchain Analytics is becoming the oil of the digital economy",
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <motion.img
              src={whyMissImage}
              alt="Person with Laptop"
              className="w-full h-auto rounded-lg shadow-lg max-h-[500px] object-cover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="md:w-1/2 order-1 md:order-2 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: COLORS.primary }}>
              Why You Shouldn't Miss This!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg mb-6"
              style={{ color: COLORS.textDark }}>
              This is not just another crypto hype. This is a clear breakdown of
              how Blockchain Analytics is becoming the oil of the digital
              economy, and how smart Nigerians are already positioning
              themselves for remote jobs, global gigs, and real financial
              freedom.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: COLORS.secondary,
                  color: COLORS.primary,
                }}>
                Learn More
              </motion.button>
              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium border border-blue-800 text-blue-800 hover:bg-blue-50">
                <Share2 size={18} />
                {isSharing ? "Link Copied!" : "Share"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MasterclassSection = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Blockchain Analytics Masterclass",
          text: "Learn what you'll discover in this free pre-recorded masterclass",
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <motion.img
              src={masterclassImage}
              alt="Laptop with Question"
              className="w-full h-auto rounded-lg shadow-lg max-h-[500px] object-cover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-bold mb-6"
              style={{ color: COLORS.primary }}>
              What You'll Learn in This Free Pre-Recorded Masterclass:
            </motion.h2>
            <ul
              className="text-lg space-y-4 mb-8"
              style={{ color: COLORS.textDark }}>
              <li className="flex items-start">
                <span className="mr-3" style={{ color: COLORS.secondary }}>
                  ✔
                </span>
                What Blockchain Analytics is and why it's the most in-demand
                skill in the Blockchain world.
              </li>
              <li className="flex items-start">
                <span className="mr-3" style={{ color: COLORS.secondary }}>
                  ✔
                </span>
                How companies are paying up to $3,000 per project just to get
                their Blockchain data analyzed.
              </li>
              <li className="flex items-start">
                <span className="mr-3" style={{ color: COLORS.secondary }}>
                  ✔
                </span>
                The real-life career paths and remote jobs available RIGHT NOW.
              </li>
              <li className="flex items-start">
                <span className="mr-3" style={{ color: COLORS.secondary }}>
                  ✔
                </span>
                Why less than 0.5% of people in the world are even aware of this
                field (huge opportunity).
              </li>
              <li className="flex items-start">
                <span className="mr-3" style={{ color: COLORS.secondary }}>
                  ✔
                </span>
                How to get started with no prior experience, step by step.
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.secondary,
                }}>
                Register for Free
              </motion.button>
              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-3 rounded-full font-medium border border-blue-800 text-blue-800 hover:bg-blue-50">
                <Share2 size={18} />
                {isSharing ? "Link Copied!" : "Share"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Blockchain Analytics Masterclass",
          text: "Register now to unlock the power of Blockchain Analytics today for free!",
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  return (
     <footer
      className="bg-gradient-to-br from-[#ededef] via-[#1A1B5C] to-[#7faad4] text-white py-12"
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-offset="200">
      <div className="container mx-auto px-4">
        {/* Upper Section with CTA Button */}
        <div
          className="bg-gradient-to-r from-teal-800 to-teal-600 p-6 md:p-8 rounded-lg shadow-lg mb-8 text-center"
          style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h3
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{ color: COLORS.secondary }}>
            Ready to Transform Your Future?
          </h3>
          <p className="text-white mb-6 md:text-lg">
            Register now!!! To unlock the power of Blockchain Analytics today
            for free!!!!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${COLORS.secondary}, #FFD700)`,
                color: COLORS.primary,
              }}>
              Sign Up/Register Now
            </motion.button>
            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-white bg-opacity-20 hover:bg-opacity-30">
              <Share2 size={18} />
              {isSharing ? "Link Copied!" : "Share This"}
            </motion.button>
          </div>
        </div>

        {/* Lower Footer Section */}
        <div className="pt-8 border-t border-teal-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              src={CredulenLogo2}
              className="w-[11rem] h-[3rem] object-contain"
              alt="Credulen Logo"
            />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-teal-300">
          © {new Date().getFullYear()} Credulen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const CampaignPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <WhyMissSection />
        <MasterclassSection />
      </main>
      <Footer />
    </div>
  );
};

export default CampaignPage;