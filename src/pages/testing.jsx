import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, MenuItem, Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreatePosts() {
  // ... (previous state and useEffect code remains the same)

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

  // ... (rest of the component code remains the same)

  return (
    <Box className="p-3 max-w-3xl mx-auto min-h-screen">
      {/* ... (previous JSX remains the same) */}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* ... (form fields remain the same) */}

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

      {/* ... (Snackbar component remains the same) */}
    </Box>
  );
}
// Last edited just now

console.error("Error fetching invitation details:", error);
setError("Failed to fetch inviter's details.");
setSnackbarMessage("Failed to fetch inviter's details.");
setSnackbarSeverity("error");
setOpenSnackbar(true);
