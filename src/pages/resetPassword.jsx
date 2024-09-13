import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../features/auth/authActions";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, RSTsuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ email, password }));
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  useEffect(() => {
    if (RSTsuccess) {
      toast.success("Password reset successfully. You can now log in.");
    }
  }, [RSTsuccess]);

  return (
    <div className="container mx-auto mt-10">
      <ToastContainer
        position="top-center"
        autoClose={9000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-3xl font-semibold text-center mb-8">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="my-5">
            <label htmlFor="email" className="">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="my-5">
          <div className="mx-auto text-center">
            <button
              type="submit"
              className="border bg-purple text-white py-2 px-36 rounded-2xl hover:scale-105 focus:outline-none focus:bg-blue-600"
            >
              {loading ? <Spinner /> : "Reset Password"}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-2 text-center">
        <div className="flex justify-center">
          {error && <Error>{error}</Error>}
        </div>
      </div>
      <p className="mt-4 text-center">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
