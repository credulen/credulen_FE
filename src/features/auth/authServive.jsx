import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";

// Define the base URL
const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://127.0.0.1:5000/"
    : import.meta.env.VITE_SERVER_URL;

// Define RootState as a function
const getRootState = () => store.getState();

// Create the API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the state
      const token = getRootState().auth.userToken; // Using getRootState function
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: "account/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserDetails: build.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
    }),
  }),
});

// Extract hooks for each endpoint
export const { useLoginUserMutation, useGetUserDetailsQuery } = authApi;

export default authApi;
