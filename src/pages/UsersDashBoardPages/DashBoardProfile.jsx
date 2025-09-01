// // import React, { useState, useEffect, useRef } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import {
// //   fetchProfileById,
// //   updateProfile,
// //   deleteAccount,
// // } from "../../features/Users/userAction";
// // import { resetSuccess } from "../../features/Users/UserSlice";
// // import { Camera, X, Trash2, Check, Edit, Loader2 } from "lucide-react";

// // function DashBoardProfile() {
// //   const fileInputRef = useRef(null);
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //   });
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success",
// //   });
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

// //   const dispatch = useDispatch();
// //   const { userInfo } = useSelector((state) => state.auth);
// //   const { profile, loading, error } = useSelector((state) => state.profiles);
// //   const userId = userInfo?._id;

// //   const backendURL =
// //     import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// //   // Load profile data
// //   useEffect(() => {
// //     if (userId) {
// //       dispatch(fetchProfileById(userId));
// //     }
// //   }, [dispatch, userId]);

// //   // Update form data when profile changes
// //   useEffect(() => {
// //     if (profile) {
// //       setFormData({
// //         username: profile?.data?.username || "",
// //         email: profile?.data?.email || "",
// //         password: "",
// //       });
// //       if (profile?.data?.image) {
// //         setImagePreview(`${profile.data.image}`);
// //       }
// //     }
// //   }, [profile, backendURL]);

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setSelectedFile(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!userId) return;

// //     const updateData = new FormData();
// //     updateData.append("username", formData.username);
// //     updateData.append("email", formData.email);

// //     if (formData.password.trim()) {
// //       if (formData.password.length < 6) {
// //         setSnackbar({
// //           open: true,
// //           message: "Password must be at least 6 characters",
// //           severity: "error",
// //         });
// //         return;
// //       }
// //       updateData.append("password", formData.password);
// //     }

// //     if (selectedFile) {
// //       updateData.append("image", selectedFile);
// //     }

// //     try {
// //       await dispatch(updateProfile({ userId, formData: updateData })).unwrap();
// //       setSnackbar({
// //         open: true,
// //         message: "Profile updated successfully!",
// //         severity: "success",
// //       });
// //       setFormData((prev) => ({ ...prev, password: "" }));
// //       setIsEditing(false);
// //       dispatch(resetSuccess());
// //     } catch (error) {
// //       setSnackbar({
// //         open: true,
// //         message: error.message || "Failed to update profile",
// //         severity: "error",
// //       });
// //     }
// //   };

// //   const handleDeleteAccount = async () => {
// //     try {
// //       await dispatch(deleteAccount(userId)).unwrap();
// //       setSnackbar({
// //         open: true,
// //         message: "Account deleted successfully",
// //         severity: "success",
// //       });
// //       setDeleteDialogOpen(false);
// //     } catch (error) {
// //       setSnackbar({
// //         open: true,
// //         message: "Failed to delete account",
// //         severity: "error",
// //       });
// //     }
// //   };

// //   const handleSnackbarClose = () => {
// //     setSnackbar((prev) => ({ ...prev, open: false }));
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-[80vh]">
// //         <Loader2 className="h-16 w-16 animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto p-4 md:p-8">
// //       {/* Profile Header */}
// //       <div className="text-center mb-12">
// //         <h1 className="text-3xl font-bold mb-2">My Profile</h1>
// //         <p className="text-gray-600">Manage your account information</p>
// //       </div>

// //       {/* Profile Picture Section */}
// //       <div className="flex justify-center mb-12">
// //         <div className="relative">
// //           <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
// //             {imagePreview ? (
// //               <img
// //                 src={imagePreview}
// //                 alt="Profile"
// //                 className="w-full h-full object-cover"
// //               />
// //             ) : (
// //               <div className="w-full h-full bg-gray-200 flex items-center justify-center">
// //                 <span className="text-gray-500">No Image</span>
// //               </div>
// //             )}
// //           </div>

// //           <button
// //             type="button"
// //             className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
// //             onClick={() => fileInputRef.current.click()}>
// //             <Camera className="h-5 w-5" />
// //             <input
// //               hidden
// //               accept="image/*"
// //               type="file"
// //               onChange={handleFileChange}
// //               ref={fileInputRef}
// //             />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Profile Form */}
// //       <form
// //         onSubmit={handleSubmit}
// //         className="max-w-md mx-auto p-6 rounded-lg shadow-sm bg-white">
// //         <div className="mb-4">
// //           <label
// //             htmlFor="username"
// //             className="block text-sm font-medium text-gray-700 mb-1">
// //             Username
// //           </label>
// //           <div className="relative">
// //             <input
// //               id="username"
// //               name="username"
// //               type="text"
// //               value={formData.username}
// //               onChange={handleInputChange}
// //               required
// //               disabled={!isEditing}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
// //             />
// //             {!isEditing && (
// //               <button
// //                 type="button"
// //                 onClick={() => setIsEditing(true)}
// //                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600">
// //                 <Edit className="h-5 w-5" />
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         <div className="mb-4">
// //           <label
// //             htmlFor="email"
// //             className="block text-sm font-medium text-gray-700 mb-1">
// //             Email
// //           </label>
// //           <input
// //             id="email"
// //             name="email"
// //             type="email"
// //             value={formData.email}
// //             onChange={handleInputChange}
// //             required
// //             disabled={!isEditing}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
// //           />
// //         </div>

// //         {isEditing && (
// //           <div className="mb-6">
// //             <label
// //               htmlFor="password"
// //               className="block text-sm font-medium text-gray-700 mb-1">
// //               New Password
// //             </label>
// //             <input
// //               id="password"
// //               name="password"
// //               type="password"
// //               value={formData.password}
// //               onChange={handleInputChange}
// //               placeholder="Leave blank to keep current"
// //               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
// //             />
// //           </div>
// //         )}

// //         {isEditing ? (
// //           <div className="flex justify-end gap-3 mt-6">
// //             <button
// //               type="button"
// //               onClick={() => {
// //                 setIsEditing(false);
// //                 setFormData({
// //                   username: profile?.data?.username || "",
// //                   email: profile?.data?.email || "",
// //                   password: "",
// //                 });
// //                 setSelectedFile(null);
// //                 if (profile?.data?.image) {
// //                   setImagePreview(`${profile.data.image}`);
// //                 } else {
// //                   setImagePreview(null);
// //                 }
// //                 console.log(profile?.data?.image);
// //               }}
// //               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 flex items-center gap-1">
// //               {loading ? (
// //                 <Loader2 className="h-4 w-4 animate-spin" />
// //               ) : (
// //                 <Check className="h-4 w-4" />
// //               )}
// //               Save Changes
// //             </button>
// //           </div>
// //         ) : (
// //           <div className="flex justify-end mt-6">
// //             <button
// //               type="button"
// //               onClick={() => setIsEditing(true)}
// //               className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-1">
// //               <Edit className="h-4 w-4" />
// //               Edit Profile
// //             </button>
// //           </div>
// //         )}
// //       </form>

// //       {/* Delete Account Section */}
// //       <div className="text-center mt-12">
// //         <button
// //           type="button"
// //           onClick={() => setDeleteDialogOpen(true)}
// //           className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 text-sm font-medium">
// //           <Trash2 className="h-4 w-4" />
// //           Delete My Account
// //         </button>
// //       </div>

// //       {/* Delete Confirmation Dialog */}
// //       {deleteDialogOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
// //             <div className="flex justify-between items-start mb-4">
// //               <h3 className="text-lg font-medium">Delete Account</h3>
// //               <button
// //                 onClick={() => setDeleteDialogOpen(false)}
// //                 className="text-gray-500 hover:text-gray-700">
// //                 <X className="h-5 w-5" />
// //               </button>
// //             </div>
// //             <p className="text-gray-600 mb-6">
// //               Are you sure you want to delete your account? This action cannot
// //               be undone and all your data will be permanently removed.
// //             </p>
// //             <div className="flex justify-end gap-3">
// //               <button
// //                 onClick={() => setDeleteDialogOpen(false)}
// //                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleDeleteAccount}
// //                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 flex items-center gap-1">
// //                 <Trash2 className="h-4 w-4" />
// //                 Delete Account
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Snackbar for notifications */}
// //       {snackbar.open && (
// //         <div
// //           className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${
// //             snackbar.severity === "error"
// //               ? "bg-red-100 border-red-400 text-red-700"
// //               : "bg-green-100 border-green-400 text-green-700"
// //           } px-4 py-3 rounded border max-w-xs w-full shadow-lg`}>
// //           <div className="flex justify-between items-start">
// //             <p className="text-sm">{snackbar.message}</p>
// //             <button onClick={handleSnackbarClose} className="ml-4">
// //               <X className="h-4 w-4" />
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default DashBoardProfile;
// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchProfileById,
//   updateProfile,
//   deleteAccount,
// } from "../../features/Users/userAction";
// import { resetSuccess } from "../../features/Users/UserSlice";
// import { TextInput, Button, Label, Textarea } from "flowbite-react";
// import { Camera, X, Trash2, Check, Edit, Loader2 } from "lucide-react";
// import {
//   Snackbar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// function DashBoardProfile() {
//   const fileInputRef = useRef(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     fullName: "",
//     bio: "",
//     agentId: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { profile, loading, error } = useSelector((state) => state.profiles);
//   const userId = userInfo?._id;

//   const backendURL =
//     import.meta.env.MODE === "production"
//       ? import.meta.env.VITE_BACKEND_URL
//       : "http://localhost:3001";

//   // Load profile data
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchProfileById(userId));
//     }
//   }, [dispatch, userId]);

//   // Update form data when profile changes
//   useEffect(() => {
//     if (profile?.data) {
//       setFormData({
//         username: profile.data.username || "",
//         email: profile.data.email || "",
//         password: "",
//         fullName: profile.data.fullName || "",
//         bio: profile.data.bio || "",
//         agentId: profile.data.agentId || "",
//       });
//       if (profile.data.image) {
//         setImagePreview(`${profile.data.image}`);
//       }
//     }
//   }, [profile]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId) return;

//     const updateData = new FormData();
//     updateData.append("username", formData.username);
//     updateData.append("email", formData.email);
//     updateData.append("fullName", formData.fullName);
//     updateData.append("bio", formData.bio);

//     if (formData.password.trim()) {
//       updateData.append("password", formData.password);
//     }

//     if (formData.agentId && profile?.data?.role === "agent") {
//       updateData.append("agentId", formData.agentId);
//     }

//     if (selectedFile) {
//       updateData.append("image", selectedFile);
//     }

//     try {
//       await dispatch(updateProfile({ userId, formData: updateData })).unwrap();
//       setSnackbar({
//         open: true,
//         message: "Profile updated successfully!",
//         severity: "success",
//       });
//       setFormData((prev) => ({ ...prev, password: "" }));
//       setIsEditing(false);
//       setSelectedFile(null);
//       dispatch(resetSuccess());
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || "Failed to update profile",
//         severity: "error",
//       });
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       await dispatch(deleteAccount(userId)).unwrap();
//       setSnackbar({
//         open: true,
//         message: "Account deleted successfully",
//         severity: "success",
//       });
//       setDeleteDialogOpen(false);
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || "Failed to delete account",
//         severity: "error",
//       });
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[80vh]">
//         <Loader2 className="h-16 w-16 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
//       {/* Profile Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
//         <p className="text-gray-600 mt-2">
//           Manage your account details and settings
//         </p>
//       </div>

//       {/* Profile Picture Section */}
//       <div className="flex justify-center mb-12">
//         <div className="relative group">
//           <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden transition-transform group-hover:scale-105">
//             {imagePreview ? (
//               <img
//                 src={imagePreview}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                 <span className="text-gray-500 text-sm">No Image</span>
//               </div>
//             )}
//           </div>
//           <button
//             type="button"
//             className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors opacity-0 group-hover:opacity-100"
//             onClick={() => fileInputRef.current.click()}
//             disabled={!isEditing}>
//             <Camera className="h-5 w-5" />
//             <input
//               hidden
//               accept="image/*"
//               type="file"
//               onChange={handleFileChange}
//               ref={fileInputRef}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Profile Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto p-6 rounded-lg shadow-sm bg-white border border-gray-200">
//         <div className="mb-6">
//           <Label
//             htmlFor="username"
//             value="Username"
//             className="text-sm font-medium text-gray-700 mb-1"
//           />
//           <TextInput
//             id="username"
//             name="username"
//             type="text"
//             value={formData.username}
//             onChange={handleInputChange}
//             required
//             disabled={!isEditing}
//             className="w-full"
//             addon={
//               isEditing ? null : <Edit className="h-5 w-5 text-gray-500" />
//             }
//             onClickAddon={() => setIsEditing(true)}
//           />
//         </div>

//         <div className="mb-6">
//           <Label
//             htmlFor="email"
//             value="Email"
//             className="text-sm font-medium text-gray-700 mb-1"
//           />
//           <TextInput
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             disabled={!isEditing}
//             className="w-full"
//           />
//         </div>

//         <div className="mb-6">
//           <Label
//             htmlFor="fullName"
//             value="Full Name"
//             className="text-sm font-medium text-gray-700 mb-1"
//           />
//           <TextInput
//             id="fullName"
//             name="fullName"
//             type="text"
//             value={formData.fullName}
//             onChange={handleInputChange}
//             disabled={!isEditing}
//             className="w-full"
//           />
//         </div>

//         <div className="mb-6">
//           <Label
//             htmlFor="bio"
//             value="Bio"
//             className="text-sm font-medium text-gray-700 mb-1"
//           />
//           <Textarea
//             id="bio"
//             name="bio"
//             value={formData.bio}
//             onChange={handleInputChange}
//             disabled={!isEditing}
//             rows={4}
//             className="w-full"
//             placeholder="Tell us about yourself..."
//           />
//         </div>

//         {profile?.data?.role === "agent" && (
//           <div className="mb-6">
//             <Label
//               htmlFor="agentId"
//               value="Agent ID"
//               className="text-sm font-medium text-gray-700 mb-1"
//             />
//             <TextInput
//               id="agentId"
//               name="agentId"
//               type="text"
//               value={formData.agentId}
//               onChange={handleInputChange}
//               disabled={!isEditing}
//               placeholder="Enter your custom Agent ID"
//               className="w-full"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Agent ID must be 5-15 alphanumeric characters
//             </p>
//           </div>
//         )}

//         {isEditing && (
//           <div className="mb-6">
//             <Label
//               htmlFor="password"
//               value="New Password"
//               className="text-sm font-medium text-gray-700 mb-1"
//             />
//             <TextInput
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="Leave blank to keep current"
//               className="w-full"
//             />
//           </div>
//         )}

//         {isEditing ? (
//           <div className="flex justify-end gap-3 mt-6">
//             <Button
//               type="button"
//               onClick={() => {
//                 setIsEditing(false);
//                 setFormData({
//                   username: profile?.data?.username || "",
//                   email: profile?.data?.email || "",
//                   password: "",
//                   fullName: profile?.data?.fullName || "",
//                   bio: profile?.data?.bio || "",
//                   agentId: profile?.data?.agentId || "",
//                 });
//                 setSelectedFile(null);
//                 setImagePreview(profile?.data?.image || null);
//               }}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800">
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={loading}
//               className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1">
//               {loading ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Check className="h-4 w-4" />
//               )}
//               Save Changes
//             </Button>
//           </div>
//         ) : (
//           <div className="flex justify-end mt-6">
//             <Button
//               type="button"
//               onClick={() => setIsEditing(true)}
//               className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1">
//               <Edit className="h-4 w-4" />
//               Edit Profile
//             </Button>
//           </div>
//         )}
//       </form>

//       {/* Delete Account Section */}
//       <div className="text-center mt-12">
//         <Button
//           color="failure"
//           onClick={() => setDeleteDialogOpen(true)}
//           className="inline-flex items-center gap-1">
//           <Trash2 className="h-4 w-4" />
//           Delete My Account
//         </Button>
//       </div>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         aria-labelledby="delete-dialog-title">
//         <DialogTitle id="delete-dialog-title">Delete Account</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete your account? This action cannot be
//             undone, and all your data will be permanently removed.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setDeleteDialogOpen(false)}
//             className="text-gray-500">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteAccount}
//             color="failure"
//             className="flex items-center gap-1">
//             <Trash2 className="h-4 w-4" />
//             Delete Account
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// export default DashBoardProfile;

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileById,
  updateProfile,
  deleteAccount,
} from "../../features/Users/userAction";
import { resetSuccess } from "../../features/Users/UserSlice";
import { TextInput, Button, Label, Textarea } from "flowbite-react";
import {
  Camera,
  X,
  Trash2,
  Check,
  Edit,
  Loader2,
  User,
  Mail,
  FileText,
  Badge,
  Shield,
  Settings,
  Share2,
  Copy,
  Phone,
} from "lucide-react";

function DashBoardProfile() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    bio: "",
    agentId: "",
    phoneNumber: "", // Changed to lowercase
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const frontendURL =
    import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.profiles);
  const userId = userInfo?._id;
  const role = userInfo?.role;

  const backendURL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:3001";

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile?.data) {
      console.log("Profile data:", profile.data);
      if (!profile.data.phoneNumber) {
        console.warn("Warning: phoneNumber missing in profile data");
      }
      setFormData({
        username: profile.data.username || "",
        email: profile.data.email || "",
        password: "",
        fullName: profile.data.fullName || "",
        bio: profile.data.bio || "",
        agentId: profile.data.agentId || "",
        phoneNumber: profile.data.phoneNumber || "", // Changed to lowercase
      });
      if (profile.data.image) {
        setImagePreview(`${profile.data.image}`);
      }
    }
  }, [profile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      if (!/^[+\d\s-]*$/.test(value)) {
        setSnackbar({
          open: true,
          message: "Phone number can only contain digits, +, -, and spaces",
          severity: "error",
        });
        return;
      }
    }
    console.log(`Input changed: ${name} = ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    const updateData = new FormData();
    updateData.append("username", formData.username);
    updateData.append("email", formData.email);
    updateData.append("fullName", formData.fullName);
    updateData.append("bio", formData.bio);
    updateData.append("phoneNumber", formData.phoneNumber); // Changed to lowercase
    if (formData.password.trim()) {
      updateData.append("password", formData.password);
    }
    if (formData.agentId && profile?.data?.role === "agent") {
      updateData.append("agentId", formData.agentId);
    }
    if (selectedFile) {
      updateData.append("image", selectedFile);
    }

    for (let [key, value] of updateData.entries()) {
      console.log(`FormData: ${key} = ${value}`);
    }

    try {
      await dispatch(updateProfile({ userId, formData: updateData })).unwrap();
      dispatch(fetchProfileById(userId));
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      setFormData((prev) => ({ ...prev, password: "" }));
      setIsEditing(false);
      setSelectedFile(null);
      dispatch(resetSuccess());
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount(userId)).unwrap();
      setSnackbar({
        open: true,
        message: "Account deleted successfully",
        severity: "success",
      });
      setDeleteDialogOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to delete account",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbar({
        open: true,
        message: `${type} copied to clipboard!`,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to copy ${type}`,
        severity: "error",
      });
    }
  };

  const handleShare = async () => {
    if (!formData.agentId) return;

    const shareData = {
      title: `Join ${formData.fullName || formData.username}'s Network`,
      text: `Use my agent code: ${formData.agentId}`,
      url: `${frontendURL}/register?agentcode=${formData.agentId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      copyToClipboard(shareData.url, "Share link");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                          <User className="h-8 w-8 text-gray-500 rounded-full" />
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <button
                        type="button"
                        className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                        onClick={() => fileInputRef.current.click()}>
                        <Camera className="h-4 w-4" />
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </button>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 first-letter:uppercase">
                    {formData.fullName || formData.username}
                  </h2>
                  <p className="text-indigo-700 text-sm">
                    @{formData.username}
                  </p>
                  {profile?.data?.role && (
                    <div className="mt-2 px-3 py-1 bg-gray-600 text-blue-500 bg-opacity-20 rounded-full">
                      <span className="text-sm font-medium capitalize">
                        {profile.data.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-indigo-500" />
                    <span className="text-sm">{formData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-indigo-500" />
                    <span className="text-sm">
                      {formData.phoneNumber || "No Phone Number"}
                    </span>
                  </div>
                  {formData.agentId && (
                    <div className="flex items-center text-gray-600">
                      <Badge className="h-5 w-5 mr-3 text-indigo-500" />
                      <span className="text-sm">
                        Agent ID: {formData.agentId}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Shield className="h-5 w-5 mr-3 text-green-500" />
                    <span className="text-sm">Account Verified</span>
                  </div>
                </div>

                {formData.bio && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 mr-3 text-indigo-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </p>
                        <p className="text-sm text-gray-600">{formData.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            username: profile?.data?.username || "",
                            email: profile?.data?.email || "",
                            password: "",
                            fullName: profile?.data?.fullName || "",
                            bio: profile?.data?.bio || "",
                            agentId: profile?.data?.agentId || "",
                            phoneNumber: profile?.data?.phoneNumber || "", // Changed to lowercase
                          });
                          setSelectedFile(null);
                          setImagePreview(profile?.data?.image || null);
                        }}
                        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800">
                        Cancel Changes
                      </Button>
                    </div>
                  )}

                  <Button
                    color="failure"
                    onClick={() => setDeleteDialogOpen(true)}
                    className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Profile Information
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Update your personal details and preferences
                    </p>
                  </div>
                  <Settings className="h-6 w-6 text-gray-400" />
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="username"
                      value="Username"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    />
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <TextInput
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                        className="pl-10 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      value="Email Address"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    />
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                        className="pl-10 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="phoneNumber" // Changed to lowercase
                      value="Phone Number"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    />
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <TextInput
                        id="phoneNumber" // Changed to lowercase
                        name="phoneNumber" // Changed to lowercase
                        type="text"
                        value={formData.phoneNumber} // Changed to lowercase
                        onChange={handleInputChange}
                        required
                        disabled={!isEditing}
                        placeholder="e.g., +234123456789"
                        className="pl-10 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="fullName"
                      value="Full Name"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    />
                    <TextInput
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      className="text-sm sm:text-base"
                    />
                  </div>

                  {profile?.data?.role === "agent" && (
                    <div>
                      <Label
                        htmlFor="agentId"
                        value="Agent ID"
                        className="text-sm font-medium text-gray-700 mb-2 block"
                      />
                      <div className="relative">
                        <Badge className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <TextInput
                          id="agentId"
                          name="agentId"
                          type="text"
                          value={formData.agentId}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Enter your Agent ID"
                          className="pl-10 text-sm sm:text-base"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Agent ID must be 5-15 alphanumeric characters
                      </p>
                    </div>
                  )}

                  {isEditing && (
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="password"
                        value="New Password"
                        className="text-sm font-medium text-gray-700 mb-2 block"
                      />
                      <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Leave blank to keep current password"
                        className="text-sm sm:text-base"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Label
                    htmlFor="bio"
                    value="Bio"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  />
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="resize-none text-sm sm:text-base"
                  />
                </div>

                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center">
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {role === "agent" && (
            <div className="mt-6 pt-6 border-t bg-white p-5 border-gray-200">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Share2 className="h-5 w-5 mr-2 text-indigo-500" />
                  <h4 className="text-sm font-medium text-gray-700">
                    Agent Referral
                  </h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Agent Code
                    </label>
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                      <code className="text-sm text-gray-800 flex-1 font-mono">
                        {formData.agentId}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(formData.agentId, "Agent code")
                        }
                        className="ml-2 p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Registration URL
                    </label>
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                      <div className="flex-1">
                        <code className="text-xs text-gray-800 font-mono block break-all">
                          {frontendURL}/signup?agentcode={formData.agentId}
                        </code>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${frontendURL}/signup?agentcode=${formData.agentId}`,
                            "Registration URL"
                          )
                        }
                        className="ml-2 p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2.5 px-3 rounded-lg transition-colors text-sm font-medium">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Agent Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center text-red-600">
                <Trash2 className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold">Delete Account</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Are you sure you want to delete your account? This action cannot
                be undone, and all your data will be permanently removed from
                our servers.
              </p>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {snackbar.open && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
          <div
            className={`rounded-lg shadow-lg border-l-4 p-4 ${
              snackbar.severity === "error"
                ? "bg-red-50 border-red-400 text-red-700"
                : "bg-green-50 border-green-400 text-green-700"
            }`}>
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium">{snackbar.message}</p>
              <button
                onClick={handleSnackbarClose}
                className="ml-4 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoardProfile;
