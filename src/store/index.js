import {configureStore} from '@reduxjs/toolkit';
import {categoryReducer} from './category/category.slice.js';
import {productReducer} from './product/product.slice.js';
import {localStorageMiddleware, orderReducer} from './order/order.slice.js';
import {deliveryReducer} from './delivery/delivery.slice.js';
import {formReducer} from "./form/form.slice.js";


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: productReducer,
        order: orderReducer,
        delivery: deliveryReducer,
        form: formReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});