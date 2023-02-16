import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showFunctionNoteModal: false,
  showMyDayCalenderModal: false,
  showVendorCreateModal: false,
  showClientCreateModal: false,
  isVendorEditModal: false,
  isClientEditModal: false,
  showFunctionCreateModal: false,
  isFunctionEditModal: false,
  editFunctionData: {},
  showAssignVendorModal: false,
  assignVendorData: {},
};

const togglersSlice = createSlice({
  name: "togglersSlice",
  initialState,
  reducers: {
    toggleFunctionNoteModal: (state, actions) => {
      state.showFunctionNoteModal = actions?.payload;
    },
    toggleFunctionCreateModal: (state, actions) => {
      state.showFunctionCreateModal = actions?.payload?.showModal;
      state.isFunctionEditModal = actions?.payload?.isEdit;
    },
    toggleMyDayCalenderModal: (state, actions) => {
      state.showMyDayCalenderModal = actions?.payload?.showModal;
    },
    toggleVendorCreateModal: (state, actions) => {
      state.showVendorCreateModal = actions?.payload?.showModal;
    },
    toggleClientCreateModal: (state, actions) => {
      state.showClientCreateModal = actions?.payload?.showModal;
      state.isClientEditModal = actions?.payload?.isEditClient;
    },
    storeEditFunctionData: (state, actions) => {
      state.editFunctionData = actions?.payload;
    },

    toggleAssignVendorModal: (state, actions) => {
      state.showAssignVendorModal = actions?.payload?.showModal;
      state.assignVendorData = actions?.payload?.data;
    },
  },
});

export const {
  toggleFunctionNoteModal,
  toggleFunctionCreateModal,
  storeEditFunctionData,
  toggleAssignVendorModal,
  toggleVendorCreateModal,
  toggleClientCreateModal,
  toggleMyDayCalenderModal,
} = togglersSlice.actions;

export default togglersSlice.reducer;
