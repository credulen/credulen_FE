// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
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

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export default function Authors() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [authors, setAuthors] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [authorIdToDelete, setAuthorIdToDelete] = useState("");

//   const [Deleteopen, setDeleteOpen] = useState(false);
//   const deleteOpen = () => setDeleteOpen(true);

//   // Function to close modal

//   const deleteClose = () => setDeleteOpen(false);

//   useEffect(() => {
//     fetchAuthors();
//   }, [userInfo]);

//   const fetchAuthors = async (startIndex = 0) => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/getAllAuthors?startIndex=${startIndex}&limit=9`
//       );
//       const data = await res.json();
//       if (res.ok) {
//         if (startIndex === 0) {
//           setAuthors(data);
//         } else {
//           setAuthors((prev) => [...prev, ...data]);
//         }
//         setShowMore(data.length === 9);
//       }
//     } catch (error) {
//       console.error("Error fetching authors:", error);
//       toast.error("Failed to fetch authors");
//     }
//   };

//   const handleShowMore = () => {
//     const startIndex = authors.length;
//     fetchAuthors(startIndex);
//   };

//   const handleDeleteAuthor = async () => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/deleteAuthor/${authorIdToDelete}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setAuthors((prev) =>
//           prev.filter((author) => author._id !== authorIdToDelete)
//         );
//         toast.success("Author deleted successfully");
//         deleteClose();
//       } else {
//         toast.error(data.message || "Failed to delete author");
//       }
//     } catch (error) {
//       console.error("Error deleting author:", error);
//       toast.error("An error occurred while deleting the author");
//     }
//   };

//   return (
//     <>
//       <Link to="/DashBoard/Admin/CreateAuthor">
//         <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] mid:w-[30%] py-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-3 mb-7">
//           <span className="flex whitespace-nowrap">
//             <BiMessageSquareAdd className="mr-2" size={20} />
//             Create Author
//           </span>
//         </button>
//       </Link>
//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {authors?.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Name</Table.HeadCell>
//                 <Table.HeadCell>Image</Table.HeadCell>
//                 <Table.HeadCell>Bio</Table.HeadCell>
//                 <Table.HeadCell>Email</Table.HeadCell>
//                 <Table.HeadCell>Delete</Table.HeadCell>
//                 <Table.HeadCell>Edit</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {authors.map((author) => (
//                   <Table.Row
//                     key={author._id}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <Table.Cell>{author.name}</Table.Cell>
//                     <Table.Cell>
//                       <img
//                         src={`${backendURL}${author.image}`}
//                         alt={author.name}
//                         className="w-20 h-20 object-cover bg-gray-500 rounded-full"
//                       />
//                     </Table.Cell>
//                     <Table.Cell>{author.bio}</Table.Cell>
//                     <Table.Cell>{author.email}</Table.Cell>
//                     <Table.Cell>
//                       <span
//                         onClick={() => {
//                           deleteOpen();
//                           setAuthorIdToDelete(author._id);
//                         }}
//                         className="font-medium text-red-500 hover:underline cursor-pointer"
//                       >
//                         Delete
//                       </span>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <Link
//                         className="text-teal-500 hover:underline"
//                         to={`/DashBoard/Admin/UpdateAuthor/${author._id}`}
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
//           <p>No authors found!</p>
//         )}

//         <Dialog
//           open={deleteOpen}
//           onClose={deleteClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             Are you sure you want to delete this author?
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               This action cannot be undone. All posts associated with this
//               author will be affected.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={deleteClose}>
//               <IoClose
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//             <Button onClick={handleDeleteAuthor}>
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
// }

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Authors() {
  const { userInfo } = useSelector((state) => state.auth);
  const [authors, setAuthors] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [authorIdToDelete, setAuthorIdToDelete] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (authorId) => {
    setAuthorIdToDelete(authorId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAuthorIdToDelete("");
  };

  useEffect(() => {
    fetchAuthors();
  }, [userInfo]);

  const fetchAuthors = async (startIndex = 0) => {
    try {
      const res = await fetch(
        `${backendURL}/api/getAllAuthors?startIndex=${startIndex}&limit=9`
      );
      const data = await res.json();
      if (res.ok) {
        if (startIndex === 0) {
          setAuthors(data);
        } else {
          setAuthors((prev) => [...prev, ...data]);
        }
        setShowMore(data.length === 9);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
      toast.error("Failed to fetch authors");
    }
  };

  const handleShowMore = () => {
    const startIndex = authors.length;
    fetchAuthors(startIndex);
  };

  const handleDeleteAuthor = async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteAuthor/${authorIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAuthors((prev) =>
          prev.filter((author) => author._id !== authorIdToDelete)
        );
        toast.success("Author deleted successfully");
        closeDeleteModal();
      } else {
        toast.error(data.message || "Failed to delete author");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      toast.error("An error occurred while deleting the author");
    }
  };

  return (
    <>
      <Link to="/DashBoard/Admin/CreateAuthor">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] mid:w-[30%] py-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-3 mb-7">
          <span className="flex whitespace-nowrap">
            <BiMessageSquareAdd className="mr-2" size={20} />
            Create Author
          </span>
        </button>
      </Link>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {authors?.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Bio</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {authors.map((author) => (
                  <Table.Row
                    key={author._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{author.name}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={`${backendURL}${author.image}`}
                        alt={author.name}
                        className="w-20 h-20 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{author.bio}</Table.Cell>
                    <Table.Cell>{author.email}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => openDeleteModal(author._id)}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/DashBoard/Admin/CreateAuthor/${author._id}`}
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
          <p>No authors found!</p>
        )}

        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this author?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone. All posts associated with this
              author will be affected.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal}>
              <IoClose
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
            <Button onClick={handleDeleteAuthor}>
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
}
