import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../Constants/initialState.js";
import { closeModal } from "../delivery/delivery.slice.js";
import { clearOrder } from "../order/order.slice.js";

export const submitForm = createAsyncThunk(
  'form/submit',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://cloudy-slash-rubidium.glitch.me/api/order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if(!response.ok){
        throw new Error(`${response.statusText}`)
      }
      dispatch(clearOrder());
      dispatch(closeModal());

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const formSlice = createSlice({
  name: 'form',
  initialState: initialState.delivery,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
        state.response = null;
        state.error = '';
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = 'success';
        state.response = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
  }
});

export const { updateFormValue } = formSlice.actions;
export const formReducer = formSlice.reducer;