// import React, { useEffect, useState, useCallback, memo } from "react";
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
// import { HiOutlineUserCircle } from "react-icons/hi";
// import { CircularProgress } from "@mui/material";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// // Memoized loading spinner component
// const LoadingSpinner = memo(() => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//     <CircularProgress size={40} className="text-btColour" />
//   </div>
// ));

// // Memoized author table row component
// const AuthorTableRow = memo(({ author, onDeleteClick }) => (
//   <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//     <Table.Cell>{author.name}</Table.Cell>
//     <Table.Cell>
//       {author.image ? (
//         <img
//           src={`${backendURL}${author.image}`}
//           alt={author.username}
//           className="w-10 h-10 rounded-full"
//           loading="lazy"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "/fallback-image.png";
//           }}
//         />
//       ) : (
//         <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
//       )}
//     </Table.Cell>
//     <Table.Cell>
//       {author.bio.length > 50
//         ? `${author.bio.substring(0, 50)}...`
//         : author.bio}
//     </Table.Cell>
//     <Table.Cell>{author.email}</Table.Cell>
//     <Table.Cell>
//       <span
//         onClick={() => onDeleteClick(author._id)}
//         className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md "
//       >
//         Delete
//       </span>
//     </Table.Cell>
//     <Table.Cell>
//       <Link
//         className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
//         to={`/DashBoard/Admin/CreateAuthor/${author._id}`}
//       >
//         <span>Edit</span>
//       </Link>
//     </Table.Cell>
//   </Table.Row>
// ));

// export default function AutthorList() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [authors, setAuthors] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [authorIdToDelete, setAuthorIdToDelete] = useState("");
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   const fetchAuthors = useCallback(async (startIndex = 0) => {
//     try {
//       startIndex === 0 ? setInitialLoading(true) : setLoading(true);

//       const res = await fetch(
//         `${backendURL}/api/getAllAuthors?startIndex=${startIndex}&limit=9`
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch authors");
//       }

//       const data = await res.json();

//       setAuthors((prev) => (startIndex === 0 ? data : [...prev, ...data]));
//       setShowMore(data.length === 9);
//     } catch (error) {
//       console.error("Error fetching authors:", error);
//       toast.error(error.message || "Failed to fetch authors");
//     } finally {
//       startIndex === 0 ? setInitialLoading(false) : setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAuthors();
//   }, [fetchAuthors, userInfo]);

//   const handleShowMore = useCallback(() => {
//     if (!loading) {
//       fetchAuthors(authors.length);
//     }
//   }, [fetchAuthors, loading, authors.length]);

//   const openDeleteModal = useCallback((authorId) => {
//     setAuthorIdToDelete(authorId);
//     setIsDeleteModalOpen(true);
//   }, []);

//   const closeDeleteModal = useCallback(() => {
//     setIsDeleteModalOpen(false);
//     setAuthorIdToDelete("");
//   }, []);

//   const handleDeleteAuthor = useCallback(async () => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/deleteAuthor/${authorIdToDelete}`,
//         { method: "DELETE" }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to delete author");
//       }

//       setAuthors((prev) =>
//         prev.filter((author) => author._id !== authorIdToDelete)
//       );
//       toast.success("Author deleted successfully");
//       closeDeleteModal();
//     } catch (error) {
//       console.error("Error deleting author:", error);
//       toast.error(
//         error.message || "An error occurred while deleting the author"
//       );
//     }
//   }, [authorIdToDelete, closeDeleteModal]);

//   if (initialLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <>
//       <div className="my-5 ml-3 mid:mt-20">
//         <Link to="/DashBoard/Admin/CreateAuthor">
//           <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
//             <span className="flex whitespace-nowrap">
//               <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
//               Create Author
//             </span>
//           </button>
//         </Link>
//       </div>

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
//                   <AuthorTableRow
//                     key={author._id}
//                     author={author}
//                     onDeleteClick={openDeleteModal}
//                   />
//                 ))}
//               </Table.Body>
//             </Table>

//             {showMore && (
//               <button
//                 onClick={handleShowMore}
//                 disabled={loading}
//                 className="w-full text-teal-500 self-center text-sm py-7 disabled:opacity-50"
//               >
//                 {loading ? "Loading..." : "Show more"}
//               </button>
//             )}
//           </>
//         ) : (
//           <p>No authors found!</p>
//         )}

//         <Dialog
//           open={isDeleteModalOpen}
//           onClose={closeDeleteModal}
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
//             <Button onClick={closeDeleteModal}>
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

import React, { useEffect, useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "../../components/tools/SnackBarProvider";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} className="text-btColour" />
  </div>
));

const AuthorTableRow = memo(({ author, onDeleteClick }) => (
  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    <Table.Cell>{author.name}</Table.Cell>
    <Table.Cell>
      {author.image ? (
        <img
          src={`${backendURL}${author.image}`}
          alt={author.username}
          className="w-10 h-10 rounded-full"
          loading="lazy"
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
      {author.bio.length > 50
        ? `${author.bio.substring(0, 50)}...`
        : author.bio}
    </Table.Cell>
    <Table.Cell>{author.email}</Table.Cell>
    <Table.Cell>
      <span
        onClick={() => onDeleteClick(author._id)}
        className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md"
      >
        Delete
      </span>
    </Table.Cell>
    <Table.Cell>
      <Link
        className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
        to={`/DashBoard/Admin/CreateAuthor/${author._id}`}
      >
        <span>Edit</span>
      </Link>
    </Table.Cell>
  </Table.Row>
));

export default function AuthorList() {
  const { userInfo } = useSelector((state) => state.auth);
  const [authors, setAuthors] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [authorIdToDelete, setAuthorIdToDelete] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const showSnackbar = useSnackbar();

  const fetchAuthors = useCallback(
    async (startIndex = 0) => {
      try {
        startIndex === 0 ? setInitialLoading(true) : setLoading(true);

        const res = await fetch(
          `${backendURL}/api/getAllAuthors?startIndex=${startIndex}&limit=9`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch authors");
        }

        const data = await res.json();

        setAuthors((prev) => (startIndex === 0 ? data : [...prev, ...data]));
        setShowMore(data.length === 9);
      } catch (error) {
        console.error("Error fetching authors:", error);
        showSnackbar(error.message || "Failed to fetch authors");
      } finally {
        startIndex === 0 ? setInitialLoading(false) : setLoading(false);
      }
    },
    [showSnackbar]
  );

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors, userInfo]);

  const handleShowMore = useCallback(() => {
    if (!loading) {
      fetchAuthors(authors.length);
    }
  }, [fetchAuthors, loading, authors.length]);

  const openDeleteModal = useCallback((authorId) => {
    setAuthorIdToDelete(authorId);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setAuthorIdToDelete("");
  }, []);

  const handleDeleteAuthor = useCallback(async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteAuthor/${authorIdToDelete}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete author");
      }

      setAuthors((prev) =>
        prev.filter((author) => author._id !== authorIdToDelete)
      );
      showSnackbar("Author deleted successfully");
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting author:", error);
      showSnackbar(
        error.message || "An error occurred while deleting the author"
      );
    }
  }, [authorIdToDelete, closeDeleteModal, showSnackbar]);

  if (initialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="my-5 ml-3 mid:mt-20">
        <Link to="/DashBoard/Admin/CreateAuthor">
          <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
            <span className="flex whitespace-nowrap">
              <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
              Create Author
            </span>
          </button>
        </Link>
      </div>

      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {authors?.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Name </Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Bio</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {authors.map((author) => (
                  <AuthorTableRow
                    key={author._id}
                    author={author}
                    onDeleteClick={openDeleteModal}
                  />
                ))}
              </Table.Body>
            </Table>

            {showMore && (
              <button
                onClick={handleShowMore}
                disabled={loading}
                className="w-full text-teal-500 self-center text-sm py-7 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Show more"}
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
            <Button onClick={closeDeleteModal} color="primary">
              <IoClose
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
            <Button onClick={handleDeleteAuthor} color="primary">
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
