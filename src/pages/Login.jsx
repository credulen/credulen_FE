//  / Login.js
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/tools/Spinner";
import { logoutUser } from "../features/auth/authSlice";
import { verifyAdminOTP } from "../features/auth/authActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Login = () => {
  const { loading, user, error, isOtpRequired, tempUserId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (user && !isOtpRequired) {
      navigate("/DashBoard/Admin_Dashboard");
    }
  }, [user, isOtpRequired, navigate]);

  const submitForm = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((result) => {
        if (result.requireOTP) {
          setSnackbarMessage("OTP sent to your email. Please verify.");
          setSnackbarSeverity("info");
        } else {
          setSnackbarMessage("Login successful!");
          setSnackbarSeverity("success");
        }
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarMessage(error || "Login failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleOtpSubmit = (otp) => {
    dispatch(verifyAdminOTP({ userId: tempUserId, otp }))
      .unwrap()
      .then(() => {
        setSnackbarMessage("OTP verified successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarMessage("OTP verification failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  return (
    <>
      <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
        <h2 className="mb-10 flex justify-center text-xl">Login</h2>
        {!isOtpRequired ? (
          <form onSubmit={handleSubmit(submitForm)}>
            {/* Email and password fields */}
            {/* ... (keep the existing email and password input fields) */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 ms-28 mb-5"
              >
                {loading ? <Spinner /> : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <OtpVerification onSubmit={handleOtpSubmit} />
        )}

        {/* Links for signup and forgot password */}
        {/* ... (keep the existing links) */}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const OtpVerification = ({ onSubmit }) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("OTP must be 6 characters long");
      return;
    }

    setOtpError("");
    onSubmit(otp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="otp"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter OTP
        </label>
        <input
          type="text"
          id="otp"
          maxLength={6}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 ms-28 mb-5"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default Login;
