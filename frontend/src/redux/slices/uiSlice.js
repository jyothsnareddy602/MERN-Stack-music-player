import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authModalOpen: false,
  authMode: null, // "login" | "signup" | "forgot"
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      state.authModalOpen = true;
      state.authMode = action.payload; // e.g. "login"
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false;
      state.authMode = null;
    },
    switchAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, switchAuthMode } = uiSlice.actions;
export default uiSlice.reducer;
