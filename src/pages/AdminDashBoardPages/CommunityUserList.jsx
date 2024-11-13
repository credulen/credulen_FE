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

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <CircularProgress size={40} className="text-btColour" />
  </div>
);

const CommunityRegistrationRow = ({ registration, onDelete }) => (
  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
        className="font-medium text-red-500 bg-transparent border border-red-500 cursor-pointer hover:bg-btColour hover:text-white p-1 rounded-md"
      >
        Delete
      </button>
    </Table.Cell>
  </Table.Row>
);

const CommunityUserList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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

      setRegistrations(data.data);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full h-full mid:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3">
        <h1 className="text-2xl font-semibold">Registered Community Members</h1>
      </div>

      {/* {bannerVisible && (
        <NotificationBanner
          isVisible={bannerVisible}
          setIsVisible={setBannerVisible}
        />
      )} */}

      <div className="flex items-center mb-4">
        <SwitchNav
          checked={bannerVisible}
          onChange={(e) => handleBannerToggle(e.target.checked)}
        >
          {bannerVisible ? "Hide Banner" : "Show Banner"}
        </SwitchNav>
      </div>

      <div className="flex-grow overflow-x-auto">
        <div className="h-full overflow-y-auto">
          {registrations.length > 0 ? (
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Ever Enrolled?</Table.HeadCell>
                <Table.HeadCell>Registered Date/Time</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {registrations.map((registration) => (
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
            <p className="text-center py-4">
              No community registrations found!
            </p>
          )}
        </div>
      </div>

      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Please Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this users information?
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </Button>
          <Button
            onClick={handleDeleteConfirm}
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
};

export default CommunityUserList;
