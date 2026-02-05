import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  showAuthModal: null, // added for modal state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    updateFavourites: (state, action) => {
      if (state.user) {
        state.user.favourites = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    openAuthModal: (state, action) => {
      state.showAuthModal = action.payload; // e.g. "login" or "signup"
    },
    closeAuthModal: (state) => {
      state.showAuthModal = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  setError,
  updateFavourites,
  logout,
  clearError,
  openAuthModal,
  closeAuthModal,
} = authSlice.actions;

export default authSlice.reducer;
