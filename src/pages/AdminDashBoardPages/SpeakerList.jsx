// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Table, Button } from "flowbite-react";
// import { toast } from "react-toastify";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { BiMessageSquareAdd } from "react-icons/bi";
// import { HiOutlineUserCircle } from "react-icons/hi";
// import { CircularProgress } from "@mui/material";
// import axios from "axios";
// import Spinner from "../../components/tools/Spinner";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const SpeakerList = () => {
//   const navigate = useNavigate();
//   const [speakers, setSpeakers] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [speakerIdToDelete, setSpeakerIdToDelete] = useState("");
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const openDeleteModal = (speakerId) => {
//     setSpeakerIdToDelete(speakerId);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setSpeakerIdToDelete("");
//   };

//   useEffect(() => {
//     fetchSpeakers();
//   }, []);

//   const fetchSpeakers = useCallback(async (startIndex = 0) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${backendURL}/api/getAllSpeakers?startIndex=${startIndex}&limit=9`
//       );
//       if (startIndex === 0) {
//         setSpeakers(res.data);
//       } else {
//         setSpeakers((prev) => [...prev, ...res.data]);
//       }
//       setShowMore(res.data.length === 9);
//     } catch (error) {
//       console.error("Error fetching speakers:", error);
//       toast.error("Failed to fetch speakers");
//     } finally {
//       setLoading(false);
//     }
//   });

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
//       toast.success("Speaker deleted successfully");
//       closeDeleteModal();
//     } catch (error) {
//       console.error("Error deleting speaker:", error);
//       toast.error("An error occurred while deleting the speaker");
//     }
//   };

//   const LoadingSpinner = useMemo(
//     () => (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//         <CircularProgress size={40} className="text-btColour" />
//       </div>
//     ),
//     []
//   );

//   if (loading) {
//     return (
//       <>
//         <Spinner />
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="my-5 ml-3 mid:mt-20">
//         <Link to="/DashBoard/Admin/CreateSpeaker">
//           <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
//             <span className="flex whitespace-nowrap">
//               <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
//               Create Speaker
//             </span>
//           </button>
//         </Link>
//       </div>
//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {speakers.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Name</Table.HeadCell>
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
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                     <Table.Cell>{speaker.name}</Table.Cell>
//                     <Table.Cell>
//                       {speaker.image ? (
//                         <img
//                           src={`${speaker.image}`}
//                           alt={speaker.name}
//                           className="w-10 h-10 rounded-full"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = "/fallback-image.png";
//                           }}
//                         />
//                       ) : (
//                         <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
//                       )}
//                     </Table.Cell>
//                     <Table.Cell>
//                       {speaker.bio.length > 50
//                         ? `${speaker.bio.substring(0, 50)}...`
//                         : speaker.bio}
//                     </Table.Cell>
//                     <Table.Cell>{speaker.email}</Table.Cell>
//                     <Table.Cell>{speaker.CoName}</Table.Cell>
//                     <Table.Cell>{speaker.occupation}</Table.Cell>
//                     <Table.Cell>
//                       <span
//                         onClick={() => openDeleteModal(speaker._id)}
//                         className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md ">
//                         Delete
//                       </span>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link
//                         className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
//                         to={`/DashBoard/Admin/CreateSpeaker/${speaker._id}`}>
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
//                 className="w-full text-teal-500 self-center text-sm py-7">
//                 Show more
//               </button>
//             )}
//           </>
//         ) : (
//           <p>No speakers found!</p>
//         )}

//         <Dialog
//           open={isDeleteModalOpen}
//           onClose={closeDeleteModal}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description">
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
//               <IoClose
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//             <Button onClick={handleDeleteSpeaker}>
//               <AiTwotoneDelete
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </>
//   );
// };

// export default SpeakerList;
import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Spinner from "../../components/tools/Spinner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const SpeakerList = () => {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [speakerIdToDelete, setSpeakerIdToDelete] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const fetchSpeakers = useCallback(async (startIndex = 0) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  });

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

  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-primary-50 dark:bg-neutral-800-dark bg-opacity-75 z-50">
        <CircularProgress size={40} sx={{ color: "#080759" }} />
      </div>
    ),
    []
  );

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <div className="my-5 ml-3 mid:mt-20">
        <Link to="/DashBoard/Admin/CreateSpeaker">
          <button className="text-primary-500 border border-primary-500 p-1 rounded-lg hover:bg-primary-500 hover:text-white hover:font-semibold">
            <span className="flex whitespace-nowrap">
              <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
              Create Speaker
            </span>
          </button>
        </Link>
      </div>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-primary-50 scrollbar-thumb-neutral-200 dark:scrollbar-track-neutral-800-dark dark:scrollbar-thumb-neutral-600-dark shadow-md rounded-lg border border-primary-100">
        {speakers.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Image
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Bio
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  CoName
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Occupation
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Delete
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Edit
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-primary-100">
                {speakers.map((speaker) => (
                  <Table.Row
                    key={speaker._id}
                    className="bg-white dark:border-primary-200-dark dark:bg-neutral-800">
                    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
                      {speaker.name}
                    </Table.Cell>
                    <Table.Cell>
                      {speaker.image ? (
                        <img
                          src={`${speaker.image}`}
                          alt={speaker.name}
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fallback-image.png";
                          }}
                        />
                      ) : (
                        <HiOutlineUserCircle className="w-10 h-10 text-neutral-600 dark:text-neutral-600-dark" />
                      )}
                    </Table.Cell>
                    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
                      {speaker.bio.length > 50
                        ? `${speaker.bio.substring(0, 50)}...`
                        : speaker.bio}
                    </Table.Cell>
                    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
                      {speaker.email}
                    </Table.Cell>
                    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
                      {speaker.CoName}
                    </Table.Cell>
                    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
                      {speaker.occupation}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => openDeleteModal(speaker._id)}
                        className="font-medium text-error-500 bg-transparent border border-error-500 cursor-pointer hover:bg-primary-500 hover:text-white p-1 rounded-md">
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-white bg-primary-500 hover:text-primary-500 hover:bg-transparent hover:border hover:border-primary-500 p-1 rounded-md transition-all duration-300 px-2"
                        to={`/DashBoard/Admin/CreateSpeaker/${speaker._id}`}>
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
                className="w-full text-primary-500 hover:text-secondary-500 self-center text-sm py-7">
                Show more
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-neutral-600 dark:text-neutral-600-dark py-4">
            No speakers found!
          </p>
        )}

        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" sx={{ color: "#080759" }}>
            Are you sure you want to delete this speaker?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "#5E6D7A" }}>
              This action cannot be undone. All associated data with this
              speaker will be affected.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeDeleteModal}
              sx={{ color: "#5E6D7A", "&:hover": { color: "#3B4A54" } }}>
              <IoClose size={24} />
            </Button>
            <Button
              onClick={handleDeleteSpeaker}
              sx={{ color: "#EF4444", "&:hover": { color: "#B91C1C" } }}>
              <AiTwotoneDelete size={24} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SpeakerList;
