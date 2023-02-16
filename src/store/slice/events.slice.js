import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  favoriteEvents: [],
  currentPage: 1,
  total: 1,
  pageSize: 10,
  summary: {},
  recentEvents: [],
  start_date: "",
  end_date: "",
  color_code: 0,
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    getAllEventsSuccess: (state, actions) => {
      const { events, pageSize, total } = actions?.payload;
      state.total = total;
      state.events = events;
      state.pageSize = pageSize;
    },
    getEachEventSuccess: (state, actions) => {
      const { startDate, endDate, color_code } = actions?.payload;
      state.start_date = startDate;
      state.end_date = endDate;
      state.color_code = color_code;
    },
    getAllFavoriteEventsSuccess: (state, actions) => {
      const { data } = actions?.payload;
      state.favoriteEvents = data;
    },
    updateSummary: (state, actions) => {
      state.summary = actions?.payload;
    },
    getAllRecentEvent: (state, actions) => {
      state.recentEvents = actions?.payload;
    },
  },
});

export const {
  getAllEventsSuccess,
  getEachEventSuccess,
  getAllFavoriteEventsSuccess,
  updateFunction,
  updateSummary,
  getAllRecentEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
