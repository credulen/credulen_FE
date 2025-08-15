// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Paper,
//   Avatar,
//   IconButton,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Skeleton,
//   MenuItem,
//   Menu,
//   CircularProgress,
// } from "@mui/material";
// import {
//   EventNote,
//   LocationOn,
//   ChevronLeft,
//   ChevronRight,
//   FavoriteBorder,
//   Share,
//   ImageOutlined as ImageIcon,
// } from "@mui/icons-material";
// import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import { Bell, CheckCircle, AlertCircle, X, Loader } from "lucide-react";
// import { Alert, AlertDescription } from "../components/tools/Alert";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const RelatedEventsCarousel = ({ events }) => {
//   const scrollRef = useRef(null);
//   const navigate = useNavigate();

//   const scroll = useCallback((scrollOffset) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollLeft += scrollOffset;
//     }
//   }, []);

//   const formatDate = useCallback((dateString) => {
//     const date = new Date(dateString);
//     return date
//       .toLocaleDateString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//       .replace(/(\d+)/, (match) => {
//         const day = parseInt(match);
//         const suffix = ["th", "st", "nd", "rd"][
//           day % 10 > 3 ? 0 : ((day % 100) - 20) % 10 || 3
//         ];
//         return `${day}${suffix}`;
//       });
//   }, []);

//   const handleCardClick = useCallback(
//     (slug) => {
//       navigate(`/event/${slug}`);
//       window.scrollTo(0, 0);
//     },
//     [navigate]
//   );

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography
//         variant="h6"
//         sx={{ mb: 4, fontWeight: 600, color: "#047481" }}
//       >
//         Other events you may like
//       </Typography>
//       <Box sx={{ position: "relative" }}>
//         <Box
//           ref={scrollRef}
//           sx={{
//             display: "flex",
//             overflowX: "auto",
//             scrollBehavior: "smooth",
//             "&::-webkit-scrollbar": { display: "none" },
//             msOverflowStyle: "none",
//             scrollbarWidth: "none",
//             pb: 2,
//           }}
//         >
//           {events.map((event, index) => (
//             <Card
//               key={index}
//               onClick={() => handleCardClick(event.slug)}
//               sx={{
//                 minWidth: 280,
//                 maxWidth: 280,
//                 mr: 2,
//                 flexShrink: 0,
//                 cursor: "pointer",
//                 transition:
//                   "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//                 },
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 sx={{ height: 160, objectFit: "cover" }}
//                 image={`${event.image}`}
//                 alt={event.title}
//               />
//               <CardContent sx={{ p: 2 }}>
//                 <Typography
//                   gutterBottom
//                   variant="h6"
//                   component="div"
//                   noWrap
//                   sx={{ fontWeight: 600, mb: 1 }}
//                 >
//                   {event.title}
//                 </Typography>
//                 <Grid container spacing={1}>
//                   {event && (
//                     <Typography
//                       variant="subtitle2"
//                       sx={{
//                         color:
//                           new Date(event.date) < new Date()
//                             ? "#047481"
//                             : "#198754",
//                         mb: 2,
//                       }}
//                     >
//                       {new Date(event.date) < new Date()
//                         ? `Past Event${
//                             event.eventType === "webinar" &&
//                             event.videoUrl &&
//                             (typeof event.videoUrl === "string"
//                               ? event.videoUrl.trim().length > 0
//                               : event.videoUrl)
//                               ? " - Recording Available"
//                               : ""
//                           }`
//                         : "Upcoming Event"}
//                     </Typography>
//                   )}
//                   <Grid
//                     item
//                     xs={12}
//                     sx={{ display: "flex", alignItems: "center", mb: 1 }}
//                   >
//                     <EventNote
//                       sx={{
//                         fontSize: "small",
//                         color: "text.secondary",
//                         mr: 1,
//                       }}
//                     />
//                     <Typography variant="body2" color="text.secondary">
//                       {formatDate(event.date)}
//                     </Typography>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     sx={{ display: "flex", alignItems: "center" }}
//                   >
//                     <LocationOn
//                       sx={{
//                         fontSize: "small",
//                         color: "text.secondary",
//                         mr: 1,
//                       }}
//                     />
//                     <Typography variant="body2" color="text.secondary" noWrap>
//                       {event.venue}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <IconButton onClick={() => scroll(-300)} sx={{ mx: 1 }}>
//             <ChevronLeft />
//           </IconButton>
//           <IconButton onClick={() => scroll(300)} sx={{ mx: 1 }}>
//             <ChevronRight />
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// const SpeakersCarousel = ({ speakers }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 960,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Slider {...settings}>
//       {speakers.map((speaker, index) => (
//         <Box key={index} sx={{ p: 1 }}>
//           <Card
//             sx={{
//               height: "100%",
//               boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
//             }}
//           >
//             <CardContent sx={{ p: 2 }}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Avatar
//                   src={`${backendURL}${speaker.image}`}
//                   alt={speaker.name}
//                   sx={{ width: 60, height: 60, mr: 2 }}
//                 >
//                   {!speaker.image && <ImageIcon />}
//                 </Avatar>
//                 <Box>
//                   <Typography
//                     variant="subtitle1"
//                     component="div"
//                     sx={{ fontWeight: "bold" }}
//                   >
//                     {speaker.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {speaker.occupation}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {speaker.CoName}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       ))}
//     </Slider>
//   );
// };

// const ShareFeature = ({ post }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleShare = (platform) => {
//     if (!post) {
//       console.error("Post data is not available");
//       return;
//     }
//     const url = encodeURIComponent(window.location.href);
//     const title = encodeURIComponent(post.title);
//     let shareUrl;
//     switch (platform) {
//       case "twitter":
//         shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
//         break;
//       case "facebook":
//         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
//         break;
//       case "linkedin":
//         shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
//         break;
//       case "whatsapp":
//         shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
//         break;
//       default:
//         return;
//     }
//     window.open(shareUrl, "_blank");
//     handleClose();
//   };

//   return (
//     <Box>
//       <IconButton
//         sx={{
//           m: 0,
//           ml: 2,
//           p: 0,
//           borderRadius: "16px",
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//         }}
//         aria-label="share"
//         color="primary"
//         onClick={handleOpen}
//         aria-controls="share-menu"
//         aria-haspopup="true"
//       >
//         <Share />
//       </IconButton>
//       <Menu
//         id="share-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem onClick={() => handleShare("twitter")}>
//           <Twitter fontSize="small" sx={{ color: "#1DA1F2", mr: 1 }} />
//           Twitter
//         </MenuItem>
//         <MenuItem onClick={() => handleShare("facebook")}>
//           <Facebook fontSize="small" sx={{ color: "#4267B2", mr: 1 }} />
//           Facebook
//         </MenuItem>
//         <MenuItem onClick={() => handleShare("linkedin")}>
//           <LinkedIn fontSize="small" sx={{ color: "#0077b5", mr: 1 }} />
//           LinkedIn
//         </MenuItem>
//         <MenuItem onClick={() => handleShare("whatsapp")}>
//           <WhatsApp fontSize="small" sx={{ color: "#25D366", mr: 1 }} />
//           WhatsApp
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };
// // Define components before using them
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-4 max-w-sm w-full relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           aria-label="Close"
//         >
//           <X className="w-5 h-5" />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const LoadingSpinner = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//     <CircularProgress size={40} className="text-btColour" />
//   </div>
// );

// const SingleEventPost = () => {
//   const { slug } = useParams();
//   const [email, setEmail] = useState("");
//   const [relatedEvents, setRelatedEvents] = useState([]);
//   const navigate = useNavigate();
//   const [eventData, setEventData] = useState(null);
//   const [eventDate, setEventDate] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [subLoading, setSubLoading] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [alertInfo, setAlertInfo] = useState(null);

//   const [showVerifyModal, setShowVerifyModal] = useState(false);
//   const [verifyEmail, setVerifyEmail] = useState("");
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verifyAlert, setVerifyAlert] = useState(null);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     company: "",
//     reason: "",
//   });

//   const backendURL =
//     import.meta.env.MODE === "production"
//       ? import.meta.env.VITE_BACKEND_URL
//       : "http://localhost:3001";

//   const handleVerifyEmail = async (e) => {
//     e.preventDefault();
//     setIsVerifying(true);

//     try {
//       const response = await fetch(`${backendURL}/api/verify-registration`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: verifyEmail,
//           slug: eventData.slug,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setVerifyAlert({
//           message: "Verification successful!",
//           variant: "success",
//           icon: CheckCircle,
//         });

//         // Delay navigation to show success message
//         setTimeout(() => {
//           navigate(`/eventVideo/${eventData.slug}`);
//         }, 1500);
//       } else {
//         setVerifyAlert({
//           message: data.message || "Email not found in registration list.",
//           variant: "destructive",
//           icon: AlertCircle,
//         });
//       }
//     } catch (error) {
//       setVerifyAlert({
//         message: "An error occurred. Please try again.",
//         variant: "destructive",
//         icon: AlertCircle,
//       });
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setSubLoading(true);

//       try {
//         const response = await fetch(`${backendURL}/api/newsletter-signup`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setAlertInfo({
//             message: "Subscription successful!",
//             variant: "success",
//             icon: CheckCircle,
//           });
//           setEmail("");
//         } else {
//           setAlertInfo({
//             message: data.message || "An error occurred. Please try again.",
//             variant: data.message.includes("already subscribed")
//               ? "warning"
//               : "destructive",
//             icon: AlertCircle,
//           });
//           setEmail("");
//         }
//       } catch (error) {
//         setAlertInfo({
//           message: "An error occurred. Please try again.",
//           variant: "destructive",
//           icon: AlertCircle,
//         });
//       } finally {
//         setSubLoading(false);
//       }
//     },
//     [email]
//   );

//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   const handleRegisterSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();
//       setSubLoading(true);

//       try {
//         // Check if the event has already passed
//         const eventDate = new Date(eventData.date);
//         const currentDate = new Date();
//         const isPastEvent = eventDate < currentDate;

//         const response = await fetch(`${backendURL}/api/register-event`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ...formData,
//             eventTitle: eventData?.title,
//             slug: eventData?.slug,
//             eventCategory: eventData?.category || eventData?.eventType,
//           }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setAlertInfo({
//             message:
//               "Registration successful! Please check your mail for confirmation and more details",
//             variant: "success",
//             icon: CheckCircle,
//           });
//           setFormData({ fullName: "", email: "", company: "", reason: "" });

//           // Show success message briefly before redirecting
//           setTimeout(() => {
//             if (isPastEvent) {
//               // If it's a past event, redirect to video page
//               navigate(`/eventVideo/${eventData.slug}`);
//             } else {
//               // If it's an upcoming event, show success message or different action
//               setShowModal(true);
//             }
//           }, 1500);
//         } else {
//           setAlertInfo({
//             message: data.message || "Registration failed. Please try again.",
//             variant: "destructive",
//             icon: AlertCircle,
//           });
//           setShowModal(true);
//         }
//       } catch (error) {
//         setAlertInfo({
//           message: "An error occurred. Please try again.",
//           variant: "destructive",
//           icon: AlertCircle,
//         });
//         setShowModal(true);
//       } finally {
//         setSubLoading(false);
//       }
//     },
//     [formData, eventData, navigate]
//   );
//   const fetchEventDetails = useCallback(async (slug) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${backendURL}/api/getEventBySlug/${slug}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log("Fetched event data:", data);
//       setEventData(data);
//       setEventDate(data.date);
//       setLoading(false);

//       // Fetch related events
//       if (data._id) {
//         const category = data.category || data.eventType;
//         if (category) {
//           fetchRelatedEvents(data._id, category);
//         } else {
//           console.warn("No category or eventType found for related events");
//         }
//       } else {
//         console.error("Missing _id in event data:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching event details:", error);
//       setError("Failed to load event details. Please try again later.");
//       setLoading(false);
//     }
//   }, []);

//   const fetchRelatedEvents = useCallback(async (currentEventId, category) => {
//     try {
//       console.log("Fetching related events with:", {
//         currentEventId,
//         category,
//       });
//       const response = await fetch(
//         `${backendURL}/api/related-events?category=${encodeURIComponent(
//           category
//         )}&currentEventId=${currentEventId}`
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log("Related events data:", data);
//       setRelatedEvents(data);
//     } catch (error) {
//       console.error("Error fetching related events:", error);
//       console.warn("Failed to load related events. This is non-critical.");
//     }
//   }, []);

//   useEffect(() => {
//     if (slug) {
//       fetchEventDetails(slug);
//     }
//   }, [slug]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
//   if (!eventData) return <div className="text-center p-4">No event found</div>;

//   return (
//     <>
//       {" "}
//       <Container maxWidth="lg">
//         <Box sx={{ mb: 5, mt: 11 }}>
//           <Box
//             sx={{
//               mb: 4,
//               borderRadius: "16px",
//               overflow: "hidden",
//               boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <img
//               src={`${eventData.image}`}
//               alt="Event Banner"
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 maxHeight: "500px",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={8}>
//               <Box sx={{ mb: 4, color: "#201F1F" }}>
//                 <Typography sx={{ mb: 2, color: "#333333" }} variant="overline">
//                   {new Date(eventData.date).toLocaleDateString("en-US", {
//                     weekday: "long",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </Typography>
//                 <Typography
//                   variant="h3"
//                   component="h1"
//                   sx={{
//                     mb: 2,
//                     fontWeight: 700,
//                     fontSize: {
//                       xs: "h4.fontSize",
//                       sm: "h3.fontSize",
//                     },
//                   }}
//                 >
//                   {eventData.title}
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                   <IconButton aria-label="add to favorites" color="primary">
//                     <FavoriteBorder />
//                   </IconButton>
//                   <ShareFeature post={eventData} />
//                 </Box>
//               </Box>

//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 0,
//                   mb: 4,
//                   borderRadius: "12px",
//                   backgroundColor: "#",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{ mb: 2, fontWeight: 600, color: "#047481" }}
//                 >
//                   Date and time
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <EventNote sx={{ mr: 1, color: "#047481" }} />
//                   <Typography variant="body1">
//                     {new Date(eventData.date).toLocaleDateString("en-US", {
//                       weekday: "long",
//                       month: "long",
//                       day: "numeric",
//                     })}{" "}
//                     at {new Date(eventData.date).toLocaleTimeString()} (+1GMT)
//                     <span className="text-red-300">
//                       {" "}
//                       {new Date(eventData.date) < new Date()
//                         ? `Past Event${
//                             eventData.eventType === "webinar" &&
//                             eventData.videoUrl &&
//                             (typeof eventData.videoUrl === "string"
//                               ? eventData.videoUrl.trim().length > 0
//                               : eventData.videoUrl)
//                               ? " - Recording Available"
//                               : ""
//                           }`
//                         : ""}
//                     </span>
//                   </Typography>
//                 </Box>
//                 <Typography
//                   variant="h6"
//                   sx={{ mb: 2, fontWeight: 600, color: "#047481", mt: 3 }}
//                 >
//                   Location
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                   <LocationOn sx={{ mr: 1, color: "#047481" }} />
//                   <Typography variant="body1">{eventData.venue}</Typography>
//                 </Box>
//               </Paper>

//               <Typography
//                 variant="h5"
//                 sx={{ mb: 3, fontWeight: 600, color: "#047481" }}
//               >
//                 Speakers
//               </Typography>
//               <Box sx={{ mb: 4 }}>
//                 <SpeakersCarousel speakers={eventData.speakers || []} />
//               </Box>

//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 0,
//                   mb: 4,
//                   borderRadius: "12px",
//                   backgroundColor: "",
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   sx={{ mb: 3, mt: 12, fontWeight: 600, color: "#047481" }}
//                 >
//                   About this event
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   paragraph
//                   dangerouslySetInnerHTML={{ __html: eventData.content }}
//                 />
//               </Paper>

//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3,
//                   mb: 4,
//                   borderRadius: "12px",
//                   backgroundColor: "#f5f5f5",
//                 }}
//               >
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     mb: 3,
//                     fontWeight: 600,
//                     color: "#047481",
//                   }}
//                 >
//                   Register for this event
//                 </Typography>

//                 {/* Flowbite Form */}
//                 <form className="space-y-4" onSubmit={handleRegisterSubmit}>
//                   <div>
//                     <label
//                       htmlFor="full_name"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
//                       placeholder="Enter your full name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="company"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Company
//                     </label>
//                     <input
//                       type="text"
//                       id="company"
//                       name="company"
//                       value={formData.company}
//                       onChange={handleInputChange}
//                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
//                       placeholder="Your company name"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="reason"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Why do you want to attend?
//                     </label>
//                     <textarea
//                       id="reason"
//                       name="reason"
//                       value={formData.reason}
//                       onChange={handleInputChange}
//                       rows="4"
//                       className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-700 focus:border-teal-700  dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-white "
//                       placeholder="Write your reason here..."
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     className="bg-[#198754] text-white px-4 py-2 rounded hover:font-medium  transition-colors flex items-center justify-center hover:border-2 hover:border-[#198754] hover:bg-white hover:text-[#198754]  duration-300"
//                     disabled={subLoading}
//                   >
//                     {subLoading ? (
//                       <>
//                         <Loader className="animate-spin mr-2" size={20} />
//                         Registering...
//                       </>
//                     ) : (
//                       "Register Now"
//                     )}
//                   </button>
//                 </form>

//                 {new Date(eventData.date) < new Date() &&
//                   eventData.eventType === "webinar" &&
//                   eventData.videoUrl && (
//                     <div className="mt-4">
//                       <button
//                         onClick={() => setShowVerifyModal(true)}
//                         className="text-sm text-teal-600 hover:text-teal-800 hover:underline"
//                       >
//                         Already registered? Watch recorded video
//                       </button>

//                       <Modal
//                         isOpen={showVerifyModal}
//                         onClose={() => setShowVerifyModal(false)}
//                       >
//                         <div className="p-6">
//                           <h3 className="text-lg font-medium mb-4">
//                             Verify Registration
//                           </h3>
//                           <form
//                             onSubmit={handleVerifyEmail}
//                             className="space-y-4"
//                           >
//                             <div>
//                               <label
//                                 htmlFor="verify-email"
//                                 className="block text-sm font-medium text-gray-700 mb-1"
//                               >
//                                 Enter your registered email
//                               </label>
//                               <input
//                                 type="email"
//                                 id="verify-email"
//                                 className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
//                                 value={verifyEmail}
//                                 onChange={(e) => setVerifyEmail(e.target.value)}
//                                 placeholder="Enter your email"
//                                 required
//                               />
//                             </div>

//                             <button
//                               type="submit"
//                               className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center"
//                               disabled={isVerifying}
//                             >
//                               {isVerifying ? (
//                                 <>
//                                   <Loader
//                                     className="animate-spin mr-2"
//                                     size={20}
//                                   />
//                                   Verifying...
//                                 </>
//                               ) : (
//                                 "Verify & Watch"
//                               )}
//                             </button>

//                             {verifyAlert && (
//                               <Alert
//                                 variant={verifyAlert.variant}
//                                 className="mt-4"
//                               >
//                                 <div className="flex items-center gap-2">
//                                   <verifyAlert.icon className="h-5 w-5 flex-shrink-0" />
//                                   <AlertDescription>
//                                     {verifyAlert.message}
//                                   </AlertDescription>
//                                 </div>
//                               </Alert>
//                             )}
//                           </form>
//                         </div>
//                       </Modal>
//                     </div>
//                   )}
//                 {/* End of Flowbite Form */}

//                 <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//                   {alertInfo && (
//                     <Alert variant={alertInfo.variant} className="m-0">
//                       <div className="flex items-center gap-2">
//                         {alertInfo.icon && (
//                           <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
//                         )}
//                         <AlertDescription>{alertInfo.message}</AlertDescription>
//                       </div>
//                     </Alert>
//                   )}
//                 </Modal>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 gap={3}
//                 sx={{
//                   p: 3,
//                   borderRadius: "12px",
//                   backgroundColor: "#f5f5f5",
//                 }}
//               >
//                 <Button
//                   href="https://t.me/credulensubscribers"
//                   target="_blank"
//                   variant="contained"
//                   startIcon={<TelegramIcon />}
//                   sx={{
//                     backgroundColor: "#198754",
//                     width: "100%",
//                     transition: "all 0.3s ease-in-out",
//                     "&:hover": {
//                       backgroundColor: "transparent",
//                       borderColor: "#198754",
//                       color: "#198754",
//                       border: "1px solid #198754",
//                     },
//                   }}
//                 >
//                   Join Our Telegram Community
//                 </Button>

//                 <form onSubmit={handleSubmit} className="w-full">
//                   <div className="mb-3">
//                     <label
//                       htmlFor="email-subscribe"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Subscribe to our newsletter
//                     </label>
//                     <input
//                       type="email"
//                       id="email-subscribe"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter your email address"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
//                     disabled={subLoading}
//                   >
//                     {subLoading ? (
//                       <>
//                         <Loader
//                           className="animate-spin mr-2 inline"
//                           size={20}
//                         />
//                         Subscribing...
//                       </>
//                     ) : (
//                       "Subscribe"
//                     )}
//                   </button>
//                   {alertInfo && (
//                     <div
//                       className={`mt-4 p-4 rounded-lg ${
//                         alertInfo.variant === "success"
//                           ? "bg-green-100 text-green-800"
//                           : alertInfo.variant === "warning"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       <alertInfo.icon className="inline mr-2" size={20} />
//                       {alertInfo.message}
//                     </div>
//                   )}
//                 </form>
//               </Box>
//             </Grid>
//           </Grid>

//           <Box sx={{ mt: 6 }}>
//             <hr style={{ margin: "16px 0", border: "1px solid #e0e0e0" }} />
//             {relatedEvents.length > 0 ? (
//               <RelatedEventsCarousel events={relatedEvents} />
//             ) : (
//               <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
//                 No related events found.
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default SingleEventPost;

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  CircularProgress,
  Chip,
  Divider,
  Badge,
} from "@mui/material";
import {
  EventNote,
  LocationOn,
  ChevronLeft,
  ChevronRight,
  FavoriteBorder,
  Share,
  ImageOutlined as ImageIcon,
  CalendarToday,
  AccessTime,
  People,
  Language,
  Event,
  Download,
  Person,
  Business,
  Phone,
  Work,
} from "@mui/icons-material";
import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  X,
  Loader,
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  Video,
  Star,
  Award,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/tools/Alert";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

// Related Events Carousel Component
const RelatedEventsCarousel = ({ events }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = useCallback((scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  }, []);

  const formatDate = useCallback((dateString) => {
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
  }, []);

  const handleCardClick = useCallback(
    (slug) => {
      navigate(`/event/${slug}`);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#047481",
          textAlign: "center",
          fontSize: { xs: "1.5rem", md: "2rem" },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "3px",
            backgroundColor: "#047481",
            borderRadius: "2px",
          },
        }}>
        Related Events
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
            gap: 2,
            px: { xs: 1, md: 3 },
          }}>
          {events.map((event, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(event.slug)}
              sx={{
                minWidth: { xs: 200, sm: 250, md: 320 },
                maxWidth: { xs: 200, sm: 250, md: 320 },
                flexShrink: 0,
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 20px rgba(4, 116, 129, 0.1)",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(4, 116, 129, 0.2)",
                },
              }}>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  sx={{ height: { xs: 120, md: 180 }, objectFit: "cover" }}
                  image={`${event.image}`}
                  alt={event.title}
                />
                <Chip
                  label={
                    new Date(event.date) < new Date()
                      ? "Past Event"
                      : "Upcoming"
                  }
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor:
                      new Date(event.date) < new Date() ? "#047481" : "#198754",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    lineHeight: 1.2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                  {event.title}
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Calendar size={14} color="#047481" />
                    <Typography
                      variant="body2"
                      sx={{
                        ml: 1,
                        color: "text.secondary",
                        fontSize: "0.75rem",
                      }}>
                      {formatDate(event.date)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <MapPin size={14} color="#047481" />
                    <Typography
                      variant="body2"
                      sx={{
                        ml: 1,
                        color: "text.secondary",
                        fontSize: "0.75rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {event.venue}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 1,
            display: { xs: "none", md: "flex" }, // Hide on mobile
          }}>
          <IconButton
            onClick={() => scroll(-320)}
            sx={{
              backgroundColor: "#047481",
              color: "white",
              "&:hover": { backgroundColor: "#035961" },
              fontSize: "0.875rem",
            }}>
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => scroll(320)}
            sx={{
              backgroundColor: "#047481",
              color: "white",
              "&:hover": { backgroundColor: "#035961" },
              fontSize: "0.875rem",
            }}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

// Speakers Carousel Component
const SpeakersCarousel = ({ speakers }) => {
  if (!speakers || speakers.length === 0) return null;

  if (speakers.length === 1) {
    const speaker = speakers[0];
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Card
          sx={{
            maxWidth: { xs: 300, md: 500 },
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(4, 116, 129, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 40px rgba(4, 116, 129, 0.2)",
            },
          }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={speaker.image}
                alt={speaker.name}
                sx={{
                  width: { xs: 50, md: 80 },
                  height: { xs: 50, md: 80 },
                  mr: 2,
                  border: "3px solid #047481",
                }}>
                {!speaker.image && <ImageIcon />}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 700, color: "#047481", fontSize: "1rem" }}>
                  {speaker.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                  {speaker.occupation}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#198754",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}>
                  {speaker.CoName}
                </Typography>
              </Box>
            </Box>
            {speaker.bio && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}>
                {speaker.bio}
              </Typography>
            )}
            <Chip
              icon={<Star size={14} />}
              label="Featured Speaker"
              sx={{
                backgroundColor: "#047481",
                color: "white",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          </CardContent>
        </Card>
      </Box>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(speakers.length, 3),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 960, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };

  return (
    <Box
      sx={{
        "& .slick-dots": {
          bottom: "-40px",
          "& li button:before": { color: "#047481", fontSize: "10px" },
          "& li.slick-active button:before": { color: "#047481" },
        },
        "& .slick-prev, & .slick-next": {
          zIndex: 2,
          "&:before": { fontSize: "20px", color: "#047481" },
        },
        "& .slick-prev": { left: { xs: "-20px", md: "-40px" } },
        "& .slick-next": { right: { xs: "-20px", md: "-40px" } },
        ...(speakers.length <= 3 && {
          "& .slick-prev, & .slick-next": { display: "none !important" },
        }),
      }}>
      <Slider {...settings}>
        {speakers.map((speaker, index) => (
          <Box key={speaker._id || index} sx={{ p: 1 }}>
            <Card
              sx={{
                height: "100%",
                minHeight: 250,
                borderRadius: "16px",
                boxShadow: "0 8px 30px rgba(4, 116, 129, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(4, 116, 129, 0.2)",
                },
                mx: 0.5,
              }}>
              <CardContent
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 1,
                    flex: 1,
                  }}>
                  <Avatar
                    src={speaker.image}
                    alt={speaker.name}
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 2,
                      border: "3px solid #047481",
                    }}>
                    {!speaker.image && <ImageIcon />}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        color: "#047481",
                        fontSize: "0.9rem",
                      }}>
                      {speaker.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                      {speaker.occupation}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#198754",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}>
                      {speaker.CoName}
                    </Typography>
                  </Box>
                </Box>
                {speaker.bio && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 1,
                      fontSize: "0.75rem",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                    {speaker.bio}
                  </Typography>
                )}
                <Box sx={{ mt: "auto" }}>
                  <Chip
                    icon={<Star size={14} />}
                    label="Speaker"
                    sx={{
                      backgroundColor: "#047481",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

// // Share Feature Component
// const ShareFeature = ({ post }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleShare = (platform) => {
//     if (!post) return;
//     const url = encodeURIComponent(window.location.href);
//     const title = encodeURIComponent(post.title);
//     const shareUrl = {
//       twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
//       linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
//       whatsapp: `https://api.whatsapp.com/send?text=${title} ${url}`,
//     }[platform];
//     window.open(shareUrl, "_blank");
//     handleClose();
//   };

//   return (
//     <Box>
//       <IconButton
//         sx={{
//           backgroundColor: "#047481",
//           color: "white",
//           borderRadius: "12px",
//           padding: "8px",
//           "&:hover": { backgroundColor: "#035961", transform: "scale(1.05)" },
//           transition: "all 0.3s ease",
//         }}
//         onClick={handleOpen}
//         aria-label="share">
//         <Share />
//       </IconButton>
//       <Menu
//         id="share-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             borderRadius: "12px",
//             boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
//           },
//         }}>
//         <MenuItem onClick={() => handleShare("twitter")}>
//           <Twitter fontSize="small" sx={{ color: "#1DA1F2", mr: 1 }} /> Twitter
//         </MenuItem>
//         <MenuItem onClick={() => handleShare("facebook")}>
//           <Facebook fontSize="small" sx={{ color: "#4267B2", mr: 1 }} />{" "}
//           Facebook
//         </MenuItem>
//         <MenuItem onClick={() => handleShare("linkedin")}>
//           <LinkedIn fontSize="small" sx={{ color: "#0077b5", mr: 1 }} />{" "}
//           LinkedIn
//         </MenuItem>
//         <MenuItem onClick={() => handleShare("whatsapp")}>
//           <WhatsApp fontSize="small" sx={{ color: "#25D366", mr: 1 }} />{" "}
//           WhatsApp
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

const ShareFeature = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleShare = (platform) => {
    if (!post) return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const shareUrl = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title} ${url}`,
    }[platform];
    // Navigate directly to the share URL in the same tab
    window.location.href = shareUrl;
    // Alternatively, to open in a new tab (commented out):
    // window.open(shareUrl, "_blank");
    handleClose();
  };

  return (
    <Box>
      <IconButton
        sx={{
          backgroundColor: "#047481",
          color: "white",
          borderRadius: "12px",
          padding: "8px",
          "&:hover": { backgroundColor: "#035961", transform: "scale(1.05)" },
          transition: "all 0.3s ease",
        }}
        onClick={handleOpen}
        aria-label="share">
        <Share />
      </IconButton>
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          },
        }}>
        <MenuItem onClick={() => handleShare("twitter")}>
          <Twitter fontSize="small" sx={{ color: "#1DA1F2", mr: 1 }} /> Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShare("facebook")}>
          <Facebook fontSize="small" sx={{ color: "#4267B2", mr: 1 }} />{" "}
          Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShare("linkedin")}>
          <LinkedIn fontSize="small" sx={{ color: "#0077b5", mr: 1 }} />{" "}
          LinkedIn
        </MenuItem>
        <MenuItem onClick={() => handleShare("whatsapp")}>
          <WhatsApp fontSize="small" sx={{ color: "#25D366", mr: 1 }} />{" "}
          WhatsApp
        </MenuItem>
      </Menu>
    </Box>
  );
};

// Add to Calendar Component
const AddToCalendar = ({ eventData }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const formatDateForCalendar = (date) =>
    new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const generateCalendarUrl = (type) => {
    const startDate = formatDateForCalendar(eventData.date);
    const endDate = formatDateForCalendar(
      new Date(new Date(eventData.date).getTime() + 2 * 60 * 60 * 1000)
    );
    const title = encodeURIComponent(eventData.title);
    const details = encodeURIComponent(
      `${eventData.content.replace(/<[^>]*>/g, "").substring(0, 200)}...`
    );
    const location = encodeURIComponent(eventData.venue);

    return {
      google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`,
      outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&body=${details}&location=${location}`,
      yahoo: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${startDate}&dur=0200&desc=${details}&in_loc=${location}`,
    }[type];
  };

  const downloadICS = () => {
    const startDate = new Date(eventData.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Event Calendar//EN
BEGIN:VEVENT
UID:${Date.now()}@event.com
DTSTAMP:${formatDateForCalendar(new Date())}
DTSTART:${formatDateForCalendar(startDate)}
DTEND:${formatDateForCalendar(endDate)}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
LOCATION:${eventData.venue}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventData.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    handleClose();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<CalendarToday />}
        onClick={handleOpen}
        sx={{
          borderColor: "#047481",
          color: "#047481",
          borderWidth: 2,
          borderRadius: "12px",
          fontWeight: 600,
          padding: "8px 16px",
          fontSize: "0.875rem",
          "&:hover": {
            backgroundColor: "#047481",
            color: "white",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}>
        Add to Calendar
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          },
        }}>
        <MenuItem
          onClick={() => window.open(generateCalendarUrl("google"), "_blank")}>
          <Event sx={{ mr: 1, color: "#4285f4" }} /> Google Calendar
        </MenuItem>
        <MenuItem
          onClick={() => window.open(generateCalendarUrl("outlook"), "_blank")}>
          <Event sx={{ mr: 1, color: "#0078d4" }} /> Outlook Calendar
        </MenuItem>
        <MenuItem
          onClick={() => window.open(generateCalendarUrl("yahoo"), "_blank")}>
          <Event sx={{ mr: 1, color: "#7B0099" }} /> Yahoo Calendar
        </MenuItem>
        <MenuItem onClick={downloadICS}>
          <Download sx={{ mr: 1, color: "#198754" }} /> Download ICS
        </MenuItem>
      </Menu>
    </Box>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-2xl p-4 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1"
          aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <CircularProgress size={50} sx={{ color: "#047481" }} />
  </div>
);

// Main SingleEventPost Component
const SingleEventPost = () => {
  const { slug } = useParams();
  const [email, setEmail] = useState("");
  const [relatedEvents, setRelatedEvents] = useState([]);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [eventDate, setEventDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyAlert, setVerifyAlert] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    countryOfResidence: "",
    careerStatus: "",
    interestAndAim: "",
    managesImmigrantCommunity: false,
    company: "",
  });

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const response = await fetch(`${backendURL}/api/verify-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verifyEmail, slug: eventData.slug }),
      });
      const data = await response.json();
      if (response.ok) {
        setVerifyAlert({
          message: "Verification successful!",
          variant: "success",
          icon: CheckCircle,
        });
        setTimeout(() => navigate(`/eventVideo/${eventData.slug}`), 1500);
      } else {
        setVerifyAlert({
          message: data.message || "Email not found in registration list.",
          variant: "destructive",
          icon: AlertCircle,
        });
      }
    } catch (error) {
      setVerifyAlert({
        message: "An error occurred. Please try again.",
        variant: "destructive",
        icon: AlertCircle,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubLoading(true);
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
        setSubLoading(false);
      }
    },
    [email]
  );

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleRegisterSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubLoading(true);
      try {
        const eventDate = new Date(eventData.date);
        const currentDate = new Date();
        const isPastEvent = eventDate < currentDate;

        const response = await fetch(`${backendURL}/api/register-event`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            eventTitle: eventData?.title,
            slug: eventData?.slug,
            eventCategory: eventData?.category || eventData?.eventType,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setAlertInfo({
            message:
              "Registration successful! Please check your mail for confirmation and more details",
            variant: "success",
            icon: CheckCircle,
          });
          setFormData({
            fullName: "",
            email: "",
            mobileNumber: "",
            countryOfResidence: "",
            careerStatus: "",
            interestAndAim: "",
            managesImmigrantCommunity: false,
            company: "",
          });

          setTimeout(() => {
            if (isPastEvent) {
              navigate(`/eventVideo/${eventData.slug}`);
            } else {
              setShowModal(true);
            }
          }, 1500);
        } else {
          setAlertInfo({
            message: data.message || "Registration failed. Please try again.",
            variant: "destructive",
            icon: AlertCircle,
          });
          setShowModal(true);
        }
      } catch (error) {
        setAlertInfo({
          message: "An error occurred. Please try again.",
          variant: "destructive",
          icon: AlertCircle,
        });
        setShowModal(true);
      } finally {
        setSubLoading(false);
      }
    },
    [formData, eventData, navigate]
  );

  const fetchEventDetails = useCallback(async (slug) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/getEventBySlug/${slug}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setEventData(data);
      setEventDate(data.date);
      setLoading(false);
      if (data._id) {
        const category = data.category || data.eventType;
        if (category) fetchRelatedEvents(data._id, category);
      }
    } catch (error) {
      setError("Failed to load event details. Please try again later.");
      setLoading(false);
    }
  }, []);

  const fetchRelatedEvents = useCallback(async (currentEventId, category) => {
    try {
      const response = await fetch(
        `${backendURL}/api/related-events?category=${encodeURIComponent(
          category
        )}&currentEventId=${currentEventId}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setRelatedEvents(data);
    } catch (error) {
      console.warn("Failed to load related events. This is non-critical.");
    }
  }, []);

  useEffect(() => {
    if (slug) fetchEventDetails(slug);
  }, [slug, fetchEventDetails]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!eventData) return <div className="text-center p-4">No event found</div>;

  const isUpcoming = new Date(eventData.date) >= new Date();
  const isPastWithVideo =
    !isUpcoming && eventData.eventType === "webinar" && eventData.videoUrl;

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: { xs: 4, md: 12 }, mb: 4, px: { xs: 1, md: 3 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 4,
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 60px rgba(4, 116, 129, 0.15)",
        }}>
        <Box
          sx={{
            position: "relative",
            height: { xs: 200, md: 500 },
            background: `linear-gradient(135deg, rgba(4, 116, 129, 0.8), rgba(25, 135, 84, 0.8)), url(${eventData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}>
          <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "800px" }}>
            <Chip
              label={isUpcoming ? "Upcoming Event" : "Past Event"}
              sx={{
                backgroundColor: isUpcoming ? "#198754" : "#047481",
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "0.75rem", md: "1rem" },
                mb: 2,
                px: 1,
                py: 0.5,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: "1.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}>
              {eventData.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: "600px",
                mx: "auto",
                fontSize: { xs: "0.75rem", md: "1rem" },
                lineHeight: 1.4,
              }}>
              {new Date(eventData.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at{" "}
              {new Date(eventData.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              WAT
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Event Actions */}
          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            <IconButton
              sx={{
                backgroundColor: "#ff4757",
                color: "white",
                borderRadius: "12px",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "#ff3742",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}>
              <FavoriteBorder />
            </IconButton>
            <ShareFeature post={eventData} />
            <AddToCalendar eventData={eventData} />
          </Box>

          {/* Event Details Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  border: "2px solid #047481",
                  backgroundColor: "#f8fdff",
                  height: "100%",
                }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Calendar size={20} color="#047481" />
                  <Typography
                    variant="h6"
                    sx={{
                      ml: 1,
                      fontWeight: 700,
                      color: "#047481",
                      fontSize: "1rem",
                    }}>
                    Date & Time
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mb: 0.5, fontWeight: 600, fontSize: "0.875rem" }}>
                  {new Date(eventData.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}>
                  {new Date(eventData.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  WAT
                </Typography>
                {isPastWithVideo && (
                  <Chip
                    icon={<Video size={14} />}
                    label="Recording Available"
                    sx={{
                      mt: 1,
                      backgroundColor: "#198754",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  border: "2px solid #198754",
                  backgroundColor: "#f8fff9",
                  height: "100%",
                }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <MapPin size={20} color="#198754" />
                  <Typography
                    variant="h6"
                    sx={{
                      ml: 1,
                      fontWeight: 700,
                      color: "#198754",
                      fontSize: "1rem",
                    }}>
                    Location
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                  {eventData.venue}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}>
                  {eventData.eventType === "webinar"
                    ? "Online Event"
                    : "Physical Event"}
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Speakers Section */}
          {eventData.speakers && eventData.speakers.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "#047481",
                  textAlign: "center",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80px",
                    height: "3px",
                    backgroundColor: "#047481",
                    borderRadius: "2px",
                  },
                }}>
                Featured Speakers
              </Typography>
              <SpeakersCarousel speakers={eventData.speakers} />
            </Box>
          )}

          {/* About Event */}
          <Card
            sx={{
              p: 2,
              mb: 4,
              borderRadius: "20px",
              boxShadow: "0 10px 40px rgba(4, 116, 129, 0.1)",
            }}>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#047481",
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "2rem" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "3px",
                  backgroundColor: "#047481",
                  borderRadius: "2px",
                },
              }}>
              About This Event
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                fontSize: { xs: "0.875rem", md: "1rem" },
                color: "text.primary",
                "& p": { mb: 1 },
                "& ul": { pl: 2, mb: 1 },
                "& li": { mb: 0.5 },
              }}
              dangerouslySetInnerHTML={{ __html: eventData.content }}
            />
          </Card>

          {/* Enhanced Registration Form */}
          <Card
            sx={{
              p: 2,
              borderRadius: "20px",
              background: "linear-gradient(135deg, #f8fdff 0%, #f0f9ff 100%)",
              border: "2px solid #047481",
              boxShadow: "0 15px 50px rgba(4, 116, 129, 0.15)",
            }}>
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: 700,
                color: "#047481",
                textAlign: "center",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}>
              {isUpcoming ? "Secure Your Spot" : "Access Event Content"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                textAlign: "center",
                color: "text.secondary",
                maxWidth: "400px",
                mx: "auto",
                fontSize: { xs: "0.75rem", md: "0.875rem" },
              }}>
              {isUpcoming
                ? "Register now to secure a spot and get a reminder"
                : "Register to access the recorded session and resources"}
            </Typography>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors bg-white"
                      placeholder="Enter your email"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors bg-white"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      name="countryOfResidence"
                      value={formData.countryOfResidence}
                      onChange={handleInputChange}
                      className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors bg-white"
                      placeholder="Enter your country"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Career Status *
                    </label>
                    <select
                      name="careerStatus"
                      value={formData.careerStatus}
                      onChange={handleInputChange}
                      className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors bg-white"
                      required>
                      <option value="">Select career status</option>
                      <option value="Employed">Employed</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Student">Student</option>
                      <option value="Solopreneur">Solopreneur</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                    </select>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Interest & Aim *
                    </label>
                    <textarea
                      name="interestAndAim"
                      value={formData.interestAndAim}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors bg-white resize-none"
                      placeholder="Why are you attending?"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Manage Immigrant Community? *
                    </label>
                    <input
                      type="checkbox"
                      name="managesImmigrantCommunity"
                      checked={formData.managesImmigrantCommunity}
                      onChange={handleInputChange}
                      className="mr-1 leading-tight"
                    />
                    <span className="text-[0.875rem] text-gray-700">Yes</span>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <label className="block mb-0.5 text-gray-800 font-semibold text-[0.75rem]">
                      Who reffered you? (Optional)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors bg-white"
                      placeholder="Name or how did you hear about us"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <button
                  type="submit"
                  className="bg-[#198754] text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
                  disabled={subLoading}>
                  {subLoading ? (
                    <>
                      <Loader className="animate-spin mr-1 inline" size={16} />
                      Processing...
                    </>
                  ) : (
                    <>
                      {isUpcoming ? "Register Now" : "Access Content"}
                      <Award className="inline ml-1" size={16} />
                    </>
                  )}
                </button>
              </Box>
            </form>

            {isPastWithVideo && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <button
                  onClick={() => setShowVerifyModal(true)}
                  className="text-teal-600 hover:text-teal-800 font-medium text-sm hover:underline transition-colors">
                  Already registered? Watch recorded video →
                </button>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: "sticky", top: { xs: 10, md: 100 } }}>
            {/* Quick Info Card */}
            <Card
              sx={{
                p: 2,
                mb: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #047481 0%, #198754 100%)",
                color: "white",
              }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textAlign: "center",
                  fontSize: "1rem",
                }}>
                Event Quick Info
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Users size={16} />
                  <Typography sx={{ ml: 1, fontSize: "0.75rem" }}>
                    {eventData.eventType === "webinar"
                      ? "Virtual Event"
                      : "In-Person Event"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Globe size={16} />
                  <Typography sx={{ ml: 1, fontSize: "0.75rem" }}>
                    {eventData.category || eventData.eventType}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Clock size={16} />
                  <Typography sx={{ ml: 1, fontSize: "0.75rem" }}>
                    2+ hours duration
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Community & Newsletter */}
            <Card
              sx={{
                p: 2,
                borderRadius: "20px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#047481",
                  textAlign: "center",
                  fontSize: "1rem",
                }}>
                Stay Connected
              </Typography>

              <Button
                href="https://t.me/credulensubscribers"
                target="_blank"
                variant="contained"
                startIcon={<TelegramIcon />}
                fullWidth
                sx={{
                  mb: 2,
                  py: 1,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #198754 0%, #047481 100%)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(25, 135, 84, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}>
                Join Our Telegram Community
              </Button>

              <Divider sx={{ my: 2 }} />

              <form onSubmit={handleSubmit}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "#047481",
                    fontSize: "0.875rem",
                  }}>
                  Subscribe to Newsletter
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <input
                    type="email"
                    className="w-full p-2 text-[0.875rem] border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <button
                  type="submit"
                  className="w-auto hover:bg-teal-600 bg-teal-700 text-white py-2 px-4 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  disabled={subLoading}>
                  {subLoading ? (
                    <>
                      <Loader className="animate-spin mr-1 inline" size={16} />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe Now
                      <Bell className="inline ml-1" size={14} />
                    </>
                  )}
                </button>

                {alertInfo && (
                  <Box
                    sx={{
                      mt: 1,
                      p: 1,
                      borderRadius: "8px",
                      backgroundColor:
                        alertInfo.variant === "success"
                          ? "#d4edda"
                          : alertInfo.variant === "warning"
                          ? "#fff3cd"
                          : "#f8d7da",
                      color:
                        alertInfo.variant === "success"
                          ? "#155724"
                          : alertInfo.variant === "warning"
                          ? "#856404"
                          : "#721c24",
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <alertInfo.icon size={16} className="mr-1 flex-shrink-0" />
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {alertInfo.message}
                    </Typography>
                  </Box>
                )}
              </form>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <RelatedEventsCarousel events={relatedEvents} />
      )}

      {/* Modals */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {alertInfo && (
          <Alert variant={alertInfo.variant} className="m-0">
            <div className="flex items-center gap-2">
              {alertInfo.icon && (
                <alertInfo.icon className="h-5 w-5 flex-shrink-0" />
              )}
              <AlertDescription className="text-sm">
                {alertInfo.message}
              </AlertDescription>
            </div>
          </Alert>
        )}
      </Modal>

      <Modal isOpen={showVerifyModal} onClose={() => setShowVerifyModal(false)}>
        <div className="text-center">
          <div className="bg-teal-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
            <Video className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="text-lg font-bold mb-1 text-gray-900">
            Access Recorded Session
          </h3>
          <p className="text-gray-600 mb-3 text-sm">
            Verify your registration to watch the recorded event
          </p>

          <form onSubmit={handleVerifyEmail} className="space-y-2">
            <div className="text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-0.5">
                Registered Email Address
              </label>
              <input
                type="email"
                className="w-full p-2 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:outline-none transition-colors text-[0.875rem]"
                value={verifyEmail}
                onChange={(e) => setVerifyEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
              disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <Loader className="animate-spin mr-1" size={16} />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Watch
                  <Video className="ml-1" size={16} />
                </>
              )}
            </button>

            {verifyAlert && (
              <Alert variant={verifyAlert.variant} className="mt-2">
                <div className="flex items-center gap-1">
                  <verifyAlert.icon className="h-4 w-4 flex-shrink-0" />
                  <AlertDescription className="text-sm">
                    {verifyAlert.message}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </form>
        </div>
      </Modal>
    </Container>
  );
};

export default SingleEventPost;
