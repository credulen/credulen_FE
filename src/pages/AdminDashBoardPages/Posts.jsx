import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoArrowBack } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiOutlineUserCircle, HiOutlineSearch } from "react-icons/hi";
import moment from "moment";
const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

export default function Post() {
  const { userInfo } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [Deleteopen, setDeleteOpen] = useState(false);
  const DeleteOpen = () => setDeleteOpen(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Function to close modal
  const DeleteClose = () => setDeleteOpen(false);

  useEffect(() => {
    fetchPosts();
  }, [userInfo]);

  const fetchPosts = async (startIndex = 0) => {
    try {
      const res = await fetch(
        `${backendURL}/api/getPosts?startIndex=${startIndex}&limit=9`
      );
      const data = await res.json();
      if (res.ok) {
        if (startIndex === 0) {
          setUserPosts(data.posts);
        } else {
          setUserPosts((prev) => [...prev, ...data.posts]);
        }
        setShowMore(data.posts.length === 9);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      showSnackbar("Failed to fetch posts", "error");
    }
  };

  const handleShowMore = () => {
    const startIndex = userPosts.length;
    fetchPosts(startIndex);
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${backendURL}/api/deletePost/${postIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
        showSnackbar("Post deleted successfully", "success");
        DeleteClose();
      } else {
        showSnackbar(data.message || "Failed to delete post", "error");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      showSnackbar("An error occurred while deleting the post", "error");
    }
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <>
      <div className="my-5 ml-3">
        <Link to="/DashBoard/Admin/CreatePosts">
          <button className=" text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
            <span className="flex whitespace-nowrap">
              <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
              Create Post
            </span>
          </button>
        </Link>
      </div>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {userPosts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {userPosts.map((post) => (
                  <Table.Row
                    key={post._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {moment(post.updatedAt).format("MMMM D")}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        {post?.image ? (
                          <img
                            src={`${backendURL}${post.image}`}
                            alt={post.username}
                            className="w-10 h-10 rounded-full"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fallback-image.png";
                            }}
                          />
                        ) : (
                          <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
                        )}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          // setShowModal(true);
                          DeleteOpen();
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-white hover:text-red-500 hover:bg-transparent hover:border hover:border-red-500 cursor-pointer bg-btColour p-1 rounded-md"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour cursor-pointer bg-btColour p-1 rounded-md"
                        to={`/DashBoard/Admin/CreatePosts/${post._id}`}
                      >
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-teal-500 self-center text-sm py-7"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p>You have no posts yet!</p>
        )}

        {/* DELETING MODAL Starts HERE */}
        <Button>
          <React.Fragment>
            <Dialog
              open={Deleteopen}
              onClose={DeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete your account?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Confirm delete or cancel
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={DeleteClose}>
                  <IoClose
                    size={24}
                    className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
                  />
                </Button>
                <Button onClick={handleDeletePost}>
                  <AiTwotoneDelete
                    size={24}
                    className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
                  />
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Button>
        {/* DELETING MODAL Ends HERE */}
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
