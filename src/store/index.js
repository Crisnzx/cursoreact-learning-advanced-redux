import { configureStore } from '@reduxjs/toolkit';
import showCartReducer from './showcart-slice';
import cartReducer from './cart-slice';
import UIReducer from './UI-slice';

const store = configureStore({
  reducer: {
    showCart: showCartReducer,
    cart: cartReducer,
    UI: UIReducer,
  },
});

export default store;
