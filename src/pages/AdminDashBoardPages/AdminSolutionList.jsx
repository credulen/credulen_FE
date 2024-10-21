import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button } from "flowbite-react";
import { BiMessageSquareAdd } from "react-icons/bi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import moment from "moment";
import "../../index.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminSolutionList() {
  const { userInfo } = useSelector((state) => state.auth);
  const [solutions, setSolutions] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [solutionIdToDelete, setSolutionIdToDelete] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const openDeleteModal = (solutionId) => {
    setSolutionIdToDelete(solutionId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSolutionIdToDelete("");
  };

  useEffect(() => {
    fetchSolutions();
  }, [userInfo]);

  const fetchSolutions = async (startIndex = 0) => {
    try {
      const res = await fetch(
        `${backendURL}/api/getAllSolutions?startIndex=${startIndex}&limit=9`
      );
      const data = await res.json();
      if (res.ok) {
        if (startIndex === 0) {
          setSolutions(data.solutions);
        } else {
          setSolutions((prev) => [...prev, ...data.solutions]);
        }
        setShowMore(data.solutions.length === 9);
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch solutions",
        severity: "error",
      });
    }
  };

  const handleShowMore = () => {
    const startIndex = solutions.length;
    fetchSolutions(startIndex);
  };

  const handleDeleteSolution = async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteSolution/${solutionIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSolutions((prev) =>
          prev.filter((solution) => solution._id !== solutionIdToDelete)
        );
        setSnackbar({
          open: true,
          message: "Solution deleted successfully",
          severity: "success",
        });
        closeDeleteModal();
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Failed to delete solution",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting solution:", error);
      setSnackbar({
        open: true,
        message: "An error occurred while deleting the solution",
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
    <>
      <div className="my-5 ml-3">
        <Link to="/DashBoard/Admin/CreateSolutions">
          <button className="text-btColour border border-btColour p-1 rounded-lg hover:font-semibold">
            <span className="flex whitespace-nowrap">
              <BiMessageSquareAdd className="mr-2 mt-1" size={16} />
              Create Solution
            </span>
          </button>
        </Link>
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
                  <Table.Row
                    key={solution._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      {moment(solution.updatedAt).format("MMMM D")}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/solution/${solution.slug}`}>
                        <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center bg-gray-500">
                          <img
                            src={`${backendURL}${solution.image}`}
                            alt={solution.title}
                            className="w-full h-full object-cover"
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
                        onClick={() => openDeleteModal(solution._id)}
                        className="font-medium text-white hover:text-red-500 hover:bg-transparent hover:border hover:border-red-500 cursor-pointer bg-btColour p-1 rounded-md"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour cursor-pointer bg-btColour p-1 rounded-md"
                        to={`/DashBoard/Admin/CreateSolutions/${solution.slug}`}
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
