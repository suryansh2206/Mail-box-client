import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    emailForm: false,
    inboxShow: false,
    sentShow: false,
    draftShow: false,
  },
  reducers: {
    openEmailForm: (state) => {
      state.emailForm = true;
      state.inboxShow = false; // Close the inbox
      state.sentShow = false;
      state.draftShow = false;
    },
    closeEmailForm: (state) => {
      state.emailForm = false;
    },
    openInbox: (state) => {
      state.inboxShow = true;
      state.emailForm = false; // Close the compose form
      state.sentShow = false;
      state.draftShow = false;
    },
    closeInbox: (state) => {
      state.inboxShow = false;
    },
    openSent: (state) => {
      state.sentShow = true;
      state.emailForm = false;
      state.inboxShow = false;
      state.draftShow = false;
    },
    closeSent: (state) => {
      state.sentShow = false;
    },
    openDraft: (state) => {
      state.draftShow = true;
      state.emailForm = false;
      state.inboxShow = false;
      state.sentShow = false;
    },
    closeDraft: (state) => {
      state.draftShow = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
