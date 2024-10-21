// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import store from "../../store";

// // Define the base URL

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// // Define RootState as a function
// const getRootState = () => store.getState();

// // Create the API slice
// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     backendURL,
//     prepareHeaders: (headers, { getState }) => {
//       // Retrieve the token from the state
//       const token = getRootState().auth.userToken; // Using getRootState function
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (build) => ({
//     loginUser: build.mutation({
//       query: (credentials) => ({
//         url: "account/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     getUserDetails: build.query({
//       query: () => ({
//         url: "api/user/profile",
//         method: "GET",
//       }),
//     }),
//   }),
// });

// // Extract hooks for each endpoint
// export const { useLoginUserMutation, useGetUserDetailsQuery } = authApi;

// export default authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";

// Define the base URL
const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

// Create the API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL, // Set baseUrl here
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from the state
      const token = getState().auth.userToken; // Use getState directly
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
        url: "api/user/profile", // Adjust the URL if necessary
        method: "GET",
      }),
    }),
  }),
});

// Extract hooks for each endpoint
export const { useLoginUserMutation, useGetUserDetailsQuery } = authApi;

export default authApi;
