import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authServive";
import errorReducer from "./features/reducers/errorReducer";
import profilesReducer from "./features/Users/UserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    profiles: profilesReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
