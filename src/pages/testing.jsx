import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgress } from "@mui/material";
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
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch(`${backendURL}/api/getAllAuthors`);
        const data = await res.json();
        // Ensure that each author object has an 'id' property
        const formattedAuthors = data.map((author) => ({
          id: author._id, // Assuming the backend sends '_id'
          name: author.name,
        }));
        setAuthors(formattedAuthors);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
        showSnackbar("Failed to fetch authors", "error");
      }
    };

    fetchAuthors();
    const fetchPost = async () => {
      if (postId) {
        try {
          const res = await fetch(`${backendURL}/api/getPostById/${postId}`);
          const post = await res.json();
          console.log("Raw API response:", post);

          if (post) {
            console.log("Setting form data with:", {
              title: post.title || "",
              category: post.category || "uncategorized",
              content: post.content || "",
              authorId: post.authorId || "",
            });

            setFormData({
              title: post.title || "",
              category: post.category || "uncategorized",
              content: post.content || "",
              authorId: post.authorId || "",
            });

            console.log("Form data after setting:", formData);

            setImagePreview(post.image ? `${backendURL}${post.image}` : null);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          showSnackbar("Failed to fetch post", "error");
        }
      }
    };
    fetchPost();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, content: value });
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
    if (!formData.title || !formData.content || !formData.authorId) {
      showSnackbar("Title, content, and author are required", "error");
      return;
    }

    setLoading(true);
    try {
      const postFormData = new FormData();
      postFormData.append("title", formData.title);
      postFormData.append("content", formData.content);
      postFormData.append("category", formData.category);
      postFormData.append("authorId", formData.authorId);

      if (selectedFile) {
        postFormData.append("image", selectedFile);
      }

      // Log FormData contents (for debugging)
      for (let [key, value] of postFormData.entries()) {
        console.log(key, value);
      }

      let response;
      if (postId) {
        response = await fetch(`${backendURL}/api/updatePost/${postId}`, {
          method: "PUT",
          body: postFormData,
        });
      } else {
        response = await fetch(`${backendURL}/api/createPost`, {
          method: "POST",
          body: postFormData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save post");
      }

      const data = await response.json();
      console.log("Response data:", data);

      showSnackbar(
        postId ? "Post updated successfully" : "Post created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/Posts");
    } catch (error) {
      console.error("Error saving post:", error);
      showSnackbar(error.message || "Failed to save post", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDelete = async () => {
    if (!postId) return;

    if (window.confirm("Are you sure you want to delete this post?")) {
      setLoading(true);
      try {
        const response = await fetch(`${backendURL}/api/deletePost/${postId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete post");
        }

        showSnackbar("Post deleted successfully", "success");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting post:", error);
        showSnackbar(error.message || "Failed to delete post", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <button
        onClick={handleBackClick}
        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        <IoArrowBack className="mr-2" size={24} /> {/* Back Arrow Icon */}
        Back
      </button>
      <Box className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
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
          />
          <TextField
            select
            label="Category"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            fullWidth
          >
            <MenuItem value="uncategorized">Select a category</MenuItem>
            <MenuItem value="Web3-&-Blockchain-Education">
              Web3 & Blockchain Education
            </MenuItem>

            <MenuItem value="Web3 & Blockchain Trends">
              Web3 & Blockchain Trends
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
          </TextField>
          <FormControl fullWidth>
            <InputLabel id="author-select-label">Author</InputLabel>
            <Select
              labelId="author-select-label"
              id="authorId"
              name="authorId"
              value={formData.authorId}
              onChange={handleInputChange}
              label="Author"
              //   required
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
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
            >
              Choose File
            </Button>
            <Button
              variant="contained"
              onClick={handleFileChange}
              disabled={!selectedFile || imageUploadProgress > 0}
            >
              {imageUploadProgress > 0 ? (
                <CircularProgress
                  variant="determinate"
                  value={imageUploadProgress}
                  size={24}
                />
              ) : (
                "Upload Image"
              )}
            </Button>
          </Box>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-[30rem]  object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mb-12"
            required
            value={formData.content}
            onChange={handleQuillChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : postId ? (
              "Update Post"
            ) : (
              "Publish Post"
            )}
          </Button>
          {postId && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete Post
            </Button>
          )}
        </form>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
