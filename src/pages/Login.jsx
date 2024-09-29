// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Spinner from "../components/tools/Spinner";
// import { loginUser } from "../features/auth/authActions";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const { loading, userInfo, error } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userInfo) {
//       if (userInfo?.user.role === "admin") {
//         navigate("/DashBoard/Admin_Dashboard");
//       } else {
//         navigate("/");
//       }
//     }

//     if (error) {
//       toast.error(error);
//     }
//   }, [userInfo, error, navigate]);

//   // Submit form handler
//   const submitForm = (data) => {
//     data.email = data.email.toLowerCase();
//     dispatch(loginUser(data))
//       .unwrap()
//       .then(() => {})
//       .catch((error) => {
//         console.error("Login error:", error);
//       });
//   };

//   return (
//     <>
//       <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
//         <h2 className="mb-10 flex justify-center text-xl">Login</h2>
//         <form onSubmit={handleSubmit(submitForm)} className="">
//           <div className="mb-5">
//             <label
//               htmlFor="email"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Your Email
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 16"
//                 >
//                   <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
//                   <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
//                 </svg>
//               </div>
//               <input
//                 type="email"
//                 id="email"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="name@gmail.com"
//                 {...register("email", { required: true })}
//               />
//             </div>
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Your password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               required
//               {...register("password")}
//             />
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="confirmPassword"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Confirm password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               required
//               {...register("confirmPassword")}
//             />
//           </div>

//           <div className=" flex justify-end">
//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 ms-28 mb-5"
//             >
//               {loading ? <Spinner /> : "Submit"}
//             </button>
//           </div>
//         </form>

//         <div className=" flex justify-end ms-20 gap-2 text-sm my-2">
//           <span>Have an account?</span>
//           <Link to="/signup" className="text-blue-500 whitespace-pre">
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/tools/Spinner";
import { loginUser, verifyAdminOTP } from "../features/auth/authActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [userId, setUserId] = useState("");

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
    if (userInfo) {
      console.log("User Info:", userInfo); // Log userInfo to inspect its structure
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      if (userInfo?.user.role === "admin") {
        navigate("/DashBoard/Admin_Dashboard");
      } else {
        navigate("/");
      }
    }
  }, [userInfo, navigate]);

  const submitForm = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((result) => {
        if (result.requireOTP) {
          setIsOtpRequired(true);
          console.log("UserId:", result.user._id); // Log the userId here
          setUserId(result.user._id);
          setSnackbarMessage("OTP sent to your email. Please verify.");
          setSnackbarSeverity("info");
          setOpenSnackbar(true);
        } else {
          setSnackbarMessage("Login successful!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setSnackbarMessage(error || "Login failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleOtpSubmit = (otp) => {
    dispatch(verifyAdminOTP({ userId, otp }))
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
        console.error("OTP verification error:", error);
      });
  };

  return (
    <>
      <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
        <h2 className="mb-10 flex justify-center text-xl">Login</h2>
        {!isOtpRequired ? (
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("password")}
              />
            </div>

            <div className=" flex justify-end">
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
        <div className="flex justify-end ms-20 gap-2 text-sm my-2">
          <span>Have an account?</span>
          <Link to="/signup" className="text-blue-500 whitespace-pre">
            Sign up
          </Link>
        </div>
        <Link to="/ForgotPassword">
          <div className="flex justify-end ms-20 gap-2 text-xs  underline cursor-pointer hover:text-blue-500 my-2">
            ForgotPassword?
          </div>
        </Link>
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
    if (otp.length <= 4) {
      setOtpError("OTP must be more than 5 characters");
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
