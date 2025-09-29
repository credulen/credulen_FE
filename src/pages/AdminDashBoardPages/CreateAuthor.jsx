import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledImagePreview = ({ imagePreview, onRemove }) => {
  return (
    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
      <img
        src={imagePreview}
        alt="preview"
        className="w-full h-full object-cover rounded-lg"
      />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 bg-primary-50 rounded-full p-1 shadow-md hover:bg-primary-100 transition-colors dark:bg-primary-50-dark dark:hover:bg-primary-200-dark"
        aria-label="Remove image">
        <IoClose className="w-4 h-4 text-neutral-600 dark:text-neutral-600-dark" />
      </button>
    </div>
  );
};

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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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

  useEffect(() => {
    const fetchAuthor = async () => {
      if (authorId) {
        try {
          const res = await fetch(
            `${backendURL}/api/getAuthorById/${authorId}`
          );
          if (!res.ok) throw new Error("Failed to fetch author");
          const author = await res.json();
          console.log(author, "Author fetched");

          if (author) {
            setFormData({
              name: author.name || "",
              email: author.email || "",
              bio: author.bio || "",
              website: author.website || "",
              socialMedia: author.socialMedia || "",
            });
            setImagePreview(author.image ? `${author.image}` : null);
          }
        } catch (error) {
          showSnackbar(error.message || "Failed to fetch author", "error");
        }
      }
    };
    fetchAuthor();
  }, [authorId]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleQuillChange = useCallback((value) => {
    setFormData((prev) => ({ ...prev, bio: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.email?.trim()) {
      showSnackbar("Name and email are required", "error");
      return;
    }

    setLoading(true);
    try {
      const authorFormData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) authorFormData.append(key, formData[key].trim());
      });

      if (selectedFile) {
        authorFormData.append("image", selectedFile);
      }

      const response = await fetch(
        authorId
          ? `${backendURL}/api/updateAuthor/${authorId}`
          : `${backendURL}/api/createAuthor`,
        {
          method: authorId ? "PUT" : "POST",
          body: authorFormData,
        }
      );

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
      setTimeout(() => {
        navigate("/DashBoard/Admin/Authors");
      }, 1500);
    } catch (error) {
      console.error("Error saving author:", error);
      showSnackbar(error.message || "Failed to save author", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = useCallback((message, severity) => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const handleDelete = async () => {
    if (!authorId) return;
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
      setTimeout(() => {
        navigate("/DashBoard/Admin/Authors");
      }, 1500);
    } catch (error) {
      console.error("Error deleting author:", error);
      showSnackbar(error.message || "Failed to delete author", "error");
    } finally {
      setLoading(false);
      setDeleteOpen(false);
    }
  };

  return (
    <Box
      className="p-3 max-w-3xl mx-auto min-h-screen"
      sx={{
        backgroundColor: "#F7F8FA",
        "& .dark": { backgroundColor: "#111827" },
      }}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-primary-500 hover:text-secondary-900 transition-colors duration-200 dark:text-neutral-700-dark dark:hover:text-neutral-600-dark">
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>
      <h1 className="text-center text-3xl my-7 font-semibold text-primary-900 dark:text-neutral-700-dark">
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
          InputLabelProps={{ style: { color: "#3B4A54" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D8E0E8" },
              "&:hover fieldset": { borderColor: "#1A3C34" },
              "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
            },
          }}
        />
        <TextField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ style: { color: "#3B4A54" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D8E0E8" },
              "&:hover fieldset": { borderColor: "#1A3C34" },
              "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
            },
          }}
        />
        <ReactQuill
          theme="snow"
          placeholder="Write author bio..."
          className="h-72 mb-12 text-neutral-600 dark:text-neutral-600-dark"
          value={formData.bio}
          onChange={handleQuillChange}
          modules={quillModules}
          formats={quillFormats}
        />
        <TextField
          label="Website"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ style: { color: "#3B4A54" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D8E0E8" },
              "&:hover fieldset": { borderColor: "#1A3C34" },
              "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
            },
          }}
        />
        <TextField
          label="Social Media"
          id="socialMedia"
          name="socialMedia"
          value={formData.socialMedia}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ style: { color: "#3B4A54" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D8E0E8" },
              "&:hover fieldset": { borderColor: "#1A3C34" },
              "&.Mui-focused fieldset": { borderColor: "#1A3C34" },
            },
          }}
        />
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
            <StyledImagePreview
              imagePreview={imagePreview}
              onRemove={handleRemoveImage}
            />
          )}
        </Box>
        <span className="my-4 flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            sx={{
              backgroundColor: "#110b79",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#92ac00",
                color: "#f9fafb",
              },
              "&.Mui-disabled": {
                backgroundColor: "#E5E7EB",
                color: "#5E6D7A",
              },
            }}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#080759" }} />
            ) : authorId ? (
              "Update Author"
            ) : (
              "Create Author"
            )}
          </Button>
          {authorId && (
            <Button
              onClick={() => setDeleteOpen(true)}
              disabled={loading}
              sx={{
                backgroundColor: "#EF4444",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#B91C1C",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E5E7EB",
                  color: "#5E6D7A",
                },
              }}>
              Delete Author
            </Button>
          )}
        </span>
      </form>
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" sx={{ color: "#080759" }}>
          Are you sure you want to delete this author?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#5E6D7A" }}>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            sx={{ color: "#5E6D7A", "&:hover": { color: "#3B4A54" } }}>
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ color: "#EF4444", "&:hover": { color: "#B91C1C" } }}>
            <AiTwotoneDelete size={24} />
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
          sx={{
            width: "100%",
            backgroundColor:
              snackbar.severity === "success" ? "#3C6E5D" : "#EF4444",
            color: "#FFFFFF",
          }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
