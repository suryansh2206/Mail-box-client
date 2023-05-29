import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    emailForm: false,
    inboxShow: false,
  },
  reducers: {
    openEmailForm: (state) => {
      state.emailForm = true;
      state.inboxShow = false; // Close the inbox
    },
    closeEmailForm: (state) => {
      state.emailForm = false;
    },
    openInbox: (state) => {
      state.inboxShow = true;
      state.emailForm = false; // Close the compose form
    },
    closeInbox: (state) => {
      state.inboxShow = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
