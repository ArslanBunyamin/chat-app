import { createSlice, current } from "@reduxjs/toolkit";

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
  },
});
export const { setMessages, setContinous } = messagesSlice.actions;
export default messagesSlice.reducer;
