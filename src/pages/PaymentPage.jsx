// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import { Loader, CheckCircle, AlertCircle, X, ArrowLeft } from "lucide-react";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const PaymentPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { solution } = state || {};
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     employmentStatus: "",
//     jobTitle: "",
//     selectedSolution: solution?.title || "",
//     solutionType: solution?.category || "TrainingSchools",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!solution) {
//       navigate("/404");
//     }
//   }, [solution, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePayment = async () => {
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

//     if (!solution?.amount || solution.amount <= 0) {
//       setAlertInfo({
//         message: "Invalid training fee. Please contact support.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const amountInKobo = solution.amount * 100; // Use discounted amount in kobo
//       const payload = {
//         ...formData,
//         slug: solution.slug,
//         solutionId: solution._id,
//         amount: amountInKobo,
//         callback_url: `${window.location.origin}/payment-success`,
//       };

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

//   if (!solution) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-5xl mx-auto">
//         {/* Header with Back Button */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-teal-600 hover:text-teal-700 transition-colors">
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Course
//           </button>
//           <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Form Section */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//               Billing Information
//             </h2>
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                   placeholder="+234 123 456 7890"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Employment Status (Optional)
//                 </label>
//                 <select
//                   name="employmentStatus"
//                   value={formData.employmentStatus}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
//                   <option value="">Select your status</option>
//                   <option value="employed">Employed</option>
//                   <option value="unemployed">Unemployed</option>
//                   <option value="student">Student</option>
//                   <option value="retired">Retired</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Job Title (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="jobTitle"
//                   value={formData.jobTitle}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                   placeholder="e.g., Software Engineer"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Order Summary Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Order Summary
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={solution.image}
//                     alt={solution.title}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-700">
//                       {solution.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">{solution.category}</p>
//                   </div>
//                 </div>
//                 <div className="border-t pt-4">
//                   {solution.discountPercentage > 0 && (
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Original Price:</span>
//                       <span className="text-gray-500 line-through">
//                         ₦{solution.price?.toLocaleString()}
//                       </span>
//                     </div>
//                   )}
//                   {solution.discountPercentage > 0 && (
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-gray-600">Discount:</span>
//                       <span className="text-green-600">
//                         {solution.discountPercentage}% Off
//                       </span>
//                     </div>
//                   )}
//                   <div className="flex justify-between items-center text-lg font-semibold">
//                     <span className="text-gray-800">Total:</span>
//                     <span className="text-teal-600">
//                       ₦{solution.amount?.toLocaleString() || solution.price}
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handlePayment}
//                   className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center"
//                   disabled={isLoading}>
//                   {isLoading ? (
//                     <>
//                       <Loader className="animate-spin mr-2" size={20} />
//                       Processing...
//                     </>
//                   ) : (
//                     `Pay ₦${
//                       solution.amount?.toLocaleString() || solution.price
//                     }`
//                   )}
//                 </button>
//                 <p className="text-xs text-gray-500 text-center mt-2">
//                   Secure payment via Paystack
//                 </p>
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

// export default PaymentPage;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import { Loader, CheckCircle, AlertCircle, X, ArrowLeft } from "lucide-react";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const PaymentPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { solution } = state || {};
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     employmentStatus: "",
//     jobTitle: "",
//     selectedSolution: solution?.title || "",
//     solutionType: solution?.category || "TrainingSchools",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [alertInfo, setAlertInfo] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [voucherCode, setVoucherCode] = useState("");
//   const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
//   const [voucherMessage, setVoucherMessage] = useState("");
//   const [finalAmount, setFinalAmount] = useState(
//     solution?.amount || solution?.price || 0
//   );
//   const [voucherSavings, setVoucherSavings] = useState(0);
//   const [voucherDiscountPercentage, setVoucherDiscountPercentage] = useState(0);

//   useEffect(() => {
//     if (!solution) {
//       navigate("/404");
//     } else {
//       setFinalAmount(solution.amount || solution.price || 0); // Initialize with solution's discounted amount
//     }
//   }, [solution, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const calculateVoucherDiscountPercentage = (
//     originalAmount,
//     discountedAmount,
//     voucher
//   ) => {
//     if (!voucher || originalAmount <= 0) return 0;
//     if (voucher.discountType === "percentage") {
//       return voucher.discountValue; // Direct percentage from voucher
//     } else {
//       // For fixed amount, calculate percentage based on original amount after solution discount
//       const savings = originalAmount - discountedAmount;
//       return Math.round((savings / originalAmount) * 100);
//     }
//   };

//   const handleApplyVoucher = async () => {
//     if (!voucherCode.trim()) {
//       setVoucherMessage("Please enter a voucher code");
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 3000);
//       return;
//     }

//     setIsApplyingVoucher(true);
//     try {
//       const response = await fetch(`${backendURL}/api/getDiscountedAmount`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           voucherCode,
//           solutionId: solution._id,
//           email: formData.email,
//         }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to apply voucher");
//       }

//       const originalAmount = solution.amount || solution.price || 0;
//       setFinalAmount(data.discountedAmount);
//       setVoucherSavings(originalAmount - data.discountedAmount);

//       const voucherResponse = await fetch(
//         `${backendURL}/api/getVoucherByCode/${voucherCode}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ code: voucherCode.toUpperCase() }),
//         }
//       );
//       const voucherData = await voucherResponse.json();
//       if (voucherResponse.ok && voucherData) {
//         const discountPercentage = calculateVoucherDiscountPercentage(
//           originalAmount,
//           data.discountedAmount,
//           voucherData
//         );
//         console.log(discountPercentage, "discountPercentage");
//         setVoucherDiscountPercentage(discountPercentage);
//       } else {
//         setVoucherDiscountPercentage(0); // Fallback if voucher details not found
//       }

//       setVoucherMessage("Voucher applied! You're saving big!", "success");
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 3000);
//     } catch (error) {
//       setVoucherMessage(error.message || "Invalid voucher code");
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 3000);
//       setVoucherDiscountPercentage(0); // Reset on error
//     } finally {
//       setIsApplyingVoucher(false);
//     }
//   };

//   const handleRemoveVoucher = () => {
//     setVoucherCode("");
//     setVoucherMessage("");
//     setVoucherSavings(0);
//     setVoucherDiscountPercentage(0);
//     setFinalAmount(solution.amount || solution.price);
//   };

//   const handlePayment = async () => {
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
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 3000);
//       return;
//     }

//     if (!solution?.amount || finalAmount < 0) {
//       setAlertInfo({
//         message: "Invalid training fee. Please contact support.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 3000);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const amountInKobo = finalAmount * 100; // Use final amount (after voucher)
//       const payload = {
//         ...formData,
//         slug: solution.slug,
//         solutionId: solution._id,
//         voucherCode, // Include voucher code
//         amount: amountInKobo,
//         callback_url: `${window.location.origin}/payment-success`,
//       };

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
//       setShowModal(true);
//       setTimeout(() => setShowModal(false), 3000);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (alertInfo || voucherMessage) {
//       setShowModal(true);
//       const timer = setTimeout(() => {
//         setShowModal(false);
//         setAlertInfo(null);
//         setVoucherMessage("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [alertInfo, voucherMessage]);

//   if (!solution) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-teal-50 py-12 px-4">
//       <div className="max-w-5xl mx-auto">
//         {/* Header with Back Button */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-teal-600 hover:text-teal-700 transition-colors duration-200"
//             aria-label="Back to Course">
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Course
//           </button>
//           <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Form Section */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//               Billing Information
//             </h2>
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     First Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                     required
//                     aria-required="true"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Last Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                     required
//                     aria-required="true"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                   required
//                   aria-required="true"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                   placeholder="+234 123 456 7890"
//                   required
//                   aria-required="true"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Employment Status (Optional)
//                 </label>
//                 <select
//                   name="employmentStatus"
//                   value={formData.employmentStatus}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
//                   <option value="">Select your status</option>
//                   <option value="employed">Employed</option>
//                   <option value="unemployed">Unemployed</option>
//                   <option value="student">Student</option>
//                   <option value="retired">Retired</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Job Title (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="jobTitle"
//                   value={formData.jobTitle}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                   placeholder="e.g., Software Engineer"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Order Summary Section */}
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Order Summary
//               </h2>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={solution.image}
//                     alt={solution.title}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-700">
//                       {solution.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">{solution.category}</p>
//                   </div>
//                 </div>
//                 <div className="border-t pt-4">
//                   {/* Original Price and Solution Discount */}
//                   {solution.discountPercentage > 0 && (
//                     <>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-600">Original Price:</span>
//                         <span className="text-gray-500 line-through">
//                           ₦{solution.price?.toLocaleString()}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-600">Course Discount:</span>
//                         <span className="text-green-600">
//                           {solution.discountPercentage}% Off
//                         </span>
//                       </div>
//                     </>
//                   )}
//                   {/* Voucher Code Input */}
//                   <div className="mt-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Promo Code
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={voucherCode}
//                         onChange={(e) =>
//                           setVoucherCode(e.target.value.toUpperCase())
//                         }
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
//                         placeholder="Enter code (e.g., TECH50)"
//                         disabled={isApplyingVoucher}
//                         aria-label="Promo code"
//                       />
//                       {voucherCode && voucherSavings > 0 ? (
//                         <button
//                           onClick={handleRemoveVoucher}
//                           className="bg-red-100 text-red-600 px-4 py-3 rounded-lg hover:bg-red-200 transition-all duration-200 flex items-center"
//                           aria-label="Remove promo code">
//                           <X size={20} />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleApplyVoucher}
//                           disabled={isApplyingVoucher}
//                           className="bg-teal-600 text-white px-2 py-0 rounded-lg hover:bg-teal-700 transition-all duration-200 flex items-center"
//                           aria-label="Apply promo code">
//                           {isApplyingVoucher ? (
//                             <Loader className="animate-spin" size={20} />
//                           ) : voucherSavings > 0 ? (
//                             <CheckCircle size={20} />
//                           ) : (
//                             "Apply"
//                           )}
//                         </button>
//                       )}
//                     </div>
//                     {voucherMessage && (
//                       <p
//                         className={`mt-2 text-sm transition-opacity duration-300 ${
//                           voucherMessage.includes("success")
//                             ? "text-green bg-white"
//                             : "text-red-600 bg-white"
//                         }`}>
//                         {voucherMessage}
//                       </p>
//                     )}
//                   </div>
//                   {/* Savings Display with Discount Percentages */}
//                   {voucherSavings > 0 && (
//                     <div className="flex justify-between items-center mb-2 animate-slide-in mt-6">
//                       <span className="text-gray-600">Voucher Savings:</span>
//                       <span className="text-green-600 font-medium">
//                         ₦{voucherSavings.toLocaleString()} Off (
//                         {voucherDiscountPercentage > 0
//                           ? `${voucherDiscountPercentage}%`
//                           : "N/A"}
//                         )
//                       </span>
//                     </div>
//                   )}
//                   {/* Total with Combined Discount Percentage */}
//                   <div className="flex justify-between items-center text-lg font-semibold mt-6">
//                     <span className="text-gray-800">Total:</span>
//                     <span className="text-teal-600">
//                       ₦{finalAmount.toLocaleString()} (
//                       {solution.discountPercentage > 0 || voucherSavings > 0
//                         ? `${Math.round(
//                             ((solution.price - finalAmount) / solution.price) *
//                               100
//                           )}% Off`
//                         : "0% Off"}
//                       )
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handlePayment}
//                   className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
//                   disabled={isLoading}
//                   aria-label={`Pay ₦${finalAmount.toLocaleString()}`}>
//                   {isLoading ? (
//                     <>
//                       <Loader className="animate-spin mr-2" size={20} />
//                       Processing...
//                     </>
//                   ) : (
//                     `Pay ₦${finalAmount.toLocaleString()}`
//                   )}
//                 </button>
//                 <p className="text-xs text-gray-500 text-center mt-2">
//                   Secure payment via Paystack
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//         {(alertInfo || voucherMessage) && (
//           <Alert
//             variant={
//               alertInfo?.variant ||
//               (voucherMessage.includes("success") ? "success" : "destructive")
//             }
//             className="m-0">
//             <div className="flex items-center gap-2">
//               {alertInfo?.icon && (
//                 <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
//               )}
//               <AlertDescription>
//                 {alertInfo?.message || voucherMessage}
//               </AlertDescription>
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
//       <div className="bg-white rounded-lg p-4 max-w-sm w-full relative animate-fade-in">
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

// export default PaymentPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../components/tools/Alert";
import {
  Loader,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  Sparkles,
  Gift,
} from "lucide-react";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

// Animated Success Component
const AnimatedSuccess = ({ isVisible, onComplete }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative shadow-2xl transform transition-all duration-300 ease-out">
        <div className="text-center">
          {/* Animated Success Icon with Sparkles */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center animate-bounce-slow">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            {/* Floating Sparkles */}
            <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400 animate-ping" />
            <Sparkles
              className="absolute -bottom-2 -right-2 w-4 h-4 text-blue-400 animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
            <Sparkles
              className="absolute top-2 -right-4 w-5 h-5 text-purple-400 animate-ping"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Success Message */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Voucher Applied!
          </h3>
          <p className="text-lg text-green-600 font-semibold mb-4">
            You're saving big! 🎉
          </p>

          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-progress-bar"></div>
          </div>

          {/* Gift Icon */}
          <div className="animate-bounce-slow">
            <Gift className="w-8 h-8 text-teal-600 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { solution } = state || {};
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    employmentStatus: "",
    jobTitle: "",
    selectedSolution: solution?.title || "",
    solutionType: solution?.category || "TrainingSchools",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVoucherSuccess, setShowVoucherSuccess] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [isApplyingVoucher, setIsApplyingVoucher] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [finalAmount, setFinalAmount] = useState(
    solution?.amount || solution?.price || 0
  );
  const [voucherSavings, setVoucherSavings] = useState(0);
  const [voucherDiscountPercentage, setVoucherDiscountPercentage] = useState(0);

  useEffect(() => {
    if (!solution) {
      navigate("/404");
    } else {
      setFinalAmount(solution.amount || solution.price || 0);
    }
  }, [solution, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateVoucherDiscountPercentage = (
    originalAmount,
    discountedAmount,
    voucher
  ) => {
    if (!voucher || originalAmount <= 0) return 0;
    if (voucher.discountType === "percentage") {
      return voucher.discountValue;
    } else {
      const savings = originalAmount - discountedAmount;
      return Math.round((savings / originalAmount) * 100);
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setVoucherMessage("Please enter a voucher code");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }

    setIsApplyingVoucher(true);
    try {
      const response = await fetch(`${backendURL}/api/getDiscountedAmount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voucherCode,
          solutionId: solution._id,
          email: formData.email,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to apply voucher");
      }

      const originalAmount = solution.amount || solution.price || 0;
      setFinalAmount(data.discountedAmount);
      setVoucherSavings(originalAmount - data.discountedAmount);

      const voucherResponse = await fetch(
        `${backendURL}/api/getVoucherByCode/${voucherCode}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: voucherCode.toUpperCase() }),
        }
      );
      const voucherData = await voucherResponse.json();
      if (voucherResponse.ok && voucherData) {
        const discountPercentage = calculateVoucherDiscountPercentage(
          originalAmount,
          data.discountedAmount,
          voucherData
        );
        setVoucherDiscountPercentage(discountPercentage);
      } else {
        setVoucherDiscountPercentage(0);
      }

      setShowVoucherSuccess(true);
    } catch (error) {
      setVoucherMessage(error.message || "Invalid voucher code");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      setVoucherDiscountPercentage(0);
    } finally {
      setIsApplyingVoucher(false);
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherCode("");
    setVoucherMessage("");
    setVoucherSavings(0);
    setVoucherDiscountPercentage(0);
    setFinalAmount(solution.amount || solution.price);
  };

  const handlePayment = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      setAlertInfo({
        message:
          "Please fill in all required fields before proceeding to payment.",
        variant: "destructive",
        icon: AlertCircle,
      });
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }

    if (!solution?.amount || finalAmount < 0) {
      setAlertInfo({
        message: "Invalid training fee. Please contact support.",
        variant: "destructive",
        icon: AlertCircle,
      });
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const amountInKobo = finalAmount * 100;
      const payload = {
        ...formData,
        slug: solution.slug,
        solutionId: solution._id,
        voucherCode,
        amount: amountInKobo,
        callback_url: `${window.location.origin}/payment-success`,
      };

      const response = await fetch(
        `${backendURL}/api/initiate-paystack-payment`,
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
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    } finally {
      setIsLoading(false);
    }
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

  if (!solution) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-teal-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-600 hover:text-teal-700 transition-colors duration-200"
            aria-label="Back to Course">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Course
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Billing Information
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                  placeholder="+234 123 456 7890"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Status (Optional)
                </label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
                  <option value="">Select your status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title (Optional)
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-gray-500">{solution.category}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  {/* Original Price and Solution Discount */}
                  {solution.discountPercentage > 0 && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Original Price:</span>
                        <span className="text-gray-500 line-through">
                          ₦{solution.price?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Course Discount:</span>
                        <span className="text-green-600">
                          {solution.discountPercentage}% Off
                        </span>
                      </div>
                    </>
                  )}
                  {/* Voucher Code Input */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <div className="md:flex gap-2">
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) =>
                          setVoucherCode(e.target.value.toUpperCase())
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors mid:mb-3"
                        placeholder="Enter code (e.g., TECH50) "
                        disabled={isApplyingVoucher}
                        aria-label="Promo code"
                      />
                      {voucherCode && voucherSavings > 0 ? (
                        <button
                          onClick={handleRemoveVoucher}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-all duration-200 flex items-center"
                          aria-label="Remove promo code">
                          <X size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyVoucher}
                          disabled={isApplyingVoucher}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 flex items-center"
                          aria-label="Apply promo code">
                          {isApplyingVoucher ? (
                            <Loader className="animate-spin mr-2" size={20} />
                          ) : voucherSavings > 0 ? (
                            <CheckCircle size={20} />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Savings Display with Discount Percentages */}
                  {voucherSavings > 0 && (
                    <div className="flex justify-between items-center mb-2 mt-6 animate-slide-in">
                      <span className="text-gray-600">Voucher Savings:</span>
                      <span className="text-green-600 font-medium">
                        ₦{voucherSavings.toLocaleString()} Off (
                        {voucherDiscountPercentage > 0
                          ? `${voucherDiscountPercentage}%`
                          : "N/A"}
                        )
                      </span>
                    </div>
                  )}
                  {/* Total with Combined Discount Percentage */}
                  <div className="flex justify-between items-center text-lg font-semibold mt-6">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-teal-600">
                      ₦{finalAmount.toLocaleString()} (
                      {solution.discountPercentage > 0 || voucherSavings > 0
                        ? `${Math.round(
                            ((solution.price - finalAmount) / solution.price) *
                              100
                          )}% Off`
                        : "0% Off"}
                      )
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                  disabled={isLoading}
                  aria-label={`Pay ₦${finalAmount.toLocaleString()}`}>
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin mr-2" size={20} />
                      Processing...
                    </>
                  ) : (
                    `Pay ₦${finalAmount.toLocaleString()}`
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure payment via Paystack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Success Modal for Voucher */}
      <AnimatedSuccess
        isVisible={showVoucherSuccess}
        onComplete={() => setShowVoucherSuccess(false)}
      />

      {/* Regular Alert Modal for Errors */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {alertInfo && (
          <Alert variant={alertInfo?.variant} className="m-0">
            <div className="flex items-center gap-2">
              {alertInfo?.icon && (
                <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
              )}
              <AlertDescription>{alertInfo?.message}</AlertDescription>
            </div>
          </Alert>
        )}
        {voucherMessage && !showVoucherSuccess && (
          <Alert variant="destructive" className="m-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <AlertDescription>{voucherMessage}</AlertDescription>
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
      <div className="bg-white rounded-lg p-4 max-w-sm w-full relative animate-fade-in">
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

export default PaymentPage;
