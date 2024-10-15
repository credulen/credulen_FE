// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Table, Button } from "flowbite-react";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { BiMessageSquareAdd } from "react-icons/bi";
// import axios from "axios";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// const SpeakerList = () => {
//   const navigate = useNavigate();
//   const [speakers, setSpeakers] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [speakerIdToDelete, setSpeakerIdToDelete] = useState("");
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   const openDeleteModal = (speakerId) => {
//     setSpeakerIdToDelete(speakerId);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setSpeakerIdToDelete("");
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   useEffect(() => {
//     fetchSpeakers();
//   }, []);

//   const fetchSpeakers = async (startIndex = 0) => {
//     try {
//       const res = await axios.get(
//         `${backendURL}/api/getAllSpeakers?startIndex=${startIndex}&limit=9`
//       );
//       if (startIndex === 0) {
//         setSpeakers(res.data);
//         console.log(speakers);
//       } else {
//         setSpeakers((prev) => [...prev, ...res.data]);
//       }
//       setShowMore(res.data.length === 9);
//     } catch (error) {
//       console.error("Error fetching speakers:", error);
//       setSnackbarMessage("Failed to fetch speakers");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleShowMore = () => {
//     const startIndex = speakers.length;
//     fetchSpeakers(startIndex);
//   };

//   const handleDeleteSpeaker = async () => {
//     try {
//       await axios.delete(
//         `${backendURL}/api/deleteSpeaker/${speakerIdToDelete}`
//       );
//       setSpeakers((prev) =>
//         prev.filter((speaker) => speaker._id !== speakerIdToDelete)
//       );
//       setSnackbarMessage("Speaker deleted successfully");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       closeDeleteModal();
//     } catch (error) {
//       console.error("Error deleting speaker:", error);
//       setSnackbarMessage("An error occurred while deleting the speaker");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={() => navigate("/DashBoard/Admin/CreateSpeaker")}
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] mid:w-[30%] py-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-3 mb-7"
//       >
//         <BiMessageSquareAdd className="mr-2" size={20} />
//         Create Speaker
//       </Button>

//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {speakers.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Name....</Table.HeadCell>
//                 <Table.HeadCell>Image</Table.HeadCell>
//                 <Table.HeadCell>Bio</Table.HeadCell>
//                 <Table.HeadCell>Email</Table.HeadCell>
//                 <Table.HeadCell>CoName</Table.HeadCell>
//                 <Table.HeadCell>Occupation</Table.HeadCell>
//                 <Table.HeadCell>Delete</Table.HeadCell>
//                 <Table.HeadCell>Edit</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {speakers.map((speaker) => (
//                   <Table.Row
//                     key={speaker._id}
//                     className="bg-white  dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <Table.Cell>{speaker.name}</Table.Cell>
//                     <Table.Cell>
//                       <img
//                         src={`${backendURL}${speaker.image}`}
//                         alt={speaker.name}
//                         className="w-20 h-20 object-cover bg-gray-500 rounded-full"
//                       />
//                     </Table.Cell>
//                     <Table.Cell>{speaker.bio}</Table.Cell>
//                     <Table.Cell>{speaker.email}</Table.Cell>
//                     <Table.Cell>{speaker.CoName}</Table.Cell>
//                     <Table.Cell>{speaker.occupation}</Table.Cell>
//                     <Table.Cell>
//                       <span
//                         onClick={() => openDeleteModal(speaker._id)}
//                         className="font-medium text-red-500 hover:underline cursor-pointer"
//                       >
//                         Delete
//                       </span>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <span
//                         className="text-teal-500 hover:underline cursor-pointer"
//                         onClick={() =>
//                           navigate(
//                             `/DashBoard/Admin/CreateSpeaker/${speaker._id}`
//                           )
//                         }
//                       >
//                         Edit
//                       </span>
//                     </Table.Cell>
//                   </Table.Row>
//                 ))}
//               </Table.Body>
//             </Table>
//             {showMore && (
//               <Button onClick={handleShowMore} className="w-full mt-4">
//                 Show more
//               </Button>
//             )}
//           </>
//         ) : (
//           <p>No speakers found!</p>
//         )}

//         <Dialog
//           open={isDeleteModalOpen}
//           onClose={closeDeleteModal}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             Are you sure you want to delete this speaker?
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               This action cannot be undone. All associated data with this
//               speaker will be affected.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={closeDeleteModal}>
//               <IoClose size={24} className="text-red-500" />
//             </Button>
//             <Button onClick={handleDeleteSpeaker}>
//               <AiTwotoneDelete size={24} className="text-red-500" />
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for success and error messages */}
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={3000}
//           onClose={handleSnackbarClose}
//         >
//           <Alert
//             onClose={handleSnackbarClose}
//             severity={snackbarSeverity}
//             sx={{ width: "100%" }}
//           >
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </div>
//     </>
//   );
// };

// export default SpeakerList;
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Table, Button } from "flowbite-react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const SpeakerList = () => {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [speakerIdToDelete, setSpeakerIdToDelete] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (speakerId) => {
    setSpeakerIdToDelete(speakerId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSpeakerIdToDelete("");
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async (startIndex = 0) => {
    try {
      const res = await axios.get(
        `${backendURL}/api/getAllSpeakers?startIndex=${startIndex}&limit=9`
      );
      if (startIndex === 0) {
        setSpeakers(res.data);
      } else {
        setSpeakers((prev) => [...prev, ...res.data]);
      }
      setShowMore(res.data.length === 9);
    } catch (error) {
      console.error("Error fetching speakers:", error);
      toast.error("Failed to fetch speakers");
    }
  };

  const handleShowMore = () => {
    const startIndex = speakers.length;
    fetchSpeakers(startIndex);
  };

  const handleDeleteSpeaker = async () => {
    try {
      await axios.delete(
        `${backendURL}/api/deleteSpeaker/${speakerIdToDelete}`
      );
      setSpeakers((prev) =>
        prev.filter((speaker) => speaker._id !== speakerIdToDelete)
      );
      toast.success("Speaker deleted successfully");
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting speaker:", error);
      toast.error("An error occurred while deleting the speaker");
    }
  };

  return (
    <>
      <div className="my-5 ml-3">
        <Link to="/DashBoard/Admin/CreateSpeaker">
          <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
            <span className="flex whitespace-nowrap">
              <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
              Create Speaker
            </span>
          </button>
        </Link>
      </div>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {speakers.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Bio</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>CoName</Table.HeadCell>
                <Table.HeadCell>Occupation</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {speakers.map((speaker) => (
                  <Table.Row
                    key={speaker._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{speaker.name}</Table.Cell>
                    <Table.Cell>
                      {speaker.image ? (
                        <img
                          src={`${backendURL}${speaker.image}`}
                          alt={speaker.name}
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fallback-image.png";
                          }}
                        />
                      ) : (
                        <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {speaker.bio.length > 50
                        ? `${speaker.bio.substring(0, 50)}...`
                        : speaker.bio}
                    </Table.Cell>
                    <Table.Cell>{speaker.email}</Table.Cell>
                    <Table.Cell>{speaker.CoName}</Table.Cell>
                    <Table.Cell>{speaker.occupation}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => openDeleteModal(speaker._id)}
                        className="font-medium text-white hover:text-red-500 hover:bg-transparent hover:border hover:border-red-500 cursor-pointer bg-btColour p-1 rounded-md"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour cursor-pointer bg-btColour p-1 rounded-md"
                        to={`/DashBoard/Admin/CreateSpeaker/${speaker._id}`}
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
          <p>No speakers found!</p>
        )}

        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this speaker?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone. All associated data with this
              speaker will be affected.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal}>
              <IoClose
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
            <Button onClick={handleDeleteSpeaker}>
              <AiTwotoneDelete
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SpeakerList;
