import { createSlice } from '@reduxjs/toolkit';


const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;