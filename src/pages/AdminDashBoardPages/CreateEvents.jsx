import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoArrowBack } from "react-icons/io5";
import { format } from "date-fns";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateEvents() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    venue: "",
    eventType: "conference",
    speakers: [],
    image: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(`${backendURL}/api/getAllSpeakers`);
        const data = await res.json();
        setSpeakers(data);
        console.log("Fetched speakers:", data);
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
        showSnackbar("Failed to fetch speakers", "error");
      }
    };

    fetchSpeakers();

    const fetchEvent = async () => {
      if (slug) {
        try {
          setLoading(true);
          const res = await fetch(`${backendURL}/api/getEventBySlug/${slug}`);
          const event = await res.json();
          setEventId(event._id);
          if (event) {
            setFormData({
              title: event.title || "",
              description: event.content || "",
              date: event.date ? new Date(event.date) : new Date(),
              venue: event.venue || "",
              eventType: event.eventType || "conference",
              speakers: event.speakers?.map((speaker) => speaker._id) || [],
              image: event.image || null,
            });
            setImagePreview(event.image ? `${backendURL}${event.image}` : null);
            console.log("Updated formData:", formData);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          showSnackbar("Failed to fetch event", "error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`Updated ${name}:`, value);
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
    console.log("Updated description:", value);
  };

  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      date: newDate,
    }));
    console.log("Updated date:", newDate);
  };

  const handleSpeakerChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      speakers: event.target.value,
    }));
    console.log("Updated speakers:", event.target.value);
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
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.eventType
    ) {
      showSnackbar(
        "Title, description, date, and event type are required",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const eventFormData = new FormData();
      for (const key in formData) {
        if (key === "date") {
          eventFormData.append(key, formData[key].toISOString());
        } else if (key === "speakers") {
          eventFormData.append(key, JSON.stringify(formData[key]));
        } else {
          eventFormData.append(key, formData[key]);
        }
      }

      if (selectedFile) {
        eventFormData.append("image", selectedFile);
      }

      let response;
      if (eventId) {
        response = await fetch(`${backendURL}/api/updateEvent/${eventId}`, {
          method: "PUT",
          body: eventFormData,
        });
      } else {
        response = await fetch(`${backendURL}/api/createEvent`, {
          method: "POST",
          body: eventFormData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save event");
      }

      const data = await response.json();
      console.log("Response data:", data);

      showSnackbar(
        eventId ? "Event updated successfully" : "Event created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/Events");
    } catch (error) {
      console.error("Error saving event:", error);
      showSnackbar(error.message || "Failed to save event", "error");
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

  const formatDate = (date) => {
    return format(date, "EEE, MMM d • h:mm a 'GMT'xxx");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* ... (existing JSX) */}
      <button
        onClick={handleBackClick}
        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>
      <Box className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">
          {slug ? "Edit Event" : "Create an Event"}
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
          <DateTimePicker
            label="Date and Time"
            value={formData.date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          {formData.date && (
            <div className="text-sm text-gray-600">
              Formatted Date: {formatDate(formData.date)}
            </div>
          )}
          <TextField
            label="Venue"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            select
            label="Event Type"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            fullWidth
            required
          >
            <MenuItem value="webinar">Webinar</MenuItem>
            <MenuItem value="conference">Conference</MenuItem>
            <MenuItem value="workshop">solutions</MenuItem>
          </TextField>
          <FormControl fullWidth>
            <InputLabel id="speakers-select-label">Speakers</InputLabel>
            <Select
              labelId="speakers-select-label"
              id="speakers"
              multiple
              value={formData.speakers}
              onChange={handleSpeakerChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {formData.speakers.map((value) => {
                    const speaker = speakers.find((s) => s._id === value);
                    return (
                      <Chip
                        key={value}
                        label={speaker?.name || value}
                        onDelete={() => handleSpeakerRemove(value)}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {speakers.map((speaker) => (
                <MenuItem key={speaker._id} value={speaker._id}>
                  {speaker.name}
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
            placeholder="Write event description..."
            className="h-72 mb-12"
            required
            value={formData.description}
            onChange={handleQuillChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ marginTop: "16px" }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : slug ? (
              "Update Event"
            ) : (
              "Create Event"
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
      {/* ... (existing JSX) */}
    </LocalizationProvider>
  );
}
