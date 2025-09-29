import React, { useEffect, useState, useCallback } from "react";
import { Table, Button } from "flowbite-react";
import moment from "moment";
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
import SwitchNav from "../../components/tools/SwitchNav";
import { NotificationBanner } from "../../components/NavNotificationBanner";
import Spinner from "../../components/tools/Spinner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoadingSpinner = () => (
  <>
    <Spinner />
  </>
);

const CommunityRegistrationRow = ({ registration, onDelete }) => (
  <Table.Row className="bg-primary-50 text-dark dark:bg-primary-50 dark:border-primary-200-dark">
    <Table.Cell>{registration.name}</Table.Cell>
    <Table.Cell>{registration.email}</Table.Cell>
    <Table.Cell>{registration.phone}</Table.Cell>
    <Table.Cell>{registration.enrolled}</Table.Cell>
    <Table.Cell>
      {moment(registration.registrationDate).format("MMMM D, HH:mm")}
    </Table.Cell>
    <Table.Cell>
      <button
        onClick={() => onDelete(registration._id)}
        className="font-medium text-error-500 bg-transparent border border-error-500 cursor-pointer hover:bg-primary-500 hover:text-white p-1 rounded-md">
        Delete
      </button>
    </Table.Cell>
  </Table.Row>
);

const CommunityUserList = () => {
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchBannerStatus = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getBannerStatus`);
      if (!res.ok) {
        throw new Error("Failed to fetch banner status");
      }
      const data = await res.json();
      setBannerVisible(data.isActive);
    } catch (error) {
      console.error("Error fetching banner status:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch banner status",
        severity: "error",
      });
    }
  }, []);

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/api/getAllRegistrations`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch registrations");
      }

      setAllRegistrations(data.data || []);
      setTotalPages(
        Math.ceil((data.total || data.data.length) / itemsPerPage) || 1
      );
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch community registrations",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
    fetchBannerStatus();
  }, [fetchRegistrations, fetchBannerStatus]);

  const handleBannerToggle = async (isActive) => {
    try {
      const res = await fetch(`${backendURL}/api/updateBannerStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });

      if (!res.ok) {
        throw new Error("Failed to update banner status");
      }

      setBannerVisible(isActive);
      setSnackbar({
        open: true,
        message: `Banner ${isActive ? "enabled" : "disabled"} successfully`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating banner status:", error);
      setSnackbar({
        open: true,
        message: "Failed to update banner status",
        severity: "error",
      });
      setBannerVisible(!isActive);
    }
  };

  const handleDelete = useCallback(
    async (registrationId) => {
      try {
        const res = await fetch(
          `${backendURL}/api/deleteRegistration/${registrationId}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to delete registration");
        }

        setSnackbar({
          open: true,
          message: "Registration deleted successfully",
          severity: "success",
        });

        setShowDeleteModal(false);
        fetchRegistrations();
      } catch (error) {
        console.error("Error deleting registration:", error);
        setSnackbar({
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

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
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
    <div className="flex flex-col w-full h-full mid:mt-20 bg-primary-50 dark:bg-primary-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3">
        <h1 className="text-2xl font-semibold text-primary-500">
          Registered Community Members/Courses
        </h1>
      </div>

      <div className="flex items-center mb-4 ml-2">
        <SwitchNav
          checked={bannerVisible}
          onChange={(e) => handleBannerToggle(e.target.checked)}
          className="text-primary-500">
          {bannerVisible ? "Hide Banner" : "Show Banner"}
        </SwitchNav>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {paginatedRegistrations.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head className="bg-primary-50">
                <Table.HeadCell className="text-primary-500">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="text-primary-500">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="text-primary-500">
                  Phone
                </Table.HeadCell>
                <Table.HeadCell className="text-primary-500">
                  Ever Enrolled?
                </Table.HeadCell>
                <Table.HeadCell className="text-primary-500">
                  Registered Date/Time
                </Table.HeadCell>
                <Table.HeadCell className="text-primary-500">
                  Action
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-primary-100">
                {paginatedRegistrations.map((registration) => (
                  <CommunityRegistrationRow
                    key={registration._id}
                    registration={registration}
                    onDelete={(id) => {
                      setSelectedRegistrationId(id);
                      setShowDeleteModal(true);
                    }}
                  />
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p className="text-center py-4 text-primary-500">
              No community registrations found!
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
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-primary-500 bg-transparent border border-primary-500 hover:bg-primary-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-primary-500 bg-transparent border border-primary-500 hover:bg-primary-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </Button>
          </div>
        </div>
      )}

      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" className="text-primary-500">
          Please Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="text-base leading-relaxed text-primary-500">
              Are you sure you want to delete this users information?
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteModal(false)}
            className="text-blue-500 hover:text-primary-700">
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            className="text-error-500 hover:text-primary-700">
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
          severity={snackbar.severity === "success" ? "success" : "error"}
          sx={{
            width: "100%",
            backgroundColor:
              snackbar.severity === "success" ? "#f9fafb" : "#f9fafb",
            color: snackbar.severity === "success" ? "#3C6E5D" : "#EF4444",
          }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CommunityUserList;
