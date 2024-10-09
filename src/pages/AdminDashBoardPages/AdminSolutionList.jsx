import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button } from "flowbite-react";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminSolutionList() {
  const { userInfo } = useSelector((state) => state.auth);
  const [solutions, setSolutions] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [solutionIdToDelete, setSolutionIdToDelete] = useState("");
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

  const IsdeleteOpen = () => setDeleteOpen(true);
  const IsdeleteClose = () => setDeleteOpen(false);

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
      showSnackbar("Failed to fetch solutions", "error");
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
        showSnackbar("Solution deleted successfully", "success");
        IsdeleteClose();
      } else {
        showSnackbar(data.message || "Failed to delete solution", "error");
      }
    } catch (error) {
      console.error("Error deleting solution:", error);
      showSnackbar("An error occurred while deleting the solution", "error");
    } finally {
    }
  };

  return (
    <>
      <Link to="/DashBoard/Admin/CreateSolutions">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[20%] mid:w-[30%] py-2 text-center transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-3 mb-7">
          <span className="flex whitespace-nowrap">
            <BiMessageSquareAdd className="mr-2" size={20} />
            Create Solution
          </span>
        </button>
      </Link>
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
                      {/* {new Date(solution.updatedAt).toLocaleDateString()} */}
                      {moment(solution.updatedAt).format("MMMM D")}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/solution/${solution.slug}`}>
                        <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full flex items-center justify-center bg-gray-500">
                          <img
                            src={`${backendURL}${solution.image}`}
                            alt={solution.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white truncat"
                        to={`/solution/${solution.slug}`}
                      >
                        {solution.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{solution.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          IsdeleteOpen();
                          setSolutionIdToDelete(solution._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
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
          open={deleteOpen}
          onClose={IsdeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this solution?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone. Confirm delete or cancel.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={IsdeleteClose}>
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
