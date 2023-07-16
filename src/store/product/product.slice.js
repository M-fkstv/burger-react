import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { initialState } from '../../Constants/initialState.js';
import { API_URI, POSTFIX } from '../../Constants/API.js';
import { initialState } from '../../Constants/initialState.js';

export const productAsyncRequest = createAsyncThunk(
  'product/fetch',
  (category) =>
    fetch(`${API_URI}${POSTFIX}?category=${category}`)
      .then(res => res.json())
      .catch(error => console.log({ error })),
);

const productSlice = createSlice({
  name: 'products',
  initialState: initialState.products,
  extraReducers: builder => {
    builder
      .addCase(productAsyncRequest.pending, state => {
        state.error = '';
      })
      .addCase(productAsyncRequest.fulfilled, (state, action) => {
        state.error = '';
        state.products =  action.payload;
      })
      .addCase(productAsyncRequest.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },

});

export const productReducer = productSlice.reducer;
export const { getProduct } = productSlice.actions;


