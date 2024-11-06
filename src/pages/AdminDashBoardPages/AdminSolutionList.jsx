// import React, { useEffect, useState, useCallback, memo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Table, Button } from "flowbite-react";
// import { BiMessageSquareAdd } from "react-icons/bi";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { CircularProgress } from "@mui/material";
// import moment from "moment";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// // Memoized components
// const Alert = memo(
//   React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   })
// );

// const LoadingSpinner = memo(() => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//     <CircularProgress size={40} className="text-btColour" />
//   </div>
// ));

// // Memoized table row component
// const SolutionTableRow = memo(({ solution, onDeleteClick }) => (
//   <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//     <Table.Cell>{moment(solution.updatedAt).format("MMMM D")}</Table.Cell>
//     <Table.Cell>
//       <Link to={`/solution/${solution.slug}`}>
//         <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center bg-gray-500">
//           <img
//             src={`${backendURL}${solution.image}`}
//             alt={solution.title}
//             className="w-full h-full object-cover"
//             loading="lazy"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/fallback-image.png";
//             }}
//           />
//         </div>
//       </Link>
//     </Table.Cell>
//     <Table.Cell>
//       <Link
//         className="font-medium text-gray-900 dark:text-white"
//         to={`/solution/${solution.slug}`}
//       >
//         {solution.title.length > 50
//           ? `${solution.title.substring(0, 50)}...`
//           : solution.title}
//       </Link>
//     </Table.Cell>
//     <Table.Cell>{solution.category}</Table.Cell>
//     <Table.Cell>
//       <span
//         onClick={() => onDeleteClick(solution._id)}
//         className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md "
//       >
//         Delete
//       </span>
//     </Table.Cell>
//     <Table.Cell>
//       <Link
//         className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
//         to={`/DashBoard/Admin/CreateSolutions/${solution.slug}`}
//       >
//         <span>Edit</span>
//       </Link>
//     </Table.Cell>
//   </Table.Row>
// ));

// export default function AdminSolutionList() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [solutions, setSolutions] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [solutionIdToDelete, setSolutionIdToDelete] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const fetchSolutions = useCallback(async (startIndex = 0) => {
//     try {
//       startIndex === 0 ? setInitialLoading(true) : setLoading(true);
//       const res = await fetch(
//         `${backendURL}/api/getAllSolutions?startIndex=${startIndex}&limit=9`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setSolutions((prev) =>
//           startIndex === 0 ? data.solutions : [...prev, ...data.solutions]
//         );
//         setShowMore(data.solutions.length === 9);
//       } else {
//         throw new Error(data.message || "Failed to fetch solutions");
//       }
//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       setSnackbar({
//         open: true,
//         message: error.message,
//         severity: "error",
//       });
//     } finally {
//       startIndex === 0 ? setInitialLoading(false) : setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSolutions();
//   }, [fetchSolutions, userInfo]);

//   const handleShowMore = useCallback(() => {
//     if (!loading) {
//       fetchSolutions(solutions.length);
//     }
//   }, [fetchSolutions, loading, solutions.length]);

//   const openDeleteModal = useCallback((solutionId) => {
//     setSolutionIdToDelete(solutionId);
//     setIsDeleteModalOpen(true);
//   }, []);

//   const closeDeleteModal = useCallback(() => {
//     setIsDeleteModalOpen(false);
//     setSolutionIdToDelete("");
//   }, []);

//   const handleDeleteSolution = useCallback(async () => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/deleteSolution/${solutionIdToDelete}`,
//         { method: "DELETE" }
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setSolutions((prev) =>
//           prev.filter((solution) => solution._id !== solutionIdToDelete)
//         );
//         setSnackbar({
//           open: true,
//           message: "Solution deleted successfully",
//           severity: "success",
//         });
//         closeDeleteModal();
//       } else {
//         throw new Error(data.message || "Failed to delete solution");
//       }
//     } catch (error) {
//       console.error("Error deleting solution:", error);
//       setSnackbar({
//         open: true,
//         message: error.message,
//         severity: "error",
//       });
//     }
//   }, [solutionIdToDelete, closeDeleteModal]);

//   const handleCloseSnackbar = useCallback((event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   }, []);

//   if (initialLoading) return <LoadingSpinner />;

//   return (
//     <>
//       <div className="my-5 ml-3 mid:mt-20">
//         <Link to="/DashBoard/Admin/CreateSolutions">
//           <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
//             <span className="flex whitespace-nowrap">
//               <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
//               Create Solution
//             </span>
//           </button>
//         </Link>
//       </div>

//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {solutions.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Date updated</Table.HeadCell>
//                 <Table.HeadCell>Solution image</Table.HeadCell>
//                 <Table.HeadCell>Solution title</Table.HeadCell>
//                 <Table.HeadCell>Category</Table.HeadCell>
//                 <Table.HeadCell>Delete</Table.HeadCell>
//                 <Table.HeadCell>Edit</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {solutions.map((solution) => (
//                   <SolutionTableRow
//                     key={solution._id}
//                     solution={solution}
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
//           <p>You have no solutions yet!</p>
//         )}

//         <Dialog
//           open={isDeleteModalOpen}
//           onClose={closeDeleteModal}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             Are you sure you want to delete this solution?
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               This action cannot be undone. All associated data with this
//               solution will be affected.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={closeDeleteModal}>
//               <IoClose
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//             <Button onClick={handleDeleteSolution}>
//               <AiTwotoneDelete
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={snackbar.severity}
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </div>
//     </>
//   );
// }

// import React, { useEffect, useState, useCallback, memo } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Table, Button, Dropdown } from "flowbite-react";
// import { BiMessageSquareAdd } from "react-icons/bi";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { CircularProgress } from "@mui/material";
// import moment from "moment";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// // Memoized components
// const Alert = memo(
//   React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   })
// );

// const LoadingSpinner = memo(() => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//     <CircularProgress size={40} className="text-btColour" />
//   </div>
// ));

// // Memoized table row component
// const SolutionTableRow = memo(({ solution, onDeleteClick }) => (
//   <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//     <Table.Cell>{moment(solution.updatedAt).format("MMMM D")}</Table.Cell>
//     <Table.Cell>
//       <Link to={`/solution/${solution.slug}`}>
//         <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center bg-gray-500">
//           <img
//             src={`${backendURL}${solution.image}`}
//             alt={solution.title}
//             className="w-full h-full object-cover"
//             loading="lazy"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/fallback-image.png";
//             }}
//           />
//         </div>
//       </Link>
//     </Table.Cell>
//     <Table.Cell>
//       <Link
//         className="font-medium text-gray-900 dark:text-white"
//         to={`/solution/${solution.slug}`}
//       >
//         {solution.title.length > 50
//           ? `${solution.title.substring(0, 50)}...`
//           : solution.title}
//       </Link>
//     </Table.Cell>
//     <Table.Cell>{solution.category}</Table.Cell>
//     <Table.Cell>
//       <span
//         onClick={() => onDeleteClick(solution._id)}
//         className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md "
//       >
//         Delete
//       </span>
//     </Table.Cell>
//     <Table.Cell>
//       <Link
//         className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
//         to={`/DashBoard/Admin/CreateSolutions/${solution.slug}`}
//       >
//         <span>Edit</span>
//       </Link>
//     </Table.Cell>
//   </Table.Row>
// ));

// export default function AdminSolutionList() {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [solutions, setSolutions] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [solutionIdToDelete, setSolutionIdToDelete] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const fetchSolutions = useCallback(
//     async (startIndex = 0) => {
//       try {
//         startIndex === 0 ? setInitialLoading(true) : setLoading(true);
//         const res = await fetch(
//           `${backendURL}/api/getAllSolutionLists?startIndex=${startIndex}&limit=9${
//             selectedCategory ? `&category=${selectedCategory}` : ""
//           }`
//         );
//         const data = await res.json();

//         if (res.ok) {
//           setSolutions((prev) =>
//             startIndex === 0 ? data.solutions : [...prev, ...data.solutions]
//           );
//           setShowMore(data.solutions.length === 9);
//         } else {
//           throw new Error(data.message || "Failed to fetch solutions");
//         }
//       } catch (error) {
//         console.error("Error fetching solutions:", error);
//         setSnackbar({
//           open: true,
//           message: error.message,
//           severity: "error",
//         });
//       } finally {
//         startIndex === 0 ? setInitialLoading(false) : setLoading(false);
//       }
//     },
//     [selectedCategory]
//   );

//   useEffect(() => {
//     fetchSolutions();
//   }, [fetchSolutions, userInfo, selectedCategory]);

//   const handleShowMore = useCallback(() => {
//     if (!loading) {
//       fetchSolutions(solutions.length);
//     }
//   }, [fetchSolutions, loading, solutions.length]);

//   const handleCategoryFilter = useCallback((category) => {
//     setSelectedCategory(category);
//     setSolutions([]); // Reset solutions when changing filter
//   }, []);

//   const openDeleteModal = useCallback((solutionId) => {
//     setSolutionIdToDelete(solutionId);
//     setIsDeleteModalOpen(true);
//   }, []);

//   const closeDeleteModal = useCallback(() => {
//     setIsDeleteModalOpen(false);
//     setSolutionIdToDelete("");
//   }, []);

//   const handleDeleteSolution = useCallback(async () => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/deleteSolution/${solutionIdToDelete}`,
//         { method: "DELETE" }
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setSolutions((prev) =>
//           prev.filter((solution) => solution._id !== solutionIdToDelete)
//         );
//         setSnackbar({
//           open: true,
//           message: "Solution deleted successfully",
//           severity: "success",
//         });
//         closeDeleteModal();
//       } else {
//         throw new Error(data.message || "Failed to delete solution");
//       }
//     } catch (error) {
//       console.error("Error deleting solution:", error);
//       setSnackbar({
//         open: true,
//         message: error.message,
//         severity: "error",
//       });
//     }
//   }, [solutionIdToDelete, closeDeleteModal]);

//   const handleCloseSnackbar = useCallback((event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   }, []);

//   if (initialLoading) return <LoadingSpinner />;

//   return (
//     <>
//       <div className="my-5 ml-3 mid:mt-20 flex justify-between items-center">
//         <Link to="/DashBoard/Admin/CreateSolutions">
//           <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
//             <span className="flex whitespace-nowrap">
//               <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
//               Create Solution
//             </span>
//           </button>
//         </Link>

//   <div className="mr-3">
//     <Dropdown
//       style={{ color: "black" }}
//       label={selectedCategory || "Filter by Category"}
//     >
//       <Dropdown.Item
//         onClick={() => handleCategoryFilter("")}
//         style={{ color: "black" }}
//       >
//         All Categories
//       </Dropdown.Item>
//       <Dropdown.Item
//         onClick={() => handleCategoryFilter("TrainingSchool")}
//         style={{ color: "black" }}
//       >
//         Training School
//       </Dropdown.Item>
//       <Dropdown.Item
//         onClick={() => handleCategoryFilter("ConsultingService")}
//         style={{ color: "black" }}
//       >
//         Consulting Service
//       </Dropdown.Item>
//     </Dropdown>
//   </div>
// </div>

//       <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//         {solutions.length > 0 ? (
//           <>
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Date updated</Table.HeadCell>
//                 <Table.HeadCell>Solution image</Table.HeadCell>
//                 <Table.HeadCell>Solution title</Table.HeadCell>
//                 <Table.HeadCell>Category</Table.HeadCell>
//                 <Table.HeadCell>Delete</Table.HeadCell>
//                 <Table.HeadCell>Edit</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {solutions.map((solution) => (
//                   <SolutionTableRow
//                     key={solution._id}
//                     solution={solution}
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
//           <p>You have no solutions yet!</p>
//         )}

//         <Dialog
//           open={isDeleteModalOpen}
//           onClose={closeDeleteModal}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             Are you sure you want to delete this solution?
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               This action cannot be undone. All associated data with this
//               solution will be affected.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={closeDeleteModal}>
//               <IoClose
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//             <Button onClick={handleDeleteSolution}>
//               <AiTwotoneDelete
//                 size={24}
//                 className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
//               />
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={snackbar.severity}
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Dropdown } from "flowbite-react";
import { BiMessageSquareAdd } from "react-icons/bi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = memo(
  React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })
);

const LoadingSpinner = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} className="text-btColour" />
  </div>
));

const SolutionTableRow = memo(({ solution, onDeleteClick }) => (
  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    <Table.Cell>{moment(solution.updatedAt).format("MMMM D")}</Table.Cell>
    <Table.Cell>
      <Link to={`/solution/${solution.slug}`}>
        <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center bg-gray-500">
          <img
            src={`${backendURL}${solution.image}`}
            alt={solution.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.png";
            }}
          />
        </div>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <Link
        className="font-medium text-gray-900 dark:text-white"
        to={`/solution/${solution.slug}`}
      >
        {solution.title.length > 50
          ? `${solution.title.substring(0, 50)}...`
          : solution.title}
      </Link>
    </Table.Cell>
    <Table.Cell>{solution.category}</Table.Cell>
    <Table.Cell>
      <span
        onClick={() => onDeleteClick(solution._id)}
        className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md"
      >
        Delete
      </span>
    </Table.Cell>
    <Table.Cell>
      <Link
        className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
        to={`/DashBoard/Admin/CreateSolutions/${solution.slug}`}
      >
        <span>Edit</span>
      </Link>
    </Table.Cell>
  </Table.Row>
));

export default function AdminSolutionList() {
  const { userInfo } = useSelector((state) => state.auth);
  const [solutions, setSolutions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [solutionIdToDelete, setSolutionIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const PAGE_SIZE = 9;

  const fetchSolutions = useCallback(
    async (startIndex = 0) => {
      try {
        startIndex === 0 ? setInitialLoading(true) : setLoading(true);

        const queryParams = new URLSearchParams({
          startIndex: startIndex.toString(),
          pageSize: PAGE_SIZE.toString(),
        });

        if (selectedCategory) {
          queryParams.append("category", selectedCategory);
        }

        const res = await fetch(
          `${backendURL}/api/getAllSolutionLists?${queryParams.toString()}`
        );
        const data = await res.json();

        if (res.ok) {
          setSolutions((prev) =>
            startIndex === 0 ? data.solutions : [...prev, ...data.solutions]
          );
          setHasMore(data.pagination.hasMore);
          setTotalCount(data.pagination.totalCount);
        } else {
          throw new Error(data.message || "Failed to fetch solutions");
        }
      } catch (error) {
        console.error("Error fetching solutions:", error);
        setSnackbar({
          open: true,
          message: error.message,
          severity: "error",
        });
      } finally {
        startIndex === 0 ? setInitialLoading(false) : setLoading(false);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions, userInfo, selectedCategory]);

  const handleShowMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchSolutions(solutions.length);
    }
  }, [fetchSolutions, loading, hasMore, solutions.length]);

  const handleCategoryFilter = useCallback((category) => {
    setSelectedCategory(category);
    setSolutions([]); // Reset solutions when changing filter
    setHasMore(true); // Reset pagination state
  }, []);

  const openDeleteModal = useCallback((solutionId) => {
    setSolutionIdToDelete(solutionId);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSolutionIdToDelete("");
  }, []);

  const handleDeleteSolution = useCallback(async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteSolution/${solutionIdToDelete}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok) {
        setSolutions((prev) =>
          prev.filter((solution) => solution._id !== solutionIdToDelete)
        );
        setTotalCount((prev) => prev - 1);
        setSnackbar({
          open: true,
          message: "Solution deleted successfully",
          severity: "success",
        });
        closeDeleteModal();
      } else {
        throw new Error(data.message || "Failed to delete solution");
      }
    } catch (error) {
      console.error("Error deleting solution:", error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  }, [solutionIdToDelete, closeDeleteModal]);

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  if (initialLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="my-5 ml-3 mid:mt-20 flex justify-between items-center">
        <Link to="/DashBoard/Admin/CreateSolutions">
          <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
            <span className="flex whitespace-nowrap">
              <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
              Create Solution
            </span>
          </button>
        </Link>

        <div className="mr-3">
          <Dropdown
            style={{ color: "black" }}
            label={selectedCategory || "Filter by Category"}
          >
            <Dropdown.Item
              onClick={() => handleCategoryFilter("")}
              style={{ color: "black" }}
            >
              All Categories
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleCategoryFilter("TrainingSchool")}
              style={{ color: "black" }}
            >
              Training School
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleCategoryFilter("ConsultingService")}
              style={{ color: "black" }}
            >
              Consulting Service
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {solutions.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Solution image</Table.HeadCell>
                <Table.HeadCell>Solution title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {solutions.map((solution) => (
                  <SolutionTableRow
                    key={solution._id}
                    solution={solution}
                    onDeleteClick={openDeleteModal}
                  />
                ))}
              </Table.Body>
            </Table>

            {hasMore && (
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
          <p>You have no solutions yet!</p>
        )}

        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this solution?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone. All associated data with this
              solution will be affected.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteModal}>
              <IoClose
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
            <Button onClick={handleDeleteSolution}>
              <AiTwotoneDelete
                size={24}
                className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
              />
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
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
    </>
  );
}
