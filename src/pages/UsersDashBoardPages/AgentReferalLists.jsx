// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Table, TextInput } from "flowbite-react";
// import { useSelector } from "react-redux";
// import {
//   Users,
//   UserPlus,
//   Mail,
//   Shield,
//   User,
//   DollarSign,
//   TrendingUp,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Search,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";
// import moment from "moment";
// import { CurrencyNaira } from "tabler-icons-react";

// // Enhanced stats card component
// const StatsCard = ({ totalReferrals, totalPayments }) => {
//   const cards = [
//     {
//       title: "Total Referrals",
//       value: totalReferrals,
//       icon: UserPlus,
//       bgGradient: "from-indigo-500 to-purple-600",
//       iconBg: "bg-indigo-100",
//       iconColor: "text-indigo-600",
//     },
//     {
//       title: "Total Payments",
//       value: totalPayments,
//       icon: CurrencyNaira,
//       bgGradient: "from-green-500 to-emerald-600",
//       iconBg: "bg-green-100",
//       iconColor: "text-green-600",
//     },
//   ];

//   return (
//     <div className="mb-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {cards.map((card, index) => (
//           <div
//             key={card.title}
//             className="bg-white text-dark rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
//             <div
//               className={`bg-gradient-to-r ${card.bgGradient} p-6 text-dark rounded-t-xl`}>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className={`p-3 rounded-full bg-gray-100 shadow-sm`}>
//                     <card.icon className={`h-6 w-6 ${card.iconColor}`} />
//                   </div>
//                   <div>
//                     <p className="text-dark opacity-90 text-sm font-medium">
//                       {card.title}
//                     </p>
//                     <p className="text-2xl font-bold text-dark">
//                       {card.value.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 <TrendingUp className="h-5 w-5 text-white opacity-60" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Enhanced search bar component
// const SearchBar = ({ searchTerm, onSearchChange, placeholder, id }) => (
//   <div className="mb-6">
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-50%]">
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <TextInput
//           id={id}
//           type="text"
//           placeholder={placeholder}
//           value={searchTerm}
//           onChange={onSearchChange}
//           className="pl-10"
//         />
//       </div>
//     </div>
//   </div>
// );

// // Enhanced pagination component
// const PaginationButtons = React.memo(
//   ({ currentPage, totalPages, onPageChange }) => {
//     const pageNumbers = useMemo(() => {
//       const numbers = [];
//       const maxVisibleButtons = 5;
//       let startPage = Math.max(
//         1,
//         currentPage - Math.floor(maxVisibleButtons / 2)
//       );
//       let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

//       if (endPage - startPage + 1 < maxVisibleButtons) {
//         startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         numbers.push(i);
//       }
//       return numbers;
//     }, [currentPage, totalPages]);

//     return (
//       <div className="flex justify-center items-center mt-8 space-x-2">
//         <button
//           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//           disabled={currentPage === 1}
//           className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//             currentPage === 1
//               ? "text-gray-400 cursor-not-allowed bg-gray-100"
//               : "text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 hover:shadow-md"
//           }`}>
//           <ChevronLeft className="h-4 w-4 mr-1" />
//           Previous
//         </button>

//         {pageNumbers[0] > 1 && (
//           <>
//             <button
//               onClick={() => onPageChange(1)}
//               className="px-3 py-2 rounded-lg text-indigo-600 hover:text-white hover:bg-indigo-600 transition-all duration-200 hover:shadow-md border border-gray-200">
//               1
//             </button>
//             {pageNumbers[0] > 2 && (
//               <span className="px-2 text-gray-500">...</span>
//             )}
//           </>
//         )}

//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => onPageChange(number)}
//             className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
//               currentPage === number
//                 ? "bg-indigo-600 text-white shadow-md"
//                 : "text-indigo-600 hover:text-white hover:bg-indigo-600 border border-gray-200 hover:shadow-md"
//             }`}>
//             {number}
//           </button>
//         ))}

//         {pageNumbers[pageNumbers.length - 1] < totalPages && (
//           <>
//             {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
//               <span className="px-2 text-gray-500">...</span>
//             )}
//             <button
//               onClick={() => onPageChange(totalPages)}
//               className="px-3 py-2 rounded-lg text-indigo-600 hover:text-white hover:bg-indigo-600 transition-all duration-200 hover:shadow-md border border-gray-200">
//               {totalPages}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//             currentPage === totalPages
//               ? "text-gray-400 cursor-not-allowed bg-gray-100"
//               : "text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 hover:shadow-md"
//           }`}>
//           Next
//           <ChevronRight className="h-4 w-4 ml-1" />
//         </button>
//       </div>
//     );
//   }
// );

// // Enhanced loading spinner component
// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
//     <div className="text-center">
//       <Loader2 className="h-16 w-16 animate-spin text-indigo-600 mx-auto mb-4" />
//       <p className="text-gray-600">Loading your data...</p>
//     </div>
//   </div>
// );

// // Enhanced user image component
// const UserImage = ({ image, username }) => {
//   if (image) {
//     return (
//       <img
//         src={image}
//         alt={`${username}'s profile`}
//         className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-gray-200"
//         onError={(e) => {
//           e.target.style.display = "none";
//           e.target.nextSibling.style.display = "flex";
//         }}
//       />
//     );
//   }

//   return (
//     <div className="w-12 h-12 rounded-full bg-gray-100 shadow-sm border-2 border-gray-200 flex items-center justify-center">
//       <User className="w-6 h-6 text-gray-400" />
//     </div>
//   );
// };

// // Payment status component
// const PaymentStatus = ({ status }) => {
//   const getStatusConfig = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return {
//           icon: CheckCircle,
//           bgColor: "bg-green-100",
//           textColor: "text-green-800",
//           borderColor: "border-green-200",
//         };
//       case "failed":
//         return {
//           icon: XCircle,
//           bgColor: "bg-red-100",
//           textColor: "text-red-800",
//           borderColor: "border-red-200",
//         };
//       case "pending":
//         return {
//           icon: Clock,
//           bgColor: "bg-yellow-100",
//           textColor: "text-yellow-800",
//           borderColor: "border-yellow-200",
//         };
//       default:
//         return {
//           icon: Clock,
//           bgColor: "bg-gray-100",
//           textColor: "text-gray-800",
//           borderColor: "border-gray-200",
//         };
//     }
//   };

//   const config = getStatusConfig(status);
//   const StatusIcon = config.icon;

//   return (
//     <div
//       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
//       <StatusIcon className="w-3 h-3 mr-1" />
//       <span className="capitalize">{status || "Unknown"}</span>
//     </div>
//   );
// };

// // Enhanced empty state component
// const EmptyState = ({ searchTerm, entity, activeTab }) => {
//   const getEmptyStateIcon = () => {
//     return activeTab === 0 ? UserPlus : CurrencyNaira;
//   };

//   const EmptyIcon = getEmptyStateIcon();

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
//       <div className="text-center py-16 px-8">
//         <EmptyIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
//         <h3 className="text-xl font-semibold text-gray-700 mb-3">
//           No {entity} found
//         </h3>
//         <p className="text-gray-500 max-w-md mx-auto">
//           {searchTerm
//             ? `We couldn't find any ${entity} matching "${searchTerm}". Try adjusting your search criteria.`
//             : `No ${entity} have been recorded yet. They will appear here once available.`}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Custom tab component
// const TabButton = ({ active, onClick, children, icon: Icon }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 overflow-x-auto ${
//       active
//         ? "bg-indigo-600 text-white shadow-md"
//         : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
//     }`}>
//     <Icon className="w-5 h-5" />
//     <span>{children}</span>
//   </button>
// );

// // Main component
// export default function AgentReferrals() {
//   // State management
//   const [isLoading, setIsLoading] = useState(true);
//   const [referrals, setReferrals] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [paymentSearchTerm, setPaymentSearchTerm] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [paymentCurrentPage, setPaymentCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [paymentTotalPages, setPaymentTotalPages] = useState(1);
//   const [totalReferrals, setTotalReferrals] = useState(0);
//   const [totalPayments, setTotalPayments] = useState(0);
//   const [activeTab, setActiveTab] = useState(0);
//   const [stats, setStats] = useState({
//     totalReferrals: 0,
//     totalPayments: 0,
//   });

//   const { profile } = useSelector((state) => state.profiles);
//   const AgentID = profile?.data?.agentId;
//   const { userInfo } = useSelector((state) => state.auth);

//   // Constants
//   const referralsPerPage = 9;
//   const paymentsPerPage = 9;

//   // Memoized values
//   const backendURL = useMemo(
//     () =>
//       import.meta.env.MODE === "production"
//         ? import.meta.env.VITE_BACKEND_URL
//         : "http://localhost:3001",
//     []
//   );

//   const filteredReferrals = useMemo(() => {
//     return referrals.filter((referral) =>
//       referral.username?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [referrals, searchTerm]);

//   const filteredPayments = useMemo(() => {
//     return payments.filter((payment) =>
//       payment.email?.toLowerCase().includes(paymentSearchTerm.toLowerCase())
//     );
//   }, [payments, paymentSearchTerm]);

//   // Event handlers
//   const handleTabChange = (newValue) => {
//     setActiveTab(newValue);
//     setSearchTerm("");
//     setPaymentSearchTerm("");
//     setCurrentPage(1);
//     setPaymentCurrentPage(1);
//   };

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   }, []);

//   const showSnackbar = useCallback((message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   }, []);

//   const handleSearchChange = useCallback((e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   }, []);

//   const handlePaymentSearchChange = useCallback((e) => {
//     setPaymentSearchTerm(e.target.value);
//     setPaymentCurrentPage(1);
//   }, []);

//   // API functions
//   const fetchReferrals = useCallback(
//     async (page) => {
//       if (!userInfo?._id) {
//         showSnackbar("User not authenticated", "error");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const res = await fetch(
//           `${backendURL}/api/getUsers?userId=${userInfo._id}&page=${page}&limit=${referralsPerPage}`
//         );
//         const data = await res.json();
//         const agentData = data.data?.users || [];
//         const filteredData = agentData.find((u) => u._id === userInfo._id);

//         if (res.ok && filteredData) {
//           const referrals = filteredData.referrals || [];
//           const totalReferrals = referrals.length;
//           setReferrals(referrals);
//           setTotalReferrals(totalReferrals);
//           setTotalPages(Math.ceil(totalReferrals / referralsPerPage) || 1);
//           setStats((prev) => ({ ...prev, totalReferrals }));
//         } else {
//           showSnackbar(data.message || "Failed to fetch referrals", "error");
//         }
//       } catch (error) {
//         showSnackbar(
//           error.message || "An error occurred while fetching referrals",
//           "error"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [backendURL, userInfo, showSnackbar]
//   );

//   const fetchPayments = useCallback(
//     async (page) => {
//       if (!AgentID) {
//         showSnackbar("Agent ID not found", "error");
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const res = await fetch(
//           `${backendURL}/api/getAllPayments?page=${page}&limit=${paymentsPerPage}`
//         );
//         const data = await res.json();

//         if (res.ok && data.success && data.data?.payments) {
//           const agentPayments = data.data.payments.filter(
//             (payment) => payment.agentCode === AgentID
//           );
//           const totalPayments = agentPayments.length;
//           setPayments(agentPayments);
//           setTotalPayments(totalPayments);
//           setPaymentTotalPages(Math.ceil(totalPayments / paymentsPerPage) || 1);
//           setStats((prev) => ({ ...prev, totalPayments }));
//         } else {
//           showSnackbar(data.message || "Failed to fetch payments", "error");
//         }
//       } catch (error) {
//         showSnackbar(
//           error.message || "An error occurred while fetching payments",
//           "error"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [backendURL, AgentID, showSnackbar]
//   );

//   // Effects
//   useEffect(() => {
//     if (userInfo && userInfo.role === "agent" && AgentID) {
//       fetchReferrals(currentPage);
//       fetchPayments(paymentCurrentPage);
//     }
//   }, [
//     userInfo,
//     AgentID,
//     currentPage,
//     paymentCurrentPage,
//     fetchReferrals,
//     fetchPayments,
//   ]);

//   // Render loading state
//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   // Main render
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-auto">
//       <div className="max-w-6xl mx-auto p-4 md:p-8 overflow-x-auto">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             My Referrals
//           </h1>
//           <p className="text-gray-600">
//             Track your referrals and thier payments in one convenient location
//           </p>
//         </div>

//         {/* Stats Section */}
//         <StatsCard
//           totalReferrals={stats.totalReferrals}
//           totalPayments={stats.totalPayments}
//         />

//         {/* Tabs Navigation */}
//         <div className="mb-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
//             <div className="flex space-x-2">
//               <TabButton
//                 active={activeTab === 0}
//                 onClick={() => handleTabChange(0)}
//                 icon={UserPlus}>
//                 My Referrals ({stats.totalReferrals})
//               </TabButton>
//               <TabButton
//                 active={activeTab === 1}
//                 onClick={() => handleTabChange(1)}
//                 icon={CurrencyNaira}>
//                 Completed Payments ({stats.totalPayments})
//               </TabButton>
//             </div>
//           </div>
//         </div>

//         {/* Referrals Tab Panel */}
//         {activeTab === 0 && (
//           <div>
//             <SearchBar
//               searchTerm={searchTerm}
//               onSearchChange={handleSearchChange}
//               placeholder="Search referrals by username..."
//               id="search-referrals"
//             />

//             {userInfo && filteredReferrals.length > 0 ? (
//               <div>
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
//                   <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
//                     <h3 className="text-lg font-semibold text-white">
//                       Your Referrals
//                     </h3>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <Table>
//                       <Table.Head className="bg-gray-50">
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             Profile
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <Users className="w-4 h-4" />
//                             Username
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-4 h-4" />
//                             Email
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <Shield className="w-4 h-4" />
//                             Role
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="w-4 h-4" />
//                             Joined Date
//                           </div>
//                         </Table.HeadCell>
//                       </Table.Head>
//                       <Table.Body className="divide-y divide-gray-100">
//                         {filteredReferrals.map((referral, index) => (
//                           <Table.Row
//                             key={referral._id}
//                             className="hover:bg-indigo-50 transition-colors duration-200">
//                             <Table.Cell className="py-4">
//                               <UserImage
//                                 image={referral.image}
//                                 username={referral.username}
//                               />
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <span className="font-semibold text-gray-900">
//                                 {referral.username || "No Username"}
//                               </span>
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <span className="text-gray-700 truncate max-w-[200px] block">
//                                 {referral.email}
//                               </span>
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
//                                 <span className="capitalize">
//                                   {referral.role}
//                                 </span>
//                               </div>
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <span className="text-gray-600">
//                                 {referral.updatedAt
//                                   ? moment(referral.updatedAt).format(
//                                       "MMM D, YYYY"
//                                     )
//                                   : "Unknown"}
//                               </span>
//                             </Table.Cell>
//                           </Table.Row>
//                         ))}
//                       </Table.Body>
//                     </Table>
//                   </div>
//                 </div>

//                 {totalPages > 1 && (
//                   <PaginationButtons
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                   />
//                 )}
//               </div>
//             ) : (
//               <EmptyState
//                 searchTerm={searchTerm}
//                 entity="referrals"
//                 activeTab={activeTab}
//               />
//             )}
//           </div>
//         )}

//         {/* Payments Tab Panel */}
//         {activeTab === 1 && (
//           <div>
//             <SearchBar
//               searchTerm={paymentSearchTerm}
//               onSearchChange={handlePaymentSearchChange}
//               placeholder="Search payments by email..."
//               id="search-payments"
//             />

//             {userInfo && filteredPayments.length > 0 ? (
//               <div>
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-auto overflow-x-auto">
//                   <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
//                     <h3 className="text-lg font-semibold text-white">
//                       Your Payments
//                     </h3>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <Table>
//                       <Table.Head className="bg-gray-50">
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             Customer
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-4 h-4" />
//                             Email
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <Shield className="w-4 h-4" />
//                             Solution
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <CurrencyNaira className="w-4 h-4" />
//                             Amount
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <CheckCircle className="w-4 h-4" />
//                             Status
//                           </div>
//                         </Table.HeadCell>
//                         <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                           <div className="flex items-center gap-2">
//                             <Calendar className="w-4 h-4" />
//                             Payment Date
//                           </div>
//                         </Table.HeadCell>
//                       </Table.Head>
//                       <Table.Body className="divide-y divide-gray-100">
//                         {filteredPayments.map((payment, index) => (
//                           <Table.Row
//                             key={payment._id}
//                             className="hover:bg-green-50 transition-colors duration-200">
//                             <Table.Cell className="py-4">
//                               <div className="flex items-center space-x-3">
//                                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                                   <User className="w-5 h-5 text-green-600" />
//                                 </div>
//                                 <div>
//                                   <span className="font-semibold text-gray-900">
//                                     {payment.firstName && payment.lastName
//                                       ? `${payment.firstName} ${payment.lastName}`
//                                       : "No Name"}
//                                   </span>
//                                 </div>
//                               </div>
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <span className="text-gray-700 truncate max-w-[200px] block">
//                                 {payment.email || "No Email"}
//                               </span>
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
//                                 <span>
//                                   {payment.selectedSolution || "No Solution"}
//                                 </span>
//                               </div>
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <span className="font-bold text-green-600">
//                                 ₦
//                                 {(
//                                   payment.finalAmount ||
//                                   payment.amount ||
//                                   0
//                                 ).toLocaleString()}
//                               </span>
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <PaymentStatus status={payment.paymentStatus} />
//                             </Table.Cell>
//                             <Table.Cell className="py-4">
//                               <div className="flex items-center space-x-2">
//                                 <Calendar className="w-4 h-4 text-gray-400" />
//                                 <span className="text-gray-600">
//                                   {payment.paymentDate
//                                     ? moment(payment.paymentDate).format(
//                                         "MMM D, YYYY"
//                                       )
//                                     : "No Date"}
//                                 </span>
//                               </div>
//                             </Table.Cell>
//                           </Table.Row>
//                         ))}
//                       </Table.Body>
//                     </Table>
//                   </div>
//                 </div>

//                 {paymentTotalPages > 1 && (
//                   <PaginationButtons
//                     currentPage={paymentCurrentPage}
//                     totalPages={paymentTotalPages}
//                     onPageChange={setPaymentCurrentPage}
//                   />
//                 )}
//               </div>
//             ) : (
//               <EmptyState
//                 searchTerm={paymentSearchTerm}
//                 entity="payments"
//                 activeTab={activeTab}
//               />
//             )}
//           </div>
//         )}
//       </div>

//       {/* Notification Snackbar */}
//       {snackbar.open && (
//         <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
//           <div
//             className={`rounded-lg shadow-lg border-l-4 p-4 ${
//               snackbar.severity === "error"
//                 ? "bg-red-50 border-red-400 text-red-700"
//                 : "bg-green-50 border-green-400 text-green-700"
//             }`}>
//             <div className="flex justify-between items-start">
//               <p className="text-sm font-medium">{snackbar.message}</p>
//               <button
//                 onClick={handleCloseSnackbar}
//                 className="ml-4 text-gray-400 hover:text-gray-600">
//                 <X className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  User,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import moment from "moment";
import { CurrencyNaira } from "tabler-icons-react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

// Enhanced stats card component
const StatsCard = ({ totalReferrals, totalPayments }) => {
  const cards = [
    {
      title: "Total Referrals",
      value: totalReferrals,
      icon: UserPlus,
      bgGradient: "from-indigo-500 to-purple-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Total Payments",
      value: totalPayments,
      icon: CurrencyNaira,
      bgGradient: "from-green-500 to-emerald-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="bg-white text-dark rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${card.bgGradient} p-4 md:p-6 text-dark rounded-t-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-4">
                  <div
                    className={`p-2 md:p-3 rounded-full bg-gray-100 shadow-sm`}>
                    <card.icon
                      className={`h-5 w-5 md:h-6 md:w-6 ${card.iconColor}`}
                    />
                  </div>
                  <div>
                    <p className="text-dark opacity-90 text-xs md:text-sm font-medium">
                      {card.title}
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-dark">
                      {card.value.toLocaleString()}
                    </p>
                  </div>
                </div>
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-white opacity-60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced search bar component
const SearchBar = ({ searchTerm, onSearchChange, placeholder, id }) => (
  <div className="mb-6">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        <TextInput
          id={id}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-9 md:pl-10 text-sm md:text-base"
        />
      </div>
    </div>
  </div>
);

// Enhanced pagination component
const PaginationButtons = React.memo(
  ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = useMemo(() => {
      const numbers = [];
      const maxVisibleButtons = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisibleButtons / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

      if (endPage - startPage + 1 < maxVisibleButtons) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        numbers.push(i);
      }
      return numbers;
    }, [currentPage, totalPages]);

    return (
      <div className="flex flex-wrap justify-center items-center mt-6 md:mt-8 gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 hover:shadow-md"
          }`}>
          <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 mr-1" />
          Previous
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-2 py-1 md:px-3 md:py-2 rounded-lg text-indigo-600 hover:text-white hover:bg-indigo-600 transition-all duration-200 hover:shadow-md border border-gray-200 text-sm">
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="px-1 md:px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-2 py-1 md:px-3 md:py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
              currentPage === number
                ? "bg-indigo-600 text-white shadow-md"
                : "text-indigo-600 hover:text-white hover:bg-indigo-600 border border-gray-200 hover:shadow-md"
            }`}>
            {number}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-1 md:px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-2 py-1 md:px-3 md:py-2 rounded-lg text-indigo-600 hover:text-white hover:bg-indigo-600 transition-all duration-200 hover:shadow-md border border-gray-200 text-sm">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 hover:shadow-md"
          }`}>
          Next
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
        </button>
      </div>
    );
  }
);

// Enhanced loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
    <div className="text-center">
      <Loader2 className="h-12 w-12 md:h-16 md:w-16 animate-spin text-indigo-600 mx-auto mb-4" />
      <p className="text-gray-600 text-sm md:text-base">Loading your data...</p>
    </div>
  </div>
);

// Enhanced user image component
const UserImage = ({ image, username }) => {
  if (image) {
    return (
      <img
        src={image}
        alt={`${username}'s profile`}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm border-2 border-gray-200"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
    );
  }

  return (
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 shadow-sm border-2 border-gray-200 flex items-center justify-center">
      <User className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
    </div>
  );
};

// Payment status component
const PaymentStatus = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        };
      case "failed":
        return {
          icon: XCircle,
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
        };
      case "pending":
        return {
          icon: Clock,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
        };
      default:
        return {
          icon: Clock,
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          borderColor: "border-gray-200",
        };
    }
  };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      <StatusIcon className="w-3 h-3 mr-1" />
      <span className="capitalize">{status || "Unknown"}</span>
    </div>
  );
};

// Enhanced empty state component
const EmptyState = ({ searchTerm, entity, activeTab }) => {
  const getEmptyStateIcon = () => {
    return activeTab === 0 ? UserPlus : CurrencyNaira;
  };

  const EmptyIcon = getEmptyStateIcon();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
      <div className="text-center py-12 md:py-16 px-6 md:px-8">
        <EmptyIcon className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4 md:mb-6" />
        <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3">
          No {entity} found
        </h3>
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
          {searchTerm
            ? `We couldn't find any ${entity} matching "${searchTerm}". Try adjusting your search criteria.`
            : `No ${entity} have been recorded yet. They will appear here once available.`}
        </p>
      </div>
    </div>
  );
};

// Custom tab component
const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-200 overflow-x-auto text-sm md:text-base ${
      active
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
    }`}>
    <Icon className="w-4 h-4 md:w-5 md:h-5" />
    <span>{children}</span>
  </button>
);

// React Table Component for Referrals
const ReferralsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "image",
        Cell: ({ row }) => (
          <UserImage
            image={row.original.image}
            username={row.original.username}
          />
        ),
      },
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ value }) => (
          <span className="font-semibold text-gray-900 text-xs md:text-sm">
            {value || "No Username"}
          </span>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => (
          <span className="text-gray-700 truncate max-w-[120px] md:max-w-[200px] block text-xs md:text-sm">
            {value}
          </span>
        ),
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: ({ value }) => (
          <div className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
            <span className="capitalize">{value}</span>
          </div>
        ),
      },
      {
        Header: "Joined Date",
        accessor: "updatedAt",
        Cell: ({ value }) => (
          <span className="text-gray-600 text-xs md:text-sm">
            {value ? moment(value).format("MMM D, YYYY") : "Unknown"}
          </span>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="overflow-x-auto w-full">
      <table {...getTableProps()} className="w-full">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-3 md:py-4 font-semibold text-gray-700 text-xs md:text-sm text-left px-4">
                  <div className="flex items-center gap-1 md:gap-2">
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-100">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-indigo-50 transition-colors duration-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-3 md:py-4 px-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// React Table Component for Payments
const PaymentsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Customer",
        accessor: "firstName",
        Cell: ({ row }) => (
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
              <User className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <span className="font-semibold text-gray-900 text-xs md:text-sm">
                {row.original.firstName && row.original.lastName
                  ? `${row.original.firstName} ${row.original.lastName}`
                  : "No Name"}
              </span>
            </div>
          </div>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => (
          <span className="text-gray-700 truncate max-w-[120px] md:max-w-[200px] block text-xs md:text-sm">
            {value || "No Email"}
          </span>
        ),
      },
      {
        Header: "Solution",
        accessor: "selectedSolution",
        Cell: ({ value }) => (
          <div className="inline-flex items-center px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <span>{value || "No Solution"}</span>
          </div>
        ),
      },
      {
        Header: "Amount",
        accessor: "finalAmount",
        Cell: ({ value, row }) => (
          <span className="font-bold text-green-600 text-xs md:text-sm">
            ₦{(value || row.original.amount || 0).toLocaleString()}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "paymentStatus",
        Cell: ({ value }) => <PaymentStatus status={value} />,
      },
      {
        Header: "Payment Date",
        accessor: "paymentDate",
        Cell: ({ value }) => (
          <div className="flex items-center space-x-1 md:space-x-2">
            <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            <span className="text-gray-600 text-xs md:text-sm">
              {value ? moment(value).format("MMM D, YYYY") : "No Date"}
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="overflow-x-auto w-full">
      <table {...getTableProps()} className="w-full">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-3 md:py-4 font-semibold text-gray-700 text-xs md:text-sm text-left px-4">
                  <div className="flex items-center gap-1 md:gap-2">
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-100">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-green-50 transition-colors duration-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-3 md:py-4 px-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Main component
export default function AgentReferrals() {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentSearchTerm, setPaymentSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentCurrentPage, setPaymentCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paymentTotalPages, setPaymentTotalPages] = useState(1);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    totalPayments: 0,
  });

  const { profile } = useSelector((state) => state.profiles);
  const AgentID = profile?.data?.agentId;
  const { userInfo } = useSelector((state) => state.auth);

  // Constants
  const referralsPerPage = 9;
  const paymentsPerPage = 9;

  // Memoized values
  const backendURL = useMemo(
    () =>
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:3001",
    []
  );

  const filteredReferrals = useMemo(() => {
    return referrals.filter((referral) =>
      referral.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [referrals, searchTerm]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) =>
      payment.email?.toLowerCase().includes(paymentSearchTerm.toLowerCase())
    );
  }, [payments, paymentSearchTerm]);

  // Event handlers
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    setSearchTerm("");
    setPaymentSearchTerm("");
    setCurrentPage(1);
    setPaymentCurrentPage(1);
  };

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePaymentSearchChange = useCallback((e) => {
    setPaymentSearchTerm(e.target.value);
    setPaymentCurrentPage(1);
  }, []);

  // API functions
  const fetchReferrals = useCallback(
    async (page) => {
      if (!userInfo?._id) {
        showSnackbar("User not authenticated", "error");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/api/getUsers?userId=${userInfo._id}&page=${page}&limit=${referralsPerPage}`
        );
        const data = await res.json();
        const agentData = data.data?.users || [];
        const filteredData = agentData.find((u) => u._id === userInfo._id);

        if (res.ok && filteredData) {
          const referrals = filteredData.referrals || [];
          const totalReferrals = referrals.length;
          setReferrals(referrals);
          setTotalReferrals(totalReferrals);
          setTotalPages(Math.ceil(totalReferrals / referralsPerPage) || 1);
          setStats((prev) => ({ ...prev, totalReferrals }));
        } else {
          showSnackbar(data.message || "Failed to fetch referrals", "error");
        }
      } catch (error) {
        showSnackbar(
          error.message || "An error occurred while fetching referrals",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [backendURL, userInfo, showSnackbar]
  );

  const fetchPayments = useCallback(
    async (page) => {
      if (!AgentID) {
        showSnackbar("Agent ID not found", "error");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/api/getAllPayments?page=${page}&limit=${paymentsPerPage}`
        );
        const data = await res.json();

        if (res.ok && data.success && data.data?.payments) {
          const agentPayments = data.data.payments.filter(
            (payment) => payment.agentCode === AgentID
          );
          const totalPayments = agentPayments.length;
          setPayments(agentPayments);
          setTotalPayments(totalPayments);
          setPaymentTotalPages(Math.ceil(totalPayments / paymentsPerPage) || 1);
          setStats((prev) => ({ ...prev, totalPayments }));
        } else {
          showSnackbar(data.message || "Failed to fetch payments", "error");
        }
      } catch (error) {
        showSnackbar(
          error.message || "An error occurred while fetching payments",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [backendURL, AgentID, showSnackbar]
  );

  // Effects
  useEffect(() => {
    if (userInfo && userInfo.role === "agent" && AgentID) {
      fetchReferrals(currentPage);
      fetchPayments(paymentCurrentPage);
    }
  }, [
    userInfo,
    AgentID,
    currentPage,
    paymentCurrentPage,
    fetchReferrals,
    fetchPayments,
  ]);

  // Render loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 overflow-x-auto">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            My Referrals
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Track your referrals and their payments in one convenient location
          </p>
        </div>

        {/* Stats Section */}
        <StatsCard
          totalReferrals={stats.totalReferrals}
          totalPayments={stats.totalPayments}
        />

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
              <TabButton
                active={activeTab === 0}
                onClick={() => handleTabChange(0)}
                icon={UserPlus}>
                My Referrals ({stats.totalReferrals})
              </TabButton>
              <TabButton
                active={activeTab === 1}
                onClick={() => handleTabChange(1)}
                icon={CurrencyNaira}>
                Completed Payments ({stats.totalPayments})
              </TabButton>
            </div>
          </div>
        </div>

        {/* Referrals Tab Panel */}
        {activeTab === 0 && (
          <div>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              placeholder="Search referrals by username..."
              id="search-referrals"
            />

            {userInfo && filteredReferrals.length > 0 ? (
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      Your Referrals
                    </h3>
                  </div>
                  <ReferralsTable data={filteredReferrals} />
                </div>

                {totalPages > 1 && (
                  <PaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            ) : (
              <EmptyState
                searchTerm={searchTerm}
                entity="referrals"
                activeTab={activeTab}
              />
            )}
          </div>
        )}

        {/* Payments Tab Panel */}
        {activeTab === 1 && (
          <div>
            <SearchBar
              searchTerm={paymentSearchTerm}
              onSearchChange={handlePaymentSearchChange}
              placeholder="Search payments by email..."
              id="search-payments"
            />

            {userInfo && filteredPayments.length > 0 ? (
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-auto">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      Your Payments
                    </h3>
                  </div>
                  <PaymentsTable data={filteredPayments} />
                </div>

                {paymentTotalPages > 1 && (
                  <PaginationButtons
                    currentPage={paymentCurrentPage}
                    totalPages={paymentTotalPages}
                    onPageChange={setPaymentCurrentPage}
                  />
                )}
              </div>
            ) : (
              <EmptyState
                searchTerm={paymentSearchTerm}
                entity="payments"
                activeTab={activeTab}
              />
            )}
          </div>
        )}
      </div>

      {/* Notification Snackbar */}
      {snackbar.open && (
        <div className="fixed top-4 right-4 z-50 max-w-xs md:max-w-sm w-full">
          <div
            className={`rounded-lg shadow-lg border-l-4 p-3 md:p-4 ${
              snackbar.severity === "error"
                ? "bg-red-50 border-red-400 text-red-700"
                : "bg-green-50 border-green-400 text-green-700"
            }`}>
            <div className="flex justify-between items-start">
              <p className="text-xs md:text-sm font-medium">
                {snackbar.message}
              </p>
              <button
                onClick={handleCloseSnackbar}
                className="ml-2 md:ml-4 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
