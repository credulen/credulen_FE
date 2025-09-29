// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   MenuItem,
//   Box,
//   CircularProgress,
//   Snackbar,
//   InputAdornment,
// } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { IoArrowBack } from "react-icons/io5";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// // Complete initial form state
// const initialFormState = {
//   title: "",
//   category: "uncategorized",
//   content: "",
//   trainingDesc: "",
//   price: "",
//   GBPrate: "",
//   isAllLevels: "Designed for All Levels",
//   isExpertLed: "Expert-Led Content",
//   duration: "3 Weeks Duration",
//   isOnline: "100% Online Learning",
//   prerequisites: "Basic knowledge of programming recommended",
//   discountPercentage: "",
// };

// export default function CreateEditSolution() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState(initialFormState);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(!!slug); // Only true when editing
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     if (!slug) {
//       setInitialLoading(false);
//       return; // Only fetch data in edit mode
//     }

//     const fetchSolution = async () => {
//       try {
//         const res = await fetch(`${backendURL}/api/getSolutionBySlug/${slug}`);
//         if (!res.ok) throw new Error("Failed to fetch solution");
//         const solution = await res.json();
//         console.log("Complete API response:", solution);

//         // Transform API data to form state
//         const transformedData = {
//           title: solution.title || initialFormState.title,
//           category: solution.category || initialFormState.category,
//           content: solution.content || initialFormState.content,
//           trainingDesc: solution.trainingDesc || initialFormState.trainingDesc,
//           price:
//             solution.price?.toString() ||
//             solution.amount?.toString() ||
//             initialFormState.price,
//           GBPrate: solution.GBPrate || initialFormState.GBPrate,
//           isAllLevels: solution.isAllLevels || initialFormState.isAllLevels,
//           isExpertLed: solution.isExpertLed || initialFormState.isExpertLed,
//           duration: solution.duration || initialFormState.duration,
//           isOnline: solution.isOnline || initialFormState.isOnline,
//           prerequisites:
//             solution.prerequisites || initialFormState.prerequisites,
//           discountPercentage:
//             solution.discountPercentage?.toString() ||
//             initialFormState.discountPercentage,
//         };

//         setFormData(transformedData);
//         if (solution.image) {
//           setImagePreview(`${solution.image}?${Date.now()}`); // Add cache busting
//         }
//       } catch (error) {
//         console.error("Error fetching solution:", error);
//         showSnackbar("Failed to fetch solution", "error");
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     fetchSolution();
//   }, [slug]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleQuillChange = (value, field = "content") => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handlePriceChange = (e) => {
//     const value = e.target.value;
//     if (value === "" || /^\d*\.?\d*$/.test(value)) {
//       setFormData({ ...formData, price: value });
//     }
//   };

//   const handleDiscountChange = (e) => {
//     const value = e.target.value;
//     if (value === "" || /^\d*\.?\d*$/.test(value)) {
//       setFormData({ ...formData, discountPercentage: value });
//     }
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
//     if (!formData.title || !formData.content) {
//       showSnackbar("Title and content are required", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const solutionFormData = new FormData();
//       solutionFormData.append("title", formData.title);
//       solutionFormData.append("content", formData.content);
//       solutionFormData.append("category", formData.category);
//       solutionFormData.append("trainingDesc", formData.trainingDesc);
//       solutionFormData.append(
//         "price",
//         formData.price === "" ? "0" : formData.price
//       );
//       solutionFormData.append(
//         "discountPercentage",
//         formData.discountPercentage === "" ? "0" : formData.discountPercentage
//       );
//       solutionFormData.append("isAllLevels", formData.isAllLevels);
//       solutionFormData.append("GBPrate", formData.GBPrate);
//       solutionFormData.append("isExpertLed", formData.isExpertLed);
//       solutionFormData.append("duration", formData.duration);
//       solutionFormData.append("isOnline", formData.isOnline);
//       solutionFormData.append("prerequisites", formData.prerequisites);

//       if (selectedFile) {
//         solutionFormData.append("image", selectedFile);
//       }

//       let response;
//       if (slug) {
//         response = await fetch(`${backendURL}/api/updateSolution/${slug}`, {
//           method: "PUT",
//           body: solutionFormData,
//         });
//       } else {
//         response = await fetch(`${backendURL}/api/createSolution`, {
//           method: "POST",
//           body: solutionFormData,
//         });
//       }

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save solution");
//       }

//       const data = await response.json();
//       console.log("Response data:", data);

//       showSnackbar(
//         slug
//           ? "Solution updated successfully"
//           : "Solution created successfully",
//         "success"
//       );

//       setTimeout(() => {
//         navigate("/DashBoard/Admin/Solutions");
//       }, 2000);
//     } catch (error) {
//       console.error("Error saving solution:", error);
//       showSnackbar(error.message || "Failed to save solution", "error");
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

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   if (initialLoading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="80vh">
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <button
//         onClick={handleBackClick}
//         className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
//         <IoArrowBack className="mr-2" size={24} />
//         Back
//       </button>
//       <Box className="p-3 max-w-3xl mx-auto min-h-screen">
//         <h1 className="text-center text-3xl my-7 font-semibold">
//           {slug ? "Edit Solution" : "Create a Solution"}
//         </h1>
//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             required
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             select
//             label="Category"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             fullWidth>
//             <MenuItem value="uncategorized">Select a category</MenuItem>
//             <MenuItem value="TrainingSchool">TrainingSchool</MenuItem>
//             <MenuItem value="ConsultingService">ConsultingService</MenuItem>
//           </TextField>

//           <Box className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               ref={fileInputRef}
//               style={{ display: "none" }}
//             />
//             <Button
//               variant="outlined"
//               onClick={() => fileInputRef.current.click()}>
//               Choose File
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleFileChange}
//               disabled={!selectedFile}>
//               Upload Image
//             </Button>
//           </Box>
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="preview"
//               className="w-full h-[30rem] object-cover"
//             />
//           )}

//           <div className="mb-4">
//             <h3 className="text-lg font-medium mb-2">Main Content</h3>
//             <ReactQuill
//               theme="snow"
//               placeholder="Write your solution content..."
//               className="h-72 mb-12"
//               required
//               value={formData.content}
//               onChange={(value) => handleQuillChange(value, "content")}
//             />
//           </div>

//           <div className="mb-4">
//             <h4 className="mb-3 italic">
//               Training description and price below
//             </h4>
//             <h3 className="text-lg font-medium mb-2">Training Description</h3>
//             <ReactQuill
//               theme="snow"
//               placeholder="Write training description (if applicable)..."
//               className="h-72 mb-12"
//               value={formData.trainingDesc}
//               onChange={(value) => handleQuillChange(value, "trainingDesc")}
//             />

//             <div className="py-5">
//               <TextField
//                 label="Price"
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={formData.price}
//                 onChange={handlePriceChange}
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">#</InputAdornment>
//                   ),
//                   inputProps: {
//                     min: 0,
//                     step: "0.01",
//                   },
//                 }}
//               />
//             </div>
//             <div className="py-5">
//               <TextField
//                 label="GBPrate"
//                 type="number"
//                 id="GBPrate"
//                 name="GBPrate"
//                 value={formData.GBPrate}
//                 onChange={handleInputChange}
//                 fullWidth
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">GBP</InputAdornment>
//                   ),
//                   inputProps: {
//                     min: 0,
//                     step: "0.01",
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <h4 className="mb-3 italic">Additional Details</h4>
//             <TextField
//               placeholder="e.g Designed for All Levels"
//               label="Whos this Course for"
//               id="isAllLevels"
//               name="isAllLevels"
//               value={formData.isAllLevels}
//               onChange={handleInputChange}
//               fullWidth
//             />
//             <div className="mt-5">
//               <TextField
//                 placeholder="e.g Expert-Led Content"
//                 label="Content"
//                 id="isExpertLed"
//                 name="isExpertLed"
//                 value={formData.isExpertLed}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//             </div>
//             <div className="mt-5">
//               <TextField
//                 placeholder="e.g., '3 Weeks Duration"
//                 label="Duration"
//                 id="duration"
//                 name="duration"
//                 value={formData.duration}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//             </div>
//             <div className="mt-5">
//               <TextField
//                 placeholder="100% Online Learning"
//                 label="Mode of Learning e.g online, onsite"
//                 id="isOnline"
//                 name="isOnline"
//                 value={formData.isOnline}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//             </div>
//             <div className="mt-5">
//               <TextField
//                 placeholder="e.g., 'Basic knowledge of programming recommended'"
//                 label="Prerequisites"
//                 id="prerequisites"
//                 name="prerequisites"
//                 value={formData.prerequisites}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//             </div>
//             <div className="mt-5">
//               <TextField
//                 aria-placeholder="Enter discount percentage (0-100)"
//                 label="Discount Percentage (%) e.g 10%"
//                 type="number"
//                 id="discountPercentage"
//                 name="discountPercentage"
//                 value={formData.discountPercentage}
//                 onChange={handleDiscountChange}
//                 fullWidth
//                 InputProps={{
//                   inputProps: {
//                     min: 0,
//                     max: 100,
//                     step: "0.1",
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={loading}>
//             {loading ? (
//               <CircularProgress size={24} />
//             ) : slug ? (
//               "Update Solution"
//             ) : (
//               "Publish Solution"
//             )}
//           </Button>
//         </form>
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={snackbar.severity}
//             sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </>
//   );
// }
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { AiOutlineDown } from "react-icons/ai";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const initialFormState = {
  title: "",
  category: "uncategorized",
  content: "",
  trainingDesc: "",
  price: "",
  GBPrate: "",
  isAllLevels: "Designed for All Levels",
  isExpertLed: "Expert-Led Content",
  duration: "3 Weeks Duration",
  isOnline: "100% Online Learning",
  prerequisites: "Basic knowledge of programming recommended",
  discountPercentage: "",
};

export default function CreateEditSolution() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  const [formData, setFormData] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!slug);
  const [solutionId, setSolutionId] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const categories = useMemo(
    () => [
      { value: "uncategorized", label: "Select a category" },
      { value: "TrainingSchool", label: "Training School" },
      { value: "ConsultingService", label: "Consulting Service" },
    ],
    []
  );

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    []
  );

  const quillFormats = useMemo(
    () => [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "script",
      "align",
      "blockquote",
      "code-block",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ],
    []
  );

  const showToast = useCallback((message, severity = "success") => {
    setToast({ open: true, message, severity });
  }, []);

  useEffect(() => {
    if (!slug) {
      setInitialLoading(false);
      return;
    }

    const fetchSolution = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendURL}/api/getSolutionBySlug/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch solution");
        const solution = await res.json();
        console.log("Complete API response:", solution);

        const transformedData = {
          title: solution.title || initialFormState.title,
          category: solution.category || initialFormState.category,
          content: solution.content || initialFormState.content,
          trainingDesc: solution.trainingDesc || initialFormState.trainingDesc,
          price:
            solution.price?.toString() ||
            solution.amount?.toString() ||
            initialFormState.price,
          GBPrate: solution.GBPrate || initialFormState.GBPrate,
          isAllLevels: solution.isAllLevels || initialFormState.isAllLevels,
          isExpertLed: solution.isExpertLed || initialFormState.isExpertLed,
          duration: solution.duration || initialFormState.duration,
          isOnline: solution.isOnline || initialFormState.isOnline,
          prerequisites:
            solution.prerequisites || initialFormState.prerequisites,
          discountPercentage:
            solution.discountPercentage?.toString() ||
            initialFormState.discountPercentage,
        };

        setFormData(transformedData);
        setSolutionId(solution._id);
        if (solution.image) {
          setImagePreview(`${solution.image}?${Date.now()}`);
        }
      } catch (error) {
        console.error("Error fetching solution:", error);
        showToast("Failed to fetch solution", "error");
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    };

    fetchSolution();
  }, [slug]);

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleQuillChange = useCallback((value, field = "content") => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }, []);

  const handlePriceChange = useCallback((e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({ ...prevData, price: value }));
    }
  }, []);

  const handleDiscountChange = useCallback((e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({ ...prevData, discountPercentage: value }));
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setFormData((prevData) => ({ ...prevData, category }));
    setCategoryDropdownOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.title || !formData.content) {
        showToast("Title and content are required", "error");
        return;
      }

      setLoading(true);
      try {
        const solutionFormData = new FormData();
        solutionFormData.append("title", formData.title);
        solutionFormData.append("content", formData.content);
        solutionFormData.append("category", formData.category);
        solutionFormData.append("trainingDesc", formData.trainingDesc);
        solutionFormData.append(
          "price",
          formData.price === "" ? "0" : formData.price
        );
        solutionFormData.append(
          "discountPercentage",
          formData.discountPercentage === "" ? "0" : formData.discountPercentage
        );
        solutionFormData.append("isAllLevels", formData.isAllLevels);
        solutionFormData.append("GBPrate", formData.GBPrate);
        solutionFormData.append("isExpertLed", formData.isExpertLed);
        solutionFormData.append("duration", formData.duration);
        solutionFormData.append("isOnline", formData.isOnline);
        solutionFormData.append("prerequisites", formData.prerequisites);

        if (selectedFile) {
          solutionFormData.append("image", selectedFile);
        }

        const response = await fetch(
          slug
            ? `${backendURL}/api/updateSolution/${slug}`
            : `${backendURL}/api/createSolution`,
          {
            method: slug ? "PUT" : "POST",
            body: solutionFormData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to save solution");
        }

        showToast(
          solutionId
            ? "Solution updated successfully"
            : "Solution created successfully",
          "success"
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/DashBoard/Admin/Solutions");
      } catch (error) {
        console.error("Error saving solution:", error);
        showToast(error.message || "Failed to save solution", "error");
      } finally {
        setLoading(false);
      }
    },
    [formData, selectedFile, solutionId, showToast, navigate]
  );

  const handleCloseToast = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <svg
          className="animate-spin h-8 w-8 text-primary-900"
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
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto min-h-screen">
      <button
        onClick={handleBackClick}
        className="flex items-center text-primary-500 hover:text-secondary-500 transition-colors duration-200 mb-4">
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>
      <h1 className="text-center text-3xl my-7 font-semibold text-primary-900">
        {slug ? "Edit Solution" : "Create a Solution"}
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder="Enter solution title"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
          />
        </div>
        <div className="relative" ref={categoryDropdownRef}>
          <label
            htmlFor="category"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Category
          </label>
          <button
            type="button"
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            disabled={loading}
            className="w-full flex items-center justify-between text-neutral-700 dark:text-neutral-700-dark border border-primary-100 dark:border-primary-200-dark rounded-md px-3 py-2 hover:bg-primary-50 dark:hover:bg-primary-50-dark transition-colors duration-200 disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
            aria-label="Select category">
            {categories.find((cat) => cat.value === formData.category)?.label ||
              "Select a category"}
            <AiOutlineDown className="ml-2" size={16} />
          </button>
          <ul
            className={`absolute z-10 mt-2 w-full bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md shadow-lg ${
              categoryDropdownOpen ? "block" : "hidden"
            }`}>
            {categories.map((cat) => (
              <li
                key={cat.value}
                onClick={() => handleCategorySelect(cat.value)}
                className="px-4 py-2 text-neutral-700 dark:text-neutral-700-dark hover:bg-primary-50 dark:hover:bg-primary-50-dark cursor-pointer">
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 border-4 border-primary-500 border-dashed p-3 rounded-md">
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
            disabled={loading}
            className="px-4 py-2 text-primary-500 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm hover:bg-primary-50 hover:border-primary-500 dark:hover:bg-primary-50-dark dark:hover:border-primary-500 transition-colors duration-200 disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed">
            Choose File
          </button>
          <span className="text-neutral-600 dark:text-neutral-600-dark text-sm">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </span>
        </div>
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-[15rem] h-[10rem] object-cover rounded-md"
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-medium mb-2 text-neutral-700 dark:text-neutral-700-dark">
            Main Content *
          </h3>
          <ReactQuill
            theme="snow"
            placeholder="Write your solution content..."
            value={formData.content}
            onChange={(value) => handleQuillChange(value, "content")}
            modules={quillModules}
            formats={quillFormats}
            className="bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm disabled:bg-neutral-200 disabled:text-neutral-600"
            readOnly={loading}
          />
        </div>
        <div>
          <h4 className="mb-3 italic text-neutral-600 dark:text-neutral-600-dark">
            Training description and price below
          </h4>
          <h3 className="text-lg font-medium mb-2 text-neutral-700 dark:text-neutral-700-dark">
            Training Description
          </h3>
          <ReactQuill
            theme="snow"
            placeholder="Write training description (if applicable)..."
            value={formData.trainingDesc}
            onChange={(value) => handleQuillChange(value, "trainingDesc")}
            modules={quillModules}
            formats={quillFormats}
            className="bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm disabled:bg-neutral-200 disabled:text-neutral-600"
            readOnly={loading}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handlePriceChange}
            disabled={loading}
            placeholder="Enter price"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label
            htmlFor="GBPrate"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            GBP Rate
          </label>
          <input
            type="number"
            id="GBPrate"
            name="GBPrate"
            value={formData.GBPrate}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Enter GBP rate"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <h4 className="mb-3 italic text-neutral-600 dark:text-neutral-600-dark">
            Additional Details
          </h4>
          <label
            htmlFor="isAllLevels"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Who's this Course for
          </label>
          <input
            type="text"
            id="isAllLevels"
            name="isAllLevels"
            value={formData.isAllLevels}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="e.g., Designed for All Levels"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="isExpertLed"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Content
          </label>
          <input
            type="text"
            id="isExpertLed"
            name="isExpertLed"
            value={formData.isExpertLed}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="e.g., Expert-Led Content"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="duration"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="e.g., 3 Weeks Duration"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="isOnline"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Mode of Learning
          </label>
          <input
            type="text"
            id="isOnline"
            name="isOnline"
            value={formData.isOnline}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="e.g., 100% Online Learning"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="prerequisites"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Prerequisites
          </label>
          <input
            type="text"
            id="prerequisites"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="e.g., Basic knowledge of programming recommended"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="discountPercentage"
            className="block text-neutral-700 dark:text-neutral-700-dark text-sm font-medium mb-1">
            Discount Percentage (%)
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleDiscountChange}
            disabled={loading}
            placeholder="Enter discount percentage (0-100)"
            className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-700-dark bg-white dark:bg-neutral-800 border border-primary-100 dark:border-primary-200-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-600 dark:placeholder-neutral-600-dark disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-auto mx-auto lg:w-[50%] px-8 py-2 bg-primary-500 text-white rounded-md font-semibold hover:bg-secondary-900 transition-all duration-300 transform hover:scale-[1.02] disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-primary-900"
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
            ) : solutionId ? (
              "Update Solution"
            ) : (
              "Create Solution"
            )}
          </button>
        </div>
      </form>
      {toast.open && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-md flex items-center gap-2 max-w-sm w-full transition-opacity duration-300 ${
            toast.severity === "success"
              ? "bg-green-500 text-white"
              : "bg-error-500 text-white"
          }`}>
          <span className="flex-1 text-sm">{toast.message}</span>
          <button
            onClick={handleCloseToast}
            className="text-white hover:text-neutral-200">
            <IoClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
