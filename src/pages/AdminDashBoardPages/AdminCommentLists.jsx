import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
import {
  TableContainer,
  Paper,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import MuiAlert from "@mui/material/Alert";
import { HiOutlineUserCircle } from "react-icons/hi";
import moment from "moment";
import Spinner from "../../components/tools/Spinner";
import { User } from "lucide-react";

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
          }`}>
          &lt;
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-lg text-blue-50 hover:bg-gray-100">
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
            }`}>
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
              className="px-3 py-2 rounded-lg text-btColour hover:text-white hover:bg-btColour">
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
          }`}>
          &gt;
        </button>
      </div>
    );
  }
);

const CommentTableRow = React.memo(({ comment, backendURL, onDeleteClick }) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="py-3">
        {moment(comment.createdAt).format("MMMM D, YYYY")}
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          {comment.userId?.image ? (
            <img
              src={`${comment.userId.image}`}
              alt={comment.userId.username}
              className="w-10 h-10 min-w-10 rounded-full mr-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
              }}
            />
          ) : (
            <User />
          )}
          {comment.userId?.username?.length > 20
            ? `${comment.userId.username.substring(0, 20)}...`
            : comment.userId?.username}
        </div>
      </Table.Cell>
      <Table.Cell>{comment.postId.title}</Table.Cell>
      <Table.Cell>
        <div className="max-w-sm">
          {comment.content.length > 100
            ? `${comment.content.substring(0, 100)}...`
            : comment.content}
        </div>
      </Table.Cell>
      <Table.Cell>
        <button
          onClick={() => onDeleteClick(comment._id)}
          className="font-medium text-red-500 bg-transparent border hover:border-primary-500 border-red-500 cursor-pointer hover:bg-btColour hover:text-primary-500 p-1 rounded-md">
          Delete
        </button>
      </Table.Cell>
    </Table.Row>
  );
});

export default function AdminCommentLists() {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);
  const commentsPerPage = 9;

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

  const fetchComments = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/api/getComments?startIndex=${
            (page - 1) * commentsPerPage
          }&limit=${commentsPerPage}&sort=desc`
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
          setTotalPages(Math.ceil(data.totalComments / commentsPerPage));
        } else {
          showSnackbar(data.message || "Failed to fetch comments", "error");
        }
      } catch (error) {
        showSnackbar(
          error.message || "An error occurred while fetching comments",
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
      fetchComments(currentPage);
    }
  }, [userInfo, currentPage, fetchComments]);

  const handleDeleteComment = useCallback(async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setDeleteOpen(false);
        showSnackbar("Comment deleted successfully", "success");
        fetchComments(currentPage);
      } else {
        showSnackbar(data.message || "Failed to delete comment", "error");
      }
    } catch (error) {
      showSnackbar(
        error.message || "An error occurred while deleting comment",
        "error"
      );
    }
  }, [backendURL, commentIdToDelete, currentPage, fetchComments, showSnackbar]);

  const handleDeleteClick = useCallback((commentId) => {
    setCommentIdToDelete(commentId);
    setDeleteOpen(true);
  }, []);

  const filteredComments = useMemo(
    () =>
      comments.filter((comment) =>
        comment.content.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [comments, searchTerm]
  );

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
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="mx-auto p-0 mt-5 mid:mt-20">
      <header className="bg-primary-500 text-white p-4 mb-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Admin Comment Management</h1>
        <p className="text-sm">{moment().format("MMMM D, YYYY, h:mm A")} WAT</p>
      </header>
      <div className="mb-4 flex justify-between items-center">
        <TextInput
          id="search"
          type="text"
          icon={HiOutlineSearch}
          placeholder="Search comments..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="md:w-64"
        />
        <div className="text-sm text-gray-500">
          Last month comments: {lastMonthComments}
        </div>
      </div>
      {userInfo && comments.length > 0 ? (
        <>
          <TableContainer component={Paper} className="shadow-md mb-4">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="py-3">Date</Table.HeadCell>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Comment</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {filteredComments.map((comment) => (
                  <CommentTableRow
                    key={comment._id}
                    comment={comment}
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
        <p>No comments found!</p>
      )}

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this comment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            className="text-gray-500 hover:text-gray-700">
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeleteComment}
            className="text-red-500 hover:text-red-700">
            <AiTwotoneDelete size={24} />
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
