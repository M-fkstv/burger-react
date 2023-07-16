import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../Constants/initialState.js';
import { API_URI, POSTFIX } from '../../Constants/API.js';

export const categoryAsyncRequest = createAsyncThunk(
  'category/fetch',
  () => fetch(`${API_URI}${POSTFIX}/category`)
    .then(res => res.json())
    .catch(error => console.log({ error })),
);

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState.category,
  reducers: {
    changeCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(categoryAsyncRequest.pending, state=>{
        state.error = '';
      })
      .addCase(categoryAsyncRequest.fulfilled, (state, action)=>{
        state.error = '';
        state.category = action.payload;
      })
      .addCase(categoryAsyncRequest.rejected, (state, action)=>{
        state.error = action.payload.error;
      })
  }

});

export const { changeCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;