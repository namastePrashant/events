import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientId: -1,
};

const updateClientIdSlice = createSlice({
  name: "updateClientIdSlice",
  initialState,
  reducers: {
    getClientIdSuccess: (state, actions) => {
      state.clientId = actions?.payload;
    },
  },
});

export const { getClientIdSuccess } = updateClientIdSlice.actions;

export default updateClientIdSlice.reducer;
