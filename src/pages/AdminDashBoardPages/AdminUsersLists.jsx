// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Table, TextInput, Select } from "flowbite-react";
// import { useSelector } from "react-redux";
// import { HiOutlineUserCircle, HiOutlineSearch, HiUsers } from "react-icons/hi";
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
//   Tooltip,
// } from "@mui/material";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import MuiAlert from "@mui/material/Alert";
// import moment from "moment";
// import Spinner from "../../components/tools/Spinner";

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

// const ReferralsModal = React.memo(
//   ({ open, onClose, referrals, username, user }) => {
//     console.log(user?.agentId);
//     return (
//       <Dialog
//         open={open}
//         onClose={onClose}
//         aria-labelledby="referrals-modal-title"
//         aria-describedby="referrals-modal-description"
//         PaperProps={{
//           className: "rounded-lg max-w-md w-full",
//         }}>
//         <DialogTitle
//           id="referrals-modal-title"
//           className="bg-blue-50 text-gray-900 font-semibold flex justify-between items-center border-b border-blue-200">
//           <div className="text-gray-800">
//             <h2 className="text-lg font-semibold">
//               Referrals by <span className="text-blue-600">{username}</span>
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Agent Code:{" "}
//               <span className="font-medium text-green-600">
//                 {user?.agentId}
//               </span>
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-1 rounded-full hover:bg-blue-100 transition-colors"
//             aria-label="Close referrals modal">
//             <IoClose className="w-5 h-5 text-btColour" />
//           </button>
//         </DialogTitle>
//         <DialogContent className="p-0 max-h-96 overflow-y-auto">
//           {referrals.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               <HiUsers className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//               <p>No referrals found</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-blue-100">
//               {referrals.map((referral, index) => (
//                 <div
//                   key={referral._id}
//                   className="px-4 py-3 hover:bg-blue-50 transition-colors">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-8 h-8 bg-gradient-to-br from-btColour to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                         {(referral.username || referral.email)
//                           .charAt(0)
//                           .toUpperCase()}
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900 text-sm">
//                           {referral.username || "No Username"}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate max-w-[250px]">
//                           {referral.email}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-xs text-gray-400 bg-blue-100 px-2 py-1 rounded">
//                       #{index + 1}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     );
//   }
// );

// const UserTableRow = React.memo(({ user, backendURL, onDeleteClick }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

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
//     <>
//       <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 transition-colors">
//         <Table.Cell className="py-4">
//           <div className="text-sm font-medium text-gray-900">
//             {moment(user.updatedAt).format("MMM D, YYYY")}
//           </div>
//           <div className="text-xs text-gray-500">
//             {moment(user.updatedAt).format("h:mm A")}
//           </div>
//         </Table.Cell>

//         <Table.Cell className="py-4">
//           <div className="flex items-center">
//             {user.image ? (
//               <img
//                 src={`${user.image}`}
//                 alt={user.username}
//                 className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/fallback-image.png";
//                 }}
//               />
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
//                 <HiOutlineUserCircle className="w-6 h-6 text-gray-500" />
//               </div>
//             )}
//           </div>
//         </Table.Cell>

//         <Table.Cell className="py-4">
//           <div className="font-semibold text-gray-900">{user.username}</div>
//         </Table.Cell>

//         <Table.Cell className="py-4">
//           <div
//             className="text-gray-700 truncate max-w-[200px]"
//             title={user.email}>
//             {user.email}
//           </div>
//         </Table.Cell>
//         <Table.Cell className="py-4">
//           <div
//             className="text-gray-700 truncate max-w-[200px]"
//             title={user.phoneNumber}>
//             {user.phoneNumber}
//           </div>
//         </Table.Cell>
//         <Table.Cell className="py-4">
//           <div
//             className="text-gray-700 truncate max-w-[200px]"
//             title={user.agentId}>
//             {user.agentId}
//           </div>
//         </Table.Cell>

//         <Table.Cell className="py-4">
//           <div className="flex items-center space-x-2">
//             <span
//               className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleStyle(
//                 user.role
//               )}`}>
//               {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//             </span>
//             {getRoleIcon(user.role)}
//           </div>
//         </Table.Cell>

//         <Table.Cell className="py-4">
//           {user.role === "agent" ? (
//             <div className="flex items-center space-x-2">
//               <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold min-w-[40px] text-center">
//                 {user.referrals.length}
//               </div>
//               {user.referrals.length > 0 && (
//                 <Tooltip
//                   title={`${user.referrals.length} referral${
//                     user.referrals.length > 1 ? "s" : ""
//                   }`}>
//                   <HiUsers className="w-4 h-4 text-btColour" />
//                 </Tooltip>
//               )}
//             </div>
//           ) : (
//             <span className="text-gray-400 text-sm">N/A</span>
//           )}
//         </Table.Cell>

//         <Table.Cell className="py-4 min-w-[250px]">
//           {user.role === "agent" ? (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="inline-flex items-center px-3 py-2 text-sm font-medium text-btColour bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-btColour focus:ring-opacity-50"
//               aria-label={`View referrals for ${user.username}`}>
//               <HiUsers className="w-4 h-4 mr-2 text-btColour" />
//               View {user.referrals.length} referral
//               {user.referrals.length > 1 ? "s" : ""}
//             </button>
//           ) : (
//             <span className="text-gray-400 text-sm">-</span>
//           )}
//         </Table.Cell>

//         <Table.Cell className="py-4">
//           <button
//             onClick={() => onDeleteClick(user._id)}
//             className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
//             <AiTwotoneDelete className="w-4 h-4 mr-1" />
//             Delete
//           </button>
//         </Table.Cell>
//       </Table.Row>

//       {user.role === "agent" && (
//         <ReferralsModal
//           open={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           referrals={user.referrals}
//           username={user.username}
//           user={user}
//         />
//       )}
//     </>
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
//           console.log(data?.data?.users);
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
//     return (
//       <>
//         <Spinner />
//       </>
//     );
//   }

//   return (
//     <div className="mx-auto p-0 mt-5 mid:mt-20">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-blue-400 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">{totalUsers}</div>
//           <div className="text-sm opacity-90">Total Users</div>
//         </div>
//         <div className="bg-green/90 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">
//             {users.filter((user) => user.role === "admin").length}
//           </div>
//           <div className="text-sm opacity-90">Admins</div>
//         </div>
//         <div className="bg-purple/80 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">
//             {users.filter((user) => user.role === "agent").length}
//           </div>
//           <div className="text-sm opacity-90">Agents</div>
//         </div>
//         <div className="bg-orange-600/80 text-white p-4 rounded-lg">
//           <div className="text-2xl font-bold">{getTotalReferrals}</div>
//           <div className="text-sm opacity-90">Total Referrals</div>
//         </div>
//       </div>

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
//                   Image
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Username
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Email
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Phone Number
//                 </Table.HeadCell>
//                 <Table.HeadCell className="py-4 font-semibold text-gray-700">
//                   Agent ID/Code
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
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  ClickAwayListener,
} from "@mui/material";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle, HiOutlineSearch, HiUsers } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
import Spinner from "../../components/tools/Spinner";

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
              ? "text-[#3B4A54] cursor-not-allowed bg-[#F7F8FA]"
              : "text-[#1A3C34] hover:text-white hover:bg-[#1A3C34] border border-[#1A3C34]"
          }`}>
          Previous
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-lg text-[#1A3C34] hover:text-white hover:bg-[#1A3C34] transition-colors">
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="px-2 text-[#3B4A54]">...</span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
              currentPage === number
                ? "bg-[#1A3C34] text-white shadow-md"
                : "text-[#1A3C34] hover:text-white hover:bg-[#1A3C34] border border-[#D8E0E8]"
            }`}>
            {number}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-[#3B4A54]">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-lg text-[#1A3C34] hover:text-white hover:bg-[#1A3C34] transition-colors">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === totalPages
              ? "text-[#3B4A54] cursor-not-allowed bg-[#F7F8FA]"
              : "text-[#1A3C34] hover:text-white hover:bg-[#1A3C34] border border-[#1A3C34]"
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
          className="bg-[#F7F8FA] text-[#110b79] font-semibold flex justify-between items-center border-b border-[#D8E0E8]">
          <div className="text-[#3B4A54]">
            <h2 className="text-lg font-semibold">
              Referrals by <span className="text-[#1A3C34]">{username}</span>
            </h2>
            <p className="text-sm text-[#3B4A54] mt-1">
              Agent Code:{" "}
              <span className="font-medium text-[#1A3C34]">
                {user?.agentId}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#D8E0E8] transition-colors"
            aria-label="Close referrals modal">
            <IoClose className="w-5 h-5 text-[#1A3C34]" />
          </button>
        </DialogTitle>
        <DialogContent className="p-0 max-h-96 overflow-y-auto">
          {referrals.length === 0 ? (
            <div className="p-4 text-center text-[#3B4A54]">
              <HiUsers className="w-8 h-8 mx-auto mb-2 text-[#D8E0E8]" />
              <p>No referrals found</p>
            </div>
          ) : (
            <div className="divide-y divide-[#D8E0E8]">
              {referrals.map((referral, index) => (
                <div
                  key={referral._id}
                  className="px-4 py-3 hover:bg-[#F7F8FA] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1A3C34] to-[#110b79] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {(referral.username || referral.email)
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-[#110b79] text-sm">
                          {referral.username || "No Username"}
                        </p>
                        <p className="text-xs text-[#3B4A54] truncate max-w-[250px]">
                          {referral.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-[#3B4A54] bg-[#D8E0E8] px-2 py-1 rounded">
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
        return "bg-[#D8E0E8] text-[#3C6E5D] border-[#D8E0E8]";
      case "agent":
        return "bg-[#D8E0E8] text-[#1A3C34] border-[#D8E0E8]";
      default:
        return "bg-[#D8E0E8] text-[#3B4A54] border-[#D8E0E8]";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaCheck className="w-3 h-3 text-[#3C6E5D]" />;
      case "agent":
        return <FaCheck className="w-3 h-3 text-[#1A3C34]" />;
      default:
        return <FaTimes className="w-3 h-3 text-[#3B4A54]" />;
    }
  };

  return (
    <>
      <TableRow className="bg-white hover:bg-[#F7F8FA] transition-colors">
        <TableCell className="py-4">
          <div className="text-sm font-medium text-[#110b79]">
            {moment(user.updatedAt).format("MMM D, YYYY")}
          </div>
          <div className="text-xs text-[#3B4A54]">
            {moment(user.updatedAt).format("h:mm A")}
          </div>
        </TableCell>

        <TableCell className="py-4">
          <div className="flex items-center">
            {user.image ? (
              <img
                src={`${user.image}`}
                alt={user.username}
                className="w-10 h-10 rounded-full border-2 border-[#D8E0E8] object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.png";
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#D8E0E8] flex items-center justify-center">
                <HiOutlineUserCircle className="w-6 h-6 text-[#3B4A54]" />
              </div>
            )}
          </div>
        </TableCell>

        <TableCell className="py-4">
          <div className="font-semibold text-[#110b79]">{user.username}</div>
        </TableCell>

        <TableCell className="py-4">
          <div
            className="text-[#3B4A54] truncate max-w-[200px]"
            title={user.email}>
            {user.email}
          </div>
        </TableCell>
        <TableCell className="py-4">
          <div
            className="text-[#3B4A54] truncate max-w-[200px]"
            title={user.phoneNumber}>
            {user.phoneNumber}
          </div>
        </TableCell>
        <TableCell className="py-4">
          <div
            className="text-[#3B4A54] truncate max-w-[200px]"
            title={user.agentId}>
            {user.agentId}
          </div>
        </TableCell>

        <TableCell className="py-4">
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleStyle(
                user.role
              )}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
            {getRoleIcon(user.role)}
          </div>
        </TableCell>

        <TableCell className="py-4">
          {user.role === "agent" ? (
            <div className="flex items-center space-x-2">
              <div className="bg-[#D8E0E8] text-[#1A3C34] px-3 py-1 rounded-full text-sm font-semibold min-w-[40px] text-center">
                {user.referrals.length}
              </div>
              {user.referrals.length > 0 && (
                <Tooltip
                  title={`${user.referrals.length} referral${
                    user.referrals.length > 1 ? "s" : ""
                  }`}>
                  <HiUsers className="w-4 h-4 text-[#1A3C34]" />
                </Tooltip>
              )}
            </div>
          ) : (
            <span className="text-[#3B4A54] text-sm">N/A</span>
          )}
        </TableCell>

        <TableCell className="py-4 min-w-[250px]">
          {user.role === "agent" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-[#1A3C34] bg-[#F7F8FA] border border-[#D8E0E8] rounded-lg hover:bg-[#D8E0E8] hover:text-[#110b79] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A3C34] focus:ring-opacity-50"
              aria-label={`View referrals for ${user.username}`}>
              <HiUsers className="w-4 h-4 mr-2 text-[#1A3C34]" />
              View {user.referrals.length} referral
              {user.referrals.length > 1 ? "s" : ""}
            </button>
          ) : (
            <span className="text-[#3B4A54] text-sm">-</span>
          )}
        </TableCell>

        <TableCell className="py-4">
          <button
            onClick={() => onDeleteClick(user._id)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-[#EF4444] bg-[#F7F8FA] border border-[#D8E0E8] rounded-lg hover:bg-[#EF4444] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-opacity-50">
            <AiTwotoneDelete className="w-4 h-4 mr-1" />
            Delete
          </button>
        </TableCell>
      </TableRow>

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
    console.log("Selected role:", e.target.value); // Debug log
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleClickAway = useCallback(() => {
    if (roleFilter !== "") {
      // setRoleFilter(""); // Reset filter when clicking outside
      setCurrentPage(1);
    }
  }, [roleFilter]);

  const getTotalReferrals = useMemo(() => {
    return users
      .filter((user) => user.role === "agent")
      .reduce((total, user) => total + user.referrals.length, 0);
  }, [users]);

  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <CircularProgress size={40} sx={{ color: "#1A3C34" }} />
      </div>
    ),
    []
  );

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="mx-auto p-0 mt-5 mid:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A3C34] text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">{totalUsers}</div>
          <div className="text-sm opacity-90">Total Users</div>
        </div>
        <div className="bg-[#3C6E5D] text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">
            {users.filter((user) => user.role === "admin").length}
          </div>
          <div className="text-sm opacity-90">Admins</div>
        </div>
        <div className="bg-[#110b79] text-white p-4 rounded-lg">
          <div className="text-2xl font-bold">
            {users.filter((user) => user.role === "agent").length}
          </div>
          <div className="text-sm opacity-90">Agents</div>
        </div>
        <div className="bg-[#e4ff04] text-[#110b79] p-4 rounded-lg">
          <div className="text-2xl font-bold">{getTotalReferrals}</div>
          <div className="text-sm opacity-90">Total Referrals</div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-[#D8E0E8]">
        <TextField
          id="search"
          type="text"
          InputProps={{
            startAdornment: <HiOutlineSearch className="mr-2 text-[#1A3C34]" />,
          }}
          placeholder="Search users by username..."
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: { sm: "xs" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#080759" },
              "&:hover fieldset": { borderColor: "#080759" },
              "&.Mui-focused fieldset": { borderColor: "#080759" },
            },
          }}
          aria-label="Search users by username"
        />
        <ClickAwayListener onClickAway={handleClickAway}>
          <Select
            id="roleFilter"
            value={roleFilter}
            onChange={handleRoleFilterChange}
            variant="outlined"
            fullWidth
            displayEmpty
            renderValue={(selected) => {
              if (selected === "") {
                return <span className="text-gray-800">All Roles</span>;
              }
              return selected.charAt(0).toUpperCase() + selected.slice(1);
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            sx={{
              maxWidth: { sm: 192 },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#080759" },
                "&:hover fieldset": { borderColor: "#080759" },
                "&.Mui-focused fieldset": { borderColor: "#080759" },
              },
            }}
            aria-label="Filter users by role">
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="agent">Agent</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </ClickAwayListener>
        <Button
          onClick={() => {
            setSearchTerm("");
            setRoleFilter("");
            setCurrentPage(1);
          }}
          variant="contained"
          sx={{
            width: { xs: "100%", sm: "auto" },
            backgroundColor: "#3B4A54",
            "&:hover": { backgroundColor: "#110b79" },
          }}>
          Clear Filters
        </Button>
      </div>

      {userInfo && users.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            className="shadow-lg rounded-lg overflow-hidden border border-[#D8E0E8]">
            <Table hoverable className="min-w-full">
              <TableHead className="bg-[#F7F8FA]">
                <TableRow>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Date Created
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Image
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Username
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Email
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Phone Number
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Agent ID/Code
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Role
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Referral Count
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Referrals
                  </TableCell>
                  <TableCell className="py-4 font-semibold text-[#110b79]">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y divide-[#D8E0E8]">
                {filteredUsers.map((user) => (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    backendURL={backendURL}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </TableBody>
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
          <HiUsers className="w-16 h-16 text-[#D8E0E8] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#110b79] mb-2">
            No users found
          </h3>
          <p className="text-[#3B4A54]">
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
          className="text-[#110b79] font-semibold">
          Delete User Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-[#3B4A54]">
            Are you sure you want to delete this user? This action cannot be
            undone and will permanently remove all user data.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4 space-x-2">
          <Button
            onClick={() => setDeleteOpen(false)}
            variant="outlined"
            sx={{
              color: "#3B4A54",
              borderColor: "#D8E0E8",
              "&:hover": { borderColor: "#1A3C34", backgroundColor: "#F7F8FA" },
            }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            variant="contained"
            color="error"
            sx={{ "&.Mui-disabled": { opacity: 0.5 } }}>
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
