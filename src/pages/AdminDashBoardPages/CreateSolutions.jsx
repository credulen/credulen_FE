import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoArrowBack } from "react-icons/io5";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateEditSolution() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  console.log(slug);

  useEffect(() => {
    const fetchSolution = async () => {
      if (slug) {
        try {
          const res = await fetch(
            `${backendURL}/api/getSolutionBySlug/${slug}`
          );
          const solution = await res.json();

          if (solution) {
            setFormData({
              title: solution.title || "",
              category: solution.category || "uncategorized",
              content: solution.content || "",
            });
            setImagePreview(
              solution.image ? `${backendURL}${solution.image}` : null
            );
          }
        } catch (error) {
          console.error("Error fetching solution:", error);
          showSnackbar("Failed to fetch solution", "error");
        }
      }
    };
    fetchSolution();
  }, [slug]);

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
    if (!formData.title || !formData.content) {
      showSnackbar("Title and content are required", "error");
      return;
    }

    setLoading(true);
    try {
      const solutionFormData = new FormData();
      solutionFormData.append("title", formData.title);
      solutionFormData.append("content", formData.content);
      solutionFormData.append("category", formData.category);

      if (selectedFile) {
        solutionFormData.append("image", selectedFile);
      }

      let response;
      if (slug) {
        response = await fetch(`${backendURL}/api/updateSolution/${slug}`, {
          method: "PUT",
          body: solutionFormData,
        });
      } else {
        response = await fetch(`${backendURL}/api/createSolution`, {
          method: "POST",
          body: solutionFormData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save solution");
      }

      const data = await response.json();
      console.log("Response data:", data);

      showSnackbar(
        slug
          ? "Solution updated successfully"
          : "Solution created successfully",
        "success"
      );
      navigate("/dashboard/solutions");
    } catch (error) {
      console.error("Error saving solution:", error);
      showSnackbar(error.message || "Failed to save solution", "error");
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

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        onClick={handleBackClick}
        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>
      <Box className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          {slug ? "Edit Solution" : "Create a Solution"}
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
            <MenuItem value="TrainingSchool">TrainingSchool</MenuItem>
            <MenuItem value="ConsultingService">ConsultingService</MenuItem>
          </TextField>
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
              disabled={!selectedFile}
            >
              Upload Image
            </Button>
          </Box>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-[30rem] object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write your solution..."
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
            ) : slug ? (
              "Update Solution"
            ) : (
              "Publish Solution"
            )}
          </Button>
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