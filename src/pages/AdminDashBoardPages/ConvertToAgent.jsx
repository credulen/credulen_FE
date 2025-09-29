import React, { useState, useCallback, useMemo } from "react";
import { TextInput, Button, Label } from "flowbite-react";
import { useSelector } from "react-redux";
import { Snackbar, CircularProgress } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConvertToAgent() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [result, setResult] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

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

  const handleConvert = useCallback(async () => {
    if (!email) {
      showSnackbar("Please enter a valid email", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/api/convertToAgent`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setResult(res.data.user);
        showSnackbar(
          `User converted to agent with ID: ${res.data.agentId}`,
          "success"
        );
      } else {
        showSnackbar("Failed to convert user to agent", "error");
      }
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Error converting to agent",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }, [email, backendURL, showSnackbar]);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setResult(null); // Clear previous result on email change
  }, []);

  if (!userInfo || userInfo.role !== "admin") {
    return (
      <p className="text-center mt-10 text-primary-500">
        Admin access required
      </p>
    );
  }

  return (
    <div className="mx-auto p-4 max-w-md mt-10 bg-primary-50">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-500">
        Convert User to Agent
      </h2>
      <div className="mb-4">
        <Label
          htmlFor="email"
          value="User Email"
          className="mb-2 block text-primary-500"
        />
        <TextInput
          id="email"
          type="email"
          placeholder="Enter user email..."
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
          required
          color="primary" // Using Flowbite's color prop
          className="text-primary-500" // Custom text color for input
        />
      </div>
      <Button
        onClick={handleConvert}
        disabled={isLoading}
        color="primary" // Using Flowbite's color prop
        className="w-full bg-primary-500 hover:bg-primary-600 text-white">
        {isLoading ? (
          <CircularProgress size={24} className="text-white" />
        ) : (
          "Convert to Agent"
        )}
      </Button>

      {result && (
        <div className="mt-6 p-4 bg-primary-100 rounded-lg">
          <h3 className="text-lg font-semibold text-primary-500">
            Conversion Result
          </h3>
          <p>
            <strong className="text-primary-500">Username:</strong>{" "}
            {result.username}
          </p>
          <p>
            <strong className="text-primary-500">Email:</strong> {result.email}
          </p>
          <p>
            <strong className="text-primary-500">Role:</strong> {result.role}
          </p>
          <p>
            <strong className="text-primary-500">Agent ID:</strong>{" "}
            {result.agentId}
          </p>
        </div>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            backgroundColor:
              snackbar.severity === "success" ? "#110b79" : "#ef4444",
            color: snackbar.severity === "success" ? "#ffff" : "#ffff",
          }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
