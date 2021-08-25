import { createSlice, current } from '@reduxjs/toolkit';
// current is good for debugging, because it'll not return Proxies
import { UIActions } from './UI-slice';

const initialCartState = {
  items: [
    {
      id: 'f1',
      title: 'Cookie',
      price: 3,
      description: 'Delicious Chocolate Cookie!',
    },
    {
      id: 'f2',
      title: 'Brownie',
      price: 4,
      description: 'Brownie made with Nutella and Milk',
    },
  ],
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cartContent',
  initialState: initialCartState,
  reducers: {
    setCartData(state, action) {
      state.cartItems = action.payload;
    },

    addItemToCart(state, action) {
      const id = action.payload;
      const cartItemAdded = state.items.find(item => item.id === id);
      const cartItemAlreadyExists = state.cartItems.find(
        cartItem => cartItem.id === id
      );

      if (cartItemAlreadyExists) {
        cartItemAlreadyExists.amount++;
      } else {
        state.cartItems.push({ amount: 1, ...cartItemAdded });
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const cartItemRemoved = state.cartItems.find(
        cartItem => cartItem.id === id
      );
      const index = state.cartItems.indexOf(cartItemRemoved);

      if (cartItemRemoved.amount === 1) {
        state.cartItems.splice(index, 1);
      } else {
        cartItemRemoved.amount--;
      }
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
