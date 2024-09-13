import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoArrowBack } from "react-icons/io5";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateAuthor() {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    socialMedia: "",
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

  useEffect(() => {
    const fetchAuthor = async () => {
      if (authorId) {
        try {
          const res = await fetch(
            `${backendURL}/api/getAuthorById/${authorId}`
          );
          const author = await res.json();
          console.log(author, "Author fetched");

          if (author) {
            setFormData({
              name: author.name,
              email: author.email,
              bio: author.bio,
              website: author.website,
              socialMedia: author.socialMedia,
            });
            setImagePreview(`${backendURL}${author.image}`);
          }
        } catch (error) {
          showSnackbar("Failed to fetch author", "error");
        }
      }
    };
    fetchAuthor();
  }, [authorId]);

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
      showSnackbar("Name and email are required", "error");
      return;
    }

    setLoading(true);
    try {
      const authorFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        authorFormData.append(key, formData[key]);
      });

      if (selectedFile) {
        authorFormData.append("image", selectedFile);
      }

      let response;
      if (authorId) {
        response = await fetch(`${backendURL}/api/updateAuthor/${authorId}`, {
          method: "PUT",
          body: authorFormData,
        });
      } else {
        response = await fetch(`${backendURL}/api/createAuthor`, {
          method: "POST",
          body: authorFormData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save author");
      }

      const data = await response.json();
      console.log("Response data:", data);

      showSnackbar(
        authorId
          ? "Author updated successfully"
          : "Author created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/Authors");
    } catch (error) {
      console.error("Error saving author:", error);
      showSnackbar(error.message || "Failed to save author", "error");
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
    if (!authorId) return;

    if (window.confirm("Are you sure you want to delete this author?")) {
      setLoading(true);
      try {
        const response = await fetch(
          `${backendURL}/api/deleteAuthor/${authorId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete author");
        }

        showSnackbar("Author deleted successfully", "success");
        navigate("/DashBoard/Admin/Authors");
      } catch (error) {
        console.error("Error deleting author:", error);
        showSnackbar(error.message || "Failed to delete author", "error");
      } finally {
        setLoading(false);
      }
    }
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
          {authorId ? "Edit Author" : "Create an Author"}
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            required
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            required
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Bio"
            id="bio"
            name="bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Website"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Social Media"
            id="socialMedia"
            name="socialMedia"
            value={formData.socialMedia}
            onChange={handleInputChange}
            fullWidth
          />
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
              className="w-full h-[30rem] object-cover"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : authorId ? (
              "Update Author"
            ) : (
              "Create Author"
            )}
          </Button>
          {authorId && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete Author
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
