import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../Constants/initialState.js';
import { API_URI, POSTFIX } from '../../Constants/API.js';


export const localStorageMiddleware = store => next => action => {

  const nextAction = next(action);

  if (nextAction.type.startsWith('order/')) {
    const orderList = store.getState().order.orderList;
    localStorage.setItem('order', JSON.stringify(orderList));
  }

  return nextAction;
};

export const orederAsyncRequest = createAsyncThunk(
  'order/fetch',
  async (_, { getState }) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const listId = getState().order.orderList.map(item => item.id);
    return fetch(`${API_URI}${POSTFIX}?list=${listId}`)
      .then(res => res.json())
      .catch(error => ({ error }));
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState.order,
  reducers: {
    addProduct: (state, action) => {
      const productOrderList = state.orderList.find(item => item.id === action.payload.id);
      if (productOrderList) {
        productOrderList.count += 1;

        const productOrderGoods = state.orderGoods.find(item => item.id === action.payload.id);
        productOrderGoods.count = productOrderList.count;
        //TODO вынести в отдельные функции
        state.totalCount = state.orderGoods.reduce((acc, item) => {
          return acc + item.count;
        }, 0);
        state.totalPrice = state.orderGoods.reduce((acc, item) => {
          return acc + item.count * item.price;
        }, 0);
      } else {
        state.orderList.push({ ...action.payload, count: 1 });
      }
    },
    removeProduct: (state, action) => {
      const productOrderList = state.orderList.find(item => item.id === action.payload.id);
      if (productOrderList.count > 1) {
        productOrderList.count -= 1;

        const productOrderGoods = state.orderGoods.find(item => item.id === action.payload.id);
        productOrderGoods.count = productOrderList.count;
        //TODO вынести в отдельные функции
        state.totalCount = state.orderGoods.reduce((acc, item) => {
          return acc + item.count;
        }, 0);
        state.totalPrice = state.orderGoods.reduce((acc, item) => {
          return acc + item.count * item.price;
        }, 0);
      } else {
        state.orderList = state.orderList.filter(item => item.id !== action.payload.id);
      }
    },
    clearOrder: (state) => {
      return initialState.order;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(orederAsyncRequest.pending, (state) => {
        state.error = '';
      })
      .addCase(orederAsyncRequest.fulfilled, (state, action) => {
        const orderGoods = state.orderList.map(item => {
          const product = action.payload.find(product => product.id === item.id);
          product.count = item.count;
          return product;
        });
        state.error = '';
        state.orderGoods = orderGoods;
        state.totalCount = orderGoods.reduce((acc, item) => {
          return acc + item.count;
        }, 0);
        state.totalPrice = orderGoods.reduce((acc, item) => {
          return acc + item.count * item.price;
        }, 0);
      })
      .addCase(orederAsyncRequest.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { addProduct, removeProduct, clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;