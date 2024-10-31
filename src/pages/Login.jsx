import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { verifyAdminOTP, loginUser } from "../features/auth/authActions";
import {
  resetSuccess,
  resetError,
  setCredentials,
} from "../features/auth/authSlice";
import { Alert, Snackbar } from "@mui/material";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import CredulenLogo from "../assets/CredulenLogo.png";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { handleGoogleLogin } from "../features/auth/authActions";

const Login = () => {
  // State management
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Redux state
  const { userInfo, isOtpRequired, tempUserId } = useSelector(
    (state) => state.auth
  );

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle snackbar
  const handleShowSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Navigation effect
  useEffect(() => {
    if (userInfo && (!userInfo.role === "admin" || !isOtpRequired)) {
      const timer = setTimeout(() => {
        navigate(
          userInfo.role === "admin" ? "/DashBoard/Admin_Dashboard" : "/"
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userInfo, isOtpRequired, navigate]);

  // Form submission
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const result = await dispatch(loginUser(data)).unwrap();

      if (result.requireOTP) {
        handleShowSnackbar("OTP sent to your email. Please verify.", "info");
      } else {
        handleShowSnackbar("Login successful!", "success");
        reset();
        navigate(
          result.user.role === "admin" ? "/DashBoard/Admin_Dashboard" : "/"
        );
      }
    } catch (err) {
      handleShowSnackbar(
        err.message || "Login failed. Please check your credentials.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // OTP verification
  const handleOtpSubmit = async (otp) => {
    if (!tempUserId) {
      handleShowSnackbar(
        "User ID not found. Please try logging in again.",
        "error"
      );
      dispatch(resetError());
      return;
    }

    try {
      await dispatch(verifyAdminOTP({ userId: tempUserId, otp })).unwrap();
      handleShowSnackbar("OTP verified successfully!");
      dispatch(resetSuccess());
    } catch (error) {
      handleShowSnackbar(error || "OTP verification failed", "error");
    }
  };

  // Google login handlers
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);

    try {
      const response = await handleGoogleLogin(credentialResponse.credential);

      if (response.error) {
        handleShowSnackbar(response.message || "Google login failed", "error");
        return;
      }

      dispatch(setCredentials(response));
      handleShowSnackbar("Google login successful!", "success");
      navigate(response.user.role === "admin" ? "/Admin/DashBoard" : "/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Google login failed";
      handleShowSnackbar(errorMessage, "error");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google Sign-In Error:", error);
    let errorMessage = "Google Sign-In failed. ";

    switch (error.error) {
      case "origin_mismatch":
        errorMessage +=
          "The app's domain is not authorized in Google Cloud Console.";
        break;
      case "popup_closed_by_user":
        errorMessage += "Sign-in window was closed.";
        break;
      case "access_denied":
        errorMessage += "Access was denied.";
        break;
      default:
        errorMessage += "Please try again later.";
    }

    handleShowSnackbar(errorMessage, "error");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <img src={CredulenLogo} alt="Autograph Logo" />
            <p className="mt-2 font-bold text-lg text-gray-600">
              Sign in to your account
            </p>
          </div>

          {!isOtpRequired ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/signup"
                    className="font-medium text-btColour hover:text-blue-500"
                  >
                    Don't have an account?
                  </Link>
                </div>
                <div className="text-sm">
                  <Link
                    to="/ForgotPassword"
                    className="font-medium text-btColour hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btColour transition-all duration-200 ease-in-out"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>

              <div className="mt-6">
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    disabled={isGoogleLoading}
                    theme="outline"
                    shape="rectangular"
                    locale="en"
                  />
                </div>
                {isGoogleLoading && (
                  <div className="flex justify-center mt-4">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </form>
          ) : (
            <OtpVerification onSubmit={handleOtpSubmit} />
          )}

          {/* Snackbar Component */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

// OTP Verification Component
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
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="otp"
          className="block text-sm font-medium text-gray-700"
        >
          Enter OTP
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="otp"
            maxLength={6}
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour sm:text-sm"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {otpError && <p className="mt-2 text-sm text-red-600">{otpError}</p>}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btColour"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
};

export default Login;
