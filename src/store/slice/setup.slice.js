import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setup: {},
  activeMenu: '/'
};

const setupSlice = createSlice({
  name: "setupSlice",
  initialState,
  reducers: {
    getSetupSuccess: (state, actions) => {
      state.setup = actions?.payload;
    },
    changeActiveMenu: (state, actions) => {
      state.activeMenu = actions?.payload
    }
  },
});

export const {
  getSetupSuccess,
  changeActiveMenu
} = setupSlice.actions;

export default setupSlice.reducer;
