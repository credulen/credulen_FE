// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Box,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { IoArrowBack } from "react-icons/io5";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const CreateSpeaker = () => {
//   const { speakerId } = useParams();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     bio: "",
//     email: "",
//     CoName: "",
//     occupation: "",
//   });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     const fetchSpeaker = async () => {
//       if (speakerId) {
//         try {
//           const res = await axios.get(
//             `${backendURL}/api/getSpeakerById/${speakerId}`
//           );
//           const speaker = res.data;
//           console.log(speaker, "Speaker fetched");

//           if (speaker) {
//             setFormData({
//               name: speaker.name,
//               email: speaker.email,
//               bio: speaker.bio,
//               occupation: speaker.occupation,
//               CoName: speaker.CoName,
//             });
//             setImagePreview(`${speaker.image}`);
//           }
//         } catch (error) {
//           showSnackbar("Failed to fetch speaker", "error");
//         }
//       }
//     };
//     fetchSpeaker();
//   }, [speakerId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email) {
//       showSnackbar("Name and email are required", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const speakerFormData = new FormData();
//       Object.keys(formData).forEach((key) => {
//         speakerFormData.append(key, formData[key]);
//       });

//       if (selectedFile) {
//         speakerFormData.append("image", selectedFile);
//       }

//       let response;
//       if (speakerId) {
//         response = await axios.put(
//           `${backendURL}/api/updateSpeaker/${speakerId}`,
//           speakerFormData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//       } else {
//         response = await axios.post(
//           `${backendURL}/api/createSpeaker`,
//           speakerFormData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//       }

//       console.log("Response data:", response.data);

//       showSnackbar(
//         speakerId
//           ? "Speaker updated successfully"
//           : "Speaker created successfully",
//         "success"
//       );
//       navigate("/DashBoard/Admin/SpeakerList");
//     } catch (error) {
//       console.error("Error saving speaker:", error);
//       showSnackbar(
//         error.response?.data?.message || "Failed to save speaker",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleDelete = async () => {
//     if (!speakerId) return;

//     if (window.confirm("Are you sure you want to delete this speaker?")) {
//       setLoading(true);
//       try {
//         await axios.delete(`${backendURL}/api/deleteSpeaker/${speakerId}`);
//         showSnackbar("Speaker deleted successfully", "success");
//         navigate("/DashBoard/Admin/SpeakerList");
//       } catch (error) {
//         console.error("Error deleting speaker:", error);
//         showSnackbar(
//           error.response?.data?.message || "Failed to delete speaker",
//           "error"
//         );
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

// const handleBackClick = () => {
//   navigate(-1);
// };

//   return (
//     <>
//       <button
//         onClick={handleBackClick}
//         className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
//       >
//         <IoArrowBack className="mr-2" size={24} />
//         Back
//       </button>
//       <Container maxWidth="sm">
//         <Box sx={{ mt: 4, mb: 4 }}>
//           <Typography variant="h4" component="h2" gutterBottom>
//             {speakerId ? "Edit Speaker" : "Create New Speaker"}
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Full Name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//               margin="normal"
//               placeholder="Full Name"
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//               margin="normal"
//               placeholder="Email"
//             />
//             <TextField
//               fullWidth
//               label="Bio"
//               name="bio"
//               value={formData.bio}
//               onChange={handleInputChange}
//               multiline
//               rows={4}
//               margin="normal"
//               placeholder="Short description"
//             />
//             <TextField
//               fullWidth
//               label="Occupation/Position"
//               name="occupation"
//               value={formData.occupation}
//               onChange={handleInputChange}
//               margin="normal"
//               placeholder="Occupation/Position"
//             />
//             <TextField
//               fullWidth
//               label="Company/org Name"
//               name="CoName"
//               value={formData.CoName}
//               onChange={handleInputChange}
//               margin="normal"
//               placeholder="Enter Comapanys Name"
//             />
//             <Box
//               sx={{
//                 mt: 2,
//                 mb: 2,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//               }}
//             >
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//               />
//               <Button
//                 variant="outlined"
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 Choose File
//               </Button>
//               <Typography variant="body2">
//                 {selectedFile ? selectedFile.name : "No file chosen"}
//               </Typography>
//             </Box>
//             {imagePreview && (
//               <Box
//                 sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}
//               >
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   style={{
//                     maxWidth: "100%",
//                     maxHeight: "300px",
//                     objectFit: "contain",
//                   }}
//                 />
//               </Box>
//             )}
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress size={24} />
//               ) : speakerId ? (
//                 "Update Speaker"
//               ) : (
//                 "Create Speaker"
//               )}
//             </Button>
//           </form>

//           <Snackbar
//             open={snackbar.open}
//             autoHideDuration={6000}
//             onClose={handleCloseSnackbar}
//             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//           >
//             <Alert
//               onClose={handleCloseSnackbar}
//               severity={snackbar.severity}
//               sx={{ width: "100%" }}
//             >
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default CreateSpeaker;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBack, IoClose } from "react-icons/io5";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const CreateSpeaker = () => {
  const { speakerId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    CoName: "",
    occupation: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchSpeaker = async () => {
      if (speakerId) {
        try {
          const res = await axios.get(
            `${backendURL}/api/getSpeakerById/${speakerId}`
          );
          const speaker = res.data;
          console.log(speaker, "Speaker fetched");

          if (speaker) {
            setFormData({
              name: speaker.name,
              email: speaker.email,
              bio: speaker.bio,
              occupation: speaker.occupation,
              CoName: speaker.CoName,
            });
            setImagePreview(`${speaker.image}`);
          }
        } catch (error) {
          showToast("Failed to fetch speaker", "error");
        }
      }
    };
    fetchSpeaker();
  }, [speakerId]);

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast("Name and email are required", "error");
      return;
    }

    setLoading(true);
    try {
      const speakerFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        speakerFormData.append(key, formData[key]);
      });

      if (selectedFile) {
        speakerFormData.append("image", selectedFile);
      }

      let response;
      if (speakerId) {
        response = await axios.put(
          `${backendURL}/api/updateSpeaker/${speakerId}`,
          speakerFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axios.post(
          `${backendURL}/api/createSpeaker`,
          speakerFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      console.log("Response data:", response.data);

      showToast(
        speakerId
          ? "Speaker updated successfully"
          : "Speaker created successfully",
        "success"
      );
      setTimeout(() => {
        navigate("/DashBoard/Admin/SpeakerList");
      }, 2000);
    } catch (error) {
      console.error("Error saving speaker:", error);
      showToast(
        error.response?.data?.message || "Failed to save speaker",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, severity) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleDelete = async () => {
    if (!speakerId) return;

    if (window.confirm("Are you sure you want to delete this speaker?")) {
      setLoading(true);
      try {
        await axios.delete(`${backendURL}/api/deleteSpeaker/${speakerId}`);
        showToast("Speaker deleted successfully", "success");
        navigate("/DashBoard/Admin/SpeakerList");
      } catch (error) {
        console.error("Error deleting speaker:", error);
        showToast(
          error.response?.data?.message || "Failed to delete speaker",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6">
      <button
        onClick={handleBackClick}
        className="flex items-center text-primary-500 hover:text-secondary-500 transition-colors duration-200 mb-4">
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>
      <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-6">
        {speakerId ? "Edit Speaker" : "Create New Speaker"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Full Name"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            placeholder="Short description"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark"
          />
        </div>
        <div>
          <label
            htmlFor="occupation"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Occupation/Position
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            placeholder="Occupation/Position"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark"
          />
        </div>
        <div>
          <label
            htmlFor="CoName"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Company/Org Name
          </label>
          <input
            type="text"
            id="CoName"
            name="CoName"
            value={formData.CoName}
            onChange={handleInputChange}
            placeholder="Enter Company Name"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark"
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 text-primary-500 border border-primary-100 dark:border-primary-200-dark rounded-md hover:bg-primary-50 hover:border-primary-500 dark:hover:bg-primary-50-dark dark:hover:border-primary-500 transition-colors duration-200">
            Choose File
          </button>
          <span className="text-neutral-600 dark:text-neutral-600-dark text-sm">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </span>
        </div>
        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-[300px] object-contain"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-secondary-900 disabled:bg-neutral-200 disabled:text-neutral-600 transition-colors duration-200"
          disabled={loading}>
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-primary-900 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : speakerId ? (
            "Update Speaker"
          ) : (
            "Create Speaker"
          )}
        </button>
      </form>

      {toast.open && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-2 py-2 rounded-md flex items-center gap-2 max-w-sm w-full transition-opacity duration-300 ${
            toast.severity === "success"
              ? "bg-green-500 text-white"
              : "bg-error-500 text-white"
          }`}>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={handleCloseToast}
            className="text-white hover:text-neutral-200">
            <IoClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateSpeaker;
