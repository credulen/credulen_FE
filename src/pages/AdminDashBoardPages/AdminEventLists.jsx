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
// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export default function AdminEventLists() {
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
//       <Link to="/DashBoard/Admin/CreateEvents">
//         <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] mid:w-[30%]  py-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-3  mb-7">
//           <span className="flex  whitespace-nowrap">
//             <BiMessageSquareAdd className="mr-2" size={20} />
//             Create Events
//           </span>
//         </button>
//       </Link>
//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {userPosts.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Event type</Table.HeadCell>
//                 <Table.HeadCell> Image</Table.HeadCell>
//                 <Table.HeadCell>Title</Table.HeadCell>
//                 <Table.HeadCell>Category</Table.HeadCell>
//                 <Table.HeadCell>Date</Table.HeadCell>
//                 <Table.HeadCell>Venue</Table.HeadCell>
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
//                       {new Date(post.updatedAt).toLocaleDateString()}
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link to={`/post/${post.slug}`}>
//                         <img
//                           src={`${backendURL}${post.image}`}
//                           alt={post.title}
//                           className="w-20 h-20 object-cover bg-gray-500 rounded-full"
//                         />
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
//                         className="font-medium text-red-500 hover:underline cursor-pointer"
//                       >
//                         Delete
//                       </span>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link
//                         className="text-teal-500 hover:underline"
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
// import { format } from "date-fns";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export default function AdminEventLists() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [events, setEvents] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [eventIdToDelete, setEventIdToDelete] = useState("");
//   const [deleteOpen, setDeleteOpen] = useState(false);
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

//   const deleteOpen = () => setDeleteOpen(true);
//   const deleteClose = () => setDeleteOpen(false);

//   useEffect(() => {
//     fetchEvents();
//   }, [userInfo]);

//   const fetchEvents = async (startIndex = 0) => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/getEvents?startIndex=${startIndex}&limit=9`
//       );
//       const data = await res.json();
//       if (res.ok) {
//         if (startIndex === 0) {
//           setEvents(data.events);
//         } else {
//           setEvents((prev) => [...prev, ...data.events]);
//         }
//         setShowMore(data.events.length === 9);
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       showSnackbar("Failed to fetch events", "error");
//     }
//   };

//   const handleShowMore = () => {
//     const startIndex = events.length;
//     fetchEvents(startIndex);
//   };

//   const handleDeleteEvent = async () => {
//     setShowModal(false);
//     try {
//       const res = await fetch(
//         `${backendURL}/api/deleteEvent/${eventIdToDelete}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setEvents((prev) =>
//           prev.filter((event) => event._id !== eventIdToDelete)
//         );
//         showSnackbar("Event deleted successfully", "success");
//         deleteClose();
//       } else {
//         showSnackbar(data.message || "Failed to delete event", "error");
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       showSnackbar("An error occurred while deleting the event", "error");
//     }
//   };

//   const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

//   return (
//     <>
//       <Link to="/DashBoard/Admin/CreateEvents">
//         <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] mid:w-[30%] py-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-3 mb-7">
//           <span className="flex whitespace-nowrap">
//             <BiMessageSquareAdd className="mr-2" size={20} />
//             Create Events
//           </span>
//         </button>
//       </Link>
//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {events.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Image</Table.HeadCell>
//                 <Table.HeadCell>Title</Table.HeadCell>
//                 <Table.HeadCell>Date</Table.HeadCell>
//                 <Table.HeadCell>Venue</Table.HeadCell>
//                 <Table.HeadCell>Event Type</Table.HeadCell>
//                 <Table.HeadCell>Speakers</Table.HeadCell>
//                 <Table.HeadCell>Delete</Table.HeadCell>
//                 <Table.HeadCell>Edit</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {events.map((event) => (
//                   <Table.Row
//                     key={event._id}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <Table.Cell>
//                       <img
//                         src={`${backendURL}${event.image}`}
//                         alt={event.title}
//                         className="w-20 h-20 object-cover bg-gray-500 rounded-full"
//                       />
//                     </Table.Cell>
//                     <Table.Cell>
//                       <span className="font-medium text-gray-900 dark:text-white">
//                         {event.title}
//                       </span>
//                     </Table.Cell>
//                     <Table.Cell>
//                       {format(
//                         new Date(event.date),
//                         "EEE, MMM d • h:mm a 'GMT'xxx"
//                       )}
//                     </Table.Cell>
//                     <Table.Cell>{event.venue}</Table.Cell>
//                     <Table.Cell>{event.eventType}</Table.Cell>
//                     <Table.Cell>{event.speakers.join(", ")}</Table.Cell>
//                     <Table.Cell>
//                       <span
//                         onClick={() => {
//                           deleteOpen();
//                           setEventIdToDelete(event._id);
//                         }}
//                         className="font-medium text-red-500 hover:underline cursor-pointer"
//                       >
//                         Delete
//                       </span>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link
//                         className="text-teal-500 hover:underline"
//                         to={`/DashBoard/Admin/CreateEvents/${event._id}`}
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
//           <p>You have no events yet!</p>
//         )}

//         <Dialog
//           open={deleteOpen}
//           onClose={deleteClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             Are you sure you want to delete this event?
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               Confirm delete or cancel
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={deleteClose}>
//               <IoClose
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//             <Button onClick={handleDeleteEvent}>
//               <AiTwotoneDelete
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//           </DialogActions>
//         </Dialog>
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
import { format } from "date-fns";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function AdminEventLists() {
  const { userInfo } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [eventIdToDelete, setEventIdToDelete] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
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

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  useEffect(() => {
    fetchEvents();
  }, [userInfo]);

  const fetchEvents = async (startIndex = 0) => {
    try {
      const res = await fetch(
        `${backendURL}/api/getEvents?startIndex=${startIndex}&limit=9`
      );
      const data = await res.json();
      if (res.ok) {
        if (startIndex === 0) {
          setEvents(data.events);
        } else {
          setEvents((prev) => [...prev, ...data.events]);
        }
        setShowMore(data.events.length === 9);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      showSnackbar("Failed to fetch events", "error");
    }
  };

  const handleShowMore = () => {
    const startIndex = events.length;
    fetchEvents(startIndex);
  };

  const handleDeleteEvent = async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteEvent/${eventIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setEvents((prev) =>
          prev.filter((event) => event._id !== eventIdToDelete)
        );
        showSnackbar("Event deleted successfully", "success");
        handleDeleteClose();
      } else {
        showSnackbar(data.message || "Failed to delete event", "error");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      showSnackbar("An error occurred while deleting the event", "error");
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Link to="/DashBoard/Admin/CreateEvents">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] mid:w-[30%] py-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-3 mb-7">
          <span className="flex whitespace-nowrap">
            <BiMessageSquareAdd className="mr-2" size={20} />
            Create Events
          </span>
        </button>
      </Link>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {events.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Venue</Table.HeadCell>
                <Table.HeadCell>Event Type</Table.HeadCell>
                <Table.HeadCell>Speakers</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {events.map((event) => (
                  <Table.Row
                    key={event._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <img
                        src={`${backendURL}${event.image}`}
                        alt={event.title}
                        className="w-20 h-20 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/event/${event.slug}`}>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {format(
                        new Date(event.date),
                        "EEE, MMM d • h:mm a 'GMT'xxx"
                      )}
                    </Table.Cell>
                    <Table.Cell>{event.venue}</Table.Cell>
                    <Table.Cell>{event.eventType}</Table.Cell>
                    <Table.Cell>
                      {event.speakers.map((speaker, index) => (
                        <span key={index}>
                          {speaker.name}
                          {index < event.speakers.length - 1 && ", "}
                        </span>
                      ))}
                    </Table.Cell>

                    <Table.Cell>
                      <span
                        onClick={() => {
                          handleDeleteOpen();
                          setEventIdToDelete(event._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/DashBoard/Admin/CreateEvents/${event._id}`}
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
          <p>You have no events yet!</p>
        )}

        <Dialog
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this event?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirm delete or cancel
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>
              <IoClose
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
            <Button onClick={handleDeleteEvent}>
              <AiTwotoneDelete
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
          </DialogActions>
        </Dialog>
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
