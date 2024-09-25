import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Snackbar, Alert, Grid } from "@mui/material";
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
import {
  ThumbUp,
  Edit,
  Delete,
  Send,
  ChatBubbleOutline,
  MoreVert,
  Close,
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
    <Box sx={{ mt: 4, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Related Posts
      </Typography>
      {relatedPosts.map((post) => (
        <Card
          key={post._id}
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: 2,
            cursor: "pointer",
          }}
          onClick={() => handlePostClick(post.slug)}
        >
          {post.image && (
            <CardMedia
              component="img"
              sx={{ width: "100%", height: 200, objectFit: "cover" }}
              image={`${backendURL}${post.image}`}
              alt={post.title}
            />
          )}
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h6" component="div" gutterBottom>
              {post.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={`${backendURL}${post.authorId.image}`}
                alt={post.authorId.name}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {post.authorId.name}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={2}
            >
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbUp fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">
                  {post.likes ? post.likes.length : 0}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ChatBubbleOutline fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">
                  {post.comments ? post.comments.length : 0}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
export const ExpandableCommentInput = ({ onSubmit, userAvatar }) => {
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
    <Box sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}>
      <Avatar src={userAvatar} sx={{ mr: 1 }} />
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          multiline
          rows={isExpanded ? 3 : 1}
          placeholder="Share your thoughts"
          value={comment}
          onChange={handleCommentChange}
          onClick={handleExpand}
          variant="outlined"
          sx={{
            backgroundColor: "background.paper",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "divider" },
              "&:hover fieldset": { borderColor: "divider" },
              "&.Mui-focused fieldset": { borderColor: "primary.main" },
            },
          }}
        />
      </Box>
      {isExpanded && (
        <IconButton
          onClick={handleSubmit}
          color="primary"
          sx={{ mt: 1, ml: 1 }}
        >
          <Send />
        </IconButton>
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
  const userId = currentUser?.userInfo?.user._id;
  const email = currentUser?.userInfo?.user.email;
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
        setIsLiked(data.isLiked || false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim()) {
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

        // Add user data to the new comment object
        const commentWithUserData = {
          ...newCommentObj,
          userId: {
            _id: userId,
            username: name,
            image: image,
          },
        };

        setComments([...comments, commentWithUserData]);
        setNewComment("");

        setSnackbarMessage("Comment submitted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error submitting comment:", error);
        setSnackbarMessage("Failed to submit comment.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
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
    <Grid container spacing={3} sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
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
                borderRadius: "8px",
                marginBottom: "1rem",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
            <Chip label={post.category} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
          </Box>

          <ReactQuill
            value={post.content || ""}
            readOnly={true}
            theme="bubble"
          />

          <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 3 }}>
            <IconButton onClick={handleLike}>
              <ThumbUp color={isLiked ? "primary" : "inherit"} />
            </IconButton>
            <Typography variant="body2">{likesCount} likes</Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <DarkBox>
            <Box display="flex" justifyContent="end" marginBottom={2}>
              <Box>
                <Typography variant="body2">
                  {comments.length} Comments
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="flex-start" marginBottom={2}>
              <Avatar
                src={`${backendURL}/uploads/${profile?.image}`}
                alt={currentUser?.name}
                sx={{ marginRight: 1 }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your thoughts"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
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
              <StyledButton variant="contained" onClick={handleCommentSubmit}>
                Comment
              </StyledButton>
            </Box>
          </DarkBox>

          {/* 


          <List>
            {comments.map((comment) => (
              <ListItem
                key={comment._id}
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mb: 2,
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  border: "1px solid gray",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={
                        comment.userId?.image
                          ? `${backendURL}/uploads/${comment.userId.image}`
                          : "/default-avatar.jpg"
                      }
                      alt={comment.userId?.username || "Anonymous"}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                    <Typography variant="subtitle2">
                      {comment.userId?.username || "Anonymous"}
                    </Typography>
                  </Box>
                  {(currentUser.userInfo.user._id === comment.userId._id ||
                    currentUser.userInfo.user.isAdmin) && (
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(comment)}
                        sx={{ mr: 1 }}
                      >
                        <Edit size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(comment._id)}
                      >
                        <Delete size={16} />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                {editingCommentId === comment._id ? (
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={editedCommentContent}
                      onChange={(e) => setEditedCommentContent(e.target.value)}
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
                  <Typography variant="body1" sx={{ mb: 1, width: "100%" }}>
                    {comment.content}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => handleCommentLike(comment._id)}
                      size="small"
                    >
                      <ThumbUp
                        color={
                          comment.likes.includes(currentUser.userInfo.user._id)
                            ? "primary"
                            : "inherit"
                        }
                        size={16}
                      />
                    </IconButton>
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      {comment.likes.length} likes
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List> */}

          <List>
            {displayedComments.map((comment) => (
              <ListItem
                key={comment._id}
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mb: 2,
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  border: "1px solid gray",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={
                        comment.userId?.image
                          ? `${backendURL}/uploads/${comment.userId.image}`
                          : "/default-avatar.jpg"
                      }
                      alt={comment.userId?.username || "Anonymous"}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                    <Typography variant="subtitle2">
                      {comment.userId?.username || "Anonymous"}
                    </Typography>
                  </Box>
                  {(currentUser.userInfo.user._id === comment.userId._id ||
                    currentUser.userInfo.user.isAdmin) && (
                    <IconButton
                      size="small"
                      onClick={(event) => handleMenuOpen(event, comment._id)}
                    >
                      <MoreVert />
                    </IconButton>
                  )}
                </Box>

                {editingCommentId === comment._id ? (
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={editedCommentContent}
                      onChange={(e) => setEditedCommentContent(e.target.value)}
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
                  <Typography variant="body1" sx={{ mb: 1, width: "100%" }}>
                    {comment.content}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => handleCommentLike(comment._id)}
                      size="small"
                    >
                      <ThumbUp
                        color={
                          comment.likes.includes(currentUser.userInfo.user._id)
                            ? "primary"
                            : "inherit"
                        }
                        fontSize="small"
                      />
                    </IconButton>
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      {comment.likes.length} likes
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
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
            position: { md: "sticky" },
            top: 20,
            maxHeight: { md: "calc(100vh - 40px)" },
            overflowY: "auto",
          }}
        >
          <RelatedPosts category={post.category} currentPostId={post._id} />
        </Box>
      </Grid>

      {/* <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Comment?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}

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
