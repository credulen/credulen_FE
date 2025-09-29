import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import Spinner from "../../components/tools/Spinner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const LoadingSpinner = () => (
  <>
    <Spinner />
  </>
);

const Toast = ({ open, message, severity, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs w-full animate-fade-in">
      <div
        className={`p-2 rounded-lg shadow-md transition-all duration-300 ${
          severity === "success"
            ? "bg-green-500 text-neutral-200"
            : "bg-error-500 text-neutral-100"
        }`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={onClose}
            className="text-current hover:text-opacity-70"
            aria-label="Close toast">
            <IoClose size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FreeClassRegistrationRow = ({ registration, onDelete }) => (
  <tr className="bg-primary-50 dark:bg-primary-50 dark:border-primary-200-dark hover:bg-primary-100 dark:hover:bg-primary-200-dark">
    <td className="px-6 py-4">{registration.name}</td>
    <td className="px-6 py-4">{registration.email}</td>
    <td className="px-6 py-4">{registration.phoneNum}</td>
    <td className="px-6 py-4">
      {moment(registration.registrationDate).format("MMMM D, YYYY HH:mm")}
    </td>
    <td className="px-6 py-4">
      <button
        onClick={() => onDelete(registration._id)}
        className="font-medium text-error-500 bg-transparent border border-error-500 rounded-md px-2 py-1 hover:bg-primary-500 hover:text-white transition">
        Delete
      </button>
    </td>
  </tr>
);

const FreeMasterClassList = () => {
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/api/getAllCampaignRegistrations`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch registrations");
      }

      setAllRegistrations(data.data);
      setTotalPages(
        Math.ceil((data.total || data.data.length) / itemsPerPage) || 1
      );
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setToast({
        open: true,
        message: "Failed to fetch Free Master Class registrations",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleDelete = useCallback(
    async (registrationId) => {
      try {
        const res = await fetch(
          `${backendURL}/api/deleteCampaignRegistration/${registrationId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to delete registration");
        }

        setToast({
          open: true,
          message: "Registration deleted successfully",
          severity: "success",
        });

        setShowDeleteModal(false);
        fetchRegistrations();
      } catch (error) {
        console.error("Error deleting registration:", error);
        setToast({
          open: true,
          message: "Failed to delete registration",
          severity: "error",
        });
      }
    },
    [fetchRegistrations]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (selectedRegistrationId) {
      handleDelete(selectedRegistrationId);
    }
  }, [handleDelete, selectedRegistrationId]);

  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Slice registrations for current page
  const paginatedRegistrations = allRegistrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 bg-primary-50 dark:bg-primary-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary-500">
          Free Master Class Registrations
        </h1>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {paginatedRegistrations.length > 0 ? (
            <table className="w-full text-sm text-left text-primary-500 shadow-md rounded-lg">
              <thead className="text-xs uppercase bg-primary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-primary-500">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-primary-500">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-primary-500">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-primary-500">
                    Registration Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-primary-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100">
                {paginatedRegistrations.map((registration) => (
                  <FreeClassRegistrationRow
                    key={registration._id}
                    registration={registration}
                    onDelete={(id) => {
                      setSelectedRegistrationId(id);
                      setShowDeleteModal(true);
                    }}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4 text-primary-500">
              No Free Master Class registrations found!
            </p>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-primary-50 border-t border-primary-100">
          <span className="text-sm text-primary-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-primary-500 bg-transparent border border-primary-500 rounded-md px-3 py-1 hover:bg-primary-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition">
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-primary-500 bg-transparent border border-primary-500 rounded-md px-3 py-1 hover:bg-primary-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition">
              Next
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-primary-50 p-6 rounded-lg max-w-md w-full border border-primary-200">
            <h3 className="text-lg font-semibold mb-2 text-primary-500">
              Delete Registration
            </h3>
            <p className="text-primary-500">
              Are you sure you want to delete this registration? This action
              cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-primary-500/10 hover:bg-primary-900/0 text-primary-500 font-medium">
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded bg-error-500 hover:bg-error-800 text-white font-medium box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default FreeMasterClassList;
