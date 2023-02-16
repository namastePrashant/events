import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: {},
};

const countSlice = createSlice({
  name: "countSlice",
  initialState,
  reducers: {
    getCountSuccess: (state, actions) => {
      state.count = actions?.payload;
    },
  },
});

export const { getCountSuccess } = countSlice.actions;

export default countSlice.reducer;
