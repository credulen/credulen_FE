import React, { useState } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Spinner from "../components/tools/Spinner";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/api/forgot-password`, {
        email,
      });
      setMessage(response.data.message);
      setSnackbarSeverity("success");
      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
        <h2 className="mb-10 flex justify-center text-xl">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 mb-5"
            >
              {loading ? <Spinner /> : "Reset Password"}
            </button>
          </div>
        </form>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPassword;
