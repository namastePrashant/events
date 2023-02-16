import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: [],
  currentPage: 1,
  total: 1,
  pageSize: 10,
};

const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState,
  reducers: {
    getAllVendorsSuccess: (state, actions) => {
      const { vendors, total, pageSize } = actions?.payload;
      state.total = total;
      state.vendors = vendors;
      state.pageSize = pageSize;
    },
  },
});

export const { getAllVendorsSuccess } = vendorSlice.actions;

export default vendorSlice.reducer;
