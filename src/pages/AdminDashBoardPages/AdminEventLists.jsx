import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { format } from "date-fns";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const ITEMS_PER_PAGE = 10;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Memoized pagination component
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

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "text-btColour hover:text-white hover:bg-btColour"
          }`}
        >
          &gt;
        </button>
      </div>
    );
  }
);

// Memoized table row component
const EventRow = React.memo(({ event, onDelete, backendURL }) => (
  <Table.Row className="bg-white dark:bg-gray-800">
    <Table.Cell>{format(new Date(event.date), "MMM d, yyyy")}</Table.Cell>
    <Table.Cell>
      <div className="w-12 h-12 overflow-hidden rounded-full">
        <img
          src={`${backendURL}${event.image}`}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-image.png";
          }}
        />
      </div>
    </Table.Cell>
    <Table.Cell>
      <Link
        to={`/event/${event.slug}`}
        className="font-medium text-gray-900 dark:text-white hover:text-btColour"
      >
        {event.title.length > 50
          ? `${event.title.substring(0, 50)}...`
          : event.title}
      </Link>
    </Table.Cell>
    <Table.Cell>{event.venue}</Table.Cell>
    <Table.Cell>{event.eventType}</Table.Cell>
    <Table.Cell>
      {event.speakers.map((speaker, index) => (
        <span key={index}>
          {speaker.name}
          {index < event.speakers.length - 1 && ", "}
        </span>
      ))}
    </Table.Cell>
    <Table.Cell>
      <button
        onClick={() => onDelete(event._id)}
        className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md "
      >
        Delete
      </button>
    </Table.Cell>
    <Table.Cell>
      <Link
        to={`/DashBoard/Admin/CreateEvents/${event.slug}`}
        className="font-medium text-white hover:text-btColour hover:bg-transparent hover:border hover:border-btColour bg-btColour p-1 rounded-md transition-all duration-300 px-2"
      >
        Edit
      </Link>
    </Table.Cell>
  </Table.Row>
));

export default function AdminEventLists() {
  const { userInfo } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchEvents = useCallback(async (page, category) => {
    setLoading(true);
    try {
      let url = `${backendURL}/api/getEvents?page=${page}&limit=${ITEMS_PER_PAGE}`;

      // Only append category if it's not 'all'
      if (category && category !== "all") {
        url += `&eventType=${category}`; // Changed from category to eventType to match your data structure
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setEvents(data.events);
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      } else {
        setSnackbar({
          open: true,
          message: "Failed to fetch events",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setSnackbar({
        open: true,
        message: "Error loading events",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch events when page or category changes
  useEffect(() => {
    fetchEvents(currentPage, selectedCategory);
  }, [currentPage, selectedCategory, fetchEvents]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset to first page when changing category
    fetchEvents(1, newCategory); // Immediately fetch events with new category
  };

  const handleDeleteEvent = useCallback(async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/deleteEvent/${eventIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setEvents((prev) =>
          prev.filter((event) => event._id !== eventIdToDelete)
        );
        setSnackbar({
          open: true,
          message: "Event deleted successfully",
          severity: "success",
        });
        setIsDeleteModalOpen(false);

        if (events.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else if (events.length === 1) {
          fetchEvents(1);
        }
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Failed to delete event",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      setSnackbar({
        open: true,
        message: "Error deleting event",
        severity: "error",
      });
    }
  }, [eventIdToDelete, currentPage, events.length, fetchEvents]);

  return (
    <div className="p-2 mid:mt-20">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <CircularProgress size={40} className="text-btColour" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <Link to="/DashBoard/Admin/CreateEvents">
              <button className="text-btColour border border-btColour p-2 rounded-lg hover:bg-btColour hover:text-white transition-all duration-300">
                <span className="flex items-center gap-2">
                  <BiMessageSquareAdd size={20} />
                  Create Event
                </span>
              </button>
            </Link>

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="all">All EVents</option>
              <option value="webinar">Webinar</option>
              <option value="conference">Conference</option>
            </select>
          </div>

          <div className="overflow-x-auto shadow-md rounded-lg">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <CircularProgress size={40} className="text-btColour" />
              </div>
            ) : events.length > 0 ? (
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Event Image</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Venue</Table.HeadCell>
                  <Table.HeadCell>Event Type</Table.HeadCell>
                  <Table.HeadCell>Speakers</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>Edit</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {events.map((event) => (
                    <EventRow
                      key={event._id}
                      event={event}
                      onDelete={() => {
                        setEventIdToDelete(event._id);
                        setIsDeleteModalOpen(true);
                      }}
                      backendURL={backendURL}
                    />
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <p className="text-center py-4">No events found</p>
            )}

            {totalPages > 1 && (
              <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          <Dialog
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete this event?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action cannot be undone. All data associated with this
                event will be permanently removed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDeleteModalOpen(false)}>
                <IoClose
                  size={24}
                  className="text-red-500 hover:scale-110 transition-transform"
                />
              </Button>
              <Button onClick={handleDeleteEvent}>
                <AiTwotoneDelete
                  size={24}
                  className="text-red-500 hover:scale-110 transition-transform"
                />
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
}
