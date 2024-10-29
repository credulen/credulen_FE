// import { createSlice } from "@reduxjs/toolkit";
// import {
//   loginUser,
//   registerUser,
//   registerAdmin,
//   generateOTP,
//   verifyOTP,
//   resetPassword,
//   verifyAdminOTP,
// } from "./authActions";

// const storedToken = localStorage.getItem("userToken");
// const storedUserInfo = storedToken
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   email: "",
//   loading: false,
//   userInfo: storedUserInfo || null,
//   error: null,
//   success: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setEmail: (state, action) => {
//       state.email = action.payload;
//     },

//     logoutUser: (state) => {
//       // Clear user and token
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       console.log("User logged outfrom slice");

//       // Optionally, clear tokens from localStorage
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("userToken");
//       localStorage.removeItem("userInfo");
//     },
//     setCredentials: (state, { payload }) => {
//       state.userInfo = payload;
//       localStorage.setItem("userToken", payload.userToken);
//       localStorage.setItem("userInfo", JSON.stringify(payload));
//     },
//     resetSuccess: (state) => {
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userInfo = action.payload; // Ensure _id and other details are included
//         state.success = true;
//         localStorage.setItem("userToken", action.payload.userToken);
//         localStorage.setItem("userInfo", JSON.stringify(action.payload));
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         localStorage.setItem("userToken", action.payload.userToken);
//         localStorage.setItem("userInfo", JSON.stringify(action.payload));
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       // Admin
//       .addCase(registerAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         localStorage.setItem("userToken", action.payload.userToken);
//         localStorage.setItem("userInfo", JSON.stringify(action.payload));
//       })
//       .addCase(registerAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(generateOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(generateOTP.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(generateOTP.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(verifyOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyOTP.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(verifyOTP.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(verifyAdminOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyAdminOTP.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(verifyAdminOTP.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       });
//   },
// });

// export const { logoutUser, setCredentials, resetSuccess } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  registerAdmin,
  verifyAdminOTP,
} from "./authActions";

const storedUserInfo = localStorage.getItem("userInfo");

const initialState = {
  email: "",
  loading: false,
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  error: null,
  success: false,
  isOtpRequired: false,
  tempUserId: null,
  tempAdminData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.isOtpRequired = false;
      state.tempAdminData = null;
      state.tempUserId = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem("userToken", payload.token);
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    resetError: (state) => {
      state.error = null; // Reset the error to null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.requireOTP) {
          // For admin users requiring OTP
          state.isOtpRequired = true;
          state.tempUserId = action.payload.user._id;
          state.tempAdminData = action.payload.user;
          // Don't set userInfo or store in localStorage yet
        } else {
          // Regular user login
          state.userInfo = {
            ...action.payload.user,
            token: action.payload.token,
          };
          state.success = true;
          localStorage.setItem("userToken", action.payload.token);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...action.payload.user,
              token: action.payload.token,
            })
          );
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // OTP verification cases
      .addCase(verifyAdminOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpRequired = false;

        const userWithToken = {
          ...action.payload.user,
          token: action.payload.token,
        };

        // Only set userInfo and localStorage after successful OTP verification
        state.userInfo = userWithToken;
        state.success = true;
        state.tempAdminData = null;
        state.tempUserId = null;

        localStorage.setItem("userToken", action.payload.token);
        localStorage.setItem("userInfo", JSON.stringify(userWithToken));
      })
      .addCase(verifyAdminOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Registration cases remain the same
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        // Remove setting userInfo on registration
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setCredentials, resetSuccess, resetError } =
  authSlice.actions;

export default authSlice.reducer;
