import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Card,
  CardContent,
  TextField,
  Container,
  Skeleton,
  CardMedia,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  EventNote,
  LocationOn,
  ChevronLeft,
  ChevronRight,
  FavoriteBorder,
  Share,
  ImageOutlined as ImageIcon,
} from "@mui/icons-material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RelatedEventsCarousel = ({ events }) => {
  // ... (RelatedEventsCarousel implementation remains the same)
};

const SpeakersCarousel = ({ speakers }) => {
  // ... (SpeakersCarousel implementation remains the same)
};

const ShareFeature = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (platform) => {
    if (!post) {
      console.error("Post data is not available");
      return;
    }
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    let shareUrl;
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
    handleClose();
  };

  return (
    <Box>
      <IconButton
        aria-label="share"
        color="primary"
        onClick={handleOpen}
        aria-controls="share-menu"
        aria-haspopup="true"
      >
        <Share />
      </IconButton>
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleShare("twitter")}>
          <Twitter fontSize="small" sx={{ color: "#1DA1F2", mr: 1 }} />
          Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShare("facebook")}>
          <Facebook fontSize="small" sx={{ color: "#4267B2", mr: 1 }} />
          Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShare("linkedin")}>
          <LinkedIn fontSize="small" sx={{ color: "#0077b5", mr: 1 }} />
          LinkedIn
        </MenuItem>
        <MenuItem onClick={() => handleShare("whatsapp")}>
          <WhatsApp fontSize="small" sx={{ color: "#25D366", mr: 1 }} />
          WhatsApp
        </MenuItem>
      </Menu>
    </Box>
  );
};

const SingleEventPost = () => {
  const { slug } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEventDetails = async (slug) => {
    try {
      const response = await fetch(`${backendURL}/api/getEventBySlug/${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched event data:", data);
      setEventData(data);
      setLoading(false);

      // Fetch related events
      if (data._id) {
        const category = data.category || data.eventType;
        if (category) {
          fetchRelatedEvents(data._id, category);
        } else {
          console.warn("No category or eventType found for related events");
        }
      } else {
        console.error("Missing _id in event data:", data);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Failed to load event details. Please try again later.");
      setLoading(false);
    }
  };

  const fetchRelatedEvents = async (currentEventId, category) => {
    try {
      console.log("Fetching related events with:", {
        currentEventId,
        category,
      });
      const response = await fetch(
        `${backendURL}/api/related-events?category=${encodeURIComponent(
          category
        )}&currentEventId=${currentEventId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Related events data:", data);
      setRelatedEvents(data);
    } catch (error) {
      console.error("Error fetching related events:", error);
      console.warn("Failed to load related events. This is non-critical.");
    }
  };

  useEffect(() => {
    if (slug) {
      fetchEventDetails(slug);
    }
  }, [slug]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Skeleton variant="rectangular" height={400} sx={{ mb: 3 }} />
        <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!eventData) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" color="error" align="center">
          No event data available. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 5 }}>
        <Box
          sx={{
            mb: 4,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={`${backendURL}${eventData.image}`}
            alt="Event Banner"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" color="primary">
                {new Date(eventData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: {
                    xs: "h4.fontSize",
                    sm: "h3.fontSize",
                  },
                }}
              >
                {eventData.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton aria-label="add to favorites" color="primary">
                  <FavoriteBorder />
                </IconButton>
                <ShareFeature post={eventData} />
              </Box>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600, color: "#2F5C47" }}
              >
                Event Details
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EventNote sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">
                  {new Date(eventData.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {new Date(eventData.date).toLocaleTimeString()} (+1GMT)
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">{eventData.venue}</Typography>
              </Box>
              <Typography variant="body1">{eventData.description}</Typography>
            </Paper>

            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: 600, color: "#2F5C47" }}
            >
              Speakers
            </Typography>
            <Box sx={{ mb: 4 }}>
              <SpeakersCarousel speakers={eventData.speakers || []} />
            </Box>
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                mt: 10,
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 600, color: "#2F5C47" }}
              >
                About this event
              </Typography>
              <Typography
                variant="body1"
                paragraph
                dangerouslySetInnerHTML={{ __html: eventData.content }}
              />
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                Register for this event
              </Typography>

              <form>
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Company"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Why do you want to attend?"
                  multiline
                  rows={4}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    backgroundColor: "#198754",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#128C7E",
                    },
                  }}
                >
                  Register Now
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<TelegramIcon />}
                sx={{
                  backgroundColor: "#198754",
                  "&:hover": {
                    backgroundColor: "#128C7E",
                  },
                }}
              >
                Join Our Telegram Community
              </Button>
              <TextField
                label="Subscribe to our newsletter"
                variant="outlined"
                placeholder="Enter your email address"
                sx={{
                  width: "300px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#198754",
                  "&:hover": {
                    backgroundColor: "#128C7E",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 12 }}>
          <hr style={{ margin: "16px 0", border: "1px solid #e0e0e0" }} />
          {relatedEvents.length > 0 ? (
            <RelatedEventsCarousel events={relatedEvents} />
          ) : (
            <Typography variant="body1" sx={{ mt: 4, textAlign: "start" }}>
              No related events found.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SingleEventPost;
