// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import {
//   Facebook,
//   Twitter,
//   Linkedin,
//   MessageCircle,
//   Copy,
//   Check,
//   Clock,
//   BookOpen,
//   Share2,
// } from "lucide-react";

// import { Alert, AlertDescription } from "../components/tools/Alerts2";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// // Import placeholder images (replace with actual assets later)
// import heroImage from "../assets/campagnHeroImage.png";
// import whyMissImage from "../assets/campaignSecondImage.png";
// import masterclassImage from "../assets/campaignthirdImage.png";
// import CredulenLogo2 from "../assets/CredulenLogo2.png";
// import CredulenLogo from "../assets/CredulenLogo.png";

// const ShareModal = ({ isOpen, onClose }) => {
//   const [isCopied, setIsCopied] = useState(false);
//   const currentUrl = window.location.href;
//   const shareText =
//     "🚀 Discover How People Are Making 6 Figures Monthly From Blockchain! Join this FREE Masterclass on Data + AI + Blockchain Analytics. Don't miss out! 💰";

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(currentUrl);
//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy link:", err);
//     }
//   };

//   const shareLinks = [
//     {
//       name: "WhatsApp",
//       icon: MessageCircle,
//       color: "bg-teal-500 hover:bg-green-600",
//       url: `https://wa.me/?text=${encodeURIComponent(
//         shareText + " " + currentUrl
//       )}`,
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       color: "bg-blue-600 hover:bg-blue-700",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         currentUrl
//       )}"e=${encodeURIComponent(shareText)}`,
//     },
//     {
//       name: "Twitter",
//       icon: Twitter,
//       color: "bg-blue-400 hover:bg-blue-500",
//       url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//         shareText
//       )}&url=${encodeURIComponent(currentUrl)}`,
//     },
//     {
//       name: "LinkedIn",
//       icon: Linkedin,
//       color: "bg-blue-700 hover:bg-blue-800",
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//         currentUrl
//       )}`,
//     },
//   ];

//   const handleSocialShare = (url) => {
//     window.open(url, "_blank", "width=600,height=400");
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold text-gray-800">Share This link</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-2xl">
//             ×
//           </button>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {shareLinks.map((platform) => (
//             <button
//               key={platform.name}
//               onClick={() => handleSocialShare(platform.url)}
//               className={`${platform.color} text-white p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105`}
//               data-aos="zoom-in"
//               data-aos-duration="600">
//               <platform.icon size={24} />
//               <span className="text-sm font-medium">{platform.name}</span>
//             </button>
//           ))}
//         </div>

//         <div className="border-t pt-4">
//           <p className="text-sm text-gray-600 mb-3">Or copy link:</p>
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={currentUrl}
//               readOnly
//               className="flex-1 p-3 border border-gray-300 rounded-lg text-sm bg-gray-50"
//             />
//             <button
//               onClick={handleCopyLink}
//               className={`p-3 rounded-lg transition-colors duration-200 ${
//                 isCopied
//                   ? "bg-green-500 text-white"
//                   : "bg-gray-200 hover:bg-gray-300 text-gray-700"
//               } hover:scale-105`}
//               data-aos="zoom-in"
//               data-aos-duration="600">
//               {isCopied ? <Check size={20} /> : <Copy size={20} />}
//             </button>
//           </div>
//           {isCopied && (
//             <p className="text-green-600 text-sm mt-2">
//               Link copied to clipboard!
//             </p>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const RegistrationModal = ({ isOpen, onClose }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNum, setPhoneNum] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertConfig, setAlertConfig] = useState({
//     variant: "default",
//     message: "",
//   });

//   const showAlertMessage = (message, variant = "default") => {
//     setAlertConfig({ message, variant });
//     setShowAlert(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Client-side validation
//     if (!name || !email || !phoneNum) {
//       showAlertMessage("Please fill in all fields.", "destructive");
//       setTimeout(() => setShowAlert(false), 5000);
//       return;
//     }
//     if (!/^\+?[\d\s-]{10,}$/.test(phoneNum)) {
//       showAlertMessage(
//         "Please enter a valid phone number (e.g., +2348012345678).",
//         "destructive"
//       );
//       setTimeout(() => setShowAlert(false), 5000);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${backendURL}/api/registerCampaign`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, phoneNum }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       showAlertMessage(data.message || "Registration successful!", "success");
//       setName("");
//       setEmail("");
//       setPhoneNum("");
//       setTimeout(() => {
//         setShowAlert(false);
//         setIsLoading(false);
//         onClose();
//       }, 5000);
//     } catch (err) {
//       showAlertMessage(
//         err.message ||
//           "An error occurred during registration. Please try again.",
//         "destructive"
//       );
//       setIsLoading(false);
//       setTimeout(() => setShowAlert(false), 5000);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold text-gray-800">
//             Register for Campaign Class
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-2xl"
//             disabled={isLoading}>
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F0B78] focus:border-transparent"
//               placeholder="Enter your full name"
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F0B78] focus:border-transparent"
//               placeholder="Enter your email"
//               required
//               disabled={isLoading}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="phoneNum"
//               className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phoneNum"
//               value={phoneNum}
//               onChange={(e) => setPhoneNum(e.target.value)}
//               className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F0B78] focus:border-transparent"
//               placeholder="Enter your phone (e.g., +2348012345678)"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           {showAlert && (
//             <Alert
//               variant={alertConfig.variant}
//               show={showAlert}
//               onClose={() => setShowAlert(false)}
//               autoClose={true}
//               autoCloseTime={5000}>
//               <AlertDescription>{alertConfig.message}</AlertDescription>
//             </Alert>
//           )}

//           <button
//             type="submit"
//             className={`w-full px-4 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
//               isLoading
//                 ? "bg-gray-400 text-white cursor-not-allowed"
//                 : "bg-[#0F0B78] text-yellow-300 hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02]"
//             }`}
//             disabled={isLoading}>
//             {isLoading ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin h-5 w-5 mr-2 text-white"
//                   viewBox="0 0 24 24">
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
//                   />
//                 </svg>
//                 Loading...
//               </span>
//             ) : (
//               "Submit Registration"
//             )}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// const Navbar = ({ onShare }) => (
//   <nav className="bg-gradient-to-r from-[#0F0B78] to-[#1A1B5C] text-white p-4 w-full z-40 shadow-lg">
//     <div className="container mx-auto flex justify-between items-center">
//       <div className="flex-shrink-0">
//         <Link to="/" className="flex items-center">
//           <img
//             src={CredulenLogo2}
//             className="w-32 h-8 sm:w-40 sm:h-10 object-contain"
//             alt="Credulen Logo"
//           />
//         </Link>
//       </div>

//       <div className="hidden md:flex items-center space-x-4">
//         <Link target="_blank" to={"/solutions/training_School"}>
//           <span
//             className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] text-white transition-all duration-300 hover:scale-105"
//             data-aos="zoom-in"
//             data-aos-duration="600">
//             Solutions
//           </span>
//         </Link>
//         <Link target="_blank" to={"/contactus"}>
//           <span
//             className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] text-white transition-all duration-300 hover:scale-105"
//             data-aos="zoom-in"
//             data-aos-duration="600">
//             Contact
//           </span>
//         </Link>
//         <Link target="_blank" to={"/"}>
//           <span
//             className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] text-white transition-all duration-300 hover:scale-105"
//             data-aos="zoom-in"
//             data-aos-duration="600">
//             About
//           </span>
//         </Link>
//       </div>

//       <div className="flex items-center space-x-3">
//         <button
//           onClick={onShare}
//           className="bg-yellow-300 text-white p-2 rounded-full hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-lg"
//           title="Share this page"
//           data-aos="zoom-in"
//           data-aos-duration="600">
//           <Share2 size={18} />
//         </button>

//         <div className="md:hidden">
//           <button
//             className="text-white p-2 rounded-full bg-white/10 hover:bg-gradient-to-r from-[#F4A261]/20 to-[#E2FF02]/20 transition-all duration-300 hover:scale-105"
//             data-aos="zoom-in"
//             data-aos-duration="600">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   </nav>
// );

// const HeroSection = ({ onRegister }) => (
//   <section
//     className=" text-white py-16 lg:py-10"
//     data-aos="zoom-in"
//     data-aos-duration="1000"
//     data-aos-offset="200">
//     <div className="container mx-auto px-4">
//       <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
//         <div className="w-full lg:w-1/2 text-center lg:text-left">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
//             <span className="text-[#E2FF02]">Data + AI + Blockchain:</span>
//             <br />
//             <span className="text-[#0F0B78]">
//               What Every Innovator Needs to Know
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-lg sm:text-xl lg:text-2xl mb-8 text-[#0F0B78] leading-relaxed">
//             Discover How People Are Making{" "}
//             <span className="text-yellow-300 font-semibold">
//               6 Figures Monthly
//             </span>{" "}
//             From Blockchain Even Without Trading Crypto!
//           </motion.p>

//           <motion.button
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             onClick={onRegister}
//             className="bg-[#0F0B78] text-yellow-300 px-8 py-4 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-xl"
//             data-aos="zoom-in"
//             data-aos-duration="600">
//             <span className="animate-pulse ">🚀 Sign Up Now - FREE!</span>
//           </motion.button>
//         </div>

//         <div className="w-full lg:w-1/2">
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="relative">
//             <img
//               src={heroImage}
//               alt="Blockchain Analytics Hero"
//               className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-sm"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const StatsSection = () => (
//   <section
//     className="bg-[#0F0B78] text-white py-8"
//     data-aos="zoom-out"
//     data-aos-duration="800"
//     data-aos-offset="100">
//     <div className="container mx-auto px-4 flex justify-around items-center flex-col md:flex-row gap-6">
//       <div className="text-center">
//         <h2 className="text-4xl font-bold text-yellow-300">1000+</h2>
//         <p className="text-sm">Students Impacted</p>
//       </div>
//       <div className="text-center">
//         <h2 className="text-4xl font-bold text-yellow-300">7+</h2>
//         <p className="text-sm">Courses</p>
//       </div>
//       <div className="text-center">
//         <h2 className="text-4xl font-bold text-yellow-300">5+</h2>
//         <p className="text-sm">Solutions</p>
//       </div>
//     </div>
//   </section>
// );

// const WhyMissSection = () => (
//   <section
//     className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24"
//     data-aos="zoom-in"
//     data-aos-duration="1000"
//     data-aos-offset="200">
//     <div className="container mx-auto px-4">
//       <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
//         <div className="w-full lg:w-1/2 order-2 lg:order-1">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}>
//             <img
//               src={whyMissImage}
//               alt="Professional with Laptop"
//               className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
//             />
//           </motion.div>
//         </div>

//         <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#0F0B78]">
//             Why You Shouldn't Miss This! 🔥
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-lg sm:text-xl mb-8 text-gray-700 leading-relaxed">
//             This is not just another crypto hype. This is a{" "}
//             <span className="text-yellow-300 font-semibold">
//               clear breakdown
//             </span>{" "}
//             of how Blockchain Analytics is becoming the oil of the digital
//             economy, and how smart Nigerians are already positioning themselves
//             for{" "}
//             <span className="text-[#0F0B78] font-semibold">
//               remote jobs, global gigs, and real financial freedom.
//             </span>
//           </motion.p>

//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="bg-white text-[#0F0B78] px-8 py-4 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-2xl"
//             data-aos="zoom-in"
//             data-aos-duration="600">
//             💡 Learn More Now
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const MasterclassSection = () => (
//   <section
//     className="bg-white py-16 lg:py-24"
//     data-aos="zoom-out"
//     data-aos-duration="1000"
//     data-aos-offset="200">
//     <div className="container mx-auto px-4">
//       <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
//         <div className="w-full lg:w-1/2">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}>
//             <img
//               src={masterclassImage}
//               alt="Masterclass Preview"
//               className="w-full h-[16rem] sm:h-[29rem] lg:h-[29rem] object-cover rounded-2xl shadow-2xl"
//             />
//           </motion.div>
//         </div>

//         <div className="w-full lg:w-1/2 text-center lg:text-left">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F0B78] mb-8">
//             What You'll Learn in This{" "}
//             <span className="text-yellow-300">FREE</span> Pre-Recorded
//             Masterclass:
//           </motion.h2>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="space-y-0">
//             {[
//               "What Blockchain Analytics is and why it's the most in-demand skill in the Blockchain world.",
//               "How companies are paying up to $3,000 per project just to get their Blockchain data analyzed.",
//               "The real-life career paths and remote jobs available RIGHT NOW.",
//               "Why less than 0.5% of people in the world are even aware of this field (huge opportunity).",
//               "How to get started with no prior experience, step by step.",
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
//                 className="flex items-start space-x-3 p-1 bg-gradient-to-r from-[#E2FF02]/10 to-[#F4A261]/10 rounded-xl">
//                 <span className="text-yellow-300 text-xl font-bold mt-1">
//                   ✓
//                 </span>
//                 <span className="text-gray-700 text-lg leading-relaxed">
//                   {item}
//                 </span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const InfoSection = ({ onRegister }) => (
//   <section
//     className="bg-gradient-to-b from-[#0F0B78]/5 to-white py-12 lg:py-12"
//     data-aos="fade-up"
//     data-aos-duration="1000"
//     data-aos-offset="200">
//     <div className="container mx-auto px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F0B78] mb-4">
//           Why Join Our <span className="text-yellow-300">FREE</span> Blockchain
//           Masterclass? 🔥
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="text-lg text-gray-700 mb-6 leading-relaxed">
//           Learn how to tap into{" "}
//           <span className="text-[#0F0B78] font-semibold">
//             6-figure opportunities
//           </span>{" "}
//           in Blockchain Analytics without coding or trading crypto. Perfect for
//           students, job seekers, freelancers, and anyone curious about Web3!
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="space-y-3 mb-6">
//           {[
//             "Discover Blockchain Analytics and why it’s in high demand.",
//             "Explore remote jobs and career paths paying up to $3,000/project.",
//             "Start with no experience using free tools and resources.",
//             "Get a FREE Blockchain Career Guide after the session.",
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
//               className="flex items-center justify-center space-x-2">
//               <span className="text-yellow-300 text-lg">✅</span>
//               <span className="text-gray-700 text-base">{item}</span>
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.button
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           onClick={onRegister}
//           className="bg-[#0F0B78] text-yellow-300 px-6 py-3 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-lg"
//           data-aos="zoom-in"
//           data-aos-duration="600">
//           <span className="animate-pulse">🚀 Sign Up Now - FREE!</span>
//         </motion.button>
//       </motion.div>
//     </div>
//   </section>
// );

// const Footer = ({ onShare, onRegister }) => {
//   const [isCopied, setIsCopied] = useState(false);

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };

//   return (
//     <footer
//       className="bg-gradient-to-br from-[#ededef] via-[#1A1B5C] to-[#7faad4] text-white py-12"
//       data-aos="zoom-in"
//       data-aos-duration="1000"
//       data-aos-offset="200">
//       <div className="container mx-auto px-4">
//         <div className="bg-gradient-to-r from-teal-800 to-teal-600 p-6 sm:p-8 rounded-2xl shadow-2xl mb-8 text-center">
//           <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E2FF02] mb-4">
//             🚀 Ready to Transform Your Future?
//           </h3>
//           <p className="text-white text-lg sm:text-xl mb-6 leading-relaxed">
//             Register now!!! To unlock the power of{" "}
//             <span className="font-bold text-[#E2FF02]">
//               Blockchain Analytics
//             </span>{" "}
//             today for free!!!!
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <button
//               onClick={onRegister}
//               className="bg-[#0F0B78] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-xl">
//               <span className="animate-pulse ">🚀 Sign Up Now - FREE!</span>
//             </button>

//             <button
//               onClick={onShare || handleShare}
//               className="flex bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-gradient-to-r from-[#F4A261]/30 to-[#E2FF02]/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
//               title={isCopied ? "Link copied!" : "Share this page"}>
//               <Share2 size={20} className="mr-3" />
//               <span>{isCopied ? "Link Copied!" : "Share with Friends"}</span>
//             </button>
//           </div>

//           {isCopied && (
//             <p className="text-[#E2FF02] text-sm mt-3 animate-pulse">
//               ✅ Link copied to clipboard!
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center">
//         <div className="mb-4 md:mb-0">
//           <img
//             src={CredulenLogo}
//             className="w-[11rem] h-[3rem] object-contain text-white"
//             alt="Credulen Logo"
//           />
//         </div>
//         <div className="flex space-x-6">
//           <a href="#" className="hover:text-yellow-300 transition-colors">
//             Terms
//           </a>
//           <a href="#" className="hover:text-yellow-300 transition-colors">
//             Privacy
//           </a>
//           <a href="#" className="hover:text-yellow-300 transition-colors">
//             Contact
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const CampaignPage = () => {
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

//   const handleShare = () => {
//     setIsShareModalOpen(true);
//   };

//   const closeShareModal = () => {
//     setIsShareModalOpen(false);
//   };

//   const closeRegistrationModal = () => {
//     setIsRegistrationModalOpen(false);
//   };

//   const handleRegistrationOpen = () => {
//     setIsRegistrationModalOpen(true);
//   };

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       offset: 200,
//     });
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar onShare={handleShare} />
//       <main className="flex-grow pt-16">
//         <HeroSection onRegister={handleRegistrationOpen} />
//         <StatsSection />
//         <WhyMissSection />
//         <MasterclassSection />
//         <InfoSection />
//       </main>
//       <Footer onShare={handleShare} onRegister={handleRegistrationOpen} />
//       <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
//       <RegistrationModal
//         isOpen={isRegistrationModalOpen}
//         onClose={closeRegistrationModal}
//       />
//     </div>
//   );
// };

// export default CampaignPage;

import React, { useState, useEffect, useRef, useCallback } from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

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
  Menu,
  X,
} from "lucide-react";

import { Alert, AlertDescription } from "../components/tools/Alerts2";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

// Import placeholder images (replace with actual assets later)
import heroImage from "../assets/campagnHeroImage.png";
import whyMissImage from "../assets/campaignSecondImage.png";
import masterclassImage from "../assets/campaignthirdImage.png";
import CredulenLogo2 from "../assets/CredulenLogo2.png";
import CredulenLogo from "../assets/CredulenLogo.png";

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
      color: "bg-teal-500 hover:bg-green-600",
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
      )}"e=${encodeURIComponent(shareText)}`,
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
          <h3 className="text-xl font-bold text-gray-800">Share This link</h3>
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
              className={`${platform.color} text-white p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105`}
              data-aos="zoom-in"
              data-aos-duration="600">
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
                  ? "bg-green text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              } hover:scale-105`}>
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

const RegistrationModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    variant: "default",
    message: "",
  });

  const showAlertMessage = (message, variant = "default") => {
    setAlertConfig({ message, variant });
    setShowAlert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name || !email || !phoneNum) {
      showAlertMessage("Please fill in all fields.", "destructive");
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    if (!/^\+?[\d\s-]{10,}$/.test(phoneNum)) {
      showAlertMessage(
        "Please enter a valid phone number (e.g., +2348012345678).",
        "destructive"
      );
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${backendURL}/api/registerCampaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNum }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      showAlertMessage(data.message || "Registration successful!", "success");
      setName("");
      setEmail("");
      setPhoneNum("");
      setTimeout(() => {
        setShowAlert(false);
        setIsLoading(false);
        onClose();
      }, 5000);
    } catch (err) {
      showAlertMessage(
        err.message ||
          "An error occurred during registration. Please try again.",
        "destructive"
      );
      setIsLoading(false);
      setTimeout(() => setShowAlert(false), 5000);
    }
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
            Register for Campaign Class
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            disabled={isLoading}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F0B78] focus:border-transparent"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F0B78] focus:border-transparent"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNum"
              className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNum"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F0B78] focus:border-transparent"
              placeholder="Enter your phone (e.g., +2348012345678)"
              required
              disabled={isLoading}
            />
          </div>

          {showAlert && (
            <Alert
              variant={alertConfig.variant}
              show={showAlert}
              onClose={() => setShowAlert(false)}
              autoClose={true}
              autoCloseTime={5000}>
              <AlertDescription>{alertConfig.message}</AlertDescription>
            </Alert>
          )}

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#0F0B78] text-yellow-300 hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02]"
            }`}
            disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Submit Registration"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onShare }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu on outside click
  const handleOutsideClick = (event) => {
    if (
      mobileMenuOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      console.log("Closing mobile menu due to outside click");
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
    console.log("Toggling mobile menu. Current state:", mobileMenuOpen);
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="top-0 left-0 right-0  text-white p-4 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src={CredulenLogo2}
              className="w-28 h-7 sm:w-36 sm:h-9 object-contain"
              alt="Credulen Logo"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link target="_blank" to="/solutions/training_School">
            <span
              className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              data-aos="zoom-in"
              data-aos-duration="600">
              Solutions
            </span>
          </Link>
          <Link target="_blank" to={"/contactus"}>
            <span
              className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              data-aos="zoom-in"
              data-aos-duration="600">
              Contact
            </span>
          </Link>

          <Link target="_blank" to={"/"}>
            <span
              className="text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              data-aos="zoom-in"
              data-aos-duration="600">
              About
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onShare}
            className="hover:bg-[#E2FF02] bg-[#F4A261] text-white p-2 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
            title="Share this page">
            <Share2 size={18} />
          </button>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-full bg-[#0F0B78] hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            ref={menuRef}
            className="mobile-menu bg-white w-64 h-full pt-16 px-4 space-y-3 transform transition-transform duration-300 ease-in-out fixed top-0 right-0">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-gray-900 p-2 rounded-full hover:border-2 hover:border-red-50 transition-all duration-300"
              aria-label="Close menu">
              <X size={24} />
            </button>

            <Link
              target="_blank"
              to="/solutions/training_School"
              className=" block text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}>
              Solutions
            </Link>
            <Link
              target="_blank"
              to="/contactus"
              className=" block text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link
              target="_blank"
              to="/"
              className=" block text-sm font-medium px-4 py-2 rounded-full bg-[#0F0B78] hover:bg-[#F4A261] text-white transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ onRegister }) => (
  <section
    className="text-white  pb-16 lg:py-20 px-4 max-w-6xl mx-auto"
    data-aos="zoom-in"
    data-aos-duration="1000"
    data-aos-offset="200">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl  sm:text-4xl lg:text-5xl xl:text-5xl font-bold mb-6 leading-tight">
            <span className="text-[#E2FF02] mid:text-6xl">
              Data + AI + Blockchain:
            </span>
            <br />
            <span className="text-[#0F0B78]">
              What Every Innovator Needs to Know
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-xl mb-8 text-[#0F0B78] leading-relaxed">
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
            onClick={onRegister}
            className="bg-[#0F0B78] text-yellow-300 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-xl"
            data-aos="zoom-in"
            data-aos-duration="600">
            <span className="animate-pulse">🚀 Sign Up Now - FREE!</span>
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
              className="w-full h-auto max-h-[400px] object-contain rounded-2xl shadow-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section
    className="bg-[#0F0B78] text-white py-4 px-4 "
    data-aos="zoom-out"
    data-aos-duration="800"
    data-aos-offset="100">
    <div className="container mx-auto flex flex-wrap justify-around items-center gap-6">
      <div className="text-center min-w-[120px]">
        <h2 className="text-4xl font-bold text-yellow-300">1000+</h2>
        <p className="text-sm">Students Impacted</p>
      </div>
      <div className="text-center min-w-[120px]">
        <h2 className="text-4xl font-bold text-yellow-300">7+</h2>
        <p className="text-sm">Courses</p>
      </div>
      <div className="text-center min-w-[120px]">
        <h2 className="text-4xl font-bold text-yellow-300">5+</h2>
        <p className="text-sm">Solutions</p>
      </div>
    </div>
  </section>
);

const WhyMissSection = () => (
  <section
    className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-20 px-4 max-w-6xl mx-auto"
    data-aos="zoom-in"
    data-aos-duration="1000"
    data-aos-offset="200">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 order-2 lg:order-1 mid:hidden">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <img
              src={whyMissImage}
              alt="Credulen free master class"
              className="w-full h-auto max-h-[400px] object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-6 text-[#0F0B78]">
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
            className="bg-white text-[#0F0B78] px-6 py-3 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-2xl"
            data-aos="zoom-in"
            data-aos-duration="600">
            💡 Learn More Now
          </motion.button>
        </div>
      </div>
    </div>
  </section>
);

const MasterclassSection = () => (
  <section
    className="bg-white py-16 lg:py-20 px-4 max-w-[75rem] mx-auto"
    data-aos="zoom-out"
    data-aos-duration="1000"
    data-aos-offset="200">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <img
              src={masterclassImage}
              alt="Masterclass Preview"
              className="w-full h-auto max-h-[400px] object-fit rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#0F0B78] mb-8">
            What You'll Learn in This{" "}
            <span className="text-yellow-300">FREE</span> Pre-Recorded
            Masterclass:
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="">
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
                className="flex items-start space-x-3 p-3 bg-gradient-to-r from-[#E2FF02]/10 to-[#F4A261]/10 rounded-xl">
                <span className="text-yellow-300 text-xl font-bold mt-1">
                  ✓
                </span>
                <span className="text-gray-700 text-base sm:text-lg leading-relaxed">
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

const InfoSection = ({ onRegister }) => (
  <section
    className="bg-gradient-to-b from-[#0F0B78]/5 to-white py-12 lg:py-16 px-4"
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-offset="200">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#0F0B78] mb-4">
          Why Join Our <span className="text-yellow-300">FREE</span> Blockchain
          Masterclass? 🔥
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed">
          Learn how to tap into{" "}
          <span className="text-[#0F0B78] font-semibold">
            6-figure opportunities
          </span>{" "}
          in Blockchain Analytics without coding or trading crypto. Perfect for
          students, job seekers, freelancers, and anyone curious about Web3!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-3 mb-6">
          {[
            "Discover Blockchain Analytics and why it's in high demand.",
            "Explore remote jobs and career paths paying up to $3,000/project.",
            "Start with no experience using free tools and resources.",
            "Get a FREE Blockchain Career Guide after the session.",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-center space-x-2">
              <span className="text-yellow-300 text-lg">✅</span>
              <span className="text-gray-700 text-base sm:text-lg">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={onRegister}
          className="bg-[#0F0B78] text-yellow-300 px-6 py-3 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-lg"
          data-aos="zoom-in"
          data-aos-duration="600">
          <span className="animate-pulse">🚀 Sign Up Now - FREE!</span>
        </motion.button>
      </motion.div>
    </div>
  </section>
);

const Footer = ({ onShare, onRegister }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer
      className="bg-gradient-to-br from-[#ededef] via-[#1A1B5C] to-[#7faad4] text-white pt-12 pb-6 px-4"
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-offset="200">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 p-6 sm:p-8 rounded-2xl shadow-2xl mb-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-[#E2FF02] mb-4">
            🚀 Ready to Transform Your Future?
          </h3>
          <p className="text-white text-lg mb-6 leading-relaxed">
            Register now!!! To unlock the power of{" "}
            <span className="font-bold text-[#E2FF02]">
              Blockchain Analytics
            </span>{" "}
            today for free!!!!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRegister}
              className="bg-[#0F0B78] text-white px-6 sm:px-8 py-3 rounded-full font-bold text-lg hover:bg-gradient-to-r from-[#F4A261] to-[#E2FF02] transition-all duration-300 hover:scale-105 shadow-xl">
              <span className="animate-pulse">🚀 Sign Up Now - FREE!</span>
            </button>

            <button
              onClick={onShare || handleShare}
              className="flex items-center bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-gradient-to-r from-[#F4A261]/30 to-[#E2FF02]/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              title={isCopied ? "Link copied!" : "Share this page"}>
              <Share2 size={20} className="mr-2" />
              <span>{isCopied ? "Link Copied!" : "Share with Friends"}</span>
            </button>
          </div>

          {isCopied && (
            <p className="text-[#E2FF02] text-sm mt-3 animate-pulse">
              ✅ Link copied to clipboard!
            </p>
          )}
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              src={CredulenLogo}
              className="w-[11rem] h-[3rem] object-contain"
              alt="Credulen Logo"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="#"
              className="hover:text-yellow-300 transition-colors text-sm sm:text-base">
              Terms
            </a>
            <a
              href="#"
              className="hover:text-yellow-300 transition-colors text-sm sm:text-base">
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-yellow-300 transition-colors text-sm sm:text-base">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CampaignPage = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const handleRegistrationOpen = () => {
    setIsRegistrationModalOpen(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 200,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onShare={handleShare} />
      <main className="flex-grow pt-16">
        <HeroSection onRegister={handleRegistrationOpen} />
        <StatsSection />
        <WhyMissSection />
        <MasterclassSection />
        <InfoSection onRegister={handleRegistrationOpen} />
      </main>
      <Footer onShare={handleShare} onRegister={handleRegistrationOpen} />
      <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
      />
    </div>
  );
};

export default CampaignPage;
