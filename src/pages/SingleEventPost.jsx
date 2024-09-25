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

import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RelatedEventsCarousel = ({ events }) => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h6"
        sx={{ mb: 4, fontWeight: 600, color: "primary.main" }}
      >
        Other events you may like
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {events.map((event, index) => (
            <Card
              key={index}
              sx={{
                minWidth: {
                  xs: "calc(100% - 16px)",
                  sm: "calc(50% - 16px)",
                  md: "calc(33.33% - 16px)",
                },
                maxWidth: {
                  xs: "calc(100% - 16px)",
                  sm: "calc(50% - 16px)",
                  md: "calc(33.33% - 16px)",
                },
                mr: 2,
                mb: 2,
                flexShrink: 0,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: "cover",
                }}
                image={`${backendURL}${event.image}`}
                alt={event.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {event.title}
                </Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <EventNote
                      sx={{ fontSize: "small", color: "text.secondary" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <LocationOn
                      sx={{ fontSize: "small", color: "text.secondary" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {event.venue}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <IconButton onClick={() => scroll(-300)} sx={{ mx: 1 }}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={() => scroll(300)} sx={{ mx: 1 }}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const SpeakersCarousel = ({ speakers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {speakers.map((speaker, index) => (
        <Box key={index} sx={{ p: 1 }}>
          <Card
            sx={{
              height: "100%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={`${backendURL}${speaker.image}`}
                  alt={speaker.name}
                  sx={{ width: 80, height: 80, mr: 2 }}
                >
                  {!speaker.image && <ImageIcon />}
                </Avatar>
                <Box>
                  <Typography variant="h6" component="div">
                    {speaker.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {speaker.occupation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {speaker.CoName}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

const SingleEventPost = () => {
  const { slug } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState([]);

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
        // Use eventType as category if no specific category field exists
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
      // Don't set an error state, just log it
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

  if (!eventData) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" color="error" align="center">
          Error loading event data. Please try again later.
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
                <IconButton aria-label="share" color="primary">
                  <Share />
                </IconButton>
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
                  color="#198754"
                  size="large"
                  sx={{
                    mt: 2, // Margin top
                    backgroundColor: "#198754", // Default background color
                    color: "#fff", // Text color
                    "&:hover": {
                      backgroundColor: "#128C7E", // Background color on hover
                      color: "#fff", // Ensure text color remains white on hover
                    },
                  }}
                >
                  Register Now
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* 

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                // position: "sticky",
                top: "110px",
                backgroundColor: "#f5f5f5",
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 3, fontWeight: 600, color: "primary.main" }}
              >
                Related Events
              </Typography>
              {relatedEvents.map((event, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 3,
                    pb: 2,
                    borderBottom:
                      index !== relatedEvents.length - 1
                        ? "1px solid #e0e0e0"
                        : "none",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid> */}
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
          {/* Horizontal Line */}
          <hr style={{ margin: "16px 0", border: "1px solid #e0e0e0" }} />

          {/* Related events carousel */}
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
