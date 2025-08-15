import React, { useEffect, useState, useCallback, memo } from "react";
import { Table, Button, Dropdown } from "flowbite-react";
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
import { CircularProgress } from "@mui/material";

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

const EventTableRow = memo(({ registration }) => (
  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    <Table.Cell>{registration.fullName}</Table.Cell>
    <Table.Cell>{registration.email}</Table.Cell>
    <Table.Cell>{registration.mobileNumber}</Table.Cell>
    <Table.Cell>{registration.countryOfResidence}</Table.Cell>
    <Table.Cell>{registration.careerStatus}</Table.Cell>
    <Table.Cell>{registration.interestAndAim}</Table.Cell>
    <Table.Cell>
      {registration.managesImmigrantCommunity ? "Yes" : "No"}
    </Table.Cell>
    <Table.Cell>{registration.company}</Table.Cell>
    <Table.Cell>{registration.eventTitle}</Table.Cell>
    <Table.Cell>{registration.eventCategory}</Table.Cell>
    <Table.Cell>
      {moment(registration.registrationDate).format("MMMM D, HH:mm")}
    </Table.Cell>
  </Table.Row>
));

const StatsDisplay = memo(({ totalRegistrations }) => (
  <div className="flex gap-2 text-sm">
    <span className="text-slate-700 font-semibold">
      Total Registrations: {totalRegistrations}
    </span>
  </div>
));

export default function RegisteredEventLists() {
  const [registrations, setRegistrations] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // New state to store all events
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Separate function to fetch all available events
  const fetchAllEvents = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getAllRegisteredEvents`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }
      const ListData = data.registrations;
      const uniqueEvents = [
        ...new Set(ListData.map((event) => event.eventTitle)),
      ];
      setAllEvents(uniqueEvents);
      console.log(uniqueEvents);
    } catch (error) {
      console.error("Error fetching all events:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch events list",
        severity: "error",
      });
    }
  }, []);

  const fetchRegistrations = useCallback(
    async (startIndex = 0) => {
      try {
        startIndex === 0 ? setInitialLoading(true) : setLoading(true);

        const url = new URL(`${backendURL}/api/getAllRegisteredEvents`);
        url.searchParams.append("startIndex", startIndex);
        url.searchParams.append("limit", 10);
        if (selectedEvent) {
          url.searchParams.append("eventTitle", selectedEvent);
        }

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch registrations");
        }

        if (startIndex === 0) {
          setRegistrations(data.registrations);
        } else {
          setRegistrations((prev) => [...prev, ...data.registrations]);
        }

        setShowMore(data.hasMore);
        setTotalRegistrations(data.totalRegistrations);

        // Update available events from the current data
        if (startIndex === 0) {
          const currentEvents = [
            ...new Set(data.registrations.map((r) => r.eventTitle)),
          ];
          setAvailableEvents(currentEvents);
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch event registrations",
          severity: "error",
        });
      } finally {
        startIndex === 0 ? setInitialLoading(false) : setLoading(false);
      }
    },
    [selectedEvent]
  );

  const handleFilter = useCallback((event) => {
    setSelectedEvent(event);
    setRegistrations([]); // Clear current registrations when filter changes
  }, []);

  // Fetch all events on component mount
  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  useEffect(() => {
    fetchRegistrations(0);
  }, [fetchRegistrations, selectedEvent]);

  const handleShowMore = useCallback(() => {
    if (!loading) {
      fetchRegistrations(registrations.length);
    }
  }, [fetchRegistrations, loading, registrations.length]);

  const handleDeleteByEvent = useCallback(async () => {
    if (!selectedEvent) {
      setSnackbar({
        open: true,
        message: "Please select an event to delete",
        severity: "error",
      });
      return;
    }

    try {
      const res = await fetch(`${backendURL}/api/handleDeleteByEvent`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventTitle: selectedEvent }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete registrations");
      }

      setSnackbar({
        open: true,
        message: `Deleted all registrations for ${selectedEvent}`,
        severity: "success",
      });

      setSelectedEvent("");
      setShowDeleteModal(false);
      fetchRegistrations(0);
      fetchAllEvents(); // Refresh the events list after deletion
    } catch (error) {
      console.error("Error deleting registrations:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete registrations",
        severity: "error",
      });
    }
  }, [selectedEvent, fetchRegistrations, fetchAllEvents]);

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  if (initialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full h-full mid:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold">Event Registrations</h1>
          <StatsDisplay totalRegistrations={totalRegistrations} />
        </div>
        <div className="flex gap-2">
          <Dropdown
            style={{ color: "black" }}
            label={selectedEvent || "Filter by Event"}>
            <Dropdown.Item
              onClick={() => handleFilter("")}
              style={{ color: "black" }}>
              All Events
            </Dropdown.Item>
            {allEvents.map((event) => (
              <Dropdown.Item
                key={event}
                onClick={() => handleFilter(event)}
                style={{ color: "black" }}>
                {event}
              </Dropdown.Item>
            ))}
          </Dropdown>

          <span className="mt-2">
            <button
              className="flex gap-2 font-medium hover:text-red-500 hover:bg-transparent cursor-pointer text-btColour p-1 rounded-md text-xs"
              onClick={() => setShowDeleteModal(true)}>
              <HiOutlineTrash className="h-4 w-4" />
              Delete All
            </button>
          </span>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {registrations.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Full Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Mobile Number</Table.HeadCell>
                <Table.HeadCell>Country</Table.HeadCell>
                <Table.HeadCell>Career Status</Table.HeadCell>
                <Table.HeadCell>Interest & Aim</Table.HeadCell>
                <Table.HeadCell>Manages Community</Table.HeadCell>
                <Table.HeadCell>Who reffred you</Table.HeadCell>
                <Table.HeadCell>Event Title</Table.HeadCell>
                <Table.HeadCell>Event Category</Table.HeadCell>
                <Table.HeadCell>Registered Date/Time</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {registrations.map((registration) => (
                  <EventTableRow
                    key={registration._id}
                    registration={registration}
                  />
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p className="text-center py-4">No event registrations found!</p>
          )}
        </div>
      </div>

      {showMore && (
        <button
          onClick={handleShowMore}
          disabled={loading}
          className="w-full text-teal-500 self-center text-sm py-4 disabled:opacity-50">
          {loading ? "Loading..." : "Show more"}
        </button>
      )}

      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Please Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete all registrations for{" "}
              <span className="font-bold">
                {selectedEvent || "the selected event"}?
              </span>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-500 hover:text-gray-700">
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeleteByEvent}
            className="text-red-500 hover:text-red-700">
            <AiTwotoneDelete size={24} />
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}>
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
