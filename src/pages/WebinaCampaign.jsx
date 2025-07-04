import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
  Share2,
  Menu,
  X,
  Play,
  Clock,
  Users,
  Star,
  TrendingUp,
  AlertCircle,
  Loader,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import CredulenLogo2 from "../assets/CredulenLogo2.png";
import CredulenLogo from "../assets/CredulenLogo.png";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const ShareModal = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = window.location.href;
  const shareText =
    "🔥 Watch This FREE Webinar & Discover How to Earn ₦100K–₦200K Monthly Helping Nigerian Businesses With Simple Data Skills";

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
      color: "bg-green hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(
        shareText + " " + currentUrl
      )}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#0F0B78] hover:bg-[#1A1A5C]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#0F0B78] hover:bg-[#1A1A5C]",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0F0B78] hover:bg-[#1A1A5C]",
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
          <h3 className="text-xl font-bold text-[#0F0B78]">
            Share This Webinar
          </h3>
          <button
            onClick={onClose}
            className="text-[#1A1A5C] hover:text-[#F4A261] text-2xl">
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {shareLinks.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleSocialShare(platform.url)}
              className={`${platform.color} text-white p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105`}>
              <platform.icon size={24} />
              <span className="text-sm font-medium">{platform.name}</span>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-[#1A1A5C] mb-3">Or copy link:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={currentUrl}
              readOnly
              className="flex-1 p-3 border border-[#1A1A5C] rounded-lg text-sm bg-gray-50"
            />
            <button
              onClick={handleCopyLink}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                isCopied
                  ? "bg-[#F4A261] text-white"
                  : "bg-[#E2FF02] hover:bg-[#F4A261] text-[#0F0B78]"
              } hover:scale-105`}>
              {isCopied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          {isCopied && (
            <p className="text-[#F4A261] text-sm mt-2">
              Link copied to clipboard!
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const PaymentModal = ({ isOpen, onClose }) => {
  const [webinarDetails, setWebinarDetails] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  // Fetch webinar details
  useEffect(() => {
    if (isOpen) {
      const fetchWebinarDetails = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${backendURL}/api/webinar/data-analytics-course`
          );
          const data = await response.json();
          if (response.ok) {
            setWebinarDetails(data.data);
          } else {
            throw new Error(data.message || "Failed to fetch webinar details");
          }
        } catch (error) {
          setAlertInfo({
            message: "Failed to load webinar details. Please try again.",
            variant: "destructive",
            icon: AlertCircle,
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchWebinarDetails();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      setAlertInfo({
        message: "Please fill in all required fields.",
        variant: "destructive",
        icon: AlertCircle,
      });
      return;
    }

    if (!webinarDetails) {
      setAlertInfo({
        message: "Webinar details not loaded. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
      return;
    }

    setIsLoading(true);
    try {
      const amountInKobo = webinarDetails.amount * 100;
      const payload = {
        ...formData,
        webinarTitle: webinarDetails.title,
        webinarSlug: webinarDetails.slug,
        amount: webinarDetails.amount,
        callback_url: `${window.location.origin}/webinar-payment-success`,
      };

      const response = await fetch(
        `${backendURL}/api/initiate-webinar-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment initialization failed");
      }

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        throw new Error("No payment URL received from server");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setAlertInfo({
        message:
          error.message || "Failed to initialize payment. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => {
        setAlertInfo(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-[#0F0B78]">
            Checkout
          </h3>
          <button
            onClick={onClose}
            className="text-[#1A1A5C] hover:text-[#F4A261] text-2xl">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A5C] mb-1">
                First Name <span className="text-[#F4A261]">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#1A1A5C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261] transition-colors text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A5C] mb-1">
                Last Name <span className="text-[#F4A261]">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#1A1A5C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261] transition-colors text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A5C] mb-1">
              Email Address <span className="text-[#F4A261]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#1A1A5C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261] transition-colors text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A5C] mb-1">
              Phone Number <span className="text-[#F4A261]">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#1A1A5C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4A261] transition-colors text-sm"
              placeholder="+234 123 456 7890"
              required
            />
          </div>
        </div>

        <div className="mt-4 bg-[#E2FF02]/10 p-3 rounded-lg">
          <h4 className="text-md font-semibold text-[#0F0B78] mb-2">
            Order Summary
          </h4>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={webinarDetails?.image}
              alt={webinarDetails?.title}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div>
              <h5 className="text-sm font-medium text-[#1A1A5C]">
                {webinarDetails?.title}
              </h5>
              <p className="text-xs text-[#1A1A5C]">
                {webinarDetails?.category}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-md font-semibold">
            <span className="text-[#1A1A5C]">Total:</span>
            <span className="text-[#F4A261]">
              ₦{webinarDetails?.amount.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-[#0F0B78] to-[#1A1A5C] text-white py-3 rounded-lg hover:opacity-70 transition-all duration-300 flex items-center justify-center mt-4 text-sm font-medium"
          disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="animate-spin mr-2" size={18} />
              Processing...
            </>
          ) : (
            `Pay ₦${webinarDetails?.amount.toLocaleString()}`
          )}
        </button>
        <p className="text-xs text-[#1A1A5C] text-center mt-2">
          Secure payment via Paystack
        </p>

        {alertInfo && (
          <div className="mt-3 p-2 bg-[#F4A261]/10 border border-[#F4A261] rounded-lg flex items-center gap-2">
            <alertInfo.icon className="h-4 w-4 text-[#F4A261] flex-shrink-0" />
            <p className="text-xs text-[#1A1A5C]">{alertInfo.message}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Navbar = ({ onShare }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (
      mobileMenuOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className=" top-0 left-0 right-0 bg-white text-[#0F0B78] p-4 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <img
            src={CredulenLogo2}
            className="w-28 h-7 sm:w-36 sm:h-9 object-contain"
            alt="Credulen Logo"
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            target="_blank"
            to="/solutions/training_School"
            className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105">
            Solutions
          </Link>
          <Link
            target="_blank"
            to="/contactus"
            className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105">
            Contact
          </Link>
          <Link
            target="_blank"
            to="/"
            className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onShare}
            className="bg-[#F4A261] hover:bg-[#E2FF02] text-[#0F0B78] p-2 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
            title="Share this webinar">
            <Share2 size={18} />
          </button>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-full bg-[#0F0B78] hover:bg-[#1A1A5C] transition-all duration-300 hover:scale-105"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            ref={menuRef}
            className="bg-white w-64 h-full pt-16 px-4 space-y-3 transform transition-transform duration-300 ease-in-out fixed top-0 right-0">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-[#0F0B78] p-2 rounded-full hover:border-2 hover:border-[#F4A261] transition-all duration-300"
              aria-label="Close menu">
              <X size={24} />
            </button>

            <Link
              target="_blank"
              to="/solutions/training_School"
              className="block text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}>
              Solutions
            </Link>
            <Link
              target="_blank"
              to="/contactus"
              className="block text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link
              target="_blank"
              to="/"
              className="block text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => (
  <section className="bg-gradient-to-br from-[#0F0B78] to-[#1A1A5C] text-white py-20 px-4  max-w-6xl">
    <div className="container mx-auto max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8">
        <div className="inline-flex items-center bg-[#F4A261] text-[#0F0B78] px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
          <span className="w-2 h-2 bg-[#E2FF02] rounded-full mr-2 animate-ping"></span>
          LIMITED TIME OFFER
        </div>

        <h1 className="text-4xl sm:text-4xl mid:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="text-[#E2FF02]">
            🔥 Watch This FREE Webinar & Discover How to Earn.
          </span>
          <br />
          <span className="text-[#F4A261] mid:text-3xl text-4xl">
            ₦100K–₦200K Monthly
          </span>
          <br />
          <div className=" max-w-4xl mx-auto">
            <span className="text-[#0F0B78] text-5xl">
              Helping Nigerian Businesses With Simple Data Skills
            </span>
          </div>
        </h1>

        <h2 className="text-xl sm:text-2xl mb-8 text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Learn how to use easy-to-learn, in-demand tools like Google Sheets to
          solve real problems for businesses — and get paid well doing it.
          <span className="text-[#7f8651] font-semibold text-md">
            {" "}
            No tech experience required...
          </span>
        </h2>

        <div className="bg-[#E2FF02] text-[#0F0B78] opacity-80 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
          <p className="font-semibold">
            <strong>PS:</strong> We strongly recommend you watch till the end —
            this video may not be available again after today.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="flex items-center text-[#0F0B78]">
          <Clock size={20} className="mr-2" />
          <span className="text-sm">45 min webinar</span>
        </div>
        <div className="flex items-center text-[#0F0B78]">
          <Users size={20} className="mr-2" />
          <span className="text-sm">50+ watched</span>
        </div>
        <div className="flex items-center text-[#0F0B78]">
          <Star size={20} className="mr-2" />
          <span className="text-sm">4.5/5 rating</span>
        </div>
        <div className="flex items-center text-[#0F0B78]">
          <TrendingUp size={20} className="mr-2" />
          <span className="text-sm">High demand skill</span>
        </div>
      </motion.div>
    </div>
  </section>
);

const VideoSection = ({ onEnroll }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#1A1A5C] rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative aspect-[4/3] sm:aspect-video min-h-[280px] sm:min-h-0">
            {!isPlaying ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center w-20 h-20 bg-[#F4A261] rounded-full shadow-lg hover:bg-[#E2FF02] transition-colors">
                <Play size={32} className="text-[#0F0B78] ml-1" />
              </motion.button>
            ) : (
              <div
                style={{ padding: "56.25% 0 0 0", position: "relative" }}
                className="w-full h-full">
                <iframe
                  src="https://player.vimeo.com/video/1096909912?h=8b712333e7&badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  title="AI and Blockchain _ Future Trends _ Advantages of Combining Both AI and Blockchain _ Blocktunix"></iframe>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 right-4 bg-[#0F0B78] text-[#E2FF02] px-3 py-1 rounded-full text-sm">
            45:23
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F0B78] mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-[#1A1A5C] mb-8 max-w-2xl mx-auto">
            Tap the button below to pay and get access to the 5-Day Course:
            <span className="font-semibold text-[#0F0B78]">
              {" "}
              Data Analytics for Everyday Nigerian Businesses
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnroll}
            className="bg-[#0F0B78] to-[#1A1A5C] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
            🚀 Enroll Now For 5 Days Class
          </motion.button>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#1A1A5C]">
            <div className="flex items-center">
              <Check size={16} className="text-[#F4A261] mr-1" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-[#F4A261] mr-1" />
              <span>5-Day Course</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-[#F4A261] mr-1" />
              <span>Google Sheets Training</span>
            </div>
            <div className="flex items-center">
              <Check size={16} className="text-[#F4A261] mr-1" />
              <span>Business Analytics</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onShare, onEnroll }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer className="bg-gradient-to-br from-[#0F0B78] to-[#1A1A5C] text-white pt-12 pb-6 px-4">
      <div className="container mx-auto">
        {/* Main CTA Section */}
        <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-2xl mb-12 overflow-hidden relative text-center">
          <div className="absolute inset-0 bg-[#F4A261]/10 opacity-50 blur-md"></div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E2FF02] mb-4 tracking-tight">
                🚀 Unlock Your Earnings Potential!
              </h3>
              <p className="text-lg sm:text-xl text-[#0F0B78] mb-6 max-w-2xl mx-auto leading-relaxed">
                Master simple data skills and earn{" "}
                <span className="text-[#F4A261] font-bold">
                  ₦100K-₦200K monthly
                </span>{" "}
                by solving real problems for Nigerian businesses.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEnroll}
                className="bg-[#F4A261] text-[#0F0B78]  p-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                <Zap size={18} />
                <span>Enroll Now!</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShare || handleShare}
                className="text-[#F4A261] bg-[#0F0B78]  p-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                title={isCopied ? "Link copied!" : "Share this webinar"}>
                <Share2 size={18} />
                <span>{isCopied ? "Copied!" : "Share with friends"}</span>
              </motion.button>
            </div>

            {isCopied && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[#E2FF02] text-sm font-medium flex items-center justify-center space-x-2 animate-pulse">
                <CheckCircle size={16} />
                <span>Link copied to clipboard!</span>
              </motion.div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-[#0F0B78] text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Starts Immediately</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>Join 50+ Learners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content Grid */}

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 Credulen. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center text-gray-400 text-sm">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Over 50+ Students Enrolled
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WebinaCampaign = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleEnroll = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onShare={handleShare} />
      <main className="flex-grow">
        <HeroSection />
        <VideoSection onEnroll={handleEnroll} />
      </main>
      <Footer onShare={handleShare} onEnroll={handleEnroll} />
      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default WebinaCampaign;
