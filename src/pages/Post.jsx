import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
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
} from "@mui/material";
import { ThumbUp, Edit, Delete, Send } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import moment from "moment";
import { styled } from "@mui/system";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DarkBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2e2e2e",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#3e3e3e",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#ffffff",
}));

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
  const userId = currentUser.userInfo.user._id;
  const email = currentUser.userInfo.user.email;
  const name = profile?.username;
  const image = profile?.image;

  // console.log(profile?.username);
  // console.log(profile?.image);
  // console.log(email);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${backendURL}/api/getPostBySlug/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
        setPostId(data._id); // Store postId in state
        // setComments(data.comments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleLike = async () => {
    setPost((prevPost) => ({
      ...prevPost,
      likes: (prevPost.likes || 0) + 1,
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      try {
        const commentData = {
          content: newComment,
          postId: postId, // Use the postId state here
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

        setComments([...comments, newCommentObj]);
        setNewComment("");

        // Trigger success Snackbar
        setSnackbarMessage("Comment submitted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error submitting comment:", error);

        // Trigger error Snackbar
        setSnackbarMessage("Failed to submit comment.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  // const fetchPostComments = async (postId) => {
  //   try {
  //     const response = await fetch(
  //       `${backendURL}/api/getPostComments/${postId}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch comments");
  //     }
  //     const data = await response.json();
  //     setComments(data.comments || []);
  //     console.log(data, "getPostComments");
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };
  const fetchPostComments = async (postId) => {
    try {
      const response = await fetch(
        `${backendURL}/api/getPostComments/${postId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data); // Assuming `data` is an array of comments
      console.log(data, "getPostComments");
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

  const handleCommentEdit = (commentId) => {
    console.log("Edit comment", commentId);
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: "left", padding: 3 }}>
      <Box sx={{ mb: 3 }}>
        {post.image && (
          <img
            src={`${backendURL}${post.image}`}
            alt={post.title}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        )}
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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={
              post.author?.image
                ? `${backendURL}${post.author.image}`
                : "/default-avatar.jpg"
            }
            sx={{ mr: 1 }}
          />
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {post.author?.name || "Unknown Author"}
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle2" color="text.secondary">
        {moment(post.createdAt).format("MMMM D, YYYY")}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Chip label={post.category} sx={{ mr: 1 }} />
      </Box>

      <ReactQuill value={post.content || ""} readOnly={true} theme="bubble" />

      <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 3 }}>
        <IconButton onClick={handleLike}>
          <ThumbUp />
        </IconButton>
        <Typography variant="body2">{post.likes || 0} likes</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <DarkBox>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Typography variant="body2">{comments.length} Comments</Typography>
          <Box>
            <StyledIconButton>⬆️</StyledIconButton>
            <StyledIconButton>⬇️</StyledIconButton>
            <StyledIconButton>🔖</StyledIconButton>
            <StyledIconButton>🔗</StyledIconButton>
          </Box>
        </Box>
        <Box display="flex" alignItems="flex-start" marginBottom={2}>
          <Avatar
            src={`${backendURL}/uploads/${profile.image}`}
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
              backgroundColor: "#2e2e2e",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3e3e3e" },
                "&:hover fieldset": { borderColor: "#4e4e4e" },
                "&.Mui-focused fieldset": { borderColor: "#5e5e5e" },
              },
              "& .MuiInputBase-input": { color: "#ffffff" },
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <StyledIconButton>💬</StyledIconButton>
            <StyledIconButton>🔗</StyledIconButton>
            <StyledIconButton>@</StyledIconButton>
            <StyledIconButton>GIF</StyledIconButton>
          </Box>
          <StyledButton variant="contained" onClick={handleCommentSubmit}>
            Comment
          </StyledButton>
        </Box>
      </DarkBox>

      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment._id}
            alignItems="flex-start"
            sx={{ border: "1px solid #e0e0e0", borderRadius: "4px", mb: 1 }}
          >
            <ListItemText
              primary={
                <Box
                  sx={{
                    // display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <span className="flex">
                    <Avatar
                      src={
                        comment.userId?.image
                          ? `${backendURL}/uploads/${comment.userId.image}`
                          : "/default-avatar.jpg"
                      }
                      alt={comment.userId?.username || "Anonymous"}
                      sx={{ width: 20, height: 20 }}
                    />

                    <Typography
                      variant="caption"
                      sx={{ fontSize: "0.675rem", padding: "3px" }}
                    >
                      {comment.userId?.username || "Anonymous"}{" "}
                      {/* Reduced text size */}
                    </Typography>
                  </span>
                  {currentUser && currentUser.id === comment.author?.id && (
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleCommentEdit(comment._id)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleCommentDelete(comment._id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {/* {format(new Date(comment.createdAt), "MMM d, yyyy h:mm a")} */}
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
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
    </Box>
  );
}
