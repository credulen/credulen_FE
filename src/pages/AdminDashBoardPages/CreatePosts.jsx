// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   MenuItem,
//   Box,
//   Select,
//   InputLabel,
//   FormControl,
//   CircularProgress,
// } from "@mui/material";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import { IoArrowBack } from "react-icons/io5";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function CreatePosts() {
//   const { postId } = useParams();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "uncategorized",
//     content: "",
//     authorId: "",
//   });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [imageUploadProgress, setImageUploadProgress] = useState(0);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [authors, setAuthors] = useState([]);
//   const [error, setError] = useState(null);

//   // Separate data fetching functions for better error handling
//   const fetchAuthors = async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/getAllAuthors`);
//       if (!res.ok) throw new Error("Failed to fetch authors");
//       const data = await res.json();
//       return data.map((author) => ({
//         id: author._id,
//         name: author.name,
//       }));
//     } catch (error) {
//       throw new Error(`Error fetching authors: ${error.message}`);
//     }
//   };

//   const fetchPost = async (id) => {
//     try {
//       const res = await fetch(`${backendURL}/api/getPostById/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch post");
//       return await res.json();
//     } catch (error) {
//       throw new Error(`Error fetching post: ${error.message}`);
//     }
//   };

//   // Combined initialization effect
//   useEffect(() => {
//     const initializeData = async () => {
//       setPageLoading(true);
//       setError(null);

//       try {
//         // First fetch authors
//         const fetchedAuthors = await fetchAuthors();
//         setAuthors(fetchedAuthors);

//         // Then fetch post data if editing
//         if (postId) {
//           const post = await fetchPost(postId);

//           // Validate required fields before setting state
//           if (!post.title || !post.category || !post.authorId) {
//             console.warn("Post data incomplete:", post);
//           }

//           setFormData({
//             title: post.title || "",
//             category: post.category || "uncategorized",
//             content: post.content || "",
//             authorId: post.authorId || "",
//           });

//           if (post.image) {
//             setImagePreview(`${backendURL}${post.image}`);
//           }
//         }
//       } catch (error) {
//         setError(error.message);
//         showSnackbar(error.message, "error");
//       } finally {
//         setPageLoading(false);
//       }
//     };

//     initializeData();
//   }, [postId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleQuillChange = (value) => {
//     setFormData((prev) => ({ ...prev, content: value }));
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

//     // Validate form data
//     if (
//       !formData.title?.trim() ||
//       !formData.content?.trim() ||
//       !formData.authorId?.trim()
//     ) {
//       showSnackbar("Title, content, and author are required", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const postFormData = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value) postFormData.append(key, value);
//       });

//       if (selectedFile) {
//         postFormData.append("image", selectedFile);
//       }

//       const url = postId
//         ? `${backendURL}/api/updatePost/${postId}`
//         : `${backendURL}/api/createPost`;

//       const response = await fetch(url, {
//         method: postId ? "PUT" : "POST",
//         body: postFormData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save post");
//       }

//       showSnackbar(
//         postId ? "Post updated successfully" : "Post created successfully",
//         "success"
//       );
//       navigate("/DashBoard/Admin/Posts");
//     } catch (error) {
//       showSnackbar(error.message || "Failed to save post", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   if (pageLoading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={3}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <>
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
//       >
//         <IoArrowBack className="mr-2" size={24} />
//         Back
//       </button>
//       <Box className="p-3 max-w-3xl mx-auto min-h-screen">
//         <h1 className="text-center text-3xl my-7 font-semibold">
//           {postId ? "Edit Post" : "Create a Post"}
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
//             error={!formData.title && formData.title !== undefined}
//             helperText={
//               !formData.title && formData.title !== undefined
//                 ? "Title is required"
//                 : ""
//             }
//           />

//           <FormControl fullWidth required error={!formData.category}>
//             <InputLabel>Category</InputLabel>
//             <Select
//               label="Category"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="uncategorized">Select a category</MenuItem>
//               <MenuItem value="Web3-&-Blockchain-Education">
//                 Web3 & Blockchain Education
//               </MenuItem>
//               <MenuItem value="Web3 & Blockchain Trends">
//                 Web3 & Blockchain Trends
//               </MenuItem>
//               <MenuItem value="Big Data & A.I Trends">
//                 Big Data & A.I Trends
//               </MenuItem>
//               <MenuItem value="Big Data & A.I Education">
//                 Big Data & A.I Education
//               </MenuItem>
//               <MenuItem value="Data in Web3/DeFi">Data in Web3/DeFi</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth required error={!formData.authorId}>
//             <InputLabel>Author</InputLabel>
//             <Select
//               label="Author"
//               name="authorId"
//               value={formData.authorId}
//               onChange={handleInputChange}
//             >
//               {authors.map((author) => (
//                 <MenuItem key={author.id} value={author.id}>
//                   {author.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
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
//               onClick={() => fileInputRef.current.click()}
//             >
//               Choose File
//             </Button>
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="preview"
//                 className="w-[15rem] h-[10rem] object-cover rounded-sm"
//               />
//             )}
//           </Box>
//           <ReactQuill
//             theme="snow"
//             placeholder="Write something..."
//             className="h-72 mb-12"
//             required
//             value={formData.content}
//             onChange={handleQuillChange}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={loading}
//           >
//             {loading ? (
//               <CircularProgress size={24} />
//             ) : postId ? (
//               "Update Post"
//             ) : (
//               "Publish Post"
//             )}
//           </Button>

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
//         </form>
//       </Box>
//     </>
//   );
// }

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoArrowBack } from "react-icons/io5";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreatePosts() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    authorId: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  const quillModules = {
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
  };

  const quillFormats = [
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
  ];

  const fetchAuthors = async () => {
    try {
      const res = await fetch(`${backendURL}/api/getAllAuthors`);
      if (!res.ok) throw new Error("Failed to fetch authors");
      const data = await res.json();
      return data.map((author) => ({
        id: author._id,
        name: author.name,
      }));
    } catch (error) {
      throw new Error(`Error fetching authors: ${error.message}`);
    }
  };

  const fetchPost = async (id) => {
    try {
      const res = await fetch(`${backendURL}/api/getPostById/${id}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return await res.json();
    } catch (error) {
      throw new Error(`Error fetching post: ${error.message}`);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setPageLoading(true);
      setError(null);

      try {
        const fetchedAuthors = await fetchAuthors();
        setAuthors(fetchedAuthors);

        if (postId) {
          const post = await fetchPost(postId);

          if (!post.title || !post.category || !post.authorId) {
            console.warn("Post data incomplete:", post);
          }

          setFormData({
            title: post.title || "",
            category: post.category || "uncategorized",
            content: post.content || "",
            authorId: post.authorId || "",
          });

          if (post.image) {
            setImagePreview(post.image);
          }
        }
      } catch (error) {
        setError(error.message);
        showSnackbar(error.message, "error");
      } finally {
        setPageLoading(false);
      }
    };

    initializeData();
  }, [postId]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleQuillChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar("File size should not exceed 5MB", "error");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        showSnackbar(
          "Please upload only image files (JPEG, PNG, GIF, SVG)",
          "error"
        );
        return;
      }

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title?.trim() ||
      !formData.content?.trim() ||
      !formData.authorId?.trim()
    ) {
      showSnackbar("Title, content, and author are required", "error");
      return;
    }

    setLoading(true);
    try {
      const postFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) postFormData.append(key, value.trim());
      });

      if (selectedFile) {
        postFormData.append("image", selectedFile);
      }

      const url = postId
        ? `${backendURL}/api/updatePost/${postId}`
        : `${backendURL}/api/createPost`;

      const response = await fetch(url, {
        method: postId ? "PUT" : "POST",
        body: postFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save post");
      }

      showSnackbar(
        postId ? "Post updated successfully" : "Post created successfully",
        "success"
      );

      setTimeout(() => {
        navigate("/DashBoard/Admin/Posts");
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      showSnackbar(error.message || "Failed to save post", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = useCallback((message, severity) => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  if (pageLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#F7F8FA" }}>
        <CircularProgress size={40} sx={{ color: "#080759" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} sx={{ backgroundColor: "#F7F8FA" }}>
        <Alert
          severity="error"
          sx={{ backgroundColor: "#EF4444", color: "#FFFFFF" }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      className="p-3 max-w-3xl mx-auto min-h-screen"
      sx={{
        backgroundColor: "#F7F8FA",
        "& .dark": { backgroundColor: "#111827" },
      }}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-primary-500 hover:text-secondary-500 transition-colors duration-200 dark:text-neutral-700-dark dark:hover:text-neutral-600-dark">
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>
      <h1 className="text-center text-3xl my-7 font-semibold text-primary-900 dark:text-neutral-700-dark">
        {postId ? "Edit Post" : "Create a Post"}
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          required
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          error={!formData.title && formData.title !== undefined}
          helperText={
            !formData.title && formData.title !== undefined
              ? "Title is required"
              : ""
          }
          InputLabelProps={{ style: { color: "#3B4A54" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D8E0E8" },
              "&:hover fieldset": { borderColor: "#1A3C34" },
              "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
            },
          }}
        />

        <FormControl fullWidth required error={!formData.category}>
          <InputLabel sx={{ color: "#3B4A54" }}>Category</InputLabel>
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D8E0E8" },
                "&:hover fieldset": { borderColor: "#1A3C34" },
                "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
              },
            }}>
            <MenuItem value="uncategorized">Select a category</MenuItem>
            <MenuItem value="Web3-&-Blockchain-Education">
              Web3 & Blockchain Education
            </MenuItem>
            <MenuItem value="Web3 & Blockchain Trends">
              Web3 & Blockchain Trends
            </MenuItem>
            <MenuItem value="Big Data & A.I Trends">
              Big Data & A.I Trends
            </MenuItem>
            <MenuItem value="Big Data & A.I Education">
              Big Data & A.I Education
            </MenuItem>
            <MenuItem value="Data in Web3/DeFi">Data in Web3/DeFi</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required error={!formData.authorId}>
          <InputLabel sx={{ color: "#3B4A54" }}>Author</InputLabel>
          <Select
            label="Author"
            name="authorId"
            value={formData.authorId}
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D8E0E8" },
                "&:hover fieldset": { borderColor: "#1A3C34" },
                "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
              },
            }}>
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className="flex gap-4 items-center justify-between border-4 border-primary-500 border-dotted p-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current.click()}
            sx={{
              borderColor: "#D8E0E8",
              color: "#1A3C34",
              "&:hover": {
                borderColor: "#1A3C34",
                backgroundColor: "#F7F8FA",
              },
            }}>
            Choose File
          </Button>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-[15rem] h-[10rem] object-cover rounded-sm"
            />
          )}
        </Box>

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12 text-neutral-600 dark:text-neutral-600-dark"
          required
          value={formData.content}
          onChange={handleQuillChange}
          modules={quillModules}
          formats={quillFormats}
        />

        <Button
          type="submit"
          disabled={loading}
          sx={{
            backgroundColor: "#080759",

            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#110b79",
              color: "#FFFFFF",
            },
            "&.Mui-disabled": {
              backgroundColor: "#E5E7EB",
              color: "#5E6D7A",
            },
          }}>
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#080759" }} />
          ) : postId ? (
            "Update Post"
          ) : (
            "Publish Post"
          )}
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{
              width: "100%",
              backgroundColor:
                snackbar.severity === "success" ? "#3C6E5D" : "#EF4444",
              color: "#FFFFFF",
            }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </form>
    </Box>
  );
}
