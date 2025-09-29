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
    category: "",
    subCategory: "other",
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

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // headings
      [{ font: [] }], // fonts
      [{ size: [] }], // font sizes
      ["bold", "italic", "underline", "strike"], // text styles
      [{ color: [] }, { background: [] }], // text and background color
      [{ script: "sub" }, { script: "super" }], // sub/superscript
      [{ align: [] }], // alignments
      ["blockquote", "code-block"], // block styles
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ], // lists
      ["link", "image", "video"], // media
      ["clean"], // remove formatting
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

  const eventTypes = useMemo(
    () => [
      { value: "conference", label: "Conference" },
      { value: "webinar", label: "Webinar" },
      { value: "podcast", label: "Podcast" },
      { value: "workshop", label: "Workshop" },
      { value: "seminar", label: "Seminar" },
    ],
    []
  );

  const subCategories = useMemo(
    () => [
      { value: "General", label: "General" },
      { value: "Executive (B2B)", label: "Executive (B2B)" },

      { value: "others", label: "others" },
    ],
    []
  );

  const showMeetingFields = useMemo(() => {
    return ["webinar", "conference"].includes(formData.eventType);
  }, [formData.eventType]);

  const showSubCategoryField = useMemo(() => {
    return formData.eventType === "podcast";
  }, [formData.eventType]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "eventType") {
      setFormData((prevData) => ({
        ...prevData,
        eventType: value,
        venue: value === "webinar" ? "Online" : "",
        subCategory: value === "podcast" ? "podcast" : "other",
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
              category: event.category || "",
              subCategory: event.subCategory || "other",
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

    if (formData.eventType === "webinar") {
      if (!formData.meetingLink || !formData.duration) {
        showSnackbar(
          "Meeting link and duration are required for webinars",
          "error"
        );
        return;
      }
    }

    if (formData.eventType === "podcast" && !formData.subCategory) {
      showSnackbar("Subcategory is required for podcasts", "error");
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
          className="flex items-center text-primary-500 hover:text-secondary-500 transition-colors duration-200">
          <IoArrowBack className="mr-2" size={24} />
          Back
        </button>

        <h1 className="text-center text-3xl my-7 font-semibold text-primary-900">
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
            InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
              },
            }}
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
            InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
              },
            }}>
            {eventTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>

          {showSubCategoryField && (
            <TextField
              select
              label="Subcategory"
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                  "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                  "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
                },
              }}>
              {subCategories.map((sub) => (
                <MenuItem key={sub.value} value={sub.value}>
                  {sub.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          {formData.eventType === "conference" && (
            <TextField
              label="Venue"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                  "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                  "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
                },
              }}
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
              InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                  "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                  "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
                },
              }}
            />
          )}

          <TextField
            label="Meeting Passcode"
            id="passcode"
            name="passcode"
            value={formData.passcode}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
              },
            }}
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
                InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                    "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                    "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
                  },
                }}
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
                InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                    "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                    "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
                  },
                }}
              />
              <TextField
                label="Meeting Link"
                id="meetingLink"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: "#3B4A54" } }} // neutral-700
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                    "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                    "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
                  },
                }}
              />
            </Box>
          )}
          <FormControl fullWidth>
            <InputLabel
              id="speakers-select-label"
              style={{ color: "#3B4A54" }} // neutral-700
            >
              Speakers
            </InputLabel>
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D8E0E8" }, // primary-200
                  "&:hover fieldset": { borderColor: "#1A3C34" }, // primary-500
                  "&.Mui-focused fieldset": { borderColor: "#1A3C34" }, // primary-500
                },
              }}>
              {speakers.map((speaker) => (
                <MenuItem key={speaker._id} value={speaker._id}>
                  {speaker.name}
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
                borderColor: "#D8E0E8", // primary-200
                color: "#1A3C34", // primary-500
                "&:hover": {
                  borderColor: "#1A3C34", // primary-500
                  backgroundColor: "#F7F8FA", // primary-50
                },
              }}>
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
            className="h-72 mb-12 text-neutral-600"
            required
            value={formData.description}
            onChange={handleQuillChange}
            modules={quillModules}
            formats={quillFormats}
          />

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className=" group w-auto mx-auto lg:w-[50%] bg-primary-500 text-white py-2 px-8 rounded-md font-semibold hover:bg-secondary-500 hover:text-primary-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#080759" }} /> // primary-900
              ) : slug ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
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
                snackbar.severity === "success" ? "#3C6E5D" : "#EF4444", // secondary-500 for success, red-500 for error
              color: "#FFFFFF", // white
            }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
