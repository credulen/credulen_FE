import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Alert, AlertDescription } from "../components/tools/Alert";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { FaWhatsapp } from "react-icons/fa";

const EventVideo = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [relatedWebinars, setRelatedWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize backendURL to prevent unnecessary recalculations
  const backendURL = useMemo(() => {
    return import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:3001";
  }, []);

  // Extract YouTube ID function memoized to prevent recreating on each render
  const getYouTubeId = useCallback((url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }, []);

  // Format date helper
  const formatEventDate = useCallback((date) => {
    return format(new Date(date), "MMM d, yyyy");
  }, []);

  const fetchRelatedWebinars = useCallback(async () => {
    try {
      const response = await fetch(
        `${backendURL}/api/getEvents?eventType=webinar`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch related webinars");
      }
      const data = await response.json();

      // Extract the events array from the response
      const events = data.events || [];

      // Get current date
      const currentDate = new Date();

      // Filter for past webinars with videos, excluding the current one
      const filtered = events
        .filter(
          (webinar) =>
            webinar &&
            webinar.slug !== slug &&
            webinar.videoUrl &&
            new Date(webinar.date) < currentDate
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setRelatedWebinars(filtered);
      console.log("all webinars", events);
      console.log("filtered webinars", filtered);
    } catch (error) {
      console.error("Error fetching related webinars:", error);
      setRelatedWebinars([]);
    }
  }, [backendURL, slug]);

  // Memoize the fetch function to prevent recreating on each render
  const fetchEventDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/api/getEventBySlug/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch event data");
      }
      const data = await response.json();
      setEventData(data);
      // Fetch related webinars after getting event details
      await fetchRelatedWebinars();
    } catch (error) {
      setError("Failed to load event video. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [slug, backendURL, fetchRelatedWebinars]);

  // Effect to fetch event details
  useEffect(() => {
    if (slug) {
      fetchEventDetails();
    }
  }, [slug, fetchEventDetails]);

  // Memoize the YouTube embed URL to prevent unnecessary recalculations
  const youtubeEmbedUrl = useMemo(() => {
    if (!eventData?.videoUrl) return null;
    const videoId = getYouTubeId(eventData.videoUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }, [eventData?.videoUrl, getYouTubeId]);

  // Handle click on related webinar
  const handleWebinarClick = useCallback(
    (webinarSlug) => {
      navigate(`/event/${webinarSlug}`);
    },
    [navigate]
  );

  // Render related webinar card
  const WebinarCard = useCallback(
    ({ webinar }) => (
      <div className="w-full flex justify-center">
        <Card
          className="mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 w-full sm:max-w-sm md:max-w-md mid:max-w-[20rem]"
          onClick={() => handleWebinarClick(webinar.slug)}>
          <CardMedia
            component="img"
            height="140"
            image={`${webinar.image}`}
            alt={webinar.title}
            className="h-32 object-cover"
          />
          <CardContent className="p-3">
            <Typography
              variant="subtitle1"
              className="font-medium line-clamp-2 mb-1">
              {webinar.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatEventDate(webinar.date)}
            </Typography>
          </CardContent>
        </Card>
      </div>
    ),
    [backendURL, formatEventDate, handleWebinarClick]
  );

  const whatsappLink =
    "https://wa.me/2349012048912?text=Hi%20Credulen%20Team%2C%20I%27m%20interested%20in%20the%20special%20promo%20link%20to%20pay%20for%20the%20Blockchain%20Analytics%20Webinar.%20Please%20send%20me%20the%20details";

  if (loading) {
    return (
      <Box className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <CircularProgress size={40} className="text-btColour" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="mt-8">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Container>
    );
  }

  if (!eventData?.videoUrl) {
    return (
      <Container className="mt-20 h-screen">
        <Alert variant="warning">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription>
            <span className="p-10 text-lg">
              No video available for this event yet. Please check back later
            </span>
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="pt-20">
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Typography
            variant="h4"
            component="h1"
            className="mb-6 font-semibold text-[#047481]">
            {eventData.title}
          </Typography>

          <Box
            sx={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: "12px",
              marginBottom: 4,
            }}>
            {youtubeEmbedUrl && (
              <iframe
                src={youtubeEmbedUrl}
                title={eventData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            )}
          </Box>

          <Typography variant="body1" className="mt-6">
            {eventData.description}
          </Typography>

          {/* Special Offer Button */}
          <Box mt={4} mb={4}>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#047481] to-[#198754] rounded-lg blur-sm opacity-15 transition-opacity duration-300"></div>
              <div className="relative bg-[#047481] to-[#198754] text-white py-3 px-6 rounded-lg hover:from-[#035961] hover:to-[#198754] transition-all duration-300 flex items-center justify-center gap-3 transform group-hover:scale-105">
                <FaWhatsapp
                  size={36}
                  className="transform group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="font-bold text-lg">
                  Get a Special Offer Now
                </span>
                <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 group-hover:animate-ping rounded-lg"></div>
              </div>
            </a>
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Box className="top-4 mt-[4.6rem]">
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 font-bold text-gray-800">
              Other Past Webinars
            </Typography>

            {relatedWebinars.length > 0 ? (
              <Box className="space-y-4">
                {relatedWebinars.map((webinar) => (
                  <WebinarCard key={webinar.slug} webinar={webinar} />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No related webinars found.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventVideo;
