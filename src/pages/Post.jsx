import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Snackbar, Alert, Grid } from "@mui/material";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import EmojiPicker from "emoji-picker-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import {
  Typography,
  Box,
  Chip,
  Divider,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
} from "@mui/material";
import { ChevronRight, Calendar, Eye, ArrowRight } from "lucide-react";
import { CircularProgress } from "@mui/material";
import { Favorite, FavoriteBorder, Image } from "@mui/icons-material";
import {
  ThumbUp,
  Edit,
  Delete,
  Send,
  ChatBubbleOutline,
  MoreVert,
  Close,
  Reply,
  Margin,
} from "@mui/icons-material";
import { TextInput, Button } from "flowbite-react";
import { Smile, X } from "lucide-react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import moment from "moment";
import { styled } from "@mui/system";
import "../index.css";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#ffffff",
}));

export const RelatedPosts = ({ category, currentPostId }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch(
          `${backendURL}/api/related-posts?category=${encodeURIComponent(
            category
          )}&currentPostId=${currentPostId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch related posts");
        }
        const data = await response.json();
        setRelatedPosts(data);
        console.log(data, relatedPosts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    if (category && currentPostId) {
      fetchRelatedPosts();
    }
  }, [category, currentPostId]);

  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
  };

  return (
    <Box className="mt-8 w-full">
      <h3 variant="h5" className="mb-4 font-semibold text-xl text-btColour">
        Related Posts
      </h3>

      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 minilg:grid-cols-1">
        {relatedPosts.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No related posts available.
          </Typography>
        ) : (
          relatedPosts.map((post) => (
            <Card
              key={post._id}
              className="flex flex-col cursor-pointer transition-all duration-300 ease-in-out 

                       hover:shadow-md hover:border-gray-300"
              onClick={() => handlePostClick(post.slug)}
            >
              <CardContent className="flex-grow p-4">
                <Typography
                  className="font-semibold mb-2 hover:text-btColour hover:scale-105 transition-all duration-300 ease-in"
                  variant="h6"
                >
                  {post.title}
                </Typography>

                <Box className="flex items-center mb-2">
                  <Avatar
                    src={`${backendURL}${post.authorId?.image}`}
                    alt={post.authorId?.name}
                    sx={{ width: 24, height: 24, mr: 1 }} // 3rem size adjustment
                  />

                  <Typography variant="body2" className="text-gray-600">
                    {post.authorId?.name}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  className="text-gray-500 mb-2 block"
                >
                  {moment(post.createdAt).format("MMMM D, YYYY")}
                </Typography>

                <Box className="flex items-center text-gray-500 mt-1">
                  <FavoriteBorder
                    fontSize="small"
                    sx={{ fontSize: 16, mr: 0.3 }}
                  />

                  <Typography variant="caption" sx={{}}>
                    {post.likes ? post.likes.length : 0} likes{" "}
                    <span className="mx-2">|</span>
                  </Typography>

                  <ChatBubbleOutline
                    fontSize="small"
                    sx={{ fontSize: 16, mr: 0.3, ml: 0 }}
                  />

                  <Typography variant="caption">
                    {post.comments ? post.comments.length : 0} comments
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Box>
  );
};

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Button1 = ({ children, onClick, primary, className, ...props }) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200";
  const primaryStyle = "bg-[#198754] hover:bg-[#15704a] text-white";
  const secondaryStyle =
    "bg-white border-2 border-[#047481] text-[#047481] hover:bg-[#e6f3f5]";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${
        primary ? primaryStyle : secondaryStyle
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ExpandableCommentInput = ({
  onSubmit,
  userAvatar,
  commentsCount,
  postId,
  userId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setComment((prevComment) => prevComment + emoji.native);
    setShowEmojiPicker(false);
  };
  useEffect(() => {
    setIsLoggedIn(!!userInfo);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userInfo]);

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const handleExpand = () => {
    if (isLoggedIn) {
      setIsExpanded(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
      setIsExpanded(false);
    }
  };

  const handleLogin = () => {
    sessionStorage.setItem("returnTo", window.location.pathname);
    navigate("/login");
  };

  const handleCloseModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showLoginModal) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleCloseModal, showLoginModal]);

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      {commentsCount > 0 && (
        <Box display="flex" alignItems="center" marginBottom={2} marginLeft={1}>
          <Typography variant="body2">
            {commentsCount} Comment{commentsCount > 1 ? "s" : ""}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "9px",
          m: 1,
          marginBottom: "20px",
        }}
      >
        <Avatar
          src={userAvatar ? userAvatar : profile?.picture}
          sx={{ width: 32, height: 32, marginRight: "12px" }}
        />
        <input
          id="comment"
          type="text"
          placeholder="Share your thoughts"
          required={true}
          value={comment}
          onChange={handleCommentChange}
          onFocus={handleExpand}
          className="flex-grow border border-btColour focus:border-btColour focus:outline-none focus:ring-1 focus:ring-btColour bg-gray-50 bg-opacity-50   rounded-lg p-2"
        />

        <Button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className="ml-2 border-2 p-0 border-btColour text-btColour hover:font-bold"
        >
          Post
        </Button>
      </Box>

      {isExpanded && (
        <>
          <Box
            display="flex"
            justifyContent="space-betwee"
            alignItems="center"
            mt={0}
            ml={5.5}
          >
            <Box>
              <StyledIconButton sx={{ fontSize: "18px", padding: "4px" }}>
                ⬆️
              </StyledIconButton>
              <StyledIconButton sx={{ fontSize: "18px", padding: "4px" }}>
                ⬇️
              </StyledIconButton>
            </Box>

            <Button
              color="primary"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Smile className="mr-2 h-5 w-5" />
              {/* Emoji */}
            </Button>
          </Box>
        </>
      )}

      {showEmojiPicker && (
        <Box sx={{ position: "absolute", zIndex: 1 }} ref={emojiPickerRef}>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            set="apple"
            title="Pick your emoji"
            emoji="point_up"
            style={{ width: "100%", maxWidth: "320px" }}
          />
        </Box>
      )}

      <CustomModal isOpen={showLoginModal} onClose={handleCloseModal}>
        <h2 className="text-2xl font-bold mb-4 text-[#047481]">
          Login Required
        </h2>
        <p className="mb-6 text-gray-600">
          Please log in to leave a comment. Your thoughts are valuable to us!
        </p>
        <div className="flex justify-end space-x-4">
          <Button1 onClick={handleCloseModal}>Cancel</Button1>
          <Button1 primary onClick={handleLogin}>
            Log In
          </Button1>
        </div>
      </CustomModal>
    </Box>
  );
};

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { profile } = useSelector((state) => state.profiles);
  const currentUser = useSelector((state) => state.auth);
  const userId = useMemo(
    () => currentUser?.userInfo?._id,
    [currentUser?.userInfo?._id]
  );

  const email = useMemo(
    () => currentUser?.userInfo?.email,
    [currentUser?.userInfo?.email]
  );

  const name = useMemo(() => profile?.username, [profile?.username]);

  const image = useMemo(() => profile?.image, [profile?.image]);

  const { userInfo } = useSelector((state) => state.auth);

  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedComments, setDisplayedComments] = useState([]);
  const commentsPerPage = 5;

  const handleMenuOpen = (event, commentId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCommentId(null);
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  const LoadingSpinner = React.memo(() => (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <CircularProgress size={40} className="text-btColour" />
        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          Loading content...
        </Typography>
      </div>
    </div>
  ));

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/api/getPostBySlug/${slug}`);
      if (!response.ok) throw new Error("Failed to fetch post");

      const data = await response.json();
      setPost(data);
      setPostId(data._id);
      setLikesCount(data.likes.length || 0);
      setIsLiked(data.likes.includes(userInfo?.userId));

      // Cache the post data
      localStorage.setItem(`post_${slug}`, JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug, userInfo?.userId]);

  // Cache management with localStorage
  useEffect(() => {
    const cachedPost = localStorage.getItem(`post_${slug}`);
    if (cachedPost) {
      const parsedPost = JSON.parse(cachedPost);
      setPost(parsedPost);
      setPostId(parsedPost._id);
      setLikesCount(parsedPost.likes.length || 0);
      setIsLiked(parsedPost.likes.includes(userInfo?.userId));
    }

    fetchPost();
  }, [slug, userInfo?.userId]);

  const handleShare = React.memo((platform) => {
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
  });

  // const handleCommentSubmit = async (newComment) => {
  //   try {
  //     const commentData = {
  //       content: newComment,
  //       postId: postId,
  //       userId: userId,
  //     };

  //     const response = await fetch(`${backendURL}/api/createComment`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(commentData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create comment");
  //     }

  //     const newCommentObj = await response.json();

  //     // Create the complete comment object with user data
  //     const commentWithUserData = {
  //       ...newCommentObj,
  //       userId: {
  //         _id: userId,
  //         username: name,
  //         image: image,
  //       },
  //       likes: [], // Initialize empty likes array
  //       likeCount: 0,
  //     };

  //     // Update both comments and displayedComments states
  //     setComments((prevComments) => [...prevComments, commentWithUserData]);
  //     setDisplayedComments((prevDisplayed) => {
  //       // Only add to displayed comments if we haven't reached the page limit
  //       if (prevDisplayed.length < currentPage * commentsPerPage) {
  //         return [...prevDisplayed, commentWithUserData];
  //       }
  //       return prevDisplayed;
  //     });

  //     setSnackbarMessage("Comment submitted successfully!");
  //     setSnackbarSeverity("success");
  //     setSnackbarOpen(true);
  //   } catch (error) {
  //     console.error("Error submitting comment:", error);
  //     setSnackbarMessage("Failed to submit comment.");
  //     setSnackbarSeverity("error");
  //     setSnackbarOpen(true);
  //   }
  // };

  const handleCommentSubmit = async (newComment) => {
    try {
      const commentData = {
        content: newComment,
        postId: postId,
        userId: userId,
      };

      const response = await fetch(`${backendURL}/api/createComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const newCommentObj = await response.json();

      // Fetch the current user's details to ensure we have the correct format
      const userResponse = await fetch(`${backendURL}/api/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userData = await userResponse.json();

      // Create the complete comment object with properly structured user data
      const commentWithUserData = {
        ...newCommentObj,
        userId: {
          _id: userData._id,
          username: userData.username,
          image: userData.image,
        },
        likes: [], // Initialize empty likes array
        likeCount: 0,
        createdAt: new Date().toISOString(), // Add creation timestamp
      };

      // Update both comments and displayedComments states
      setComments((prevComments) => [...prevComments, commentWithUserData]);
      setDisplayedComments((prevDisplayed) => {
        // Only add to displayed comments if we haven't reached the page limit
        if (prevDisplayed.length < currentPage * commentsPerPage) {
          return [...prevDisplayed, commentWithUserData];
        }
        return prevDisplayed;
      });

      setSnackbarMessage("Comment submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setSnackbarMessage("Failed to submit comment.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchPostComments = async (postId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${backendURL}/api/getPostComments/${postId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();

      // Ensure each comment has user details
      const commentsWithUsers = await Promise.all(
        data.map(async (comment) => {
          if (!comment.userId || typeof comment.userId === "string") {
            const userResponse = await fetch(
              `${backendURL}/api/users/${comment.userId}`
            );
            const userData = await userResponse.json();
            console.log(userData);
            return {
              ...comment,
              userId: {
                _id: userData._id,
                username: userData.username,
                image: userData.image,
              },
            };
          }
          return comment;
        })
      );

      setComments(commentsWithUsers);
      setDisplayedComments(commentsWithUsers.slice(0, commentsPerPage));
      console.log(commentsWithUsers, "getPostComments");
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostComments(postId);
    }
  }, [postId]);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    setDisplayedComments([
      ...displayedComments,
      ...comments.slice(startIndex, endIndex),
    ]);
    setCurrentPage(nextPage);
  };

  const handleCommentEdit = async (commentId, newContent) => {
    try {
      const response = await fetch(
        `${backendURL}/api/editComment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newContent }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      const updatedComment = await response.json();

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: updatedComment.content }
            : comment
        )
      );

      setDisplayedComments((prevDisplayedComments) =>
        prevDisplayedComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: updatedComment.content }
            : comment
        )
      );

      setEditingCommentId(null);
      setEditedCommentContent("");

      setSnackbarMessage("Comment edited successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error editing comment:", error);
      setSnackbarMessage("Failed to edit comment.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await fetch(
        `${backendURL}/api/deleteComment/${commentId}`,
        {
          method: "DELETE",
          headers: {},
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      // Update both comments and displayedComments states
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      setDisplayedComments((prevDisplayed) =>
        prevDisplayed.filter((comment) => comment._id !== commentId)
      );

      // Update currentPage if necessary
      if (displayedComments.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      setSnackbarMessage("Comment deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setSnackbarMessage("Failed to delete comment.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditedCommentContent(comment.content);
    handleMenuClose();
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDeleteId(commentId);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };
  const handleDeleteConfirm = () => {
    if (commentToDeleteId) {
      handleCommentDelete(commentToDeleteId);
      setDeleteDialogOpen(false);
      setCommentToDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCommentToDeleteId(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCommentLike = async (commentId) => {
    try {
      const url = `${backendURL}/api/likeComment/${commentId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.userInfo?._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to like comment");
      }

      const updatedComment = await response.json();

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: updatedComment.likes,
                likeCount: updatedComment.likes.length,
              }
            : comment
        )
      );

      setDisplayedComments((prevDisplayedComments) =>
        prevDisplayedComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: updatedComment.likes,
                likeCount: updatedComment.likes.length,
              }
            : comment
        )
      );

      setSnackbarMessage(
        updatedComment.likes.includes(userId)
          ? "Comment liked!"
          : "Comment unliked!"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error liking comment:", error);
      setSnackbarMessage("Failed to like comment.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleLike = useCallback(async () => {
    if (!postId || !currentUser?.userInfo?._id) return;

    try {
      const response = await fetch(`${backendURL}/api/likePost/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser?.userInfo?._id }),
      });

      if (!response.ok) throw new Error("Failed to like post");

      const data = await response.json();
      setLikesCount(data.likesCount);
      setIsLiked(data.isLiked);
      setSnackbarMessage(data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error liking post:", error);
      setSnackbarMessage("Failed to like post.");
      setSnackbarSeverity("error");
    }
  }, [postId, currentUser?.userInfo?._id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Grid container spacing={3} sx={{ px: { xs: 4, md: 8 }, py: 10 }}>
      {/* Hero Section (keeping the same as before) */}
      <div className="relativ h-[90vh] w-full ">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backendURL}${post.image})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative h-full flex flex-col justify-end pb-16 px-4 md:px-8 lg:px-16">
          <div className="mb-4">
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`} // Pass category as a query parameter
              className="inline-block bg-red-600 text-white text-sm px-4 py-1 rounded-sm hover:bg-red-700 transition-colors"
              style={{
                opacity: 0.8,
              }}
            >
              {post.category}
            </Link>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl"
            style={{
              opacity: 0.3,
            }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
            <div
              style={{
                opacity: 0.3,
              }}
              className="flex items-center"
            >
              <a
                href="#"
                className="text-white hover:text-gray-300 flex items-center"
              >
                <Avatar
                  src={`${backendURL}${post?.authorId?.image}`}
                  alt={"post image"}
                  sx={{ width: 30, height: 30 }}
                >
                  {/* `${backendURL}${post.authorId.image}` */}
                  {!post?.authorId?.image && <Image />}
                </Avatar>
                <span className="ml-2">{post.authorId?.name}</span>
              </a>
            </div>

            <div
              style={{
                opacity: 0.3,
              }}
              className="flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>{moment(post.createdAt).format("MMMM D, YYYY")}</span>
            </div>
            <div
              style={{
                opacity: 0.3,
              }}
              className="flex items-center"
            ></div>
          </div>
        </div>
      </div>

      <Grid item xs={12} md={8}>
        <Box
          sx={{
            maxWidth: "100%",
            margin: "auto",
            pl: { md: 4 },
            pr: { md: 2 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              src={
                post.authorId?.image
                  ? `${backendURL}${post.authorId.image}`
                  : "/default-avatar.jpg"
              }
              sx={{ width: 30, height: 30, mr: 2 }}
            />
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              {post.authorId?.name || "Unknown Author"}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                "&::before": {
                  content: "'|'",
                  mx: 1,
                },
              }}
            >
              {moment(post.createdAt).format("MMMM D, YYYY")}
            </Typography>
          </Box>

          <h1
            className="text-3xl md:text-4xl lg:text-4xl font-semibold text-[#1e293b] mb-6 max-w-4xl"
            style={{
              opacity: 0.9,
            }}
          >
            {post.title}
          </h1>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              ml: -1,
              pl: 0,
              width: "100%",
            }}
          >
            <IconButton
              onClick={handleLike}
              size="small"
              sx={{
                transition:
                  "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                color: isLiked ? "#" : "inherit",
                "&:hover": {
                  color: "#e57373", // Always use red on hover
                  transform: "scale(1.2)",
                },
              }}
            >
              {isLiked ? (
                <Favorite fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </IconButton>
            <Typography
              sx={{
                transition:
                  "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                "&:hover": {
                  color: isLiked ? "#e57373" : "inherit",
                  transform: "scale(1.1)",
                },
                ml: 0,
              }}
              variant="body2"
            >
              {likesCount} likes
            </Typography>
          </Box>

          <ReactQuill
            value={post.content || ""}
            readOnly={true}
            theme="bubble"
            className="custom-quill mb-5" // Add a custom class
          />

          {/* Share buttons */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Share this:
            </Typography>
            <IconButton
              onClick={() => handleShare("twitter")}
              size="small"
              sx={{ mr: 1 }}
            >
              <Twitter fontSize="small" sx={{ color: "#1DA1F2" }} />
            </IconButton>
            <IconButton
              onClick={() => handleShare("facebook")}
              size="small"
              sx={{ mr: 1 }}
            >
              <Facebook fontSize="small" sx={{ color: "#4267B2" }} />
            </IconButton>
            <IconButton
              onClick={() => handleShare("linkedin")}
              size="small"
              sx={{ mr: 1 }}
            >
              <LinkedIn fontSize="small" sx={{ color: "#0077b5" }} />
            </IconButton>
            <IconButton onClick={() => handleShare("whatsapp")} size="small">
              <WhatsApp fontSize="small" sx={{ color: "#25D366" }} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <ExpandableCommentInput
            onSubmit={handleCommentSubmit}
            userAvatar={`${backendURL}/uploads/${profile?.image}`}
            commentsCount={comments.length}
            postId={postId}
            userId={userId}
          />
          {displayedComments.length > 0 ? (
            <Box sx={{ width: "100%", bgcolor: "#f5f5f5", p: 2 }}>
              {displayedComments.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{ mb: 2, bgcolor: "white", borderRadius: 1, p: 2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      src={
                        comment?.userId?.image
                          ? `${backendURL}/uploads/${comment.userId.image}`
                          : comment?.userId?.picture
                      }
                      alt={comment.username}
                      sx={{ width: 22, height: 22, mr: 1, mb: 1 }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                        width: "100%",
                      }}
                    >
                      {/* Text box containing the username and timestamp */}
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "light" }}
                        >
                          {comment.userId?.username || "Anonymous"}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{ marginLeft: 1, marginTop: 0.1 }}
                          color="text.secondary"
                        >
                          <span className="mx-1 ">-</span>
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </Box>

                      {/* MoreVert icon button aligned to the right */}
                      {currentUser?.userInfo &&
                        (currentUser.userInfo._id === comment.userId?._id ||
                          currentUser.userInfo?.isAdmin) && (
                          <IconButton
                            size="small"
                            onClick={(event) =>
                              handleMenuOpen(event, comment._id)
                            }
                          >
                            <MoreVert />
                          </IconButton>
                        )}
                    </Box>
                  </Box>

                  {editingCommentId === comment._id ? (
                    <Box sx={{ width: "100%" }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={editedCommentContent}
                        onChange={(e) =>
                          setEditedCommentContent(e.target.value)
                        }
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                      <Box sx={{ display: "flex" }}>
                        <Button
                          className="text-btColour  hover:font-bold"
                          onClick={() =>
                            handleCommentEdit(comment._id, editedCommentContent)
                          }
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          className="text-btColour  hover:font-bold"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Typography
                      className="commentStyles"
                      variant="body1"
                      sx={{
                        mb: 1,
                        width: "100%",
                        fontSize: "0.9rem", // Apply font size
                        lineHeight: "1.6", // Apply line height
                        color: "#201f1f", // Apply color if needed
                      }}
                    >
                      {comment.content}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      ml: -1,
                      pl: 0,
                      width: "100%",
                    }}
                  >
                    <IconButton
                      onClick={() => handleCommentLike(comment._id)}
                      size="small"
                      sx={{
                        transition:
                          "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                        color: isLiked ? "#" : "inherit",
                        "&:hover": {
                          color: "#e57373", // Always use red on hover
                          transform: "scale(1.2)",
                        },
                      }}
                    >
                      {isLiked ? (
                        <Favorite fontSize="small" />
                      ) : (
                        <FavoriteBorder fontSize="small" />
                      )}
                    </IconButton>
                    <Typography
                      sx={{
                        transition:
                          "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                        "&:hover": {
                          color: isLiked ? "#e57373" : "inherit",
                          transform: "scale(1.1)",
                        },
                        ml: 0,
                      }}
                      variant="body2"
                    >
                      {comment.likes.length} likes
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              No comments yet. Be the first to comment!
            </Typography>
          )}
          {displayedComments.length < comments.length && (
            <Box className="flex justify-center mt-2">
              <button
                onClick={handleShowMore}
                disabled={loading}
                className={`
  px-2 py-1 text-xs
  bg-gradient-to-r from-[#047481] to-[#198754] 
  text-transparent bg-clip-text
  hover:bg-gradient-to-r hover:from-[#198754] hover:to-[#047481]
  rounded-md 
  transition-all duration-300 ease-in-out
  transform hover:-translate-y-0.5 hover:shadow-lg
  focus:outline-none focus:ring-2 focus:ring-[#047481] focus:ring-opacity-50
  disabled:opacity-50 disabled:cursor-not-allowed
`}
              >
                {loading ? "Loading..." : "Show More"}
              </button>
            </Box>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() =>
                handleEditClick(
                  comments.find((c) => c._id === selectedCommentId)
                )
              }
            >
              <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteClick(selectedCommentId)}>
              <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>

          <Divider sx={{ my: 4 }} />

          {/* ... (rest of the code remains the same) ... */}
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box
          sx={{
            top: 20,
            maxHeight: { md: "calc(100vh - 40px)" },
            padding: { lg: "20px" },
          }}
        >
          <RelatedPosts category={post.category} currentPostId={post._id} />
        </Box>
      </Grid>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm delete or cancel</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            startIcon={<Close />}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            startIcon={<Delete />}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
