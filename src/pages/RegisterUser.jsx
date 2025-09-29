import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { registerUser } from "../features/auth/authActions";
import { resetSuccess, resetError } from "../features/auth/authSlice";
import { Eye, EyeOff, Mail, User, Lock, Badge } from "lucide-react";
import CredulenLogo from "../assets/CredulenLogo.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterUser = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Check for agentcode in URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const agentCodeFromUrl = queryParams.get("agentcode");

  useEffect(() => {
    if (success) {
      setSnackbarMessage("Registered successfully. You can now log in.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      const timer = setTimeout(() => {
        navigate("/login");
        dispatch(resetSuccess());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    data.email = data.email.toLowerCase();
    // Include agentCode from URL or form
    if (agentCodeFromUrl) {
      data.agentCode = agentCodeFromUrl;
    }
    console.log("Form data submitted:", data); // Debug log
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-primary-100">
        <div className="text-center">
          <img
            src={CredulenLogo}
            alt="Credulen Logo"
            className="mx-auto h-16"
          />
          <p className="mt-2 font-bold text-lg text-primary-900">
            Register Account
          </p>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-primary-500" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-primary-300 placeholder-primary-500 text-primary-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 focus:z-10 sm:text-sm hover:border-primary-400 transition-all duration-200"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-primary-300 placeholder-primary-500 text-primary-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 focus:z-10 sm:text-sm hover:border-primary-400 transition-all duration-200"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-primary-300 placeholder-primary-500 text-primary-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 focus:z-10 sm:text-sm hover:border-primary-400 transition-all duration-200"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-primary-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary-500" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-primary-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-primary-300 placeholder-primary-500 text-primary-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 focus:z-10 sm:text-sm hover:border-primary-400 transition-all duration-200"
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-primary-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-primary-500" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            {/* Agent Code (only if not in URL) */}
            {!agentCodeFromUrl && (
              <div>
                <label htmlFor="agentCode" className="sr-only">
                  Agent Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Badge className="h-5 w-5 text-primary-500" />
                  </div>
                  <input
                    type="text"
                    id="agentCode"
                    className="appearance-none relative block w-full px-3 py-3 pl-10 border border-primary-300 placeholder-primary-500 text-primary-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 focus:z-10 sm:text-sm hover:border-primary-400 transition-all duration-200"
                    placeholder="Agent Code (optional)"
                    {...register("agentCode", {
                      pattern: {
                        value: /^[a-zA-Z0-9]{5,15}$/,
                        message:
                          "Agent code must be 5-15 alphanumeric characters",
                      },
                    })}
                  />
                  {errors.agentCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.agentCode.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Display Agent Code from URL */}
            {agentCodeFromUrl && (
              <div className="text-sm text-neutral-600">
                Using Agent Code:{" "}
                <code className="font-mono text-primary-900">
                  {agentCodeFromUrl}
                </code>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-primary-500 hover:text-secondary-600">
                Already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-500 hover:bg-secondary-500 hover:text-primary-500 hover:font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500/20 transition-all duration-200 ease-in-out disabled:opacity-70 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
              {loading ? (
                <div className="w-5 h-5 border-t-2 border-primary-900 rounded-full animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default RegisterUser;
