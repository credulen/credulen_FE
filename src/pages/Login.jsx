// //  / Login.js
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Spinner from "../components/tools/Spinner";
// import { logoutUser } from "../features/auth/authSlice";
// import { verifyAdminOTP, loginUser } from "../features/auth/authActions";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

// const Login = () => {
//   const { loading, userInfo, error, isOtpRequired, tempUserId } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     if (userInfo) {
//       console.log("User Information:");
//       console.log("ID:", userInfo._id);
//       console.log("Email:", userInfo.email);
//       console.log("Username:", userInfo.username);
//       console.log("Role:", userInfo.role);
//       console.log("Token:", userInfo.token);

//       // Log the stored data in localStorage
//       console.log(
//         "LocalStorage userInfo:",
//         JSON.parse(localStorage.getItem("userInfo"))
//       );
//       console.log("LocalStorage userToken:", localStorage.getItem("userToken"));
//     }
//   }, [userInfo]);

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpenSnackbar(false);
//   };

//   useEffect(() => {
//     if (userInfo && !isOtpRequired) {
//       // Check role and navigate accordingly
//       if (userInfo.role === "admin") {
//         navigate("/DashBoard/Admin_Dashboard");
//       } else {
//         navigate("/dashboard"); // or wherever regular users should go
//       }
//     }
//   }, [userInfo, isOtpRequired, navigate]);

//   const submitForm = async (data) => {
//     try {
//       const result = await dispatch(loginUser(data)).unwrap();
//       if (result.requireOTP) {
//         setSnackbarMessage("OTP sent to your email. Please verify.");
//         setSnackbarSeverity("info");
//       } else {
//         setSnackbarMessage("Login successful!");
//         setSnackbarSeverity("success");
//         console.log("Login successful. User data:", result);
//       }
//       setOpenSnackbar(true);
//     } catch (err) {
//       setSnackbarMessage(err || "Login failed");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//       console.error("Login error:", err);
//     }
//   };

// const handleOtpSubmit = (otp) => {
//   if (!tempUserId) {
//     setSnackbarMessage("User ID not found. Please try logging in again.");
//     setSnackbarSeverity("error");
//     setOpenSnackbar(true);
//     return;
//   }

//   dispatch(verifyAdminOTP({ userId: tempUserId, otp }))
//     .unwrap()
//     .then((response) => {
//       console.log("OTP verification successful:", response);
//       setSnackbarMessage("OTP verified successfully!");
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);
//     })
//     .catch((error) => {
//       console.error("OTP verification failed:", error);
//       setSnackbarMessage(error || "OTP verification failed");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//     });
// };

//   return (
//     <>
//       <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
//         <h2 className="mb-10 flex justify-center text-xl">Login</h2>
//         {!isOtpRequired ? (
//           <form onSubmit={handleSubmit(submitForm)}>
//             <div className="mb-5">
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Your Email
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
//                   <svg
//                     className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 20 16"
//                   >
//                     <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
//                     <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="name@gmail.com"
//                   {...register("email", { required: true })}
//                 />
//               </div>
//             </div>

//             <div className="mb-5">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Your password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//                 {...register("password")}
//               />
//             </div>
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xs px-4 py-2 text-center me-2 mb-2"
//               >
//                 {loading ? <Spinner /> : "Submit"}
//               </button>
//             </div>
//           </form>
//         ) : (
//           <OtpVerification onSubmit={handleOtpSubmit} />
//         )}

//         <div className="flex justify-end ms-20 gap-2 text-sm my-2">
//           <span>Have an account?</span>
//           <Link to="/signup" className="text-blue-500 whitespace-pre">
//             Sign up
//           </Link>
//         </div>
//         <Link to="/ForgotPassword">
//           <div className="flex justify-end ms-20 gap-2 text-xs  underline cursor-pointer hover:text-blue-500 my-2">
//             ForgotPassword?
//           </div>
//         </Link>
//       </div>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <MuiAlert
//           onClose={handleCloseSnackbar}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </MuiAlert>
//       </Snackbar>
//     </>
//   );
// };

// const OtpVerification = ({ onSubmit }) => {
//   const [otp, setOtp] = useState("");
//   const [otpError, setOtpError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (otp.length !== 6) {
//       setOtpError("OTP must be 6 characters long");
//       return;
//     }

//     setOtpError("");
//     onSubmit(otp);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-5">
//         <label
//           htmlFor="otp"
//           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//         >
//           Enter OTP
//         </label>
//         <input
//           type="text"
//           id="otp"
//           maxLength={6}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           placeholder="Enter 6-digit OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />
//         {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
//       </div>
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 ms-28 mb-5"
//         >
//           Verify OTP
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { verifyAdminOTP, loginUser } from "../features/auth/authActions";
import { resetSuccess, resetError } from "../features/auth/authSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const { loading, userInfo, error, isOtpRequired, tempUserId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  useEffect(() => {
    // Only redirect if user is logged in AND (not an admin OR OTP is not required)
    if (userInfo && (!userInfo.role === "admin" || !isOtpRequired)) {
      const timer = setTimeout(() => {
        if (userInfo.role === "admin") {
          navigate("/DashBoard/Admin_Dashboard");
        } else {
          navigate("/");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [userInfo, isOtpRequired, navigate]);

  const submitForm = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result.requireOTP) {
        setSnackbarMessage("OTP sent to your email. Please verify.");
        setSnackbarSeverity("info");
      } else {
        setSnackbarMessage("Login successful!");
        setSnackbarSeverity("success");
        dispatch(resetSuccess());
      }
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarMessage(err || "Login failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      dispatch(resetError());
    }
  };
  const handleOtpSubmit = (otp) => {
    if (!tempUserId) {
      setSnackbarMessage("User ID not found. Please try logging in again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      dispatch(resetError());
      return;
    }

    dispatch(verifyAdminOTP({ userId: tempUserId, otp }))
      .unwrap()
      .then((response) => {
        console.log("OTP verification successful:", response);
        setSnackbarMessage("OTP verified successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        dispatch(resetSuccess());
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        setSnackbarMessage(error || "OTP verification failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        {!isOtpRequired ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
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
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btColour transition-all duration-200 ease-in-out"
              >
                {loading ? (
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        ) : (
          <OtpVerification onSubmit={handleOtpSubmit} />
        )}
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
    </div>
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
