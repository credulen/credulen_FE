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
import Spinner from "../../components/tools/Spinner";

const backendURL =
  import.meta.env?.MODE === "production"
    ? import.meta.env?.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = memo(() => (
  <>
    <Spinner />
  </>
));

const EventTableRow = memo(({ registration, index }) => (
  <tr
    className={`border-b border-primary-100 dark:border-primary-200-dark hover:bg-primary-50 dark:hover:bg-primary-50-dark transition-colors duration-150 ${
      index % 2 === 0 ? "bg-white dark:bg-neutral-800-dark" : "bg-primary-50/30"
    }`}>
    <td className="px-6 py-4 text-sm font-medium text-neutral-800 dark:text-neutral-700-dark">
      {registration.fullName}
    </td>
    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-600-dark">
      {registration.email}
    </td>
    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-600-dark">
      {registration.mobileNumber}
    </td>
    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-600-dark">
      {registration.countryOfResidence}
    </td>
    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-600-dark">
      {registration.careerStatus}
    </td>
    <td
      className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-600-dark max-w-xs truncate"
      title={registration.interestAndAim}>
      {registration.interestAndAim}
    </td>
    <td className="px-6 py-4 text-sm">
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          registration.managesImmigrantCommunity
            ? "bg-secondary-500 text-primary-500"
            : "bg-neutral-200 text-primary-900 dark:text-neutral-700-dark"
        }`}>
        {registration.managesImmigrantCommunity ? "Yes" : "No"}
      </span>
    </td>
    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-600-dark">
      {registration.company}
    </td>
    <td className="px-6 py-4 text-sm">
      <span className="inline-flex px-3 py-1 text-xs font-medium bg-primary-100 text-primary-500 rounded-full">
        {registration.eventTitle}
      </span>
    </td>
    <td className="px-6 py-4 text-sm">
      <span className="inline-flex px-3 py-1 text-xs font-medium bg-primary-100 text-primary-500 rounded-full">
        {registration.eventCategory}
      </span>
    </td>
    <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-600-dark">
      {moment(registration.registrationDate).format("MMM D, YYYY HH:mm")}
    </td>
  </tr>
));

const StatsCard = memo(({ icon: Icon, title, value, color }) => (
  <div className="bg-white dark:bg-neutral-800-dark rounded-lg shadow-sm border border-primary-100 dark:border-primary-200-dark p-6">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-600-dark">
          {title}
        </p>
        <p className="text-2xl font-semibold text-neutral-800 dark:text-neutral-700-dark">
          {value}
        </p>
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
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-800-dark border-t border-primary-100 dark:border-primary-200-dark">
      <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-600-dark">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-600-dark bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md hover:bg-primary-50 dark:hover:bg-primary-50-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-700-dark bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md hover:bg-primary-50 dark:hover:bg-primary-50-dark transition-colors duration-150">
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 text-neutral-600 dark:text-neutral-600-dark">
                ...
              </span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
              currentPage === number
                ? "bg-primary-500 text-white border border-primary-500"
                : "text-neutral-800 dark:text-neutral-700-dark bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark hover:bg-primary-50 dark:hover:bg-primary-50-dark"
            }`}>
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-neutral-600 dark:text-neutral-600-dark">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-700-dark bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md hover:bg-primary-50 dark:hover:bg-primary-50-dark transition-colors duration-150">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-600-dark bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md hover:bg-primary-50 dark:hover:bg-primary-50-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
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
    <div className="min-h-screen bg-primary-50 dark:bg-primary-50-dark p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-700-dark mb-2">
            Event Registrations
          </h1>
          <p className="text-neutral-600 dark:text-neutral-600-dark">
            Manage and view all event registrations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={Users}
            title="Total Registrations"
            value={totalRegistrations}
            color="bg-primary-500"
          />
          <StatsCard
            icon={Calendar}
            title="Unique Events"
            value={allEvents.length}
            color="bg-primary-500"
          />
          <StatsCard
            icon={Filter}
            title="Current Filter"
            value={selectedEvent || "All Events"}
            color="bg-primary-500"
          />
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-neutral-800-dark rounded-lg shadow-sm border border-primary-100 dark:border-primary-200-dark mb-6">
          <div className="p-6 border-b border-primary-100 dark:border-primary-200-dark">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-700-dark">
                  Registration List
                </h2>
                <span className="text-sm text-neutral-600 dark:text-neutral-600-dark">
                  {registrations.length} of {totalRegistrations} registrations
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Event Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-700-dark bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md hover:bg-primary-50 dark:hover:bg-primary-50-dark focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150">
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedEvent || "All Events"}
                    <ChevronRight
                      className={`h-4 w-4 ml-2 transition-transform duration-150 ${
                        showDropdown ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md shadow-lg z-50">
                      <div className="py-1 max-h-60 overflow-y-auto">
                        <button
                          onClick={() => handleFilter("")}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-100 dark:hover:bg-primary-200-dark transition-colors duration-150 ${
                            !selectedEvent
                              ? "bg-primary-50 text-primary-500"
                              : "text-neutral-800 dark:text-neutral-700-dark"
                          }`}>
                          All Events
                        </button>
                        {allEvents.map((event) => (
                          <button
                            key={event}
                            onClick={() => handleFilter(event)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-100 dark:hover:bg-primary-200-dark transition-colors duration-150 ${
                              selectedEvent === event
                                ? "bg-primary-50 text-primary-500"
                                : "text-neutral-800 dark:text-neutral-700-dark"
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
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-error-500 bg-error-500/10 border border-error-500/20 rounded-md hover:bg-error-500/20 focus:outline-none focus:ring-2 focus:ring-error-500 focus:border-error-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete All
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {registrations.length > 0 ? (
              <table className="min-w-full divide-y divide-primary-100 dark:divide-primary-200-dark">
                <thead className="bg-primary-50 dark:bg-primary-50-dark">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Career Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Interest & Aim
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Manages Community
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Who Referred You
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Event Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Event Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 dark:text-neutral-600-dark uppercase tracking-wider">
                      Registered Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-800-dark divide-y divide-primary-100 dark:divide-primary-200-dark">
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
                <Users className="h-12 w-12 text-neutral-600 dark:text-neutral-600-dark mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-700-dark mb-2">
                  No registrations found
                </h3>
                <p className="text-neutral-600 dark:text-neutral-600-dark">
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
            <div className="bg-white dark:bg-neutral-800-dark rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <Trash2 className="h-6 w-6 text-error-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-700-dark">
                      Delete Registrations
                    </h3>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-neutral-600 dark:text-neutral-600-dark">
                    Are you sure you want to delete all registrations for{" "}
                    <span className="font-semibold text-neutral-800 dark:text-neutral-700-dark">
                      {selectedEvent || "the selected event"}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-700-dark bg-white dark:bg-neutral-800-dark border border-primary-100 dark:border-primary-200-dark rounded-md hover:bg-primary-50 dark:hover:bg-primary-50-dark focus:outline-none focus:ring-2 focus:ring-neutral-600">
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteByEvent}
                    className="px-4 py-2 text-sm font-medium text-white bg-error-500 border border-transparent rounded-md hover:bg-error-600 focus:outline-none focus:ring-2 focus:ring-error-500">
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
                  ? "bg-secondary-500/10 border-secondary-500 text-secondary-500"
                  : "bg-error-500/10 border-error-500 text-error-500"
              }`}>
              <div className="flex items-center">
                <span>{snackbar.message}</span>
                <button
                  onClick={handleCloseSnackbar}
                  className="ml-4 text-neutral-600 dark:text-neutral-600-dark hover:text-neutral-800 dark:hover:text-neutral-700-dark">
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
