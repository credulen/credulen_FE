// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import { Loader, CheckCircle, AlertCircle, X } from "lucide-react";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// // Form validation schema
// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Please enter a valid email address"),
//   firstName: yup
//     .string()
//     .required("First name is required")
//     .min(2, "First name must be at least 2 characters")
//     .matches(/^[a-zA-Z\s]+$/, "First name should only contain letters"),
//   lastName: yup
//     .string()
//     .required("Last name is required")
//     .min(2, "Last name must be at least 2 characters")
//     .matches(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),
//   country: yup.string().required("Country is required"),
//   solutionCategory: yup
//     .string()
//     .required("Solution category is required")
//     .oneOf(
//       ["individual", "business"],
//       "Please select a valid solution category"
//     ),
//   companyName: yup.string().when("solutionCategory", {
//     is: "business",
//     then: () => yup.string().required("Company name is required"),
//   }),
//   companyIndustry: yup.string().when("solutionCategory", {
//     is: "business",
//     then: () => yup.string().required("Company industry is required"),
//   }),
//   companySize: yup.string().when("solutionCategory", {
//     is: "business",
//     then: () => yup.string().required("Company size is required"),
//   }),
//   jobTitle: yup.string().when("solutionCategory", {
//     is: "business",
//     then: () => yup.string().required("Job title is required"),
//   }),
//   phoneNumber: yup
//     .string()
//     .required("Phone number is required")
//     .matches(
//       /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
//       "Please enter a valid phone number"
//     ),
//   selectedSolution: yup.string().required("Solution selection is required"),
// });

// const SolutionFormCS = () => {
//   const { slug } = useParams();
//   const [solution, setSolution] = useState(null);
//   const [countries, setCountries] = useState([]);
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       email: "",
//       firstName: "",
//       lastName: "",
//       country: "",
//       solutionCategory: "",
//       companyName: "",
//       companyIndustry: "",
//       companySize: "",
//       jobTitle: "",
//       selectedSolution: "",
//       phoneNumber: "",
//       solutionType: "ConsultingService",
//     },
//   });

//   const solutionCategory = watch("solutionCategory");

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const [countriesResponse, solutionResponse] = await Promise.all([
//           fetch("https://restcountries.com/v3.1/all"),
//           fetch(`${backendURL}/api/getSolutionBySlug/${slug}`),
//         ]);

//         if (!countriesResponse.ok) throw new Error("Failed to fetch countries");
//         if (!solutionResponse.ok)
//           throw new Error("Failed to fetch solution details");

//         const countriesData = await countriesResponse.json();
//         const solutionData = await solutionResponse.json();

//         const sortedCountries = countriesData
//           .map((country) => ({
//             name: country.name.common,
//             code: country.cca2.toLowerCase(),
//           }))
//           .sort((a, b) => a.name.localeCompare(b.name));

//         setCountries(sortedCountries);
//         setSolution(solutionData);
//         setValue("selectedSolution", solutionData.title);
//       } catch (error) {
//         setError(error.message);
//         setAlertInfo({
//           message: error.message,
//           variant: "destructive",
//           icon: AlertCircle,
//         });
//       } finally {
//         setIsPageLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [slug, setValue]);

//   const onSubmit = async (formData) => {
//     try {
//       const response = await fetch(`${backendURL}/api/registerForSolution`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, slug }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setAlertInfo({
//           message: `Thank you for registering for our Solution on ${solution.title}. Please check your mail for confirmation and more details.`,
//           variant: "success",
//           icon: CheckCircle,
//         });
//         reset();
//       } else {
//         setAlertInfo({
//           message: data.message || "Failed to submit form. Please try again.",
//           variant: data.message.includes("already submitted")
//             ? "warning"
//             : "destructive",
//           icon: AlertCircle,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setAlertInfo({
//         message: "An error occurred. Please try again.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//     }
//   };
//   useEffect(() => {
//     if (alertInfo) {
//       setShowModal(true);
//       const timer = setTimeout(() => {
//         setShowModal(false);
//         setAlertInfo(null);

//         if (alertInfo.variant === "success") {
//           (window.location.href = "https://t.me/credulensubscribers"), "_blank";
//         }
//       }, 3000); // Redirect after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [alertInfo]);

//   if (isPageLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
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
//     <div className="container mx-auto px-12 py-8 max-w-2xl mt-[6rem]">
//       <h1 className="text-2xl font-semibold text-btColour mb-6 text-center">
//         Please Fill the Form to Register Your Interest in our Solutions for
//         Individual or Business
//       </h1>
//       <h1 className="text-lg mx-auto mb-4 text-gray-500 text-center">
//         {solution.title}
//       </h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-6 shadow-sm rounded-sm px-6 py-9 bg-gray-50">
//         <div>
//           <label
//             htmlFor="email"
//             className="block mb-2 text-sm font-medium text-gray-900">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             {...register("email")}
//             className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             } focus:ring-teal-700 focus:border-teal-700`}
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="firstName"
//             className="block mb-2 text-sm font-medium text-gray-900">
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             {...register("firstName")}
//             className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//               errors.firstName ? "border-red-500" : "border-gray-300"
//             } focus:ring-teal-700 focus:border-teal-700`}
//           />
//           {errors.firstName && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.firstName.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="lastName"
//             className="block mb-2 text-sm font-medium text-gray-900">
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             {...register("lastName")}
//             className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//               errors.lastName ? "border-red-500" : "border-gray-300"
//             } focus:ring-teal-700 focus:border-teal-700`}
//           />
//           {errors.lastName && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.lastName.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="country"
//             className="block mb-2 text-sm font-medium text-gray-900">
//             Country
//           </label>
//           <select
//             id="country"
//             {...register("country")}
//             className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//               errors.country ? "border-red-500" : "border-gray-300"
//             } focus:ring-teal-700 focus:border-teal-700`}>
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country.code} value={country.name}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           {errors.country && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.country.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="solutionCategory"
//             className="block mb-2 text-sm font-medium text-gray-900">
//             Solution Category
//           </label>
//           <select
//             id="solutionCategory"
//             {...register("solutionCategory")}
//             className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//               errors.solutionCategory ? "border-red-500" : "border-gray-300"
//             } focus:ring-teal-700 focus:border-teal-700`}>
//             <option value="">Select Solution Category</option>
//             <option value="individual">Individual</option>
//             <option value="business">Business</option>
//           </select>
//           {errors.solutionCategory && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.solutionCategory.message}
//             </p>
//           )}
//         </div>

//         {solutionCategory === "business" && (
//           <>
//             <div>
//               <label
//                 htmlFor="companyName"
//                 className="block mb-2 text-sm font-medium text-gray-900">
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 id="companyName"
//                 {...register("companyName")}
//                 className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//                   errors.companyName ? "border-red-500" : "border-gray-300"
//                 } focus:ring-teal-700 focus:border-teal-700`}
//               />
//               {errors.companyName && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.companyName.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="companyIndustry"
//                 className="block mb-2 text-sm font-medium text-gray-900">
//                 Company Industry
//               </label>
//               <select
//                 id="companyIndustry"
//                 {...register("companyIndustry")}
//                 className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//                   errors.companyIndustry ? "border-red-500" : "border-gray-300"
//                 } focus:ring-teal-700 focus:border-teal-700`}>
//                 <option value="">Select Industry</option>
//                 <option value="technology">Technology</option>
//                 <option value="finance">Finance</option>
//                 <option value="healthcare">Healthcare</option>
//                 <option value="retail">Retail</option>
//               </select>
//               {errors.companyIndustry && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.companyIndustry.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="companySize"
//                 className="block mb-2 text-sm font-medium text-gray-900">
//                 Company Size
//               </label>
//               <select
//                 id="companySize"
//                 {...register("companySize")}
//                 className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//                   errors.companySize ? "border-red-500" : "border-gray-300"
//                 } focus:ring-teal-700 focus:border-teal-700`}>
//                 <option value="">Select Company Size</option>
//                 <option value="1-9">1-9</option>
//                 <option value="10-20">10-20</option>
//                 <option value="21-50">21-50</option>
//                 <option value="50 & above">50 & above</option>
//               </select>
//               {errors.companySize && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.companySize.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="block mb-2 text-sm font-medium text-gray-900">
//                 Job Title
//               </label>
//               <input
//                 type="text"
//                 id="jobTitle"
//                 {...register("jobTitle")}
//                 className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//                   errors.jobTitle ? "border-red-500" : "border-gray-300"
//                 } focus:ring-teal-700 focus:border-teal-700`}
//               />
//               {errors.jobTitle && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.jobTitle.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="selectedSolution"
//                 className="block mb-2 text-sm font-medium text-gray-900">
//                 Select Solution
//               </label>
//               <select
//                 id="selectedSolution"
//                 {...register("selectedSolution")}
//                 className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//                   errors.selectedSolution ? "border-red-500" : "border-gray-300"
//                 } focus:ring-teal-700 focus:border-teal-700`}>
//                 <option value="">Select Solution</option>
//                 <option value={solution.title}>{solution.title}</option>
//               </select>
//               {errors.selectedSolution && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.selectedSolution.message}
//                 </p>
//               )}
//             </div>
//           </>
//         )}

//         <div>
//           <label
//             htmlFor="phoneNumber"
//             className="block mb-2 text-sm font-medium text-gray-900">
//             Mobile Number
//           </label>
//           <input
//             type="tel"
//             id="phoneNumber"
//             {...register("phoneNumber")}
//             className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
//               errors.phoneNumber ? "border-red-500" : "border-gray-300"
//             } focus:ring-teal-700 focus:border-teal-700`}
//             placeholder="+000000000000"
//           />
//           {errors.phoneNumber && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.phoneNumber.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="text-white bg-[#198754] hover:text-[#198754] hover:bg-transparent hover:font-bold hover:border hover:border-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={isSubmitting}>
//           {isSubmitting ? (
//             <span className="flex items-center justify-center">
//               <Loader className="animate-spin mr-2" size={20} />
//               Submitting...
//             </span>
//           ) : (
//             "Submit"
//           )}
//         </button>
//       </form>

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
  BookOpen,
  Clock,
  Heart,
  FileText,
  Headphones,
  Globe,
} from "lucide-react";
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
    speed: 800, // Slower transition for smoothness
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out", // Smooth easing for transitions
    lazyLoad: "ondemand", // Load images on demand for better performance
    pauseOnHover: true, // Pause autoplay on hover
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
                  ₦{solution.amount?.toLocaleString()}
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
                    onClick={() => navigate(`/SolutionFormCS/${event.slug}`)} // Updated navigation to SolutionFormCS
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
                            ₈{event.amount?.toLocaleString()}
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

export default SolutionFormCS;
