// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Table, TextInput, Select } from "flowbite-react";
// import { useSelector } from "react-redux";
// import { HiOutlineUserCircle, HiOutlineSearch } from "react-icons/hi";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import {
//   TableContainer,
//   Paper,
//   Snackbar,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import MuiAlert from "@mui/material/Alert";
// import moment from "moment";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

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
//       <div className="flex justify-center items-center mt-4 space-x-2">
//         <button
//           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-3 py-2 rounded-lg ${
//             currentPage === 1
//               ? "text-gray-500 cursor-not-allowed"
//               : "text-blue-500 hover:text-white hover:bg-blue-600"
//           }`}>
//           &lt;
//         </button>

//         {pageNumbers[0] > 1 && (
//           <>
//             <button
//               onClick={() => onPageChange(1)}
//               className="px-3 py-2 rounded-lg text-blue-50 hover:bg-gray-100">
//               1
//             </button>
//             {pageNumbers[0] > 2 && <span className="px-3 py-2">...</span>}
//           </>
//         )}

//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             onClick={() => onPageChange(number)}
//             className={`px-2 py-0 rounded-lg ${
//               currentPage === number
//                 ? "bg-btColour text-white"
//                 : "text-btColour hover:text-white hover:bg-btColour"
//             }`}>
//             {number}
//           </button>
//         ))}

//         {pageNumbers[pageNumbers.length - 1] < totalPages && (
//           <>
//             {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
//               <span className="px-3 py-2">...</span>
//             )}
//             <button
//               onClick={() => onPageChange(totalPages)}
//               className="px-3 py-2 rounded-lg text-btColour hover:text-white hover:bg-btColour">
//               {totalPages}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-2 rounded-lg ${
//             currentPage === totalPages
//               ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//               : "text-btColour hover:text-white hover:bg-btColour"
//           }`}>
//           &gt;
//         </button>
//       </div>
//     );
//   }
// );

// const UserTableRow = React.memo(({ user, backendURL, onDeleteClick }) => {
//   return (
//     <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//       <Table.Cell className="py-3">
//         {moment(user.updatedAt).format("MMMM D")}
//       </Table.Cell>
//       <Table.Cell>
//         {user.image ? (
//           <img
//             src={`${user.image}`}
//             alt={user.username}
//             className="w-10 h-10 rounded-full"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/fallback-image.png";
//             }}
//           />
//         ) : (
//           <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
//         )}
//       </Table.Cell>
//       <Table.Cell>{user.username}</Table.Cell>
//       <Table.Cell>{user.email}</Table.Cell>
//       <Table.Cell>
//         {user.role}
//         {user.role === "admin" ? (
//           <FaCheck className="text-green-500 inline ml-2" />
//         ) : user.role === "agent" ? (
//           <FaCheck className="text-blue-500 inline ml-2" />
//         ) : (
//           <FaTimes className="text-red-500 inline ml-2" />
//         )}
//       </Table.Cell>

//       <Table.Cell>
//         <button
//           onClick={() => onDeleteClick(user._id)}
//           className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md ">
//           Delete
//         </button>
//       </Table.Cell>
//     </Table.Row>
//   );
// });

// export default function AdminUsersLists() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [roleFilter, setRoleFilter] = useState("");
//   const [userIdToDelete, setUserIdToDelete] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);

//   const { userInfo } = useSelector((state) => state.auth);
//   const usersPerPage = 9;

//   const backendURL = useMemo(
//     () =>
//       import.meta.env.MODE === "production"
//         ? import.meta.env.VITE_BACKEND_URL
//         : "http://localhost:3001",
//     []
//   );

//   const handleCloseSnackbar = useCallback((event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   }, []);

//   const showSnackbar = useCallback((message, severity = "info") => {
//     setSnackbar({ open: true, message, severity });
//   }, []);

//   const fetchUsers = useCallback(
//     async (page) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(
//           `${backendURL}/api/getUsers?page=${page}&limit=${usersPerPage}`
//         );
//         const data = await res.json();
//         if (res.ok) {
//           setUsers(data?.data?.users);
//           setTotalUsers(data.totalUsers);
//           setTotalPages(data.totalPages);
//         } else {
//           showSnackbar(data.message || "Failed to fetch users", "error");
//         }
//       } catch (error) {
//         showSnackbar(
//           error.message || "An error occurred while fetching users",
//           "error"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [backendURL, showSnackbar]
//   );

//   useEffect(() => {
//     if (userInfo) {
//       fetchUsers(currentPage);
//     }
//   }, [userInfo, currentPage, fetchUsers]);

//   const handleDeleteUser = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/Delete/${userIdToDelete}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
//         setDeleteOpen(false);
//         showSnackbar("User deleted successfully", "success");
//         fetchUsers(currentPage);
//       } else {
//         showSnackbar(data.message || "Failed to delete user", "error");
//       }
//     } catch (error) {
//       showSnackbar(
//         error.message || "An error occurred while deleting user",
//         "error"
//       );
//     }
//   }, [backendURL, userIdToDelete, currentPage, fetchUsers, showSnackbar]);

//   const handleDeleteClick = useCallback((userId) => {
//     setUserIdToDelete(userId);
//     setDeleteOpen(true);
//   }, []);

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchesSearch = user?.username
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase());

//       const matchesRole =
//         roleFilter === "" ||
//         user?.role?.toLowerCase() === roleFilter.toLowerCase();

//       return matchesSearch && matchesRole;
//     });
//   }, [users, searchTerm, roleFilter]);

//   const handleSearchChange = useCallback((e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   }, []);

//   const handleRoleFilterChange = useCallback((e) => {
//     setRoleFilter(e.target.value);
//     setCurrentPage(1);
//   }, []);
//   // Memoized loading spinner
//   const LoadingSpinner = useMemo(
//     () => (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//         <CircularProgress size={40} className="text-btColour" />
//       </div>
//     ),
//     []
//   );

//   if (isLoading) {
//     return LoadingSpinner;
//   }

//   return (
//     <div className="mx-auto p-0 mt-5 mid:mt-20">
//       {/* <div className="mb-4">
//         <TextInput
//           id="search"
//           type="text"
//           icon={HiOutlineSearch}
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="w-64"
//         />
//       </div> */}
//       <div className="mb-4 flex flex-col sm:flex-row gap-4">
//         <TextInput
//           id="search"
//           type="text"
//           icon={HiOutlineSearch}
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="w-full sm:w-64"
//           aria-label="Search users by username"
//         />
//         <Select
//           id="roleFilter"
//           value={roleFilter}
//           onChange={handleRoleFilterChange}
//           className="w-full sm:w-48"
//           aria-label="Filter users by role">
//           <option value="">All Roles</option>
//           <option value="user">User</option>
//           <option value="agent">Agent</option>
//           <option value="admin">Admin</option>
//         </Select>
//         <Button
//           onClick={() => {
//             setSearchTerm("");
//             setRoleFilter("");
//             setCurrentPage(1);
//           }}
//           className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600">
//           Clear Filters
//         </Button>
//       </div>
//       {userInfo && users.length > 0 ? (
//         <>
//           <TableContainer component={Paper} className="shadow-md mb-4">
//             <Table hoverable>
//               <Table.Head>
//                 <Table.HeadCell className="py-3">Date created</Table.HeadCell>
//                 <Table.HeadCell>User image</Table.HeadCell>
//                 <Table.HeadCell>Username</Table.HeadCell>
//                 <Table.HeadCell>Email</Table.HeadCell>
//                 <Table.HeadCell>Admin</Table.HeadCell>
//                 <Table.HeadCell>Delete</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {filteredUsers.map((user) => (
//                   <UserTableRow
//                     key={user._id}
//                     user={user}
//                     backendURL={backendURL}
//                     onDeleteClick={handleDeleteClick}
//                   />
//                 ))}
//               </Table.Body>
//             </Table>
//           </TableContainer>

//           {totalPages > 1 && (
//             <PaginationButtons
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </>
//       ) : (
//         <p>You have no users yet!</p>
//       )}

//       <Dialog
//         open={deleteOpen}
//         onClose={() => setDeleteOpen(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description">
//         <DialogTitle id="alert-dialog-title">
//           Are you sure you want to delete this user?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDeleteOpen(false)}
//             className="text-gray-500 hover:text-gray-700">
//             <IoClose size={24} />
//           </Button>
//           <Button
//             onClick={handleDeleteUser}
//             className="text-red-500 hover:text-red-700">
//             <AiTwotoneDelete size={24} />
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Table, TextInput, Select } from "flowbite-react";
// import { useSelector } from "react-redux";
// import {
//   HiOutlineUserCircle,
//   HiOutlineSearch,
//   HiChevronDown,
//   HiUsers,
// } from "react-icons/hi";
// import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
// import {
//   TableContainer,
//   Paper,
//   Snackbar,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Tooltip,
//   Badge,
// } from "@mui/material";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import MuiAlert from "@mui/material/Alert";
// import moment from "moment";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

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
//       <div className="flex justify-center items-center mt-6 space-x-2">
//         <button
//           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//             currentPage === 1
//               ? "text-gray-400 cursor-not-allowed bg-gray-100"
//               : "text-btColour hover:text-white hover:bg-btColour border border-btColour"
//           }`}>
//           Previous
//         </button>

//         {pageNumbers[0] > 1 && (
//           <>
//             <button
//               onClick={() => onPageChange(1)}
//               className="px-3 py-2 rounded-lg text-btColour hover:text-white hover:bg-btColour transition-colors">
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
//             className={`px-3 py-2 rounded-lg font-medium transition-colors ${
//               currentPage === number
//                 ? "bg-btColour text-white shadow-md"
//                 : "text-btColour hover:text-white hover:bg-btColour border border-gray-200"
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
//               className="px-3 py-2 rounded-lg text-btColour hover:text-white hover:bg-btColour transition-colors">
//               {totalPages}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//             currentPage === totalPages
//               ? "text-gray-400 cursor-not-allowed bg-gray-100"
//               : "text-btColour hover:text-white hover:bg-btColour border border-btColour"
//           }`}>
//           Next
//         </button>
//       </div>
//     );
//   }
// );

// const ReferralsDropdown = React.memo(({ referrals, username }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   if (referrals.length === 0) {
//     return (
//       <div className="text-gray-500 text-sm flex items-center">
//         <HiUsers className="w-4 h-4 mr-1" />
//         No referrals
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center justify-between w-full max-w-[200px] px-3 py-2 text-sm bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-btColour focus:ring-opacity-50">
//         <div className="flex items-center">
//           <HiUsers className="w-4 h-4 mr-2 text-blue-600" />
//           <span className="font-medium text-blue-800">
//             View {referrals.length} referral{referrals.length > 1 ? "s" : ""}
//           </span>
//         </div>
//         <HiChevronDown
//           className={`w-4 h-4 text-blue-600 transition-transform ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
//           <div className="p-3 bg-gray-50 border-b border-gray-200">
//             <h4 className="font-semibold text-gray-800 text-sm">
//               Referrals by {username}
//             </h4>
//           </div>
//           <div className="py-1">
//             {referrals.map((referral, index) => (
//               <div
//                 key={referral._id}
//                 className="px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
//                       {(referral.username || referral.email)
//                         .charAt(0)
//                         .toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900 text-sm">
//                         {referral.username || "No Username"}
//                       </p>
//                       <p className="text-xs text-gray-500 truncate max-w-[180px]">
//                         {referral.email}
//                       </p>
//                     </div>
//                   </div>
//                   <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
//                     #{index + 1}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });

// const UserTableRow = React.memo(({ user, backendURL, onDeleteClick }) => {
//   const getRoleStyle = (role) => {
//     switch (role) {
//       case "admin":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "agent":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getRoleIcon = (role) => {
//     switch (role) {
//       case "admin":
//         return <FaCheck className="w-3 h-3 text-green-600" />;
//       case "agent":
//         return <FaCheck className="w-3 h-3 text-blue-600" />;
//       default:
//         return <FaTimes className="w-3 h-3 text-gray-500" />;
//     }
//   };

//   return (
//     <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 transition-colors">
//       <Table.Cell className="py-4">
//         <div className="text-sm font-medium text-gray-900">
//           {moment(user.updatedAt).format("MMM D, YYYY")}
//         </div>
//         <div className="text-xs text-gray-500">
//           {moment(user.updatedAt).format("h:mm A")}
//         </div>
//       </Table.Cell>

//       <Table.Cell className="py-4">
//         <div className="flex items-center">
//           {user.image ? (
//             <img
//               src={`${user.image}`}
//               alt={user.username}
//               className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "/fallback-image.png";
//               }}
//             />
//           ) : (
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
//               <HiOutlineUserCircle className="w-6 h-6 text-white" />
//             </div>
//           )}
//         </div>
//       </Table.Cell>

//       <Table.Cell className="py-4">
//         <div className="font-semibold text-gray-900">{user.username}</div>
//       </Table.Cell>

//       <Table.Cell className="py-4">
//         <div
//           className="text-gray-700 truncate max-w-[200px]"
//           title={user.email}>
//           {user.email}
//         </div>
//       </Table.Cell>

//       <Table.Cell className="py-4">
//         <div className="flex items-center space-x-2">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleStyle(
//               user.role
//             )}`}>
//             {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//           </span>
//           {getRoleIcon(user.role)}
//         </div>
//       </Table.Cell>

//       <Table.Cell className="py-4">
//         {user.role === "agent" ? (
//           <div className="flex items-center space-x-2">
//             <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold min-w-[40px] text-center">
//               {user.referrals.length}
//             </div>
//             {user.referrals.length > 0 && (
//               <Tooltip
//                 title={`${user.referrals.length} referral${
//                   user.referrals.length > 1 ? "s" : ""
//                 }`}>
//                 <HiUsers className="w-4 h-4 text-blue-600" />
//               </Tooltip>
//             )}
//           </div>
//         ) : (
//           <span className="text-gray-400 text-sm">N/A</span>
//         )}
//       </Table.Cell>

//       <Table.Cell className="py-4 min-w-[250px]">
//         {user.role === "agent" ? (
//           <ReferralsDropdown
//             referrals={user.referrals}
//             username={user.username}
//           />
//         ) : (
//           <span className="text-gray-400 text-sm">-</span>
//         )}
//       </Table.Cell>

//       <Table.Cell className="py-4">
//         <button
//           onClick={() => onDeleteClick(user._id)}
//           className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
//           <AiTwotoneDelete className="w-4 h-4 mr-1" />
//           Delete
//         </button>
//       </Table.Cell>
//     </Table.Row>
//   );
// });

// export default function AdminUsersLists() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [roleFilter, setRoleFilter] = useState("");
//   const [userIdToDelete, setUserIdToDelete] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);

//   const { userInfo } = useSelector((state) => state.auth);
//   const usersPerPage = 9;

//   const backendURL = useMemo(
//     () =>
//       import.meta.env.MODE === "production"
//         ? import.meta.env.VITE_BACKEND_URL
//         : "http://localhost:3001",
//     []
//   );

//   const handleCloseSnackbar = useCallback((event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   }, []);

//   const showSnackbar = useCallback((message, severity = "info") => {
//     setSnackbar({ open: true, message, severity });
//   }, []);

//   const fetchUsers = useCallback(
//     async (page) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(
//           `${backendURL}/api/getUsers?page=${page}&limit=${usersPerPage}&role=${roleFilter}`
//         );
//         const data = await res.json();
//         if (res.ok) {
//           setUsers(data?.data?.users);
//           setTotalUsers(data.totalUsers);
//           setTotalPages(data.totalPages);
//         } else {
//           showSnackbar(data.message || "Failed to fetch users", "error");
//         }
//       } catch (error) {
//         showSnackbar(
//           error.message || "An error occurred while fetching users",
//           "error"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [backendURL, roleFilter, showSnackbar]
//   );

//   useEffect(() => {
//     if (userInfo) {
//       fetchUsers(currentPage);
//     }
//   }, [userInfo, currentPage, roleFilter, fetchUsers]);

//   const handleDeleteUser = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/Delete/${userIdToDelete}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
//         setDeleteOpen(false);
//         showSnackbar("User deleted successfully", "success");
//         fetchUsers(currentPage);
//       } else {
//         showSnackbar(data.message || "Failed to delete user", "error");
//       }
//     } catch (error) {
//       showSnackbar(
//         error.message || "An error occurred while deleting user",
//         "error"
//       );
//     }
//   }, [backendURL, userIdToDelete, currentPage, fetchUsers, showSnackbar]);

//   const handleDeleteClick = useCallback((userId) => {
//     setUserIdToDelete(userId);
//     setDeleteOpen(true);
//   }, []);

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchesSearch = user?.username
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       return matchesSearch;
//     });
//   }, [users, searchTerm]);

//   const handleSearchChange = useCallback((e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   }, []);

//   const handleRoleFilterChange = useCallback((e) => {
//     setRoleFilter(e.target.value);
//     setCurrentPage(1);
//   }, []);

//   const getTotalReferrals = useMemo(() => {
//     return users
//       .filter((user) => user.role === "agent")
//       .reduce((total, user) => total + user.referrals.length, 0);
//   }, [users]);

//   const LoadingSpinner = useMemo(
//     () => (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//         <CircularProgress size={40} className="text-btColour" />
//       </div>
//     ),
//     []
//   );

//   if (isLoading) {
//     return LoadingSpinner;
//   }

//   return (
//     <div className="mx-auto p-0 mt-5 mid:mt-20">
//       {/* Header Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">{totalUsers}</div>
//           <div className="text-sm opacity-90">Total Users</div>
//         </div>
//         <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">
//             {users.filter((user) => user.role === "admin").length}
//           </div>
//           <div className="text-sm opacity-90">Admins</div>
//         </div>
//         <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">
//             {users.filter((user) => user.role === "agent").length}
//           </div>
//           <div className="text-sm opacity-90">Agents</div>
//         </div>
//         <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">{getTotalReferrals}</div>
//           <div className="text-sm opacity-90">Total Referrals</div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//         <TextInput
//           id="search"
//           type="text"
//           icon={HiOutlineSearch}
//           placeholder="Search users by username..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="flex-1 sm:max-w-xs"
//           aria-label="Search users by username"
//         />
//         <Select
//           id="roleFilter"
//           value={roleFilter}
//           onChange={handleRoleFilterChange}
//           className="w-full sm:w-48"
//           aria-label="Filter users by role">
//           <option value="">All Roles</option>
//           <option value="user">User</option>
//           <option value="agent">Agent</option>
//           <option value="admin">Admin</option>
//         </Select>
//         <Button
//           onClick={() => {
//             setSearchTerm("");
//             setRoleFilter("");
//             setCurrentPage(1);
//           }}
//           className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition-colors">
//           Clear Filters
//         </Button>
//       </div>

//       {userInfo && users.length > 0 ? (
//         <>
//           <TableContainer
//             component={Paper}
//             className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
//             <Table hoverable className="min-w-full">
//               <Table.Head className="bg-gray-50">
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Date Created
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Avatar
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Username
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Email
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Role
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Referral Count
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Referrals
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Actions
//                 </Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y divide-gray-200">
//                 {filteredUsers.map((user) => (
//                   <UserTableRow
//                     key={user._id}
//                     user={user}
//                     backendURL={backendURL}
//                     onDeleteClick={handleDeleteClick}
//                   />
//                 ))}
//               </Table.Body>
//             </Table>
//           </TableContainer>

//           {totalPages > 1 && (
//             <PaginationButtons
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </>
//       ) : (
//         <div className="text-center py-12">
//           <HiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No users found
//           </h3>
//           <p className="text-gray-500">
//             {searchTerm || roleFilter
//               ? "Try adjusting your search criteria or filters."
//               : "You have no users yet!"}
//           </p>
//         </div>
//       )}

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteOpen}
//         onClose={() => setDeleteOpen(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         PaperProps={{
//           className: "rounded-lg",
//         }}>
//         <DialogTitle
//           id="alert-dialog-title"
//           className="text-gray-900 font-semibold">
//           Delete User Confirmation
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText
//             id="alert-dialog-description"
//             className="text-gray-600">
//             Are you sure you want to delete this user? This action cannot be
//             undone and will permanently remove all user data.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions className="p-4 space-x-2">
//           <Button
//             onClick={() => setDeleteOpen(false)}
//             className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteUser}
//             className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
//             Delete User
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, TextInput, Select } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle, HiOutlineSearch, HiUsers } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  TableContainer,
  Paper,
  Snackbar,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-btColour hover:text-white hover:bg-btColour border border-btColour"
          }`}>
          Previous
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-lg text-btColour hover:text-white hover:bg-btColour transition-colors">
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
              currentPage === number
                ? "bg-btColour text-white shadow-md"
                : "text-btColour hover:text-white hover:bg-btColour border border-gray-200"
            }`}>
            {number}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-lg text-btColour hover:text-white hover:bg-btColour transition-colors">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-btColour hover:text-white hover:bg-btColour border border-btColour"
          }`}>
          Next
        </button>
      </div>
    );
  }
);

const ReferralsModal = React.memo(
  ({ open, onClose, referrals, username, user }) => {
    console.log(user?.agentId);
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="referrals-modal-title"
        aria-describedby="referrals-modal-description"
        PaperProps={{
          className: "rounded-lg max-w-md w-full",
        }}>
        <DialogTitle
          id="referrals-modal-title"
          className="bg-blue-50 text-gray-900 font-semibold flex justify-between items-center border-b border-blue-200">
          <div className="text-gray-800">
            <h2 className="text-lg font-semibold">
              Referrals by <span className="text-blue-600">{username}</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Agent Code:{" "}
              <span className="font-medium text-green-600">
                {user?.agentId}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-blue-100 transition-colors"
            aria-label="Close referrals modal">
            <IoClose className="w-5 h-5 text-btColour" />
          </button>
        </DialogTitle>
        <DialogContent className="p-0 max-h-96 overflow-y-auto">
          {referrals.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <HiUsers className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No referrals found</p>
            </div>
          ) : (
            <div className="divide-y divide-blue-100">
              {referrals.map((referral, index) => (
                <div
                  key={referral._id}
                  className="px-4 py-3 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-btColour to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {(referral.username || referral.email)
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {referral.username || "No Username"}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[250px]">
                          {referral.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 bg-blue-100 px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

const UserTableRow = React.memo(({ user, backendURL, onDeleteClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRoleStyle = (role) => {
    switch (role) {
      case "admin":
        return "bg-green-100 text-green-800 border-green-200";
      case "agent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaCheck className="w-3 h-3 text-green-600" />;
      case "agent":
        return <FaCheck className="w-3 h-3 text-blue-600" />;
      default:
        return <FaTimes className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 transition-colors">
        <Table.Cell className="py-4">
          <div className="text-sm font-medium text-gray-900">
            {moment(user.updatedAt).format("MMM D, YYYY")}
          </div>
          <div className="text-xs text-gray-500">
            {moment(user.updatedAt).format("h:mm A")}
          </div>
        </Table.Cell>

        <Table.Cell className="py-4">
          <div className="flex items-center">
            {user.image ? (
              <img
                src={`${user.image}`}
                alt={user.username}
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.png";
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <HiOutlineUserCircle className="w-6 h-6 text-gray-500" />
              </div>
            )}
          </div>
        </Table.Cell>

        <Table.Cell className="py-4">
          <div className="font-semibold text-gray-900">{user.username}</div>
        </Table.Cell>

        <Table.Cell className="py-4">
          <div
            className="text-gray-700 truncate max-w-[200px]"
            title={user.email}>
            {user.email}
          </div>
        </Table.Cell>
        <Table.Cell className="py-4">
          <div
            className="text-gray-700 truncate max-w-[200px]"
            title={user.phoneNumber}>
            {user.phoneNumber}
          </div>
        </Table.Cell>
        <Table.Cell className="py-4">
          <div
            className="text-gray-700 truncate max-w-[200px]"
            title={user.agentId}>
            {user.agentId}
          </div>
        </Table.Cell>

        <Table.Cell className="py-4">
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleStyle(
                user.role
              )}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
            {getRoleIcon(user.role)}
          </div>
        </Table.Cell>

        <Table.Cell className="py-4">
          {user.role === "agent" ? (
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold min-w-[40px] text-center">
                {user.referrals.length}
              </div>
              {user.referrals.length > 0 && (
                <Tooltip
                  title={`${user.referrals.length} referral${
                    user.referrals.length > 1 ? "s" : ""
                  }`}>
                  <HiUsers className="w-4 h-4 text-btColour" />
                </Tooltip>
              )}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">N/A</span>
          )}
        </Table.Cell>

        <Table.Cell className="py-4 min-w-[250px]">
          {user.role === "agent" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-btColour bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-btColour focus:ring-opacity-50"
              aria-label={`View referrals for ${user.username}`}>
              <HiUsers className="w-4 h-4 mr-2 text-btColour" />
              View {user.referrals.length} referral
              {user.referrals.length > 1 ? "s" : ""}
            </button>
          ) : (
            <span className="text-gray-400 text-sm">-</span>
          )}
        </Table.Cell>

        <Table.Cell className="py-4">
          <button
            onClick={() => onDeleteClick(user._id)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
            <AiTwotoneDelete className="w-4 h-4 mr-1" />
            Delete
          </button>
        </Table.Cell>
      </Table.Row>

      {user.role === "agent" && (
        <ReferralsModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          referrals={user.referrals}
          username={user.username}
          user={user}
        />
      )}
    </>
  );
});

export default function AdminUsersLists() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);
  const usersPerPage = 9;

  const backendURL = useMemo(
    () =>
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:3001",
    []
  );

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const fetchUsers = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/api/getUsers?page=${page}&limit=${usersPerPage}&role=${roleFilter}`
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data?.data?.users);
          console.log(data?.data?.users);
          setTotalUsers(data.totalUsers);
          setTotalPages(data.totalPages);
        } else {
          showSnackbar(data.message || "Failed to fetch users", "error");
        }
      } catch (error) {
        showSnackbar(
          error.message || "An error occurred while fetching users",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [backendURL, roleFilter, showSnackbar]
  );

  useEffect(() => {
    if (userInfo) {
      fetchUsers(currentPage);
    }
  }, [userInfo, currentPage, roleFilter, fetchUsers]);

  const handleDeleteUser = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/Delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setDeleteOpen(false);
        showSnackbar("User deleted successfully", "success");
        fetchUsers(currentPage);
      } else {
        showSnackbar(data.message || "Failed to delete user", "error");
      }
    } catch (error) {
      showSnackbar(
        error.message || "An error occurred while deleting user",
        "error"
      );
    }
  }, [backendURL, userIdToDelete, currentPage, fetchUsers, showSnackbar]);

  const handleDeleteClick = useCallback((userId) => {
    setUserIdToDelete(userId);
    setDeleteOpen(true);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [users, searchTerm]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleRoleFilterChange = useCallback((e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const getTotalReferrals = useMemo(() => {
    return users
      .filter((user) => user.role === "agent")
      .reduce((total, user) => total + user.referrals.length, 0);
  }, [users]);

  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <CircularProgress size={40} className="text-btColour" />
      </div>
    ),
    []
  );

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <div className="mx-auto p-0 mt-5 mid:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-400 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">{totalUsers}</div>
          <div className="text-sm opacity-90">Total Users</div>
        </div>
        <div className="bg-green/90 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">
            {users.filter((user) => user.role === "admin").length}
          </div>
          <div className="text-sm opacity-90">Admins</div>
        </div>
        <div className="bg-purple/80 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">
            {users.filter((user) => user.role === "agent").length}
          </div>
          <div className="text-sm opacity-90">Agents</div>
        </div>
        <div className="bg-orange-600/80 text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">{getTotalReferrals}</div>
          <div className="text-sm opacity-90">Total Referrals</div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <TextInput
          id="search"
          type="text"
          icon={HiOutlineSearch}
          placeholder="Search users by username..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 sm:max-w-xs"
          aria-label="Search users by username"
        />
        <Select
          id="roleFilter"
          value={roleFilter}
          onChange={handleRoleFilterChange}
          className="w-full sm:w-48"
          aria-label="Filter users by role">
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </Select>
        <Button
          onClick={() => {
            setSearchTerm("");
            setRoleFilter("");
            setCurrentPage(1);
          }}
          className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition-colors">
          Clear Filters
        </Button>
      </div>

      {userInfo && users.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <Table hoverable className="min-w-full">
              <Table.Head className="bg-gray-50">
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Date Created
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Image
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Username
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Phone Number
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Agent ID/Code
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Role
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Referral Count
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Referrals
                </Table.HeadCell>
                <Table.HeadCell className="py-4 font-semibold text-gray-700">
                  Actions
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    backendURL={backendURL}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </Table.Body>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <PaginationButtons
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <HiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-500">
            {searchTerm || roleFilter
              ? "Try adjusting your search criteria or filters."
              : "You have no users yet!"}
          </p>
        </div>
      )}

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "rounded-lg",
        }}>
        <DialogTitle
          id="alert-dialog-title"
          className="text-gray-900 font-semibold">
          Delete User Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-gray-600">
            Are you sure you want to delete this user? This action cannot be
            undone and will permanently remove all user data.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4 space-x-2">
          <Button
            onClick={() => setDeleteOpen(false)}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
