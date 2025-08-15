// import React, { useEffect, useState, useCallback, memo } from "react";
// import { Table, Button, Dropdown } from "flowbite-react";
// import moment from "moment";
// import { HiOutlineTrash } from "react-icons/hi";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import { CircularProgress } from "@mui/material";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const Alert = memo(
//   React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   })
// );

// const LoadingSpinner = memo(() => (
//   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
//     <CircularProgress size={40} className="text-btColour" />
//   </div>
// ));

// const EventTableRow = memo(({ registration }) => (
//   <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//     <Table.Cell>{registration.fullName}</Table.Cell>
//     <Table.Cell>{registration.email}</Table.Cell>
//     <Table.Cell>{registration.mobileNumber}</Table.Cell>
//     <Table.Cell>{registration.countryOfResidence}</Table.Cell>
//     <Table.Cell>{registration.careerStatus}</Table.Cell>
//     <Table.Cell>{registration.interestAndAim}</Table.Cell>
//     <Table.Cell>
//       {registration.managesImmigrantCommunity ? "Yes" : "No"}
//     </Table.Cell>
//     <Table.Cell>{registration.company}</Table.Cell>
//     <Table.Cell>{registration.eventTitle}</Table.Cell>
//     <Table.Cell>{registration.eventCategory}</Table.Cell>
//     <Table.Cell>
//       {moment(registration.registrationDate).format("MMMM D, HH:mm")}
//     </Table.Cell>
//   </Table.Row>
// ));

// const StatsDisplay = memo(({ totalRegistrations }) => (
//   <div className="flex gap-2 text-sm">
//     <span className="text-slate-700 font-semibold">
//       Total Registrations: {totalRegistrations}
//     </span>
//   </div>
// ));

// export default function RegisteredEventLists() {
//   const [registrations, setRegistrations] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [selectedEvent, setSelectedEvent] = useState("");
//   const [totalRegistrations, setTotalRegistrations] = useState(0);
//   const [availableEvents, setAvailableEvents] = useState([]);
//   const [allEvents, setAllEvents] = useState([]); // New state to store all events
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Separate function to fetch all available events
//   const fetchAllEvents = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/getAllRegisteredEvents`);
//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error("Failed to fetch events");
//       }
//       const ListData = data.registrations;
//       console.log(ListData);
//       const uniqueEvents = [
//         ...new Set(ListData.map((event) => event.eventTitle)),
//       ];
//       setAllEvents(uniqueEvents);
//       console.log(uniqueEvents);
//     } catch (error) {
//       console.error("Error fetching all events:", error);
//       setSnackbar({
//         open: true,
//         message: "Failed to fetch events list",
//         severity: "error",
//       });
//     }
//   }, []);

//   const fetchRegistrations = useCallback(
//     async (startIndex = 0) => {
//       try {
//         startIndex === 0 ? setInitialLoading(true) : setLoading(true);

//         const url = new URL(`${backendURL}/api/getAllRegisteredEvents`);
//         url.searchParams.append("startIndex", startIndex);
//         url.searchParams.append("limit", 10);
//         if (selectedEvent) {
//           url.searchParams.append("eventTitle", selectedEvent);
//         }

//         const res = await fetch(url);
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch registrations");
//         }

//         if (startIndex === 0) {
//           setRegistrations(data.registrations);
//         } else {
//           setRegistrations((prev) => [...prev, ...data.registrations]);
//         }

//         setShowMore(data.hasMore);
//         setTotalRegistrations(data.totalRegistrations);

//         // Update available events from the current data
//         if (startIndex === 0) {
//           const currentEvents = [
//             ...new Set(data.registrations.map((r) => r.eventTitle)),
//           ];
//           setAvailableEvents(currentEvents);
//         }
//       } catch (error) {
//         console.error("Error fetching registrations:", error);
//         setSnackbar({
//           open: true,
//           message: "Failed to fetch event registrations",
//           severity: "error",
//         });
//       } finally {
//         startIndex === 0 ? setInitialLoading(false) : setLoading(false);
//       }
//     },
//     [selectedEvent]
//   );

//   const handleFilter = useCallback((event) => {
//     setSelectedEvent(event);
//     setRegistrations([]); // Clear current registrations when filter changes
//   }, []);

//   // Fetch all events on component mount
//   useEffect(() => {
//     fetchAllEvents();
//   }, [fetchAllEvents]);

//   useEffect(() => {
//     fetchRegistrations(0);
//   }, [fetchRegistrations, selectedEvent]);

//   const handleShowMore = useCallback(() => {
//     if (!loading) {
//       fetchRegistrations(registrations.length);
//     }
//   }, [fetchRegistrations, loading, registrations.length]);

//   const handleDeleteByEvent = useCallback(async () => {
//     if (!selectedEvent) {
//       setSnackbar({
//         open: true,
//         message: "Please select an event to delete",
//         severity: "error",
//       });
//       return;
//     }

//     try {
//       const res = await fetch(`${backendURL}/api/handleDeleteByEvent`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ eventTitle: selectedEvent }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to delete registrations");
//       }

//       setSnackbar({
//         open: true,
//         message: `Deleted all registrations for ${selectedEvent}`,
//         severity: "success",
//       });

//       setSelectedEvent("");
//       setShowDeleteModal(false);
//       fetchRegistrations(0);
//       fetchAllEvents(); // Refresh the events list after deletion
//     } catch (error) {
//       console.error("Error deleting registrations:", error);
//       setSnackbar({
//         open: true,
//         message: "Failed to delete registrations",
//         severity: "error",
//       });
//     }
//   }, [selectedEvent, fetchRegistrations, fetchAllEvents]);

//   const handleCloseSnackbar = useCallback((event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   }, []);

//   if (initialLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="flex flex-col w-full h-full mid:mt-20">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3">
//         <div className="flex items-center gap-4 mb-4 md:mb-0">
//           <h1 className="text-2xl font-semibold">Event Registrations</h1>
//           <StatsDisplay totalRegistrations={totalRegistrations} />
//         </div>
//         <div className="flex gap-2">
//           <Dropdown
//             style={{ color: "black" }}
//             label={selectedEvent || "Filter by Event"}>
//             <Dropdown.Item
//               onClick={() => handleFilter("")}
//               style={{ color: "black" }}>
//               All Events
//             </Dropdown.Item>
//             {allEvents.map((event) => (
//               <Dropdown.Item
//                 key={event}
//                 onClick={() => handleFilter(event)}
//                 style={{ color: "black" }}>
//                 {event}
//               </Dropdown.Item>
//             ))}
//           </Dropdown>

//           <span className="mt-2">
//             <button
//               className="flex gap-2 font-medium hover:text-red-500 hover:bg-transparent cursor-pointer text-btColour p-1 rounded-md text-xs"
//               onClick={() => setShowDeleteModal(true)}>
//               <HiOutlineTrash className="h-4 w-4" />
//               Delete All
//             </button>
//           </span>
//         </div>
//       </div>

//       <div className="flex-grow overflow-x-auto">
//         <div className="h-full overflow-y-auto">
//           {registrations.length > 0 ? (
//             <Table hoverable className="shadow-md">
//               <Table.Head>
//                 <Table.HeadCell>Full Name</Table.HeadCell>
//                 <Table.HeadCell>Email</Table.HeadCell>
//                 <Table.HeadCell>Mobile Number</Table.HeadCell>
//                 <Table.HeadCell>Country</Table.HeadCell>
//                 <Table.HeadCell>Career Status</Table.HeadCell>
//                 <Table.HeadCell>Interest & Aim</Table.HeadCell>
//                 <Table.HeadCell>Manages Community</Table.HeadCell>
//                 <Table.HeadCell>Who reffred you</Table.HeadCell>
//                 <Table.HeadCell>Event Title</Table.HeadCell>
//                 <Table.HeadCell>Event Category</Table.HeadCell>
//                 <Table.HeadCell>Registered Date/Time</Table.HeadCell>
//               </Table.Head>
//               <Table.Body className="divide-y">
//                 {registrations.map((registration) => (
//                   <EventTableRow
//                     key={registration._id}
//                     registration={registration}
//                   />
//                 ))}
//               </Table.Body>
//             </Table>
//           ) : (
//             <p className="text-center py-4">No event registrations found!</p>
//           )}
//         </div>
//       </div>

//       {showMore && (
//         <button
//           onClick={handleShowMore}
//           disabled={loading}
//           className="w-full text-teal-500 self-center text-sm py-4 disabled:opacity-50">
//           {loading ? "Loading..." : "Show more"}
//         </button>
//       )}

//       <Dialog
//         open={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description">
//         <DialogTitle id="alert-dialog-title">Please Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete all registrations for{" "}
//               <span className="font-bold">
//                 {selectedEvent || "the selected event"}?
//               </span>
//             </p>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setShowDeleteModal(false)}
//             className="text-gray-500 hover:text-gray-700">
//             <IoClose size={24} />
//           </Button>
//           <Button
//             onClick={handleDeleteByEvent}
//             className="text-red-500 hover:text-red-700">
//             <AiTwotoneDelete size={24} />
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}>
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback, memo } from "react";
import moment from "moment";
import {
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
} from "lucide-react";
import { CircularProgress } from "@mui/material";

const backendURL =
  import.meta.env?.MODE === "production"
    ? import.meta.env?.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} className="text-btColour" />
  </div>
));

const EventTableRow = memo(({ registration, index }) => (
  <tr
    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
    }`}>
    <td className="px-6 py-4 text-sm font-medium text-gray-900">
      {registration.fullName}
    </td>
    <td className="px-6 py-4 text-sm text-gray-600">{registration.email}</td>
    <td className="px-6 py-4 text-sm text-gray-600">
      {registration.mobileNumber}
    </td>
    <td className="px-6 py-4 text-sm text-gray-600">
      {registration.countryOfResidence}
    </td>
    <td className="px-6 py-4 text-sm text-gray-600">
      {registration.careerStatus}
    </td>
    <td
      className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
      title={registration.interestAndAim}>
      {registration.interestAndAim}
    </td>
    <td className="px-6 py-4 text-sm">
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          registration.managesImmigrantCommunity
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}>
        {registration.managesImmigrantCommunity ? "Yes" : "No"}
      </span>
    </td>
    <td className="px-6 py-4 text-sm text-gray-600">{registration.company}</td>
    <td className="px-6 py-4 text-sm">
      <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
        {registration.eventTitle}
      </span>
    </td>
    <td className="px-6 py-4 text-sm">
      <span className="inline-flex px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
        {registration.eventCategory}
      </span>
    </td>
    <td className="px-6 py-4 text-sm text-gray-600">
      {moment(registration.registrationDate).format("MMM D, YYYY HH:mm")}
    </td>
  </tr>
));

const StatsCard = memo(({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
));

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
      <div className="flex items-center text-sm text-gray-500">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150">
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
              currentPage === number
                ? "bg-teal-600 text-white border border-teal-600"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}>
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
});

export default function RegisteredEventLists() {
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
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
    async (page = 1) => {
      try {
        setInitialLoading(true);
        const url = new URL(`${backendURL}/api/getAllRegisteredEvents`);
        url.searchParams.append("page", page);
        url.searchParams.append("limit", 10);
        if (selectedEvent) {
          url.searchParams.append("eventTitle", selectedEvent);
        }

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch registrations");
        }

        setRegistrations(data.registrations);
        setTotalRegistrations(data.totalRegistrations);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);

        const currentEvents = [
          ...new Set(data.registrations.map((r) => r.eventTitle)),
        ];
        setAvailableEvents(currentEvents);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch event registrations",
          severity: "error",
        });
      } finally {
        setInitialLoading(false);
      }
    },
    [selectedEvent]
  );

  const handleFilter = useCallback((event) => {
    setSelectedEvent(event);
    setRegistrations([]);
    setCurrentPage(1);
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  useEffect(() => {
    fetchRegistrations(currentPage);
  }, [fetchRegistrations, currentPage, selectedEvent]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

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
      setCurrentPage(1);
      fetchRegistrations(1);
      fetchAllEvents();
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Event Registrations
          </h1>
          <p className="text-gray-600">
            Manage and view all event registrations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={Users}
            title="Total Registrations"
            value={totalRegistrations}
            color="bg-teal-600"
          />
          <StatsCard
            icon={Calendar}
            title="Unique Events"
            value={allEvents.length}
            color="bg-blue-600"
          />
          <StatsCard
            icon={Filter}
            title="Current Filter"
            value={selectedEvent || "All Events"}
            color="bg-purple-600"
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Registration List
                </h2>
                <span className="text-sm text-gray-500">
                  {registrations.length} of {totalRegistrations} registrations
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Event Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-150">
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedEvent || "All Events"}
                    <ChevronRight
                      className={`h-4 w-4 ml-2 transition-transform duration-150 ${
                        showDropdown ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-1 max-h-60 overflow-y-auto">
                        <button
                          onClick={() => handleFilter("")}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150 ${
                            !selectedEvent
                              ? "bg-teal-50 text-teal-700"
                              : "text-gray-700"
                          }`}>
                          All Events
                        </button>
                        {allEvents.map((event) => (
                          <button
                            key={event}
                            onClick={() => handleFilter(event)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-150 ${
                              selectedEvent === event
                                ? "bg-teal-50 text-teal-700"
                                : "text-gray-700"
                            }`}>
                            {event}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={!selectedEvent}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete All
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {registrations.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Career Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest & Aim
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manages Community
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Who Referred You
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((registration, index) => (
                    <EventTableRow
                      key={registration._id}
                      registration={registration}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No registrations found
                </h3>
                <p className="text-gray-500">
                  There are no event registrations matching your current filter.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Delete Registrations
                    </h3>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete all registrations for{" "}
                    <span className="font-semibold text-gray-900">
                      {selectedEvent || "the selected event"}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteByEvent}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                    Delete All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Snackbar */}
        {snackbar.open && (
          <div className="fixed bottom-4 right-4 z-50">
            <div
              className={`px-4 py-3 rounded-md shadow-lg ${
                snackbar.severity === "success"
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}>
              <div className="flex items-center">
                <span>{snackbar.message}</span>
                <button
                  onClick={handleCloseSnackbar}
                  className="ml-4 text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
