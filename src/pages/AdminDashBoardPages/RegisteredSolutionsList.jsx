// import React, { useEffect, useState } from "react";
// import { Table, Button, Dropdown, Modal } from "flowbite-react";
// import { toast } from "react-toastify";
// import moment from "moment";
// import { HiOutlineTrash } from "react-icons/hi";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export default function RegisteredSolutionsList() {
//   const [solutions, setSolutions] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [selectedSolution, setSelectedSolution] = useState("");
//   const [totalSolutions, setTotalSolutions] = useState(0);
//   const [lastMonthSolutions, setLastMonthSolutions] = useState(0);
//   const [availableSolutions, setAvailableSolutions] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   useEffect(() => {
//     fetchSolutions();
//   }, []);

//   useEffect(() => {
//     fetchSolutions(0);
//   }, [selectedSolution]);

//   const fetchSolutions = async (startIndex = 0) => {
//     try {
//       const res = await fetch(
//         `${backendURL}/api/getSolutionForms?startIndex=${startIndex}&limit=5${
//           selectedSolution ? `&selectedSolution=${selectedSolution}` : ""
//         }`
//       );
//       const data = await res.json();
//       if (res.ok) {
//         if (startIndex === 0) {
//           setSolutions(data.solutions);
//         } else {
//           setSolutions((prev) => [...prev, ...data.solutions]);
//         }
//         setShowMore(data.solutions.length === 5);
//         setTotalSolutions(data.totalSolutions);
//         setLastMonthSolutions(data.lastMonthSolutions);

//         // Extract unique selected solutions from all solutions
//         const uniqueSolutions = [
//           ...new Set(data.solutions.map((s) => s.selectedSolution)),
//         ];
//         setAvailableSolutions(uniqueSolutions);
//       }
//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       toast.error("Failed to fetch registered solutions");
//     }
//   };

//   const handleShowMore = () => {
//     const startIndex = solutions.length;
//     fetchSolutions(startIndex);
//   };

//   const handleFilter = (solution) => {
//     setSelectedSolution(solution);
//   };

//   const handleDeleteBySolution = async () => {
//     if (!selectedSolution) {
//       toast.error("Please select a solution to delete");
//       return;
//     }

//     try {
//       const res = await fetch(`${backendURL}/api/deleteSolutionsByType`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ selectedSolution }),
//       });

//       if (res.ok) {
//         toast.success(`Deleted all entries for ${selectedSolution}`);
//         setSelectedSolution("");
//         fetchSolutions(0);
//         setShowDeleteModal(false);
//       } else {
//         toast.error("Failed to delete solutions");
//       }
//     } catch (error) {
//       console.error("Error deleting solutions:", error);
//       toast.error("Failed to delete solutions");
//     }
//   };

//   return (
//     <div className="flex flex-col w-full h-full">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3">
//         <div className="flex items-center gap-4 mb-4 md:mb-0">
//           <h1 className="text-2xl font-semibold">Registered Solutions</h1>
//           <div className="flex gap-2 text-sm">
//             <span className="text-slate-700 font-semibold">
//               Total: {totalSolutions}
//             </span>
//             <span className="text-slate-700 font-semibold">
//               Last month: {lastMonthSolutions}
//             </span>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Dropdown
//             style={{ color: "black" }}
//             label={selectedSolution || "Filter by Solution"}
//           >
//             <Dropdown.Item
//               onClick={() => handleFilter("")}
//               style={{ color: "black" }}
//             >
//               All Solutions
//             </Dropdown.Item>
//             {availableSolutions.map((solution) => (
//               <Dropdown.Item
//                 key={solution}
//                 onClick={() => handleFilter(solution)}
//                 style={{ color: "black" }}
//               >
//                 {solution}
//               </Dropdown.Item>
//             ))}
//           </Dropdown>

//           <span className="mt-2">
//             <button
//               className="flex gap-2 font-medium hover:text-red-500 hover:bg-transparent cursor-pointer text-btColour p-1 rounded-md text-xs"
//               onClick={() => setShowDeleteModal(true)}
//             >
//               <HiOutlineTrash className="h-4 w-4" />
//               Delete All
//             </button>
//           </span>
//         </div>
//       </div>

//       <div className="flex-grow overflow-x-auto">
//         <div className="h-full overflow-y-auto">
//           {solutions.length > 0 ? (
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Full Name</Table.HeadCell>
//                 <Table.HeadCell>Phone Number</Table.HeadCell>
//                 <Table.HeadCell>Email</Table.HeadCell>
//                 <Table.HeadCell>Employment Status</Table.HeadCell>
//                 <Table.HeadCell>Job Title</Table.HeadCell>
//                 <Table.HeadCell>Selected Solution</Table.HeadCell>
//                 <Table.HeadCell>Submitted At</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {solutions.map((solution) => (
//                   <Table.Row
//                     key={solution._id}
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <Table.Cell>{solution.fullName}</Table.Cell>
//                     <Table.Cell>{solution.phoneNumber}</Table.Cell>
//                     <Table.Cell>{solution.email}</Table.Cell>
//                     <Table.Cell>{solution.employmentStatus}</Table.Cell>
//                     <Table.Cell>{solution.jobTitle}</Table.Cell>
//                     <Table.Cell>{solution.selectedSolution}</Table.Cell>
//                     <Table.Cell>
//                       {moment(solution.submittedAt).format("MMMM D, HH:mm")}
//                     </Table.Cell>
//                   </Table.Row>
//                 ))}
//               </Table.Body>
//             </Table>
//           ) : (
//             <p className="text-center py-4">No registered solutions found!</p>
//           )}
//         </div>
//       </div>

//       {showMore && (
//         <button
//           onClick={handleShowMore}
//           className="w-full text-teal-500 self-center text-sm py-4"
//         >
//           Show more
//         </button>
//       )}

//       <Dialog
//         open={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">Please Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <p className="text-base leading-relaxed text-gray-500  dark:text-gray-400">
//               Are you sure you want to delete all entries for{" "}
//               <span className="font-bold">
//                 {selectedSolution || "the selected solution"}?
//               </span>
//             </p>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setShowDeleteModal(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <IoClose size={24} />
//           </Button>
//           <Button
//             onClick={handleDeleteBySolution}
//             className="text-red-500 hover:text-red-700"
//           >
//             <AiTwotoneDelete size={24} />
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, Modal } from "flowbite-react";
import moment from "moment";
import { HiOutlineTrash } from "react-icons/hi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RegisteredSolutionsList() {
  const [solutions, setSolutions] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [selectedSolution, setSelectedSolution] = useState("");
  const [totalSolutions, setTotalSolutions] = useState(0);
  const [lastMonthSolutions, setLastMonthSolutions] = useState(0);
  const [availableSolutions, setAvailableSolutions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchSolutions();
  }, []);

  useEffect(() => {
    fetchSolutions(0);
  }, [selectedSolution]);

  const fetchSolutions = async (startIndex = 0) => {
    try {
      const res = await fetch(
        `${backendURL}/api/getSolutionForms?startIndex=${startIndex}&limit=5${
          selectedSolution ? `&selectedSolution=${selectedSolution}` : ""
        }`
      );
      const data = await res.json();
      if (res.ok) {
        if (startIndex === 0) {
          setSolutions(data.solutions);
        } else {
          setSolutions((prev) => [...prev, ...data.solutions]);
        }
        setShowMore(data.solutions.length === 5);
        setTotalSolutions(data.totalSolutions);
        setLastMonthSolutions(data.lastMonthSolutions);

        // Extract unique selected solutions from all solutions
        const uniqueSolutions = [
          ...new Set(data.solutions.map((s) => s.selectedSolution)),
        ];
        setAvailableSolutions(uniqueSolutions);
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch registered solutions",
        severity: "error",
      });
    }
  };

  const handleShowMore = () => {
    const startIndex = solutions.length;
    fetchSolutions(startIndex);
  };

  const handleFilter = (solution) => {
    setSelectedSolution(solution);
  };

  const handleDeleteBySolution = async () => {
    if (!selectedSolution) {
      setSnackbar({
        open: true,
        message: "Please select a solution to delete",
        severity: "error",
      });
      return;
    }

    try {
      const res = await fetch(`${backendURL}/api/deleteSolutionsByType`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedSolution }),
      });

      if (res.ok) {
        setSnackbar({
          open: true,
          message: `Deleted all entries for ${selectedSolution}`,
          severity: "success",
        });
        setSelectedSolution("");
        fetchSolutions(0);
        setShowDeleteModal(false);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to delete solutions",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting solutions:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete solutions",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold">Registered Solutions</h1>
          <div className="flex gap-2 text-sm">
            <span className="text-slate-700 font-semibold">
              Total: {totalSolutions}
            </span>
            <span className="text-slate-700 font-semibold">
              Last month: {lastMonthSolutions}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Dropdown
            style={{ color: "black" }}
            label={selectedSolution || "Filter by Solution"}
          >
            <Dropdown.Item
              onClick={() => handleFilter("")}
              style={{ color: "black" }}
            >
              All Solutions
            </Dropdown.Item>
            {availableSolutions.map((solution) => (
              <Dropdown.Item
                key={solution}
                onClick={() => handleFilter(solution)}
                style={{ color: "black" }}
              >
                {solution}
              </Dropdown.Item>
            ))}
          </Dropdown>

          <span className="mt-2">
            <button
              className="flex gap-2 font-medium hover:text-red-500 hover:bg-transparent cursor-pointer text-btColour p-1 rounded-md text-xs"
              onClick={() => setShowDeleteModal(true)}
            >
              <HiOutlineTrash className="h-4 w-4" />
              Delete All
            </button>
          </span>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {solutions.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Full Name</Table.HeadCell>
                <Table.HeadCell>Phone Number</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Employment Status</Table.HeadCell>
                <Table.HeadCell>Job Title</Table.HeadCell>
                <Table.HeadCell>Selected Solution</Table.HeadCell>
                <Table.HeadCell>Submitted At</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {solutions.map((solution) => (
                  <Table.Row
                    key={solution._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{solution.fullName}</Table.Cell>
                    <Table.Cell>{solution.phoneNumber}</Table.Cell>
                    <Table.Cell>{solution.email}</Table.Cell>
                    <Table.Cell>{solution.employmentStatus}</Table.Cell>
                    <Table.Cell>{solution.jobTitle}</Table.Cell>
                    <Table.Cell>{solution.selectedSolution}</Table.Cell>
                    <Table.Cell>
                      {moment(solution.submittedAt).format("MMMM D, HH:mm")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p className="text-center py-4">No registered solutions found!</p>
          )}
        </div>
      </div>

      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-4"
        >
          Show more
        </button>
      )}

      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Please Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="text-base leading-relaxed text-gray-500  dark:text-gray-400">
              Are you sure you want to delete all entries for{" "}
              <span className="font-bold">
                {selectedSolution || "the selected solution"}?
              </span>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeleteBySolution}
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
