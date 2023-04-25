import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "msgs",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, newArray) => {
      state.messages = newArray.payload;
    },
    setContinous: (state, cont) => {
      const index = cont.payload.index;
      const continous = cont.payload.continous;
      state.messages[index].continous = continous;
    },
    setSameDate: (state, cont) => {
      const index = cont.payload.index;
      const sameDate = cont.payload.sameDate;
      state.messages[index].sameDate = sameDate;
    },
  },
});
export const { setMessages, setContinous, setSameDate } = messagesSlice.actions;
export default messagesSlice.reducer;
