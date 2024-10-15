import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  CardMedia,
  Container,
  Skeleton,
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
import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Bell, CheckCircle, AlertCircle, X, Loader } from "lucide-react";
import { Alert, AlertDescription } from "../components/tools/Alert";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RelatedEventsCarousel = ({ events }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(/(\d+)/, (match) => {
        const day = parseInt(match);
        const suffix = ["th", "st", "nd", "rd"][
          day % 10 > 3 ? 0 : ((day % 100) - 20) % 10 || 3
        ];
        return `${day}${suffix}`;
      });
  };

  const handleCardClick = (slug) => {
    navigate(`/event/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h6"
        sx={{ mb: 4, fontWeight: 600, color: "#047481" }}
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
            pb: 2,
          }}
        >
          {events.map((event, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(event.slug)}
              sx={{
                minWidth: 280,
                maxWidth: 280,
                mr: 2,
                flexShrink: 0,
                cursor: "pointer",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 160,
                  objectFit: "cover",
                }}
                image={`${backendURL}${event.image}`}
                alt={event.title}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  noWrap
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {event.title}
                </Typography>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <EventNote
                      sx={{ fontSize: "small", color: "text.secondary", mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(event.date)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocationOn
                      sx={{ fontSize: "small", color: "text.secondary", mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {event.venue}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
        breakpoint: 960,
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
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={`${backendURL}${speaker.image}`}
                  alt={speaker.name}
                  sx={{ width: 60, height: 60, mr: 2 }}
                >
                  {!speaker.image && <ImageIcon />}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
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
        sx={{
          m: 0,
          ml: 2,
          p: 0,
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
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

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const SingleEventPost = () => {
  const { slug } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [alertInfo, setAlertInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationAlertInfo, setRegistrationAlertInfo] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    reason: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/register-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventTitle: eventData.title,
          slug: eventData.slug,
          eventCategory: eventData.category || eventData.eventType,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlertInfo({
          message: "Registration successful!!",
          variant: "success",
          icon: CheckCircle,
        });
        setFormData({ fullName: "", email: "", company: "", reason: "" });
      } else {
        setAlertInfo({
          message: data.message || "An error occurred. Please try again.",
          variant: data.message.includes("already registered for this event")
            ? "warning"
            : "destructive",
          icon: AlertCircle,
        });
      }
    } catch (error) {
      setAlertInfo({
        message: "An error occurred. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alertInfo) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        setAlertInfo(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/newsletter-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setAlertInfo({
          message: "Subscription successful!",
          variant: "success",
          icon: CheckCircle,
        });
        setEmail("");
      } else {
        setAlertInfo({
          message: data.message || "An error occurred. Please try again.",
          variant: data.message.includes("already subscribed")
            ? "warning"
            : "destructive",
          icon: AlertCircle,
        });
        setEmail("");
      }
    } catch (error) {
      setAlertInfo({
        message: "An error occurred. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <Box sx={{ mb: 4, color: "#201F1F" }}>
              <Typography sx={{ mb: 2, color: "#333333" }} variant="overline">
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
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton aria-label="add to favorites" color="primary">
                  <FavoriteBorder />
                </IconButton>
                <ShareFeature post={eventData} />
              </Box>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 0,
                mb: 4,
                borderRadius: "12px",
                backgroundColor: "#",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600, color: "#047481" }}
              >
                Date and time
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EventNote sx={{ mr: 1, color: "#047481" }} />
                <Typography variant="body1">
                  {new Date(eventData.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {new Date(eventData.date).toLocaleTimeString()} (+1GMT)
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600, color: "#047481", mt: 3 }}
              >
                Location
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: "#047481" }} />
                <Typography variant="body1">{eventData.venue}</Typography>
              </Box>
            </Paper>

            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: 600, color: "#047481" }}
            >
              Speakers
            </Typography>
            <Box sx={{ mb: 4 }}>
              <SpeakersCarousel speakers={eventData.speakers || []} />
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 0,
                mb: 4,
                borderRadius: "12px",
                backgroundColor: "",
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, mt: 12, fontWeight: 600, color: "#047481" }}
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
                p: 3,
                mb: 4,
                borderRadius: "12px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: "#047481",
                }}
              >
                Register for this event
              </Typography>

              {/* Flowbite Form */}
              <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                <div>
                  <label
                    htmlFor="full_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
                    placeholder="Your company name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="reason"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Why do you want to attend?
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
                    placeholder="Write your reason here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#198754] text-white px-4 py-2 rounded hover:font-medium  transition-colors flex items-center justify-center hover:border-2 hover:border-[#198754] hover:bg-white hover:text-[#198754]  duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin mr-2" size={20} />
                      Registering...
                    </>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </form>
              {/* End of Flowbite Form */}

              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                {alertInfo && (
                  <Alert variant={alertInfo.variant} className="m-0">
                    <div className="flex items-center gap-2">
                      {alertInfo.icon && (
                        <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
                      )}
                      <AlertDescription>{alertInfo.message}</AlertDescription>
                    </div>
                  </Alert>
                )}
              </Modal>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={3}
              sx={{
                p: 3,
                borderRadius: "12px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Button
                href="https://t.me/credulensubscribers"
                target="_blank"
                variant="contained"
                startIcon={<TelegramIcon />}
                sx={{
                  backgroundColor: "#198754",
                  width: "100%",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "#198754",
                    color: "#198754",
                    border: "1px solid #198754",
                  },
                }}
              >
                Join Our Telegram Community
              </Button>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-3">
                  <label
                    htmlFor="email-subscribe"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Subscribe to our newsletter
                  </label>
                  <input
                    type="email"
                    id="email-subscribe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin mr-2 inline" size={20} />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <hr style={{ margin: "16px 0", border: "1px solid #e0e0e0" }} />
          {relatedEvents.length > 0 ? (
            <RelatedEventsCarousel events={relatedEvents} />
          ) : (
            <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
              No related events found.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SingleEventPost;
