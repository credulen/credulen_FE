import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Snackbar, Alert, Grid } from "@mui/material";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import {
  Typography,
  Box,
  Chip,
  Divider,
  Button,
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
import { Favorite, FavoriteBorder } from "@mui/icons-material";
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

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import moment from "moment";
import { styled } from "@mui/system";
import "../index.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DarkBox = styled(Box)(({ theme }) => ({
  backgroundColor: "gray",
  color: "#ffffff",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  border: "1px solid black",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3e3e3e",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "black",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#ffffff",
}));

const RelatedPostCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#2e2e2e",
  color: "#ffffff",
  height: "100%",
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
      <Typography variant="h5" className="mb-4">
        Related Posts
      </Typography>
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 minilg:grid-cols-1">
        {relatedPosts.map((post) => (
          <Card
            key={post._id}
            className="flex flex-col cursor-pointer transition-all duration-300 ease-in-out 
                       hover:shadow-md hover:border-gray-300"
            onClick={() => handlePostClick(post.slug)}
          >
            <CardContent className="flex-grow p-4">
              <Typography
                className="font-semibold mb-2 hover:text-blue-600 transition-colors duration-300"
                variant="h6"
              >
                {post.title}
              </Typography>
              <Box className="flex items-center mb-2">
                <Avatar
                  src={`${backendURL}${post.authorId.image}`}
                  alt={post.authorId.name}
                  className="w-5 h-5 mr-2"
                />
                <Typography variant="body2" className="text-gray-600">
                  {post.authorId.name}
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
        ))}
      </div>
    </Box>
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

  const handleExpand = () => {
    setIsExpanded(true);
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

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      {commentsCount > 0 && (
        <Box display="flex" alignItems="center" marginBottom={2} marginLeft={1}>
          <ModeCommentOutlined
            style={{ marginRight: 4, fontSize: "1.1rem" }} // Adjust the icon size
          />
          <Typography variant="body2">
            {commentsCount} Comment{commentsCount > 1 ? "s" : ""}
          </Typography>
        </Box>
      )}

      {!isExpanded && (
        <Box
          onClick={handleExpand}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "9px",
            padding: "8px 16px",
            cursor: "pointer",
            border: "1px solid gray",
            m: 1,
            p: 2,
            marginBottom: "20px",
            "&:hover": {
              transition: "all 0.3s ease",
              border: "2px solid gray",
            },
          }}
        >
          <Avatar
            src={userAvatar}
            sx={{ width: 32, height: 32, marginRight: "12px" }}
          />
          <Typography
            sx={{
              color: "#808080",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Share your thoughts
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            sx={{
              color: "#808080",
              fontSize: "14px",
              fontWeight: 500,
              backgroundColor: "",
              borderColor: "#2a2a2a",
              borderWidth: "1px",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            Post
          </Typography>
        </Box>
      )}

      {isExpanded && (
        <DarkBox>
          <Box display="flex" alignItems="flex-start" marginBottom={2}>
            <Avatar src={userAvatar} sx={{ marginRight: 1 }} />
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share your thoughts"
              value={comment}
              onChange={handleCommentChange}
              variant="outlined"
              sx={{
                backgroundColor: "white",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputBase-input": { color: "black" },
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <StyledIconButton>⬆️</StyledIconButton>
              <StyledIconButton>⬇️</StyledIconButton>
              <StyledIconButton>🔗</StyledIconButton>
              <StyledIconButton>@</StyledIconButton>
            </Box>
            <StyledButton variant="contained" onClick={handleSubmit}>
              Comment
            </StyledButton>
          </Box>
        </DarkBox>
      )}
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
  const userId = currentUser?.userInfo?.user?._id;
  const email = currentUser?.userInfo?.user?.email;
  const name = profile?.username;
  const image = profile?.image;
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

  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${backendURL}/api/getPostBySlug/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
        setPostId(data._id);
        setLikesCount(data.likes.length || 0);
        setIsLiked(data.likes.includes(userId));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${backendURL}/api/likePost/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.userInfo.user._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to like post");
      }

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
      setSnackbarOpen(true);
    }
  };

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

      const commentWithUserData = {
        ...newCommentObj,
        userId: {
          _id: userId,
          username: name,
          image: image,
        },
      };

      setComments([...comments, commentWithUserData]);

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
      console.log(commentsWithUsers, "getPostComments");
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  console.log(comments);
  useEffect(() => {
    if (postId) {
      fetchPostComments(postId);
    }
  }, [postId]);

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

      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );

      setEditingCommentId(null);
      setEditedCommentContent("");

      // Trigger success Snackbar
      setSnackbarMessage("Comment edited successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error editing comment:", error);

      // Trigger error Snackbar
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

      setComments(comments.filter((comment) => comment._id !== commentId));

      // Trigger success Snackbar
      setSnackbarMessage("Comment deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting comment:", error);

      // Trigger error Snackbar
      setSnackbarMessage("Failed to delete comment.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setEditedCommentContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDeleteId(commentId);
    setDeleteDialogOpen(true);
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
      console.log("Attempting to like comment at URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.userInfo.user._id }),
      });

      if (!response.ok) {
        console.error("Response status:", response.status);
        console.error("Response text:", await response.text());
        throw new Error("Failed to like comment");
      }

      const updatedComment = await response.json();

      // Ensure the updated comment has user data
      const updatedCommentWithUserData = {
        ...updatedComment,
        userId: comments.find((comment) => comment._id === commentId)
          ?.userId || {
          _id: userId,
          username: name,
          image: image,
        },
      };

      setComments(
        comments.map((comment) =>
          comment._id === commentId ? updatedCommentWithUserData : comment
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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>Post not found</Typography>;
  console.log(post, "post details");

  return (
    <Grid container spacing={3} sx={{ px: { xs: 2, md: 4 }, py: 11.5 }}>
      <Grid item xs={12} md={8}>
        <Box sx={{ maxWidth: "100%", margin: "auto" }}>
          {post.image && (
            <Box
              component="img"
              src={`${backendURL}${post.image}`}
              alt="Post image"
              sx={{
                width: "100%",
                height: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "35vw",
                  lg: "35vw",
                },
                borderRadius: "4px",
                marginBottom: "1rem",
                objectFit: "cover",
              }}
            />
          )}

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

          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>

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

          {comments.length > 0 ? (
            <Box sx={{ width: "100%", bgcolor: "#f5f5f5", p: 2 }}>
              {comments.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{ mb: 2, bgcolor: "white", borderRadius: 1, p: 2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {/* Avatar */}
                    <Avatar
                      src={`${backendURL}/uploads/${profile?.image}`}
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
                      {currentUser?.userInfo?.user &&
                        (currentUser.userInfo.user._id ===
                          comment.userId?._id ||
                          currentUser.userInfo.user.isAdmin) && (
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
                      <Button
                        onClick={() =>
                          handleCommentEdit(comment._id, editedCommentContent)
                        }
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit}>Cancel</Button>
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

          {comments.length > 5 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button onClick={toggleShowAllComments}>
                {showAllComments ? "Show Less" : "Show More"}
              </Button>
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
