import { combineReducers } from "redux";

import profileSlice from "./slice/profile.slice";
import eventsSlice from "./slice/events.slice";
import vendorsSlice from "./slice/vendors.slice";
import setupSlice from "./slice/setup.slice";
import togglersSlice from "./slice/togglers.slice";
import clientsSlice from "./slice/clients.slice";
import countSlice from "./slice/count.slice";
import updateClientIdSlice from "./slice/updateClientId";
import clientInfoSlice from "./slice/clientInfo.slice";

const rootReducer = combineReducers({
  profile: profileSlice,
  events: eventsSlice,
  vendors: vendorsSlice,
  setup: setupSlice,
  togglers: togglersSlice,
  clients: clientsSlice,
  count: countSlice,
  updateClientId: updateClientIdSlice,
  clientInfo: clientInfoSlice,
});

export default rootReducer;
