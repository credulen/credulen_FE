import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle, HiOutlineSearch } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  TableContainer,
  Paper,
  Snackbar,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaginationButtons = React.memo(
  ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = useMemo(() => {
      const numbers = [];
      const maxVisibleButtons = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisibleButtons / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

      if (endPage - startPage + 1 < maxVisibleButtons) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        numbers.push(i);
      }
      return numbers;
    }, [currentPage, totalPages]);

    return (
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-blue-500 hover:text-white hover:bg-blue-600"
          }`}
        >
          &lt;
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-lg text-blue-50 hover:bg-gray-100"
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="px-3 py-2">...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-2 py-0 rounded-lg ${
              currentPage === number
                ? "bg-btColour text-white"
                : "text-btColour hover:text-white hover:bg-btColour"
            }`}
          >
            {number}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-3 py-2">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-lg text-btColour hover:text-white hover:bg-btColour"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "text-btColour hover:text-white hover:bg-btColour"
          }`}
        >
          &gt;
        </button>
      </div>
    );
  }
);

const UserTableRow = React.memo(({ user, backendURL, onDeleteClick }) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="py-3">
        {moment(user.updatedAt).format("MMMM D")}
      </Table.Cell>
      <Table.Cell>
        {user.image ? (
          <img
            src={`${backendURL}/uploads/${user.image}`}
            alt={user.username}
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
        <button
          onClick={() => onDeleteClick(user._id)}
          className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md "
        >
          Delete
        </button>
      </Table.Cell>
    </Table.Row>
  );
});

export default function AdminUsersLists() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);
  const usersPerPage = 9;

  const backendURL = useMemo(
    () =>
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:3001",
    []
  );

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const fetchUsers = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/api/getUsers?page=${page}&limit=${usersPerPage}`
        );
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setTotalPages(data.totalPages);
        } else {
          showSnackbar(data.message || "Failed to fetch users", "error");
        }
      } catch (error) {
        showSnackbar(
          error.message || "An error occurred while fetching users",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [backendURL, showSnackbar]
  );

  useEffect(() => {
    if (userInfo) {
      fetchUsers(currentPage);
    }
  }, [userInfo, currentPage, fetchUsers]);

  const handleDeleteUser = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/Delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setDeleteOpen(false);
        showSnackbar("User deleted successfully", "success");
        fetchUsers(currentPage);
      } else {
        showSnackbar(data.message || "Failed to delete user", "error");
      }
    } catch (error) {
      showSnackbar(
        error.message || "An error occurred while deleting user",
        "error"
      );
    }
  }, [backendURL, userIdToDelete, currentPage, fetchUsers, showSnackbar]);

  const handleDeleteClick = useCallback((userId) => {
    setUserIdToDelete(userId);
    setDeleteOpen(true);
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  // Memoized loading spinner
  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <CircularProgress size={40} className="text-btColour" />
      </div>
    ),
    []
  );

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <div className="mx-auto p-0 mt-5 mid:mt-20">
      <div className="mb-4">
        <TextInput
          id="search"
          type="text"
          icon={HiOutlineSearch}
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-64"
        />
      </div>
      {userInfo && users.length > 0 ? (
        <>
          <TableContainer component={Paper} className="shadow-md mb-4">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="py-3">Date created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {filteredUsers.map((user) => (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    backendURL={backendURL}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </Table.Body>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <PaginationButtons
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this user?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeleteUser}
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
