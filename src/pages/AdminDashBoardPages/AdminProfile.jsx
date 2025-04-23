// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchProfileById,
//   updateProfile,
//   deleteAccount,
// } from "../../features/Users/userAction";
// import {
//   Box,
//   Modal,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";

// import { BsPersonBoundingBox } from "react-icons/bs";
// import { MdOutlineAddAPhoto } from "react-icons/md";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import Spinner from "../../components/tools/Spinner";
// import { resetSuccess } from "../../features/Users/UserSlice";

// function AdminProfile() {
//   const fileInputRef = useRef(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [Deleteopen, setDeleteOpen] = useState(false);

//   const dispatch = useDispatch();

//   // Memoized selectors
//   const { userInfo } = useSelector((state) => state.auth);
//   const { profile, loading, success, error } = useSelector(
//     (state) => state.profiles
//   );
//   const userId = userInfo?._id;
//   console.log(profile, "profile");

//   // Memoize backend URL calculation
//   const backendURL = useMemo(
//     () =>
//       import.meta.env.MODE === "production"
//         ? import.meta.env.VITE_BACKEND_URL
//         : "http://localhost:3001",
//     []
//   );

//   // Memoized handlers
//   const handleSnackbarClose = useCallback(() => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   }, []);

//   const DeleteOpen = useCallback(() => {
//     setDeleteOpen(true);
//   }, []);

//   const DeleteClose = useCallback(() => {
//     setDeleteOpen(false);
//   }, []);

//   const handleFileChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   }, []);

//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }, []);

//   // Load profile data
//   useEffect(() => {
//     let isSubscribed = true;

//     const loadProfile = async () => {
//       if (userId && isSubscribed) {
//         try {
//           await dispatch(fetchProfileById(userId));
//         } catch (error) {
//           setSnackbar({
//             open: true,
//             message: "Failed to load profile",
//             severity: "error",
//           });
//         }
//       }
//     };

//     loadProfile();

//     return () => {
//       isSubscribed = false;
//     };
//   }, [dispatch, userId]);

//   // Update form data when profile changes
//   useEffect(() => {
//     if (profile) {
//       setFormData((prev) => ({
//         ...prev,
//         username: profile?.data?.username || "",
//         email: profile?.data?.email || "",
//         password: "", // Do not prefill password
//       }));

//       if (profile?.data?.image) {
//         setImagePreview(`${profile?.data?.image}`);
//       }
//     }
//   }, [profile, backendURL]);

//   // Memoize submit handler
//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();

//       if (!userId) return;

//       const updateData = new FormData();
//       updateData.append("username", formData.username);
//       updateData.append("email", formData.email);

//       if (formData.password.trim()) {
//         if (formData.password.length < 6) {
//           setSnackbar({
//             open: true,
//             message: "Password must be at least 6 characters long",
//             severity: "error",
//           });
//           return;
//         }
//         updateData.append("password", formData.password);
//       }

//       if (selectedFile) {
//         updateData.append("image", selectedFile);
//       }

//       try {
//         await dispatch(
//           updateProfile({ userId, formData: updateData })
//         ).unwrap();
//         setSnackbar({
//           open: true,
//           message: "Profile updated successfully!",
//           severity: "success",
//         });
//         setFormData((prev) => ({ ...prev, password: "" }));
//         dispatch(resetSuccess());
//       } catch (error) {
//         setSnackbar({
//           open: true,
//           message: error.message || "Failed to update profile",
//           severity: "error",
//         });
//       }
//     },
//     [dispatch, userId, formData, selectedFile]
//   );

//   // Memoize delete handler
//   const handleDelete = useCallback(async () => {
//     if (!userId) return;

//     try {
//       await dispatch(deleteAccount(userId)).unwrap();
//       setSnackbar({
//         open: true,
//         message: "Account deleted successfully!",
//         severity: "success",
//       });
//       setDeleteOpen(false);
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: "Failed to delete account",
//         severity: "error",
//       });
//     }
//   }, [dispatch, userId]);

//   // Memoize loading state component
//   const LoadingSpinner = useMemo(
//     () => (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//         <CircularProgress size={40} className="text-btColour" />
//       </div>
//     ),
//     []
//   );

//   // Memoize form inputs configuration
//   const formInputs = useMemo(
//     () => [
//       {
//         id: "username",
//         label: "Username",
//         type: "text",
//         required: true,
//       },
//       {
//         id: "email",
//         label: "Email",
//         type: "email",
//         required: true,
//       },
//       {
//         id: "password",
//         label: "Password",
//         type: "password",
//         required: false,
//         placeholder: "********",
//       },
//     ],
//     []
//   );

//   if (loading) {
//     return LoadingSpinner;
//   }

//   return (
//     <div className="mid:mt-20">
//       <div>
//         <div className="col-span-full mx-auto text-center items-center align-middle">
//           <label className="block text-xl font-bold leading-6 text-gray-900">
//             My profile
//           </label>
//           <div className="mt-1 flex justify-center rounded-lg px-6 pt-10">
//             <div className="relative text-center">
//               {imagePreview ? (
//                 <>
//                   <img
//                     src={imagePreview}
//                     alt="Profile preview"
//                     className="h-[15rem] w-[15rem] rounded-full object-cover border-4 border-white"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="absolute bottom-0 right-4 cursor-pointer h-12 w-12 bg-white rounded-full flex justify-center items-center border-2 border-white">
//                     <MdOutlineAddAPhoto className="h-8 w-8 text-gray-500" />
//                     <input
//                       id="file-upload"
//                       name="image"
//                       type="file"
//                       className="sr-only"
//                       onChange={handleFileChange}
//                       ref={fileInputRef}
//                     />
//                   </label>
//                 </>
//               ) : (
//                 <label
//                   htmlFor="file-upload"
//                   className="cursor-pointer h-40 w-40 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-full">
//                   <BsPersonBoundingBox className="h-12 w-12 text-gray-300" />
//                   <input
//                     id="file-upload"
//                     name="image"
//                     type="file"
//                     className="sr-only"
//                     onChange={handleFileChange}
//                     ref={fileInputRef}
//                   />
//                 </label>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="md:px-[5rem] p-16 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
//         <form onSubmit={handleSubmit}>
//           {formInputs.map(({ id, label, type, required, placeholder }) => (
//             <div key={id} className="mb-5">
//               <label
//                 htmlFor={id}
//                 className="block mb-2 text-sm font-medium text-gray-900">
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 id={id}
//                 name={id}
//                 value={formData[id]}
//                 onChange={handleInputChange}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
//                 required={required}
//                 placeholder={placeholder}
//               />
//             </div>
//           ))}

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[30%] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
//               {loading ? <Spinner /> : "Update"}
//             </button>
//           </div>
//         </form>
//       </div>

//       <Button>
//         <React.Fragment>
//           <button
//             onClick={DeleteOpen}
//             className="px-2 first-letter:uppercase pt-[10rem] text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition ease-in-out duration-200 transform hover:scale-110 hover:text-red-600 underline">
//             Delete Account
//           </button>
//           <Dialog
//             open={Deleteopen}
//             onClose={DeleteClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description">
//             <DialogTitle id="alert-dialog-title">
//               Are you sure you want to delete your account?
//             </DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Confirm delete or cancel
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={DeleteClose}>
//                 <IoClose
//                   size={24}
//                   className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//                 />
//               </Button>
//               <Button onClick={handleDelete}>
//                 <AiTwotoneDelete
//                   size={24}
//                   className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//                 />
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </React.Fragment>
//       </Button>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}>
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

// export default AdminProfile;

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileById,
  updateProfile,
  deleteAccount,
} from "../../features/Users/userAction";
import { resetSuccess } from "../../features/Users/UserSlice";
import { Camera, X, Trash2, Check, Edit, Loader2 } from "lucide-react";

function AdminProfile() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.profiles);
  const userId = userInfo?._id;

  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  // Load profile data
  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileById(userId));
    }
  }, [dispatch, userId]);

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile?.data?.username || "",
        email: profile?.data?.email || "",
        password: "",
      });
      if (profile?.data?.image) {
        setImagePreview(`${profile.data.image}`);
      }
    }
  }, [profile, backendURL]);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    const updateData = new FormData();
    updateData.append("username", formData.username);
    updateData.append("email", formData.email);

    if (formData.password.trim()) {
      if (formData.password.length < 6) {
        setSnackbar({
          open: true,
          message: "Password must be at least 6 characters",
          severity: "error",
        });
        return;
      }
      updateData.append("password", formData.password);
    }

    if (selectedFile) {
      updateData.append("image", selectedFile);
    }

    try {
      await dispatch(updateProfile({ userId, formData: updateData })).unwrap();
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      setFormData((prev) => ({ ...prev, password: "" }));
      setIsEditing(false);
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
        message: "Failed to delete account",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Profile Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {/* Profile Picture Section */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={() => fileInputRef.current.click()}>
            <Camera className="h-5 w-5" />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 rounded-lg shadow-sm bg-white">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <div className="relative">
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600">
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
          />
        </div>

        {isEditing && (
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Leave blank to keep current"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        {isEditing ? (
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  username: profile?.data?.username || "",
                  email: profile?.data?.email || "",
                  password: "",
                });
                setSelectedFile(null);
                if (profile?.data?.image) {
                  setImagePreview(`${profile.data.image}`);
                } else {
                  setImagePreview(null);
                }
                console.log(profile?.data?.image);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 flex items-center gap-1">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Save Changes
            </button>
          </div>
        ) : (
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        )}
      </form>

      {/* Delete Account Section */}
      <div className="text-center mt-12">
        <button
          type="button"
          onClick={() => setDeleteDialogOpen(true)}
          className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 text-sm font-medium">
          <Trash2 className="h-4 w-4" />
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Delete Account</h3>
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 flex items-center gap-1">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar for notifications */}
      {snackbar.open && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${
            snackbar.severity === "error"
              ? "bg-red-100 border-red-400 text-red-700"
              : "bg-green-100 border-green-400 text-green-700"
          } px-4 py-3 rounded border max-w-xs w-full shadow-lg`}>
          <div className="flex justify-between items-start">
            <p className="text-sm">{snackbar.message}</p>
            <button onClick={handleSnackbarClose} className="ml-4">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
