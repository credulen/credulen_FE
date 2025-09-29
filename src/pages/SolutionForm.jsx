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
//   MessageCircle,
// } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
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

// const SolutionForm = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [solution, setSolution] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { solutions, pagination, handlePageChange } =
//     UsePaginatedSolutions("TrainingSchool");

//   // Exclude the current solution from relatedSolutions
//   const relatedSolutions = solutions.filter((sol) => sol.slug !== slug);

//   useEffect(() => {
//     console.log("useEffect triggered, setting showAdModal to true after 2s"); // Debug log
//     fetchSolutionDetails();
//     const timer = setTimeout(() => {
//       console.log("Timeout triggered, showAdModal set to true"); // Debug log
//       // setShowModal(true);
//     }, 2000);
//     return () => clearTimeout(timer);
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
//     speed: 800,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     cssEase: "ease-in-out",
//     lazyLoad: "ondemand",
//     pauseOnHover: true,
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
//   const whatsappLink =
//     "https://wa.me/2349012048912?text=Hi%20Credulen%20Team%2C%20I%27m%20interested%20in%20the%20special%20promo%20link%20to%20pay%20for%20the%20Blockchain%20Analytics%20Webinar.%20Please%20send%20me%20the%20details";

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
//               className="hover:text-teal-600 transition-colors">
//               Courses
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

//             {/* CTA button */}
//             <div className="">
//               <a
//                 href={whatsappLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative inline-block">
//                 <div className="bg-[#112b2e] hover:bg-[#112b2e]   absolute  inset-0 bg-gradient-to-r from-[#047481] to-[#198754] rounded-xl blur-xs   opacity-15 transition-opacity duration-300"></div>
//                 <div className="relative text-[#198754]  py-2 px-3 rounded-xl hover:bg-[#112b2e] transition-all duration-300 flex items-center justify-center gap-3 transform group-hover:scale-105">
//                   <FaWhatsapp
//                     size={60}
//                     className="transform group-hover:rotate-12 transition-transform duration-300 hover:bg-[#112b2e] "
//                   />
//                   <span className="font-bold text-lg underline">
//                     Get a special Offer Now
//                   </span>
//                   <div className="transform group-hover:translate-x-2 transition-transform duration-300">
//                     →
//                   </div>
//                 </div>
//                 <div className="absolute inset-0 rounded-xl overflow-hidden">
//                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 group-hover:animate-ping rounded-xl"></div>
//                 </div>
//               </a>
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
//                   "Enroll Now"
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
//                   ₦{solution.amount?.toLocaleString() || solution.price}
//                 </p>

//                 <span className="text-lg font-bold">£{solution.GBPrate}</span>
//                 {solution.discountPercentage > 0 && (
//                   <>
//                     <p className="text-sm text-gray-500 line-through">
//                       ₦{solution.price?.toLocaleString()}
//                     </p>
//                     {solution.GBPrate && (
//                       <p className="text-sm text-green-600 mt-1">
//                         {solution.discountPercentage}% Discount Applied
//                       </p>
//                     )}
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
//                     onClick={() => navigate(`/SolutionForm/${event.slug}`)}
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
//                             ₦{event.amount?.toLocaleString()}
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

// export default SolutionForm;
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../components/tools/Alert";
import {
  Loader,
  CheckCircle,
  AlertCircle,
  X,
  Users,
  BookOpen,
  Clock,
  Heart,
  FileText,
  Headphones,
  Globe,
  MessageCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SolutionCard } from "../components/SolutionCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UsePaginatedSolutions from "../components/tools/usePagination";
import Spinner from "../components/tools/Spinner";
import Spinner2 from "../components/tools/Spinner2";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const SolutionForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const { solutions, pagination, handlePageChange } =
    UsePaginatedSolutions("TrainingSchool");

  // Exclude the current solution from relatedSolutions
  const relatedSolutions = solutions.filter((sol) => sol.slug !== slug);

  useEffect(() => {
    console.log("useEffect triggered, setting showAdModal to true after 2s"); // Debug log
    fetchSolutionDetails();
    const timer = setTimeout(() => {
      console.log("Timeout triggered, showAdModal set to true"); // Debug log
      // setShowModal(true);
    }, 2000);
    return () => clearTimeout(timer);
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
        setError("No solution found for the provided slug.");
        return;
      }
      setSolution(data);
    } catch (error) {
      console.error("Error fetching solution details:", error);
      setAlertInfo({
        message: "Failed to fetch solution details. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    if (!solution?.price || solution.price <= 0) {
      setAlertInfo({
        message: "Invalid training fee. Please contact support.",
        variant: "destructive",
        icon: AlertCircle,
      });
      return;
    }

    navigate(`/payment/${slug}`, { state: { solution } });
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

  const handleWhatsAppContact = () => {
    const phoneNumber = "+2348085544087";
    const message = `Hi, I'm interested in the ${solution?.title} consulting service. I'd like to get more information and possibly book a consultation.`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");
  const whatsappLink =
    "https://wa.me/2349012048912?text=Hi%20Credulen%20Team%2C%20I%27m%20interested%20in%20the%20special%20promo%20link%20to%20pay%20for%20the%20Blockchain%20Analytics%20Webinar.%20Please%20send%20me%20the%20details";

  function truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }

  if (isPageLoading) {
    return (
      <>
        <Spinner2 />
      </>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-primary-900 mb-2">
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
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-primary-900">
            No Solution Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm text-neutral-600">
          <nav className="flex">
            <button
              onClick={() => navigate("/courses")}
              className="hover:text-secondary-500 transition-colors">
              Courses
            </button>
            <span className="mx-2">/</span>
            <span className="text-primary-900">{solution.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-primary-900">
                  {solution.title}
                </h1>
                <span className="inline-block px-3 py-1 bg-secondary-500 text-primary-900 rounded-full text-sm font-medium">
                  {solution.category}
                </span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <span className="flex items-center">
                  <Users className="w-5 h-5 mr-1 text-primary-500" />
                  Beginner Friendly
                </span>
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-1 text-primary-500" />
                  Flexible Learning
                </span>
                <span className="flex items-center">
                  <Heart className="w-5 h-5 mr-1 text-primary-500" />
                  99% Positive Reviews
                </span>
              </div>
            </div>

            {/* Course Image */}
            <div className="mb-8">
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-80 object-cover rounded-xl shadow-md border border-primary-100"
              />
            </div>

            {/* Course Description */}
            <div className="prose max-w-none text-neutral-700 mb-12">
              <ReactQuill
                value={solution.trainingDesc}
                readOnly={true}
                theme="bubble"
                className="border-none [&_.ql-editor]:text-lg [&_.ql-editor]:leading-relaxed"
              />
            </div>

            {/* CTA button */}

            {/* Enrollment Button */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-primary-100">
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="inline-block bg-secondary-500 text-primary-900  hover:bg-primary-900 hover:text-secondary-600 hover:border hover:border-secondary-600 py-3 px-6 rounded-lg  transition-all duration-300 font-semibold"
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2 inline" size={20} />
                    Processing...
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4 border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-6">
                Course Overview
              </h3>
              <ul className="space-y-4 text-neutral-700">
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary-500" />
                  {solution.isAllLevels}
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary-500" />
                  {solution.isExpertLed}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-500" />
                  {solution.duration}
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary-500" />
                  {solution.isOnline}
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-sm text-neutral-600">
                  Earn a Credulen Certificate upon successful completion.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-2xl font-bold text-primary-900">
                  ₦{solution.amount?.toLocaleString() || solution.price}
                </p>

                <span className="text-lg font-bold text-primary-900">
                  £{solution.GBPrate}
                </span>
                {solution.discountPercentage > 0 && (
                  <>
                    <p className="text-sm text-neutral-500 line-through">
                      ₦{solution.price?.toLocaleString()}
                    </p>
                    {solution.GBPrate && (
                      <p className="text-sm text-secondary-600 mt-1">
                        {solution.discountPercentage}% Discount Applied
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-primary-900">
                  Prerequisites:
                </p>
                <p className="text-sm text-neutral-700">
                  {solution.prerequisites}
                </p>
              </div>

              {/* Whatsapp  Contact */}
              {/* WhatsApp Contact Section */}
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                <h4 className="font-semibold text-primary-900 mb-2">
                  Urgent? Message us on WhatsApp
                </h4>
                <p className="text-sm text-neutral-600 mb-3">
                  Get instant support and quick answers to your questions
                </p>
                <button
                  onClick={handleWhatsAppContact}
                  className="group flex items-center gap-2 w-full bg-secondary-500 text-primary-900 hover:bg-secondary-900 hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold rounded-lg py-2 px-4">
                  <FaWhatsapp className="w-12 h-12 text-green-900 group-hover:text-primary-500" />
                  <span className="text-sm font-medium text-primary-900 hover:text-white group-hover:text-primart-500">
                    Chat on WhatsApp
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses Carousel */}
        {relatedSolutions.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-semibold text-primary-900 mb-8">
              Other Courses You May Like
            </h2>
            <Slider {...carouselSettings}>
              {relatedSolutions.map((event) => (
                <div key={event.slug} className="px-2">
                  <div
                    onClick={() => navigate(`/SolutionForm/${event.slug}`)}
                    className="group bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border hover:border-primary-500">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium text-primary-900 mb-2 group-hover:text-secondary-500">
                      {event.title}
                    </h3>
                    <p className="mb-3 text-sm text-neutral-600 line-clamp-2 flex-grow">
                      {truncateText(
                        stripHtmlTags(event.trainingDesc || event.content),
                        80
                      )}
                    </p>
                    {/* Price and Discount */}
                    <div className="flex items-center mb-3">
                      {event.discountPercentage === 0 ? (
                        <span className="text-xl font-bold text-primary-900">
                          ₦{event.price?.toLocaleString()}
                        </span>
                      ) : (
                        <>
                          <span className="text-xl font-bold text-primary-900 mr-2">
                            ₦{event.amount?.toLocaleString()}
                          </span>
                          <span className="text-sm text-neutral-500 line-through">
                            ₦{event.price?.toLocaleString()}
                          </span>
                          <span className="ml-2 text-xs text-red-500 font-semibold">
                            {event.discountPercentage}% Disc.
                          </span>
                        </>
                      )}
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
      <div className="bg-white rounded-lg p-4 max-w-sm w-full relative border border-primary-100">
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

export default SolutionForm;
