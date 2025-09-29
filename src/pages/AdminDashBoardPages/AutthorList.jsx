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
import Spinner from "../../components/tools/Spinner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = memo(() => (
  <>
    <Spinner />
  </>
));

const AuthorTableRow = memo(({ author, onDeleteClick }) => (
  <Table.Row className="bg-white dark:bg-neutral-800">
    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
      {author.name}
    </Table.Cell>
    <Table.Cell>
      {author.image ? (
        <img
          src={`${author.image}`}
          alt={author.username}
          className="w-10 h-10 rounded-full"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-image.png";
          }}
        />
      ) : (
        <HiOutlineUserCircle className="w-10 h-10 text-neutral-600 dark:text-neutral-600-dark" />
      )}
    </Table.Cell>
    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
      {author?.bio?.length > 50
        ? `${author.bio.substring(0, 50)}...`
        : author.bio}
    </Table.Cell>
    <Table.Cell className="text-neutral-700 dark:text-neutral-700-dark">
      {author.email}
    </Table.Cell>
    <Table.Cell>
      <span
        onClick={() => onDeleteClick(author._id)}
        className="font-medium text-DashBoard/Admin/SpeakerList-500 bg-transparent border border-error-500 cursor-pointer hover:bg-primary-500 hover:text-white p-1 rounded-md">
        Delete
      </span>
    </Table.Cell>
    <Table.Cell>
      <Link
        className="font-medium text-white bg-primary-500 hover:text-primary-500 hover:bg-transparent hover:border hover:border-primary-500 p-1 rounded-md transition-all duration-300 px-2"
        to={`/DashBoard/Admin/CreateAuthor/${author._id}`}>
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
        showSnackbar(error.message || "Failed to fetch authors", "error");
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete author");
      }

      setAuthors((prev) =>
        prev.filter((author) => author._id !== authorIdToDelete)
      );
      showSnackbar("Author deleted successfully", "success");
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting author:", error);
      showSnackbar(
        error.message || "An error occurred while deleting the author",
        "error"
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
          <button className="text-primary-500 border border-primary-500 p-1 rounded-lg hover:bg-primary-500 hover:text-white hover:font-semibold transition-all duration-300 flex items-center gap-2">
            <BiMessageSquareAdd size={16} />
            Create Author
          </button>
        </Link>
      </div>

      <div className="table-auto overflow-x-auto md:mx-auto p-3 shadow-md rounded-lg border border-primary-100">
        {authors?.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Image
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Bio
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Delete
                </Table.HeadCell>
                <Table.HeadCell className="text-neutral-700 dark:text-neutral-700-dark">
                  Edit
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-primary-100">
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
                className="w-full text-primary-500 hover:text-secondary-500 self-center text-sm py-7 disabled:bg-neutral-200 disabled:text-neutral-600 transition-colors duration-300">
                {loading ? "Loading..." : "Show more"}
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-neutral-600 dark:text-neutral-600-dark py-4">
            No authors found!
          </p>
        )}

        <Dialog
          open={isDeleteModalOpen}
          onClose={closeDeleteModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title" sx={{ color: "#080759" }}>
            Are you sure you want to delete this author?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "#5E6D7A" }}>
              This action cannot be undone. All posts associated with this
              author will be affected.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeDeleteModal}
              sx={{ color: "#5E6D7A", "&:hover": { color: "#3B4A54" } }}>
              <IoClose size={24} />
            </Button>
            <Button
              onClick={handleDeleteAuthor}
              sx={{ color: "#EF4444", "&:hover": { color: "#B91C1C" } }}>
              <AiTwotoneDelete size={24} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
