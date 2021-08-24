import { configureStore } from '@reduxjs/toolkit';
import showCartReducer from './showcart-slice';
import cartReducer from './cart-slice';

const store = configureStore({
  reducer: {
    showCart: showCartReducer,
    cart: cartReducer,
  },
});

export default store;
