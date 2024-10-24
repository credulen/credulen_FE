// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Modal, Table, Button } from "flowbite-react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// import { toast } from "react-toastify";
// import { CircularProgress } from "@mui/material";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import { IoArrowBack } from "react-icons/io5";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { BiMessageSquareAdd } from "react-icons/bi";
// import { HiOutlineUserCircle, HiOutlineSearch } from "react-icons/hi";
// import moment from "moment";
// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// export default function Post() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [userPosts, setUserPosts] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState("");
//   const [Deleteopen, setDeleteOpen] = useState(false);
//   const DeleteOpen = () => setDeleteOpen(true);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({
//       open: true,
//       message,
//       severity,
//     });
//   };

//   // Function to close modal
//   const DeleteClose = () => setDeleteOpen(false);

//   useEffect(() => {
//     fetchPosts();
//   }, [userInfo]);

//   const fetchPosts = async (startIndex = 0) => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/getPosts?startIndex=${startIndex}&limit=9`
//       );
//       const data = await res.json();
//       if (res.ok) {
//         if (startIndex === 0) {
//           setUserPosts(data.posts);
//         } else {
//           setUserPosts((prev) => [...prev, ...data.posts]);
//         }
//         setShowMore(data.posts.length === 9);
//       }
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       showSnackbar("Failed to fetch posts", "error");
//     }
//   };

//   const handleShowMore = () => {
//     const startIndex = userPosts.length;
//     fetchPosts(startIndex);
//   };

//   const handleDeletePost = async () => {
//     setShowModal(false);
//     try {
//       const res = await fetch(
//         `${backendURL}/api/deletePost/${postIdToDelete}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setUserPosts((prev) =>
//           prev.filter((post) => post._id !== postIdToDelete)
//         );
//         showSnackbar("Post deleted successfully", "success");
//         DeleteClose();
//       } else {
//         showSnackbar(data.message || "Failed to delete post", "error");
//       }
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       showSnackbar("An error occurred while deleting the post", "error");
//     }
//   };
//   const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });
//   return (
//     <>
//       <div className="my-5 ml-3">
//         <Link to="/DashBoard/Admin/CreatePosts">
//           <button className=" text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
//             <span className="flex whitespace-nowrap">
//               <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
//               Create Post
//             </span>
//           </button>
//         </Link>
//       </div>
//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {userPosts.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Date updated</Table.HeadCell>
//                 <Table.HeadCell>Post image</Table.HeadCell>
//                 <Table.HeadCell>Post title</Table.HeadCell>
//                 <Table.HeadCell>Category</Table.HeadCell>
//                 <Table.HeadCell>Delete</Table.HeadCell>
//                 <Table.HeadCell>Edit</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {userPosts.map((post) => (
//                   <Table.Row
//                     key={post._id}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <Table.Cell>
//                       {moment(post.updatedAt).format("MMMM D")}
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link to={`/post/${post.slug}`}>
//                         {post?.image ? (
//                           <img
//                             src={`${backendURL}${post.image}`}
//                             alt={post.username}
//                             className="w-10 h-10 rounded-full"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "/fallback-image.png";
//                             }}
//                           />
//                         ) : (
//                           <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
//                         )}
//                       </Link>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link
//                         className="font-medium text-gray-900 dark:text-white"
//                         to={`/post/${post.slug}`}
//                       >
//                         {post.title}
//                       </Link>
//                     </Table.Cell>
//                     <Table.Cell>{post.category}</Table.Cell>
//                     <Table.Cell>
//                       <span
//                         onClick={() => {
//                           // setShowModal(true);
//                           DeleteOpen();
//                           setPostIdToDelete(post._id);
//                         }}
//                         className="font-medium text-white hover:text-red-500 hover:bg-transparent hover:border hover:border-red-500 cursor-pointer bg-btColour p-1 rounded-md"
//                       >
//                         Delete
//                       </span>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link
//                         className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour cursor-pointer bg-btColour p-1 rounded-md"
//                         to={`/DashBoard/Admin/CreatePosts/${post._id}`}
//                       >
//                         <span>Edit</span>
//                       </Link>
//                     </Table.Cell>
//                   </Table.Row>
//                 ))}
//               </Table.Body>
//             </Table>
//             {showMore && (
//               <button
//                 onClick={handleShowMore}
//                 className="w-full text-teal-500 self-center text-sm py-7"
//               >
//                 Show more
//               </button>
//             )}
//           </>
//         ) : (
//           <p>You have no posts yet!</p>
//         )}

//         {/* DELETING MODAL Starts HERE */}
//         <Button>
//           <React.Fragment>
//             <Dialog
//               open={Deleteopen}
//               onClose={DeleteClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">
//                 Are you sure you want to delete your account?
//               </DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                   Confirm delete or cancel
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={DeleteClose}>
//                   <IoClose
//                     size={24}
//                     className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//                   />
//                 </Button>
//                 <Button onClick={handleDeletePost}>
//                   <AiTwotoneDelete
//                     size={24}
//                     className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//                   />
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </React.Fragment>
//         </Button>
//         {/* DELETING MODAL Ends HERE */}
//       </div>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostTableRow = React.memo(({ post, backendURL, onDeleteClick }) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="py-3">
        {moment(post.updatedAt).format("MMMM D")}
      </Table.Cell>
      <Table.Cell>
        <Link to={`/post/${post.slug}`}>
          {post?.image ? (
            <img
              src={`${backendURL}${post.image}`}
              alt={post.title}
              className="w-10 h-10 rounded-full object-cover"
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
          className="font-medium text-gray-900 dark:text-white hover:text-btColour"
          to={`/post/${post.slug}`}
        >
          {post.title}
        </Link>
      </Table.Cell>
      <Table.Cell>{post.category}</Table.Cell>
      <Table.Cell>
        <button
          onClick={() => onDeleteClick(post._id)}
          className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md"
        >
          Delete
        </button>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
          to={`/DashBoard/Admin/CreatePosts/${post._id}`}
        >
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
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <CircularProgress size={40} className="text-btColour" />
      </div>
    ),
    []
  );

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <div className="mx-auto p- mt-5 mid:mt-20">
      <div className="mb-4">
        <Link to="/DashBoard/Admin/CreatePosts">
          <button className="text-btColour border border-btColour p-2 rounded-lg hover:bg-btColour hover:text-white transition-all duration-300 flex items-center gap-2">
            <BiMessageSquareAdd size={16} />
            Create Post
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        {posts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="py-3">Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
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
                className="w-full text-btColour hover:text-btColour/80 py-4 mt-4 transition-colors duration-300"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-4">
            You have no posts yet!
          </p>
        )}
      </div>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeletePost}
            className="text-red-500 hover:text-red-700"
          >
            <AiTwotoneDelete size={24} />
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
