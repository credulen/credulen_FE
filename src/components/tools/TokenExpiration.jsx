import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { AlertCircle, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TokenExpirationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.token;
  console.log(token);

  // Memoize handleExpiration to prevent unnecessary re-renders
  const handleExpiration = useCallback(() => {
    setIsModalOpen(true);
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;

    let timeoutId;

    const validateToken = () => {
      try {
        const decoded = jwtDecode(token);
        const expiresAt = decoded.exp * 1000;
        const now = Date.now();
        const timeLeft = expiresAt - now;

        if (timeLeft <= 0) {
          handleExpiration();
          return;
        }

        // Set warning buffer (5 minutes)
        const bufferTime = 5 * 60 * 1000;
        if (timeLeft <= bufferTime && timeLeft > 0) {
          console.warn(
            "Token nearing expiration:",
            Math.round(timeLeft / 60000),
            "minutes left"
          );
        }

        timeoutId = setTimeout(handleExpiration, timeLeft);
      } catch (error) {
        console.error("Token validation error:", error);
        handleExpiration();
      }
    };

    validateToken();

    // Cleanup timeout on unmount or token change
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [token, handleExpiration]);

  const handleLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  if (!isModalOpen) return null;

  return (
    // Modal UI remains the same - looks good as is
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none bg-black/50"
      onClick={() => setIsModalOpen(false)}>
      <div
        className="relative w-full max-w-md p-4 mx-auto my-6"
        onClick={(e) => e.stopPropagation()}>
        <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-red-600">
              <AlertCircle className="text-red-600" />
              Session Expired
            </h3>
          </div>
          <div className="relative flex-auto p-6">
            <p className="my-4 text-slate-500 text-lg leading-relaxed">
              Your session has expired. Please log in again to continue
              accessing the application.
            </p>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
            <button
              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded shadow hover:shadow-lg hover:bg-red-600 focus:outline-none"
              type="button"
              onClick={handleLogin}>
              <div className="flex items-center gap-2">
                <LogIn size={18} />
                Go to Login
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified and optimized custom hook
export const useCheckTokenExpiration = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.token;

  const checkToken = useCallback(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp * 1000;
      if (Date.now() >= expiresAt) {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      dispatch(logoutUser());
    }
  }, [token, dispatch]);

  useEffect(() => {
    checkToken();
    const intervalId = setInterval(checkToken, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [checkToken]);
};
