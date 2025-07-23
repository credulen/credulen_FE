// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import {
//   Loader,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Users,
//   BookOpen,
//   Clock,
//   Heart,
//   FileText,
//   Headphones,
//   Globe,
// } from "lucide-react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { SolutionCard } from "../components/SolutionCard";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import UsePaginatedSolutions from "../components/tools/usePagination";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const SolutionFormCS = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [solution, setSolution] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { solutions, pagination, handlePageChange } =
//     UsePaginatedSolutions("ConsultingService");

//   // Exclude the current solution from relatedSolutions
//   const relatedSolutions = solutions.filter((sol) => sol.slug !== slug);

//   useEffect(() => {
//     fetchSolutionDetails();
//   }, [slug]);

//   const fetchSolutionDetails = async () => {
//     setIsPageLoading(true);
//     try {
//       const response = await fetch(
//         `${backendURL}/api/getSolutionBySlug/${slug}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch solution details");
//       const data = await response.json();
//       if (!data) {
//         setError("No solution found for the provided slug.");
//         return;
//       }
//       setSolution(data);
//     } catch (error) {
//       console.error("Error fetching solution details:", error);
//       setAlertInfo({
//         message: "Failed to fetch solution details. Please try again.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//     } finally {
//       setIsPageLoading(false);
//     }
//   };

//   const handleProceedToPayment = () => {
//     if (!solution?.price || solution.price <= 0) {
//       setAlertInfo({
//         message: "Invalid training fee. Please contact support.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//       return;
//     }

//     navigate(`/payment/${slug}`, { state: { solution } });
//   };

//   useEffect(() => {
//     if (alertInfo) {
//       setShowModal(true);
//       const timer = setTimeout(() => {
//         setShowModal(false);
//         setAlertInfo(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [alertInfo]);

//   // Updated Carousel settings for smooth scrolling
//   const carouselSettings = {
//     dots: true,
//     infinite: relatedSolutions.length > 1,
//     speed: 800, // Slower transition for smoothness
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     cssEase: "ease-in-out", // Smooth easing for transitions
//     lazyLoad: "ondemand", // Load images on demand for better performance
//     pauseOnHover: true, // Pause autoplay on hover
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

//   function truncateText(text, maxLength) {
//     return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
//   }

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//         <div className="text-center">
//           <Loader className="animate-spin text-teal-600" size={40} />
//           <p className="text-gray-600 mt-2">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-5xl mx-auto px-4 py-12 text-center">
//         <div className="bg-red-50 p-6 rounded-lg">
//           <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
//           <h2 className="text-xl font-semibold text-red-700 mb-2">
//             Error Loading Page
//           </h2>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!solution) {
//     return (
//       <div className="max-w-5xl mx-auto px-4 py-12 text-center">
//         <div className="bg-yellow-50 p-6 rounded-lg">
//           <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
//           <h2 className="text-xl font-semibold text-yellow-700">
//             No Solution Found
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Breadcrumb Navigation */}
//         <div className="mb-6 text-sm text-gray-600">
//           <nav className="flex">
//             <button
//               onClick={() => navigate("/courses")}
//               className="hover:text-teal-600 transition-colors font-light">
//               Consulting Type
//             </button>
//             <span className="mx-2">/</span>
//             <span className="text-gray-800">{solution.title}</span>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             {/* Course Header */}
//             <div className="mb-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <h1 className="text-4xl font-bold text-gray-800">
//                   {solution.title}
//                 </h1>
//                 <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
//                   {solution.category}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <span className="flex items-center">
//                   <Users className="w-5 h-5 mr-1" />
//                   Beginner Friendly
//                 </span>
//                 <span className="flex items-center">
//                   <Clock className="w-5 h-5 mr-1" />
//                   Flexible Learning
//                 </span>
//                 <span className="flex items-center">
//                   <Heart className="w-5 h-5 mr-1 text-red-500" />
//                   99% Positive Reviews
//                 </span>
//               </div>
//             </div>

//             {/* Course Image */}
//             <div className="mb-8">
//               <img
//                 src={solution.image}
//                 alt={solution.title}
//                 className="w-full h-80 object-cover rounded-xl shadow-md"
//               />
//             </div>

//             {/* Course Description */}
//             <div className="prose max-w-none text-gray-600 mb-12">
//               <ReactQuill
//                 value={solution.trainingDesc}
//                 readOnly={true}
//                 theme="bubble"
//                 className="border-none [&_.ql-editor]:text-lg [&_.ql-editor]:leading-relaxed"
//               />
//             </div>

//             {/* Enrollment Button */}
//             <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <button
//                 type="button"
//                 onClick={handleProceedToPayment}
//                 className="inline-block bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-all duration-300"
//                 disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader className="animate-spin mr-2 inline" size={20} />
//                     Processing...
//                   </>
//                 ) : (
//                   "COntact Us"
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                 Course Overview
//               </h3>
//               <ul className="space-y-4 text-gray-600">
//                 <li className="flex items-center gap-3">
//                   <Users className="w-5 h-5 text-teal-600" />
//                   {solution.isAllLevels}
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <BookOpen className="w-5 h-5 text-teal-600" />
//                   {solution.isExpertLed}
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Clock className="w-5 h-5 text-teal-600" />
//                   {solution.duration}
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Globe className="w-5 h-5 text-teal-600" />
//                   {solution.isOnline}
//                 </li>
//               </ul>
//               <div className="mt-6">
//                 <p className="text-sm text-gray-600">
//                   Earn a Credulen Certificate upon successful completion.
//                 </p>
//               </div>
//               <div className="mt-6">
//                 <p className="text-2xl font-bold text-gray-800">
//                   ₦{solution.amount?.toLocaleString()}
//                 </p>
//                 {solution.discountPercentage > 0 && (
//                   <>
//                     <p className="text-sm text-gray-500 line-through">
//                       ₦{solution.price?.toLocaleString()}
//                     </p>
//                     <p className="text-sm text-green-600 mt-1">
//                       {solution.discountPercentage}% Discount Applied
//                     </p>
//                   </>
//                 )}
//               </div>
//               <div className="mt-6">
//                 <p className="text-sm font-semibold text-gray-600">
//                   Prerequisites:
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {solution.prerequisites}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Courses Carousel */}
//         {relatedSolutions.length > 0 && (
//           <div className="mt-24">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-8">
//               Other Courses You May Like
//             </h2>
//             <Slider {...carouselSettings}>
//               {relatedSolutions.map((event) => (
//                 <div key={event.slug} className="px-2">
//                   <div
//                     onClick={() => navigate(`/SolutionFormCS/${event.slug}`)} // Updated navigation to SolutionFormCS
//                     className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
//                     <img
//                       src={event.image}
//                       alt={event.title}
//                       className="w-full h-40 object-cover rounded-lg mb-4"
//                     />
//                     <h3 className="text-lg font-medium text-gray-800 mb-2">
//                       {event.title}
//                     </h3>
//                     <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
//                       {truncateText(
//                         stripHtmlTags(event.trainingDesc || event.content),
//                         80
//                       )}
//                     </p>
//                     {/* Price and Discount */}
//                     <div className="flex items-center mb-3">
//                       {event.discountPercentage === 0 ? (
//                         <span className="text-xl font-bold text-teal-700">
//                           ₦{event.price?.toLocaleString()}
//                         </span>
//                       ) : (
//                         <>
//                           <span className="text-xl font-bold text-teal-700 mr-2">
//                             ₈{event.amount?.toLocaleString()}
//                           </span>
//                           <span className="text-sm text-gray-500 line-through">
//                             ₦{event.price?.toLocaleString()}
//                           </span>
//                           <span className="ml-2 text-xs text-red-500 font-semibold">
//                             {event.discountPercentage}% Disc.
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         )}
//       </div>

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
//     </div>
//   );
// };

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

// export default SolutionFormCS;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../components/tools/Alert";
import {
  Loader,
  CheckCircle,
  AlertCircle,
  X,
  Users,
  MessageSquare,
  Clock,
  Trophy,
  FileText,
  Video,
  Globe,
  Calendar,
  Target,
  Lightbulb,
  TrendingUp,
  PhoneCall,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Book } from "@mui/icons-material";
import { FaWhatsapp } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SolutionCard } from "../components/SolutionCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UsePaginatedSolutions from "../components/tools/usePagination";
import { WhatsApp } from "@mui/icons-material";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const SolutionFormCS = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const { solutions, pagination, handlePageChange } =
    UsePaginatedSolutions("ConsultingService");

  // Exclude the current solution from relatedSolutions
  const relatedSolutions = solutions.filter((sol) => sol.slug !== slug);

  useEffect(() => {
    fetchSolutionDetails();
  }, [slug]);

  const fetchSolutionDetails = async () => {
    setIsPageLoading(true);
    try {
      const response = await fetch(
        `${backendURL}/api/getSolutionBySlug/${slug}`
      );
      if (!response.ok) throw new Error("Failed to fetch solution details");
      const data = await response.json();
      if (!data) {
        setError("No consulting service found for the provided slug.");
        return;
      }
      setSolution(data);
    } catch (error) {
      console.error("Error fetching solution details:", error);
      setAlertInfo({
        message:
          "Failed to fetch consulting service details. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleContactExpert = () => {
    setAlertInfo({
      message: "Redirecting you to book a consultation session...",
      variant: "default",
      icon: CheckCircle,
    });

    // Simulate navigation to contact/booking form
    setTimeout(() => {
      navigate(`/book-consultation/${slug}`, { state: { solution } });
    }, 1500);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "+2348136712272";
    const message = `Hi, I'm interested in the ${solution?.title} consulting service. I'd like to get more information and possibly book a consultation.`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    if (alertInfo) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setAlertInfo(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  // Updated Carousel settings for smooth scrolling
  const carouselSettings = {
    dots: true,
    infinite: relatedSolutions.length > 1,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    lazyLoad: "ondemand",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

  function truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }

  if (isPageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <Loader className="animate-spin text-teal-600" size={40} />
          <p className="text-gray-600 mt-2">Loading consulting service...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Page
          </h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-yellow-50 p-6 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-yellow-700">
            No Consulting Service Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm text-gray-600">
          <nav className="flex">
            <span className="hover:text-teal-600 transition-colors font-light">
              Consulting Services
            </span>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{solution.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Service Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-gray-800">
                  {solution.title}
                </h1>
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  {solution.category}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-1" />
                  1-on-1 Consultation
                </span>
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  Flexible Scheduling
                </span>
                <span className="flex items-center">
                  <Trophy className="w-5 h-5 mr-1 text-yellow-500" />
                  Expert Guidance
                </span>
              </div>
            </div>

            {/* Service Image */}
            <div className="mb-8">
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-80 object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Service Description */}
            <div className="prose max-w-none text-gray-600 mb-8">
              <ReactQuill
                value={solution.trainingDesc}
                readOnly={true}
                theme="bubble"
                className="border-none [&_.ql-editor]:text-lg [&_.ql-editor]:leading-relaxed"
              />
            </div>

            {/* What You'll Get Section */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-teal-600" />
                What You'll Get from This Consultation
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Strategic Insights
                    </h4>
                    <p className="text-sm text-gray-600">
                      Personalized strategies tailored to your specific
                      challenges
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Growth Roadmap
                    </h4>
                    <p className="text-sm text-gray-600">
                      Clear action steps to accelerate your progress
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Resource Materials
                    </h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive guides and templates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Network Access
                    </h4>
                    <p className="text-sm text-gray-600">
                      Connect with industry professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Expert Button */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ready to Transform Your Business?
                  </h3>
                  <p className="text-gray-600">
                    Book a consultation with us today
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleContactExpert}
                  className="inline-flex items-center bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin mr-2" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Book className="w-5 h-5 mr-2" />
                      Book Consultation
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 ">
                Service Overview
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  <span>Personalized 1-on-1 Sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-teal-600" />
                  <span>Virtual or In-Person Meetings</span>
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span>Flexible Scheduling Options</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <span>Global Accessibility</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span>Comprehensive Follow-up Reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-teal-600" />
                  <span>Industry-Leading Expertise</span>
                </li>
              </ul>

              {/* WhatsApp Contact Section - Replaced Expert Info */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Urgent? Message us on WhatsApp
                </h4>
                <p className="text-sm text-green-700 mb-3">
                  Get instant support and quick answers to your questions
                </p>
                <button
                  onClick={handleWhatsAppContact}
                  className="flex items-center gap-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                  <FaWhatsapp className="w-6 h-6 text-greenDark" />
                  <span className="text-sm font-medium text-greenDark">
                    Chat on WhatsApp
                  </span>
                </button>
              </div>

              {/* Contact Options */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-teal-600" />
                  <span>Email Support Included</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <PhoneCall className="w-4 h-4 text-teal-600" />
                  <span>Phone Consultation Available</span>
                </div>
              </div>

              {/* Next Steps */}
              {/* <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                <h4 className="font-semibold text-teal-800 mb-2">Next Steps</h4>
                <ol className="text-sm text-teal-700 space-y-1">
                  <li>1. Book your consultation session</li>
                  <li>2. Complete initial assessment</li>
                  <li>3. Meet with your expert</li>
                  <li>4. Receive actionable insights</li>
                </ol>
              </div> */}
            </div>
          </div>
        </div>

        {/* Related Services Carousel */}
        {relatedSolutions.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Other Consulting Services You May Need
            </h2>
            <Slider {...carouselSettings}>
              {relatedSolutions.map((service) => (
                <div key={service.slug} className="px-2">
                  <div
                    onClick={() => navigate(`/SolutionFormCS/${service.slug}`)}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:transform hover:scale-105">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
                      {truncateText(
                        stripHtmlTags(service.trainingDesc || service.content),
                        80
                      )}
                    </p>
                    <div className="flex items-center text-teal-600 text-sm font-medium">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      See More Details
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

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
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SolutionFormCS;
