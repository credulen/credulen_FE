// import React, { useState, useEffect } from "react";
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
// import { Bell, CheckCircle, AlertCircle, X, Loader } from "lucide-react";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import CredulenLogo from "../assets/CredulenLogo.png";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import { Button } from "@mui/material";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// // Modal Component
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-4 max-w-sm w-full relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           aria-label="Close">
//           <X size={20} />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const quickLinks = [
//   {
//     text: "Home",
//     href: "/",
//   },
//   {
//     text: "Solutions",
//     items: [
//       { text: "Training Schools", href: "/solutions/training_School" },
//       { text: "Consulting Services", href: "/solutions/consulting_Services" },
//     ],
//   },
//   {
//     text: "Blog",
//     href: "/blog",
//   },
//   {
//     text: "Events",
//     items: [
//       { text: "Webinars", href: "/webinars" },
//       { text: "Conferences", href: "/conferences" },
//     ],
//   },
// ];

// // Dropdown Link Component with delay
// const DropdownLink = ({ text, items }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [timeoutId, setTimeoutId] = useState(null);

//   const handleMouseEnter = () => {
//     if (timeoutId) clearTimeout(timeoutId);
//     setIsOpen(true);
//   };

//   const handleMouseLeave = () => {
//     const id = setTimeout(() => setIsOpen(false), 300); // 300ms delay
//     setTimeoutId(id);
//   };

//   return (
//     <div
//       className="relative group"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}>
//       <a
//         href="#"
//         className="hover:text-teal-500 transition-colors flex items-center gap-1">
//         {text}
//         {items && (
//           <svg
//             className="w-4 h-4 mt-0.5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         )}
//       </a>
//       {items && isOpen && (
//         <div className="absolute z-10 left-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden min-w-[200px]">
//           {items.map((item, index) => (
//             <a
//               key={index}
//               href={item.href}
//               className="block px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors">
//               {item.text}
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (alertInfo) {
//       setShowModal(true);
//       const timer = setTimeout(() => {
//         setShowModal(false);
//         setAlertInfo(null);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [alertInfo]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setAlertInfo({
//         message: "Please enter a valid email address.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`${backendURL}/api/newsletter-signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setAlertInfo({
//           message: "Subscription successful!",
//           variant: "success",
//           icon: CheckCircle,
//         });
//         setEmail("");
//       } else {
//         setAlertInfo({
//           message: data.message || "An error occurred. Please try again.",
//           variant: data.message.includes("already subscribed")
//             ? "warning"
//             : "destructive",
//           icon: AlertCircle,
//         });
//         setEmail("");
//       }
//     } catch (error) {
//       console.error("Error during subscription:", error);
//       setAlertInfo({
//         message: "An error occurred. Please try again.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <footer className="bg-slate-800 text-white py-6 sm:py-8">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Section - Now 5 columns on large screens */}
//           <div className="lg:col-span-5">
//             <div className="max-w-md">
//               {/* Logo */}
//               <img
//                 src={CredulenLogo}
//                 alt="Credulen logo"
//                 className="w-[13rem] h-[55apx] mb-6"
//               />

//               {/* Newsletter Section - Reduced size */}
//               <div className="mb-6">
//                 <h3 className="text-base font-semibold mb-3">
//                   Subscribe to our newsletter
//                 </h3>
//                 <form onSubmit={handleSubmit} className="flex gap-2">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     className="flex-1 p-2 rounded text-slate-800 placeholder-slate-400 text-sm"
//                     required
//                   />
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-white hover:text-teal-600 border border-transparent hover:border-teal-600 transition-all duration-300 flex items-center gap-2 text-sm"
//                     disabled={isLoading}>
//                     {isLoading ? (
//                       <Loader className="animate-spin" size={16} />
//                     ) : (
//                       "Subscribe"
//                     )}
//                   </button>
//                 </form>
//               </div>

//               {/* Telegram Button - Reduced size */}
//               <div className="mb-6">
//                 <a
//                   href="https://t.me/credulensubscribers"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 bg-[#198754] text-white px-4 py-2 rounded hover:bg-white hover:text-[#198754] border border-transparent hover:border-[#198754] transition-all duration-300 text-sm">
//                   <svg
//                     className="w-4 h-4"
//                     fill="currentColor"
//                     viewBox="0 0 24 24">
//                     <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.325 10.953c-.173.82-.831 1.023-1.68.637l-4.625-3.405-2.235 2.153c-.248.248-.455.455-.934.455l.334-4.73 8.614-7.785c.375-.334-.082-.52-.582-.186L7.067 13.396l-4.563-1.427c-.992-.31-.992-1.012.207-1.5l17.87-6.887c.826-.31 1.547.207 1.281 1.665z" />
//                   </svg>
//                   <span>Join Our Telegram Community</span>
//                 </a>
//               </div>

//               {/* Social Media Icons */}
//               <div className="flex space-x-4">
//                 {[
//                   { Icon: Facebook, href: "#" },
//                   { Icon: Twitter, href: "#" },
//                   { Icon: Instagram, href: "#" },
//                   { Icon: Linkedin, href: "#" },
//                 ].map(({ Icon, href }, index) => (
//                   <a
//                     key={index}
//                     href={href}
//                     className="text-white hover:text-teal-500 transition-colors"
//                     aria-label={`Visit our ${Icon.name}`}>
//                     <Icon size={20} />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Two columns on all screen sizes */}
//           <div className="lg:col-span-7">
//             <div className="grid grid-cols-2 gap-8">
//               {/* Quick Links */}
//               <div>
//                 <h3 className="text-base font-semibold mb-4">Quick Links</h3>
//                 <ul className="space-y-3">
//                   {quickLinks.map((link, index) => (
//                     <li key={index}>
//                       <DropdownLink
//                         text={link.text}
//                         items={link.items}
//                         href={link.href}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Legal Links */}
//               <div>
//                 <h3 className="text-base font-semibold mb-4">Legal</h3>
//                 <ul className="space-y-3">
//                   {[
//                     { text: "Privacy Policy", href: "#" },
//                     { text: "Terms of Service", href: "#" },
//                     { text: "Cookie Policy", href: "#" },
//                     { text: "Contact Us", href: "/contactus" },
//                   ].map((link, index) => (
//                     <li key={index}>
//                       <a
//                         href={link.href}
//                         className="hover:text-teal-500 transition-colors">
//                         {link.text}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal Component */}
//       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//         {alertInfo && (
//           <Alert variant={alertInfo.variant} className="m-0">
//             <div className="flex items-center gap-2">
//               {alertInfo.icon && (
//                 <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
//               )}
//               <AlertDescription>{alertInfo.message}</AlertDescription>
//             </div>
//           </Alert>
//         )}
//       </Modal>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Bell, CheckCircle, AlertCircle, X, Loader } from "lucide-react";
import { Alert, AlertDescription } from "../components/tools/Alert";
import CredulenLogo from "../assets/CredulenLogo.png";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Button } from "@mui/material";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700"
          aria-label="Close">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const quickLinks = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Solutions",
    items: [
      { text: "Training Schools", href: "/solutions/training_School" },
      { text: "Consulting Services", href: "/solutions/consulting_Services" },
    ],
  },
  {
    text: "Blog",
    href: "/blog",
  },
  {
    text: "Events",
    items: [
      { text: "Webinars", href: "/webinars" },
      { text: "Conferences", href: "/conferences" },
      { text: "Podcasts", href: "/podcasts" },
    ],
  },
];

// Dropdown Link Component with delay
const DropdownLink = ({ text, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsOpen(false), 300); // 300ms delay
    setTimeoutId(id);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <a
        href="#"
        className="hover:text-secondary-500 transition-colors flex items-center gap-1">
        {text}
        {items && (
          <svg
            className="w-4 h-4 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </a>
      {items && isOpen && (
        <div className="absolute z-10 left-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden min-w-[200px]">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-secondary-900 transition-colors">
              {item.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (alertInfo) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setAlertInfo(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setAlertInfo({
        message: "Please enter a valid email address.",
        variant: "destructive",
        icon: AlertCircle,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendURL}/api/newsletter-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlertInfo({
          message: "Subscription successful!",
          variant: "success",
          icon: CheckCircle,
        });
        setEmail("");
      } else {
        setAlertInfo({
          message: data.message || "An error occurred. Please try again.",
          variant: data.message.includes("already subscribed")
            ? "warning"
            : "destructive",
          icon: AlertCircle,
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      setAlertInfo({
        message: "An error occurred. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-primary-900 text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section - Now 5 columns on large screens */}
          <div className="lg:col-span-5">
            <div className="max-w-md">
              {/* Logo */}
              <img
                src={CredulenLogo}
                alt="Credulen logo"
                className="w-[13rem] h-[55apx] mb-6 filter brightness-0 invert"
              />

              {/* Newsletter Section - Reduced size */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">
                  Subscribe to our newsletter
                </h3>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-auto p-2 rounded text-primary-900 placeholder-neutral-400 text-sm border border-primary-700 focus:border-primary-500 focus:ring-2 focus:ring-secondary-500/20"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-secondary-500 text-primary-900 rounded hover:bg-secondary-600  ease-out flex items-center justify-center hover:border-2 hover:border-secondary-700 hover:bg-white hover:text-primary-500 hover:font-semibold transition-all duration-300 w-full sm:w-auto focus:ring-4 focus:outline-none focus:ring-secondary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}>
                    {isLoading ? (
                      <Loader className="animate-spin mr-2" size={16} />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              </div>

              {/* Telegram Button - Reduced size */}
              <div className="mb-6">
                <a
                  href="https://t.me/credulensubscribers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-800 text-white px-4 py-2 rounded hover:bg-primary-700 hover:text-white border border-transparent transition-all duration-300 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.325 10.953c-.173.82-.831 1.023-1.68.637l-4.625-3.405-2.235 2.153c-.248.248-.455.455-.934.455l.334-4.73 8.614-7.785c.375-.334-.082-.52-.582-.186L7.067 13.396l-4.563-1.427c-.992-.31-.992-1.012.207-1.5l17.87-6.887c.826-.31 1.547.207 1.281 1.665z" />
                  </svg>
                  <span className="hover:text-secondary-500">
                    Join Our Telegram Community
                  </span>
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Linkedin, href: "#" },
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="text-white hover:text-secondary-500 transition-colors"
                    aria-label={`Visit our ${Icon.name}`}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Two columns on all screen sizes */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-base font-semibold text-white mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3 ">
                  {quickLinks.map((link, index) => (
                    <li className="hover:text-secondary-500" key={index}>
                      <DropdownLink
                        text={link.text}
                        items={link.items}
                        href={link.href}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-base font-semibold text-white mb-4">
                  Legal
                </h3>
                <ul className="space-y-3 ">
                  {[
                    { text: "Privacy Policy", href: "#" },
                    { text: "Terms of Service", href: "#" },
                    { text: "Cookie Policy", href: "#" },
                    { text: "Contact Us", href: "/contactus" },
                  ].map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="hover:text-secondary-500 transition-colors">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-neutral-300">
              © {new Date().getFullYear()} Credulen International. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {alertInfo && (
          <Alert variant={alertInfo.variant} className="m-0">
            <div className="flex items-center gap-2">
              {alertInfo.icon && (
                <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
              )}
              <AlertDescription>{alertInfo.message}</AlertDescription>
            </div>
          </Alert>
        )}
      </Modal>
    </footer>
  );
};

export default Footer;
