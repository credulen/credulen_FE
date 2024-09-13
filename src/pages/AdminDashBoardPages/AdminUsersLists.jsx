import React, { useEffect, useState } from "react";
import { Modal, Table, TextInput, Label, Card } from "flowbite-react";
import { useSelector } from "react-redux";
import {
  HiOutlineExclamationCircle,
  HiOutlineSearch,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { TableContainer, Paper, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminUsersLists() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { userInfo } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [Deleteopen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Function to open modal
  const DeleteOpen = () => setDeleteOpen(true);

  // Function to close modal
  const DeleteClose = () => setDeleteOpen(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${backendURL}/api/getUsers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        } else {
          showSnackbar(data.message || "Failed to fetch users", "error");
        }
      } catch (error) {
        showSnackbar(
          error.message || "An error occurred while fetching users",
          "error"
        );
      }
    };
    if (userInfo) {
      fetchUsers();
    }
  }, [userInfo?.user._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      } else {
        showSnackbar(data.message || "Failed to load more users", "error");
      }
    } catch (error) {
      showSnackbar(
        error.message || "An error occurred while loading more users",
        "error"
      );
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${backendURL}/api/Delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setDeleteOpen(false);
        showSnackbar("User deleted successfully", "success");
      } else {
        showSnackbar(data.message || "Failed to delete user", "error");
      }
    } catch (error) {
      showSnackbar(
        error.message || "An error occurred while deleting user",
        "error"
      );
    }
  };

  return (
    <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <div className="mb-4 ">
          <TextInput
            id="search"
            type="text"
            // icon={HiOutlineSearch}
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder-gray-700 placeholder:text-base placeholder:m-10 md:w-[20rem] rounded-md "
          />
        </div>
        {userInfo && users.length > 0 ? (
          <>
            <TableContainer component={Paper} className="shadow-md">
              <Table aria-label="user list table">
                <Table.Head>
                  <Table.HeadCell>Date created</Table.HeadCell>
                  <Table.HeadCell>User image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {filteredUsers.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        {user.image ? (
                          <img
                            src={`${backendURL}/uploads/${user.image}`}
                            alt={user.username}
                            className="w-10 h-10 rounded-full mr-3"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fallback-image.png";
                            }}
                          />
                        ) : (
                          <HiOutlineUserCircle className="w-10 h-10 text-gray-400 mr-3" />
                        )}
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        {user.role === "admin" ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setDeleteOpen(true);
                            setUserIdToDelete(user._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </TableContainer>
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
          <p>You have no users yet!</p>
        )}
        {/* DELETING MODAL Starts HERE */}
        <Button>
          <React.Fragment>
            <Dialog
              open={Deleteopen}
              onClose={DeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete your account?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Confirm delete or cancel
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={DeleteClose}>
                  <IoClose
                    size={24}
                    className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
                  />
                </Button>
                <Button onClick={handleDeleteUser}>
                  <AiTwotoneDelete
                    size={24}
                    className="text-red-500 border-red-500 rounded-sm transition ease-in-out duration-200 transform hover:scale-125 hover:text-red-600"
                  />
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </Button>
        {/* DELETING MODAL Ends HERE */}
      </div>
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
