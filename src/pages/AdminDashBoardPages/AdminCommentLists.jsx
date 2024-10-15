import React, { useEffect, useState } from "react";
import { Table, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";
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
import { HiOutlineUserCircle } from "react-icons/hi";
import moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisibleButtons = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg ${
          currentPage === 1
            ? " text-gray-500 cursor-not-allowed"
            : "text-blue-500 hover:text-white hover:bg-blue-600"
        }`}
      >
        &lt;
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg text-blue-50 hover:bg-gray-100"
          >
            1
          </button>
          {startPage > 2 && <span className="px-3 py-2">...</span>}
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-2 py-0 rounded-lg ${
            currentPage === number
              ? "bg-btColour text-white"
              : " text-btColour hover:text-white hover:bg-btColour"
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-3 py-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg  text-btColour hover:text-white hover:bg-btColour"
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
            ? "bg-gray-200 text- cursor-not-allowed"
            : "text-btColour hover:text-white hover:bg-btColour"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default function AdminCommentLists() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { userInfo } = useSelector((state) => state.auth);
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
  const commentsPerPage = 9;

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchComments = async (page) => {
    try {
      const res = await fetch(
        `${backendURL}/api/getComments?startIndex=${
          (page - 1) * commentsPerPage
        }&limit=${commentsPerPage}&sort=desc`
      );
      const data = await res.json();
      console.log(data);
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
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchComments(currentPage);
    }
  }, [userInfo?.user._id, currentPage]);

  const handleDeleteComment = async () => {
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
  };

  const filteredComments = comments.filter((comment) =>
    comment.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto p-0 mt-5">
      <div className="mb-4 flex justify-between items-center">
        <TextInput
          id="search"
          type="text"
          icon={HiOutlineSearch}
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64"
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
                  <Table.Row
                    key={comment._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="py-3">
                      {moment(comment.createdAt).format("MMMM D, YYYY")}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center">
                        {comment.userId?.image ? (
                          <img
                            src={`${backendURL}/uploads/${comment.userId.image}`}
                            alt={comment.userId.username}
                            className="w-10 h-10 min-w-10 rounded-full mr-2 "
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fallback-image.png";
                            }}
                          />
                        ) : (
                          <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
                        )}

                        {comment.userId?.username?.length > 20
                          ? `${comment.userId.username.substring(0, 20)}...`
                          : comment.userId?.username}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{comment.postId.title}</Table.Cell>
                    <Table.Cell>
                      <div className="max-w-sm ">
                        {comment.content.length > 100
                          ? `${comment.content.substring(0, 100)}...`
                          : comment.content}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => {
                          setDeleteOpen(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className="font-medium text-white hover:text-red-500 hover:bg-transparent hover:border hover:border-red-500 cursor-pointer bg-btColour p-1 rounded-md"
                      >
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
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
        aria-describedby="alert-dialog-description"
      >
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
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeleteComment}
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
