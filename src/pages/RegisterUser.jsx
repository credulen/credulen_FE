import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/tools/Spinner";
import Error from "../components/tools/Error";
import { registerUser } from "../features/auth/authActions";
import { resetSuccess } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    if (success) {
      toast.success("Registered successfully. You can now log in.");
      setTimeout(() => {
        dispatch(resetSuccess());
        navigate("/login");
      }, 3000);
    }
    if (error) {
      toast.error(error); // Display the error message in a toast
    }
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, success, userInfo, error, dispatch]);

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    data.email = data.email.toLowerCase();
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <>
      <div className="md:mt-32 mt-36 md:px-[5rem] p-16 border-2 mx-auto md:w-[35rem] mid:mx-[1rem] rounded-xl">
        <h2 className="mb-10 flex justify-center text-xl">Sign Up</h2>
        <form onSubmit={handleSubmit(submitForm)} className="">
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                {/* Icon SVG */}
              </span>
              <input
                type="text"
                id="username"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative">
              {/* Email input icon */}
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span>{errors.email.message}</span>}
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
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className=" flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[30%]   py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </form>

        <div className=" flex justify-end ms-20 gap-2 text-sm my-2">
          <span>Have an account?</span>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
