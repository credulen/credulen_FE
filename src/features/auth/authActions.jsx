import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// actions.js
import { SET_EMAIL } from "../types";

// Define your email sending API endpoint
const SEND_EMAIL_ENDPOINT = "http://localhost:8080/api/registerMail";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";
export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // For admin users requiring OTP, don't store anything in localStorage yet
      if (response.data.requireOTP) {
        return response.data;
      }

      // For regular users, proceed with storing token and user info
      const { token, user } = response.data;
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/register`,
        { email, password, username },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      // Store tokens and user info in cookies
      if (typeof window !== "undefined") {
        Cookies.set("userToken", response.data.token, { expires: 7 });
        Cookies.set("userInfo", JSON.stringify(response.data.user), {
          expires: 7,
        });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/registerAdmin`,
        { email, password, username },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      // Store tokens and user info in cookies
      if (typeof window !== "undefined") {
        Cookies.set("userToken", response.data.token, { expires: 7 });
        Cookies.set("userInfo", JSON.stringify(response.data.user), {
          expires: 7,
        });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Action to reset the password

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${backendURL}/api/resetPassword`,
        { email, password },
        config
      );

      if (response.status === 201) {
        return response.data; // Return data from the response
      } else {
        return rejectWithValue("Failed to reset password");
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.data.message) {
        // If there's an error response with a message, return the message
        return rejectWithValue(error.response.data.message);
      } else {
        // If there's an unexpected error, return the error message
        return rejectWithValue(error.message);
      }
    }
  }
);

export const verifyAdminOTP = createAsyncThunk(
  "auth/verifyAdminOTP",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/api/verifyAdminOTP`, {
        userId,
        otp,
      });

      // Make sure the response matches the expected structure
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify OTP"
      );
    }
  }
);
