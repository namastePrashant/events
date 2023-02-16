import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
};

const clientsSlice = createSlice({
  name: "clientsSlice",
  initialState,
  reducers: {
    getClientsSuccess: (state, actions) => {
      state.clients = actions?.payload.data;
    },
  },
});

export const { getClientsSuccess } = clientsSlice.actions;

export default clientsSlice.reducer;
