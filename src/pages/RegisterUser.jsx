// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Spinner from "../components/tools/Spinner";
// import Error from "../components/tools/Error";
// import { registerUser } from "../features/auth/authActions";
// import { resetSuccess } from "../features/auth/authSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Signup = () => {
//   const { loading, userInfo, error, success } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const password = watch("password");
//   const confirmPassword = watch("confirmPassword");

//   useEffect(() => {
//     if (success) {
//       toast.success("Registered successfully. You can now log in.");
//       setTimeout(() => {
//         dispatch(resetSuccess());
//         navigate("/login");
//       }, 3000);
//     }
//     if (error) {
//       toast.error(error); // Display the error message in a toast
//     }
//     if (userInfo) {
//       navigate("/");
//     }
//   }, [navigate, success, userInfo, error, dispatch]);

//   const submitForm = (data) => {
//     if (data.password !== data.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     data.email = data.email.toLowerCase();
//     dispatch(registerUser(data))
//       .unwrap()
//       .then(() => {})
//       .catch((error) => {
//         console.error("Registration error:", error);
//       });
//   };

//   return (
//     <>
//       <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
//         <h2 className="mb-10 flex justify-center text-xl">Sign Up</h2>
//         <form onSubmit={handleSubmit(submitForm)} className="">
//           <div className="mb-5">
//             <label
//               htmlFor="username"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Username
//             </label>
//             <div className="flex">
//               <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
//                 {/* Icon SVG */}
//               </span>
//               <input
//                 type="text"
//                 id="username"
//                 className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Username"
//                 {...register("username", { required: "Username is required" })}
//               />
//               {errors.username && <span>{errors.username.message}</span>}
//             </div>
//           </div>

//           <div className="mb-5">
//             <label
//               htmlFor="email"
//               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               Your Email
//             </label>
//             <div className="relative">
//               {/* Email input icon */}
//               <input
//                 type="email"
//                 id="email"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="name@gmail.com"
//                 {...register("email", { required: "Email is required" })}
//               />
//               {errors.email && <span>{errors.email.message}</span>}
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
//               {...register("password", { required: "Password is required" })}
//             />
//             {errors.password && <span>{errors.password.message}</span>}
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
//               {...register("confirmPassword", {
//                 required: "Please confirm your password",
//               })}
//             />
//             {errors.confirmPassword && (
//               <span>{errors.confirmPassword.message}</span>
//             )}
//           </div>

//           <div className=" flex justify-end">
//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[30%]   py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
//             >
//               {loading ? <Spinner /> : "Submit"}
//             </button>
//           </div>
//         </form>

//         <div className=" flex justify-end ms-20 gap-2 text-sm my-2">
//           <span>Have an account?</span>
//           <Link to="/login" className="text-blue-500">
//             Login
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { registerUser } from "../features/auth/authActions";
import { resetSuccess, resetError } from "../features/auth/authSlice";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red -600">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-btColour hover:text-blue-500"
              >
                Already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus :ring-offset-2 focus:ring-btColour transition-all duration-200 ease-in-out"
            >
              {loading ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
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
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Signup;
