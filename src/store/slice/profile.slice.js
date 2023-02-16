import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("aioToken");

const initialState = {
  token: token ? token : undefined,
  name: "",
  profile_pic: "",
  email: "",
  phone: "",
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    storeUserDetails: (state, actions) => {
      state.userDetails = actions?.payload;
    },
    storeToken: (state, actions) => {
      state.token = actions?.payload;
    },

    getAllProfilesSuccess: (state, actions) => {
      const { profile_pic, name, email, phone } = actions?.payload;
      state.profile_pic = profile_pic;
      state.name = name;
      state.email = email;
      state.phone = phone;
    },
  },
});

export const {
  getAllProfilesSuccess,
  storeUserDetails,
  storeToken,
  updateFunction,
} = profileSlice.actions;

export default profileSlice.reducer;
