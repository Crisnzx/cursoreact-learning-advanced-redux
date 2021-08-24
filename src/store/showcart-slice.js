import { createSlice } from '@reduxjs/toolkit';

const initialShowCartState = { isShowCart: false };

const showCartSlice = createSlice({
  name: 'showCart',
  initialState: initialShowCartState,
  reducers: {
    toggleCart(state) {
      state.isShowCart = !state.isShowCart;
    },
  },
});

export default showCartSlice.reducer;
export const showCartActions = showCartSlice.actions;
