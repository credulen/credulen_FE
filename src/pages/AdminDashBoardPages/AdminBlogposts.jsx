import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
import Spinner from "../../components/tools/Spinner";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostTableRow = React.memo(({ post, backendURL, onDeleteClick }) => {
  return (
    <Table.Row className="bg-white dark:bg-neutral-800">
      <Table.Cell className="py-3 text-neutral-700 dark:text-neutral-700-dark">
        {moment(post.updatedAt).format("MMMM D")}
      </Table.Cell>
      <Table.Cell>
        <Link to={`/post/${post.slug}`}>
          {post?.image ? (
            <img
              src={`${post.image}`}
              alt={post.title}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
              }}
            />
          ) : (
            <HiOutlineUserCircle className="w-10 h-10 text-neutral-600 dark:text-neutral-600-dark" />
          )}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="font-medium text-neutral-700 dark:text-neutral-700-dark hover:text-primary-500"
          to={`/post/${post.slug}`}>
          {post.title}
        </Link>
      </Table.Cell>
      <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
        {post.category}
      </Table.Cell>
      <Table.Cell>
        <button
          onClick={() => onDeleteClick(post._id)}
          className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-primary-500 hover:text-white p-1 rounded-md">
          Delete
        </button>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="font-medium text-white hover:text-primary-500 hover:bg-transparent hover:border hover:border-primary-500 bg-primary-500 p-1 rounded-md transition-all duration-300 px-2"
          to={`/DashBoard/Admin/CreatePosts/${post._id}`}>
          Edit
        </Link>
      </Table.Cell>
    </Table.Row>
  );
});

export default function AdminBlogposts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const { userInfo } = useSelector((state) => state.auth);

  const backendURL = useMemo(
    () =>
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:3001",
    []
  );

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSnackbarMessage = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const fetchPosts = useCallback(
    async (startIndex = 0) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/api/getPosts?startIndex=${startIndex}&limit=9`
        );
        const data = await res.json();
        if (res.ok) {
          if (startIndex === 0) {
            setPosts(data.posts);
          } else {
            setPosts((prev) => [...prev, ...data.posts]);
          }
          setShowMore(data.posts.length === 9);
        } else {
          showSnackbarMessage(data.message || "Failed to fetch posts", "error");
        }
      } catch (error) {
        showSnackbarMessage(
          error.message || "An error occurred while fetching posts",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [backendURL, showSnackbarMessage]
  );

  useEffect(() => {
    if (userInfo) {
      fetchPosts();
    }
  }, [userInfo, fetchPosts]);

  const handleShowMore = useCallback(() => {
    const startIndex = posts.length;
    fetchPosts(startIndex);
  }, [posts.length, fetchPosts]);

  const handleDeletePost = useCallback(async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deletePost/${postIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
        showSnackbarMessage("Post deleted successfully", "success");
        setDeleteOpen(false);
      } else {
        showSnackbarMessage(data.message || "Failed to delete post", "error");
      }
    } catch (error) {
      showSnackbarMessage(
        error.message || "An error occurred while deleting post",
        "error"
      );
    }
  }, [backendURL, postIdToDelete, showSnackbarMessage]);

  const handleDeleteClick = useCallback((postId) => {
    setPostIdToDelete(postId);
    setDeleteOpen(true);
  }, []);

  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-primary-50 dark:bg-neutral-800-dark bg-opacity-75 z-50">
        <CircularProgress size={40} sx={{ color: "#080759" }} />
      </div>
    ),
    []
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto p-2 mt-5 mid:mt-20">
      <div className="mb-4">
        <Link to="/DashBoard/Admin/CreatePosts">
          <button className="text-primary-500 border border-primary-500 p-2 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center gap-2">
            <BiMessageSquareAdd size={16} />
            Create Post
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg border border-primary-100">
        {posts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="py-3 text-neutral-700 dark:text-neutral-700-dark">
                  Date updated
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Post image
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Post title
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Category
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Delete
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Edit
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-primary-100">
                {posts.map((post) => (
                  <PostTableRow
                    key={post._id}
                    post={post}
                    backendURL={backendURL}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </Table.Body>
            </Table>

            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-primary-500 hover:text-secondary-500 py-4 mt-4 transition-colors duration-300">
                Show more
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-neutral-600 dark:text-neutral-600-dark py-4">
            You have no posts yet!
          </p>
        )}
      </div>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" sx={{ color: "#080759" }}>
          Are you sure you want to delete this post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#5E6D7A" }}>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            sx={{ color: "#5E6D7A", "&:hover": { color: "#3B4A54" } }}>
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeletePost}
            sx={{ color: "#EF4444", "&:hover": { color: "#B91C1C" } }}>
            <AiTwotoneDelete size={24} />
          </Button>
        </DialogActions>
      </Dialog>

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
              snackbar.severity === "success" ? "#3C6E5D" : "#EF4444",
            color: "#FFFFFF",
          }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
