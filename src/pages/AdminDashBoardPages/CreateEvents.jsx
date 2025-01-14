import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
    videoUrl: "",
    speakers: [],
    image: null,
    meetingId: "",
    passcode: "",
    duration: "",
    meetingLink: "",
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

  // Move showSnackbar inside component and memoize it
  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  // Memoize event types
  const eventTypes = useMemo(
    () => [
      { value: "webinar", label: "Webinar" },
      { value: "conference", label: "Conference" },
    ],
    []
  );

  // Memoize whether to show meeting fields
  const showMeetingFields = useMemo(() => {
    return ["webinar", "conference"].includes(formData.eventType);
  }, [formData.eventType]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "eventType") {
      setFormData((prevData) => ({
        ...prevData,
        eventType: value,
        venue: value === "webinar" ? "Online" : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }, []);

  const handleQuillChange = useCallback((value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  }, []);

  const handleDateChange = useCallback((newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      date: newDate,
    }));
  }, []);

  const handleSpeakerChange = useCallback((event) => {
    setFormData((prevData) => ({
      ...prevData,
      speakers: event.target.value,
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  // Fetch data effects
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(`${backendURL}/api/getAllSpeakers`);
        const data = await res.json();
        setSpeakers(data);
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
        showSnackbar("Failed to fetch speakers", "error");
      }
    };

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
              videoUrl: event.videoUrl || "",
              date: event.date ? new Date(event.date) : new Date(),
              venue: event.venue || "",
              eventType: event.eventType || "conference",
              speakers: event.speakers?.map((speaker) => speaker._id) || [],
              image: event.image || null,
              meetingId: event.meetingId || "",
              passcode: event.passcode || "",
              duration: event.duration || "",
              meetingLink: event.meetingLink || "",
            });
            setImagePreview(event.image ? `${event.image}` : null);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          showSnackbar("Failed to fetch event", "error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSpeakers();
    fetchEvent();
  }, [slug, showSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.date || !formData.eventType) {
      showSnackbar("Title, date, and event type are required", "error");
      return;
    }

    // Additional validation for webinar/conference
    if (formData.eventType == "webinar") {
      if (!formData.meetingLink || !formData.duration) {
        showSnackbar(
          "Meeting link and duration are required for online events",
          "error"
        );
        return;
      }
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

      const response = await fetch(
        eventId
          ? `${backendURL}/api/updateEvent/${eventId}`
          : `${backendURL}/api/createEvent`,
        {
          method: eventId ? "PUT" : "POST",
          body: eventFormData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save event");
      }

      showSnackbar(
        eventId ? "Event updated successfully" : "Event created successfully",
        "success"
      );

      // Wait for snackbar to be visible before navigating
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/DashBoard/Admin/Events");
    } catch (error) {
      console.error("Error saving event:", error);
      showSnackbar(error.message || "Failed to save event", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="p-3 max-w-3xl mx-auto min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <IoArrowBack className="mr-2" size={24} />
          Back
        </button>

        <h1 className="text-center text-3xl my-7 font-semibold">
          {slug ? "Edit Event" : "Create an Event"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Form fields remain the same */}
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
            {eventTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>

          {formData.eventType === "conference" && (
            <TextField
              label="Venue"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              fullWidth
            />
          )}

          {formData.eventType === "webinar" && (
            <TextField
              label="Youtube Video URL"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              fullWidth
            />
          )}

          <TextField
            label="Meeting Passcode"
            id="passcode"
            name="passcode"
            value={formData.passcode}
            onChange={handleInputChange}
            fullWidth
          />

          {formData.eventType === "webinar" && (
            <Box className="flex flex-col gap-4">
              <TextField
                label="Meeting ID"
                id="meetingId"
                name="meetingId"
                value={formData.meetingId}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                label="Duration (minutes)"
                id="duration"
                name="duration"
                type="text"
                placeholder="example: 30 minutes"
                value={formData.duration}
                onChange={handleInputChange}
                fullWidth
                required
              />

              <TextField
                label="Meeting Link"
                id="meetingLink"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Box>
          )}

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
                  {selected.map((value) => {
                    const speaker = speakers.find((s) => s._id === value);
                    return <Chip key={value} label={speaker?.name || value} />;
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
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-[15rem] h-[10rem] object-cover"
              />
            )}
          </Box>

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
    </LocalizationProvider>
  );
}
