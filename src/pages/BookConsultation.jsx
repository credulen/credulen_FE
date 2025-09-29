// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import {
//   Loader,
//   CheckCircle,
//   AlertCircle,
//   X,
//   Building,
//   User,
//   Mail,
//   Phone,
//   Globe,
//   Briefcase,
//   Users,
//   MessageSquare,
//   ArrowLeft,
//   Calendar,
//   Clock,
// } from "lucide-react";
// import UsePaginatedSolutions from "../components/tools/usePagination";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const BookConsultation = () => {
//   const { solutions, error, pagination, handlePageChange } =
//     UsePaginatedSolutions("ConsultingService");
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const solutionFromState = location.state?.solution;

//   // Form state
//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     country: "",
//     companyName: "",
//     companyIndustry: "",
//     companySize: "",
//     jobTitle: "",
//     selectedSolution: slug || "",
//     phoneNumber: "",
//     employmentStatus: "",
//     preferredDate: "",
//     preferredTime: "",
//     message: "",
//   });

//   // Loading and alert states
//   const [isLoading, setIsLoading] = useState(false);
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Data states
//   const [countries, setCountries] = useState([]);
//   const [consultingServices, setConsultingServices] = useState([]);
//   const [loadingCountries, setLoadingCountries] = useState(true);
//   const [loadingServices, setLoadingServices] = useState(true);

//   // Company size options
//   const companySizes = [
//     "1-10",
//     "11-50",
//     "51-200",
//     "201-500",
//     "501-1000",
//     "1000+",
//   ];

//   // Industry options
//   const industries = [
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Education",
//     "Manufacturing",
//     "Retail",
//     "Real Estate",
//     "Consulting",
//     "Marketing & Advertising",
//     "Food & Beverage",
//     "Transportation",
//     "Energy",
//     "Non-profit",
//     "Government",
//     "Other",
//   ];

//   // Employment status options
//   const employmentStatuses = [
//     "Employed",
//     "Self-employed",
//     "Unemployed",
//     "Student",
//   ];

//   // Time slots
//   const timeSlots = [
//     "09:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "01:00 PM",
//     "02:00 PM",
//     "03:00 PM",
//     "04:00 PM",
//     "05:00 PM",
//   ];

//   // Fetch countries from REST Countries API
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch(
//           "https://restcountries.com/v3.1/all?fields=name"
//         );
//         const data = await response.json();
//         const sortedCountries = data
//           .map((country) => country.name.common)
//           .sort();
//         setCountries(sortedCountries);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//         setAlertInfo({
//           message: "Failed to load countries. Please refresh the page.",
//           variant: "destructive",
//           icon: AlertCircle,
//         });
//       } finally {
//         setLoadingCountries(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Form validation
//   const validateForm = () => {
//     const requiredFields = [
//       "email",
//       "firstName",
//       "lastName",
//       "country",
//       "companyName",
//       "companyIndustry",
//       "companySize",
//       "jobTitle",
//       "selectedSolution",
//       "phoneNumber",
//       "employmentStatus",
//     ];

//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         setAlertInfo({
//           message: `Please fill in the ${field
//             .replace(/([A-Z])/g, " $1")
//             .toLowerCase()} field.`,
//           variant: "destructive",
//           icon: AlertCircle,
//         });
//         return false;
//       }
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setAlertInfo({
//         message: "Please enter a valid email address.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//       return false;
//     }

//     return true;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch(`${backendURL}/api/registerForSolution`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           solutionType: "consulting service", // Set explicitly for this form
//           slug: formData.selectedSolution, // Ensure slug matches selected solution
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to register for solution");

//       const result = await response.json();
//       setAlertInfo({
//         message:
//           result.message ||
//           "Solution registered successfully! We'll contact you within 24 hours.",
//         variant: "default",
//         icon: CheckCircle,
//       });

//       // Reset form after successful submission
//       setTimeout(() => {
//         navigate("/solutions/consulting_Services");
//       }, 3000);
//     } catch (error) {
//       console.error("Error registering for solution:", error);
//       setAlertInfo({
//         message:
//           "Failed to register for solution. Please try again or contact us directly.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle alert modal
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4 transition-colors">
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </button>

//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               Register for Your Solution
//             </h1>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Select one of our solutions to get started. We will reach out to
//               you shortly to schedule your personalized session.
//             </p>
//           </div>
//         </div>

//         {/* Main Form */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white text-center">
//             <h2 className="text-xl font-semibold mb-2">
//               Select One of our solutions to get started. We will reach out to
//               you shortly
//             </h2>
//             <div className="flex items-center justify-center gap-2 text-teal-800">
//               <Clock className="w-4 h-4" />
//               <span className="text-sm">Response within 24 hours</span>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-6">
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Mail className="inline w-4 h-4 mr-2" />
//                 Email Address *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                 placeholder="your.email@company.com"
//                 required
//               />
//             </div>

//             {/* Name Fields */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <User className="inline w-4 h-4 mr-2" />
//                   First Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                   placeholder="John"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <User className="inline w-4 h-4 mr-2" />
//                   Last Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                   placeholder="Doe"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Country Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Globe className="inline w-4 h-4 mr-2" />
//                 Country *
//               </label>
//               <select
//                 name="country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                 required
//                 disabled={loadingCountries}>
//                 <option value="">
//                   {loadingCountries
//                     ? "Loading countries..."
//                     : "Select your country"}
//                 </option>
//                 {countries.map((country) => (
//                   <option key={country} value={country}>
//                     {country}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Company Information */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
//                 Company Information
//               </h3>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Building className="inline w-4 h-4 mr-2" />
//                   Company or Business Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="companyName"
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                   placeholder="Your Company or Business Name"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Briefcase className="inline w-4 h-4 mr-2" />
//                   Industry *
//                 </label>
//                 <select
//                   name="companyIndustry"
//                   value={formData.companyIndustry}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                   required>
//                   <option value="">Select your industry</option>
//                   {industries.map((industry) => (
//                     <option key={industry} value={industry}>
//                       {industry}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Users className="inline w-4 h-4 mr-2" />
//                   Company Size *
//                 </label>
//                 <select
//                   name="companySize"
//                   value={formData.companySize}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                   required>
//                   <option value="">Select company size</option>
//                   {companySizes.map((size) => (
//                     <option key={size} value={size}>
//                       {size} employees
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Job Title and Employment Status */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Briefcase className="inline w-4 h-4 mr-2" />
//                   Your Job Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="jobTitle"
//                   value={formData.jobTitle}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                   placeholder="e.g., CEO, Marketing Manager, Business Owner"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <User className="inline w-4 h-4 mr-2" />
//                   Employment Status *
//                 </label>
//                 <select
//                   name="employmentStatus"
//                   value={formData.employmentStatus}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                   required>
//                   <option value="">Select employment status</option>
//                   {employmentStatuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Solution Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <MessageSquare className="inline w-4 h-4 mr-2" />
//                 Select Solution *
//               </label>
//               <select
//                 name="selectedSolution"
//                 value={formData.selectedSolution}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                 required
//                 disabled={loadingServices}>
//                 <option value="">
//                   {loadingServices
//                     ? "Loading solutions..."
//                     : "Select a consulting solution"}
//                 </option>
//                 {solutions.map((service) => (
//                   <option key={service.slug} value={service.slug}>
//                     {service.title}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Phone Number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Phone className="inline w-4 h-4 mr-2" />
//                 Phone Number *
//               </label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                 placeholder="+1234567890"
//                 required
//               />
//             </div>

//             {/* Preferred Date and Time */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Calendar className="inline w-4 h-4 mr-2" />
//                   Preferred Date (Optional)
//                 </label>
//                 <input
//                   type="date"
//                   name="preferredDate"
//                   value={formData.preferredDate}
//                   onChange={handleInputChange}
//                   min={new Date().toISOString().split("T")[0]}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Clock className="inline w-4 h-4 mr-2" />
//                   Preferred Time (Optional)
//                 </label>
//                 <select
//                   name="preferredTime"
//                   value={formData.preferredTime}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all">
//                   <option value="">Select preferred time</option>
//                   {timeSlots.map((time) => (
//                     <option key={time} value={time}>
//                       {time}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Additional Message */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Additional Message (Optional)
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
//                 placeholder="Tell us more about your business challenges or specific requirements..."
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-teal-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
//                 {isLoading ? (
//                   <>
//                     <Loader className="animate-spin" size={20} />
//                     Registering Solution
//                   </>
//                 ) : (
//                   <>
//                     <Calendar className="w-5 h-5" />
//                     Register Solution
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Contact Info */}
//             <div className="pt-6 border-t text-center text-sm text-gray-600">
//               <p>Need immediate assistance?</p>
//               <p>
//                 Call us at <span className="font-medium">+2349012048912</span>{" "}
//                 or email <span className="font-medium">Credulen@gmail.com</span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Modal for alerts */}
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

// export default BookConsultation;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "../components/tools/Alert";
import {
  Loader,
  CheckCircle,
  AlertCircle,
  X,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Users,
  MessageSquare,
  ArrowLeft,
  Calendar,
  Clock,
} from "lucide-react";
import UsePaginatedSolutions from "../components/tools/usePagination";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const BookConsultation = () => {
  const { solutions, error, pagination, handlePageChange } =
    UsePaginatedSolutions("ConsultingService");
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const solutionFromState = location.state?.solution;

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    companyName: "",
    companyIndustry: "",
    companySize: "",
    jobTitle: "",
    selectedSolution: slug || "",
    phoneNumber: "",
    employmentStatus: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  // Loading and alert states
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Data states
  const [countries, setCountries] = useState([]);
  const [consultingServices, setConsultingServices] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  // Company size options
  const companySizes = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  // Industry options
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Consulting",
    "Marketing & Advertising",
    "Food & Beverage",
    "Transportation",
    "Energy",
    "Non-profit",
    "Government",
    "Other",
  ];

  // Employment status options
  const employmentStatuses = [
    "Employed",
    "Self-employed",
    "Unemployed",
    "Student",
  ];

  // Time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const data = await response.json();
        const sortedCountries = data
          .map((country) => country.name.common)
          .sort();
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setAlertInfo({
          message: "Failed to load countries. Please refresh the page.",
          variant: "destructive",
          icon: AlertCircle,
        });
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "country",
      "companyName",
      "companyIndustry",
      "companySize",
      "jobTitle",
      "selectedSolution",
      "phoneNumber",
      "employmentStatus",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setAlertInfo({
          message: `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`,
          variant: "destructive",
          icon: AlertCircle,
        });
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertInfo({
        message: "Please enter a valid email address.",
        variant: "destructive",
        icon: AlertCircle,
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/registerForSolution`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          solutionType: "consulting service", // Set explicitly for this form
          slug: formData.selectedSolution, // Ensure slug matches selected solution
        }),
      });

      if (!response.ok) throw new Error("Failed to register for solution");

      const result = await response.json();
      setAlertInfo({
        message:
          result.message ||
          "Solution registered successfully! We'll contact you within 24 hours.",
        variant: "default",
        icon: CheckCircle,
      });

      // Reset form after successful submission
      setTimeout(() => {
        navigate("/solutions/consulting_Services");
      }, 3000);
    } catch (error) {
      console.error("Error registering for solution:", error);
      setAlertInfo({
        message:
          "Failed to register for solution. Please try again or contact us directly.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle alert modal
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-500 hover:text-secondary-500 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Register for Your Solution
            </h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Select one of our solutions to get started. We will reach out to
              you shortly to schedule your personalized session.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-100">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white text-center">
            <h2 className="text-xl font-semibold mb-2">
              Select one of our solutions to get started. We will reach out to
              you shortly
            </h2>
            <div className="flex items-center justify-center gap-2 text-primary-100">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Response within 24 hours</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2 text-primary-500" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="your.email@company.com"
                required
              />
            </div>

            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <User className="inline w-4 h-4 mr-2 text-primary-500" />
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <User className="inline w-4 h-4 mr-2 text-primary-500" />
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Globe className="inline w-4 h-4 mr-2 text-primary-500" />
                Country *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
                disabled={loadingCountries}>
                <option value="">
                  {loadingCountries
                    ? "Loading countries..."
                    : "Select your country"}
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary-900 border-b border-primary-200 pb-2">
                Company Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Building className="inline w-4 h-4 mr-2 text-primary-500" />
                  Company or Business Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Your Company or Business Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Briefcase className="inline w-4 h-4 mr-2 text-primary-500" />
                  Industry *
                </label>
                <select
                  name="companyIndustry"
                  value={formData.companyIndustry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required>
                  <option value="">Select your industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Users className="inline w-4 h-4 mr-2 text-primary-500" />
                  Company Size *
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required>
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size} employees
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Title and Employment Status */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Briefcase className="inline w-4 h-4 mr-2 text-primary-500" />
                  Your Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="e.g., CEO, Marketing Manager, Business Owner"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <User className="inline w-4 h-4 mr-2 text-primary-500" />
                  Employment Status *
                </label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required>
                  <option value="">Select employment status</option>
                  {employmentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Solution Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <MessageSquare className="inline w-4 h-4 mr-2 text-primary-500" />
                Select Solution *
              </label>
              <select
                name="selectedSolution"
                value={formData.selectedSolution}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
                disabled={loadingServices}>
                <option value="">
                  {loadingServices
                    ? "Loading solutions..."
                    : "Select a consulting solution"}
                </option>
                {solutions.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2 text-primary-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="+1234567890"
                required
              />
            </div>

            {/* Preferred Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2 text-primary-500" />
                  Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-2 text-primary-500" />
                  Preferred Time (Optional)
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                  <option value="">Select preferred time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell us more about your business challenges or specific requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className=" group w-auto mx-auto lg:w-[50%] bg-secondary-500 text-primary-900 py-4 px-8 rounded-xl font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader
                      className="animate-spin text-primary-900"
                      size={20}
                    />
                    Registering Solution
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 group-hover:text-white text-primary-900" />
                    Register Solution
                  </>
                )}
              </button>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t border-primary-200 text-center text-sm text-neutral-600">
              <p>Need immediate assistance?</p>
              <p>
                Call us at{" "}
                <span className="font-medium text-primary-900">
                  +2349012048912
                </span>{" "}
                or email{" "}
                <span className="font-medium text-primary-900">
                  Credulen@gmail.com
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for alerts */}
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

export default BookConsultation;
