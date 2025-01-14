import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { IoArrowBack } from "react-icons/io5";

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
  const [snackbar, setSnackbar] = useState({
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
          showSnackbar("Failed to fetch speaker", "error");
        }
      }
    };
    fetchSpeaker();
  }, [speakerId]);

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

      showSnackbar(
        speakerId
          ? "Speaker updated successfully"
          : "Speaker created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/SpeakerList");
    } catch (error) {
      console.error("Error saving speaker:", error);
      showSnackbar(
        error.response?.data?.message || "Failed to save speaker",
        "error"
      );
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
    if (!speakerId) return;

    if (window.confirm("Are you sure you want to delete this speaker?")) {
      setLoading(true);
      try {
        await axios.delete(`${backendURL}/api/deleteSpeaker/${speakerId}`);
        showSnackbar("Speaker deleted successfully", "success");
        navigate("/DashBoard/Admin/SpeakerList");
      } catch (error) {
        console.error("Error deleting speaker:", error);
        showSnackbar(
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
    <>
      <button
        onClick={handleBackClick}
        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {speakerId ? "Edit Speaker" : "Create New Speaker"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              margin="normal"
              placeholder="Full Name"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              margin="normal"
              placeholder="Email"
            />
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              multiline
              rows={4}
              margin="normal"
              placeholder="Short description"
            />
            <TextField
              fullWidth
              label="Occupation/Position"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              margin="normal"
              placeholder="Occupation/Position"
            />
            <TextField
              fullWidth
              label="Company/org Name"
              name="CoName"
              value={formData.CoName}
              onChange={handleInputChange}
              margin="normal"
              placeholder="Enter Comapanys Name"
            />
            <Box
              sx={{
                mt: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
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
              <Typography variant="body2">
                {selectedFile ? selectedFile.name : "No file chosen"}
              </Typography>
            </Box>
            {imagePreview && (
              <Box
                sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : speakerId ? (
                "Update Speaker"
              ) : (
                "Create Speaker"
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
      </Container>
    </>
  );
};

export default CreateSpeaker;
