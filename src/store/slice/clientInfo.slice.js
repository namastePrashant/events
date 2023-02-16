import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientInfo: {},
};

const clientInfoSlice = createSlice({
  name: "clientInfoSlice",
  initialState,
  reducers: {
    getClientInfoSuccess: (state, actions) => {
      state.clientInfo = actions?.payload;
    },
  },
});

export const { getClientInfoSuccess } = clientInfoSlice.actions;

export default clientInfoSlice.reducer;
