import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// actions.js
import { SET_EMAIL } from "../types";

// Define your email sending API endpoint
const SEND_EMAIL_ENDPOINT = "http://localhost:8080/api/registerMail";

const backendURL = import.meta.env.VITE_BACKEND_URL;
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
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem("userToken", token);

      // Store user info in localStorage if needed
      localStorage.setItem("userInfo", JSON.stringify(user));

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

export const generateOTP = createAsyncThunk(
  "auth/generateOTP",
  async (email, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${backendURL}/api/generateOTP`,
        { email },
        config
      );

      // Check if OTP generation was successful
      if (response.status === 201) {
        return "OTP sent successfully"; // Return success message
      } else {
        return rejectWithValue("Failed to generate OTP");
      }
    } catch (error) {
      // Handle error and return custom error message
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to generate OTP");
      }
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/api/verifyOTP`, {
        params: { code: otp },
      });

      // Check if OTP verification was successful
      if (response.status === 200) {
        return "OTP verified successfully"; // Return success message
      } else {
        return rejectWithValue("Invalid OTP");
      }
    } catch (error) {
      // Handle error and return custom error message
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("Failed to verify OTP");
      }
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

// Action to create the reset session
export const createResetSession = createAsyncThunk(
  "auth/createResetSession",
  async () => {
    try {
      const response = await axios.post(`${backendURL}/api/createResetSession`);

      // Check if reset session creation was successful
      if (response.status === 201) {
        return "Reset session created successfully"; // Return success message
      } else {
        return Promise.reject("Failed to create reset session");
      }
    } catch (error) {
      // Handle error and return custom error message
      return Promise.reject(error.message || "Failed to create reset session");
    }
  }
);
export const resendEmail = (storedEmail) => {
  return async (dispatch) => {
    try {
      // Call the backend endpoint to resend the email

      const response = await fetch(`${backendURL}/api/generateOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },
        body: JSON.stringify({ email: storedEmail }), // Include stored email in the request body
      });

      if (response.ok) {
        // If the email is successfully resent, generate a new OTP
        dispatch(generateOTP(storedEmail));
        return; // Exit early after dispatching the generateOTP action
      }

      // Handle any errors or unsuccessful responses from the backend
      throw new Error("Failed to resend email");
    } catch (error) {
      console.error("Error resending email:", error);
      // Handle the error, possibly dispatching an action to update the state
    }
  };
};

// export const verifyAdminOTP = createAsyncThunk(
//   "auth/verifyAdminOTP",
//   async ({ email, otp }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${backendURL}/api/verify-otp`, {
//         email,
//         otp,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

export const verifyAdminOTP = createAsyncThunk(
  "auth/verifyAdminOTP",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await axios.post(`${backendURL}/api/verify-otp`, {
        email,
        otp,
      });
      return response.data; // or response.data.payload depending on your API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
