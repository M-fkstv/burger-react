import { createSlice } from '@reduxjs/toolkit';

const modalProduct = createSlice({
  name: 'modal-product',
  initialState: {
    isOpen: false,
    item: '',
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.item = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalProduct.actions;
export const modalProductReducer = modalProduct.reducer;
