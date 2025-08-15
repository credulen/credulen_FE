// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import { Loader, CheckCircle, AlertCircle, X } from "lucide-react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const SolutionForm = () => {
//   const { slug } = useParams();
//   const [solution, setSolution] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     employmentStatus: "",
//     jobTitle: "",
//     selectedSolution: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [solutionType, setSolutionType] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [error, setError] = useState(null);

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
//       console.log("Received solution data:", data); // Detailed log
//       if (!data) {
//         setError("No solution found for the provided slug.");
//         return;
//       }
//       setSolution(data);
//       setSolutionType(data.category);
//       setFormData((prev) => ({
//         ...prev,
//         selectedSolution: data.title,
//         solutionType: data.category,
//       }));
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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePayment = async () => {
//     // Validate required fields
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.phoneNumber
//     ) {
//       setAlertInfo({
//         message:
//           "Please fill in all required fields before proceeding to payment.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//       return;
//     }

//     // Validate solution price
//     if (!solution?.price || solution.price <= 0) {
//       setAlertInfo({
//         message: "Invalid training fee. Please contact support.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const amountInKobo = solution.price * 100; // Convert to kobo for Paystack
//       console.log("Initiating payment with amount (kobo):", amountInKobo);
//       console.log("Current form data:", formData); // Log form data
//       console.log("Solution data:", solution); // Log solution data

//       const payload = {
//         ...formData,
//         slug,
//         solutionId: solution._id,
//         amount: amountInKobo,
//         callback_url: `${window.location.origin}/payment-success`,
//       };
//       console.log("Payment payload:", payload); // Log complete payload

//       const response = await fetch(
//         `${backendURL}/api/initiate-paystack-payment`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Payment initialization failed");
//       }

//       if (data.authorization_url) {
//         window.location.href = data.authorization_url;
//       } else {
//         throw new Error("No payment URL received from server");
//       }
//     } catch (error) {
//       console.error("Payment processing error:", error);
//       setAlertInfo({
//         message:
//           error.message || "Failed to initialize payment. Please try again.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//     } finally {
//       setIsLoading(false);
//     }
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

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
//         <div className="text-center">
//           <Loader className="animate-spin" size={40} />
//           <p className="text-gray-600">Loading form...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-red-50 p-4 rounded-lg">
//           <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-2" />
//           <h2 className="text-lg font-semibold text-red-700 mb-2">
//             Error Loading Form
//           </h2>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!solution) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <div className="bg-yellow-50 p-4 rounded-lg">
//           <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
//           <h2 className="text-lg font-semibold text-yellow-700">
//             No Solution Found
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-4 max-w-4xl mt-[rem]">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {/* Header */}
//         <div className="bg-teal-700 p-6 text-white">
//           <h1 className="text-2xl font-bold text-center">{solution.title}</h1>
//           <p className="text-center text-teal-100 mt-2">
//             Complete your registration and payment
//           </p>
//         </div>

//         {/* Content */}
//         <div className="sm:p-6 p-2">
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Training Description */}
//             <div>
//               <h2 className="text-xl font-semibold mb-4 text-teal-800">
//                 About This Training
//               </h2>

//               <div className="prose max-w-none text-lg">
//                 <ReactQuill
//                   value={solution.trainingDesc}
//                   readOnly={true}
//                   theme={"bubble"}
//                   className="border-none [&_.ql-editor]:text-md"
//                 />
//               </div>
//               {solution.price > 0 && (
//                 <div className="mt-6 p-4 bg-teal-50 rounded-lg">
//                   <p className="text-sm text-gray-600">Training Fee:</p>
//                   <p className="text-2xl font-bold text-teal-700">
//                     #{solution.price.toLocaleString()}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {/* You'll select payment method on Paystack */}
//                     Proceed to payment and select payment method
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Registration Form */}
//             <div>
//               <h2 className="text-xl font-semibold mb-4 text-teal-800">
//                 Registration Details
//               </h2>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name*
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name*
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email Address*
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number*
//                   </label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Employment Status(optional)
//                   </label>
//                   <select
//                     name="employmentStatus"
//                     value={formData.employmentStatus}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
//                     <option value="">Select your status</option>
//                     <option value="employed">Employed</option>
//                     <option value="unemployed">Unemployed</option>
//                     <option value="student">Student</option>
//                     <option value="retired">Retired</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Job Title (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     name="jobTitle"
//                     value={formData.jobTitle}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   />
//                 </div>

//                 <div className="pt-4">
//                   <button
//                     type="button"
//                     onClick={handlePayment}
//                     className="w-full bg-teal-700 text-white py-3 px-4 rounded-md hover:bg-teal-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
//                     disabled={isLoading}>
//                     {isLoading ? (
//                       <>
//                         <Loader
//                           className="animate-spin mr-2 inline"
//                           size={20}
//                         />
//                         Processing...
//                       </>
//                     ) : (
//                       "Proceed to Payment"
//                     )}
//                   </button>
//                   <p className="text-xs text-gray-500 mt-2 text-center">
//                     You'll be redirected to Paystack to complete your payment
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
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

import React, { useState, useEffect } from "react";
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
      setShowAdModal(true);
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

  const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");
  const whatsappLink =
    "https://wa.me/2349012048912?text=Hi%20Credulen%20Team%2C%20I%27m%20interested%20in%20the%20special%20promo%20link%20to%20pay%20for%20the%20Blockchain%20Analytics%20Webinar.%20Please%20send%20me%20the%20details";

  function truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }

  if (isPageLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          <Loader className="animate-spin text-teal-600" size={40} />
          <p className="text-gray-600 mt-2">Loading...</p>
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
            No Solution Found
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
            <button
              onClick={() => navigate("/courses")}
              className="hover:text-teal-600 transition-colors">
              Courses
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{solution.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Course Header */}
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
                  <Users className="w-5 h-5 mr-1" />
                  Beginner Friendly
                </span>
                <span className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  Flexible Learning
                </span>
                <span className="flex items-center">
                  <Heart className="w-5 h-5 mr-1 text-red-500" />
                  99% Positive Reviews
                </span>
              </div>
            </div>

            {/* Course Image */}
            <div className="mb-8">
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-80 object-cover rounded-xl shadow-md"
              />
            </div>

            {/* Course Description */}
            <div className="prose max-w-none text-gray-600 mb-12">
              <ReactQuill
                value={solution.trainingDesc}
                readOnly={true}
                theme="bubble"
                className="border-none [&_.ql-editor]:text-lg [&_.ql-editor]:leading-relaxed"
              />
            </div>

            {/* CTA button */}
            <div className="">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block">
                <div className="bg-[#112b2e] hover:bg-[#112b2e]   absolute  inset-0 bg-gradient-to-r from-[#047481] to-[#198754] rounded-xl blur-xs   opacity-15 transition-opacity duration-300"></div>
                <div className="relative text-[#198754]  py-2 px-3 rounded-xl hover:bg-[#112b2e] transition-all duration-300 flex items-center justify-center gap-3 transform group-hover:scale-105">
                  <FaWhatsapp
                    size={60}
                    className="transform group-hover:rotate-12 transition-transform duration-300 hover:bg-[#112b2e] "
                  />
                  <span className="font-bold text-lg underline">
                    Get a special Offer Now
                  </span>
                  <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 group-hover:animate-ping rounded-xl"></div>
                </div>
              </a>
            </div>

            {/* Enrollment Button */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="inline-block bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-all duration-300"
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
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Course Overview
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-teal-600" />
                  {solution.isAllLevels}
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  {solution.isExpertLed}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-teal-600" />
                  {solution.duration}
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-teal-600" />
                  {solution.isOnline}
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Earn a Credulen Certificate upon successful completion.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-2xl font-bold text-gray-800">
                  ₦{solution.amount?.toLocaleString() || solution.price}
                </p>
                {solution.discountPercentage > 0 && (
                  <>
                    <p className="text-sm text-gray-500 line-through">
                      ₦{solution.price?.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {solution.discountPercentage}% Discount Applied
                    </p>
                  </>
                )}
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-600">
                  Prerequisites:
                </p>
                <p className="text-sm text-gray-600">
                  {solution.prerequisites}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses Carousel */}
        {relatedSolutions.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Other Courses You May Like
            </h2>
            <Slider {...carouselSettings}>
              {relatedSolutions.map((event) => (
                <div key={event.slug} className="px-2">
                  <div
                    onClick={() => navigate(`/SolutionForm/${event.slug}`)}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
                      {truncateText(
                        stripHtmlTags(event.trainingDesc || event.content),
                        80
                      )}
                    </p>
                    {/* Price and Discount */}
                    <div className="flex items-center mb-3">
                      {event.discountPercentage === 0 ? (
                        <span className="text-xl font-bold text-teal-700">
                          ₦{event.price?.toLocaleString()}
                        </span>
                      ) : (
                        <>
                          <span className="text-xl font-bold text-teal-700 mr-2">
                            ₦{event.amount?.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
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

export default SolutionForm;
