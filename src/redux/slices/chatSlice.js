import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typingStatus: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setTypingStatus: (state, action) => {
      state.typingStatus = action.payload ?? null;
    },
  },
});

export const { setTypingStatus } = chatSlice.actions;
export default chatSlice.reducer;
